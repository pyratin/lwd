'use strict';

import fs from 'fs';
import path from 'path';

import nodeFetch from '~/js/server/schema/mutations/fns/nodeFetch';

const categorymembersFilePathString = 
  'utils/mediawiki/categorymembers.json';

const queryGet = (
  categorymember
) => {

  return `
    https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&format=json&cmlimit=500&cmtitle=${
      encodeURIComponent(
        categorymember
      )
    }
  `
    .trim();
};

const queryRun = (
  categorymember
) => {

  // eslint-disable-next-line no-console
  console.log(
    categorymember
  );

  return nodeFetch(
    queryGet(
      categorymember
    )
  );
};

const categorymembersGet = (
  categorymembers
) => {

  return categorymembers
    .reduce(
      (
        memo,
        categorymember
      ) => {

        return memo.then(
          (
            res
          ) => {

            return queryRun(
              categorymember
            )
              .then(
                async (
                  result
                ) => {

                  const categorymembers = [
                    ...new Set(
                      result.query.categorymembers
                        .map(
                          (
                            {
                              title
                            }
                          ) => {

                            return (
                              title
                            );
                          }
                        )
                        .filter(
                          (
                            title
                          ) => {

                            return !(
                              res.find(
                                (
                                  _res
                                ) => {

                                  return (
                                    _res ===
                                    title
                                  );
                                }
                              )
                            );
                          }
                        )
                    )
                  ];

                  const categories = categorymembers
                    .filter(
                      (
                        categorymember
                      ) => {

                        return (
                          categorymember.match(
                            /^Category:/
                          )
                        );
                      }
                    );
                  

                  return [
                    ...new Set(
                      [
                        ...res,
                        ...categorymembers,
                        ...await (
                          categorymembersGet(
                            categories
                          )
                        )
                      ]
                    )
                  ];
                }
              );
          }
        );
      },
      Promise.resolve(
        []
      )
    );
};

const categorymembersFileWrite = (
  categorymembers
) => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      return fs.writeFile(
        path.join(
          process.cwd(),
          categorymembersFilePathString
        ),
        JSON.stringify(
          categorymembers,
          null,
          2
        ),
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

          // eslint-disable-next-line no-console
          console.log(
            `
              categorymembersFileWrite: ${
                categorymembersFilePathString
              }
            `
              .trim()
          );

          return resolve(
            res
          );
        }
      );
    }
  );
};

(
  async() => {

    const categorymembers = await categorymembersGet(
      [
        'Category:People'
      ]
    );

    categorymembersFileWrite(
      categorymembers
    );
  }
)();


