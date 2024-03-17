function BesierLogic(pointNumber, iterNumber, inputx, inputy) {
  let BezierPoints = new Set();
  let Pointx = inputx; // tempat titik titiknya x
  let Pointy = inputy; // tempat titik titiknya y
  let iterations = iterNumber; // banyak iterasi

  function CreateBezier(titikTitik) {
    BezierPoints.add(titikTitik[0]);

    let temp = [];
    for (let i = 0; i < titikTitik.length - 2; i++) {
      // ketika i = 1,
      let threePoints = [];

      threePoints.push(titikTitik[i]);

      threePoints.push(titikTitik[i + 1]);

      threePoints.push(titikTitik[i + 2]);

      temp = MidPointBezierPoints(threePoints, 0);
      for (let j = 1; j < temp.length; j += 2) {
        BezierPoints.add(temp[j]);
      }
    }

    BezierPoints.add(titikTitik[titikTitik.length - 1]);
  }

  function MidPointBezierPoints(aray, currentIteration) {
    if (currentIteration >= iterations) {
      return [MidPoint(aray[0], aray[aray.length - 1])];
    }

    // itung mid point
    let midPoint1 = MidPoint(aray[0], aray[1]);
    let midPoint2 = MidPoint(aray[1], aray[2]);
    let midPoint3 = MidPoint(midPoint1, midPoint2);

    let kiri = MidPointBezierPoints(
      [aray[0], midPoint1, midPoint3],
      currentIteration + 1
    );
    let kanan = MidPointBezierPoints(
      [midPoint3, midPoint2, aray[aray.length - 1]],
      currentIteration + 1
    );

    let hasil = [];
    hasil.push(...kiri);
    hasil.push(midPoint3);
    hasil.push(...kanan);
    return [...hasil];
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

// export default BesierLogic;
// Contoh penggunaan

const results = BesierLogic(3, 2, [20, 30, 150, 200], [10, 100, 200, 75]);

console.log(results);
