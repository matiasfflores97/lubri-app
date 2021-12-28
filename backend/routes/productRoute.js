const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/productController');
const jwt               = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, 'secret')
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

router.get('/products',       verifyToken, productController.getProducts)
router.get('/products/:id',   verifyToken, productController.getProducts)
router.post('/products',      verifyToken, productController.createProduct)
router.put('/products/:id',   verifyToken, productController.updateProduct)
router.delete('/product/:id', verifyToken, productController.deleteProduct)

module.exports = router;
