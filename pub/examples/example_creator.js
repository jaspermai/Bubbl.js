/* Bubbl.js Library usage examples */

"use strict";

const vidCanvas2 = new VideoCanvas('block-creator');

vidCanvas2.addVideo('vid1', 'examples/vids-creator/youtube1.mp4', 'medium', 0.8);
vidCanvas2.addVideo('vid2', 'examples/vids-creator/youtube2.mp4', 'small', 0.8);
vidCanvas2.addVideo('vid4', 'examples/vids-creator/youtube4.mp4', 'large', 0.7);
vidCanvas2.addVideo('vid3', 'examples/vids-creator/youtube3.mp4');

vidCanvas2.videoLink('vid1', 'https://www.youtube.com/watch?v=KEZgBQI9U4g');
vidCanvas2.videoLink('vid2', 'https://www.youtube.com/watch?v=lvedfTwJCCU');
vidCanvas2.videoLink('vid4', 'https://www.youtube.com/watch?v=qPT-Y00_HlE');
vidCanvas2.videoLink('vid3', 'https://www.youtube.com/watch?v=9pWPK65e1EE');