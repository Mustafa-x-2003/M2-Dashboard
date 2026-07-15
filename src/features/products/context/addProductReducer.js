export const INITIAL_STATE = {
  images: [],
  tags: [],
  isLoading: false,
  error: null,
  success: false,
};

export const addProductReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return {
        ...state,
        images: action.payload,
      };
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case 'REMOVE_TAG':
      return {
        ...state,
        tags: state.tags.filter((_, i) => i !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.payload,
      };
    case 'RESET_STATUS':
      return {
        ...state,
        isLoading: false,
        error: null,
        success: false,
      };
    default:
      return state;
  }
};
