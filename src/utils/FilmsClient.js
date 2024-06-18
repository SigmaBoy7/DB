const urlBase = 'https://api.themoviedb.org/3';
const BEARER =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWQ3NGIyNDhjYjczMWJjMzZkNzUzYzBjZTFjNTZlYSIsInN1YiI6IjY2NTM3ODRiN2VjMzIzZjY4ZjkwNzI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qi98hzb_SxaXvCKwf87Nd0MRjEczkyvEPjuGYcHVfzI';
export async function createGuestSession() {
  if (!localStorage.getItem('guestId')) {
    const createSessionUrl = `${urlBase}/authentication/guest_session/new?api_key=${'1ed74b248cb731bc36d753c0ce1c56ea'}`;

    const response = await fetch(createSessionUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
    }
    const session = await response.json();
    const sessionId = session.guest_session_id;
    localStorage.setItem('guestId', sessionId);
    return session;
  }
}

export async function getFilms(search = 'return', page) {
  console.log(search);

  const url = `${urlBase}/search/movie?query=${search}&page=${page}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: BEARER,
      accept: 'application/json',
    },
  });

  const films = await response.json();

  return films;
}

export async function addRate(movieId, rate) {
  const sessionId = localStorage.getItem('guestId');
  const url = `${urlBase}/movie/${movieId}/rating?api_key=${'1ed74b248cb731bc36d753c0ce1c56ea'}&guest_session_id=${sessionId}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: BEARER,
      accept: 'application/json',
    },
    body: JSON.stringify({ value: rate }),
  });

  const ratePost = await response.json();
  localStorage.setItem(movieId, rate);
  return ratePost;
}

export async function getRatedFilms(page) {
  const sessionId = localStorage.getItem('guestId');

  const url = `${urlBase}/guest_session/${sessionId}/rated/movies?api_key=${'1ed74b248cb731bc36d753c0ce1c56ea'}&page=${page}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: BEARER,
    },
  });

  const ratedFilms = await response.json();
  return ratedFilms;
}

export async function getGenres() {
  const url = `${urlBase}/genre/movie/list?language=en`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: BEARER,
    },
  });

  const genres = await response.json();
  return genres;
}
