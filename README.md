# Description
Javascript implementation of ngram matching utilizing cosine similarity. 

This relatively lightweight solution makes for fast searching while allowing for inexact matches such as typos.

# Usage

```JS
const createNGramSearch = require('ngram-search');

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

# Configuration

```JS
function createNGramSearch(textList, dimensionality = 2, thresholdFn = v => v === 1) {
    ...
}
```
## Parameters

`textList`: Array of strings to match against.

`dimensionality`: Number of dimensions for N-gram matching (e.g. `2` for bigram, `3` for trigram, etc.)

`thresholdFn`: Minimum threshold for including matched results between 0 and 1.  Defaults to `1` for exact matches only.
