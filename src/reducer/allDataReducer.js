const initalState = {
  allData: [],
  dbTime: null,
  userDbTime: null,
  companies: [],
};

export const allDataReducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_ALL_DATA":
      return {
        ...state,
        allData: action.payload,
      };
    case "DB_TIME":
      return {
        ...state,
        dbTime: action.payload,
      };
    case "USER_DB_TIME":
      return {
        ...state,
        userDbTime: action.payload,
      };
    case "SET_COMPANIES":
      return {
        ...state,
        companies: action.payload,
      };

    case "RESET":
      return initalState;

    default:
      return state;
  }
};
