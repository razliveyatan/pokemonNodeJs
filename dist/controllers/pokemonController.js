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
exports.createPokemon = void 0;
const pokemonName_1 = __importDefault(require("../models/pokemonName"));
const pokemonAttribute_1 = __importDefault(require("../models/pokemonAttribute"));
const pokemonStat_1 = __importDefault(require("../models/pokemonStat"));
const createPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsonData = req.body;
        // Iterate over each Pokemon object in the JSON array
        for (const pokemonData of jsonData) {
            const { name, attributes } = pokemonData;
            // Check if the data already exists in each table
            let createdName;
            const existingName = yield pokemonName_1.default.findOne({ where: { pokemonName: name } });
            if (existingName) {
                console.log(existingName);
                console.log(`Data for ${name} already exists. Skipping insertion.`);
            }
            else {
                createdName = yield pokemonName_1.default.create({ pokemonName: name });
            }
            // Check if the attributes with the same names already exist in PokemonAttributes table
            const existingAttributes = yield pokemonAttribute_1.default.findAll();
            const existingAttributeNames = existingAttributes.map((attribute) => attribute.attributeName);
            // Insert the non-existing attributes into PokemonAttributes table
            const createdAttributes = [];
            for (const attribute of attributes) {
                const attributeKeyName = Object.keys(attribute)[0]; // Get the attribute name
                console.log(attributeKeyName);
                const attributeValue = attribute[attributeKeyName]; // Get the attribute value
                if (!existingAttributeNames.includes(attributeKeyName)) {
                    const createdAttribute = yield pokemonAttribute_1.default.create({ attributeName: attributeKeyName });
                    const attributeRow = {
                        createdAttributeId: createdAttribute.id,
                        createdAttributeValue: attributeValue
                    };
                    createdAttributes.push(attributeRow);
                }
            }
            // Insert the Pokemon name and attributes into PokemonStat table
            const createdStats = [];
            for (const attributeRow of createdAttributes) {
                const createdStat = yield pokemonStat_1.default.create({
                    pokemonId: !existingName ? createdName.id : existingName,
                    pokemonAttributeId: attributeRow.createdAttributeId,
                    attributeLevel: attributeRow.createdAttributeValue
                });
                createdStats.push(createdStat);
            }
            console.log(`Inserted data for ${name} into all three tables.`);
            console.log('Created Name:', createdName);
            console.log('Created Attributes:', createdAttributes);
            console.log('Created Stats:', createdStats);
        }
        res.status(201).json({ message: 'Pokemons created successfully' });
    }
    catch (error) {
        console.error('Error creating pokemons:', error);
        res.status(500).json({ message: 'Failed to create pokemons' });
    }
});
exports.createPokemon = createPokemon;
