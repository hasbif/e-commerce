const { Product, User } = require("../models");

class ProductCtrl {

    static list(req, res) {
        Product.findAll({ order: [['id', 'asc']] })
            .then(product => {
                res.status(200).json({ product })
            }).catch(err => {
                res.status(500).json({ msg: 'Internal Server Error', err })
            })
    }

    // static add(req, res) {
    //     const { name, image_url, price, stock } = req.body
    //     Product.create({ name, image_url, price, stock })
    //         .then(product => {
    //             res.status(201).json({ product })
    //         }).catch(err => {
    //             res.status(500).json({ msg: 'Internal Server Error', err })
    //         })
    // }

    static getbyId(req, res) {
        Product.findByPk(req.params.id)
            .then(found => {
                if (found) {
                    res.status(200).json({ product: found })
                } else {
                    res.status(404).json({ msg: 'Product Not Found' })
                }
            }).catch(err => {
                res.status(500).json({ msg: 'Internal Server Error', err })
            })
    }



    static checkout(req, res) {

        const { cart } = req.body

        // let stock

        // for (let i in cart) {
        //     Product.findByPk(cart[i].ProductId)
        //         .then(data => {
        //             stock = data.stock - cart[i].amount
        //             return Product.update({ stock }, { where: { id: data.id } })
        //         })
        // }

        // Product.update({ stock }, { where: { id: req.params.id }, returning: true })
        //     .then(product => {
        //         console.log(product)
        //         res.status(200).json({ product: product[1][0] })
        //     }).catch(err => {
        //         res.status(500).json({ msg: 'Internal Server Error', err })
        //     })




        const promises = cart
            .map(function (x) { // this is Array.prototype.map()
                if ((x.Product.stock - x.amount) < 0) {
                    throw new Error(`${x.Product.name}'s is not enough`)
                }
                return Product.update({ stock: (x.Product.stock - x.amount) }, { where: { id: x.ProductId } })
            })
        Promise.all(promises)
            .then(results => {
                console.log(results);
                res.status(200).json({ results });
            }).catch(err => {
                res.status(400).json({ err })
            })

    }



    // static delete(req, res) {
    //     let product

    //     Product.findByPk(req.params.id)
    //         .then(found => {
    //             if (found) {
    //                 product = found
    //                 return Product.destroy({ where: { id: req.params.id } })
    //             } else {
    //                 res.status(404).json({ msg: 'Product Not Found' })
    //             }
    //         }).then(data => {
    //             res.status(200).json({ product });
    //         })
    //         .catch(err => {
    //             res.status(500).json({ msg: 'Internal Server Error', err })
    //         })




    //     // Product.destroy({ where: { id: req.params.id } })
    //     //     .then(data => {
    //     //         res.status(200).json({ msg: 'Product Deleted' });
    //     //     })
    //     //     .catch(err => {
    //     //         res.status(500).json({ msg: 'Internal Sever Error', err });
    //     //     });
    // }
}


module.exports = ProductCtrl