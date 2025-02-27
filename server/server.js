require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize Firebase
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Import routes after initializing Firebase
const firebaseRoutes = require("./routes/firebaseRoutes");
const twitterRoutes = require("./routes/twitterRoutes");
const newsRoutes = require("./routes/newsRoutes");

// Use routes
app.use("/firebase", firebaseRoutes);
app.use("/twitter", twitterRoutes);
app.use("/news", newsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
