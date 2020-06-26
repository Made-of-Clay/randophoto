import React from 'react';
import { connect } from 'react-redux';
import PhotoLoader from '../PhotoLoader';

const makeGolden = num => Math.floor(num * 1.618);
const to75Percent = num => Math.floor(num * 0.75);
const baseElemClass = 'photoViewer';

class PhotoViewer extends React.Component {
    static defaultProps = {
        className: ''
    }

    get imgDimensions() {
        const { innerWidth, innerHeight } = window;
        const isLandscape = innerWidth > innerHeight;
        let height, width;
        if (isLandscape) {
            height = to75Percent(window.innerHeight);
            width = makeGolden(height);
        } else {
            width = to75Percent(window.innerWidth);
            height = makeGolden(width);
        }

        return { height, width };
    }
    get focusedPhoto() { // fast enough it doesn't matter that this re-runs
        return this.props.photos.find(photo => photo.id === this.props.focusedPhoto);
    }
    get unsplashIcon() {
        return (
            <svg
                viewBox="0 0 32 32"
                width="32"
                height="32"
                fill="white"
                transform="scale(0.4)"
                className="inline-block -mr-2"
            >
                <title id="unsplash-home">Unsplash Home</title>
                <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
            </svg>
        );
    }

    hideOverlay(event) {
        if (event
            && event.target
            && event.target.classList instanceof DOMTokenList
            && event.target.classList.contains(baseElemClass)) {
            this.props.focusPhoto({ photoID: null });
        }
    }

    /*
    Hypothetical note: if imgs load too slowly, some tricky something could be set up to load the img the first time
    and swap the img out for a new element. The swapped img would have opacity:0 (display:none would
    produce the same problem as swapping src). Might also need position:absolute for hidden images to ignore their layout
    effects. This would only be necessary if (1) loading was too slow from server issues or connectivity or (2) some loading
    msg could not be successfully produced due to weirdness of rerender loops (img.onLoad setting state triggers src change)
    */
    render() {
        let photo, author, url;
        if (this.focusedPhoto) {
            author = this.focusedPhoto.author;
            url = this.focusedPhoto.url;
            const { id } = this.focusedPhoto;
            const { width, height } = this.imgDimensions;
            const imgSrc = `https://picsum.photos/id/${id}/${width}/${height}`;
            const imgStyles = {
                // https://bit.ly/enYi6l
                // backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGUlEQVQYV2NkYGD4z8DAwMiABFA4MHEKBQFmoAEGlW1mUAAAAABJRU5ErkJggg==)',
                height,
                width,
            };
            photo = (
                <img
                   src={imgSrc}
                   alt={`ID ${id} by ${author}`}
                   className="relative"
                   style={imgStyles}
                />
            );
        } else {
            photo = <span />;
        }

        const display = this.focusedPhoto ? 'fixed' : 'hidden';
        const classes = [
            baseElemClass,
            `${display} left-0 top-0 z-10 w-full h-full`,
            'bg-black bg-opacity-75', // keep bg-black since opacity only affects opacity, not color too (duh)
            'flex flex-col items-center justify-center',
            this.props.className,
        ];
        return (
            <figure className={classes.join(' ')} onClick={event => this.hideOverlay(event)}>
                <div className="flex items-center justify-center">
                    <PhotoLoader className="absolute" />
                    {photo}
                </div>
                <figcaption className="block m-4 text-center">
                    <div className="text-indigo-200">Photo by {author}</div>
                    <a href={url} className="text-blue-300">
                        {this.unsplashIcon} Go to Unsplash
                    </a>
                </figcaption>
            </figure>
        );
    }
}

const mapStateToProps = state => {
    return {
        photos: state.photos,
        focusedPhoto: state.focusedPhoto,
    };
};

const mapDispatchToProps = dispatch => ({
    focusPhoto: photoID => {
        dispatch({ type: 'FOCUS_PHOTO', photoID });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewer);
