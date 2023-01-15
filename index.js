const express = require('express');
const { body, validationResult } = require('express-validator');
const api = express();
const bodyParser = require('body-parser');
const sql = require('./database')

api.use(bodyParser.urlencoded({ extended: true }));
api.use(express.urlencoded({ extended: true }));
api.use(bodyParser.json({ type: 'application/json' }));
api.use(express.json());

// =============   Feedback Entity   =============

// Create a new feedback
api.post('/feedbacks/new', (req, res) => {
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
api.get('/feedbacks/all', (req, res) => {
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
api.get('/feedbacks', (req, res) => {
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
api.put('/feedbacks/update', (req, res) => {
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
api.delete('/feedbacks/delete', (req, res) => {
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

// =============   TASTING NOTE Entity   =============

api.post('/tasting_notes/new', (req, res) => {
    const { rating, note } = req.body;
    sql.query('INSERT INTO tasting_note (rating, note, created_at) VALUES (?, ?, ?)', [rating, note, new Date()], (error, result) => {
    if (error) {
    return res.status(500).json({ error: error});
    }
    else {
    res.status(200).json({ message: "Tasting note successfully Inserted" });
    }
    });
    });
    
    // Get all tasting notes
    api.get('/tasting_notes/all', (req, res) => {
    sql.query('SELECT * FROM tasting_note', (error, result) => {
    if (error) {
    return res.status(500).json({ error: error});
    }
    else {
    let notesArray = []
    for (let i = 0; i < result.length; i++) {
    const tn = result[i];
    const tnObj = {
    id: tn["id"],
    rating: tn["rating"],
    note: tn["note"],
    created_at: tn["created_at"]
    }
    notesArray.push(tnObj)
    }
    const result = {
    notesArray: notesArray
    }
    res.json(result);
    }
    });
    });
    
    // Get a single tasting note
    api.get('/tasting_notes', (req, res) => {
    const id = req.query.id;
    sql.query('SELECT * FROM tasting_note WHERE id = ?', [id], (error, result) => {
    if (error) {
    return res.status(500).json({ error: error});
    }
    else if (result.length === 0) {
    return res.status(404).json({ error: "No tasting note exists with id: "+id});
    }
    else {
    const result = {
    id: result[0]["id"],
    rating: result[0]["rating"],
    note: result[0]["note"],
    created_at: result[0]["created_at"]
    }
    res.json(result);
    }
    });
    });
    
    // Update a tasting note
    api.put('/tasting_notes/update', (req, res) => {
    const id = req.query.id;
    const { rating, note } = req.body;
    sql.query('UPDATE tasting_note SET rating = ?, note = ? WHERE id = ?', [rating, note, id], (error, result) => {
    if (error) {
    return res.status(500).json({ error: error});
    }
    else {
    res.status(200).json({ message: 'Tasting note successfully updated' });
    }
    

    });
    });