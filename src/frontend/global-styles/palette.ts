/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const white = '#ffffff';
const gray0 = '#f8f9fa';
const gray1 = '#f1f3f5';
const gray2 = '#e9ecef';
const gray3 = '#dee2e6';
const gray4 = '#ced4da';
const gray5 = '#adb5bd';
const gray6 = '#868e96';
const gray7 = '#495057';
const gray8 = '#343a40';
const gray9 = '#212529';

const red0 = '#fff5f5';
const red1 = '#ffe3e3';
const red2 = '#ffc9c9';
const red3 = '#ffa8a8';
const red4 = '#ff8787';
const red5 = '#ff6b6b';
const red6 = '#fa5252';
const red7 = '#f03e3e';
const red8 = '#e03131';
const red9 = '#c92a2a';

const pink0 = '#fff0f6';
const pink1 = '#ffdeeb';
const pink2 = '#fcc2d7';
const pink3 = '#faa2c1';
const pink4 = '#f783ac';
const pink5 = '#f06595';
const pink6 = '#e64980';
const pink7 = '#d6336c';
const pink8 = '#c2255c';
const pink9 = '#a61e4d';

const grape0 = '#f8f0fc';
const grape1 = '#f3d9fa';
const grape2 = '#eebefa';
const grape3 = '#e599f7';
const grape4 = '#da77f2';
const grape5 = '#cc5de8';
const grape6 = '#be4bdb';
const grape7 = '#ae3ec9';
const grape8 = '#9c36b5';
const grape9 = '#862e9c';

const violet0 = '#f3f0ff';
const violet1 = '#e5dbff';
const violet2 = '#d0bfff';
const violet3 = '#b197fc';
const violet4 = '#9775fa';
const violet5 = '#845ef7';
const violet6 = '#7950f2';
const violet7 = '#7048e8';
const violet8 = '#6741d9';
const violet9 = '#5f3dc4';

const indigo0 = '#edf2ff';
const indigo1 = '#dbe4ff';
const indigo2 = '#bac8ff';
const indigo3 = '#91a7ff';
const indigo4 = '#748ffc';
const indigo5 = '#5c7cfa';
const indigo6 = '#4c6ef5';
const indigo7 = '#4263eb';
const indigo8 = '#3b5bdb';
const indigo9 = '#364fc7';
const indigo10 = '#2A2E3F';
const indigo11 = '#1930a0';
const indigo12 = '#1D202E';

const blue0 = '#e8f7ff';
const blue1 = '#ccedff';
const blue2 = '#a3daff';
const blue3 = '#72c3fc';
const blue4 = '#4dadf7';
const blue5 = '#329af0';
const blue6 = '#228ae6';
const blue7 = '#1c7cd6';
const blue8 = '#1b6ec2';
const blue9 = '#1862ab';

const cyan0 = '#e3fafc';
const cyan1 = '#c5f6fa';
const cyan2 = '#99e9f2';
const cyan3 = '#66d9e8';
const cyan4 = '#3bc9db';
const cyan5 = '#22b8cf';
const cyan6 = '#15aabf';
const cyan7 = '#1098ad';
const cyan8 = '#0c8599';
const cyan9 = '#0b7285';

const teal0 = '#e6fcf5';
const teal1 = '#c3fae8';
const teal2 = '#96f2d7';
const teal3 = '#63e6be';
const teal4 = '#38d9a9';
const teal5 = '#20c997';
const teal6 = '#12b886';
const teal7 = '#0ca678';
const teal8 = '#099268';
const teal9 = '#087f5b';

const acid3 = '#00FE82';

const green0 = '#ebfbee';
const green1 = '#d3f9d8';
const green2 = '#b2f2bb';
const green3 = '#8ce99a';
const green4 = '#69db7c';
const green5 = '#51cf66';
const green6 = '#40c057';
const green7 = '#37b24d';
const green8 = '#2f9e44';
const green9 = '#2b8a3e';

const lime0 = '#f4fce3';
const lime1 = '#e9fac8';
const lime2 = '#d8f5a2';
const lime3 = '#c0eb75';
const lime4 = '#a9e34b';
const lime5 = '#94d82d';
const lime6 = '#82c91e';
const lime7 = '#74b816';
const lime8 = '#66a80f';
const lime9 = '#5c940d';

