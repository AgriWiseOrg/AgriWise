const express = require('express');
const router = express.Router();

// GET /api/farming-tips
router.get('/', (req, res) => {
    res.json([{ id: 1, tip: 'Use organic fertilizer' }]);
});

module.exports = router;
