import React from "react";
import { getTimeAgo, renderAsImage, logger } from "../../src/utils/commonUtils";
import { LogLevel } from "../../src/utils/constants";

describe("getTimeAgo", () => {
  test('returns "Just now" for recent time', () => {
    const recentTime = new Date(Date.now() - 5000).toISOString(); // 5 seconds ago

    expect(getTimeAgo(recentTime)).toBe("Just now");
  });

  test("returns minutes ago for past minutes", () => {
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();

    expect(getTimeAgo(oneMinuteAgo)).toBe("1 minute ago");

    const fiveMinutesAgo = new Date(Date.now() - 300000).toISOString();

    expect(getTimeAgo(fiveMinutesAgo)).toBe("5 minutes ago");
  });

  test("returns hours ago for past hours", () => {
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();

    expect(getTimeAgo(oneHourAgo)).toBe("1 hour ago");

    const threeHoursAgo = new Date(Date.now() - 10800000).toISOString();

    expect(getTimeAgo(threeHoursAgo)).toBe("3 hours ago");
  });

  test("returns days ago for past days", () => {
    const oneDayAgo = new Date(Date.now() - 86400000).toISOString();

    expect(getTimeAgo(oneDayAgo)).toBe("1 day ago");

    const threeDaysAgo = new Date(Date.now() - 259200000).toISOString();

    expect(getTimeAgo(threeDaysAgo)).toBe("3 days ago");
  });

  test("returns years ago for past years", () => {
    const oneYearAgo = new Date(Date.now() - 31536000000).toISOString();

    expect(getTimeAgo(oneYearAgo)).toBe("1 year ago");

    const threeYearsAgo = new Date(Date.now() - 94608000000).toISOString();

    expect(getTimeAgo(threeYearsAgo)).toBe("3 years ago");
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