import React from "react";
import { HTMLSelect } from "@blueprintjs/core";
import "./ZoomSelector.css";

export default class ZoomSelector extends React.Component {

  static ZOOM_AUTOFIT_VALUE = -9999;

  static ZOOM_OPTIONS = [
    { text: "Fit", value: this.ZOOM_AUTOFIT_VALUE, isAutoFit: true },
    { text: "100%", value: 1.0 },
    { text: "67%", value: 0.666666667 },
    { text: "50%", value: 0.5 },
    { text: "25%", value: 0.25 }
  ];

  constructor(props) {
    super(props);
    // props.zoom           - the current zoom percentage
    // props.autoFitZoom    - the amount to zoom to auto-fit
    // props.onZoomChanged  - called when the user changes the zoom from the dropdown
  }

  onZoomDropDownChanged = evt => {
    if (this.props.onZoomChanged) {
      let zoom = evt.target.value;
      this.props.onZoomChanged(zoom);
    }
  }

  render() {
    
    // show and select the custom option if the zoom isn't elsewhere in the option list
    let selectedValue = null;
    let zoomOptions = ZoomSelector.ZOOM_OPTIONS.map(r => {
      if (r.isAutoFit)
        return { label: `Fit (${Math.round(this.props.autoFitZoom * 100)}%)`, value: ZoomSelector.ZOOM_AUTOFIT_VALUE };
      else
        return { label: Math.round(r.value * 100) + "%", value: r.value };
    });

    let isCustomSelected = !(this.props.zoom == this.props.autoFitZoom || ZoomSelector.ZOOM_OPTIONS.findIndex(r => r.value == this.props.zoom) > -1);
    if (isCustomSelected) {
        zoomOptions.unshift({ label: `Custom (${Math.round(this.props.zoom * 100)}%)`, value: this.props.zoom });
    }

    return (
      <div className="zoom-selector">
        <HTMLSelect onChange={this.onZoomDropDownChanged} options={zoomOptions} value={this.props.zoom} />
      </div>
    );
  }
}