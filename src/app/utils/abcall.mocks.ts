import { faker } from '@faker-js/faker';
import {
  IClientData,
  IIncidentData,
  IUserData,
} from '../models/abcall.interfaces';

export const generateClients = (): IClientData[] => {
  const clients: IClientData[] = [];

  for (let i = 0; i < 10; i++) {
    const client: IClientData = {
      id: faker.string.uuid(),
      created_at: faker.date.past().toISOString().split('T')[0],
      updated_at: faker.date.recent().toISOString().split('T')[0],
      name: faker.company.name(),
      nit: faker.string.alphanumeric(10),
      plan: faker.helpers.arrayElement([
        'ENTREPRENEUR',
        'BUSINESS',
        'BUSINESS_PLUS',
      ]),
      responsible_dni: faker.phone.number(),
      responsible_email: faker.internet.email(),
      responsible_name: faker.name.fullName(),
      responsible_phone: faker.phone.number(),
      services: faker.commerce.productName(),
      status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
    };

    clients.push(client);
  }

  return clients;
};

export const generateIncidents = (): IIncidentData[] => {
  const incidents: IIncidentData[] = [];

  for (let i = 0; i < 10; i++) {
    const incident: IIncidentData = {
      id: faker.string.uuid(),
      incidentId: faker.string.alphanumeric(12),
      date: faker.date.recent().toISOString().split('T')[0],
      description: faker.lorem.sentence(),
      company: faker.company.name(),
      status: faker.helpers.arrayElement(['open', 'escalated', 'closed']),
    };

    incidents.push(incident);
  }

  return incidents;
};

export const generateUsers = (): IUserData[] => {
  const users: IUserData[] = [];

  for (let i = 0; i < 10; i++) {
    const user: IUserData = {
      name: faker.name.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      dni: faker.string.numeric(8),
      importance: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    };

    users.push(user);
  }

  return users;
};
