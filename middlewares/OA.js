const { Cart } = require('../models')
var jwt = require('jsonwebtoken');


class OA {
    static authenticate(req, res, next) {
        let token = req.headers.access_token
        if (token) {
            var decoded = jwt.verify(token, process.env.SECRET);
            req.customerId = decoded.customerId
            // req.customerRole = decoded.customerRole if customerrole needed
            next()
        } else {
            res.status(400).json({ msg: 'Login in first to continue' })
        }
    }


    static authorize(req, res, next) {
        if (req.params.id) {
            Cart.findByPk(req.params.id)
                .then(found => {
                    if (found) {
                        if (req.customerId == found.CustomerId) {
                            next()
                        } else {
                            res.status(400).json({ msg: 'Access Denied' })
                        }
                        next()
                    } else {
                        res.status(404).json({ msg: 'Product Not Found' })
                    }
                }).catch(err => {
                    res.status(500).json({ msg: 'Internal Server Error', err })
                })
        } else {
            // if (req.customerRole == 'admin') {
            //     next()
            // } else {
            //     res.status(400).json({ msg: 'Access Denied' })
            // }
            next()
        }


    }

    // static authorize(req, res, next) {
    //     Product.findByPk(req.params.id)
    //         .then(found => {
    //             if (found) {
    //                 if (found.CustomerId == req.customerId) {
    //                     req.taskId = found.id
    //                     req.taskTitle = found.title
    //                     req.taskCategory = found.category
    //                     next()
    //                 } else {
    //                     res.status(400).json({ msg: 'Access Denied' })
    //                 }

    //             } else {
    //                 res.status(404).json({ msg: 'Product Not Found' })
    //             }
    //         }).catch(err => {
    //             res.status(500).json({ msg: 'Internal Server Error', err })
    //         })

    // }
}

module.exports = OA