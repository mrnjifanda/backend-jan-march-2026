class BaseService {

    constructor(model) {
        if (!model) {
            throw new Error("Model is required");
        }

        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return {
                error: false,
                data: result,
                message: "Item created successfully !!!"
            };
        } catch (error) {
            return {
                error: true,
                message: error.message || "Error, please try again !!!"
            };
        }
    }

    async find(filter = {}) {
        try {
            const result = await this.model.find(filter);
            return {
                error: false,
                data: result
            }
        } catch (error) {
            return {
                error: true,
                message: error.message || "Error, please try again !!!"
            };
        }
    }

    async update(id, data) {
        try {
            if (!id || !data) {
                return {
                    error: true,
                    message: "Please send id and data !!!"
                }
            }

            const result = await this.model.findByIdAndUpdate(id, data);
            return { error: false, message: "Data updated successfully !!!" }
        } catch (error) {
            return {
                error: true,
                message: error.message || "Error, please try again !!!"
            };
        }
    }

    async remove(id) {
        try {
            if (!id) {
                return {
                    error: true,
                    message: "Please send id !!!"
                }
            }

            const result = await this.model.findByIdAndDelete(id);
            return { error: false, message: "Data deleted successfully !!!" }
        } catch (error) {
            return {
                error: true,
                message: error.message || "Error, please try again !!!"
            };
        }
    }
}

module.exports = BaseService