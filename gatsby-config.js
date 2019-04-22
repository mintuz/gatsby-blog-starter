const mdxFeed = require('gatsby-mdx/feed');

module.exports = {
    siteMetadata: {
        title: 'Mintuz',
        titlePrefix: 'CSS, Javascript and Web Performance',
        locale: 'en_GB',
        googleVerification: 'RnXDiD3_kyC6xc4y2AbSsJoXcLZvza1W7rYVHBGA89M',
        author: 'Adam Bulmer',
        siteUrl: 'https://mintuz.com',
        social: {
            twitter: `mintuz`,
            github: 'mintuz'
        },
        description:
            'Software Engineer from Manchester writing posts on CSS, React, JavaScript and Web Performance.',
        keywords: [
            'Web Performance',
            'Web Developer',
            'Web Developer Manchester',
            'Software Engineer Manchester',
            'ReactJS',
            'React',
            'React Components'
        ]
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-mdx`,
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 600,
                            sizeByPixelDensity: true
                        }
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`
                        }
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            showLineNumbers: true
                        }
                    },
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`
                ]
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                //trackingId: `ADD YOUR TRACKING ID HERE`,
            }
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: mdxFeed
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Mintuz',
                short_name: 'Mintuz',
                start_url: '/',
                background_color: '#FFFFFF',
                theme_color: '#EE403D',
                display: 'minimal-ui',
                icon: 'src/images/icon.png'
            }
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                postCssPlugins: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie >= 9', 'safari >= 7']
                    }),
                    require('cssnano')({
                        discardComments: {
                            removeAll: true
                        },
                        zindex: false,
                        options: {
                            sourcemap: false
                        }
                    })
                ]
            }
        }
    ]
};
