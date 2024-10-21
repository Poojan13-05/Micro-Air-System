// middleware/auth.js
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

const protect = async (req, res, next) => {
  let token;
  
  // Check if token exists in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the authenticated owner and attach it to the request object
      req.owner = await Owner.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ status: 'fail', message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ status: 'fail', message: 'No token, authorization denied' });
  }
};

module.exports = protect;
