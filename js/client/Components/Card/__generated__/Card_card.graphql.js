/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Card_card$ref: FragmentReference;
declare export opaque type Card_card$fragmentType: Card_card$ref;
export type Card_card = {|
  +image: ?string,
  +renderText: ?string,
  +$refType: Card_card$ref,
|};
export type Card_card$data = Card_card;
export type Card_card$key = {
  +$data?: Card_card$data,
  +$fragmentRefs: Card_card$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Card_card",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "image",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "renderText",
      "storageKey": null
    }
  ],
  "type": "Card",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'b56640801282bd5477029f92f09d1f92';

module.exports = node;
