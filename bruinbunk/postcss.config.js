// Add back eventually; I just can't see my styles change in real time with this
// process.env.NODE_ENV === 'production' ?
//         [ '@fullhuman/postcss-purgecss', {
//             content: [
//               './pages/**/*.{js,jsx,ts,tsx}',
//               './components/**/*.{js,jsx,ts,tsx}',
//             ],
//             defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
//           },
//         ] : undefined,

module.exports = {
    plugins: [
      'tailwindcss',
      
      'postcss-preset-env',
    ],
  }