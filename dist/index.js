"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const database_1 = require("./config/database");
const logger_1 = __importDefault(require("./config/logger"));
const app = new app_1.App();
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        await app.start();
    }
    catch (error) {
        logger_1.default.error('Failed to start application:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map