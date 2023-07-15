import { useState, useEffect } from 'react'
import { Web5 } from '@tbd54566975/web5'
import { MusicCards } from './MusicCard.tsx'

const SCHEMA_URL = 'https://schema.org/MusicRecording'

async function queryRecords(web5) {
    try {
        const { records } = await web5.dwn.records.query({
            message: {
                filter: {
                    schema: SCHEMA_URL
                },
                dateSort: 'createdAscending'
            }
        })
        const newSongs = []
        for(let record of records) {
            const data = await record.data.json();
            const song = { record, data, id: record.id };
            newSongs.push(song);
        }
        return newSongs
    } catch(e) {
        console.warn(e)
    }
}

async function addRecords(web5, records) {
      const promises = records.map(async (record) => {
      if(record.song.length && record.artist.length) {
        try {
            const recordObj = {
              "@context": "https://schema.org",
              "@type": "MusicRecording",
              "name": record.song,
              "byArtist": {
                "@type": "MusicGroup",
                "name": record.artist
              }
            }
          // Create the record in DWN
          const { web5Record } = await web5.dwn.records.create({
            data    : recordObj,
            message : {
              schema: SCHEMA_URL,
              dataFormat : 'application/json'
            }
          });
          return web5Record;
        } catch(e) {
          console.warn(e)
        }
      }
      });

      await Promise.all(promises);
}

export default function App() {
  const [web5state, setWeb5state] = useState({})
  const [songs, setSongs] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
      const createWeb5 = async () => {
          try {
              const { web5, did: userDid } = await Web5.connect();
              setWeb5state({web5, userDid})
              let data = await queryRecords(web5)
              if(data.length === songs.length) return
              setSongs(data)
          } catch (e) {
              setError('Failed to fetch songs. Please try again later')
          }
      }
      createWeb5()
  }, [songs])

const initialState = {
  record1: { artist: '', song: '' },
  record2: { artist: '', song: '' },
  record3: { artist: '', song: '' },
};

// Load initial state from localStorage or use a default state
const [inputValues, setInputValues] = useState(
  () => JSON.parse(localStorage.getItem('records')) || initialState
);

useEffect(() => {
  // Save to localStorage whenever inputValues changes
  localStorage.setItem('records', JSON.stringify(inputValues));
}, [inputValues]);

const handleSubmit = async (event) => {
  event.preventDefault();
  const currSongsLength = songs.length
  const records = Object.values(inputValues);
  await addRecords(web5state.web5, records);
  const newSongs = await queryRecords(web5state.web5)
  setSongs(newSongs)
  setInputValues(initialState);  // Clear the input fields
}

const handleInputChange = (event) => {
  const idParts = event.target.id.split('_');
  const recordNumber = idParts[0];
  const key = idParts[1];
  setInputValues(prevState => ({
    ...prevState,
    [recordNumber]: {
      ...prevState[recordNumber],
      [key]: event.target.value
    }
  }));
}

const handleClearForm = () => {
  setInputValues(initialState);
}


  return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-bold">Welcome to Web5</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="record1_artist" className="text-sm font-medium">Artist 1:</label>
              <input id="record1_artist" type="text" onChange={handleInputChange} value={inputValues.record1.artist} className="w-full p-2 border border-gray-300 rounded mt-1" />
              <label htmlFor="record1_song" className="text-sm font-medium">Favorite Song 1:</label>
              <input id="record1_song" type="text" onChange={handleInputChange} value={inputValues.record1.song} className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>

            <div>
              <label htmlFor="record2_artist" className="text-sm font-medium">Artist 2:</label>
              <input id="record2_artist" type="text" onChange={handleInputChange} value={inputValues.record2.artist} className="w-full p-2 border border-gray-300 rounded mt-1" />
              <label htmlFor="record2_song" className="text-sm font-medium">Favorite Song 2:</label>
              <input id="record2_song" type="text" onChange={handleInputChange} value={inputValues.record2.song} className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>

            <div>
              <label htmlFor="record3_artist" className="text-sm font-medium">Artist 3:</label>
              <input id="record3_artist" type="text" onChange={handleInputChange} value={inputValues.record3.artist} className="w-full p-2 border border-gray-300 rounded mt-1" />
              <label htmlFor="record3_song" className="text-sm font-medium">Favorite Song 3:</label>
              <input id="record3_song" type="text" onChange={handleInputChange} value={inputValues.record3.song} className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>

            <button type="submit" className="w-full px-3 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">Submit</button>
            <button onClick={handleClearForm} className="w-full px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">Clear Inputs</button>
          </form>
        </div>
      </div>
      <MusicCards musicData={songs} />
    </div>
  )
}
