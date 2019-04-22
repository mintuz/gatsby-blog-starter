import React from 'react';
import { Link, graphql } from 'gatsby';
import SEO from '../components/seo';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

function BlogPostTemplate(props) {
    const post = props.data.mdx;
    const { previous, next } = props.pageContext;

    return (
        <React.Fragment>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
            <MDXRenderer>{post.code.body}</MDXRenderer>
            {(previous || next) && (
                <ul>
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            )}
        </React.Fragment>
    );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            id
            code {
                body
            }
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
        }
    }
`;
