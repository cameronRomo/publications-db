const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(express.json());


app.get('api/v1/papers', async (request, response) => {
  try {
    const papers = await database('papers').select();
    response.status(200).json(papers);
  } catch(error) {
    response.status(500).json({ error })
  }
})