import { Request, Response } from 'express';
import { registerApplication, getApplicationByClientId } from '../models/appModel';
import { generateAccessToken, verifyToken } from '../utils/jwtUtils';
import fs from 'fs';
import path from 'path';

const authorizationCodes: { [key: string]: string } = {};

export const authorize = (req: Request, res: Response) => {
  const { response_type, client_id, redirect_uri, state } = req.query;

  if (response_type !== 'code') {
    return res.status(400).send('Response type must be "code".');
  }

  const app = getApplicationByClientId(client_id as string);
  if (!app || !app.redirectUris.includes(redirect_uri as string)) {
    return res.status(400).send('Invalid client_id or redirect_uri.');
  }

  const authorizationCode = Math.random().toString(36).substring(7);
  authorizationCodes[authorizationCode] = client_id as string;

  const redirectUrl = `${redirect_uri}?code=${authorizationCode}&state=${state}`;
  res.redirect(redirectUrl);
};

export const token = (req: Request, res: Response) => {
  const { grant_type, code, redirect_uri, client_id, client_secret } = req.body;

  if (grant_type !== 'authorization_code') {
    return res.status(400).send('Grant type must be "authorization_code".');
  }

  const storedClientId = authorizationCodes[code];
  const app = getApplicationByClientId(client_id);

  if (!storedClientId || storedClientId !== client_id || !app || app.clientSecret !== client_secret) {
    return res.status(400).send('Invalid authorization code or client credentials.');
  }

  delete authorizationCodes[code];

  const token = generateAccessToken({ clientId: client_id });
  res.json({
    access_token: token,
    token_type: 'Bearer',
    expires_in: 3600
  });
};

export const introspect = (req: Request, res: Response) => {
  const { token } = req.body;
  const payload = verifyToken(token);

  if (payload) {
    res.json({ active: true, ...payload as object});
  } else {
    res.json({ active: false });
  }
};

export const register = (req: Request, res: Response) => {
  const { name, redirectUris } = req.body;
  const app = registerApplication(name, redirectUris);
  res.json(app);
};

// Endpoint pour fournir la clé publique
export const publicKey = (req: Request, res: Response) => {
  const publicKeyPath = path.join(__dirname, '../keys/public.key');
  const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
  res.type('application/x-pem-file').send(publicKey);
};