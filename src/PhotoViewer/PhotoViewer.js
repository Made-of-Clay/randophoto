import React from 'react';
import { connect } from 'react-redux';

class PhotoViewer extends React.Component {
    static defaultProps = {
        className: ''
    }

    get imgWidth() {
        return 500; // this will be dynamic eventually based on screensize/viewer size
    }
    get imgHeight() {
        if (!this.focusedPhoto) return 0;
        const {height, width} = this.focusedPhoto;
        return Math.floor((this.imgWidth * height) / width);
    }
    get focusedPhoto() { // fast enough it doesn't matter that this re-runs
        return this.props.photos.find(photo => photo.id === this.props.focusedPhoto);
    }

    /*
    Hypothetical note: if imgs load too slowly, some tricky something could be set up to load the img the first time
    and swap the img out for a new element. The swapped img would have opacity:0 (display:none would
    produce the same problem as swapping src). Might also need position:absolute for hidden images to ignore their layout
    effects. This would only be necessary if (1) loading was too slow from server issues or connectivity or (2) some loading
    msg could not be successfully produced due to weirdness of rerender loops (img.onLoad setting state triggers src change)
    */
    render() {
        let photo;
        if (this.focusedPhoto) {
            const {author, id} = this.focusedPhoto;
            const imgSrc = `https://picsum.photos/id/${this.focusedPhoto.id}/${this.imgWidth}/${this.imgHeight}`;
            photo = <img
                src={imgSrc}
                alt={`ID ${id} by ${author}`}
            />;
        } else {
            photo = <span />;
        }

        return (
            <div className={`photoViewer relative pb-6 ${this.props.className}`}>
                {photo}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        photos: state.photos,
        focusedPhoto: state.focusedPhoto,
    };
};

export default connect(mapStateToProps)(PhotoViewer);
