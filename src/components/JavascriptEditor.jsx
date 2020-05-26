import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';

export default class JavascriptEditor extends React.PureComponent {

    constructor(props) {
        super(props);   
    }

    render() {
        return (
            <Editor
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    overflow: "auto",
                    whiteSpace: "nowrap"
                }}
                {...this.props} />
        );
    }
  }