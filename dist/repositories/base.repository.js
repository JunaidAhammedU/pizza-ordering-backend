"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const errors_1 = require("../utils/errors");
class BaseRepository {
    prisma;
    modelName;
    constructor(prisma, modelName) {
        this.prisma = prisma;
        this.modelName = modelName;
    }
    async findByIdOrThrow(id) {
        const result = await this.prisma[this.modelName].findUnique({
            where: { id },
        });
        if (!result) {
            throw new errors_1.NotFoundError(`${this.modelName} with ID ${id} not found`);
        }
        return result;
    }
    async create(data) {
        try {
            const result = await this.prisma[this.modelName].create({
                data,
            });
            return result;
        }
        catch (error) {
            throw new Error(`Error creating ${this.modelName}: ${error}`);
        }
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map