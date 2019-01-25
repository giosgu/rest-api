"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const MainRoute_1 = require("./routes/MainRoute");
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        this.app.disable('etag');
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use("/", MainRoute_1.mainRoutes);
    }
}
exports.default = new App().app;
