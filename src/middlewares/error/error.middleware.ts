import CustomError from '@services/Error/Error';
import config from 'config';
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'joi';

const MODE = config.get('mode');

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const defaultErrorMessage = 'Something went wrong!';
  let error = {
    status: err.status || 501,
    message:
      MODE === 'development'
        ? err.message || defaultErrorMessage
        : defaultErrorMessage,
  };
  // Customize if the error is instanceof CustomError
  if (err instanceof CustomError) {
    error = {
      ...error,
    };
  }

  if (err instanceof ValidationError) {
    error = {
      ...error,
      status: 422,
    };
  }

  res.status(error.status).json(error);
};

export default errorMiddleware;
