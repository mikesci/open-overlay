export default {
    "main.js": "",
    "settings.json": "{\n  \"parameters\": [\n    { \"displayName\": \"Asset/Url\", \"name\": \"asseturl\", \"type\": \"assetUrl\", \"inline\": true },\n    { \"displayName\": \"Color\", \"name\": \"color\", \"type\": \"color\", \"inline\": true },\n    { \"displayName\": \"Text\", \"name\": \"text\", \"type\": \"textbox\", \"inline\": true },\n    { \"displayName\": \"Number\", \"name\": \"number\", \"type\": \"number\", \"inline\": true },\n    { \"displayName\": \"TextArea\", \"name\": \"textarea\", \"type\": \"textarea\", \"inline\": true },\n    { \"displayName\": \"Dropdown\", \"name\": \"dropdown\", \"type\": \"select\", \"inline\": true, \"options\": [\n      { \"label\": \"Option 1\", \"value\": \"option1\" },\n      { \"label\": \"Option 2\", \"value\": \"option2\" },\n      { \"label\": \"Option 3\", \"value\": \"option3\" }\n    ] },\n    { \"displayName\": \"Radio Group\", \"name\": \"radiogroup\", \"type\": \"radiogroup\", \"inline\": true, \"options\": [\n      { \"label\": \"Option 1\", \"value\": \"option1\" },\n      { \"label\": \"Option 2\", \"value\": \"option2\" },\n      { \"label\": \"Option 3\", \"value\": \"option3\" }\n    ] },\n    { \"displayName\": \"Button Group\", \"name\": \"buttongroup\", \"type\": \"buttongroup\", \"inline\": true, \"options\": [\n      { \"label\": \"Option 1\", \"value\": \"option1\" },\n      { \"label\": \"Option 2\", \"value\": \"option2\" },\n      { \"label\": \"Option 3\", \"value\": \"option3\" }\n    ] },\n    { \"displayName\": \"Slider\", \"name\": \"slider\", \"type\": \"slider\", \"inline\": true, \"min\": 100, \"max\": 200, \"step\": 20 },\n    { \"type\": \"group\", \"displayName\": \"Group Example\", \"items\": [\n          { \"displayName\": \"30%\", \"name\": \"grouptext30\", \"type\": \"text\", \"inline\": true, \"width\": 30 },\n          { \"displayName\": \"70%\", \"name\": \"grouptext70\", \"type\": \"text\", \"inline\": true, \"width\": 70 }\n    ]}\n  ],\n  \"initial\": {\n    \"asseturl\": \"asset:example.png\",\n    \"color\": \"#ff0000\",\n    \"text\": \"text\",\n    \"number\": 15,\n    \"textarea\": \"textarea\",\n    \"dropdown\": \"option2\",\n    \"radiogroup\": \"option3\",\n    \"buttongroup\": \"option1\",\n    \"slider\": 150,\n    \"grouptext30\": \"text\",\n    \"grouptext70\": \"text\"\n  }\n}"
}