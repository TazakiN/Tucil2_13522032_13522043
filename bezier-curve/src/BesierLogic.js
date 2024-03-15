function BesierLogic(pointNumber, iterNumber, inputx, inputy) {
  let BezierPointx = []; // tempat hasil bejir x
  let BezierPointy = []; // tempat hasil bejir y
  let Pointx = inputx; // tempat titik titiknya x
  let Pointy = inputy; // tempat titik titiknya y
  let iterations = iterNumber; // banyak iterasi

  function CreateBezier(arrayTitikx, arrayTitiky) {
    BezierPointx.push(arrayTitikx[0]); // titik awal
    BezierPointy.push(arrayTitiky[0]); // titik awal

    for (let i = 0; i < arrayTitikx.length - 2; i++) {
      // populate tergantung banyak titik
      PopulateBezierPoints(
        arrayTitikx[i],
        arrayTitikx[i + 1],
        arrayTitikx[i + 2],
        arrayTitiky[i],
        arrayTitiky[i + 1],
        arrayTitiky[i + 2],
        0
      );
    }

    BezierPointx.push(arrayTitikx[arrayTitikx.length - 1]); // titik akhir
    BezierPointy.push(arrayTitiky[arrayTitiky.length - 1]); // titik akhir
  }

  function PopulateBezierPoints(
    ctrlx1,
    ctrlx2,
    ctrlx3,
    ctrly1,
    ctrly2,
    ctrly3,
    currentIteration
  ) {
    if (currentIteration < iterations) {
      // itung mid point
      let midPoint1 = MidPoint(ctrlx1, ctrly1, ctrlx2, ctrly2);
      let midPoint2 = MidPoint(ctrlx2, ctrly2, ctrlx3, ctrly3);
      let midPoint3 = MidPoint(
        midPoint1[0],
        midPoint1[1],
        midPoint2[0],
        midPoint2[1]
      );

      currentIteration++;

      PopulateBezierPoints(
        ctrlx1,
        midPoint1[0],
        midPoint3[0],
        ctrly1,
        midPoint1[1],
        midPoint3[1],
        currentIteration
      ); // itung titik bezier dari 3 titik kiri
      BezierPointx.push(midPoint3[0]); // masukin titik tengah ke hasil
      BezierPointy.push(midPoint3[1]); // masukin titik tengah ke hasil
      PopulateBezierPoints(
        midPoint3[0],
        midPoint2[0],
        ctrlx3,
        midPoint3[1],
        midPoint2[1],
        ctrly3,
        currentIteration
      ); // itung titik bezier dari 3 titik kanan
    }
  }

  function MidPoint(
    controlPoint1x,
    controlPoint1y,
    controlPoint2x,
    controlPoint2y
  ) {
    // ngitung titik tengah dari 2 titik
    let arr = [
      (controlPoint1x + controlPoint2x) / 2,
      (controlPoint1y + controlPoint2y) / 2,
    ];
    return arr;
  }

  CreateBezier(Pointx, Pointy); // jalankan fungsi bezier

  let fin = [];
  fin.push(BezierPointx);
  fin.push(BezierPointy);
  return fin;
}

export default BesierLogic;
