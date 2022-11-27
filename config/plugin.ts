import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  graphql: {
    enable: true,
    package: "@switchdog/egg-graphql",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
};

export default plugin;
