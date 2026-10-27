#!/usr/bin/env python3
"""Language Games: Live Classroom.

Run this on the teacher's computer. It serves the games to the iPads over
the classroom Wi-Fi and keeps a live leaderboard for the board. Nothing
leaves the room: there is no internet connection, no database and no log
of who played. Everything is in memory and gone when the program stops.

    python3 classroom.py            # then open the address it prints
    python3 classroom.py --port 8080

Only the standard library is used, so there is nothing to install.
"""

import argparse
import json
import mimetypes
import os
import re
import secrets
import socket
import sys
import threading
import time
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MAX_PLAYERS = 60
NAME = re.compile(r'[^\w \-\'.]', re.UNICODE)

lock = threading.Lock()
state = {
    'session': None,   # {'code', 'game', 'lang', 'status', 'started'}
    'players': {},     # pid -> player
}


def lan_addresses():
    """The computer's addresses on the local network, best guess first."""
    found = []
    try:
        # No packet is sent: this only asks which interface would be used.
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('10.255.255.255', 1))
        found.append(s.getsockname()[0])
        s.close()
    except OSError:
        pass
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            ip = info[4][0]
            if ip not in found:
                found.append(ip)
    except OSError:
        pass
    return [ip for ip in found if not ip.startswith('127.')]


def clean_name(text):
    return NAME.sub('', str(text or ''))[:20].strip()


def public_players():
    return [
        {k: p[k] for k in ('pid', 'avatar', 'num', 'name', 'score', 'progress', 'done')}
        for p in state['players'].values()
    ]


class Handler(SimpleHTTPRequestHandler):
    server_version = 'LanguageGames'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, fmt, *args):
        pass  # keep the console quiet and keep no record of who connected

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def is_teacher(self):
        """Board actions only from the computer itself, not from the iPads."""
        return self.client_address[0] in ('127.0.0.1', '::1', '::ffff:127.0.0.1')

    def send_json(self, data, code=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json(self):
        length = min(int(self.headers.get('Content-Length') or 0), 10000)
        try:
            return json.loads(self.rfile.read(length) or b'{}')
        except ValueError:
            return {}

    def do_GET(self):
        if self.path.startswith('/api/info'):
            port = self.server.server_address[1]
            with lock:
                return self.send_json({
                    'ok': True,
                    'teacher': self.is_teacher(),
                    'urls': ['http://%s:%d/' % (ip, port) for ip in lan_addresses()],
                    'session': state['session'],
                })
        if self.path.startswith('/api/state'):
            with lock:
                return self.send_json({'session': state['session'], 'players': public_players(), 'now': time.time()})
        return super().do_GET()

    def do_POST(self):
        data = self.read_json()
        route = self.path.split('?')[0]
        with lock:
            session = state['session']
            if route in ('/api/session', '/api/start', '/api/end', '/api/kick') and not self.is_teacher():
                return self.send_json({'error': 'teacher only'}, 403)
            if route == '/api/session':
                state['session'] = {
                    'code': str(data.get('code', ''))[:9],
                    'game': str(data.get('game', ''))[:30],
                    'lang': str(data.get('lang', 'en'))[:2],
                    'status': 'lobby',
                    'started': None,
                }
                state['players'] = {}
                return self.send_json({'session': state['session']})
            if route == '/api/start' and session:
                session['status'] = 'playing'
                session['started'] = time.time()
                return self.send_json({'session': session})
            if route == '/api/end' and session:
                session['status'] = 'done'
                return self.send_json({'session': session})
            if route == '/api/kick':
                state['players'].pop(str(data.get('pid')), None)
                return self.send_json({'ok': True})
            if route == '/api/join':
                if not session or session['status'] == 'done':
                    return self.send_json({'error': 'closed'}, 409)
                pid = str(data.get('pid') or '')
                if pid not in state['players']:
                    if len(state['players']) >= MAX_PLAYERS:
                        return self.send_json({'error': 'full'}, 409)
                    pid = secrets.token_hex(6)
                state['players'][pid] = {
                    'pid': pid,
                    'avatar': str(data.get('avatar', 'star'))[:20],
                    'num': int(data.get('num') or 0) % 100,
                    'name': clean_name(data.get('name')),
                    'score': None,
                    'progress': 0,
                    'done': False,
                }
                return self.send_json({'pid': pid, 'session': session})
            if route == '/api/score':
                p = state['players'].get(str(data.get('pid')))
                if not p or not session or session['status'] != 'playing' or p['done']:
                    return self.send_json({'ok': False})
                score = data.get('score')
                p['score'] = int(score) if isinstance(score, (int, float)) else p['score']
                progress = data.get('progress')
                if isinstance(progress, (int, float)):
                    p['progress'] = max(0.0, min(1.0, float(progress)))
                p['done'] = bool(data.get('done'))
                return self.send_json({'ok': True})
        return self.send_json({'error': 'not found'}, 404)


def main():
    parser = argparse.ArgumentParser(description='Language Games Live Classroom')
    parser.add_argument('--port', type=int, default=8000)
    parser.add_argument('--no-browser', action='store_true', help="don't open the board automatically")
    args = parser.parse_args()
    mimetypes.add_type('application/javascript', '.js')
    mimetypes.add_type('font/woff2', '.woff2')

    server = None
    for port in range(args.port, args.port + 20):
        try:
            server = ThreadingHTTPServer(('0.0.0.0', port), Handler)
            break
        except OSError:
            continue
    if not server:
        sys.exit('No free port found from %d.' % args.port)
    port = server.server_address[1]
    board = 'http://localhost:%d/live/board.html' % port
    print()
    print('  Language Games - Live Classroom is running.')
    print()
    print('  Board (open on THIS computer):  ' + board)
    for ip in lan_addresses() or ['(no network found)']:
        print('  iPads join at:                  http://%s:%d/live/join.html' % (ip, port))
    print()
    print('  Keep this window open during the lesson. Close it (or press Ctrl+C) to stop.')
    print()
    if not args.no_browser:
        threading.Timer(1.0, lambda: webbrowser.open(board)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Stopped.')


if __name__ == '__main__':
    main()
