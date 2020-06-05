import React from 'react';
import { connect } from 'react-redux';

class PhotoViewer extends React.Component {
    get imgWidth() {
        return 500; // this will be dynamic eventually based on screensize/viewer size
    }
    get imgHeight() {
        if (!this.focusedPhoto) return 0;
        const {height, width} = this.focusedPhoto;
        return Math.floor((this.imgWidth * height) / width);
    }
    get focusedPhoto() {
        return this.props.photos.find(photo => photo.id === this.props.focusedPhoto);
    }

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
            photo = <div></div>;
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
