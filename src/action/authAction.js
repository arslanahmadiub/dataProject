export const saveAllData = (data) => {
  return {
    type: "GET_ALL_DATA",
    payload: data,
  };
};
export const setDbTime = (data) => {
  return {
    type: "DB_TIME",
    payload: data,
  };
};
export const setUserDbTime = (data) => {
  return {
    type: "USER_DB_TIME",
    payload: data,
  };
};
export const setCompaniesData = (data) => {
  return {
    type: "SET_COMPANIES",
    payload: data,
  };
};

export const resetData = () => {
  return {
    type: "RESET",
  };
};
