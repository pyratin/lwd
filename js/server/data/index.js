'use strict';

const listCollections = (
  query = {},
  options = {},
  db
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return db.listCollections(
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

const find = (
  query = {},
  options = {},
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

const findOne = (
  query,
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
        .findOne(
          query,
          options,
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

const countDocuments = (
  query = {},
  options = {},
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
        .countDocuments(
          query,
          options,
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

const deleteMany = (
  filter = {},
  options = {},
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
        .deleteMany(
          filter,
          options,
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

export {
  listCollections,
  find,
  findOne,
  countDocuments,
  findOneAndUpdate,
  findOneAndDelete,
  deleteMany
};
