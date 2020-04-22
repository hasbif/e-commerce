const { Customer } = require("../models");
const jwt = require("jsonwebtoken");
const { decrypt } = require("../helpers/bcrypt");



class CustomerController {

    static register(req, res) {
        let { email, password } = req.body;
        Customer.findOne({ where: { email: email } })
            .then(foundOne => {
                if (foundOne) {
                    res.status(400).json({ msg: 'Email is Already Taken' })
                } else {
                    return Customer.create({ email, password })
                }
            })
            .then(customer => {
                const access_token = jwt.sign({ customerId: customer.id }, process.env.SECRET);
                res.status(201).json({ access_token });
            })
            .catch((error) => {
                console.log(error, 'error')
                res.status(500).json({ msg: 'Internal Server Error', error })
            })
    }

    static login(req, res) {
        let { email, password } = req.body;
        Customer.findOne({ where: { email: email } })
            .then(customer => {
                let msg = "Email/Password Invalid";
                if (customer) {
                    if (decrypt(password, customer.password)) {
                        const access_token = jwt.sign({ customerId: customer.id }, process.env.SECRET);
                        res.status(200).json({ access_token });
                    } else {
                        console.log('wrong password')
                        res.status(401).json({ msg });
                    }
                } else {
                    console.log('wrong account')
                    res.status(401).json({ msg });
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({ msg: 'Internal Server Error', err })
            })
    }


}

module.exports = CustomerController;