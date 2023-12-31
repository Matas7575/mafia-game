// roles.ts
import { Roles } from './types';

const roles: Roles = {
  town: [
    {
      name: 'Doctor',
      alignment: 'Town (Protective)',
      abilities: 'Heal one person each night, preventing them from dying.',
      attributes: 'You may only heal yourself once. You will know if your target is attacked.',
      goal: 'Lynch every criminal and evildoer.',
    },
    // ... other town roles
  ],
  mafia: [
    {
      name: 'Godfather',
      alignment: 'Mafia (Killing)',
      abilities: 'Kill someone each night.',
      attributes: "You can't be killed at night. If there is a Mafioso, he will attack the target instead of you. You wake up with the other Mafia at night.",
      goal: 'Kill anyone that will not submit to the Mafia.',
    },
    // ... other mafia roles
  ],
  neutral: [
    {
      name: 'Jester',
      alignment: 'Neutral (Evil)',
      abilities: 'Trick the Town into voting against you.',
      attributes: 'If you are lynched, you may kill one of your guilty or abstaining voters the following night.',
      goal: 'Get yourself lynched by any means necessary.',
    },
    // ... other neutral roles
  ],
};

export default roles;
