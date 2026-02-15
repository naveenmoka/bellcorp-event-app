const { sequelize, User, Event } = require("./models");
const bcrypt = require("bcryptjs");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced");

    // Create sample users
    const users = await User.bulkCreate([
      {
        name: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    ]);
    console.log("Users created");

    // Create sample events
    const events = await Event.bulkCreate([
      {
        name: "Tech Conference 2026",
        organizer: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        date: new Date("2026-05-15"),
        description:
          "Annual conference featuring the latest in tech innovation",
        capacity: 500,
        category: "Technology",
      },
      {
        name: "Web Development Workshop",
        organizer: "Code Academy",
        location: "New York, NY",
        date: new Date("2026-04-20"),
        description: "Hands-on workshop on modern web development practices",
        capacity: 50,
        category: "Technology",
      },
      {
        name: "AI & Machine Learning Summit",
        organizer: "AI Experts Group",
        location: "Boston, MA",
        date: new Date("2026-06-10"),
        description: "Exploring the future of AI and its applications",
        capacity: 300,
        category: "Technology",
      },
      {
        name: "Design Thinking Workshop",
        organizer: "Creative Studios",
        location: "Los Angeles, CA",
        date: new Date("2026-03-25"),
        description: "Learn design thinking methodologies and user research",
        capacity: 100,
        category: "Design",
      },
      {
        name: "Networking Breakfast",
        organizer: "Business Network Events",
        location: "Chicago, IL",
        date: new Date("2026-02-28"),
        description: "Connect with industry leaders over breakfast",
        capacity: 200,
        category: "Networking",
      },
      {
        name: "Cloud Computing Essentials",
        organizer: "Cloud School",
        location: "Austin, TX",
        date: new Date("2026-07-05"),
        description: "Master AWS, Azure, and Google Cloud platforms",
        capacity: 75,
        category: "Technology",
      },
      {
        name: "Product Management Summit",
        organizer: "PM Society",
        location: "Seattle, WA",
        date: new Date("2026-05-30"),
        description: "Insights on product strategy and development",
        capacity: 150,
        category: "Business",
      },
      {
        name: "Mobile App Development",
        organizer: "Mobile Dev Academy",
        location: "Denver, CO",
        date: new Date("2026-04-10"),
        description: "Building native and cross-platform mobile applications",
        capacity: 80,
        category: "Technology",
      },
      {
        name: "Digital Marketing Conference",
        organizer: "Marketing Bureau",
        location: "Miami, FL",
        date: new Date("2026-03-15"),
        description: "Latest trends in digital marketing and analytics",
        capacity: 250,
        category: "Marketing",
      },
      {
        name: "Cybersecurity Masterclass",
        organizer: "Security Institute",
        location: "Washington, DC",
        date: new Date("2026-06-20"),
        description: "Comprehensive training on cybersecurity best practices",
        capacity: 120,
        category: "Technology",
      },
      {
        name: "UI/UX Design Conference",
        organizer: "Design Collective",
        location: "Portland, OR",
        date: new Date("2026-05-10"),
        description: "Innovations in user interface and experience design",
        capacity: 180,
        category: "Design",
      },
      {
        name: "Data Science Bootcamp",
        organizer: "Data Academy",
        location: "San Jose, CA",
        date: new Date("2026-07-15"),
        description: "Practical training in data analysis and visualization",
        capacity: 60,
        category: "Technology",
      },
      {
        name: "Startup Pitch Event",
        organizer: "Innovation Hub",
        location: "San Francisco, CA",
        date: new Date("2026-04-25"),
        description: "Pitch your startup ideas to investors",
        capacity: 100,
        category: "Entrepreneurship",
      },
      {
        name: "JavaScript Advanced",
        organizer: "Dev School",
        location: "Brooklyn, NY",
        date: new Date("2026-06-01"),
        description: "Deep dive into JavaScript ES6+ and modern patterns",
        capacity: 40,
        category: "Technology",
      },
      {
        name: "E-commerce Strategy Forum",
        organizer: "E-commerce Alliance",
        location: "Las Vegas, NV",
        date: new Date("2026-05-20"),
        description: "Maximizing sales and customer experience online",
        capacity: 200,
        category: "Business",
      },
    ]);
    console.log("Events created");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
