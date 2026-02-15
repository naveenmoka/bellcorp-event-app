# Deployment Guide - Bellcorp Event Management Application

This guide covers deploying both the frontend and backend to production environments.

---

## 📋 Prerequisites

- GitHub account with the project repository pushed
- Vercel account (for frontend)
- Render account (for backend)

---

## 🚀 Backend Deployment (Render)

### Step 1: Prepare for Deployment

1. **Create a GitHub Repository** (if not done already)

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/bellcorp-event-app.git
   git push -u origin main
   ```

2. **Update Environment for Production**
   - Backend `server/.env` should have:

   ```
   JWT_SECRET=your_secure_random_string_here
   PORT=5000
   NODE_ENV=production
   ```

3. **Update package.json if needed**
   - Ensure `server/package.json` has correct start script:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js",
     "seed": "node database-seed.js"
   }
   ```

### Step 2: Create Render Service

1. **Sign in to [Render.com](https://render.com)**

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository branch: `main`

3. **Configure the Service**
   - **Name:** `bellcorp-event-api`
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free tier (for testing) or Paid (for production)

4. **Add Environment Variables**
   - Click "Environment"
   - Add these variables:
     ```
     JWT_SECRET=your_secure_random_string_here
     NODE_ENV=production
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (~2-3 minutes)
   - Note the service URL (e.g., `https://bellcorp-event-api.onrender.com`)

### Step 3: Seed Production Database

Once the backend is deployed and running:

1. **SSH into Render** or use Render's Web Console
2. Run the seeding command:
   ```bash
   npm run seed
   ```
   This populates the production database with 15 sample events.

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Update API URL**
   - Edit `client/.env.production`:

   ```
   REACT_APP_API_URL=https://bellcorp-event-api.onrender.com
   ```

2. **Update .env** for development to use local backend:

   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

3. **Build locally to test**
   ```bash
   cd client
   npm run build
   ```

### Step 2: Deploy to Vercel

1. **Sign in to [Vercel.com](https://vercel.com)**
   - You can sign in with GitHub

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework:** React (auto-detected)
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

4. **Add Environment Variables**
   - In the "Environment Variables" section:

   ```
   REACT_APP_API_URL=https://bellcorp-event-api.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (~2-3 minutes)
   - Note the app URL (e.g., `https://bellcorp-event-app.vercel.app`)

---

## ✅ Post-Deployment Checklist

- [ ] Backend is running on Render
- [ ] Backend has been seeded with sample events
- [ ] Frontend is deployed on Vercel
- [ ] Environment variables are set correctly
- [ ] Frontend can communicate with backend

### Test the Live Application

1. **Visit the frontend URL**

   ```
   https://bellcorp-event-app.vercel.app
   ```

2. **Test User Flow**
   - Register a new account
   - Login with your credentials
   - View events list
   - Search and filter events
   - Register for an event
   - Check dashboard

3. **Test API Endpoints**

   ```bash
   # Get all events
   curl https://bellcorp-event-api.onrender.com/api/events

   # Get filter options
   curl https://bellcorp-event-api.onrender.com/api/filter-options
   ```

---

## 🔧 Updating Production

### Update Backend

```bash
# Make changes locally
cd server
git add .
git commit -m "Update backend"
git push origin main

# Render automatically redeploys
```

### Update Frontend

```bash
# Make changes locally
cd client
git add .
git commit -m "Update frontend"
git push origin main

# Vercel automatically redeploys
```

---

## 🐛 Troubleshooting

### Backend won't start on Render

- Check logs: Go to Render dashboard → Select service → Logs
- Verify environment variables are set
- Ensure `npm start` works locally: `npm start`

### Frontend can't connect to backend

- Check that backend URL is correct in `.env.production`
- Verify CORS is enabled on backend
- Check browser console for errors
- Ensure backend service is running

### Database issues

- If database is corrupted, delete and redeploy
- Render will create a new database.sqlite file
- Run seed script again

### 404 Errors on frontend routes

- Ensure Vercel is set to use React Router
- Add `vercel.json` in root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📊 Monitoring & Performance

### Render

- **Dashboard:** Check CPU, Memory, Network usage
- **Logs:** Monitor for errors
- **Alerts:** Set up email alerts for failures

### Vercel

- **Analytics:** View page performance
- **Logs:** Check build and runtime logs
- **Deployments:** View deployment history

---

## 🔐 Security Considerations

1. **Change JWT_SECRET**
   - Use a strong random string, not the default
   - Generate: `openssl rand -base64 32`

2. **Database Security**
   - Render's database is private by default
   - No external access needed

3. **API Security**
   - CORS is configured for specific origin
   - Update if needed in `server.js`

4. **JWT Tokens**
   - Tokens stored in localStorage
   - Consider using httpOnly cookies for extra security

5. **Environment Variables**
   - Never commit `.env` files to GitHub
   - Use platform-specific environment variable settings

---

## 💰 Cost Estimation

| Service           | Plan         | Monthly Cost |
| ----------------- | ------------ | ------------ | -------- |
| Render (Backend)  | Free/Starter | $0 / $7+     |
| Vercel (Frontend) | Pro          | $20          |
| **Total**         |              |              | **$20+** |

_Free tier options available for evaluation purposes_

---

## 📞 Support & Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Sequelize Docs:** https://sequelize.org
- **Express Docs:** https://expressjs.com

---

## 🎉 Deployment Complete!

Your Bellcorp Event Management Application is now live and ready to use!

**Live Application:** `https://bellcorp-event-app.vercel.app`
**API Endpoint:** `https://bellcorp-event-api.onrender.com`
