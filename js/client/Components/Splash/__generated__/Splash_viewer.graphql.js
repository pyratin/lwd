/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type SplashCharacters_viewer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Splash_viewer$ref: FragmentReference;
declare export opaque type Splash_viewer$fragmentType: Splash_viewer$ref;
export type Splash_viewer = {|
  +$fragmentRefs: SplashCharacters_viewer$ref,
  +$refType: Splash_viewer$ref,
|};
export type Splash_viewer$data = Splash_viewer;
export type Splash_viewer$key = {
  +$data?: Splash_viewer$data,
  +$fragmentRefs: Splash_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Splash_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SplashCharacters_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '4afcac8131538b7db96f4c128dc1c723';

module.exports = node;
