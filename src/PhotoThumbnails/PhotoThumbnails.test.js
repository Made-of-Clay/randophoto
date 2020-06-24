import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import PhotoThumbnails from './PhotoThumbnails';

describe('PhotoThumbnails', () => {
    const getContainer = () => render(<PhotoThumbnails />).container;

    test('should render at least one thumbnail', () => {
        const container = getContainer();
        expect(container.querySelector('.photoThumbnails__thumbnail')).toBeInTheDocument();
    });

    test('should render as many thumbnails as specified', () => {
        const container = render(<PhotoThumbnails count="5" />).container;
        const thumbs = container.querySelectorAll('.photoThumbnails__thumbnail');
        expect(thumbs.length).toEqual(5);
    });

    test('should console.log on click', async () => {
        const logSpy = jest.sponOn(global.console, 'log');
        const container = getContainer();
        const firstThumb = container.querySelector('.photoThumbnails__thumbnail');
        await fireEvent.click(firstThumb);
        expect(logSpy).toBeCalled();
    });
});
