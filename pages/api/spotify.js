
export default async function handler(req, res) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  // Get access token from Spotify API
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Fetch currently playing track from Spotify API
  const trackResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (trackResponse.status === 204) {
    // No track playing
    return res.status(200).json({ message: "No track is playing." });
  }

  const trackData = await trackResponse.json();

  // Prepare the data to return to the frontend
  const track = {
    title: trackData.item.name,
    artist: trackData.item.artists.map((artist) => artist.name).join(", "),
    albumImageUrl: trackData.item.album.images[0].url,
    progress: (trackData.progress_ms / trackData.item.duration_ms) * 100,
    currentTime: formatTime(trackData.progress_ms),
    duration: formatTime(trackData.item.duration_ms),
    spotifyUrl: trackData.item.external_urls.spotify,
  };

  res.status(200).json(track);
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, "0")}`;
}
