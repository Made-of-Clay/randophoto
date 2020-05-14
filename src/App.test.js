import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

describe('App', () => {
    const getContainer = () => render(<App />).container;

    test('displays gallery name', () => {
        const container = getContainer();
        const mainHeader = container.querySelector('.app__header');
        expect(mainHeader).toHaveTextContent('RandoPhoto Gallery');
    });

    const testLink = selector => {
        const container = getContainer();
        const elem = container.querySelector(selector);
        expect(elem).toBeInTheDocument();
    };
    test('displays my link', () => testLink('.app__link--mine'));
    test('displays picsum link', () => testLink('.app__link--picsum'));
    test('displays unsplash link', () => testLink('.app__link--unsplash'));

    test('renders photo thumbnails', () => {
        const container = getContainer();
        const thumbsContainer = container.querySelector('.photoThumbnails');
        expect(thumbsContainer).toBeInTheDocument();
    });
});
