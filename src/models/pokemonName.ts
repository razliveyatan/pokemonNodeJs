import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class PokemonName extends Model {
  public pokemonName!: string;

  static initModel(): void {
    PokemonName.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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