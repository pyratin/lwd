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

const setIdSelectChoicesGet = async (
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
              text: setText,
              _id: setId
            }
          ) => {

            if (
              setText
            ) {

              return [
                ...memo,
                {
                  title: setText,
                  value: setId
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
              text: genreText,
              _id: genreId
            }
          ) => {

            if (
              genreText
            ) {

              return [
                ...memo,
                {
                  title: genreText,
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
        name: 'setCreate',
        async type(
          prev,
          {
            setText
          }
        ) {

          const setCount = await setCountDocuments(
            null,
            null,
            db
          );

          return (
            !setText &&
            setCount
          ) ?
            'confirm' :
            null;
        },
        initial: false,
        message: 'new set ?',
      },
      {
        name: 'setText',
        type(
          prev,
          {
            setText
          }
        ) {

          return (
            !setText
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
      //{
        //name: 'setId',
        //type(
          //prev,
          //{
            //setText
          //}
        //) {

          //return (
            //!setText
          //) ?
            //'select' :
            //null;
        //},
        //choices() {

          //return setIdSelectChoicesGet(
            //db
          //);
        //},
        //message: 'select a set to overwrite :'
      //},
      {
        name: 'genreCreate',
        async type(
          {
            genreText
          }
        ) {

          const genreCount = await genreCountDocuments(
            null,
            null,
            db
          );

          return (
            !genreText &&
            genreCount
          ) ?
            'confirm' :
            null;
        },
        initial: false,
        message: 'new genre ?'
      },
      {
        name: 'genreText',
        type(
          prev,
          {
            genreText
          }
        ) {

          return (
            !genreText
          ) ?
            'text' :
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
      },
      {
        name: 'genreId',
        type(
          prev,
          {
            genreText
          }
        ) {

          return (
            !genreText
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
      genreText,
      setCreate,
      genreCreate,
      setId,
      genreId
    } = await promptsFn(
      db
    );
    console.log(
      init,
      setText,
      genreText,
      setCreate,
      genreCreate,
      setId,
      genreId
    );

    //(
      //init
    //) &&
      //await genresRemove(
        //db
      //);

    //const set = await setFindOne(
      //{
        //text: setText
      //},
      //null,
      //db
    //);

    //(
      //set
    //) &&
      //await setRemove(
        //set._id,
        //db
      //);

    //await setCreate(
      //setText,
      //genre,
      //actorsSourceFolderPathString,
      //db
    //);

    //// eslint-disable-next-line no-console
    //console.log(
      //'collectionInit: DONE'
    //);
  }
)();
