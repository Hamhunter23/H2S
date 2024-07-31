import axios from 'axios';

const API_KEY = 'YOUR_YOUTUBE_API_KEY';

const getVideoDetails = async (videoIds: string[]): Promise<any[]> => {
    const ids = videoIds.join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${ids}&part=contentDetails&key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.items;
};

const parseDuration = (duration: string): number => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    return hours * 3600 + minutes * 60 + seconds;
};

const getTotalVideoLength = async (videoUrls: string[]): Promise<number> => {
    const videoIds = videoUrls.map(url => {
        if (url.includes('v=')) {
            return url.split('v=')[1];
        } else {
            const urlObj = new URL(url);
            return urlObj.pathname.slice(1);
        }
    });

    const videoDetails = await getVideoDetails(videoIds);
    const totalLength = videoDetails.reduce((sum, video) => {
        const duration = video.contentDetails.duration;
        return sum + parseDuration(duration);
    }, 0);

    return totalLength;
};

const videoUrls = [
    'https://www.youtube.com/watch?v=VIDEO_ID_1',
    'https://www.youtube.com/watch?v=VIDEO_ID_2',
    // Add more video URLs
];

getTotalVideoLength(videoUrls).then(totalLength => {
    console.log(`Total video length: ${totalLength} seconds`);
});