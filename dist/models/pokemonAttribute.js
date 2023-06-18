"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class pokemonAttribute extends sequelize_1.Model {
    // Add any associations or methods here if needed
    // Sequelize model initialization
    static initModel() {
        pokemonAttribute.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            attributeName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize: database_1.default,
            tableName: 'PokemonAttributes',
            timestamps: false,
        });
    }
}
pokemonAttribute.initModel();
exports.default = pokemonAttribute;
