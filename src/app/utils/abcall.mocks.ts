import { faker } from '@faker-js/faker';
import { IClientData, IIncidentData } from '../models/abcall.interfaces';

export const generateClients = (): IClientData[] => {
  const clients: IClientData[] = [];

  for (let i = 0; i < 100; i++) {
    const client: IClientData = {
      id: faker.string.uuid(),
      clientId: faker.string.alphanumeric(12),
      date: faker.date.past().toISOString().split('T')[0],
      services: faker.commerce.productName(),
      company: faker.company.name(),
      status: faker.helpers.arrayElement(['active', 'inactive']),
      nit: faker.string.alphanumeric(10),
      responsible: faker.name.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      plan: faker.helpers.arrayElement([
        'ENTREPRENEUR',
        'BUSINESS',
        'BUSINESS_PLUS',
      ]),
    };

    clients.push(client);
  }

  return clients;
};

export const generateIncidents = (): IIncidentData[] => {
  const incidents: IIncidentData[] = [];

  for (let i = 0; i < 100; i++) {
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
