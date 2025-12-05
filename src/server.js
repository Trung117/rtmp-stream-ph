const crypto = require('crypto');

// Polyfill for global.crypto in older Node.js versions
if (!global.crypto) {
    global.crypto = {};
}
if (!global.crypto.getRandomValues) {
    global.crypto.getRandomValues = (buffer) => {
        return crypto.randomFillSync(buffer);
    };
}

const NodeMediaServer = require('node-media-server');
const path = require('path');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*',
  },
  trans: {
    ffmpeg: 'ffmpeg', // Assumes ffmpeg is in the system PATH
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

const nms = new NodeMediaServer(config);
nms.run();

console.log('Node Media Server started');
console.log('RTMP Port: 1935');
console.log('HTTP Port: 8000');
console.log('RTMP Input: rtmp://localhost/live/STREAM_NAME');
console.log('HLS Output: http://localhost:8000/live/STREAM_NAME/index.m3u8');
