

const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '35828732-80dbae6f7a9b2a665dfdc53c4';

export  const  getIMG = async (textContext, currentPage) => {
  const response = await fetch(`${BASE_URL}?q=${textContext}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
  if (!response.ok) {
    throw new Error(' ERROR! Smth went wrong! ');
  } else return await response.json();
};

