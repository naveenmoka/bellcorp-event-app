const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database.sqlite"),
});

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Event = sequelize.define("Event", {
  name: { type: DataTypes.STRING, allowNull: false },
  organizer: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  description: { type: DataTypes.TEXT },
  capacity: { type: DataTypes.INTEGER },
  category: { type: DataTypes.STRING },
});

const Registration = sequelize.define("Registration", {});

// Relationships
User.hasMany(Registration);
Registration.belongsTo(User);
Event.hasMany(Registration);
Registration.belongsTo(Event);

module.exports = { sequelize, User, Event, Registration };
