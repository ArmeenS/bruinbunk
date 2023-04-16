# bruinbunk
Repository for our CS97 class project called bruinbunk.

# How to run

For development 

```
yarn dev
```

For deployment
```
WIP
```

# Tech Stack used

* Next.js
* Typescript
* Tailwind CSS
* React
* More eventually...

# npm libraries used

We use npm for this project instead of yarn.

Besides the above mentioned technologies, here is the npm libraries we've used:
* More eventually...

# Deployment

Deployment is done using Google firebase.

Here are the commands to deploy to our google firebase:

# Development notes

These are the commands I ran to initialize this project:

I follow [this guide](https://blog.saeloun.com/2022/02/03/create-typescript-next-js-tailwind-application)

```
npx create-next-app bruinbunk --example with-typescript
npm i -D postcss-preset-env tailwindcss
npx tailwind init
touch postcss.config.js
mkdir styles
touch styles/index.css
touch pages/_app.tsx
npm i -D @fullhuman/postcss-purgecss
```