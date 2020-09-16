'use strict';

import charactersMetaStarringAssignedGet
  from './charactersMetaStarringAssignedGet';
import charactersMetaRoleAssignedGet 
  from './charactersMetaRoleAssignedGet';
import charactersMetaDualRoleAssignedGet
  from './charactersMetaDualRoleAssignedGet';
import charactersMetaRenderAssignedGet 
  from './charactersMetaRenderAssignedGet';

export default async (
  _characters,
  cards,
  title
) => {

  let characters = charactersMetaStarringAssignedGet(
    _characters,
    cards
  );

  characters = await charactersMetaRoleAssignedGet(
    characters,
    title
  );

  characters = charactersMetaDualRoleAssignedGet(
    characters
  );

  characters = charactersMetaRenderAssignedGet(
    characters
  );

  return (
    characters
  );
};
