'use strict';

import {
  MongoClient
} from 'mongodb';

export default () => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const mongoUrl = process.env.MONGO_URL;

      const dbName = mongoUrl.split(
        /\//
      )
        .slice(
          -1
        )[
          0
        ];

      return new MongoClient.connect(
        mongoUrl,
        {
          useUnifiedTopology: true
        },
        (
          error,
          client
        ) => {

          if (
            error
          ) {

            return reject(
              error
            );
          }

          // eslint-disable-next-line no-console
          console.log(
            `
              mongoClientConnect: ${
                mongoUrl
              }
            `
              .trim()
          );

          return resolve(
            client.db(
              dbName
            )
          );
        }
      );
    }
  );
};
