const sportService = require('../services/sport.service');

const create = async (req, res) => {
    const result = await sportService.create(req.body);
    if (result.error) {
        return res.status(400).json({
            message: result.message
        });
    }

    return res.status(201).json({
        message: "Sport created successfully !!!"
    }); 
};

const findMany = async (req, res) => {};
const find = async (req, res) => {};
const update = async (req, res) => {};
const remove = async (req, res) => {};

module.exports = { create, findMany, find, update, remove };

