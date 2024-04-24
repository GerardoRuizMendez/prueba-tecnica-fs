# Installing frontend dependencies
cd frontend
npm install
cd ..

# Installing backend dependencies and initializing Database with mock data
cd backend
npm install
node src/seed.mjs

read -p "Presiona Enter para salir..."