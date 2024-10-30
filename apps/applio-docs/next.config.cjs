const withNextra = require('nextra');

const config = withNextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
});

module.exports = config;
