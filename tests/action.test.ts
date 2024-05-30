/* eslint @typescript-eslint/no-var-requires: 0 */
import "../src/parser/command-line";
import { main } from "../src";

jest.mock("../src/parser/command-line", () => {
  const cfg = require("./__mocks__/results/valid-configuration.json");
  const dotenv = require("dotenv");
  dotenv.config();
  return {
    stateId: 1,
    eventName: "issues.closed",
    authToken: process.env.GITHUB_TOKEN,
    ref: "",
    eventPayload: {
      issue: {
        html_url: "https://github.com/ubiquibot/comment-incentives/issues/22",
        number: 1,
        state_reason: "not_planned",
      },
      repository: {
        name: "conversation-rewards",
        owner: {
          login: "ubiquibot",
        },
      },
    },
    settings: JSON.stringify(cfg),
  };
});

describe("Action tests", () => {
  it("Should skip when the issue is closed without the completed status", async () => {
    const e = await main();
    expect(e).toEqual("# Issue was not closed as completed. Skipping.");
  });
});
