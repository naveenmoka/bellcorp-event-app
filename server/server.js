const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize, Op } = require("sequelize");
const { sequelize, User, Event, Registration } = require("./models");
const protect = require("./middleware/auth");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ message: "User created" });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");
    res.json({ token, user: { id: user.id, name: user.name } });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// EVENT ROUTES (With Filtering and Search)
app.get("/api/events", async (req, res) => {
  const { search, category, location } = req.query;
  let where = {};

  if (search) {
    where[Op.or] = [
      sequelize.where(
        sequelize.fn("lower", sequelize.col("name")),
        Op.like,
        `%${search.toLowerCase()}%`,
      ),
      sequelize.where(
        sequelize.fn("lower", sequelize.col("description")),
        Op.like,
        `%${search.toLowerCase()}%`,
      ),
    ];
  }

  if (category) where.category = category;
  if (location) where.location = location;

  const events = await Event.findAll({ where });
  res.json(events);
});

// GET SINGLE EVENT
app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER REGISTRATIONS
app.get("/api/user-registrations", protect, async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      where: { UserId: req.userId },
      include: [Event],
    });
    const events = registrations.map((reg) => reg.Event);
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CURRENT USER
app.get("/api/me", protect, async (req, res) => {
  try {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  } catch (err) {
    res.status(500).json(err);
  }
});

// REGISTRATION ROUTE
app.post("/api/register-event", protect, async (req, res) => {
  const { eventId } = req.body;
  const event = await Event.findByPk(eventId);
  const count = await Registration.count({ where: { EventId: eventId } });

  if (count >= event.capacity)
    return res.status(400).json({ message: "Event Full" });

  const existing = await Registration.findOne({
    where: { UserId: req.userId, EventId: eventId },
  });
  if (existing) return res.status(400).json({ message: "Already registered" });

  await Registration.create({ UserId: req.userId, EventId: eventId });
  res.json({ message: "Success" });
});

// CANCEL REGISTRATION
app.post("/api/cancel-registration", protect, async (req, res) => {
  const { eventId } = req.body;
  try {
    await Registration.destroy({
      where: { UserId: req.userId, EventId: eventId },
    });
    res.json({ message: "Registration cancelled" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FILTER OPTIONS
app.get("/api/filter-options", async (req, res) => {
  try {
    const categories = await Event.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("category")), "category"],
      ],
    });
    const locations = await Event.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("location")), "location"],
      ],
    });
    res.json({
      categories: categories.map((c) => c.category).filter(Boolean),
      locations: locations.map((l) => l.location).filter(Boolean),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Start Server
sequelize.sync().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});
