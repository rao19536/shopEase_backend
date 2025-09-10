"use strict";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      stock: { type: DataTypes.INTEGER },
      image: { type: DataTypes.STRING },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "products",
      underscored: true, // optional
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      as: "user",
      foreignKey: { name: "userId", allowNull: false },
      onDelete: "RESTRICT", // block deleting a user if products exist
      onUpdate: "CASCADE",
    });
  };

  return Product;
};
