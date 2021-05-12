"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// objects storage path
const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "..",
  "storage",
  "videos.json"
);

class LibraryDao {
  constructor(storagePath) {
    this.videoStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  // add video - accepts object as parameter
  async addVideo(video) {
    const videos = await this._loadAllVideos();

    if (this._isDuplicate(videos, video.code)) {
      const e = new Error(`Video with code '${video.code}' already exists.`);
      e.code = "DUPLICATE_CODE";
      throw e;
    }

    videos.push(video);

    try {
      await wf(this._getStorageLocation(), JSON.stringify(videos, null, 2));
      return { status: "OK", data: video };
    } catch (e) {
      return { status: "ERROR", error: e };
    }
  }

  // get video - accepts only video.code parameter
  async getVideo(code) {
    let videos = await this._loadAllVideos();

    const result = videos.find((b) => {
      return b.code === code;
    });

    return result;
  }

  async _loadAllVideos() {
    let videos;

    try {
      videos = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        videos = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return videos;
  }
  // update video - accepts object as parameter
  async updateVideo(video) {
    let videos = await this._loadAllVideos();

    let updatedVideo = videos.find((v) => {
      return v.code === video.code;
    });

    if (updatedVideo) {
      let index = videos.indexOf(updatedVideo);
      videos[index] = video;

      try {
        await wf(this._getStorageLocation(), JSON.stringify(videos, null, 2));
        return video;
      } catch (error) {
        const e = new Error(
          `Failed to update video with code ${video.code} in local storage.`
        );
        e.code = "VIDEO";
        throw e;
      }
    } else {
      new Error(`Video with code ${video.code} does not exist.`);
      e.code = "VIDEO";
      throw e;
    }
  }
  // delete video - accepts only video.code parameter
  async deleteVideo(videoCode) {
    const videos = await this._loadAllVideos();

    videos.forEach((video, i) => {
      if (video.code === videoCode) {
        videos.splice(i, 1);
      }
    });

    try {
      await wf(this._getStorageLocation(), JSON.stringify(videos, null, 2));
      return undefined;
    } catch (error) {
      const e = new Error(
        `Failed to delete video with id '${video}' in local storage.`
      );
      e.code = "VIDEO";
      throw e;
    }
  }
  // video list - accepts only video.name parameter
  async listVideos(name) {
    const videos = await this._loadAllVideos();
    let videoList = [];

    for (let code in videos) {
      if (
        !name ||
        videos[code].authorName.toLowerCase().includes(name.toLowerCase())
      ) {
        videoList.push(videos[code]);
      }
    }
    return videoList;
  }

  _isDuplicate(videos, code) {
    const result = videos.find((b) => {
      return b.code === code;
    });
    return result ? true : false;
  }

  _getStorageLocation() {
    return this.videoStoragePath;
  }
}

module.exports = LibraryDao;
