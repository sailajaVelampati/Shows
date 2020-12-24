import React from "react";
import { render, act } from "@testing-library/react";
import Details from "../pages/Details";
import ReactDOM from "react-dom";
import dump from "../pages/dump";
import { Route, MemoryRouter } from "react-router-dom";
describe("Details Page ", () => {
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
  test("renders Details page on page navigation", async () => {
    //test Details is loaded
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(dump),
    });
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["details/1"]}>
          <Route path="details/:id">
            <Details />
          </Route>
        </MemoryRouter>,
        container
      );
    });
    expect(container).toBeDefined();
  });
  test("Should log error when Service is rejected", async () => {
    const error = new Error("Async error");
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockRejectedValueOnce(error),
    });
    console.log = jest.fn();
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["details/1"]}>
          <Route path="details/:id">
            <Details />
          </Route>
        </MemoryRouter>,
        container
      );
    });
    expect(console.log).toHaveBeenCalledWith(error);
    global.fetch.mockRestore();
  });
});
