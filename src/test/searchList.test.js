import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import SearchShowsList from "../pages/searchList";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  MemoryRouter,
  useHistory,
} from "react-router-dom";
import querySearchList from "./testConstants/querySearchList.mock";
describe("Search List page ", () => {
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
  });

  test("Should render SearchShowsList when loaded", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchShowsList searchShowsList={querySearchList} />
        </MemoryRouter>,
        container
      );
    });
    expect(container).toBeDefined();
  });
});
