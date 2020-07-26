'use strict';

import prompts from 'prompts';

import mongoClientConnect from '~/js/server/fns/mongoClientConnect';
import {
  setCreate,
  setsRemove
} from './fns/set';
import {
  setsFind,
  setFindOne
} from '~/js/server/data/set';

const actorsSourceFolderPathString = 'utils/actor/source';

const genres = [
  'tamil-spoof',
  'tamil-mythology'
];

const inquirerFn = (
  db
) => {

  return prompts(
    [
      {
        name: 'init',
        message: 
        'delete all collections ?',
        type: 'confirm',
        initial: false
      },
      //{
        //name: 'setText',
        //type: 'select',
        //message: 'new set\'s name :',
        //choices() {

          //return setsFind(
            //null,
            //null,
            //db
          //)
            //.then(
              //(
                //sets
              //) => {

                //return [
                  //...sets.map(
                    //(
                      //{
                        //text: value
                      //}
                    //) => {

                      //return {
                        //value
                      //};
                    //}
                  //),
                  //{
                    //title: 'create new ?',
                    //value: 'create'
                  //}
                //];
              //}
            //);
        //}
      //},
      {
        name: 'setText',
        type(
          prev
        ) {

          return (
            'text'
          );
        },
        message: 'new set\'s name :',
        async validate(
          prev
        ) {

          const exists = await setFindOne(
            {
              text: prev
            },
            null,
            db
          );

          return (
            exists
          ) ?
            'name is registered' :
            true;
        }
      },
      {
        name: 'genre',
        type: 'select',
        message: 'which genre ?',
        choices() {

          return genres.map(
            (
              genre
            ) => {

              return {
                value: genre
              };
            }
          );
        }
      }
    ],
  )
    .then(
      (
        answers
      ) => {

        return (
          answers
        );
      }
    );
};

(
  async () => {

    const db = await mongoClientConnect();

    const {
      init,
      setText,
      genre
    } = await inquirerFn(
      db
    );

    await setsRemove(
      init,
      db
    );

    await setCreate(
      setText,
      genre,
      actorsSourceFolderPathString,
      db
    );

    // eslint-disable-next-line no-console
    console.log(
      'collectionInit: DONE'
    );
  }
)();
