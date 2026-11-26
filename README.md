
# FundRaise – Crowdfunding Platform

FundRaise is a MERN Stack based crowdfunding platform that connects people who need financial support with individuals who want to contribute towards meaningful causes.

The platform allows creators to submit fundraising campaigns, supporters to contribute through mock payments, and administrators to review and approve campaigns.

## Features

### 1. User Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Access and refresh tokens
- Role-based access control

### 2. Campaign Management
- Create fundraising campaigns
- Update and delete own pending campaigns
- View approved campaigns
- Submit campaigns for admin approval
- Track campaign progress

### 3. Supporter Features
- Browse approved campaigns
- Contribute to campaigns using mock payments
- View personal pledge history
- Access supporter dashboard
- Track total contributions

### 4. Creator Features
- Create and manage campaigns
- View campaign approval status
- Access creator dashboard
- Track funds raised

### 5. Admin Features
- View pending campaigns
- Approve or reject campaigns
- Manage campaign approval process

### 6. Additional Features
- Real-time notifications using Socket.IO
- Protected routes
- MongoDB data relationships
- Aggregation for dashboard statistics
- Centralized error handling

## Technologies Used

**Frontend**
- React.js
- React Router DOM
- Context API
- CSS
- Socket.IO Client

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- Socket.IO

**Tools**
- Visual Studio Code
- Postman
- MongoDB Compass
- Git and GitHub

## Project Structure

```text
FundRaise/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── createAdmin.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd FundRaise
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and configure:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fundraise
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ADMIN_NAME=FundRaise Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

The backend will run on:

```text
http://localhost:5000
```

## User Roles

| Role | Permissions |
|---|---|
| Creator | Create and manage own campaigns |
| Supporter | Browse campaigns and make pledges |
| Admin | Approve or reject campaigns |

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/campaigns` | Get approved campaigns |
| POST | `/api/campaigns` | Create campaign |
| GET | `/api/campaigns/pending` | Get pending campaigns |
| GET | `/api/campaigns/my-campaigns` | Get creator campaigns |
| PATCH | `/api/campaigns/:id/status` | Approve or reject campaign |
| POST | `/api/pledges/:campaignId` | Create pledge |
| GET | `/api/pledges/my-pledges` | Get supporter pledges |
| GET | `/api/dashboard/creator` | Creator dashboard |
| GET | `/api/dashboard/supporter` | Supporter dashboard |

## Database Models

- User
- Campaign
- Pledge

MongoDB is used to store user accounts, campaign information, and pledge records.

## Payment Information

FundRaise currently uses a mock payment system for demonstration purposes. No real financial transactions are processed.

## Future Enhancements

- Real payment gateway integration
- Email notifications
- Advanced campaign analytics
- Campaign search and filtering
- User profile customization

## Author

**FundRaise – Crowdfunding Platform**

Developed as a MERN Stack Capstone Project.
