/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import xs, {Stream} from 'xstream';
import {Reducer} from '@cycle/state';
import {About, FeedId} from 'ssb-typescript';
import {Image} from 'react-native-image-crop-picker';

export type Props = {
  about: About & {id: FeedId};
};

export type State = {
  about: About & {id: FeedId};
  newName?: string;
  newAvatar?: string;
  newDescription?: string;
};

export type Actions = {
  changeName$: Stream<string>;
  changeAvatar$: Stream<Image>;
  changeDescription$: Stream<string>;
};

export default function model(
  props$: Stream<Props>,
  actions: Actions,
): Stream<Reducer<State>> {
  const propsReducer$ = props$.map(
    props =>
      function propsReducer(): State {
        return {
          about: props.about,
        };
      },
  );

  const changeNameReducer$ = actions.changeName$.map(
    newName =>
      function changeNameReducer(prev: State): State {
        return {...prev, newName};
      },
  );

  const changeAvatarReducer$ = actions.changeAvatar$.map(
    image =>
      function changeDescriptionReducer(prev: State): State {
        return {...prev, newAvatar: image.path.replace('file://', '')};
      },
  );

  const changeDescriptionReducer$ = actions.changeDescription$.map(
    newDescription =>
      function changeDescriptionReducer(prev: State): State {
        return {...prev, newDescription};
      },
  );

  return xs.merge(
    propsReducer$,
    changeNameReducer$,
    changeAvatarReducer$,
    changeDescriptionReducer$,
  );
}
