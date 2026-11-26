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
- Contribute using mock payments
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
├── screenshots/
├── ER_Diagram.md
├── LICENSE
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jiyasingh0987/FundRaise.git
cd FundRaise
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder using `.env.example` as a reference.

Configure the following variables:

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

**Application URLs**

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

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
| GET | `/api/users/profile` | Get user profile |
| GET | `/api/users/creator` | Verify creator access |
| GET | `/api/users/admin` | Verify admin access |
| GET | `/api/campaigns` | Get approved campaigns |
| POST | `/api/campaigns` | Create campaign |
| GET | `/api/campaigns/pending` | Get pending campaigns |
| GET | `/api/campaigns/my-campaigns` | Get creator campaigns |
| PUT | `/api/campaigns/:id` | Update campaign |
| DELETE | `/api/campaigns/:id` | Delete campaign |
| PATCH | `/api/campaigns/:id/status` | Approve or reject campaign |
| POST | `/api/pledges/:campaignId` | Create pledge |
| GET | `/api/pledges/my-pledges` | Get supporter pledges |
| GET | `/api/dashboard/creator` | Creator dashboard |
| GET | `/api/dashboard/supporter` | Supporter dashboard |

## Database Models

- User
- Campaign
- Pledge

MongoDB stores user accounts, campaign information, and pledge records.

## Payment Information

FundRaise currently uses a mock payment system for demonstration purposes. No real financial transactions are processed.

## Postman API Testing

The project includes Postman testing for 18 API operations covering:

- User registration and login
- User profile
- Campaign creation and listing
- Campaign approval and rejection
- Campaign update and deletion
- Pledge creation and history
- Creator and supporter dashboards
- Access token refresh
- Role-based access verification

All API testing screenshots are available in the `screenshots` folder.

## Database Design

The database relationship diagram is available in [ER_Diagram.md](ER_Diagram.md).

## Future Enhancements

- Real payment gateway integration
- Email notifications
- Advanced campaign analytics
- Campaign search and filtering
- User profile customization

## Author

**FundRaise – Crowdfunding Platform**

Developed as a MERN Stack Capstone Project.

**GitHub Repository:**  
https://github.com/jiyasingh0987/FundRaise

## Author

**Jiya Singh**

BCA Student | MERN Stack Capstone Project

GitHub: https://github.com/jiyasingh0987