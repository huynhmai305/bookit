import ErrorHandler from "../utils/errorHandler";

// eslint-disable-next-line import/no-anonymous-default-export
export default (err: any, _req: any, res: any, _next: any) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };

  error.message = err.message;

  // wrong mongoose Object ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Handling mongoose Validation Error
  if (err.name === "ValidationError") {
    const message: any = Object.values(err.errors).map(
      (value: any) => value.message
    );
    error = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
