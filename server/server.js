require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const firebaseRoutes = require('./routes/firebaseRoutes');
const twitterRoutes = require('./routes/twitterRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize Firebase
const serviceAccount = {
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Routes
app.use('/api/firebase', firebaseRoutes);
app.use('/api/twitter', twitterRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
