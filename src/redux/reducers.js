const initState = {
  photos: [],
  focusedPhoto: null,
  photoLoading: false,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTOS':
      console.log('from redux', action.photos[0], action.photos[0].id, action.photos)
      console.log({
        ...state,
        photos: action.photos,
        focusedPhoto: action.photos[0].id,
      });
      return {
        ...state,
        photos: action.photos,
        focusedPhoto: action.photos[0].id,
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
