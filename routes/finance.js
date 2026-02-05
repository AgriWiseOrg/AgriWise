const express = require('express');
const router = express.Router();

// GET /api/finance
router.get('/', (req, res) => {
    res.json({ message: 'Finance route working' });
});

module.exports = router;
