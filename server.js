const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080; // Backend port

// Enable CORS for all routes
app.use(cors());

const jsonFilePath = path.join(__dirname, 'questions.json');

// Route to handle fetching a question by its ID
app.get('/question/:id', (req, res) => {
    const questionId = req.params.id;

    // Read questions.json
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file' });
        }

        const questions = JSON.parse(data);
        const question = questions.find(q => q.id === questionId);

        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    });
});

// Start the Node.js server
app.listen(port, '127.0.0.1', () => {
    console.log(`Backend running at http://127.0.0.1:${port}`);
});
