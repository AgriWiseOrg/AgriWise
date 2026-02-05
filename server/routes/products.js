const express = require('express');
const router = express.Router();

// GET /api/products
router.get('/', (req, res) => {
    res.json([{ id: 1, name: 'Sample Product', price: 100 }]);
});

module.exports = router;
