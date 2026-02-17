const BaseService = require('./base.service');
const Category = require('../models/Category');

class CategoryService extends BaseService {
    constructor() {
        super(Category);
    }
}

const categoryService = new CategoryService();
module.exports = categoryService;
