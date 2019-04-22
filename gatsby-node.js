const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const createPaginatedPages = require('gatsby-paginate');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const blogPost = path.resolve(`./src/templates/post.js`);
    return graphql(
        `
            {
                allMdx(
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
            }
        `
    ).then(result => {
        if (result.errors) {
            throw result.errors;
        }

        createPaginatedPages({
            edges: result.data.allMdx.edges,
            createPage,
            pageTemplate: 'src/templates/posts.js',
            pageLength: 5,
            pathPrefix: 'blog'
        });

        // Create blog posts pages.
        const posts = result.data.allMdx.edges;

        posts.forEach((post, index) => {
            const previous =
                index === posts.length - 1 ? null : posts[index + 1].node;
            const next = index === 0 ? null : posts[index - 1].node;

            createPage({
                path: post.node.fields.slug,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug,
                    previous,
                    next
                }
            });
        });

        return null;
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (
        node.internal.type === `MarkdownRemark` ||
        node.internal.type === `Mdx`
    ) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value: `/blog${value}`
        });
    }
};
