function BezierBF(controlPoints, iterations) {
  const n = controlPoints.length - 1;
  const result = [];

  for (let t = 0; t <= 1; t += 1 / iterations) {
    let x = 0;
    let y = 0;

    for (let i = 0; i <= n; i++) {
      const b =
        binomialCoefficient(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
      x += controlPoints[i][0] * b;
      y += controlPoints[i][1] * b;
    }
  }

  return result;
}

function binomialCoefficient(n, k) {
  let coeff = 1;
  for (let i = n - k + 1; i <= n; i++) {
    coeff *= i;
  }
  for (let i = 1; i <= k; i++) {
    coeff /= i;
  }
  return coeff;
}

export default BezierBF;
