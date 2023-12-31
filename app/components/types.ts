export interface Role {
    name: string;
    alignment: string;
    abilities: string;
    attributes: string;
    goal: string;
  }
  
  export interface Roles {
    town: Role[];
    mafia: Role[];
    neutral: Role[];
  }
  