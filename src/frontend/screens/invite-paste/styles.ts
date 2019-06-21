/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {StyleSheet} from 'react-native';
import {Palette} from '../../global-styles/palette';
import {Dimensions} from '../../global-styles/dimens';
import {Typography} from '../../global-styles/typography';

export const navigatorStyle = {
  statusBarColor: Palette.backgroundBrandStrong,
  navBarBackgroundColor: Palette.backgroundBrand,
  navBarTextColor: Palette.foregroundBrand,
  navBarTextFontSize: Typography.fontSizeLarge,
  navBarTextFontFamily: Typography.fontFamilyReadableText,
  navBarButtonColor: Palette.foregroundBrand,
  topBarElevationShadowEnabled: false,
  navBarTextFontBold: true,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
  },

  bodyContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor: Palette.backgroundText,
    paddingHorizontal: Dimensions.horizontalSpaceBig,
  },

  contentInput: {
    flex: 1,
    paddingBottom: 0,
    paddingHorizontal: Dimensions.horizontalSpaceSmall,
    paddingTop: Dimensions.verticalSpaceBig,
    alignSelf: 'stretch',
    fontSize: Typography.fontSizeLarge,
    fontFamily: Typography.fontFamilyMonospace,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: Palette.text,
  },
});
