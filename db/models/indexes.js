const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Index extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'id' });
    }
  }
  Index.init({
    status: {
      type: DataTypes.TEXT,
    },
    risk: {
      type: DataTypes.TEXT,
    },
    bmr: {
      type: DataTypes.INTEGER,
    },
    ideal_weight: {
      type: DataTypes.STRING,
    },
    whr_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whr_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    whtr_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whtr_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    original_height: {
      type: DataTypes.INTEGER,
    },
    original_weight: {
      type: DataTypes.INTEGER,
    },
    waist: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hip: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Index',
    tableName: 'Indexes',
    updatedAt: false,
  });
  return Index;
};
