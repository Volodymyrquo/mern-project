const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const router = Router();
//  /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некоректний емейл').isEmail(),
    check('password', 'Мінімальна довжина паролю 6 символів').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректні дані під час реєстрації',
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'Такий користувач уже існує' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'Користувача створено' });
    } catch (error) {
      res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' });
    }
  }
);
//  /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введіть коректний емейл').normalizeEmail().isEmail,
    check('password', 'Введіть пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректні дані під час входу в систему',
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: 'Користувача не знайдено',
        });

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ message: 'Невірний пароль, спробуйте знову' });
        }
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });

      res.json(token, { userId: user.id });
    } catch (error) {
      res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' });
    }
  }
);

module.exports = router;
