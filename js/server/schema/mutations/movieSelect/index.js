'use strict';

import movieDataBasicGet from '../fns/movieDataBasicGet';
import plotCapitalizedWordsGet from 
  '../fns/plotCapitalizedWordsGet';

export default async (
  title,
  dict
) => {

  let movie = await movieDataBasicGet(
    title
  );

  const plotCapitalizedWords = plotCapitalizedWordsGet(
    movie.plot,
    dict
  );
};
