'use strict';

import prompts from 'prompts';

import mongoClientConnect from '~/js/server/fns/mongoClientConnect';
import {
  setCreate,
  setsRemove
} from './fns/set';
import {
  setsFind,
  setFindOne,
  setCountDocuments,
  setRemove
} from '~/js/server/data/set';

const actorsSourceFolderPathString = 'utils/actor/source';

const genres = [
  'tamil-spoof',
  'tamil-mythology'
];

const setSelectChoicesGet = async (
  db
) => {

  const choices = await setsFind(
    null,
    null,
    db
  )
    .then(
      (
        sets
      ) => {

        return sets.reduce(
          (
            memo,
            {
              text
            }
          ) => {

            if (
              text
            ) {

              return [
                ...memo,
                {
                  value: text
                }
              ];
            }

            return (
              memo
            );
          },
          []
        );
      }
    );

  return (
    choices
  );
};

const promptsFn = (
  db
) => {

  return prompts(
    [
      {
        name: 'init',
        type: 'confirm',
        initial: false,
        message: 'delete all collections ?'
      },
      {
        name: 'setText',
        type(
          prev,
          {
            init
          }
        ) {

          return (
            init
          ) ?
            'text' :
            null;
        },
        message: 'new set\'s name :',
      },
      {
        name: 'setOverwrite',
        async type(
          prev,
          {
            init
          }
        ) {

          const setCount = await setCountDocuments(
            null,
            null,
            db
          );

          return (
            !init &&
            setCount
          ) ?
            'confirm' :
            null;
        },
        initial: false,
        message: 'overwrite existing set ?',
      },
      {
        name: 'setText',
        type(
          prev,
          {
            setText,
            setOverwrite
          }
        ) {

          return (
            !setText &&
            setOverwrite
          ) ?
            'select' :
            null;
        },
        async choices() {

          return setSelectChoicesGet(
            db
          );
        },
        message: 'select a set to overwrite :'
      },
      {
        name: 'setText',
        type(
          prev,
          {
            setText,
            setOverwrite
          }
        ) {

          return (
            !setText &&
            !setOverwrite
          ) ?
            'text' :
            null;
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
    } = await promptsFn(
      db
    );

    (
      init
    ) &&
      await setsRemove(
        db
      );

    const set = await setFindOne(
      {
        text: setText
      },
      null,
      db
    );

    (
      set
    ) &&
      await setRemove(
        set._id,
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
