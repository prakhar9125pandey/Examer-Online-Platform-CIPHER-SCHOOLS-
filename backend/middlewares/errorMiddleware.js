export const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Internal Server Error!";

  res
    .status(errStatus)
    .json({
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
};
