import roles from './rolesData'; // adjust the import path as necessary

// Example structure for managing game state
let gameState = {
  players: [],
  rolesAssigned: {},
};

const MAX_PLAYERS = 15; // Example max players

function assignRole(): string {
    // Logic to assign roles randomly
    // Ensures unique roles are assigned only once and respects multiples for specific roles
    return ''; // Replace with the actual assigned role
}

export function addPlayer(playerName: string) {
    if (gameState.players.length >= MAX_PLAYERS) {
        throw new Error('Player limit reached');
    }
    
    const role = assignRole();
    // gameState.players.push({ playerName, role });
    return role; // Return the assigned role
}
