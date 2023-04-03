import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

const handleSearchCountry = event => {
  const searchCountry = event.target.value.trim();
  listEl.innerHTML = '';

  if (searchCountry !== '') {
    fetchCountries(searchCountry)
      .then(data => {
        if (2 <= data.length && data.length <= 10) {
          const markup = data
            .map(
              country =>
                `<li class= "list-item"><img clas = "flag" src=${country.flags.png} width = 80px>  ${country.name.common} </li>`
            )
            .join('');

          listEl.insertAdjacentHTML('beforeend', markup);
        }
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (data.length === 1) {
          const countryInfo = data
            .map(
              country =>
                `<h2><img clas = "flag" src=${
                  country.flags.png
                } width = 80px>  ${country.name.common} </h2>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population}</p>
                <p>Languages: ${Object.values(country.languages)}</p>`
            )
            .join('');

          listEl.insertAdjacentHTML('beforeend', countryInfo);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
};
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);
