import { Component } from "react";

export default class OfflineCheck extends Component {
  constructor(props) {
    super(props);
    this.notified = false;
  }
  /**
   * Messages the client via Alert if his internet connection is not available.
   * Happens only once during time being offline, another alert happens only when
   * client goes online and then switches back offline
   */
  messageOnOffline() {
    if (!navigator.onLine && this.notified !== true) {
      alert(
        "It looks like you are not connected to the internet.\nNo worries, the game works offline just fine!"
      );
      this.notified = true;
    } else if (navigator.onLine) {
      this.notified = false;
    }
  }
  //check on pageload
  componentDidMount() {
    if (this.notified !== true) {
      this.messageOnOffline();
    }
    this.notified = true;
  }
  //check on pageUpdate
  componentDidUpdate() {
    this.messageOnOffline();
  }

  render() {
    return null;
  }
}
