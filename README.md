# Bellcorp Event Management Application

A full-stack platform for discovering, viewing, and managing event registrations. The application provides a seamless "Event Discovery Experience" with user authentication, advanced search and filtering, and a personalized dashboard for managing registrations.

## 🎯 Features

### Event Discovery

- **Dynamic Event Grid**: Browse all available events with rich cards showing event details
- **Advanced Search**: Search events by name or description
- **Smart Filtering**: Filter events by category and location
- **Real-time Filter Options**: Dynamically populated filter dropdowns

### User Authentication

- **Secure Registration**: Create an account with email and password
- **Secure Login**: JWT-based authentication system
- **Protected Routes**: Ensure only authenticated users can access event registration

### Event Management

- **View Event Details**: See comprehensive information including organizer, location, capacity, and description
- **Event Registration**: Register for events (with capacity management)
- **Cancel Registrations**: Remove attendance from events
- **Registration Status**: Visual indicators for registered events

### User Dashboard

- **Upcoming Events**: View all registered events happening in the future
- **Past Events**: View history of attended events
- **Event Categorization**: Automatic sorting by date
- **Quick Navigation**: Easy access to event details from the dashboard

## 🏗️ Technology Stack

### Frontend

- **React.js** (v19.2.4) - UI library with functional components and hooks
- **React Router DOM** (v7.13.0) - Client-side routing
- **Axios** (v1.13.5) - HTTP client for API calls
- **CSS3** - Styling with responsive design

### Backend

- **Node.js** & **Express.js** (v5.2.1) - Server framework
- **SQLite3** (v5.1.7) - Lightweight database
- **Sequelize** (v6.37.7) - ORM for database operations
- **bcryptjs** (v3.0.3) - Password hashing
- **jsonwebtoken** (v9.0.3) - JWT authentication
- **CORS** (v2.8.6) - Cross-origin resource sharing
- **dotenv** (v17.3.1) - Environment variable management

## 📁 Project Structure

```
bellcorp-event-app/
├── client/                  # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventCard.js       # Event display component
│   │   │   ├── EventCard.css
│   │   │   ├── Navbar.js          # Navigation bar
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Login.js           # Login page
│   │   │   ├── Register.js        # Registration page
│   │   │   ├── Events.js          # Events discovery page
│   │   │   ├── EventDetails.js    # Event details page
│   │   │   ├── Dashboard.js       # User dashboard
│   │   │   ├── Auth.css
│   │   │   ├── Events.css
│   │   │   ├── EventDetails.css
│   │   │   └── Dashboard.css
│   │   ├── context/
│   │   │   └── AuthContext.js     # Global auth state
│   │   ├── App.js                 # Main app with routing
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── README.md
│
├── server/                  # Express Backend
│   ├── models/
│   │   └── index.js         # Sequelize ORM models
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── database-seed.js     # Database seeding script
│   ├── server.js            # Express app & routes
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── database.sqlite      # SQLite database (auto-created)
│
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Backend Setup

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** (if not already present):

   ```
   JWT_SECRET=bellcorp_secret_key_2026_event_app
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed the database with sample events:**

   ```bash
   npm run seed
   ```

   This creates 15 mock events across various categories (Technology, Design, Business, etc.)

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** (if not already present):

   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

## 📖 API Documentation

### Authentication Endpoints

#### Sign Up

```
POST /api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: { "message": "User created" }
```

#### Login

```
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "name": "John Doe" }
}
```

#### Get Current User

```
GET /api/me
Authorization: Bearer <token>

Response: {
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Event Endpoints

#### Get All Events (with filters and search)

```
GET /api/events?search=<query>&category=<category>&location=<location>

Query Parameters:
- search: String to search in event name or description
- category: Filter by event category
- location: Filter by event location

Response: [
  {
    "id": 1,
    "name": "Tech Conference 2026",
    "organizer": "Tech Innovations Inc.",
    "location": "San Francisco, CA",
    "date": "2026-05-15T00:00:00.000Z",
    "description": "Annual conference featuring the latest in tech innovation",
    "capacity": 500,
    "category": "Technology"
  },
  ...
]
```

#### Get Single Event

```
GET /api/events/:id

Response: {
  "id": 1,
  "name": "Tech Conference 2026",
  ...
}
```

#### Get Filter Options

```
GET /api/filter-options

