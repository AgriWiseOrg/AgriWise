const express = require('express');
const router = express.Router();

// GET /api/latest-updates
router.get('/', (req, res) => {
    res.json([{ id: 1, update: 'Heavy rains expected' }]);
});

module.exports = router;
