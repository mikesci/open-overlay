# Layer Configuration Options

OpenOverlay supports the following types of layers with the specified `config` objects.
These objects can be mutated via calls to the [`config`](/scripting-v1-ref#configconfiguration-object-layer) method.

# `Audio`
```javascript
{
    url: "asset:test.mp3"; // URL referencing the audio file. Must have MIME type audio/*.
    volume: 100; // volume percentage - 100 is source volume, 0 is muted.
    playing: true; // represents if the audio is playing or is paused.
    loop: false; // whether or not the track should loop when complete.    
}
```

# `Iframe`
```javascript
{
    url: "http://openoverlay.org/" // iframe URL
}
```

# `Image`
```javascript
    url: "asset:image.png" // image URL
```

# `Rectangle`
The rectangle element has no configuration parameters.

# `Text`
```javascript
{
    text: "Hello World!" // the text to display
}
```

# `Video`
```javascript
    url: "asset:test.mp4"; // URL referencing the video file. Must have MIME type video/*.
    volume: 100; // volume percentage - 100 is source volume, 0 is muted.
    playing: true; // represents if the audio is playing or is paused.
    loop: false; // whether or not the track should loop when complete.
```
If the provided `url` is a YouTube video, the YouTube player will be embedded
as an iframe into the overlay. Otherwise, the HTML5 video element is used.