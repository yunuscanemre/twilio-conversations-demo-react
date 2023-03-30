import { commands, Config, Job, reusable } from "@circleci/circleci-config-sdk";
import { nodeExecutor } from "./executors";
import { browsersOrb } from "./orbs/browsers";

const runAutomationTests = (config: Config) => {
  const job = new Job(`test-webdrive`, nodeExecutor, [
    new commands.Checkout(),
    new reusable.ReusedCommand(browsersOrb.commands.install_chrome),
    new reusable.ReusedCommand(browsersOrb.commands.install_chromedriver),
    new commands.Run({ command: "yarn build:wdio" }),
    new commands.Run({ command: "yarn test:wdio" }),
  ]);
  config.addJob(job);
  return job;
};

export { runAutomationTests };
