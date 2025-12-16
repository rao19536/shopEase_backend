"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      role: {
        type: DataTypes.ENUM("SUPER_ADMIN", "ADMIN", "USER", "SELLER"),
        allowNull: false,
        defaultValue: "USER",
      },
      active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "users",
      // underscored: true, // optional, for snake_case columns
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: "userId",
      as: "products",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return User;
};
