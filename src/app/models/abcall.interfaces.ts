export interface IClientData {
  id: string;
  clientId: string;
  date: string;
  services: string;
  company: string;
  status: string;
  nit?: string;
  responsible?: string;
  phone?: string;
  email?: string;
  plan?: string;
}

export interface IIncidentData {
  id: string;
  incidentId: string;
  date: string;
  description: string;
  company: string;
  status: string;
}
