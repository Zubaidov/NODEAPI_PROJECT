const httpStatusCodes = require('http-status-codes');
const category = require('../models/category.model');

class CategoryController {
    getAll = (req, res) => {
        category.find().then(docs => {
            return res.status(httpStatusCodes.OK).send(docs);
        }).catch(err => {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
                message: 'Internal Server Error'
            });
        });
    }
    add = (req, res) => {
        const body = req.body;
        category.create(body).then(doc => {
            return res.status(httpStatusCodes.CREATED).send(doc);
        }).catch(err => {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
                message: 'Internal Server Error'
            });
        });
    }
}

module.exports = CategoryController;