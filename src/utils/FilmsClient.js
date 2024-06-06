class FilmsClient {
  async getFilms(search = 'return', page = 1) {
    if (!search) {
      search = 'return';
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}`;

    const films = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWQ3NGIyNDhjYjczMWJjMzZkNzUzYzBjZTFjNTZlYSIsInN1YiI6IjY2NTM3ODRiN2VjMzIzZjY4ZjkwNzI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qi98hzb_SxaXvCKwf87Nd0MRjEczkyvEPjuGYcHVfzI',
        accept: 'application/json',
      },
    })
      .then((respone) => respone.json())
      .catch((err) => {
        throw new Error(err);
      });
    return films;
  }
}

const filmsClient = new FilmsClient();

export default filmsClient;
