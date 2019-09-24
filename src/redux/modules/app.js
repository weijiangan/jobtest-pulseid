const initialState = {
  token: null
};

const SET_TOKEN = "SET_TOKEN";

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
