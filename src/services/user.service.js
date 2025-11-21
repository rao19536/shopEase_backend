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
      throw ApiError.validation(error.details);
    }

    const user = await User.create(payload);
    return user;
  },
  getAllUsers: async () => {
    return User.findAll({
      include: {
        model: Product,
        as: "products",
      },
      order: [["id", "DESC"]],
    });
  },
  getUserById: async (id) => {
    return User.findByPk(id, {
      include: { model: Product, as: "products" },
    });
  },
  updateUser: async (id, payload) => {
    const user = await User.findByPk(id);
    if (!user) throw ApiError.notFound("User not found");

    const { error } = updateUserSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw ApiError.validation(error.details);
    }
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
