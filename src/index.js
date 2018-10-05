function sum(...values) {
    return values.reduce((acc, val) => acc + val, 0);
}

function multiply(...values) {
    return values.reduce((v1, v2) => v1 * v2);
}

function magnitude(vector) {
    return Math.sqrt(sum(
        ...vector.map(v => Math.pow(v, 2))
    ));
}

function dotProduct(vectorA, vectorB) {
    const longerVector = vectorA.length > vectorB.length ? vectorA : vectorB;
    const shorterVector = longerVector === vectorB ? vectorA : vectorB;

    return sum(...longerVector.map((v, i) => v * (shorterVector[i] || 0)));
}

function cosineDistance(vectorA, vectorB) {
    // return angular distance
    const distance = dotProduct(vectorA, vectorB) / multiply(magnitude(vectorA), magnitude(vectorB));
    // precision error requires the "min"
    return Math.acos(Math.min(1, distance)) / Math.PI
}

const chars = ` abcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()-_{}:;"'<,>.?/`;

const isExactMatch = v => v === 1;
const descendingOrder = ([, a], [, b]) => a > b;

function createNGramVectors(word, dimensionality = 2) {
    const arrLength = Math.max(0, word.length - dimensionality) + 1;
    return [...new Array(arrLength)]
        .map((_, i) => word
            .substr(i, dimensionality)
            .split('')
            .map(v => chars.indexOf(v) + 1));
}

module.exports = function createNGramSearch(list, dimensionality = 2, thresholdFn = isExactMatch) {
    const vectorDictionary = list.reduce((acc, v) => ({
        ...acc,
        [v]: createNGramVectors(v.toLowerCase(), dimensionality)
    }), {});

    return function matchEntities(testString) {
        const testVector = createNGramVectors(testString.toLowerCase(), dimensionality);

        return Object.entries(vectorDictionary)
            .map(([key, vectors]) => [key, Math.max(
                ...vectors.map(v => Math.max(
                    ...testVector.map(tv => 1 - cosineDistance(v, tv))))
            )])
            .filter(([, v]) => thresholdFn(v))
            .sort(descendingOrder);
    }
}