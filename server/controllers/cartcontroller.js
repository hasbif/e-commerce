const { Cart, Product, Customer } = require("../models");
const { Op } = require("sequelize");

class CartCtrl {


    // where includes stuff
    static list(req, res) {


        Customer.findOne({
            where: { id: req.customerId },
            include: [{
                model: Cart,
                include: Product
            }]
        })
            .then(customer => {
                res.status(200).json({ customer })
            })
            .catch(err => {
                res.status(500).json({ msg: 'Internal Server Error', err })
            })

    }

    static add(req, res) {
        const { ProductId, amount } = req.body


        // Cart.create({ CustomerId: req.customerId, ProductId, amount })
        //     .then(cart => {
        //         res.status(201).json({ cart })
        //     }).catch(err => {
        //         res.status(500).json({ msg: 'Internal Server Error', err })
        //     })

        Cart.findOne({
            where: {
                [Op.and]: [{ CustomerId: req.customerId }, { ProductId: ProductId }]
            }
        })
            .then(cart => {
                if (cart) {
                    return Cart.update({
                        amount: amount + cart.amount
                    }, { where: { id: cart.id }, returning: true })
                } else {
                    return Cart.create({
                        CustomerId: req.customerId,
                        ProductId,
                        amount
                    })
                }
            })
            .then(cart => {
                res.status(201).json({ cart })
            })
            .catch(err => {
                res.status(500).json({ msg: 'Internal Server Error', err })
            })
    }

    // static getbyId(req, res) {
    //     Cart.findByPk(req.params.id)
    //         .then(found => {
    //             if (found) {
    //                 res.status(200).json({ cart: found })
    //             } else {
    //                 res.status(404).json({ msg: 'Cart Not Found' })
    //             }
    //         }).catch(err => {
    //             res.status(500).json({ msg: 'Internal Server Error', err })
    //         })
    // }



    static edit(req, res) {
        const { amount } = req.body

        Cart.update({ amount }, { where: { id: req.params.id }, returning: true })
            .then(cart => {
                console.log(cart)
                res.status(200).json({ cart: cart[1][0] })
            }).catch(err => {
                res.status(500).json({ msg: 'Internal Server Error', err })
            })

    }

    static delete(req, res) {
        let cart

        Cart.findByPk(req.params.id)
            .then(found => {
                if (found) {
                    cart = found
                    return Cart.destroy({ where: { id: req.params.id } })
                } else {
                    res.status(404).json({ msg: 'Cart Not Found' })
                }
            }).then(data => {
                res.status(200).json({ cart });
            })
            .catch(err => {
                res.status(500).json({ msg: 'Internal Server Error', err })
            })
    }

    static checkout(req, res) {
        Cart.destroy({ where: { CustomerId: req.customerId } })
            .then(data => {
                res.status(200).json({ msg: 'product deleted' })
            }).catch(err => {
                res.status(500).json({ msg: 'Internal Server Error', err })
            })


        // const { stock } = req.body

        // Product.update({ stock }, { where: { id: req.params.id }, returning: true })
        //     .then(product => {
        //         console.log(product)
        //         res.status(200).json({ product: product[1][0] })
        //     }).catch(err => {
        //         res.status(500).json({ msg: 'Internal Server Error', err })
        //     })

    }

}


module.exports = CartCtrl