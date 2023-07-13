import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Web5 } from '@tbd54566975/web5'

function App() {
  const [web5state, setWeb5state] = useState({})
    const [songs, setSongs] = useState([])
    useEffect(() => {

        const createWeb5 = async () => {
            const { web5, did: userDid } = await Web5.connect();
            setWeb5({web5, userDid})
            return web5
        }
        const web5 = createWeb5()
        const queryRecords = async () => {
            const { records } = await web5.dwn.records.query({
                message: {
                    filter: {
                        schema: 'https://schema.org/MusicRecording'
                    },
                    dateSort: 'createdAscending'
                }
            })
            console.log('records', records)
            const newSongs = []
            for(let record of records) {
                const data = await record.data.json();
                const song = { record, data, id: record.id };
                newSongs.push(song);
            }
            setSongs(newSongs)
        }
        queryRecords()
    }, [web5state, songs])

  return (
<>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <h1 className="text-2xl font-bold">Welcome to Web5</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="song1" className="text-sm font-medium">Favorite Song 1:</label>
                        <input type="text" id="song1" name="song1" className="w-full p-2 border border-gray-300 rounded mt-1" />
                        <label htmlFor="artist1" className="text-sm font-medium">Artist 1:</label>
                        <input type="text" id="artist1" name="artist1" className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>

                    <div>
                        <label htmlFor="song2" className="text-sm font-medium">Favorite Song 2:</label>
                        <input type="text" id="song2" name="song2" className="w-full p-2 border border-gray-300 rounded mt-1" />
                        <label htmlFor="artist2" className="text-sm font-medium">Artist 2:</label>
                        <input type="text" id="artist2" name="artist2" className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>

                    <div>
                        <label htmlFor="song3" className="text-sm font-medium">Favorite Song 3:</label>
                        <input type="text" id="song3" name="song3" className="w-full p-2 border border-gray-300 rounded mt-1" />
                        <label htmlFor="artist3" className="text-sm font-medium">Artist 3:</label>
                        <input type="text" id="artist3" name="artist3" className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>

                    <input type="submit" value="Submit" className="w-full px-3 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none" />
                </form>
            </div>
        </div>
    </div>
</>
  )
}

export default App
