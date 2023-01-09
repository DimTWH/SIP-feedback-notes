const express = require('express');
const { body, validationResult } = require('express-validator');
const api = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');


let sql = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_POR,
})


sql.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    else console.log("Database connected successfully");
})

// =============   Feedback Entity   =============

// Create a new feedback
router.post('/feedbacks/new', (req, res) => {
    const { rating, review } = req.body;
    sql.query(`INSERT INTO feedback (rating, review, created_at) VALUES (?, ?, ?)`, [rating, review, new Date()], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error});
        }
        else {
            res.status(200).json({ message: "Feedback successfully Inserted" });
        }
    });
});

// Get all feedbacks
router.get('/feedbacks/all', (req, res) => {
    sql.query('SELECT * FROM feedback', (error, result) => {
        if (error) {
            return res.status(500).json({ error: error});
        }
        else {
            let feedbackArray = []
            for (let i = 0; i < result.length; i++) {
                const fb = result[i];
                const fbObj = {
                    id: fb["id"],
                    rating: fb["rating"],
                    reviewers: fb["review"],
                    created_at: fb["created_at"]
                }
                feedbackArray.push(fbObj)
            }
            const result = {
                feedbackArray: feedbackArray
            }
            res.json(result);
        }
    });
});

// Get a single feedback
router.get('/feedbacks', (req, res) => {
    const id = req.query.id;
    sql.query('SELECT * FROM feedback WHERE id = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error});
        }
        else if (result.length === 0) {
            return res.status(404).json({ error: "No feedback exists with id: "+id});
        }
        else {
            const result = {
                id: result[0]["id"],
                rating: result[0]["rating"],
                reviewers: result[0]["review"],
                created_at: result[0]["created_at"]
            }
            res.json(result);
        }
    });
});

// Update a feedback
router.put('/feedbacks/update', (req, res) => {
    const id = req.query.id;
    const { rating, review } = req.body;
    sql.query(`UPDATE feedback SET rating = ?, review = ? WHERE id = ?`, [rating, review, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error});
        }
        else {
            res.status(200).json({ message: 'Feedback successfully updated' });
        }
        
    });
});

// Delete a feedback
router.delete('/feedbacks/delete', (req, res) => {
    const id = req.query.id;
    sql.query('DELETE FROM feedback WHERE id = ?', id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: error});
        }
        else {
            res.status(200).json({ message: 'Feedback successfully deleted' });
        }
    });
});