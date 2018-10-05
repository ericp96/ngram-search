# Description
Javascript implementation of ngram matching utilizing cosine similarity. This relatively lightweight solution makes for fast searching while allowing for inexact matches such as typos.

# Usage

```JS
// npm module to come. v0.0.1 is utility library only.
// const createNGramSearch = require('ngram-search');

const searchItems = [
    'Acura',
    'Audi',
    'BMW',
    'Chevrolet',
    'Dodge',
    'Ferrari',
    'Porche',
    'Subaru',
    'Tesla',
    'Toyota',
    'Volvo'
];

const nGramSearch = createNGramSearch(searchItems);

const matches = nGramSearch('Tsel');
```

