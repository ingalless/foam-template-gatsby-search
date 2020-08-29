module.exports = {
  siteMetadata: {
    title: `Foam`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        rootNote: "/readme",
        contentPath: `${__dirname}/..`,
        ignore: [
          "**/_layouts/**",
          "**/.git/**",
          "**/.github/**",
          "**/.vscode/**",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "pages",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        // engineOptions: "speed",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `{
          allFile {
            nodes {
              id
              name
              ext
              fields {
                title
                slug
              }
              childMdx {
                rawBody
                excerpt
              }
            }
          }
        }`,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "id",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        //index: ["title", "rawBody"],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        // store: ["id", "path", "title", "excerpt"],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allFile.nodes
            .filter((node) => node.ext === ".md")
            .map((node) => ({
              id: node.id,
              path: node.fields.slug,
              title: node.fields.title,
              body: node.childMdx.rawBody,
              // Replace weirdly formatted [ link ] in excerpt to look like wikilinks ([link])
              excerpt: node.childMdx.excerpt.replace(
                /\[\s([\w'-]+)\s\]/gi,
                (_, p1) => `[${p1}]`
              ),
            })),
      },
    },
    // You could enable the below to have a favicon
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Foam Workspace`,
    //     short_name: `Foam Workspace`,
    //     start_url: `/`,
    //     background_color: `#00843D`,
    //     theme_color: `#00843D`,
    //     // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
    //     // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
    //     display: `standalone`,
    //     icon: `src/images/logo.png`, // This path is relative to the root of the site.
    //   },
    // },
  ],
};
