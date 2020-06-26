import React from 'react';
import PhotoThumbnails from './PhotoThumbnails';
import PhotoViewer from './PhotoViewer';

function App() {
    return (
        <div className="app mx-auto w-full text-indigo-900 pb-8 px-8">
            <header className="text-center app__header">
                <h1 className="text-2xl text-orange-500">
                    RandoPhoto Gallery
                </h1>
                <h2 className="md:w-1/2 mx-auto">
                    A React experiment by <a href="http://adamleis.com" className="app__link--mine">Adam Leis</a>
                </h2>
            </header>

            <main className="flex flex-wrap mt-4">
                <PhotoViewer />
                <PhotoThumbnails
                    className="w-full"
                    count="2"
                />
                {/* TODO adjust count again & make random */}
                {/* TODO add pagination */}
            </main>

            <footer className="text-center fixed bottom-0 w-full bg-gray-300 left-0 bottom-0 border-t border-gray-500 py-1">
                <small>
                    Photo API by <a href="https://picsum.photos" className="app__link--picsum">Picsum API</a> &amp;
                    photos by <a href="https://unsplash.com" className="app__link--unsplash">Unsplash.com</a>.
                    All photo credit is attributed to the photographers via Unsplash.
                </small>
            </footer>
        </div>
    );
}

export default App;
