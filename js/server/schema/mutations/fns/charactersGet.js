'use strict';

import charactersCategoryAssignedGet from 
  './charactersCategoryAssignedGet';
import charactersActorGenderAssignedGet from
  './charactersActorGenderAssignedGet';
import charactersBasicGet from './charactersBasicGet';

export default async (
  cast,
  plot,
  plotText
) => {

  let characters = charactersBasicGet(
    cast, 
    plot
  );

  characters = await charactersCategoryAssignedGet(
    characters,
    plotText
  );

  characters = await charactersActorGenderAssignedGet(
    characters
  );

  return (
    characters
  );
};
