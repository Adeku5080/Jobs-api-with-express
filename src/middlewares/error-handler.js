errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({ msg: 'internal server error' });
};

module.exports = errorHandlerMiddleware;
