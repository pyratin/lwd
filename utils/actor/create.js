'use strict';

import inquirer from 'inquirer';

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

  return inquirer.prompt(
    [
      {
        name: 'init',
        message: 
        'delete all collections ?',
        type: 'confirm',
        default: false
      },
      {
        name: 'setOverwrite',
        message: 'overwrite a set ?',
        type: 'confirm',
        default: false
      },
      {
        name: 'setText',
        message: 'new set\'s name :',
        type: 'input'
      },
      {
        name: 'genre',
        message: 'which genre ?',
        type: 'rawlist',
        choices: genres
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