Response: {
  "categories": ["Technology", "Design", "Business", "Marketing"],
  "locations": ["San Francisco, CA", "New York, NY", "Boston, MA", ...]
}
```

### Registration Endpoints

#### Register for Event

```
POST /api/register-event
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": 1
}

Response: { "message": "Success" }
Error Cases:
- "Event Full" - Event is at capacity
- "Already registered" - User is already registered
```

#### Cancel Registration

```
POST /api/cancel-registration
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": 1
}

Response: { "message": "Registration cancelled" }
```

#### Get User Registrations

```
GET /api/user-registrations
Authorization: Bearer <token>

Response: [
  {
    "id": 1,
    "name": "Tech Conference 2026",
    "category": "Technology",
    ...
  },
  ...
]
```

## 🗄️ Database Schema

### User Table

```sql
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Event Table

```sql
CREATE TABLE Events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  organizer VARCHAR(255),
  location VARCHAR(255),
  date DATETIME,
  description TEXT,
  capacity INTEGER,
  category VARCHAR(100),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Registration Table

```sql
CREATE TABLE Registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  UserId INTEGER NOT NULL,
  EventId INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES Users(id),
  FOREIGN KEY (EventId) REFERENCES Events(id)
);
```

## 👥 User Workflow

### 1. User Registration

- Navigate to `/register`
- Fill in name, email, and password
- Click "Register" to create account
- Redirected to login page

### 2. User Login

- Navigate to `/login`
- Enter email and password
- Click "Login"
- Redirected to events discovery page

### 3. Event Discovery

- Land on `/events` page after login
- See grid of all available events
- Use search bar to find specific events
- Use category and location filters
- Filters update in real-time

### 4. Event Registration

- Click "View Details" on any event card
- See comprehensive event information
- Check available capacity
- Click "Register Now" button
- Confirmation message appears

### 5. Dashboard

- Click "My Events" in navbar
- View "Upcoming Events" section (future dates)
- View "Past Events" section (past dates)
- Click on any event to view details
- Can cancel registration from details page

## 🎨 UI/UX Features

### Responsive Design

- Mobile-friendly layout for all screen sizes
- Flexible grid system that adapts to device width
- Touch-friendly buttons and inputs

### Visual Feedback

- Hover effects on interactive elements
- Loading states during data fetching
- Error messages for failed operations
- Status badges (Registered, Sold Out)

### Navigation

- Persistent navbar with user information
- Clear breadcrumb navigation
- Quick links to main sections
- Logout functionality

## 🔐 Security Features

### Password Security

- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Never returned in API responses

### Authentication

- JWT tokens with configurable expiration
- Tokens stored in localStorage (frontend)
- Protected routes require valid token
- Middleware validates token on each request

### Data Validation

- Email uniqueness enforced at database level
- Capacity constraints checked before registration
- Duplicate registration prevention
- Input validation on both frontend and backend

## 🧪 Testing the Application

### Test Credentials (After Seeding)

```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

### Test Scenarios

1. **Complete User Flow:**
   - Register a new user
   - Search for events by category
   - Filter events by location
   - Register for an event
   - View registration in dashboard
   - Cancel registration

2. **Search & Filter:**
   - Search for "AI" to find AI related events
   - Filter by "Technology" category
   - Filter by "San Francisco, CA" location
   - Combine search with filters

3. **Dashboard:**
   - Verify upcoming events appear correctly
   - Verify past events appear in different section
   - Verify event count matches registrations

4. **Error Handling:**
   - Try registering for event at capacity
   - Try registering twice for same event
   - Try accessing protected routes without login
   - Try with invalid credentials

## 📦 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `REACT_APP_API_URL=<backend-url>`
4. Vercel automatically deploys on push

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables:
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production
4. Render automatically deploys and runs `npm start`

## 📝 Sample Events

The database is pre-populated with 15 mock events including:

- Tech Conference 2026 (Technology)
- AI & Machine Learning Summit (Technology)
- Web Development Workshop (Technology)
- Design Thinking Workshop (Design)
- Product Management Summit (Business)
- Digital Marketing Conference (Marketing)
- And more...

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Created for Bellcorp Event Management**  
Last Updated: February 2026
