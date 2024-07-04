// rolesData.ts
import { Roles } from './types'; // Adjust the import path according to your project structure

const roles: Roles = {
  town: [
    {
        name: 'Doctor',
        alignment: 'Town (Protective)',
        abilities: 'Heal one person each night, preventing them from dying.',
        attributes: 'You may only heal yourself once. You will know if your target is attacked.',
        goal: 'Lynch every criminal and evildoer.',
        limit: 1,
        currentCount: 0
      },
      {
        name: 'Escort',
        alignment: 'Town (Support)',
        abilities: 'Distract someone each night.',
        attributes: 'Distraction blocks your target from using their role\'s night ability. If you target a Serial Killer, they will attack you.',
        goal: 'Lynch every criminal and evildoer.',
        limit: 1,
        currentCount: 0
      },
      {
        name: 'Jailor',
        alignment: 'Town (Killing)',
        abilities: 'You may choose one person during the day to jail for the night.',
        attributes: 'You may choose to execute your prisoner. The jailed target cannot perform their night ability. While jailed the prisoner is safe from all attacks.',
        goal: 'Lynch every criminal and evildoer.',
        limit: 1,
        currentCount: 0
      },
      {
        name: 'Mayor',
        alignment: 'Town (Support)',
        abilities: 'You may reveal yourself as the Mayor of the Town.',
        attributes: 'Once you have revealed yourself as the Mayor your vote counts as 3 votes. You may not be healed once you have revealed.',
        goal: 'Lynch every criminal and evildoer.',
        limit: 1,
        currentCount: 0
      },
      {
        name: 'Bodyguard',
        alignment: 'Town (Support)',
        abilities: 'Can protect one person for 1 night',
        attributes: 'Can only do it 3 times',
        goal: 'Lynch every criminal and evildoer.',
        limit: 1,
        currentCount: 0
      }
  ],
  mafia: [
    {
        name: 'Godfather',
        alignment: 'Mafia (Killing)',
        abilities: 'Kill someone each night.',
        attributes: 'You can\'t be killed at night. If there is a Mafioso, he will attack the target instead of you. You wake up with the other Mafia at night.',
        goal: 'Kill anyone that will not submit to the Mafia.',
        limit: 1,
        currentCount: 0
      },
      {
        name: 'Mafioso',
        alignment: 'Mafia (Killing)',
        abilities: 'Carry out the Godfather\'s orders.',
        attributes: 'You can kill if the Godfather doesn\'t give you orders. If the Godfather dies, you will become the next Godfather. You wake up with the other Mafia at night.',
        goal: 'Kill anyone that will not submit to the Mafia.',
        limit: 2,
        currentCount: 0
      }
  ],
  neutral: [
    {
        name: 'Jester',
        alignment: 'Neutral (Evil)',
        abilities: 'Trick the Town into voting against you.',
        attributes: 'If you are lynched, you may kill one of your guilty or abstaining voters the following night.',
        goal: 'Get yourself lynched by any means necessary.',
        limit: 1,
        currentCount: 0
      },
      {
        name: 'Serial Killer',
        alignment: 'Neutral (Killing)',
        abilities: 'Kill someone each night.',
        attributes: 'If you are role blocked, you will attack the role blocker in addition to your target. You can choose to be cautious and not kill role blockers.',
        goal: 'Kill everyone who would oppose you.',
        limit: 1,
        currentCount: 0
      },
      {
        name: 'Survivor',
        alignment: 'Neutral (Benign)',
        abilities: 'Put on a bulletproof vest at night, protecting yourself from attacks.',
        attributes: 'You have a limited number of vests. Using a vest grants you night immunity for that night.',
        goal: 'Live until the end of the game.',
        limit: 3,
        currentCount: 0
      }
  ],
};

export default roles;
