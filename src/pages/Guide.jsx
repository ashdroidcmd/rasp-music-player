import React from "react";

const Guide = () => {
  return (
    <div className="h-dvh bg-neutral-950 text-white">
      <div className="mx-auto max-w-2xl p-5">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#1ED760]">
          How To Use
        </h1>

        <div className="space-y-4 text-base leading-relaxed">
          <p>
            <strong>Step 1: Upload MP3 to Dropbox</strong>
            <br />
            Go to{" "}
            <a
              href="https://www.dropbox.com"
              className="text-[#1ED760] underline"
              target="_blank"
              rel="noreferrer"
            >
              Dropbox
            </a>{" "}
            and upload your MP3 file.
          </p>

          <p>
            <strong>Step 2: Copy the Share Link</strong>
            <br />
            After uploading, click “Share” → “Create Link” → “Copy Link”.
          </p>

          <p>
            <strong>Step 3: Convert Link for Direct Play</strong>
            <br />
            Modify the copied link:
            <br />
            <code className="mt-1 block rounded bg-neutral-800 p-2">
              From: https://www.dropbox.com/s/abc123/song.mp3?dl=0 <br />
              To: https://www.dropbox.com/s/abc123/song.mp3?raw=1
            </code>
          </p>

          <p>
            <strong>
              Step 4: Edit <code>Audio.json</code>
            </strong>
            <br />
            Add a new object like this:
            <pre className="overflow-x-auto rounded bg-neutral-800 p-3 text-sm">
              {`{
  "id": 3,
  "title": "Your Song Title",
  "src": "https://www.dropbox.com/s/abc123/song.mp3?raw=1"
}`}
            </pre>
            Make sure the `id` is unique and `src` is the modified Dropbox link.
          </p>

          <p>
            <strong>That’s it!</strong>
            <br />
            Your song will now show up in the music player.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
