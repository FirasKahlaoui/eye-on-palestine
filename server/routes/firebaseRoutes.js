const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();
const db = admin.firestore();

// Route to test Firebase connection
router.get('/test', async (req, res) => {
    try {
        const docRef = db.collection('testCollection').doc('testDoc');
        await docRef.set({ message: 'Firebase is working!' });
        const doc = await docRef.get();
        res.status(200).json(doc.data());
    } catch (error) {
        res.status(500).send('Error writing document: ' + error);
    }
});


module.exports = router;
