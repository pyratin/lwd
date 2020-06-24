'use strict';

const titleGet = () => {

  return (
    process.env.npm_package_name
  );
};

const portGet = () => {

  switch (
    true
  ) {

    case (
      !!process.env.PORT
    ) :

      return (
        process.env.PORT
      );

    default:

      return (
        process.env.npm_package_config_PORT
      );
  }
};

const nodeEnvGet = () => {

  return (
    process.env.NODE_ENV
  );
};

export {
  titleGet,
  portGet,
  nodeEnvGet
};
