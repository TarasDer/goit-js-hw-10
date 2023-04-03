const BASE_URL = 'https://restcountries.com/v3.1';
export const fetchCountries = countryName => {
  return fetch(
    `${BASE_URL}/name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(respons.status);
    }
    return response.json();
  });
};
