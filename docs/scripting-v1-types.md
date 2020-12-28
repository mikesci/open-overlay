# Type Definitions

In the case of more complex scripts, you might find yourself wanting to use an IDE. For this, we provide a TypeScript
definition file. In order to use this in your scripts, import it from the url https://raw.githubusercontent.com/mikesci/open-overlay/master/scriptingContext.d.ts.

### Example
Given a simple script like this:
```javascript
import "../scriptingContext"

console.log((<TextConfig>(layer("Text").config())).text); // print the text of the Text layer
layer("Text").config(({text: "Hello World!"})); // set the text of the Text layer
layer({}).style({ opacity: 0 }); // set the opacity of all layers to 0
```

Compilation with `tsc` gives the expected JavaScript:
```javascript
"use strict";
exports.__esModule = true;
require("../scriptingContext");
console.log((layer("Text").config()).text);
layer("Text").config(({ text: "Hello World!" }));
layer({}).style({ opacity: 0 });
```
In order to use this in OpenOverlay, all you need to do is delete the first three lines, which don't play nicely with the
sandbox environment.
