const fs = require('fs');

fs.readFile('test_case.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const testCase = JSON.parse(data);

    const decodeValue = (value, base) => {
        return parseInt(value, base);
    };

    const n = testCase.keys.n;
    const k = testCase.keys.k;

    const points = [];

    Object.keys(testCase).forEach(key => {
        if (key !== "keys") {
            const base = parseInt(testCase[key].base, 10);   value = testCase[key].value;
            const decodedValue = decodeValue(value, base);  
            const x = parseInt(key, 10);
            points.push({ x: x, y: decodedValue });
        }
    });

    console.log('Decoded points (x, y):', points);

    const lagrangeInterpolation = (points) => {
        let result = 0;

        for (let i = 0; i < points.length; i++) {
            let term = points[i].y;

            for (let j = 0; j < points.length; j++) {
                if (i !== j) {
                    term *= (0 - points[j].x) / (points[i].x - points[j].x);
                }
            }

            result += term;
        }

        return result;
    };

    const constantTermC = lagrangeInterpolation(points.slice(0, k));

    console.log('The constant term c of the polynomial is:', constantTermC);
});