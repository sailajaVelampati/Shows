import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import {
  FullWidthCarousel,
  MultiElementCarousel,
} from "../components/carousel";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  MemoryRouter,
  useHistory,
} from "react-router-dom";
import showsMocklistDividedByGenre from "./testConstants/showsMocklistDividedByGenre.mock";
import TestUtils from "react-dom/test-utils";

const navigateTo = jest.fn();

describe("Carousel component ", () => {
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

  test("Should render full carousel when loaded", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <FullWidthCarousel
            type="full"
            autoPlay={true}
            data={showsMocklistDividedByGenre}
            navigateTo={navigateTo}
          />
        </MemoryRouter>,
        container
      );
    });
    expect(container).toBeDefined();
  });

  xtest("Should navigate to '/' when clicked on element", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <FullWidthCarousel
            type="full"
            autoPlay={true}
            data={showsMocklistDividedByGenre}
            navigateTo={navigateTo}
          />
        </MemoryRouter>,
        container
      );
    });
    expect(container).toBeDefined();
    expect(
      document.querySelector(
        `[data-testid=fullCarouselShow-${showsMocklistDividedByGenre[0].entries[0].id}]`
      )
    ).toBeDefined();
    await act(async () => {
      fireEvent.click(
        document.querySelector(
          `[data-testid=fullCarouselShow-${showsMocklistDividedByGenre[0].entries[0].id}]`
        )
      );
    });
    expect(navigateTo).toHaveBeenCalled();
  });
});
