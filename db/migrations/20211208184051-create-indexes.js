module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Indexes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.TEXT,
      },
      risk: {
        type: Sequelize.TEXT,
      },
      bmr: {
        type: Sequelize.INTEGER,
      },
      ideal_weight: {
        type: Sequelize.STRING,
      },
      whr_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      whr_value: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      whtr_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      whtr_value: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      original_height: {
        type: Sequelize.INTEGER,
      },
      original_weight: {
        type: Sequelize.INTEGER,
      },
      waist: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hip: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sex: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Indexes');
  },
};
