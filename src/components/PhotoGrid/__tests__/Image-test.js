import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Image } from "../";

afterEach(cleanup);

test("matches snapshot", () => {
  const { asFragment } = render(<Image />);
  expect(asFragment()).toMatchSnapshot();
});
