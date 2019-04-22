import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

function Bio() {
    return (
        <StaticQuery
            query={bioQuery}
            render={data => {
                const { author, social } = data.site.siteMetadata;
                return (
                    <div>
                        <p>
                            Written by <strong>{author}</strong> who lives and
                            works in San Francisco building useful things.
                            {` `}
                            <a href={`https://twitter.com/${social.twitter}`}>
                                You should follow him on Twitter
                            </a>
                        </p>
                    </div>
                );
            }}
        />
    );
}

const bioQuery = graphql`
    query BioQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
            childImageSharp {
                fixed(width: 50, height: 50) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        site {
            siteMetadata {
                author
                social {
                    twitter
                    github
                }
            }
        }
    }
`;

export default Bio;
