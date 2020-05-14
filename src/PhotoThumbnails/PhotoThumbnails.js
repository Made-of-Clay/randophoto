import React from 'react';
import { connect } from 'react-redux';

class PhotoThumbnails extends React.Component {
    componentDidMount() {
        fetch('https://picsum.photos/v2/list')
            .then(response => response.json())
            .then(photos => this.props.updatePhotos(photos))
        ;
    }

    createThumbs(count = 10) {
        count = Number(count);
        // TODO add click event to update state of focused image (by specifying index?)
        return this.props.photos.map((photo) =>
            <img
                key={`key-${photo.id}`}
                src={`https://picsum.photos/id/${photo.id}/100/100`}
                alt=""
                className="m-2 inline-block photoThumbnails__thumbnail cursor-pointer"
            />
        );
    }

    render() {
        return <div className={`photoThumbnails ${this.props.className}`}>
            {this.createThumbs(this.props.count)}
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        photos: state.photos,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePhotos: photos => {
            dispatch({ type: 'UPDATE_PHOTOS', photos })
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoThumbnails);