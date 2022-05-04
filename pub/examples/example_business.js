/* Bubbl.js Library usage examples */

"use strict";

const vidCanvas = new VideoCanvas('block-business', undefined, undefined, undefined, undefined);

vidCanvas.addVideo('iphone13', 'examples/vids-business/iphone13.mp4', 'large', 0.8);
vidCanvas.addVideo('ipadair', 'examples/vids-business/ipadair.mp4', 'medium', 0.8);
vidCanvas.addVideo('galaxys22', 'examples/vids-business/galaxys22.mp4', 'large', 0.7);
vidCanvas.addVideo('galaxybuds', 'examples/vids-business/galaxybuds.mp4', 'small');
vidCanvas.addVideo('surface', 'examples/vids-business/surface.mp4', 'large', 0.6); 

vidCanvas.videoLink('iphone13', 'https://www.apple.com/ca/iphone-13/');
vidCanvas.videoLink('ipadair', 'https://www.apple.com/ca/ipad-air/');
vidCanvas.videoLink('galaxys22', 'https://www.samsung.com/ca/smartphones/galaxy-s22/');
vidCanvas.videoLink('galaxybuds', 'https://www.samsung.com/ca/audio-sound/galaxy-buds/');
vidCanvas.videoLink('surface', 'https://www.microsoft.com/en-ca/surface');
