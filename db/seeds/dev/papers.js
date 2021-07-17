exports.seed = async function(knex) {
  try {
    await knex('footnotes').del()
    await knex('papers').del()

    const paperId = await knex('papers').insert({
      title: 'Fooo', author: 'Bob', publisher: 'Minnesota'
    }, 'id')
    return knex('footnotes').insert([
      { note: 'Lorem', paper_id: paperId[0] },
      { note: 'Dolor', paper_id: paperId[0] },
    ])
  } catch(error) {
    console.error(`Error seeding data: ${error}`);
  }
};
