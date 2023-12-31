import Image from 'next/image'
import RoleCard from './components/RoleCard'
import { Role } from './components/types'
import roles from './components/rolesData'
export default function Home() {
  // const roles = {
  //   town: [
  //     {
  //       name: 'Doctor',
  //       alignment: 'Town (Protective)',
  //       abilities: 'Heal one person each night, preventing them from dying.',
  //       attributes: 'You may only heal yourself once. You will know if your target is attacked.',
  //       goal: 'Lynch every criminal and evildoer.',
  //     },
  //     // ... other town roles
  //   ],
  //   mafia: [
  //     {
  //       name: 'Godfather',
  //       alignment: 'Mafia (Killing)',
  //       abilities: 'Kill someone each night.',
  //       attributes: "You can't be killed at night. If there is a Mafioso, he will attack the target instead of you. You wake up with the other Mafia at night.",
  //       goal: 'Kill anyone that will not submit to the Mafia.',
  //     },
  //     // ... other mafia roles
  //   ],
  //   neutral: [
  //     {
  //       name: 'Jester',
  //       alignment: 'Neutral (Evil)',
  //       abilities: 'Trick the Town into voting against you.',
  //       attributes: 'If you are lynched, you may kill one of your guilty or abstaining voters the following night.',
  //       goal: 'Get yourself lynched by any means necessary.',
  //     },
  //     // ... other neutral roles
  //   ],
  // };

  interface RoleCardProps {
    role: Role;
  }

  const RoleCard: React.FC<RoleCardProps> = ({ role }) => (
    <div className="role-card">
      <h3>{role.name}</h3>
      <p><strong>Alignment:</strong> {role.alignment}</p>
      <p><strong>Abilities:</strong> {role.abilities}</p>
      <p><strong>Attributes:</strong> {role.attributes}</p>
      <p><strong>Goal:</strong> {role.goal}</p>
    </div>
  );

  return (
    <main>

      <h3>Town Roles</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Alignment</th>
            <th>Abilities</th>
            <th>Attributes</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          {roles.town.map((role: Role) => (
            <tr key={role.name}>
              <td>{role.name}</td>
              <td>{role.alignment}</td>
              <td>{role.abilities}</td>
              <td>{role.attributes}</td>
              <td>{role.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>

      {/* Mafia Roles Table */}
      <h3>Mafia Roles</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Alignment</th>
            <th>Abilities</th>
            <th>Attributes</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          {roles.mafia.map((role: Role) => (
            <tr key={role.name}>
              <td>{role.name}</td>
              <td>{role.alignment}</td>
              <td>{role.abilities}</td>
              <td>{role.attributes}</td>
              <td>{role.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>

      {/* Neutral Roles Table */}
      <h3>Neutral Roles</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Alignment</th>
            <th>Abilities</th>
            <th>Attributes</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          {roles.neutral.map((role: Role) => (
            <tr key={role.name}>
              <td>{role.name}</td>
              <td>{role.alignment}</td>
              <td>{role.abilities}</td>
              <td>{role.attributes}</td>
              <td>{role.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
