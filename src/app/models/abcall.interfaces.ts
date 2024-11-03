export interface IClientData {
  created_at: string;
  id: string;
  name: string;
  nit?: string;
  plan?: string;
  responsible_dni?: string;
  responsible_email?: string;
  responsible_name?: string;
  responsible_phone?: string;
  services: string;
  status: string;
  updated_at: string;
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

export interface IClientToSave {
  company_name: string;
  nit: string;
  plan: 'ENTREPRENEUR' | 'BUSINESS' | 'BUSINESS_PLUS';
  user_name: string;
  phone: string;
  email: string;
}

export interface IProfileData {
  count: number;
  data: IProfileUser[];
}

export interface IProfileUser {
  ta: string;
  channel: string;
  company_id: number;
  created_at: string;
  dni: string;
  email: string;
  id: number;
  importance: number;
  name: string;
  phone: string;
  role: string;
  status: string;
  updated_at: string;
}

export interface IPhoneHistory {
  company_id: number;
  created_at: string;
  description: string;
  id: number;
  solution: string;
  source: string;
  status: string;
  type: string;
  updated_at: string;
  user_id: number;
}
