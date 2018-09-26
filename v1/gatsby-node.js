const NUM_PAGES = parseInt(process.env.NUM_PAGES || 5000, 10)
const template = require(`./page-template`)

exports.sourceNodes = ({ boundActionCreators: { createNode } }) => {
  // Create markdown nodes
  let step
  for (step = 0; step < NUM_PAGES; step++) {
    createNode({
      id: step.toString(),
      parent: null,
      children: [],
      internal: {
        type: `FakeMarkdown`,
        mediaType: `text/markdown`,
        content: template(step),
        contentDigest: step.toString(),
      },
    })
  }
}

exports.createPages = ({ boundActionCreators: { createPage } }) => {
  let step
  for (step = 0; step < NUM_PAGES; step++) {
    createPage({
      path: `/path/${step}/`,
      component: require.resolve(`./src/templates/blank.js`),
      context: {
        id: step,
      },
    })
  }
}
