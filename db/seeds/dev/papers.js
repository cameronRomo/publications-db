const papersData = require('../../../papersData');

const createPaper = async (knex, paper) => {
  const paperId = await knex('papers').insert({
    title: paper.title,
    author: paper.author
  }, 'id');

  let footnotePromises = paper.footnotes.map(footnote => {
    return createFootnote(knex, {
      note: footnote,
      paper_id: paperId[0]
    })
  });

  return Promise.all(footnotePromises);
}

const createFootnote = (knex, footnote) => {
  return knex('footnotes').insert(footnote);
}

exports.seed = async function(knex) {
  try {
    await knex('footnotes').del()
    await knex('papers').del()

    let paperPromises = papersData.map(paper => {
      return createPaper(knex, paper);
    });

    return Promise.all(paperPromises);
  } catch(error) {
    console.error(`Error seeding data: ${error}`);
  }
};