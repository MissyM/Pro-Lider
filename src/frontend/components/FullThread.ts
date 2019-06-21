/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {Stream, Subscription, Listener} from 'xstream';
import {Component, ReactElement} from 'react';
import {h} from '@cycle/react';
import {FeedId, Msg} from 'ssb-typescript';
import {ThreadAndExtras, MsgAndExtras} from '../drivers/ssb';
import Message from './messages/Message';
import PlaceholderMessage from './messages/PlaceholderMessage';

export type Props = {
  thread: ThreadAndExtras;
  publication$?: Stream<any> | null;
  selfFeedId: FeedId;
  onPressLike?: (ev: {msgKey: string; like: boolean}) => void;
  onPressAuthor?: (ev: {authorFeedId: FeedId}) => void;
  onPressEtc?: (msg: Msg) => void;
};

type State = {
  showPlaceholder: boolean;
};

export default class FullThread extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
    this.state = {showPlaceholder: false};
  }

  private subscription?: Subscription;

  public componentDidMount() {
    const {publication$} = this.props;
    if (publication$) {
      const listener = {next: this.onPublication.bind(this)};
      this.subscription = publication$.subscribe(listener as Listener<any>);
    }
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    const prevProps = this.props;
    if (nextProps.selfFeedId !== prevProps.selfFeedId) return true;
    if (nextProps.onPressAuthor !== prevProps.onPressAuthor) return true;
    if (nextProps.onPressEtc !== prevProps.onPressEtc) return true;
    if (nextProps.onPressLike !== prevProps.onPressLike) return true;
    if (nextProps.publication$ !== prevProps.publication$) return true;
    const prevMessages = prevProps.thread.messages;
    const nextMessages = nextProps.thread.messages;
    if (nextMessages.length !== prevMessages.length) return true;
    if (nextState.showPlaceholder !== this.state.showPlaceholder) return true;
    return false;
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    const prevMessages = prevProps.thread.messages;
    const nextMessages = this.props.thread.messages;
    if (nextMessages.length > prevMessages.length) {
      this.setState({showPlaceholder: false});
    }
  }

  public componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = void 0;
    }
  }

  private onPublication() {
    this.setState({showPlaceholder: true});
  }

  private renderMessage(msg: MsgAndExtras) {
    const {selfFeedId, onPressLike, onPressAuthor, onPressEtc} = this.props;
    return h(Message, {
      msg,
      ['key' as any]: msg.key,
      selfFeedId,
      onPressLike,
      onPressAuthor,
      onPressEtc,
    });
  }

  public render() {
    const thread = this.props.thread;
    if (!thread.messages || thread.messages.length <= 0) return [];
    const children: Array<ReactElement<any>> = thread.messages.map(
      this.renderMessage,
    );
    if (this.state.showPlaceholder) {
      children.push(h(PlaceholderMessage, {['key' as any]: 'placeholder'}));
    }
    return children;
  }
}
