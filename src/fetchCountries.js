'use strict';

export default function fetchCountries(name) {
   return  fetch(`https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`)
        .then(response => {
           if (!response.ok) { throw new Error(response.status); }
            return response.json();
        })
       };

