const BaseRepository = require('./base.repository');
const product = require('../models/product.model');

class ProductRepository extends BaseRepository {
    constructor() {
        super(product);
    }
}

module.exports = ProductRepository;