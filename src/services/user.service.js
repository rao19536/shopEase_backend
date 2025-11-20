const { User, Product } = require("../database/models");
const { ApiError } = require("../utils/ApiError");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validations/user.validation");

module.exports = {
  createUser: async (payload) => {
    const { error } = createUserSchema.validate(payload, { abortEarly: false });
    if (error) {
      const details = error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message.replace(/["]/g, ""),
      }));
      throw ApiError.validation(details);
    }

    const user = await User.create(payload);
    return user;
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
  updateUser: async (id, payload) => {
    const user = await User.findByPk(id);
    if (!user)
      throw new ApiError(404, "User not found", { exceptionType: "NOT_FOUND" });

    await user.update(payload);
    return user;
  },
  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user)
      throw new ApiError(404, "User not found", { exceptionType: "NOT_FOUND" });

    await user.destroy();
    return true;
  },
};
