const express = require('express')
const {open} = require('sqlite')
const path = require('path')
const databasePath = path.join(__dirname, 'moviesData.db')
const app = express()
app.use(express.json())

db = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Databse,
    })
    app.listen(3000, () => console.log('Success'))
  } catch (error) {
    console.log(`DB Error : ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

const convertMovieDbObjectToresponseObject = dbObject => {
  return {
    movieId: dbObject.movie_id,
    directorId: dbObject.director_id,
    movieName: dbOject.movie_name,
    leadActor: dbObject.lead_actor,
  }
}

const convertDirectorDbObjectToResponseObject = dbObject => {
  return {
    directorId: dbObject.director_id,
    directorName: dbObject.director_name,
  }
}

app.get('/movies/', async (request, response) => {
  const getMovieQuery = `
    SELECT 
    movie_name
    FROM
    movie;`

  const moviesArray = await db.all(geetMoviesQuery)
  response.send(
    moviesArray.map(eachMovie => ({movieName: eachMovie.movie_name})),
  )
})

app.get('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.body
  const getMovieQuery = `
    SELECT
    *
    FROM 
    movie
        WHERE
        movie_id = '${movieId}';`

  const movie = await db.get(getMovieQuery)
  response.send(convertMovieDbObjectToresponseObject(movie))
})

app.post('/movies/', async (request, response) => {
  const {directoId, movieNmae, leadActor} = request.body
  const postMovieQuery = `
  INSERT INTO
  movie (director_id, movie_name, lead_actor) 
  VALUES
  ('${directorId}', '${movieName}', '${leadActor}');`
  await databse.run(postMovieQuery)
  response.send('movie Successfully Added')
})

app.put('/movies/:movieId/', async (request, response) => {
  const {directoId, movieName, leadActor} = request.body
  const {movieId} = request.params
  const updateMovieQuery = `
  UPDATE
  movie
  SET 
  director_id = '${directorId}',
  movie_name = '${movieName}',
  lead_actor = '${leadActor}',
  WHERE
  movie_id ='${movieId}';`

  await databse.run(updateMovieQuery)
  response.send('Movie Details Updated')
})

app.delete('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params
  const deleteMovieQuery = `
    DELETE FROM
    movie
    WHERE
    movie_id = '${movieId}';`

  await database.run(deleteMovieQuery)
  response.send('Movie Removed')
})

app.get('/directors/', async (request, response) => {
  const getDirectorQuery = `
  SELECT
  *
  FROM
  director;`
  const directorArray = await db.all(getDirectorQuery)

  response.send(
    directorArray.map(eachDirector =>
      convertDirectorDbObjectToResponseObject(eachDirector),
    ),
  )
})

app.get('/directors/:directorsId/movies', async (request, response) => {
  const {directorId} = request.params

  const getDirectorMovieQuery = `
  SELECT
  movie_name
  FROM
  movie
  WHERE
  director_id = '${directorId}';`
  const moviesArray = await db.all(getDirectorMovieQuery)
  response.send(
    moviesArray.map(eachMovie => ({movieName: eachMovie.movieName})),
  )
})

module.exports = app