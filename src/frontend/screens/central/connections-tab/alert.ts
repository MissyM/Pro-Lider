/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import xs, {Stream} from 'xstream';
import {State} from './model';
import {Command as AlertCommand} from 'cycle-native-alert';

export type Actions = {
  showBluetoothHelp$: Stream<any>;
  showLANHelp$: Stream<any>;
  showDHTHelp$: Stream<any>;
  showPubHelp$: Stream<any>;
  infoClientDhtInvite$: Stream<any>;
  infoServerDhtInvite$: Stream<any>;
};

export default function alert(
  actions: Actions,
  state$: Stream<State>,
): Stream<AlertCommand> {
  return state$
    .map(state =>
      xs.merge(
        actions.showBluetoothHelp$.mapTo({
          title: 'Bluetooth',
          message:
            (state.bluetoothEnabled
              ? '(ENABLED)'
              : '(Turn on Bluetooth to use this)') +
            '\n\nDiscover users nearby and connect with them using Bluetooth.',
          buttons: [{text: 'OK', id: 'okay'}],
        }),
        actions.showLANHelp$.mapTo({
          title: 'Wi-Fi',
          message:
            (state.lanEnabled ? '(ENABLED)' : '(Turn on Wi-Fi to use this)') +
            '\n\nConnect with friends in the same Local Area Network, ' +
            'in other words, friends using the same Wi-Fi.',
          buttons: [{text: 'OK', id: 'okay'}],
        }),
        actions.showDHTHelp$.mapTo({
          title: 'Internet P2P',
          message:
            (state.internetEnabled ? '(ENABLED)' : '(Go online to use this)') +
            '\n\nConnect directly to friends currently online, ' +
            'using a peer-to-peer technology called "Distributed Hash Table".',
          buttons: [{text: 'OK', id: 'okay'}],
        }),
        actions.showPubHelp$.mapTo({
          title: 'Internet servers',
          message:
            (state.internetEnabled ? '(ENABLED)' : '(Go online to use this)') +
            '\n\nConnect to a so-called "Pub server" owned by some friend, ' +
            'containing the latest data from multiple accounts.',
          buttons: [{text: 'OK', id: 'okay'}],
        }),
        actions.infoClientDhtInvite$.mapTo({
          title: 'Connecting via internet P2P...',
          message:
            'Currently searching for online friend ' +
            'who generated this invite code, ' +
            'to establish a data connection with them.',
          buttons: [{text: 'OK', id: 'okay'}],
        }),
        actions.infoServerDhtInvite$.mapTo({
          title: 'Connecting via internet P2P...',
          message:
            'Currently waiting for online friend ' +
            'to claim this invite code and establish a data connection.',
          buttons: [{text: 'OK', id: 'okay'}],
        }),
      ),
    )
    .flatten();
}
