import { v4 as uuidv4 } from 'uuid';

interface Application {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  name: string;
}

const applications: Application[] = [];

// Fonction pour enregistrer une nouvelle application
export const registerApplication = (name: string, redirectUris: string[]): Application => {
  const newApp: Application = {
    clientId: uuidv4(),
    clientSecret: uuidv4(),
    redirectUris,
    name
  };
  applications.push(newApp);
  return newApp;
};

// Fonction pour obtenir une application par clientId
export const getApplicationByClientId = (clientId: string): Application | undefined => {
  return applications.find(app => app.clientId === clientId);
};