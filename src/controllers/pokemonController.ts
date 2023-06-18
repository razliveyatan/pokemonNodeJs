import { Request, Response } from 'express';
import PokemonName from '../models/pokemonName';
import pokemonAttribute from '../models/pokemonAttribute';
import pokemonStat from '../models/pokemonStat';

interface PokemonData {
  name: string;
  attributes: { [key: string]: string | number }[];
}

export const createPokemon = async (req: Request, res: Response) => {
  try {
    const jsonData: PokemonData[] = req.body;

    // Iterate over each Pokemon object in the JSON array
    for (const pokemonData of jsonData) {
      const { name, attributes } = pokemonData;

      // Check if the data already exists in each table
      let createdName:any;
      const existingName = await PokemonName.findOne({ where: { pokemonName: name } });
      if (existingName) {
        console.log(existingName);
        console.log(`Data for ${name} already exists. Skipping insertion.`);      
      }      
      else {
        createdName = await PokemonName.create({ pokemonName:name });
      }           

      // Check if the attributes with the same names already exist in PokemonAttributes table
      const existingAttributes = await pokemonAttribute.findAll();
      const existingAttributeNames = existingAttributes.map((attribute) => attribute.attributeName);
      console.log(existingAttributeNames);

      // Insert the non-existing attributes into PokemonAttributes table
      const createdAttributes:any = [];
      for (const attribute of attributes) {
        const attributeKeyName = Object.keys(attribute)[0]; // Get the attribute name
        console.log(attributeKeyName);
        const attributeValue = attribute[attributeKeyName]; // Get the attribute value

        if (!existingAttributeNames.includes(attributeKeyName)) {
          const createdAttribute = await pokemonAttribute.create({ attributeName: attributeKeyName });
          const attributeRow = {
            createdAttributeId:createdAttribute.id,
            createdAttributeValue:attributeValue        
          }
          createdAttributes.push(attributeRow);
        }
      }

      // Insert the Pokemon name and attributes into PokemonStat table
      const createdStats:any = [];
      for (const attributeRow of createdAttributes) {
        const createdStat = await pokemonStat.create({
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
  } catch (error) {
    console.error('Error creating pokemons:', error);
    res.status(500).json({ message: 'Failed to create pokemons' });
  }
};