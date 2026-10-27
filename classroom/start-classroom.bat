@echo off
rem Windows: double-click to start the Live Classroom.
cd /d "%~dp0"
py -3 classroom.py
if errorlevel 9009 python classroom.py
pause
