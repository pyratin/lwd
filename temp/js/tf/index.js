'use strict';

import path from 'path';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import shelljs from 'shelljs';

const {
  Canvas,
  Image,
  ImageData
} = canvas;

const weightsPathString = 'temp/js/tf/weights';

const sourceFolderPathString = 'temp/js/tf/source';

const faceapiInit = async () => {

  faceapi.env.monkeyPatch(
    {
      Canvas,
      Image,
      ImageData
    }
  );

  const weights = path.join(
    process.cwd(),
    weightsPathString
  );

  await faceapi.nets.tinyFaceDetector.loadFromDisk(
    weights
  );

  await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(
    weights
  );

  await faceapi.nets.ageGenderNet.loadFromDisk(
    weights
  );
};

const processRunFn = async (
  filename
) => {

  const image = await canvas.loadImage(
    path.join(
      process.cwd(),
      sourceFolderPathString,
      filename
    )
  );

  const detections = await faceapi.detectAllFaces(
    image,
    new faceapi.TinyFaceDetectorOptions(
      {
        inputSize: 256,
        scoreThreshold: 0.5
      }
    )
  );

  let detection = (
    detections.length === 1
  ) ?
    detections[
      0
    ] :
    null;

  detection = (
    detection &&
    (
      (
        detection._box._width /
        detection._imageDims._width
      ) *
      100
    ) > 25
  ) ?
    detection :
    null;

  if (
    detection
  ) {

    return (
      filename
    );
  }

  return (
    null
  );
};

const processRun = () => {

  const sourceFolderPath = path.join(
    process.cwd(),
    sourceFolderPathString
  );

  return shelljs.ls(
    sourceFolderPath
  )
    .filter(
      (
        filename
      ) => {

        return (
          filename.match(
            /\.jpeg$/
          )
        );
      }
    )
    .sort(
      (
        a, b
      ) => {

        const aN = parseInt(
          a.match(
            /(\d+)/
          )[
            1
          ]
        );

        const bN = parseInt(
          b.match(
            /(\d+)/
          )[
            1
          ]
        );

        switch (
          true
        ) {

          case (
            aN > bN
          ) :

            return 1;

          case (
            bN > aN
          ) :

            return -1;
        }
      }
    )
    .reduce(
      (
        memo,
        filename
      ) => {

        return memo.then(
          (
            res
          ) => {

            return processRunFn(
              filename
            )
              .then(
                (
                  result
                ) => {

                  if (
                    result
                  ) {

                    return [
                      ...res,
                      result
                    ];
                  }

                  shelljs.mv(
                    path.join(
                      sourceFolderPath,
                      filename
                    ),
                    path.join(
                      sourceFolderPath,
                      'discard',
                      filename
                    )
                  );

                  return (
                    res
                  );
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

(
  async () => {

    shelljs.mkdir(
      path.join(
        process.cwd(),
        sourceFolderPathString,
        'discard'
      )
    );

    await faceapiInit();

    await processRun();
  }
)();
