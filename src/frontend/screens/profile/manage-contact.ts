/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {Stream} from 'xstream';
import {DialogSource} from '../../drivers/dialogs';
import {Palette} from '../../global-styles/palette';
import {State} from './model';
import {Duration, Toast} from '../../drivers/toast';
import {FeedId} from 'ssb-typescript';

export type ManageChoiceId =
  | 'copy-id'
  | 'block'
  | 'block-secretly'
  | 'unblock'
  | 'unblock-secretly';

export type Sources = {
  feedId$: Stream<FeedId>;
  manageContact$: Stream<State>;
  dialog: DialogSource;
};

export type Sinks = {
  clipboard: Stream<string>;
  toast: Stream<Toast>;
  blockContact$: Stream<null>;
  blockSecretlyContact$: Stream<null>;
  unblockContact$: Stream<null>;
  unblockSecretlyContact$: Stream<null>;
};

function calculateRelationship(state: State) {
  type Relationship =
    | 'following'
    | 'neutral'
    | 'blocking-secretly'
    | 'blocking-publicly';

  const tristate = state.about.following;
  const relationship: Relationship =
    tristate === null || typeof tristate === 'undefined'
      ? 'neutral'
      : tristate === true
      ? 'following'
      : state.blockingSecretly
      ? 'blocking-secretly'
      : 'blocking-publicly';
  return relationship;
}

type Item = {id: ManageChoiceId; label: string};

export default function manageContact$(sources: Sources): Sinks {
  const manageContactChoice$ = sources.manageContact$
    .map(state => {
      const relationship = calculateRelationship(state);
      const items: Array<Item> = [];

      items.push({id: 'copy-id', label: 'Copy cypherlink'});
      if (relationship === 'neutral') {
        items.push({id: 'block', label: 'Block'});
        items.push({id: 'block-secretly', label: 'Block secretly'});
      } else if (relationship === 'following') {
        items.push({id: 'block', label: 'Block'});
      } else if (relationship === 'blocking-secretly') {
        items.push({id: 'unblock-secretly', label: 'Unblock secretly'});
      } else if (relationship === 'blocking-publicly') {
        items.push({id: 'unblock', label: 'Unblock'});
      }

      return sources.dialog
        .showPicker(undefined, undefined, {
          items,
          type: 'listPlain',
          contentColor: Palette.text,
          cancelable: true,
          positiveText: '',
          negativeText: '',
          neutralText: '',
        })
        .filter(res => res.action === 'actionSelect')
        .map((res: any) => ({id: res.selectedItem.id as ManageChoiceId}));
    })
    .flatten();

  const copyCypherlink$ = manageContactChoice$
    .filter(choice => choice.id === 'copy-id')
    .map(() => sources.feedId$.take(1))
    .flatten();

  const blockContact$ = manageContactChoice$
    .filter(choice => choice.id === 'block')
    .mapTo(null);

  const blockSecretlyContact$ = manageContactChoice$
    .filter(choice => choice.id === 'block-secretly')
    .mapTo(null);

  const unblockContact$ = manageContactChoice$
    .filter(choice => choice.id === 'unblock')
    .mapTo(null);

  const unblockSecretlyContact$ = manageContactChoice$
    .filter(choice => choice.id === 'unblock-secretly')
    .mapTo(null);

  const toast$ = copyCypherlink$.mapTo({
    type: 'show',
    message: 'Copied to clipboard',
    duration: Duration.SHORT,
  } as Toast);

  return {
    clipboard: copyCypherlink$,
    toast: toast$,
    blockContact$,
    blockSecretlyContact$,
    unblockContact$,
    unblockSecretlyContact$,
  };
}
