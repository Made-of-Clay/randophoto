import React from 'react';

class PhotoThumbnails extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    createThumbs(count = 10) {
        const thumbs = new Array(count).fill()
            .map((undef, index) =>
                <img
                    key={`key-${index}`}
                    src="http://picsum.photos/100/100"
                    alt="random pic"
                    className="m-3"
                />
            );
        return thumbs;
    }

    render() {
        return <div style={{border: '1px solid red'}}>
            {this.createThumbs()}
        </div>;
    }
}

export default PhotoThumbnails;