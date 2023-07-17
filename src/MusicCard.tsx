import React, { useEffect, useState } from 'react';
import { z } from 'zod';

// Define the schema for the component props
const MusicCardProps = z.object({
  data: z.object({
    '@context': z.string(),
    '@type': z.string(),
    name: z.string(),
    byArtist: z.object({
      '@type': z.string(),
      name: z.string(),
    }),
  }),
  id: z.string(),
});

const STOCK_IMAGE_BASE64 = 'data:image/png;base64,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'

function MusicCard({ data, id }) {
  // Validate the props
  const { success } = MusicCardProps.safeParse({ data, id })

  // Schema doesn't match, don't render
  if(!success) {
    return null;
  }
  // initalize with placeholder image
  const [imageUrl, setImageUrl] = useState(STOCK_IMAGE_BASE64);
  useEffect(() => {
    const fetchImage = async (song, name) => {
      // try to find official cover art
      try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${import.meta.env.VITE_AUDIO_API_KEY}&artist=${name}&track=${song}&autocorrect=1&format=json`);
        const data = await response.json()
        const coverArtUrl = data?.track?.album?.image[2]['#text']
        if(coverArtUrl) {
            setImageUrl(coverArtUrl)
            return
        }
      } catch (error) {
          console.error('last fm didn\'t fetch image:', error)
      }
      const prompt = `Take your best attempt at coming up with a cool album cover art. Here's the song: ${song} by ${name}`
      // if we can't find official cover art, try to come up with a cool looking one from AI
      try {
          const response = await fetch('https://api.edenai.run/v2/image/generation', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_AUTH_BEARER}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            resolution: '512x512',
            providers: 'stabilityai',
            text: prompt,
            num_images: 1
          }),
        })
        if(!response.ok) {
            return
        }
        const data = await response.json();
        const imageResourceUrl = data?.stabilityai?.items[0]?.image_resource_url
            if(imageResourceUrl && imageUrl === STOCK_IMAGE_BASE64) {
                setImageUrl(imageResourceUrl)
            }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage(data.name, data.byArtist.name)
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={imageUrl} alt={data.name} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data.byArtist.name}</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{data.name}</h2>
        </div>
      </div>
    </div>
  );
}


export function MusicCards({ musicData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {musicData.map(item => (
        <MusicCard key={item.id} {...item} />
      ))}
    </div>
  );
}

