export interface Role {
    name: string;
    alignment: string;
    abilities: string;
    attributes: string;
    goal: string;
    limit: number;
    currentCount: number;
  }
  
  export interface Roles {
    town: Role[];
    mafia: Role[];
    neutral: Role[];
  }
  