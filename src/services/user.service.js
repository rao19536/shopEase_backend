const { User, Product } = require("../database/models");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validations/user.validation");

module.exports = {
  createUser: async ({ name, email, password }) => {
    try {
      const validationResult = createUserSchema.validate(
        { name, email, password }
        // { abortEarly: false } // <-- show all validation errors
      );

      if (validationResult.error) {
        const errorDetails = validationResult.error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message.replace(/["]/g, ""), // remove extra quotes
        }));

        return {
          statusCode: 400,
          error: true,
          data: null,
          message: "Validation failed",
          errors: errorDetails,
          exceptionType: "VALIDATION_EXCEPTION",
        };
      }
      const newUser = await User.create({ name, email, password });

      return {
        statusCode: 201,
        error: false,
        data: newUser,
        message: "User created successfully",
      };
    } catch (err) {
      return {
        statusCode: 500,
        error: true,
        data: null,
        message: err.message || "Internal server error",
        exceptionType: "SERVER_EXCEPTION",
      };
    }
  },
  getAllUsers: async () => {
    return User.findAll({
      include: { model: Product, as: "products" },
    });
  },
  getUserById: async (id) => {
    return User.findByPk(id, {
      include: { model: Product, as: "products" },
    });
  },
  updateUser: async (id, updates) => {
    const { error } = updateUserSchema.validate(updates);
    if (error) throw new Error(error.details[0].message);

    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user.update(updates);
  },
  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return { message: "User deleted" };
  },
};
