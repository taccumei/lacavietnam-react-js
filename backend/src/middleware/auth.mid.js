import pkg from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constanst/httpStatus.js';

//SyntaxError: Named export 'verify' not found. The requested module 'jsonwebtoken' is a CommonJS module, which may not support all module.exports as named exports.
//CommonJS modules can always be imported via the default export
const { verify } = pkg;

export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }

  return next();
};