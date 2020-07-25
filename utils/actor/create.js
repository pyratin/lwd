'use strict';

import prompts from 'prompts';

import mongoClientConnect from '~/js/server/fns/mongoClientConnect';
import {
  setCreate,
  setsRemove
} from './fns/set';

const actorsSourceFolderPathString = 'utils/actor/source';

const genres = [
  'tamil-spoof',
  'tamil-mythology'
];

const inquirerFn = () => {

  return prompts(
    [
      {
        name: 'init',
        message: 
        'delete all collections ?',
        type: 'confirm',
        initial: false
      },
      {
        name: 'setText',
        message: 'new set\'s name :',
        type: 'text'
      },
      {
        name: 'genre',
        message: 'which genre ?',
        type: 'select',
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

    const {
      init,
      setText,
      genre
    } = await inquirerFn();

    const db = await mongoClientConnect();

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
