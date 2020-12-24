import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import App from "../App";
import ReactDOM from "react-dom";
import fullListMock from "../components/API.mock";
import { Route, MemoryRouter } from "react-router-dom";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Application ", () => {
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
  test("renders App", async () => {
    //test App is loaded
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(fullListMock),
    });
    await act(async () => {
      render(<App />, container);
    });

    expect(container).toBeDefined();
  });
  test("Should navigate to Home when clicked on tool bar", async () => {
    //test App is loaded
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(fullListMock),
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
        container
      );
    });

    await act(async () => {
      fireEvent.click(document.querySelector("[data-testid=toolBar]"));
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });
});
