import React from "react";
import { InputGroup, FormGroup, Button, Classes, Spinner } from "@blueprintjs/core";
import ExternalElementHelper from "../shared/ExternalElementHelper.js";

export default class AddExternalElementForm extends React.Component {

  _iframe;

  constructor(props) {
    super(props);
    // props.dispatcher
    this.state = {
      url: "",
      isWorking: false,
      lastError: null
    };
  }

  onUrlKeyDown = evt => {
    if (evt.key == "Enter") {
      evt.preventDefault();
      this.onInstallClick();
      return;
    }
  }

  onUrlChanged = evt => {
    this.setState({ url: evt.target.value });
  }

  onInstallClick = () => {

    this.props.onSetLock(true);
    this.setState({ isWorking: true });

    ExternalElementHelper.LoadFromUrl(this.state.url).then(externalElement => {
      this.props.dispatcher.Dispatch("ADD_EXTERNAL_ELEMENT", externalElement);
      this.props.onSetLock(false);
      this.setState({
        url: "",
        isWorking: false,
        lastError: null
      });
    })
    .catch(err => {
      this.props.onSetLock(false);
      this.setState({
        isWorking: false,
        lastError: err
      });
    });

  }

  render() {
    return (
      <div style={{ "width": "400px" }}>
        <p>
          <InputGroup value={this.state.url} onKeyDown={this.onUrlKeyDown} onChange={this.onUrlChanged} intent={this.state.lastError ? "warning" : "primary"} leftIcon="link" placeholder="URL" fill={true} rightElement={this.state.isWorking ? <Spinner size={Spinner.SIZE_SMALL} intent="primary" /> : null} />
        </p>
        {this.state.lastError ? <p className={Classes.INTENT_WARNING}>{this.state.lastError}</p> : null}
        <Button onClick={this.onInstallClick}>Install</Button>
      </div>
    );
  }
}