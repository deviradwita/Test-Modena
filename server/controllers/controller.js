const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { code: 400, message: "Email is required" };
      }
      if (!password) {
        throw { code: 400, message: "Password is required" };
      }

      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser) {
        throw { code: 401, message: "Invalid email/password" };
      }

      const comparedPassword = compare(password, foundUser.password);

      if (!comparedPassword) {
        throw { code: 401, message: "Invalid email/password" };
      }

      const payload = {
        id: foundUser.id,
        role: foundUser.role,
      };

      const access_token = createToken(payload);

      res
        .status(200)
        .json({
          user: {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            avatar: foundUser.avatar,
          },
          access_token,
        });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, password, phone, email } = req.body;
      const userCreated = await User.create({
        name,
        email,
        password,
        phone,
        avatar: "empty",
        type: true,
      });
      res.status(201).json({ message: { id: userCreated.id, email } });
    } catch (error) {
      next(error);
    }
  }

  static async dashboard(req, res, next) {
    try {
      //random revenue
      const revenue = [];
      let sum = 0;

      for (let i = 0; i < 4; i++) {
        const randomNumber = Math.floor(Math.random() * 25) + 1;
        revenue.push(randomNumber);
        sum += randomNumber;
      }

      revenue.push(100 - sum);

      //random this month dashboard

      const detail = [];
      const title = [
        "Vendor/supplier",
        "Customer/Dealer",
        "Product SKU",
        "Purchase Order",
        "Sales Order",
        "Grinds",
        "Manuals",
        "Vert Transfers",
      ];
      for (let i = 0; i < title.length; i++) {
        let total = Math.floor(Math.random() * 1000000);
        let persen = Math.floor(Math.random() * 201) - 100;

        let result = {};
        result["title"] = title[i];
        result["total"] = total;
        result["percentage"] = persen;
        detail.push(result);
      }
      res.status(200).json({
        revenue,
        detail,
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadPhoto(req, res, next) {
    try {
      // console.log(req.file,"000000");
      if (!req.file) {
        console.log("No file received or invalid file type");
        throw { code: 400, message: "No file received or invalid file type" };
      }

      const updatePhoto = await User.update(
        { avatar: req.file.path },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      const photo = await User.findByPk(req.user.id);
      // console.log(photo);
      res
        .status(200)
        .json({ message: "Update Avatar Success", url: photo.avatar });
    } catch (error) {
      console.log(error, ">>>>");
      next(error);
    }
  }
}

module.exports = Controller;
