import { combineReducers } from "redux";
import qs from "querystring";
import { debugLog } from "../../utils";

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
const FETCH_END = "FETCH_END";
const FETCH_ERROR = "FETCH_ERROR";
const SET_ALL_ORDER = "SET_ALL_ORDER";

export function setAllOrder(order) {
  return {
    type: SET_ALL_ORDER,
    order
  };
}

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

export function fetchError(name) {
  return {
    type: FETCH_ERROR,
    name
  };
}

export function fetchEnd(name) {
  return {
    type: FETCH_END,
    name
  };
}

const url = "https://api.unsplash.com";
const api = {
  all: { path: "/photos", shape: i => i },
  search: { path: "/search/photos", shape: i => i.results }
};

export function fetchPhotos(params) {
  return async (dispatch, getState) => {
    const { selectedMode: mode } = getState().gallery;
    const name = mode === "all" ? mode : params.query;

    debugLog("fetching");
    dispatch(requestPhotos(name));

    const { page, params: params2 } = getState().gallery.galleries[name];
    params = { ...params2, ...params, page };

    try {
      debugLog(`${url}${api[mode].path}/?${qs.encode(params)}`);
      const res = await fetch(`${url}${api[mode].path}/?${qs.encode(params)}`);
      const data = api[mode].shape(await res.json());
      if (!data.length) {
        dispatch(fetchEnd(name));
      } else {
        dispatch(receivePhotos(name, data));
      }
    } catch (error) {
      dispatch(fetchError(name));
      debugLog(error);
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
    case FETCH_ERROR:
      return { ...state, page: state.page - 1, status: loadingStatus.error };
    case FETCH_END:
      return { ...state, page: state.page - 1, status: loadingStatus.end };
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
    case FETCH_END:
    case FETCH_ERROR:
      return {
        ...state,
        [action.name]: gallery(state[action.name], action)
      };
    case SET_ALL_ORDER:
      return {
        ...state,
        all: {
          ...state.all,
          params: { order_by: action.order },
          photos: [],
          page: 0
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  selectedMode,
  galleries
});
