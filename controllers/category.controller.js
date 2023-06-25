const httpStatusCodes = require('http-status-codes');
const CategoryRepository = require('../repositories/category.repository');

class CategoryController {
    constructor() {
        this.repo = new CategoryRepository();
    }
    getAll = (req, res) => {
        this.repo.findAll().then(docs => {
            return res.status(httpStatusCodes.OK).send(docs);
        }).catch(err => {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
                message: 'Internal Server Error'
            });
        });
    }
    add = (req, res) => {
        const body = req.body;
        this.repo.create(body).then(doc => {
            return res.status(httpStatusCodes.CREATED).send(doc);
        }).catch(err => {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
                message: 'Internal Server Error'
            });
        });
    }
}

module.exports = CategoryController;