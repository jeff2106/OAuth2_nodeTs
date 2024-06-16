import { Request, Response } from 'express';

export const callback = (req: Request, res: Response) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send('Authorization code is required.');
  }

  // Afficher le code d'autorisation pour les tests
  res.send(`Authorization code: ${code}, State: ${state}`);
};