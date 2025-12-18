const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDb = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/auth.routes");
const profileRoutes = require("./src/routes/profile.routes");
const donationsRoutes = require("./src/routes/donations.routes");
const requestsRoutes = require("./src/routes/requests.routes");
const adminRoutes = require("./src/routes/admin.routes");
const notificationRoutes = require("./src/routes/notification.routes");

// Middleware
const errorHandler = require("./src/middleware/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://food-bridge-ee690dbob-samuels-projects-af949603.vercel.app/",
    credentials: true,
  })
);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);


app.get("/", (req, res) => {
  res.send("FoodBridge API is running");
});

app.use(errorHandler);

//server starting
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
