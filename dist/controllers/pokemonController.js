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
            const { name, pokemonAttributes } = pokemonData;
            // Check if the data already exists in each table
            const [createdName, created] = yield pokemonName_1.default.findOrCreate({
                where: { pokemonName: name },
                defaults: {
                    pokemonName: name
                }
            });
            if (!created) {
                console.log(`Data for ${name} already exists. Skipping insertion.`);
            }
            // // Insert the non-existing attributes into PokemonAttributes table
            const createdAttributes = [];
            for (const pokeAttribute of pokemonAttributes) {
                const attributeKeyName = Object.keys(pokeAttribute)[0]; // Get the attribute name        
                const attributeValue = pokeAttribute[attributeKeyName]; // Get the attribute value
                const [createdAttribute, created] = yield pokemonAttribute_1.default.findOrCreate({
                    where: { attributeName: attributeKeyName },
                    defaults: {
                        attributeName: attributeKeyName
                    }
                });
                const attributeRow = {
                    createdAttributeId: createdAttribute.id,
                    createdAttributeValue: attributeValue
                };
                if (created) {
                    createdAttributes.push(attributeRow);
                }
            }
            // Insert the Pokemon name and attributes into PokemonStat table
            const createdStats = [];
            for (const attributeRow of createdAttributes) {
                const [createdStat, created] = yield pokemonStat_1.default.findOrCreate({
                    where: { pokemonId: createdName.id, pokemonAttributeId: attributeRow.createdAttributeId },
                    defaults: {
                        pokemonId: createdName.id,
                        pokemonAttributeId: attributeRow.createdAttributeId,
                        attributeLevel: attributeRow.createdAttributeValue
                    }
                });
                if (created)
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
