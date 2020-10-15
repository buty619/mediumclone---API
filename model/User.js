const mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userImg: String,
  bio: String,
});

userSchema.statics.authenticate = async (auth, password) => {
  const user = await mongoose.model("User").findOne(auth);
  if (user) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result === true ? user : null);
      });
      return user;
    });
  }
  return null;
};

module.exports = mongoose.model("User", userSchema);
