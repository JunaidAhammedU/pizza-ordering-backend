import { Response } from 'express';
import { PaginatedResponse } from '../types';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  error?: string,
): void => {
  const response: any = {
    success: false,
    message,
    error,
  };

  res.status(statusCode).json(response);
};

export const sendPaginatedResponse = <T>(
  res: Response,
  data: PaginatedResponse<T>,
  message = 'Success',
): void => {
  const response: ApiResponse<PaginatedResponse<T>> = {
    success: true,
    message,
    data,
  };

  res.status(200).json(response);
};
