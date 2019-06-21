/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import xs, {Stream} from 'xstream';
import {ReactSource} from '@cycle/react';
import {h} from '@cycle/react';
import {Text, View, StyleSheet} from 'react-native';
import {Palette} from '../../../global-styles/palette';
import {Dimensions} from '../../../global-styles/dimens';
import HeaderBackButton from '../../../components/HeaderBackButton';
import {ReactElement} from 'react';
import {Typography} from '../../../global-styles/typography';

export type Sources = {
  screen: ReactSource;
};

export type Sinks = {
  screen: Stream<ReactElement<any>>;
  back: Stream<any>;
};

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.toolbarAndroidHeight,
    alignSelf: 'stretch',
    backgroundColor: Palette.backgroundBrand,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Dimensions.horizontalSpaceBig,
  },

  title: {
    marginLeft: Dimensions.horizontalSpaceBig,
    fontFamily: Typography.fontFamilyReadableText,
    color: Palette.foregroundBrand,
    fontSize: Typography.fontSizeLarge,
    fontWeight: 'bold',
  },
});

export function topBar(sources: Sources): Sinks {
  const vdom$ = xs.of(
    h(View, {style: styles.container}, [
      HeaderBackButton('profileBackButton'),
      h(Text, {style: styles.title}, 'Edit profile'),
    ]),
  );

  const back$ = sources.screen.select('profileBackButton').events('press');

  return {
    screen: vdom$,
    back: back$,
  };
}
