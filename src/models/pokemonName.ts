import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PokemonNameInterface {
  id: number;
  pokemonName: string;
}

interface PokemonNameCreationAttributes extends Optional<PokemonNameInterface, 'id'> {}

class PokemonName extends Model<PokemonNameInterface, PokemonNameCreationAttributes> implements PokemonNameInterface {
  declare id:number;
  declare pokemonName: string;

  static initModel(): void {
    PokemonName.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique:true,
        },
        pokemonName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'PokemonNames',
        timestamps: false,
      }
    );
  }
}

PokemonName.initModel();

export default PokemonName;