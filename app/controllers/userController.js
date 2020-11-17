
const bcrypt = require('bcrypt');
const Joi = require('joi');


// IMPORT MODELS
const User = require('../models/User');


const userController = {
  
  getAll: async (req, res, next) => {
    try {
      const data = await User.findAll();
      res.json(data);
    }
    catch (err) {
        console.error(err);
        res.json(err);
    }
  },

  getOne: async (req, res, next) => {
      try {
        const userId = req.params.id;
        const data = await User.findOne(userId);
        res.json(data);
      }
      catch (err) {
        console.error(err);
        res.json(err);
      }
  },

  update: async (req, res, next) => {
  
  try {
    
    const existingUser = await User.findOne(req.params.id);

    if (!existingUser) {
        return res.status(500).json("Auncun utilisateur trouvé");
    }

    // Password crypted
    passwordHashed = bcrypt.hashSync(req.body.password, 10);

    existingUser.firstname = req.body.firstname;
    existingUser.lastname = req.body.lastname;
    existingUser.email = req.body.email;
    existingUser.password = passwordHashed;;
    
    const data = await User.update(existingUser);
    return res.json(data);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},


  create: async (req, res, next) => {

    // Set validator schema
    const userSchema = Joi.object({
      firstname: Joi.string().min(3).max(20).required().messages({
         "string.empty": "Le champs prénom est vide",
         "string.min": "Le prénom doit avoir au minimum 3 caractères",
         "string.max": "Le prénom ne doit pas dépasser 20 caractères"
      }),
      lastname: Joi.string().min(3).max(20).required().messages({
         "string.empty": "Le champs nom est vide",
         "string.min": "Le nom doit avoir au minimum 3 caractères",
         "string.max": "Le nom ne doit pas dépasser 20 caractères"
      }),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr', 'io']}}).required().messages({
         "string.empty": "Le champs email est vide",
         "string.email": "Ce n'est pas un email valide"
      }),
      password: Joi.string().min(8).required().messages({
         "string.min": "Le mot de passe doit avoir au minimum 3 caractères",
         "string.empty": "Le champs mot de passe est vide",
         "any.only": "Le mot de passe n'est pas identique"
      }),
      repeatPassword: Joi.string().min(8).required().messages({
         "string.min": "Le mot de passe doit avoir au minimum 3 caractères",
         "string.empty": "Le champs mot de passe est vide",
         "any.only": "Le mot de passe n'est pas identique"
      }),
      repeatPassword: Joi.ref('password')
   });

  try {

      // Check validator schema
      await userSchema.validateAsync(req.body);

      // // Password crypted
      passwordHashed = bcrypt.hashSync(req.body.password, 10);

      // // New user
      const newUser = new User();

      newUser.firstname = req.body.firstname;
      newUser.lastname = req.body.lastname;
      newUser.email = req.body.email;
      newUser.password = passwordHashed;

      console.log(newUser)
      
      const data = await User.create(newUser);
      console.log(data);

      return res.json(data);
    }
    catch (err) {
      console.error(err);
      res.json(err);
    }
  },

  delete: async (req, res, next) => {

    try {

      const targetUser = await User.findOne(req.params.id);
    
      if (! targetUser) {
        return res.status(500).json("aucun utilisateur trouvé");
      }

      const targetUserId = targetUser.id;

      const data = await User.delete(targetUserId);
      return res.json(data);

    }
    catch (err) {

      console.error(err);
      res.status(500).json(err);

    }

    
  }

};

  
module.exports = userController;

