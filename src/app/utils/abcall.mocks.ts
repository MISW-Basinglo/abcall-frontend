import { faker } from '@faker-js/faker';
import { IClientData } from '../models/client.interface';

export const generateClients = (): IClientData[] => {
  const clients: IClientData[] = [];

  for (let i = 0; i < 100; i++) {
    const client: IClientData = {
      id: faker.string.uuid(),
      clientId: faker.string.alphanumeric(12),
      fecha: faker.date.past().toISOString().split('T')[0],
      servicios: faker.commerce.productName(),
      empresa: faker.company.name(),
      estado: faker.helpers.arrayElement(['Activo', 'Inactivo']),
    };

    clients.push(client);
  }

  return clients;
};
