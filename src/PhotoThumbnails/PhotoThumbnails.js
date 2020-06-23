import React from 'react';
import { connect } from 'react-redux';

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

    createThumbs() {
        const scaleClasses = 'transform transition-all duration-300 hover:scale-105';
        return this.props.photos.map(photo => {
            const borderClasses = ([
                'border-4',
                this.props.focusedPhoto === photo.id ? 'border-orange-500' : 'border-transparent'
            ]).join(' ');
            return (
                <img
                    key={`key-${photo.id}`}
                    src={`https://picsum.photos/id/${photo.id}/100/100`}
                    alt=""
                    className={`photoThumbnails__thumbnail m-1 inline-block cursor-pointer ${scaleClasses} ${borderClasses}`}
                    onClick={() => this.props.focusPhoto(photo.id)}
                />
            );
        });
    }

    render() {
        return <div className={`photoThumbnails ${this.props.className}`}>
            {this.createThumbs(this.props.count)}
        </div>;
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