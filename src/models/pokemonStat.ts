import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import PokemonName from './pokemonName';
import PokemonAttribute from './pokemonAttribute';

interface PokemonStatInterface {
  id: number;
  attributeLevel: number;
  pokemonId: number;
  pokemonAttributeId:number;
}

interface PokemonStatCreation extends Optional<PokemonStatInterface, 'id'> {}

class pokemonStat extends Model<PokemonStatInterface, PokemonStatCreation> implements PokemonStatInterface {
  declare id: number;
  declare attributeLevel: number;
  declare pokemonId: number;
  declare pokemonAttributeId:number;

  // Sequelize model initialization
  static initModel(): void {
    pokemonStat.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique:true,
        },
        attributeLevel: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pokemonId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pokemonAttributeId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
      },
      {
        sequelize,
        tableName: 'PokemonStats',
        timestamps: false,
      }
    );

    // Define associations if needed
    pokemonStat.belongsTo(PokemonName, { foreignKey: 'pokemonId' });
    pokemonStat.belongsTo(PokemonAttribute, { foreignKey: 'pokemonAttributeId' });
  }
}

pokemonStat.initModel();

export default pokemonStat;