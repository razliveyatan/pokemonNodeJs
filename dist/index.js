"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const sequelize_1 = require("sequelize");
const pokemonController_1 = require("./controllers/pokemonController");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'pokemonDB.db',
});
// Initialize Express
const app = (0, express_1.default)();
// Parse JSON request bodies
app.use(body_parser_1.default.json());
// Define your routes
app.post('/pokemons', pokemonController_1.createPokemon);
// Start the application
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.sync();
        console.log('Database connection established');
        // Start the server
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}))();
