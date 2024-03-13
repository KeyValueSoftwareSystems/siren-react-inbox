import { sirenReducerTypes } from "../../src/utils/constants";
import { sirenReducer } from "../../src/utils/sirenReducer";
const {
  SET_NOTIFICATIONS,
  NEW_NOTIFICATIONS,
  SET_UN_VIEWED_NOTIFICATION_COUNT,
} = sirenReducerTypes;

const mockNotifications = [
  {
    id: "1",
    createdAt: "2024-02-24T12:00:00Z",
    message: {
      header: "New Message",
      body: "You have a new message.",
      channel: "watsapp",
      subHeader: "New post",
      actionUrl: "",
      additionalData: "",
      avatar: {
        imageUrl: "",
        actionUrl: "",
      },
    },
    requestId: "123",
    isRead: false,
  },
];

test("sets notifications correctly", () => {
  const initialState = { notifications: [], unviewedCount: 0, sirenCore: null };

  const newState = sirenReducer(initialState, {
    type: SET_NOTIFICATIONS,
    payload: mockNotifications,
  });

  expect(newState.notifications).toEqual(mockNotifications);
});
test("adds new notifications to the existing list", () => {
  const newMockNotifications = [
    {
      id: "2",
      createdAt: "2024-02-24T12:00:00Z",
      message: {
        header: "New Message",
        body: "You have a new message.",
        channel: "watsapp",
        subHeader: "New post",
        actionUrl: "",
        additionalData: "",
        avatar: {
          imageUrl: "",
          actionUrl: "",
        },
      },
      requestId: "123",
      isRead: false,
    },
  ];
  const initialState = {
    notifications: mockNotifications,
    unviewedCount: 1,
    sirenCore: null,
  };
  const newState = sirenReducer(initialState, {
    type: NEW_NOTIFICATIONS,
    payload: newMockNotifications,
  });

  expect(newState.notifications).toEqual([
    ...newMockNotifications,
    ...mockNotifications,
  ]);
});
test("sets unviewedCount in the state", () => {
  const initialState = { notifications: [], unviewedCount: 0, sirenCore: null };
  const newState = sirenReducer(initialState, {
    type: SET_UN_VIEWED_NOTIFICATION_COUNT,
    payload: 5,
  });

  expect(newState.notifications).toEqual([]);
  expect(newState.unviewedCount).toBe(5);
  expect(newState.sirenCore).toBeNull();
});
test("returns the initial state for unknown actions", () => {
  const initialState = { notifications: [], unviewedCount: 0, sirenCore: null };
  const action = { type: "UNKNOWN_ACTION" };

  const newState = sirenReducer(
    initialState,
    action as {
      type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT;
      payload: number;
    }
  );

  expect(newState).toEqual(initialState);
});