export const addPlayer = (item) => {
  return {
    type: 'ADD_PLAYER',
    payload: item
  };
};
export const updatePlayer = (item) => {
  return {
    type: 'UPDATE_PLAYER',
    payload: item
  };
};

export const deletePlayer = (playerId) => {
  return {
    type: 'DELETE_PLAYER',
    payload: playerId
  };
};
