window.Autobinder = new class {

    Bind = (configValues, parameters) => {
        for(let parameter of parameters) {
            if (parameter.autobind) {
                let parameterValue = configValues[parameter.name];
    
                // skip anything not in the parameter values
                if (parameterValue == undefined) { continue; }
    
                switch (parameter.type) {
                    case "style":
                        document.querySelectorAll(parameter.autobind).forEach(element => {
                            element.setAttribute("style", "");
                            for(let [key, value] of Object.entries(parameterValue)) {
                                element.style[key] = value;
                            }
                        });
                        break;
                    case "text":
                    case "textarea":
                    default:
                        document.querySelectorAll(parameter.autobind).forEach(element => element.innerHTML = parameterValue);
                        break;
                }
            }
        }
    }
}