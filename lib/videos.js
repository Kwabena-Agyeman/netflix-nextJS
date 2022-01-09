/** @format */

import videoData from "../data/videos.json";

export const getCommonVideos = async (url) => {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=10&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.error({ ERROR: data.error });
      return [];
    }

    return data.items.map((item) => {
      const id = item.id?.videoId || item.id;
      const snippet = item.snippet;

      return {
        // title: item?.snippet?.title,
        // imgUrl: item?.snippet?.thumbnails?.high?.url,
        // id,
        title: snippet?.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getVideos = (searchQuery = "netflix") => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

  //videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
};
