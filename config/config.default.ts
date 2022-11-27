import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1669511792940_6056";

  config.oauth = {
    match: '/graphql',
  };

  // add your config here
  config.middleware = [ 'graphql' ];

  // graphql
  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // 是否添加默认的 `Query`、`Mutation` 以及 `Subscription` 定义，默认关闭
    // 开启后可通过 `extend` 的方式将 `Query`、`Mutation` 以及 `Subscription` 定义到各自的文件夹中
    defaultTypeDefsEnabled: false,
    apolloServerOptions: {
      tracing: true, // when set to true, collect and expose trace data in the Apollo Tracing format
      debug: true, // a boolean that will print additional debug logging if execution errors occur
      formatError: (error: any) => {
        return new Error(error.message);
      },
      formatResponse(data: any, _all: any) {
        delete data.extensions; // 当加上 tracing: true 返回到前端的会有extensions对象的值 对前端来说这数据没有用 所有可以删除
        return data;
      },
    },
  };

  config.security = {
    csrf: {
      ignore: () => true,
    },
  };

  config.cors = {
    origin: '*', 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
