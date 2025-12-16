# Cosmetics Website Backend - User Authentication Only

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend folder:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cosmetics_db
SALT_ROUNDS=10
```

### 3. MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Create a database named `cosmetics_db`
3. Add your connection string to the .env file

### 4. Start Backend
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## API Endpoints

### User Authentication (Main Website)
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset

### Admin Authentication (Frontend Only)
- Admin portal uses hardcoded credentials: admin/admin123
- No backend required for admin login

## Frontend Integration
Import the API functions in your React components:
```javascript
import { userAuth } from './api/userAuth';
```

The backend runs on `http://localhost:5000` by default.