import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PokemonAttributeInterface {
  id: number;
  attributeName: string;
}

interface PokemonAttributeCreation extends Optional<PokemonAttributeInterface, 'id'> {}

class pokemonAttribute extends Model<PokemonAttributeInterface, PokemonAttributeCreation> implements PokemonAttributeInterface {
  public id!: number;
  public attributeName!: string;

  // Add any associations or methods here if needed

  // Sequelize model initialization
  static initModel(): void {
    pokemonAttribute.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        attributeName: {
          type: DataTypes.STRING,
          allowNull: false,
        },        
      },
      {
        sequelize,
        tableName: 'PokemonAttributes',
        timestamps: false,
      }
    );
  }
}

pokemonAttribute.initModel();

export default pokemonAttribute;