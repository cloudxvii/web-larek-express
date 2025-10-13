import { Request, Response, NextFunction } from 'express';

interface ClientError {
  statusCode?: number;
  message: string;
}

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const clientError = err as ClientError;

  const statusCode = clientError.statusCode || 500;
  const message = clientError.message || 'Internal Server Error';

  const errorResponse = { message };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
