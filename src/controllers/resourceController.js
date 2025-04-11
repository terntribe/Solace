const axios = require('axios');

const getArticles = async (req, res) => {
  try {
    // Use a helpful query if none is provided
    const query =
      req.query.q ||
      'how to improve mental health OR mental health tips OR stress management OR emotional wellbeing';

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        language: 'en',
        sortBy: 'relevancy',
        pageSize: 20,
        apiKey: process.env.NEWS_API_KEY
      }
    });

    const allowedSources = [
      'Psychology Today',
      'Healthline',
      'Verywell Mind',
      'Mindful',
      'Harvard Health',
      'WebMD',
      'NAMI',
      'The Guardian', 
      'Time' 
    ];

    const articles = response.data.articles
      .filter(article => {
        const title = article.title?.toLowerCase() || '';
        const description = article.description?.toLowerCase() || '';
        const sourceName = article.source?.name;

        // Keep articles that come from helpful sources or contain practical tips
        return (
          allowedSources.includes(sourceName) ||
          title.includes('tips') ||
          title.includes('how to') ||
          title.includes('habits') ||
          title.includes('ways to') ||
          description.includes('coping') ||
          description.includes('mental wellness')
        );
      })
      .map(article => ({
        type: 'article',
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name
      }));

    res.json({ articles });
  } catch (err) {
    console.error('NewsAPI Error:', err.message);
    res.status(500).json({ message: 'Error fetching helpful mental health articles', error: err.message });
  }
};


// Get Videos (YouTube API)
const getVideos = async (req, res) => {
  try {
    const query = req.query.q || 'mental health wellness';
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: query,
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet',
        maxResults: 10,
        type: 'video'
      }
    });

    const videos = response.data.items.map(item => ({
      type: 'video',
      title: item.snippet.title,
      description: item.snippet.description,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      channel: item.snippet.channelTitle
    }));

    res.json({ videos });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
};

// Get Podcasts (Listen Notes)
const getPodcasts = async (req, res) => {
  try {
    const query = req.query.q || 'mental health';
    const response = await axios.get('https://listen-api.listennotes.com/api/v2/search', {
      headers: {
        'X-ListenAPI-Key': process.env.LISTEN_NOTES_API_KEY
      },
      params: {
        q: query,
        type: 'episode',
        len_min: 10,
        sort_by_date: 1
      }
    });

    const podcasts = response.data.results.map(episode => ({
      type: 'podcast',
      title: episode.title_original,
      description: episode.description_original,
      audio: episode.audio,
      thumbnail: episode.thumbnail,
      podcastTitle: episode.podcast_title_original,
      publishedAt: episode.pub_date_ms
    }));

    res.json({ podcasts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching podcasts', error: err.message });
  }
};

module.exports = {
  getArticles,
  getVideos,
  getPodcasts
};
