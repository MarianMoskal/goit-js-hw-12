'use strict';

import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import manyCountriesTemplate from './templates/manyCountriesTemplate.hbs';
import oneCountryTemplate from './templates/oneCountryTemplate.hbs';

Notiflix.Notify.init({position: 'left-top'});

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let result;


inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
   

function onInput() {
    if (inputEl.value.trim() !== '') {
        fetchCountries(inputEl.value)
            .then(processResponse)
             .catch(error => {
                 console.log(error);
                 Notiflix.Notify.failure('Oops, there is no country with that name');
             })       
    }
};


function processResponse(resp) {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";

    if (resp.length === 1){
        result = resp.map(oneCountryTemplate).join('');
        countryInfo.insertAdjacentHTML("beforeend", result);
    }
    else if (resp.length >= 2 && resp.length <= 10){
        result = resp.map(manyCountriesTemplate).join('');
        countryList.insertAdjacentHTML("beforeend", result);
    }
    else {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
};