const yellow0 = '#fff9db';
const yellow1 = '#fff3bf';
const yellow2 = '#ffec99';
const yellow3 = '#ffe066';
const yellow4 = '#ffd43b';
const yellow5 = '#fcc419';
const yellow6 = '#fab005';
const yellow7 = '#f59f00';
const yellow8 = '#f08c00';
const yellow9 = '#e67700';

const orange0 = '#fff4e6';
const orange1 = '#ffe8cc';
const orange2 = '#ffd8a8';
const orange3 = '#ffc078';
const orange4 = '#ffa94d';
const orange5 = '#ff922b';
const orange6 = '#fd7e14';
const orange7 = '#f76707';
const orange8 = '#e8590c';
const orange9 = '#d9480f';

export const Palette = {
  backgroundBrandWeakest: indigo1,
  backgroundBrandWeaker: indigo3,
  backgroundBrandWeak: indigo6,
  backgroundBrand: indigo8,
  backgroundBrandStrong: indigo9,
  backgroundBrandStronger: indigo10,

  backgroundVoidWeak: gray1,
  backgroundVoid: gray2,
  backgroundVoidStrong: gray4,
  backgroundVoidStronger: gray6,

  backgroundTextWeak: gray1,
  backgroundTextWeakStrong: gray5,
  backgroundText: white,
  backgroundTextSelection: indigo3,
  backgroundTextBrand: indigo0,
  backgroundTextHacker: indigo10,

  backgroundCTA: teal6,
  backgroundWarningAction: yellow6,
  backgroundHackerVoid: indigo12,

  foregroundCTA: teal5,
  foregroundBrand: white,
  foregroundNeutral: gray6,

  transparencyDarkWeak: '#00000020',
  transparencyDark: '#00000033',
  transparencyDarkStrong: '#00000066',

  textVeryWeak: gray5,
  textWeak: gray7,
  text: gray9,
  textBrand: indigo8,
  textPositive: teal5,
  textNegative: red6,
  textHacker: teal3,

  colors: {
    white,
    gray0,
    gray1,
    gray2,
    gray3,
    gray4,
    gray5,
    gray6,
    gray7,
    gray8,
    gray9,

    red0,
    red1,
    red2,
    red3,
    red4,
    red5,
    red6,
    red7,
    red8,
    red9,

    pink0,
    pink1,
    pink2,
    pink3,
    pink4,
    pink5,
    pink6,
    pink7,
    pink8,
    pink9,

    grape0,
    grape1,
    grape2,
    grape3,
    grape4,
    grape5,
    grape6,
    grape7,
    grape8,
    grape9,

    violet0,
    violet1,
    violet2,
    violet3,
    violet4,
    violet5,
    violet6,
    violet7,
    violet8,
    violet9,

    indigo0,
    indigo1,
    indigo2,
    indigo3,
    indigo4,
    indigo5,
    indigo6,
    indigo7,
    indigo8,
    indigo9,
    indigo10,
    indigo11,
    indigo12,

    blue0,
    blue1,
    blue2,
    blue3,
    blue4,
    blue5,
    blue6,
    blue7,
    blue8,
    blue9,

    cyan0,
    cyan1,
    cyan2,
    cyan3,
    cyan4,
    cyan5,
    cyan6,
    cyan7,
    cyan8,
    cyan9,

    teal0,
    teal1,
    teal2,
    teal3,
    teal4,
    teal5,
    teal6,
    teal7,
    teal8,
    teal9,

    acid3,

    green0,
    green1,
    green2,
    green3,
    green4,
    green5,
    green6,
    green7,
    green8,
    green9,

    lime0,
    lime1,
    lime2,
    lime3,
    lime4,
    lime5,
    lime6,
    lime7,
    lime8,
    lime9,

    yellow0,
    yellow1,
    yellow2,
    yellow3,
    yellow4,
    yellow5,
    yellow6,
    yellow7,
    yellow8,
    yellow9,

    orange0,
    orange1,
    orange2,
    orange3,
    orange4,
    orange5,
    orange6,
    orange7,
    orange8,
    orange9,
  },
};
