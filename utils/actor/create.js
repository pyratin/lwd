'use strict';

import prompts from 'prompts';

import mongoClientConnect from '~/js/server/fns/mongoClientConnect';
import {
  setCreate
} from './fns/set';
import {
  genresRemove
} from './fns/genre';
import {
  genreCountDocuments,
  genresFind,
  genreFindOne
} from '~/js/server/data/genre';
import {
  setsFind,
  setFindOne,
  setCountDocuments,
  setRemove
} from '~/js/server/data/set';

const actorsSourceFolderPathString = 'utils/actor/source';

const setUpdateSelectChoicesGet = async (
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

const genreIdSelectChoicesGet = async (
  db
) => {

  const choices = await genresFind(
    null,
    null,
    db
  )
    .then(
      (
        genres
      ) => {

        return genres.reduce(
          (
            memo,
            {
              text,
              _id: genreId
            }
          ) => {

            if (
              text
            ) {

              return [
                ...memo,
                {
                  title: text,
                  value: genreId
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
        name: 'genreText',
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
        message: 'new genre\'s name :'
      },
      {
        name: 'setUpdate',
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
        message: 'update existing set ?',
      },
      {
        name: 'setText',
        type(
          prev,
          {
            setText,
            setUpdate
          }
        ) {

          return (
            !setText &&
            setUpdate
          ) ?
            'select' :
            null;
        },
        choices() {

          return setUpdateSelectChoicesGet(
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
            setUpdate
          }
        ) {

          return (
            !setText &&
            !setUpdate
          ) ?
            'text' :
            null;
        },
        async validate(
          value
        ) {

          const exists = await setFindOne(
            {
              text: value
            },
            null,
            db
          );

          return (
            exists
          ) ?
            'name is registered' :
            true;
        },
        message: 'new set\'s name :'
      },
      {
        name: 'genreCreate',
        async type(
          {
            init
          }
        ) {

          const genreCount = await genreCountDocuments(
            null,
            null,
            db
          );

          return (
            !init &&
            genreCount
          ) ?
            'confirm' :
            null;
        },
        initial: false,
        message: 'new genre ?'
      },
      {
        name: 'genreId',
        type(
          prev,
          {
            genreText,
            genreCreate
          }
        ) {

          return (
            !genreText &&
            !genreCreate
          ) ?
            'select' :
            null;
        },
        choices() {

          return genreIdSelectChoicesGet(
            db
          );
        },
        message: 'which genre ?'
      },
      {
        name: 'genreId',
        type(
          prev,
          {
            genreText,
            genreCreate
          }
        ) {

          return (
            !genreText &&
            genreCreate
          ) ?
            'input' :
            null;
        },
        async validate(
          value
        ) {

          const exists = await genreFindOne(
            {
              text: value
            },
            null,
            db
          );

          return (
            exists
          ) ?
            'name is registered' :
            true;
        },
        message: 'new genre\'s name :'
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
      await genresRemove(
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
