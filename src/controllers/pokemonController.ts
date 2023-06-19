import { Request, Response } from 'express';
import PokemonName from '../models/pokemonName';
import pokemonAttribute from '../models/pokemonAttribute';
import pokemonStat from '../models/pokemonStat';

interface PokemonData {
  name: string;
  pokemonAttributes: { [key: string]: string | number }[];
}


export const createPokemon = async (req: Request, res: Response) => {
  try {
    const jsonData: PokemonData[] = req.body;

    // Iterate over each Pokemon object in the JSON array
    for (const pokemonData of jsonData) {
      const { name, pokemonAttributes } = pokemonData;

      // Check if the data already exists in each table
      const [createdName, created] = await PokemonName.findOrCreate({ 
        where: { pokemonName: name },
        defaults: {
          pokemonName: name
        } 
      });
      if (!created) {        
        console.log(`Data for ${name} already exists. Skipping insertion.`);   
      }       

      // // Insert the non-existing attributes into PokemonAttributes table
      const createdAttributes:any = [];
      for (const pokeAttribute of pokemonAttributes) {
        const attributeKeyName = Object.keys(pokeAttribute)[0]; // Get the attribute name        
        const attributeValue = pokeAttribute[attributeKeyName]; // Get the attribute value

        const [createdAttribute,created] = await pokemonAttribute.findOrCreate({
           where: {attributeName: attributeKeyName},
           defaults:{
            attributeName:attributeKeyName
           }
        });
        const attributeRow = {
          createdAttributeId:createdAttribute.id,
          createdAttributeValue:attributeValue        
        }
        if (created){
          createdAttributes.push(attributeRow);
        }        
      }    
      // Insert the Pokemon name and attributes into PokemonStat table
      const createdStats:any = [];
      for (const attributeRow of createdAttributes) {
        const [createdStat,created] = await pokemonStat.findOrCreate({
          where:{pokemonId : createdName.id, pokemonAttributeId: attributeRow.createdAttributeId},
          defaults:{
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
  } catch (error) {
    console.error('Error creating pokemons:', error);
    res.status(500).json({ message: 'Failed to create pokemons' });
  }
};