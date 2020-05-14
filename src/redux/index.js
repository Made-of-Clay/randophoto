const initState = {
  photos: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTOS':
      return {
        ...state,
        photos: action.photos,
      };
    default:
      return state;
  }
};

export default rootReducer;
