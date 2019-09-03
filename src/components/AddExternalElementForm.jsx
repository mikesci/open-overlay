import React from "react";
import { InputGroup, FormGroup, Button, Classes, Spinner } from "@blueprintjs/core";
import "./AddExternalElementForm.css";

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

    this.props.dispatcher.Dispatch("ADD_EXTERNAL_ELEMENT",
      this.state.url,
      () => { // success
        this.props.onSetLock(false);
        this.setState({
          url: "",
          isWorking: false,
          lastError: null
        });
      },
      (errorMessage) => { // error
        this.props.onSetLock(false);
        this.setState({
          isWorking: false,
          lastError: errorMessage
        });
      });
  }

  render() {
    return (
      <div className="external-element-form">
        <InputGroup className="url-input" value={this.state.url} onKeyDown={this.onUrlKeyDown} onChange={this.onUrlChanged} intent={this.state.lastError ? "warning" : "primary"} leftIcon="link" placeholder="URL" fill={true} rightElement={this.state.isWorking ? <Spinner size={Spinner.SIZE_SMALL} intent="primary" /> : null} />
        {this.state.lastError ? <p className={Classes.INTENT_WARNING}>{this.state.lastError.toString()}</p> : null}
        <Button onClick={this.onInstallClick}>Install</Button>
      </div>
    );
  }
}