/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SplashCharacter_character$ref: FragmentReference;
declare export opaque type SplashCharacter_character$fragmentType: SplashCharacter_character$ref;
export type SplashCharacter_character = {|
  +renderText: ?string,
  +image: ?string,
  +$refType: SplashCharacter_character$ref,
|};
export type SplashCharacter_character$data = SplashCharacter_character;
export type SplashCharacter_character$key = {
  +$data?: SplashCharacter_character$data,
  +$fragmentRefs: SplashCharacter_character$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SplashCharacter_character",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "renderText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "image",
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'f1171e758cc1dfb390ea459db1b39280';

module.exports = node;
