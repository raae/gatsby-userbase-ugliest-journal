/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.

// You can replace the code below with the gatsby-plugin-create-client-paths plugin
// https://www.gatsbyjs.org/packages/gatsby-plugin-create-client-paths/

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // Only update the `/app` page.
  if (page.path.match(/^\/app/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/app/*";
    // Update the page.
    createPage(page);
  }
};
