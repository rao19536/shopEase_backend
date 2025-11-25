"use strict";

const { ROLES } = require("../../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "role", {
      type: Sequelize.ENUM(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER),
      allowNull: false,
      defaultValue: ROLES.USER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "role");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_role";'
    );
  },
};
