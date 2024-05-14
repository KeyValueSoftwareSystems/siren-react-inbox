import type { RefObject } from "react";
import React from "react";

import {
  calculateModalPosition,
  calculateModalWidth,
  debounce,
  filterDataProperty,
  generateElapsedTimeText,
  generateUniqueId,
  getModalContentHeightInFullScreen,
  isEmptyArray,
  isValidResponse,
  logger,
  mergeArrays,
  renderAsImage,
} from "../../src/utils/commonUtils";
import { LogLevel } from "../../src/utils/constants";

describe("generateElapsedTimeText", () => {
  test('returns "Just now" for recent time', () => {
    const recentTime = new Date(Date.now() - 5000).toISOString(); // 5 seconds ago

    expect(generateElapsedTimeText(recentTime)).toBe("Just now");
  });

  test("returns minutes ago for past minutes", () => {
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();

    expect(generateElapsedTimeText(oneMinuteAgo)).toBe("1 minute ago");

    const fiveMinutesAgo = new Date(Date.now() - 300000).toISOString();

    expect(generateElapsedTimeText(fiveMinutesAgo)).toBe("5 minutes ago");
  });

  test("returns hours ago for past hours", () => {
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();

    expect(generateElapsedTimeText(oneHourAgo)).toBe("1 hour ago");

    const threeHoursAgo = new Date(Date.now() - 10800000).toISOString();

    expect(generateElapsedTimeText(threeHoursAgo)).toBe("3 hours ago");
  });

  test("returns days ago for past days", () => {
    const oneDayAgo = new Date(Date.now() - 86400000).toISOString();

    expect(generateElapsedTimeText(oneDayAgo)).toBe("1 day ago");

    const threeDaysAgo = new Date(Date.now() - 259200000).toISOString();

    expect(generateElapsedTimeText(threeDaysAgo)).toBe("3 days ago");
  });

  test("returns years ago for past years", () => {
    const oneYearAgo = new Date(Date.now() - 31536000000).toISOString();

    expect(generateElapsedTimeText(oneYearAgo)).toBe("1 year ago");

    const threeYearsAgo = new Date(Date.now() - 94608000000).toISOString();

    expect(generateElapsedTimeText(threeYearsAgo)).toBe("3 years ago");
  });
});

describe("renderAsImage", () => {
  test("returns true for string icon", () => {
    expect(renderAsImage("icon.svg")).toBe(true);
  });

  test("returns false for JSX icon", () => {
    const icon = (
      <svg width="24" height="24">
        <path d="M..." />
      </svg>
    );

    expect(renderAsImage(icon)).toBe(false);
  });
});

describe("renderAsImage", () => {
  test("log function formats and outputs message with INFO level", async () => {
    const mockConsoleLog = jest.spyOn(console, "log");
    const message = "This is an informative message.";

    await logger.log(LogLevel.INFO, message);

    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining(`[INFO] ${message}`)
    );
  });
  test("log function formats and outputs message with ERROR level", async () => {
    const mockConsoleLog = jest.spyOn(console, "log");
    const errorMessage = "An error occurred.";

    await logger.log(LogLevel.ERROR, errorMessage);

    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining(`[ERROR] ${errorMessage}`)
    );
  });

  test("error function calls log function with ERROR level", async () => {
    const mockLog = jest.spyOn(logger, "log");
    const errorMessage = "An error has been encountered.";

    logger.error(errorMessage);

    expect(mockLog).toHaveBeenCalledWith(LogLevel.ERROR, errorMessage);
  });

  test("info function calls log function with INFO level", async () => {
    const mockLog = jest.spyOn(logger, "log");
    const message = "Some informative details.";

    logger.info(message);

    expect(mockLog).toHaveBeenCalledWith(LogLevel.INFO, message);
  });
});

describe("isEmptyArray", () => {
  test("returns true for an empty array", () => {
    expect(isEmptyArray([])).toBe(true);
  });

  test("returns false for a non-empty array", () => {
    expect(
      isEmptyArray([
        {
          id: "1",
          createdAt: "",
          message: {
            channel: "",
            header: "test1",
            subHeader: "test1 sub",
            body: "",
            actionUrl: "",
            avatar: {
              imageUrl: "",
              actionUrl: null,
            },
            additionalData: "",
          },
          requestId: "",
          isRead: true,
        },
      ])
    ).toBe(false);
  });
});

describe("isValidResponse", () => {
  test("returns true for a valid response object", () => {
    const response = { data: [] };

    expect(isValidResponse(response)).toBe(true);
  });

  test("returns false for an invalid response object", () => {
    expect(isValidResponse({ data: null, error: null })).toBe(false);
    expect(isValidResponse({ data: null, error: null })).toBe(false);
  });
});

