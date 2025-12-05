# Node.js Local Livestream Server

This project is a simple local livestreaming server built with Node.js, `node-media-server`, and FFmpeg. It supports RTMP input (from software like OBS Studio) and outputs HLS (HTTP Live Streaming) playable in a web browser.

## Prerequisites

Before running this project, you must have the following installed on your machine:

1.  **Node.js**: [Download and Install Node.js](https://nodejs.org/) (Version 14+ recommended).
2.  **FFmpeg**: This is crucial for transcoding RTMP to HLS.
    *   **Windows**: [Download FFmpeg](https://ffmpeg.org/download.html), extract it, and add the `bin` folder to your System PATH environment variable.
    *   **macOS**: `brew install ffmpeg`
    *   **Linux**: `sudo apt install ffmpeg`
3.  **OBS Studio** (or any RTMP streaming software): [Download OBS Studio](https://obsproject.com/).

## Installation

1.  Clone this repository (if you haven't already).
2.  Open a terminal in the project directory.
3.  Install dependencies:

    ```bash
    npm install
    ```

## Usage

### 1. Start the Server

Run the following command to start the media server:

```bash
node src/server.js
```

You should see output indicating the Node Media Server has started:
- **RTMP Port**: 1935
- **HTTP Port**: 8000

### 2. Configure OBS Studio

1.  Open OBS Studio.
2.  Go to **Settings** > **Stream**.
3.  Set **Service** to `Custom`.
4.  Set **Server** to: `rtmp://localhost/live`
5.  Set **Stream Key** to: `stream` (or any name you prefer, but remember it).
6.  Click **OK**.
7.  Add a Source (e.g., "Window Capture" or "Video Capture Device") in the main OBS window.
8.  Click **Start Streaming**.

### 3. Play the Stream

1.  Open the `public/index.html` file in your browser. You can simply drag and drop the file into Chrome/Firefox, or serve it via a simple HTTP server (e.g., `npx serve public`).
2.  In the player input box, ensure the URL matches your stream key:
    - If your stream key was `stream`, the URL is:
      `http://localhost:8000/live/stream/index.m3u8`
3.  Click **Load Stream**.
4.  Wait a few seconds for HLS segments to generate. You can now use the seek bar, volume control, and play/pause buttons.

## Troubleshooting

*   **FFmpeg Error**: If the server logs show errors related to FFmpeg, ensure FFmpeg is installed and accessible globally via the command line (`ffmpeg -version`).
*   **Latency**: HLS has inherent latency (usually 10-30 seconds). This is normal.
*   **CORS**: The server is configured to allow all origins (`Access-Control-Allow-Origin: *`).

## Project Structure

*   `src/server.js`: The main server entry point configuring `node-media-server`.
*   `public/index.html`: The frontend video player using `hls.js`.
*   `media/`: The directory where HLS segments (.ts and .m3u8) are temporarily stored during streaming.
