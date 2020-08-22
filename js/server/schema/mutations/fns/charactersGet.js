'use strict';

import charactersSyncGet from './charactersSyncGet';
import charactersCategoryAssignedGet from 
  './charactersCategoryAssignedGet';

export default async (
  cast,
  plot,
  plotText
) => {

  let characters = charactersSyncGet(
    cast, 
    plot
  );

  characters = await charactersCategoryAssignedGet(
    characters,
    plotText
  );

  return (
    characters
  );
};
