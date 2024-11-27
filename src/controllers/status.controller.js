import { responseBuilder } from '../utils/builders/responseBuilder.js';

export const getStatusPing = (req, res) => {
  return res.status(200).json(responseBuilder(true, 200, 'Pong', { message: 'Pong' }));
};
