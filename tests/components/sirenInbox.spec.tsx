import React from "react";

import { fireEvent, render } from "@testing-library/react";

import SirenInbox from "../../src/components/SirenInbox";

const mockErrorFn = jest.fn();

// Mock the CSS file to avoid Jest error
jest.mock('../../src/styles/sirenNotificationIcon.css', () => ({}));
jest.mock('../../src/styles/header.css', () => ({}));
jest.mock('../../src/styles/card.css', () => ({}));
jest.mock('../../src/styles/loader.css', () => ({}));
jest.mock('../../src/styles/emptyList.css', () => ({}));
jest.mock('../../src/styles/errorWindow.css', () => ({}));
jest.mock('../../src/styles/sirenPanel.css', () => ({}));
jest.mock('../../src/styles/sirenInbox.css', () => ({}));
jest.mock('../../src/styles/showMore.css', () => ({}));


const Response = {
  data: {
    id: "xyz",
    createdAt: "2024-02-24T05:47:38.519+00:00",
    updatedAt: "2024-02-24T05:47:38.519+00:00",
    deletedAt: null,
    createdBy: "0a6f719d-1de1-4383-ada4-fdcf725bacb9",
    updatedBy: "0a6f719d-1de1-4383-ada4-fdcf725bacb9",
    deletedBy: null,
    projectEnvironmentId: "d3cb08e5-70e5-403d-8919-d9b779019ad4",
    message: {
      channel: "IN_APP",
      header: "NEW POST",
      subHeader: "Test,Someone tagged you in a post",
      body: "hey Sutty10\n\"Get ready for our new 'app test challenge' challenge starting on November 27. Join us to move towards better health!\"",
      actionUrl:
        "https://cdn5.vectorstock.com/i/1000x1000/92/89/hipster-avatar-image-vector-19639289.jpg",
      avatar: {
        imageUrl:
          "https://cdn5.vectorstock.com/i/1000x1000/92/89/hipster-avatar-image-vector-19639289.jpg",
        actionUrl: null,
      },
      additionalData: "",
    },
    inAppRecipient: {
      id: "6018ebd1-683c-4397-a903-5ce9ea94bcd7",
      createdAt: "2024-02-05T05:43:35.533+00:00",
      updatedAt: "2024-02-23T13:08:55.252+00:00",
      deletedAt: null,
      createdBy: "0a6f719d-1de1-4383-ada4-fdcf725bacb9",
      updatedBy: "0a6f719d-1de1-4383-ada4-fdcf725bacb9",
      deletedBy: null,
      projectEnvironmentId: "d3cb08e5-70e5-403d-8919-d9b779019ad4",
      referenceId: "ae0ee4af-f21c-4d3f-abfc-7e42dc0642c0",
      providerIntegrationId: "f46e8256-4b81-4bc6-91c8-b3cf5b980e0b",
      lastOpenedAt: "2024-02-23T13:08:55.186Z",
    },
    isRead: true,
    isDelivered: false,
    requestId: "9bb75694-af0a-4a8f-92a4-21d7e7a64ade",
  },
  error: null,
};

const ActionResponse = {
  data: { status: "200" },
  error: null,
};

const MarkAsViewedResponse = {
  data: {
    id: "6018ebd1-683c-4397-a903-5ce9ea94bcd7",
    createdAt: "2024-02-05T05:43:35.533+00:00",
    updatedAt: "2024-02-23T13:08:55.252+00:00",
    deletedAt: null,
    createdBy: "0a6f719d-1de1-4383-ada4-fdcf725bacb9",
    updatedBy: "0a6f719d-1de1-4383-ada4-fdcf725bacb9",
    deletedBy: null,
    projectEnvironmentId: "d3cb08e5-70e5-403d-8919-d9b779019ad4",
    referenceId: "ae0ee4af-f21c-4d3f-abfc-7e42dc0642c0",
    providerIntegrationId: "f46e8256-4b81-4bc6-91c8-b3cf5b980e0b",
    lastOpenedAt: "2024-02-23T13:08:55.186Z",
    totalUnviewed: 0,
  },
  error: null,
};
const props = {
  title: "Notifications",
  hideHeader: false,
  cardProps: { hideAvatar: false, showMedia: true },
  listEmptyComponent: undefined,
  customFooter: undefined,
  customHeader: undefined,
  noOfNotificationsPerFetch: 10,
  darkMode: true,
  onNotificationCardClick: undefined,
  customNotificationCard: undefined,
  windowViewOnly: false,
  notificationIcon: undefined,
  onError: mockErrorFn,
  theme: {
    dark: {
      colors:{
        primaryColor: '#FFFFFF'
      }
    },
    light: {},
  },
  customStyles:{
    notificationIcon: {
      size: 30,
    },
  }
};

test("matches snapshot", () => {
  const { asFragment } = render(<SirenInbox {...props} />);

  expect(asFragment()).toMatchSnapshot();
});
test("should render notification icon", () => {
  const component = render(<SirenInbox {...props} />);
  const notificationIcon = component.getByTestId("notification-icon");

  expect(notificationIcon).toBeTruthy();
});

test("should render notification icon", () => {
  const component = render(<SirenInbox {...props} windowViewOnly={true} />);
  const notificationIcon = component.queryByTestId("notification-icon");

  expect(notificationIcon).toBeFalsy();
});

it('opens modal when notification icon is clicked', () => {
  const { getByTestId } = render(<SirenInbox />);
  const notificationIcon = getByTestId('notification-icon');

  fireEvent.click(notificationIcon);
});

it('closes modal when notification icon is clicked again', () => {
  const { getByTestId } = render(<SirenInbox />);
  const notificationIcon = getByTestId('notification-icon');

  fireEvent.click(notificationIcon);
});
