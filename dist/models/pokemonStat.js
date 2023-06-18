"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const pokemonName_1 = __importDefault(require("./pokemonName"));
const pokemonAttribute_1 = __importDefault(require("./pokemonAttribute"));
class pokemonStat extends sequelize_1.Model {
    // Sequelize model initialization
    static initModel() {
        pokemonStat.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            attributeLevel: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            pokemonId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            pokemonAttributeId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize: database_1.default,
            tableName: 'PokemonStats',
            timestamps: false,
        });
        // Define associations if needed
        pokemonStat.belongsTo(pokemonName_1.default, { foreignKey: 'pokemonId' });
        pokemonStat.belongsTo(pokemonAttribute_1.default, { foreignKey: 'pokemonAttributeId' });
    }
}
pokemonStat.initModel();
exports.default = pokemonStat;
