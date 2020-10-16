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

const outputResGet = () => {

  return (
    process.env.npm_package_config_OUTPUT_RES
  );
};

const hostUrlGet = (
  req
) => {

  return `
    ${
      req.protocol
    }://${
      req.get(
        'host'
      )
    }
  `
    .trim();
};

const mongoLocalUriGet = () => {

  return (
    process.env.npm_package_config_MONGO_LOCAL_URI
  );
};

const mongoRemoteUriGet = () => {

  return (
    process.env.npm_package_config_MONGO_REMOTE_URI
  );
};

const mongoUriGet = () => {

  switch (
    process.env.NODE_ENV
  ) {

    case (
      'development'
    ) :

      return mongoLocalUriGet();

    case (
      'production'
    ) :

      return mongoRemoteUriGet();
  }
};

const genreGet = () => {

  return (
    process.env.npm_package_config_GENRE
  );
};

const heroGet = () => {

  return (
    process.env.npm_package_config_HERO
  );
};

export {
  titleGet,
  portGet,
  nodeEnvGet,
  outputResGet,
  hostUrlGet,
  mongoLocalUriGet,
  mongoRemoteUriGet,
  mongoUriGet,
  genreGet,
  heroGet
};
