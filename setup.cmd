cd frontend
call npm install
cd ..

cd backend
call npm install
call node src/seed.mjs

REM "Presiona Enter para salir..."
pause