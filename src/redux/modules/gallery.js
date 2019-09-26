import { combineReducers } from "redux";
import qs from "querystring";

const SELECT_MODE = "SELECT_MODE";

export function selectMode(mode) {
  return {
    type: SELECT_MODE,
    mode
  };
}

function selectedMode(state = "all", action) {
  switch (action.type) {
    case SELECT_MODE:
      return action.mode;
    default:
      return state;
  }
}

export const loadingStatus = {
  loading: -2,
  error: -1,
  end: 0,
  continue: 1
};

const initialState = {
  page: 0,
  photos: [],
  status: loadingStatus.continue,
  params: {}
};

const INIT_GALLERY = "INIT_GALLERY";
const REQUEST_PHOTOS = "REQUEST_PHOTOS";
const RECEIVE_PHOTOS = "RECEIVE_PHOTOS";

export function initGallery(name) {
  return {
    type: INIT_GALLERY,
    name
  };
}

export function requestPhotos(name) {
  return {
    type: REQUEST_PHOTOS,
    name
  };
}

export function receivePhotos(name, photoArray) {
  return {
    type: RECEIVE_PHOTOS,
    name,
    photoArray
  };
}

let counter = 0;
const url = "https://api.unsplash.com";
const api = {
  all: { path: "/photos", shape: i => i },
  search: { path: "/search/photos", shape: i => i.results }
};
export function fetchPhotos(params) {
  return async (dispatch, getState) => {
    const { selectedMode: mode } = getState().gallery;
    const name = mode === "all" ? mode : params.query;
    console.log("fetching");
    dispatch(requestPhotos(name));
    const { page, params: params2 } = getState().gallery.galleries[name];
    params = { ...params2, ...params, page };
    try {
      const res = await fetch(`${url}${api[mode].path}/?${qs.encode(params)}`);
      const data = await res.json();
      dispatch(receivePhotos(name, api[mode].shape(data)));
      // dispatch(
      //   receivePhotos(
      //     name,
      //     Array(12)
      //       .fill({})
      //       .map(a => ({
      //         id: counter++,
      //         urls: { thumb: null }
      //       }))
      //   )
      // );
    } catch (error) {
      alert("ERRO ERRO");
    }
  };
}

function gallery(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PHOTOS:
      return { ...state, page: state.page + 1, status: loadingStatus.loading };
    case RECEIVE_PHOTOS:
      return {
        ...state,
        status: loadingStatus.continue,
        photos: [...state.photos, ...action.photoArray]
      };
    case INIT_GALLERY:
    default:
      return state;
  }
}

function galleries(
  state = {
    all: gallery(undefined, {})
  },
  action
) {
  switch (action.type) {
    case INIT_GALLERY:
    case REQUEST_PHOTOS:
    case RECEIVE_PHOTOS:
      return {
        ...state,
        [action.name]: gallery(state[action.name], action)
      };
    default:
      return state;
  }
}

export default combineReducers({
  selectedMode,
  galleries
});
