const express = require('express');
const router = express.Router();

// GET /api/govt-schemes
router.get('/', (req, res) => {
    res.json([{ id: 1, name: 'Sample Govt Scheme' }]);
});

module.exports = router;
