const mongoose  = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    quantity: Number,
    description: String,
    createAt: {
        type: Date,
        inmutable: true,
        default: () => Date.now() 
    },
    updateAt: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model('products', productSchema);