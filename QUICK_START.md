# Quick Start Guide - Bellcorp Event Management Application

## Prerequisites

- Node.js (v14 or higher) installed
- npm or yarn package manager
- A code editor (VS Code recommended)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Start the Backend

```bash
cd server
npm install
npm run seed
npm run dev
```

✅ **Backend running on:** `http://localhost:5000`

### Step 2: Start the Frontend (in a new terminal)

```bash
cd client
npm install
npm start
```

✅ **Frontend running on:** `http://localhost:3000`

---

## 📋 Test the Application

### Option 1: Use Pre-seeded Credentials

After running `npm run seed`, use these credentials:

**User 1:**

- Email: `john@example.com`
- Password: `password123`

**User 2:**

- Email: `jane@example.com`
- Password: `password123`

### Option 2: Create New User

1. Click "Register" on the login page
2. Fill in name, email, and password
3. Click "Register"
4. Login with your new credentials

---

## 🎮 Features to Try

### Event Discovery

1. Login successfully
2. Browse all events on the Events page
3. **Search:** Type in the search bar (e.g., "AI", "Tech")
4. **Filter by Category:** Select a category from the dropdown
5. **Filter by Location:** Select a location from the dropdown
6. Combine multiple filters

### Event Registration

1. Click "View Details" on any event
2. See event information and available capacity
3. Click "Register Now" if seats available
4. See confirmation message

### User Dashboard

1. Click "My Events" in the navbar
2. See "Upcoming Events" (future dates)
3. See "Past Events" (past dates)
4. Events automatically categorized by date

### Cancel Registration

1. Go to any registered event details page
2. Click "Cancel Registration"
3. Registration removed from your dashboard

---

## 🗂️ Project Structure

```
bellcorp-event-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Login, Register, Events, EventDetails, Dashboard
│   │   ├── components/ # EventCard, Navbar
│   │   ├── context/    # AuthContext for auth state
│   │   └── App.js      # Main routing setup
│   └── .env            # API URL config
│
├── server/             # Express backend
│   ├── models/         # Database models (User, Event, Registration)
│   ├── middleware/     # JWT auth middleware
│   ├── server.js       # Express server & API routes
│   ├── database-seed.js # Seed 15 mock events
│   └── .env            # JWT secret config
│
└── README.md           # Full documentation
```

---

## 📚 API Endpoints

| Method | Endpoint                   | Protected | Description                   |
| ------ | -------------------------- | --------- | ----------------------------- |
| POST   | `/api/signup`              | ❌        | Register new user             |
| POST   | `/api/login`               | ❌        | Login user, get JWT token     |
| GET    | `/api/events`              | ❌        | Get all events (with filters) |
| GET    | `/api/events/:id`          | ❌        | Get single event details      |
| GET    | `/api/filter-options`      | ❌        | Get category/location filters |
| POST   | `/api/register-event`      | ✅        | Register for an event         |
| POST   | `/api/cancel-registration` | ✅        | Cancel event registration     |
| GET    | `/api/user-registrations`  | ✅        | Get user's registered events  |

**Protected:** Requires `Authorization: Bearer <jwt_token>` header

---

## 🐛 Troubleshooting

### Backend won't start

- ✅ Check Node.js is installed: `node --version`
- ✅ Check port 5000 isn't in use: `netstat -ano | findstr :5000` (Windows)
- ✅ Delete `node_modules` and reinstall: `npm install`

### Frontend won't start

- ✅ Make sure backend is running first
- ✅ Check `.env` has correct API URL
- ✅ Delete `node_modules` and reinstall: `npm install`

### Database seeding issues

- ✅ Delete `database.sqlite` from server folder
- ✅ Run: `npm run seed` again

### Authentication errors

- ✅ Clear browser localStorage (DevTools > Application > Storage)
- ✅ Try logging out and logging back in
- ✅ Create a fresh user account

---

## 📊 Database Info

**15 Pre-seeded Events** across categories:

- **Technology:** Tech Conference, AI Summit, Web Dev Workshop, Cloud Computing, Mobile App Dev, Cybersecurity, Data Science, JavaScript Advanced
- **Design:** Design Thinking, UI/UX Design
- **Business:** Product Management, E-commerce Strategy
- **Marketing:** Digital Marketing Conference
- **Networking:** Networking Breakfast
- **Entrepreneurship:** Startup Pitch Event

---

## 🎯 Example User Flows

### Complete Registration & Discovery Flow

```
1. Register → /register
   └─ Submit name, email, password

2. Login → /login
   └─ Submit email, password
   └─ Get JWT token

3. Browse Events → /events
   └─ See all 15 events
   └─ Use filters & search

4. Register for Event → /event/:id
   └─ View event details
   └─ Click Register Now

5. Check Dashboard → /dashboard
   └─ See registered events
   └─ Split into Upcoming/Past
```

---

## 📞 Support

For detailed information, see [README.md](README.md)

Common issues? Check the README's Troubleshooting section.

---

**Happy Event Management! 🎉**
