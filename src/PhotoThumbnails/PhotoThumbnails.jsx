import React from 'react';
import { connect } from 'react-redux';

const thumbY = 200;
const thumbX = Math.floor(thumbY * 1.618);

class PhotoThumbnails extends React.Component {
    static defaultProps = {
        count: 10
    }

    componentDidMount() {
        const limit = this.props.count;
        fetch(`https://picsum.photos/v2/list?limit=${limit}`)
            .then(response => response.json())
            .then(photos => this.props.updatePhotos(photos))
        ;
    }

    createThumbs(thumbFunc) {
        const scaleClasses = 'transform transition-all duration-300 hover:scale-105';
        return this.props.photos.map(photo => {
            const photoSelected = this.props.focusedPhoto === photo.id;
            const borderClasses = ([
                'border-4',
                photoSelected ? 'border-orange-500' : 'border-transparent'
            ]).join(' ');
            const bgClasses = photoSelected ? 'bg-orange-400' : 'bg-gray-200';
            const imgSrc = `https://picsum.photos/id/${photo.id}/${thumbX}/${thumbY}`;
            const classes = `rounded-lg shadow-md p-1 m-2 cursor-pointer ${scaleClasses} ${borderClasses} ${bgClasses}`;
            return thumbFunc(photo, { imgSrc, classes });
        });
    }

    render() {
        return (
            <div className={`photoThumbnails flex flex-wrap ${this.props.className}`}>
                {this.createThumbs((photo, { imgSrc, classes }) => (
                    <figure
                        key={`key-${photo.id}`}
                        className={classes}
                        onClick={() => this.props.focusPhoto(photo.id)}
                    >
                        <img
                            src={imgSrc}
                            alt=""
                            className="rounded-lg"
                        />
                        <figcaption className="text-center">
                            Photographer: {photo.author}
                        </figcaption>
                    </figure>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    photos: state.photos,
    focusedPhoto: state.focusedPhoto,
});

const mapDispatchToProps = dispatch => ({
    updatePhotos: photos => {
        dispatch({ type: 'UPDATE_PHOTOS', photos });
    },
    focusPhoto: photoID => {
        dispatch({ type: 'FOCUS_PHOTO', photoID });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoThumbnails);