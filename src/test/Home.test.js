import React from "react";
import { render, act, getByTestId } from "@testing-library/react";
import Home from "../pages/Home";
import ReactDOM from "react-dom";
import showsMocklistDividedByGenre from "./testConstants/showsMocklistDividedByGenre.mock";
import { Route, MemoryRouter } from "react-router-dom";

describe("Home ", () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
    global.fetch.mockRestore();
  });
  test("renders Home without data", async () => {
    //test App is loaded
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(null),
    });
    let values;
    await act(async () => {
      const { getByTestId, getByRole, queryByRole } = render(
        <Home />,
        container
      );
      values = { getByTestId, getByRole, queryByRole };
    });
    expect(container).toBeDefined();
  });
  test("renders Home with data", async () => {
    let component = null;
    await act(async () => {
      component = render(
        <MemoryRouter>
          <Home shows={showsMocklistDividedByGenre} />
        </MemoryRouter>,
        container
      );
    });
    expect(container).toBeDefined();

    const mockHistoryPush = jest.fn();

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
  });
});
