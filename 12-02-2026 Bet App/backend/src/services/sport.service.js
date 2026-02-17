const BaseService = require('./base.service');
const Sport = require('../models/Sport');

class SportService extends BaseService {
    constructor() {
        super(Sport);
    }
}

const sportService = new SportService();
module.exports = sportService;
