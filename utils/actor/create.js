'use strict';

import path from 'path';
import prompts from 'prompts';
import {
  ObjectID
} from 'mongodb';
import shelljs from 'shelljs';

import mongoClientConnect from '~/js/server/fns/mongoClientConnect';
import {
  genresFind,
  genreFindOne,
  genreCountDocuments,
  genreCreate,
  genresRemove
} from '~/js/server/data/genre';
import {
  setsFind,
  setFindOne,
  setCountDocuments,
  setCreate,
  setRemove
} from '~/js/server/data/set';
import {
  actorsCreate
} from './fns/actor';
import {
  actorImagesCreate
} from './fns/actorImage';

const sourceFolderPathString = 'utils/actor/source';

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
        name: 'setFolderPathFragment',
        type: 'select',
        choices() {

          return shelljs.ls(
            path.join(
              process.cwd(),
              sourceFolderPathString
            )
          )
            .map(
              (
                text
              ) => {

                return {
                  value: text
                };
              }
            );
        },
        message: 'source folder :'
      },
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
        initial(
          prev,
          {
            setFolderPathFragment
          }
        ) {

          return (
            setFolderPathFragment
          );
        },
        validate(
          value
        ) {

          return (
            !value
          ) ?
            'required' :
            true;
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
        validate(
          value
        ) {

          return (
            !value
          ) ?
            'required' :
            true;
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
            setText,
            setCreate
          }
        ) {

          return (
            !setText &&
            setCreate
          ) ?
            'text' :
            null;
        },
        initial(
          prev,
          {
            setFolderPathFragment
          }
        ) {

          return (
            setFolderPathFragment
          );
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

          switch (
            true
          ) {

            case (
              !value
            ) :

              return (
                'required'
              );

            case (
              exists
            ) :

              return (
                'registered'
              );

            default:

              return (
                true
              );
          }
        },
        message: 'new set\'s name :'
      },
      {
        name: 'setId',
        type(
          prev,
          {
            setText
          }
        ) {

          return (
            !setText
          ) ?
            'select' :
            null;
        },
        choices() {

          return setIdSelectChoicesGet(
            db
          );
        },
        message: 'select a set to overwrite :'
      },
      {
        name: 'genreCreate',
        async type(
          prev,
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
            genreText,
            genreCreate
          }
        ) {

          return (
            !genreText &&
            genreCreate
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

          switch (
            true
          ) {

            case (
              !value
            ) :

              return (
                'required'
              );

            case (
              exists
            ) :

              return (
                'required'
              );

            default :

              return (
                true
              );
          }
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

const genreGet = (
  genreText,
  genreId,
  db
) => {

  switch (
    true
  ) {

    case (
      !!genreText
    ) :

      return genreCreate(
        {
          text: genreText
        },
        db
      );

    case (
      !!genreId
    ) :

      return genreFindOne(
        {
          _id: new ObjectID(
            genreId
          )
        },
        null,
        db
      );
  }
};

const setGet = (
  setText,
  setId,
  genreId,
  db
) => {

  switch (
    true
  ) {

    case (
      !!setText
    ) :

      return setCreate(
        {
          text: setText,
          _genreId: new ObjectID(
            genreId
          )
        },
        db
      ); 

    case (
      !!setId
    ) :

      return setRemove(
        setId,
        db
      )
        .then(
          (
            {
              text: setText
            }
          ) => {

            return setCreate(
              {
                text: setText,
                _genreId: new ObjectID(
                  genreId
                )
              },
              db
            );
          }
        );
  }
};

(
  async () => {

    const db = await mongoClientConnect();

    const {
      setFolderPathFragment,
      init,
      setText,
      genreText,
      setId,
      genreId
    } = await promptsFn(
      db
    );

    const setFolderPathString = `
      ${
        sourceFolderPathString
      }/${
        setFolderPathFragment
      }
    `
      .trim();

    (
      init
    ) &&
      await genresRemove(
        db
      );

    const genre = await genreGet(
      genreText,
      genreId,
      db
    );

    const set = await setGet(
      setText,
      setId,
      genre._id,
      db
    );

    const actors = await actorsCreate(
      set._id,
      setFolderPathString,
      db
    );

    const actorImages = await actorImagesCreate(
      actors,
      setFolderPathString,
      db
    );

    // eslint-disable-next-line no-console
    console.log(
      `
        collectionInit: DONE
        actors: ${
          actors.length
        }
        actorImages: ${
          actorImages.length
        }
      `
        .trim()
    );
  }
)();
