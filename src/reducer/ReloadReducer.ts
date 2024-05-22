const initialState = {
  loadCount: 0,
  players: [{ id: '1', name: 'Linh Anh Trần' }] // Thêm mảng để lưu trữ thông tin của các cầu thủ
};

const ReloadReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, action.payload] // Sử dụng action.payload thay vì action.player
      };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        players: state.players.map(
          (player: any) =>
            player.id === action.payload.id ? action.payload : player // Sử dụng action.payload thay vì action.player
        )
      };
    case 'DELETE_PLAYER':
      return {
        ...state,
        players: state.players.filter(
          (player: any) => player.id !== action.payload.playerId // Sử dụng action.payload.playerId thay vì action.playerId
        )
      };
    default:
      return state;
  }
};

export default ReloadReducer;
