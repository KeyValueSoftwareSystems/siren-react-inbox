import React from "react";

import { render } from "@testing-library/react";
import { Siren } from "test_notification";

import SirenProvider from "../../src/components/SirenProvider"; // Replace with your path

jest.mock("test_notification");

describe("SirenProvider", () => {
  it("should render children", () => {
    const { getByText } = render(
      <SirenProvider
        config={{ userToken: "test-token", recipientId: "test-id" }}
      >
        <div data-testid="child-component">Child</div>
      </SirenProvider>
    );

    expect(getByText("Child")).toBeTruthy();
  });

  it("should call initialize function on mount", async () => {
    render(
      <SirenProvider
        config={{ userToken: "test-token", recipientId: "test-id" }}
      >
        <div data-testid="child-component">Child</div>
      </SirenProvider>
    );
    const mocErrorFn = jest.fn();
    const mockNotificationHandler = jest.fn();
    const mockCountHandler = jest.fn();

    const sirenObject = new Siren({
      token: "user-token",
      recipientId: "recipient-id",
      onError: mocErrorFn,
      actionCallbacks: {
        onNotificationReceived: mockNotificationHandler,
        onUnViewedCountReceived: mockCountHandler,
      },
    });

    expect(sirenObject).toBeInstanceOf(Siren);
  });
});
