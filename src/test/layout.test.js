import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import Layout from "../components/layout";
import ReactDOM from "react-dom";
import showsListMock from "./testConstants/showsList.mock";
import searchFieldData from "./testConstants/searchFieldData.mock";
import {
  BrowserRouter as Router,
  Route,
  MemoryRouter,
  useHistory,
} from "react-router-dom";

const mockHistoryPush = jest.fn();
const querySearch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Layout ", () => {
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
  test("Should render Layout when loaded", async () => {
    //test App is loaded
    // jest.spyOn(global, "fetch").mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(showsListMock),
    // });
    await act(async () => {
      render(
        <MemoryRouter>
          <Layout
            history={useHistory()}
            searchFieldData={searchFieldData}
            querySearch={querySearch}
          />
        </MemoryRouter>,
        container
      );
    });
    const layoutApplicationBar = document.querySelector(
      "[data-testid=layoutApplicationBar]"
    );
    const searchInput = document.querySelector("[data-testid=searchInput]");
    expect(container).toBeDefined();
    expect(layoutApplicationBar).toBeDefined();

    //click on the search input field
    await act(async () => {
      fireEvent.click(searchInput);

      // expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
    const searchInputList = document.querySelector(
      "[data-testid=searchInputList]"
    );
    console.log(searchInputList);
  });
});
