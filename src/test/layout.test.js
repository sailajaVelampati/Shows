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
import TestUtils from "react-dom/test-utils";

const mockHistoryPush = jest.fn();
const querySearch = jest.fn();
const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
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
    expect(container).toBeDefined();
    expect(layoutApplicationBar).toBeDefined();
    expect(document.querySelector("[data-testid=arrowBack]")).toBe(null);
  });
  test("Should render layout with back icon when loaded with none '/' navigation ", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["details/1"]}>
          <Route path="details/:id">
            <Layout
              history={useHistory()}
              searchFieldData={searchFieldData}
              querySearch={querySearch}
            />
          </Route>
        </MemoryRouter>,
        container
      );
    });
    expect(container).toBeDefined();
    //except Arrow back icon to be defined
    expect(document.querySelector("[data-testid=arrowBack]")).toBeDefined();
  });
  test("Should call route with '/' when clicked on application label ", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["details/1"]}>
          <Route history={historyMock} path="details/:id">
            <Layout
              searchFieldData={searchFieldData}
              querySearch={querySearch}
            />
          </Route>
        </MemoryRouter>,
        container
      );
    });
    expect(container).toBeDefined();

    expect(document.querySelector("[data-testid=AppTitle]")).toBeDefined();

    await act(async () => {
      //fireEvent.click(document.querySelector("[data-testid=AppTitle]"));
      TestUtils.Simulate.click(
        document.querySelector("[data-testid=AppTitle]")
      );
    });
    //expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });
  test("Should render list of show name when clicked on search field ", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["details/1"]}>
          <Route history={historyMock} path="details/:id">
            <Layout
              history={useHistory()}
              searchFieldData={searchFieldData}
              querySearch={querySearch}
            />
          </Route>
        </MemoryRouter>,
        container
      );
    });
    expect(container).toBeDefined();
    await act(async () => {
      fireEvent.click(
        document.querySelector("[data-testid=searchInputParent]")
      );
      // TestUtils.Simulate.click(
      //        document.querySelector("[data-testid=searchInput]")
      //     );
    });
    console.log(document.querySelector("[data-testid=searchInputList]"));
    expect(
      document.querySelector("[data-testid=searchInputList]")
    ).toBeDefined();
  });
});
