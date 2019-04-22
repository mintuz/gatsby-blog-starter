import React from 'react';
import { Link, graphql } from 'gatsby';
import SEO from '../components/seo';

function NavLink(props) {
    if (!props.test) {
        return <Link to={props.url}>{props.text}</Link>;
    } else {
        return <span>{props.text}</span>;
    }
}

function Post(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            <p
                dangerouslySetInnerHTML={{
                    __html: props.excerpt
                }}
            />
            <Link to={props.slug}>Read more</Link>
        </article>
    );
}

function PostList({ posts }) {
    return posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        const slug = node.fields.slug;
        const date = node.frontmatter.date;
        const excerpt = node.frontmatter.description;

        return <Post title={title} slug={slug} date={date} excerpt={excerpt} />;
    });
}

function BlogList(props) {
    const { pageContext } = props;
    const { group, index, first, last } = pageContext;
    const previousUrl = index - 1 === 1 ? '/blog' : `/blog/${(index - 1).toString()}`;
    const nextUrl = `/blog/${(index + 1).toString()}`;

    return (
        <React.Fragment>
            <SEO title="All posts" keywords={[`blog`, `javascript`, `react`]} />
            <PostList posts={group} />
            <div>
                <NavLink
                    test={first}
                    url={previousUrl}
                    text="Go to Previous Page"
                />
            </div>
            <div className="nextLink">
                <NavLink test={last} url={nextUrl} text="Go to Next Page" />
            </div>
        </React.Fragment>
    );
}

export default BlogList;

export const pageQuery = graphql`
    query {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                    }
                }
            }
        }
    }
`;
