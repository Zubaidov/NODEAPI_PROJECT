const httpStatusCodes = require('http-status-codes');

class BaseController {

    constructor(repoClass) {
        this.repo = new repoClass();
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // common response methods
    ok(res, data) {
        if (!!data) {
            res.status(httpStatusCodes.OK).send(data);
        } else {
            return res.status(httpStatusCodes.OK).send({ message: 'OK' });
        }

    }

    // common db operations
    getAll(req, res) {
        this.repo.findAll().then(docs => {
            return this.ok(res, docs);
        }).catch(err => {
            console.log(err);
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
        });
    }

    internalServerError(res, error) {
        //console.log(error); //to check the error
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
    }

    add(req, res) {
        const body = req.body;
        this.repo.create(body).then(doc => {
            return res.status(httpStatusCodes.CREATED).send(doc);
        }).catch(err => {
            //console.log(err);
            return this.internalServerError(res, err);
        });
    }

    update = (req, res) => {
        const body = req.body;
        this.repo.update(body).then(doc => {
            return this.ok(res, doc);
        }).catch(err => {
            return this.internalServerError(res, err);
        })
    }

    delete = (req, res) => {
        let id = req.params.id;
        this.repo.deleteById(id).then(doc => {
            return this.ok(res, doc);
        }).catch(err => {
            return this.internalServerError(res, err);
        });
    }
    getById = (req, res) => {
        let id = req.params.id;
        this.repo.findById(id).then(doc => {
            return this.ok(res, doc);
        }).catch(err => {
            return this.internalServerError(res, err);
        });
    }
}

module.exports = BaseController;
