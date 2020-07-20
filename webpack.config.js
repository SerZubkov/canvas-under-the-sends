/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

'use strict';

const env = process.env.NODE_ENV;

module.exports = (env) => {
    console.log(`🛠️  running ${env} Mode using ./webpack/webpack.${env}.js 🛠️`);
    return require(`./webpack/webpack.${env}.js`);
};
