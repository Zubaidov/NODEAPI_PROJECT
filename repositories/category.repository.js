const BaseRepository = require('./base.ropository');
const category = require('../models/category.model');

class CategoryRepository extends BaseRepository {
    constructor() {
        super(category);
    }
}

module.exports = CategoryRepository;