import videoData from '../data/videos.json';

export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = `youtube.googleapis.com/youtube/v3`;

  try {
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data?.error) {
      console.error('Youtube API error', data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;

      return {
        id,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
      };
    });
  } catch (e) {
    console.error('Something went wrong with video library', e);
    return [];
  }
};

export const getVideos = async (searchQuery) => {
  const URL = `search?part=snippet&type=video&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = async () => {
  const URL = 'videos?part=snippet&chart=mostPopular&regionCode=US';
  return getCommonVideos(URL);
};
