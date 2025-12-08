export interface Role {
  id: string;
  name: string;
  essence: string;
  method: string;
  companyType: string;
  weight: number;
  color: string;
}

export interface RoleProfile {
  id: string;
  name: string;
  description: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleInsight {
  type: 'dominant' | 'underdeveloped' | 'synergy' | 'conflict';
  title: string;
  description: string;
  roles: string[];
}
