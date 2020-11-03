/* eslint-disable import/no-extraneous-dependencies */
import imagemin from 'gulp-imagemin';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const directory = {
  src: './src',
  dest: './dist',
};

const paths = {
  archive: {
    src: [
      `${directory.dest}/**/*`,
      `!${directory.dest}/**/*.zip`,
    ],
    dest: directory.dest,
    watch: '',
  },
  deploy: {
    src: [
      `${directory.dest}/**/*`,
      `!${directory.dest}/**/*.zip`,
    ],
    dest: '',
    watch: '',
  },
  fonts: {
    src: `${directory.src}/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
    dest: `${directory.dest}/fonts`,
    get watch() {
      return this.src;
    },
  },
  images: {
    src: [
      `${directory.src}/images/**/*.{gif,ico,jpg,png,svg,webp}`,
      `!${directory.src}/images/sprite/**/*.svg`,
    ],
    dest: `${directory.dest}/images`,
    get watch() {
      return this.src;
    },
  },
  scripts: {
    src: `${directory.src}/scripts/main.js`,
    dest: `${directory.dest}/scripts`,
    watch: [
      `${directory.src}/scripts/**/*.js`,
      `${directory.src}/blocks/**/*.js`,
    ],
  },
  sprite: {
    src: `${directory.src}/images/sprite/**/*.svg`,
    dest: `${directory.dest}/images/sprite`,
    get watch() {
      return this.src;
    },
  },
  styles: {
    src: `${directory.src}/styles/main.sass`,
    dest: `${directory.dest}/styles`,
    watch: [
      `${directory.src}/styles/**/*.sass`,
      `${directory.src}/blocks/**/*.sass`,
    ],
  },
  templates: {
    src: `${directory.src}/*.pug`,
    dest: `${directory.dest}`,
    watch: [
      `${directory.src}/*.pug`,
      `${directory.src}/templates/**/*.pug`,
      `${directory.src}/blocks/**/*.pug`,
    ],
  },
};

const imageminConfig = [
  imagemin.gifsicle({
    interlaced: true,
  }),
  imagemin.jpegtran({
    progressive: true,
  }),
  imagemin.optipng({
    optimizationLevel: 5,
  }),
  imagemin.svgo({
    plugins: [
      {
        removeViewBox: false,
      },
    ],
  }),
];

// eslint-disable-next-line object-curly-newline
export { isDevelopment, directory, paths, imageminConfig };
