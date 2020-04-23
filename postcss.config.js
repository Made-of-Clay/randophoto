const conditionalPlugins = process.env.NODE_ENV === 'production'
    ? [
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
        require('@fullhuman/postcss-purgecss')({
            content: ['./layouts/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        }),
    ]
    : [];

module.exports = {
    plugins: [
        require('tailwindcss')('./tailwind.js'),
        ...conditionalPlugins,
    ],
};