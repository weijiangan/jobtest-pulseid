import qs from "querystring";

export const loadingStatus = {
  loading: -2,
  error: -1,
  end: 0,
  continue: 1
};

const initialState = {
  page: 1,
  name: "",
  photos: [],
  status: loadingStatus.continue
};

const SET_NAME = "SET_NAME";
const ADD_PHOTOS = "ADD_PHOTOS";
const SET_PHOTOS = "SET_PHOTOS";
const SET_PAGE = "SET_PAGE";
const SET_STATUS = "SET_STATUS";
const REQUEST_PHOTOS = "REQUEST_PHOTOS";
const RECEIVE_PHOTOS = "RECEIVE_PHOTOS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    status
  };
}
export function setPage(page) {
  return {
    type: SET_PAGE,
    page
  };
}

export function setName(name) {
  return {
    type: SET_NAME,
    name
  };
}

export function addPhotos(photoArray) {
  return {
    type: ADD_PHOTOS,
    photoArray
  };
}

export function setPhotos(photoArray) {
  return {
    type: SET_PHOTOS,
    photoArray
  };
}

export function requestPhotos() {
  return {
    type: REQUEST_PHOTOS
  };
}

export function receivePhotos(photoArray) {
  return {
    type: RECEIVE_PHOTOS,
    photoArray
  };
}

// let counter = 0;
const photosApiUrl = "https://api.unsplash.com/photos";
export function fetchPhotos(params) {
  return async dispatch => {
    console.log("fetching");
    dispatch(requestPhotos());

    try {
      const res = await fetch(`${photosApiUrl}?${qs.encode(params)}`);
      const data = await res.json();
      dispatch(receivePhotos(data));
      // dispatch(
      //   receivePhotos(
      //     Array(12)
      //       .fill({})
      //       .map(a => ({
      //         id: counter++
      //       }))
      //   )
      // );
    } catch (error) {
      alert("WTFFF!");
    }
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.name };
    case SET_PHOTOS:
      return { ...state, photos: [...action.photoArray] };
    case ADD_PHOTOS:
      return { ...state, photos: [...state.photos, ...action.photoArray] };
    case SET_PAGE:
      return { ...state, page: action.page };
    case SET_STATUS:
      return { ...state, status: action.status };
    case REQUEST_PHOTOS:
      return { ...state, page: state.page + 1, status: loadingStatus.loading };
    case RECEIVE_PHOTOS:
      return {
        ...state,
        status: loadingStatus.continue,
        photos: [...state.photos, ...action.photoArray]
      };
    default:
      return state;
  }
}
