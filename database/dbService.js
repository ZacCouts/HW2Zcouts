const User = require('./models/user');
const Product = require('./models/product');

exports.getUsers = async function (query) {
  try {
    const users = await User.find(query);
    return users;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};

exports.getProduct = async function (query) {
  try {
    const product = await Product.find(query);
    return product;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
