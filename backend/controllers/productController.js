const Product = require('../schemas/product');

exports.getProducts = async (req, res) => {
    if(req.params.id){
        const getProduct = await Product.findById(req.params.id)
        res.send(getProduct)
    }else{
        const getProduct = await Product.find()
        res.send(getProduct)
    }
}

exports.createProduct = () => async (req, res) => {
    const newProduct = await Product.create({
        title: req.body.title,
        quantity: req.body.quantity,
        description: req.body.description
    })
    res.send(newProduct)
}

exports.updateProduct = async ( req, res ) => {
    const filter = req.params.id;
    const updateProduct = await Product.findOneAndUpdate({ _id: filter }, req.body)

    const resUpdateProduct = await Product.findOne({ _id: filter })
    res.send(resUpdateProduct)
}

exports.deleteProduct = async ( req, res ) => {
    const filter = req.params.id
    const deleteProduct = await Product.deleteOne({ _id: filter })

    res.send(deleteProduct)
}

