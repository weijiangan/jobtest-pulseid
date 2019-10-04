import { combineReducers } from "redux";
import { createSelector } from "reselect";
import qs from "querystring";
import { debugLog } from "../../utils";

const SELECT_MODE = "SELECT_MODE";

export function selectMode(mode) {
  return {
    type: SELECT_MODE,
    mode
  };
}

export const galleryMode = {
  all: "all",
  search: "search"
};

function selectedMode(state = galleryMode.all, action) {
  switch (action.type) {
    case SELECT_MODE:
      return action.mode;
    default:
      return state;
  }
}

const SET_QUERY = "SET_QUERY";

export function setQuery(query) {
  return {
    type: SET_QUERY,
    query
  };
}

function query(state = "", action) {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return state;
  }
}

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
    let state = getState();
    const mode = getSelectedMode(state);
    const query = getQuery(state);
    const name = mode === galleryMode.all ? mode : query;

    if (
      getGalleries(state)[name].status !== loadingStatus.continue ||
      (mode === galleryMode.search && query === "")
    )
      return;

    debugLog("fetching");
    dispatch(requestPhotos(name));

    const { page, params: stateParams } = getGalleries(getState())[name];
    params = { ...stateParams, ...params, page };
    if (mode === galleryMode.search) params.query = query;

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

// only load if > 0
export const loadingStatus = {
  loading: -2,
  error: -1,
  end: 0,
  continue: 1
};

const galleryInitialState = {
  page: 0,
  photos: [],
  status: loadingStatus.continue,
  params: {}
};

function gallery(state = galleryInitialState, action) {
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

export function getSelectedMode(state) {
  return state.gallery.selectedMode;
}

export function getGalleries(state) {
  return state.gallery.galleries;
}

export function getQuery(state) {
  return state.gallery.query;
}

export const selectSelectedGallery = createSelector(
  getSelectedMode,
  getGalleries,
  getQuery,
  (selectedMode, galleries, query) => {
    return selectedMode === galleryMode.all
      ? galleries[selectedMode]
      : galleries[query];
  }
);

export default combineReducers({
  selectedMode,
  query,
  galleries
});
