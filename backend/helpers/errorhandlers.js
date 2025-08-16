// errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size too large. Max size is 2MB.",
      });
    }
  }

  if (err.message.includes("Invalid file type")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Other server errors
  return res.status(500).json({
    success: false,
    message: "Something went wrong.",
  });
};

export default errorHandler;
