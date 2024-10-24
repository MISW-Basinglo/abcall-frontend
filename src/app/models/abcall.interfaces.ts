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

export interface IIssueData {
  company_id: number;
  company: string;
  created_at: string;
  description: string;
  id: number;
  solution: string | null;
  source: string;
  status: string;
  type: string;
  updated_at: string;
  user_id: number;
}

export interface ICompanyData {
  data: ICompany[];
  count: number;
}

export interface ICompany {
  created_at: string;
  id: number;
  name: string;
  nit: string;
  plan: string;
  status: string;
  updated_at: string;
}

export interface IIssueToSave {
  type: string;
  description: string;
  user_id: string;
  source: string;
}
