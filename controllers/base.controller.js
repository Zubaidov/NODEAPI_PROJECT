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
        this.repo.findAll()
            .then(docs => {
                return this.ok(res, docs);
            })
            .catch(err => {
                console.log(err);
                return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
            });
    }

    add(req, res) {
        const body = req.body;
        this.repo.create(body)
            .then(doc => {
                return res.status(httpStatusCodes.CREATED).send(doc);
            })
            .catch(err => {
                console.log(err);
                return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
            });
    }

    update(req, res) {
        const id = req.params.id;
        const body = req.body;
        this.repo.update(id, body)
            .then(doc => {
                if (doc) {
                    return res.status(httpStatusCodes.OK).send(doc);
                } else {
                    return res.status(httpStatusCodes.NOT_FOUND).send({ message: "Not Found" });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
            });
    }

    delete(req, res) {
        const id = req.params.id;
        this.repo.delete(id)
            .then(doc => {
                if (doc) {
                    return this.ok(res, { message: "Deleted Successfully" });
                } else {
                    return res.status(httpStatusCodes.NOT_FOUND).send({ message: "Not Found" });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
            });
    }
}

module.exports = BaseController;
