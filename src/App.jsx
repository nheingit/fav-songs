import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Web5 } from '@tbd54566975/web5'

async function queryRecords(web5) {
    try {
        const { records } = await web5.dwn.records.query({
            message: {
                filter: {
                    schema: 'https://schema.org/MusicRecording'
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
  const RecordData = {
    completed : false,
      records
  };

  try {
    // Create the record in DWN
    const { record } = await web5.dwn.records.create({
      data    : RecordData,
      message : {
        schema     : 'https://schema.org/MusicRecording',
        dataFormat : 'application/json'
      }
    });
    console.log('created record successfully: ', record)
  } catch(e) {
    console.warn(e)
  }
}

export default function App() {
  const [web5state, setWeb5state] = useState({})
  const [songs, setSongs] = useState([])
  useEffect(() => {
      const createWeb5 = async () => {
          const { web5, did: userDid } = await Web5.connect();
          setWeb5state({web5, userDid})
          let data = await queryRecords(web5)
          console.log(data)
      }
      createWeb5()
  }, [])

  const [inputValues, setInputValues] = useState({
    record1: { artist: '', song: '' },
    record2: { artist: '', song: '' },
    record3: { artist: '', song: '' },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const records = Object.values(inputValues);
    await addRecords(web5state.web5, records);
    setInputValues({
      record1: { artist: '', song: '' },
      record2: { artist: '', song: '' },
      record3: { artist: '', song: '' },
    });  // Clear the input fields
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
          </form>
        </div>
      </div>
    </div>
  )
}

