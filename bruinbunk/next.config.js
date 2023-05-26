module.exports = {
    distDir: 'build',
    images: {
        loader: 'akamai',
        path: '',
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
              port: '',
              pathname: '/**',
            },
        ],
    },
}