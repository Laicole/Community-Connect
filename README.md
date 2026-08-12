# Community Connect

Community Connect is a full-stack community events web application that helps users discover local events based on their interests and age group. Users can create an account, browse community events, view event details, save favorites, manage their profile, and receive personalized event recommendations.

The application is designed to work across desktop, tablet, and mobile devices.

## Project Overview

Finding relevant community events can be difficult when information is spread across multiple sources.

Community Connect provides one place where users can discover events that match their interests and preferences.

During registration, users provide information such as their date of birth and interests. The application determines an appropriate age group from the user's date of birth and uses profile information to personalize event recommendations.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- HTML
- CSS
- Fetch API

### Backend

- Node.js
- Express.js
- JavaScript
- REST API
- JSON Web Tokens (JWT)
- bcryptjs

### Database

- MongoDB Atlas
- Mongoose

### Development Tools

- Git
- GitHub
- Visual Studio Code
- npm
- Nodemon

## Key Features

- User registration
- User login and logout
- JWT-based authentication
- Date-of-birth-based age group calculation
- User profile management
- Interest selection
- Browse community events
- Search and filter events
- View individual event details
- Save events to favorites
- Remove events from favorites
- Personalized user dashboard
- Upcoming event display
- Personalized event recommendations
- Recommendation match scores and explanations
- Responsive desktop, tablet, and mobile design

## AI-Powered / Personalized Recommendation Feature

Community Connect includes a personalized event recommendation system.

The recommendation system evaluates event information against the logged-in user's profile.

Recommendations consider information such as:

- User interests
- Event category
- Event title and description
- User age group
- Event age group

Matching events receive a recommendation score. Higher-scoring events are displayed first on the user's dashboard.

The application also provides a reason for a recommendation, such as:

> Matches your interest in Music

or:

> Matches your interest in Sports • Open to all ages

This helps users understand why an event was recommended to them.

## Project Structure

```text
Community-Connect/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

Before running the project locally, install:

- Node.js
- npm
- Git

You will also need access to a MongoDB database.

Clone the repository:

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

Move into the project:

```bash
cd Community-Connect
```

## Run the Frontend

Move into the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

If PowerShell prevents `npm.ps1` from running, use:

```powershell
npm.cmd run dev
```

## Run the Backend

Open another terminal and move into the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The backend runs locally at:

```text
http://localhost:5000
```

The API base URL is:

```text
http://localhost:5000/api/v1
```

## Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file or real credentials to GitHub.

Make sure `.env` is included in `.gitignore`.

## Main API Routes

Examples of API endpoints used by the application include:

```text
GET    /api/v1/events
GET    /api/v1/events/:id

POST   /api/v1/users/register
POST   /api/v1/users/login

GET    /api/v1/users/profile
PUT    /api/v1/users/profile

POST   /api/v1/users/favorites/:eventId
DELETE /api/v1/users/favorites/:eventId

GET    /api/v1/users/recommendations
```

Protected routes require a valid JWT.

## Deployment

### Live Application

```text
Coming soon
```

### Backend API

```text
Coming soon
```

The deployment links will be added after the production frontend and backend are deployed.

## How AI Was Used During Development

AI-assisted development tools were used during the development of Community Connect to support planning, debugging, code review, and learning.

AI assistance was used to help:

- Organize the React and Express project structure
- Explain React, Express, MongoDB, and authentication concepts
- Troubleshoot frontend and backend errors
- Review code
- Create testing and deployment checklists

AI-generated suggestions were reviewed, tested, debugged, and integrated into the application as part of the development process.

## Architecture

Community Connect follows a three-tier architecture:

**Presentation Layer**

React and Vite provide the user interface.

**Application Layer**

Node.js and Express provide API routes, controllers, authentication, business logic, and recommendation logic.

**Data Layer**

MongoDB Atlas and Mongoose store and manage users and community event data.

## Future Improvements

Possible future improvements include:

- More advanced recommendation models
- Real-time event data from external APIs
- Location-based recommendations
- Event organizer accounts
- Email notifications
- Calendar integration
- Improved recommendation feedback
- Additional accessibility improvements

## Author

Developed as a full-stack capstone project.
