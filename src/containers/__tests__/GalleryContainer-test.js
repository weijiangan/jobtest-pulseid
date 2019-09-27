import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { reducer } from "../../redux/configureStore";
import GalleryContainer from "../GalleryContainer";

function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

test("can render with redux with defaults", () => {
  const { getByPlaceholderText, getByText } = renderWithRedux(
    <GalleryContainer />
  );
  getByPlaceholderText("Search images...");
  getByText("Sort by");
  getByText("All");
  getByText("People");
  getByText("Skyline");
  getByText("Travel");
});

test("matches snapshot", () => {
  const { asFragment } = renderWithRedux(<GalleryContainer />);
  expect(asFragment()).toMatchSnapshot();
});

test("hide sort option when not browsing All section", () => {
  const { getByText, queryByText } = renderWithRedux(<GalleryContainer />);
  fireEvent.click(getByText("Animals"));
  expect(queryByText("Sort by")).toBeNull();
  fireEvent.click(getByText("All"));
  expect(queryByText("Sort by")).not.toBeNull();
});

test("test search box", () => {
  const { getByText, getByPlaceholderText } = renderWithRedux(
    <GalleryContainer />
  );
  const input = getByPlaceholderText("Search images...");
  fireEvent.change(input, { target: { value: "travel" } });
  expect(input.value).toBe("travel");
});
