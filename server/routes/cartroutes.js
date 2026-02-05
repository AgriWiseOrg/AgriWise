const express = require('express');
const router = express.Router();

// GET /api/cart
router.get('/', (req, res) => {
    res.json({ items: [] });
});

module.exports = router;
