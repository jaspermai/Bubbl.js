# BUBBL.JS README.md
Landing Page for Bubbl.js: https://bubbljs.herokuapp.com/home.html

Bubbl is a JavaScript Library that packages videos into interactive bubbles that float on the screen. It allows for engaging viewing of promotional videos and allows for easy linking to external sites.

# Getting Started
## Installation
Install Bubbl.js by downloading the [**<ins>bubbl_library zip folder</ins>**](pub/assets/bubbl_library.zip). Make sure you are extracting all of its files into the same level directory (folder) as your html files very easy navigation. Inside this zip folder you will find:
- bubbl.js - the main JS file containing the object definitions and functions used for bubbl
- bubbl.css - the main CSS styling file for bubbl objects
- assets - a folder containing icons used by bubbl

## Integration
Bubbl.js uses the JavaScript language and the JQuery JS Library.  Add the following code snippet in the `head` tag of your html code to integrate Bubbl and JQuery into your app. _(note that the JQuery script comes before the Bubbl script for dependence reasons)_

```
script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script defer type="text/javascript" src='bubbl_library/bubbl.js'></script>
<link rel="stylesheet" type="text/css" href="bubbl_library/bubbl.css">
```

In your html file, you must use a script tag in order to call any JavaScript file that uses Bubbl.js and its functions. An example of the script tag is as follows.

```
<script defer type="text/javascript" src='examples/example.js'></script>
```

## Usage
The actual usage of Bubbl.js will be in a JavaScript file of your choosing. Here is a quick example that demonstrates the basic usages of Bubbl.js in an example JavaScript file.

```
const vidCanvas = new VideoCanvas('block-creator')

vidCanvas.addVideo('vid1', 'examples/vids-creator/youtube1.mp4', 'medium', 0.8)
vidCanvas.videoLink('vid1', 'https://www.youtube.com/watch?v=qPT-Y00_HlE')
```

### Looks like you’re all set! Check out the [<ins>home page</ins>](https://bubbljs.herokuapp.com/home.html) and [<ins>API documentation page</ins>](https://bubbljs.herokuapp.com/documentation.html) to see more of how you can utilize Bubbl.js. Have fun creating!
