import React from 'react';
import PhotoThumbnails from './PhotoThumbnails';
import PhotoViewer from './PhotoViewer';

function App() {
    return (
        <main className="app w-full max-w-screen-md mx-auto">
            <header className="text-center app__header">
                <h1 className="text-2xl">RandoPhoto Gallery</h1>
                <h2 className="md:w-1/2 mx-auto">
                    A React experiment by <a href="http://adamleis.com" className="app__link--mine">Adam Leis</a>
                </h2>
            </header>

            <div className="flex flex-wrap mt-4">
                <PhotoViewer className="bg-gray-400 p-3 w-full sm:w-1/2 mx-auto" />
                <PhotoThumbnails className="w-full md:w-1/2 md:max-h-3/4-screen overflow-y-scroll border border-gray-400" count="5" />
            </div>

            <footer className="text-center fixed bottom-0 w-full bg-gray-300 left-0 bottom-0 border-t border-gray-500 py-1">
                <small>
                    Photo API by <a href="https://picsum.photos" className="app__link--picsum">Picsum API</a> &amp;
                    photos by <a href="https://unsplash.com" className="app__link--unsplash">Unsplash.com</a>.
                    All photo credit is attributed to the photographers via Unsplash.
                </small>
            </footer>
        </main>
    );
}

export default App;
