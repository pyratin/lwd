/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DeckNode_deck$ref: FragmentReference;
declare export opaque type DeckNode_deck$fragmentType: DeckNode_deck$ref;
export type DeckNode_deck = {|
  +id: ?string,
  +cards: ?$ReadOnlyArray<?{|
    +renderText: ?string
  |}>,
  +$refType: DeckNode_deck$ref,
|};
export type DeckNode_deck$data = DeckNode_deck;
export type DeckNode_deck$key = {
  +$data?: DeckNode_deck$data,
  +$fragmentRefs: DeckNode_deck$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeckNode_deck",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Card",
      "kind": "LinkedField",
      "name": "cards",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "renderText",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Deck",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'c3b825feac07a911456e3ad431278e62';

module.exports = node;