describe("filterDataProperty", () => {
  test("returns null when response has no data", () => {
    const response = { data: null, error: null };

    expect(filterDataProperty(response)).toBe(null);
  });

  test("returns data array when response has data", () => {
    const response = { data: [{    id: '1',
      createdAt: "",
      message: {
        channel: "",
        header: "test1",
        subHeader: "test1 sub",
        body: "",
        actionUrl: "",
        avatar: {
          imageUrl: "",
          actionUrl: null,
        },
        additionalData: "",
      },
      requestId: "",
      isRead: true}] };

    expect(filterDataProperty(response)).toEqual([{    id: '1',
      createdAt: "",
      message: {
        channel: "",
        header: "test1",
        subHeader: "test1 sub",
        body: "",
        actionUrl: "",
        avatar: {
          imageUrl: "",
          actionUrl: null,
        },
        additionalData: "",
      },
      requestId: "",
      isRead: true}]);
  });
});

describe("mergeArrays", () => {
  test("returns an empty array when both arrays are empty", () => {
    expect(mergeArrays([], [])).toEqual([]);
  });

  test("returns the non-empty array when one array is empty", () => {
    const array = [{id: '1',
      createdAt: "",
      message: {
        channel: "",
        header: "test1",
        subHeader: "test1 sub",
        body: "",
        actionUrl: "",
        avatar: {
          imageUrl: "",
          actionUrl: null,
        },
        additionalData: "",
      },
      requestId: "",
      isRead: true
    }]

    expect(mergeArrays([], array)).toEqual(array);
    expect(mergeArrays(array, [])).toEqual(array);
  });

  test("returns the merged array when both arrays are non-empty", () => {
    const array1 =  [{id: '1',
      createdAt: "",
      message: {
        channel: "",
        header: "test1",
        subHeader: "test1 sub",
        body: "",
        actionUrl: "",
        avatar: {
          imageUrl: "",
          actionUrl: null,
        },
        additionalData: "",
      },
      requestId: "",
      isRead: true
    }];
    const array2 = [{id: '2',
      createdAt: "",
      message: {
        channel: "",
        header: "test2",
        subHeader: "test2 sub",
        body: "",
        actionUrl: "",
        avatar: {
          imageUrl: "",
          actionUrl: null,
        },
        additionalData: "",
      },
      requestId: "",
      isRead: true
    }];

    const array3 = [{id: '1',
      createdAt: "",
      message: {
        channel: "",
        header: "test1",
        subHeader: "test1 sub",
        body: "",
        actionUrl: "",
        avatar: {
          imageUrl: "",
          actionUrl: null,
        },
        additionalData: "",
      },
      requestId: "",
      isRead: true
    },
    {id: '2',
      createdAt: "",
      message: {
        channel: "",
        header: "test2",
        subHeader: "test2 sub",
        body: "",
        actionUrl: "",
        avatar: {
          imageUrl: "",
          actionUrl: null,
        },
        additionalData: "",
      },
      requestId: "",
      isRead: true
    }
    ]

    expect(mergeArrays(array1, array2)).toEqual(array3);
  });
});

interface MockWindow extends Window {
  innerWidth: number;
}


describe("calculateModalPosition", () => {
  const iconRefMock: RefObject<HTMLDivElement> = {
    current: document.createElement("div"),
  };
  const windowMock: MockWindow = { innerWidth: 800 } as MockWindow;

  test("returns position left when spaceRight is greater than modalWidth", () => {
    const containerWidth = 300;
    const position = calculateModalPosition(iconRefMock, windowMock, containerWidth);

    expect(position).toEqual({ left: "0px" });
  });
});

describe("calculateModalWidth", () => {

  test("returns correct modalWidth when containerWidth is string", () => {
    const modalWidth = calculateModalWidth("300px");

    expect(modalWidth).toBe(340);
  });

  test("returns correct modalWidth when containerWidth is number", () => {
    const modalWidth = calculateModalWidth(300);

    expect(modalWidth).toBe(340);
  });
});


jest.useFakeTimers();

describe("debounce", () => {
  test("calls the original function after the delay", () => {
    const originalFunction = jest.fn();
    const debouncedFunction = debounce(originalFunction, 1000);

    debouncedFunction();

    jest.advanceTimersByTime(1000);

    expect(originalFunction).toHaveBeenCalled();
  });

});

describe("getModalContentHeightInFullScreen", () => {
  test("returns correct height when headerHeight is undefined", () => {
    const height = getModalContentHeightInFullScreen(undefined);

    expect(height).toBe("calc(100% - 0px)");
  });

  test("returns correct height when headerHeight is a string", () => {
    const height = getModalContentHeightInFullScreen("50px");

    expect(height).toBe("calc(100% - 50px)");
  });

  test("returns correct height when headerHeight is a number", () => {
    const height = getModalContentHeightInFullScreen(100);

    expect(height).toBe("calc(100% - 100px)");
  });
});

describe("generateUniqueId", () => {
  test("returns a unique ID string", () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();

    expect(typeof id1).toBe("string");
    expect(typeof id2).toBe("string");
    expect(id1).not.toBe(id2);
  });
});