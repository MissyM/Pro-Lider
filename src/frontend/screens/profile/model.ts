/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import xs, {Stream} from 'xstream';
import {
  SSBSource,
  GetReadable,
  ThreadAndExtras,
  AboutAndExtras,
} from '../../drivers/ssb';
import {Reducer} from '@cycle/state';
import {FeedId} from 'ssb-typescript';

export type Props = {
  selfFeedId: FeedId;
  feedId: FeedId;
};

export type State = {
  selfFeedId: FeedId;
  displayFeedId: FeedId;
  about: AboutAndExtras;
  getFeedReadable: GetReadable<ThreadAndExtras> | null;
  getSelfRootsReadable: GetReadable<ThreadAndExtras> | null;
  blockingSecretly: boolean;
};

export default function model(
  props$: Stream<Props>,
  ssbSource: SSBSource,
): Stream<Reducer<State>> {
  const propsReducer$ = props$.map(
    props =>
      function propsReducer(): State {
        return {
          selfFeedId: props.selfFeedId,
          displayFeedId: props.feedId,
          getFeedReadable: null,
          getSelfRootsReadable: null,
          about: {
            name: props.feedId,
            description: '',
            id: props.feedId,
          },
          blockingSecretly: false,
        };
      },
  );

  const about$ = props$
    .map(props => ssbSource.profileAboutLive$(props.feedId))
    .flatten();

  const updateAboutReducer$ = about$.map(
    about =>
      function updateAboutReducer(prev: State): State {
        return {...prev, about};
      },
  );

  const getFeedReadable$ = props$
    .map(props => ssbSource.profileFeed$(props.feedId))
    .flatten();

  const updateBlockingSecretlyReducer$ = props$
    .filter(props => props.feedId !== props.selfFeedId)
    .map(props => ssbSource.isPrivatelyBlocking$(props.feedId))
    .take(1)
    .flatten()
    .map(
      blockingSecretly =>
        function updateSecretlyBlockingReducer(prev: State): State {
          return {...prev, blockingSecretly};
        },
    );

  const updateFeedStreamReducer$ = getFeedReadable$.map(
    getFeedReadable =>
      function updateFeedStreamReducer(prev: State): State {
        return {...prev, getFeedReadable};
      },
  );

  const updateSelfRootsReducer$ = ssbSource.selfRoots$.map(
    getReadable =>
      function updateSelfRootsReducer(prev: State): State {
        return {...prev, getSelfRootsReadable: getReadable};
      },
  );

  return xs.merge(
    propsReducer$,
    updateAboutReducer$,
    updateFeedStreamReducer$,
    updateSelfRootsReducer$,
    updateBlockingSecretlyReducer$,
  );
}
