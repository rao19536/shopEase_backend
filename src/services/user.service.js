const { User, Product } = require("../database/models");
const { ApiError } = require("../utils/ApiError");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validations/user.validation");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: async (payload) => {
    const { error } = createUserSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw ApiError.validation(error.details);
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await User.create({
      ...payload,
      password: hashedPassword,
    });
    return user;
  },
  getAllUsers: async () => {
    return User.findAll({
      where: { active: true },
      include: {
        model: Product,
        as: "products",
        required: false,
      },
      order: [["id", "ASC"]],
    });
  },
  getUserById: async (id) => {
    return User.findByPk(id, {
      include: { model: Product, as: "products" },
    });
  },
  updateUser: async (id, payload) => {
    console.log("id=>test", id, payload);
    const user = await User.findByPk(id);
    if (!user) throw ApiError.notFound("User not found");

    const { error } = updateUserSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw ApiError.validation(error.details);
    }
    const updateData = { ...payload };

    if (payload.password) {
      updateData.password = await bcrypt.hash(payload.password, 10);
    } else {
      delete updateData.password;
    }

    await user.update(updateData);

    return user;
  },
  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user)
      throw new ApiError(404, "User not found", { exceptionType: "NOT_FOUND" });

    await user.destroy();
    return true;
  },
  updateUserStatus: async (id, payload) => {
    const user = await User.findByPk(id);
    if (!user) throw ApiError.notFound("User not found");
    console.log("payload=>", payload);
    const updatedUser = await user.update({
      active: payload?.active,
    });

    return updatedUser;
  },
};
