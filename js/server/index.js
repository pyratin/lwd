'use strict';

import path from 'path';
import express from 'express';
import expressGraphql from 'express-graphql';

import {
  titleGet,
  portGet,
  nodeEnvGet,
  mongoUriGet,
  outputResGet,
  hostUrlGet
} from './fns/variable';
import schema from './schema';
import mongoClientConnect from './fns/mongoClientConnect';
import mediaOutputFolderInit from 
  './fns/mediaOutputFolderInit';
import movieGifRouteHandle from 
  './fns/movieOutputGifRouteHandle';
import movieIdRouteHandle from './fns/movieIdRouteHandle';
import schemaUpdate from './fns/schemaUpdate';

(
  async () => {

    await mediaOutputFolderInit();

    const db = await mongoClientConnect(
      mongoUriGet()
    );

    await schemaUpdate();

    const port = portGet();

    return express()

      .set(
        'view engine',
        'ejs'
      )
      
      .use(
        express.static(
          path.join(
            process.cwd(),
            'dist/client'
          )
        )
      )

      .use(
        express.static(
          path.join(
            process.cwd(),
            'media'
          )
        )
      )

      .use(
        '/graphql',
        async (
          req,
          res
        ) => {

          return expressGraphql(
            {
              schema,
              pretty: true,
              context: {
                db,
                req
              }
            }
          )(
            req,
            res
          );
        }
      )

      .get(
        '/output/:movieGif(\\w{24}.gif)',
        (
          req,
          res
        ) => {

          return movieGifRouteHandle(
            db,
            req,
            res
          );
        }
      )

      .get(
        '/movies/:movieId(\\w{24})',
        (
          req,
          res
        ) => {

          return movieIdRouteHandle(
            db,
            req,
            res
          );
        }
      )

      .get(
        '*',
        (
          req,
          res
        ) => {

          return res.render(
            'index',
            {
              title: titleGet(),
              url: hostUrlGet(
                req
              ),
              image: {
                path: '/root.gif',
                width: outputResGet(),
                height: outputResGet()
              }
            }
          );
        }
      )

      .listen(
        port,
        () => {

          // eslint-disable-next-line no-console
          console.log(
            `
              listening at http://localhost:${
                port
              } in ${
                nodeEnvGet()
              } mode
            `
              .trim()
          );

          return (
            null
          );
        }
      );
  }
)();
