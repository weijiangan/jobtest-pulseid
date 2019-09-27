import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { reducer } from "../../redux/configureStore";
import NavContainer from "../NavContainer";

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
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
  const { getByTestId, getByText } = renderWithRedux(<NavContainer />);
  expect(getByTestId("entries").children[0]).toHaveClass("active");
  getByText("All");
  getByText("People");
  getByText("Travel");
});

test("highlight the correct item", () => {
  const { getByTestId, getByText } = renderWithRedux(
    <NavContainer query="nature" setQuery={() => {}} />
  );
  fireEvent.click(getByText("Nature"));
  expect(getByTestId("entries").children[2]).toHaveClass("active");
  expect(getByTestId("entries").children[0]).not.toHaveClass("active");
});
