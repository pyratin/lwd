'use strict';

const find = (
  query = {},
  options = {
    projection: {},
    sort: {},
    skip: 0,
    limit: 0
  },
  collectionName,
  db
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return db.collection(
        collectionName
      )
        .find(
          query,
          options
        )
        .toArray(
          (
            error,
            res
          ) => {

            if (
              error
            ) {

              return reject(
                error
              );
            }

            return resolve(
              res
            );
          }
        );
    }
  );
};

const findOneAndUpdate = (
  filter,
  update,
  options,
  collectionName,
  db
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return db.collection(
        collectionName
      )
        .findOneAndUpdate(
          filter,
          update,
          options,
          (
            error,
            {
              value: res
            }
          ) => {

            if (
              error
            ) {

              return reject(
                error
              );
            }

            return resolve(
              res
            );
          }
        );
    }
  );
};

const findOneAndDelete = (
  filter,
  options,
  collectionName,
  db
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return db.collection(
        collectionName
      )
        .findOneAndDelete(
          filter,
          options,
          (
            error,
            {
              value: res
            }
          ) => {

            if (
              error
            ) {

              return reject(
                error
              );
            }

            return resolve(
              res
            );
          }
        );
    }
  );
};

export {
  find,
  findOneAndUpdate,
  findOneAndDelete
};
