const initState = {
  photos: [],
  focusedPhoto: null,
  photoLoading: false,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTOS':
      return {
        ...state,
        photos: action.photos,
      };
      case 'FOCUS_PHOTO':
        return {
          ...state,
          focusedPhoto: action.photoID,
        };
    default:
      return state;
  }
};

export default rootReducer;
