import {
  CHANGE_VIEW_STYLE,
  SEARCH_CONFIRM,
  TOGGLE_LOADING_SIGN
} from "./HomeLayoutActionTypes";

const changeViewStyle = style => ({
  type: CHANGE_VIEW_STYLE,
  data: { style }
});

const handleChangeViewStyle = style => async dispatch => {
  dispatch(changeViewStyle(style));
};

const updatePicsList = picList => ({
  type: SEARCH_CONFIRM,
  data: { picList }
});

const handleSearchConfirm = searchQuery => async dispatch => {
  const pixabayKey = "12349273-698eb70aac15409987a310f4e";
  const url = `https://pixabay.com/api/?key=${pixabayKey}&q=${searchQuery}&image_type=photo&per_page=199`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  const request = new Request(url, options);

  await fetch(request)
    .then(response => response.json())
    .then(async data => dispatch(updatePicsList(data.hits)))
    .catch(err => console.log(err));
};

const updateIsLoading = isLoading => ({
  type: TOGGLE_LOADING_SIGN,
  data: { isLoading }
});
const handleUpdateIsLoading = isLoading => async dispatch => {
  dispatch(updateIsLoading(isLoading));
};

export default {
  handleSearchConfirm,
  handleChangeViewStyle,
  handleUpdateIsLoading,
  updateIsLoading
};
