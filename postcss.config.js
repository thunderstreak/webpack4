module.exports = {
    plugins: [
        // require('postcss-smart-import')({ /* ...options */ }),
        // require('precss')({/* ...options */}),
        require('autoprefixer')({/* ...options */
            browsers: ['last 7 iOS versions', 'last 3 versions', '> 1%']
        })
    ]
};
