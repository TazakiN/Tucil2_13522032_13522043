function BesierLogic(pointNumber, iterNumber, inputx, inputy) {
  let BezierPoints = new Set();
  let Pointx = inputx; // tempat titik titiknya x
  let Pointy = inputy; // tempat titik titiknya y
  let iterations = iterNumber; // banyak iterasi

  function CreateBezier(titikTitik) {
    BezierPoints.add(titikTitik[0]);

    MidPointBezierPoints(
      titikTitik, // titik y
      0 // current iteration
    ).forEach((elem) => BezierPoints.add(elem));

    BezierPoints.add(titikTitik[titikTitik.length - 1]);
  }

  function MidPointBezierPoints(aray, currentIteration) {
    if (currentIteration >= iterations) {
      return aray.filter((_, index) => index % 2 === 0);
    }

    let nextIter = [];
    let midPoints = [];
    for (let i = 0; i < aray.length - 1; i++) {
      let mid = MidPoint(aray[i], aray[i + 1]);
      midPoints.push(mid);
    }

    let hasil;
    let hasilIter = [];
    for (let i = 0; i < midPoints.length - 1; i++) {
      hasil = MidPoint(midPoints[i], midPoints[i + 1]);
      hasilIter.push(hasil);
    }

    nextIter.push(aray[0]);
    for (let i = 0; i < midPoints.length; i++) {
      nextIter.push(midPoints[i]);
      if (i < hasilIter.length) {
        nextIter.push(hasilIter[i]);
      }
    }
    nextIter.push(aray[aray.length - 1]);

    return MidPointBezierPoints(nextIter, currentIteration + 1);
  }

  function MidPoint(titik1, titik2) {
    // ngitung titik tengah dari 2 titik
    let arr = [(titik1[0] + titik2[0]) / 2, (titik1[1] + titik2[1]) / 2];
    return arr;
  }

  function makePoints(arrayX, arrayY) {
    let arr = [];
    for (let i = 0; i < arrayX.length; i++) {
      arr.push([arrayX[i], arrayY[i]]);
    }
    return arr;
  }

  let titikTitik = makePoints(Pointx, Pointy);
  CreateBezier(titikTitik); // jalankan fungsi bezier

  return BezierPoints;
}

export default BesierLogic;
// Contoh penggunaan

// const results = BesierLogic(4, 6, [20, 30, 150, 200], [10, 100, 200, 75]);
// console.log(results);
