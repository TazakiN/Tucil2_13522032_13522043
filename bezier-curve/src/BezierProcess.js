function BezierProcess(Iterations, Inputx, Inputy) {
  let Fin = [];

  function makePoints(arrayX, arrayY) {
    let arr = [];
    for (let i = 0; i < arrayX.length; i++) {
      arr.push([arrayX[i], arrayY[i]]);
    }
    return arr;
  }

  let Controls = makePoints(Inputx, Inputy);

  function pascalRow(order, index) {
    let row = [];
    row[0] = 1;
    for (let i = 1; i <= order; i++) {
      for (let j = i - 1; j > 0; j--) {
        row[j] = row[j] + row[j - 1];
      }
      row.push(1);
    }
    return row[index];
  }

  function PascalControlsx(Ctrls, thedi) {
    let n = 0;
    for (let k = 0; k < Ctrls.length; k++) {
      n +=
        (1 - thedi) ** (Ctrls.length - k - 1) *
        thedi ** k *
        Ctrls[k][0] *
        pascalRow(Ctrls.length - 1, k);
    }
    return n;
  }

  function PascalControlsy(Ctrls, thedi) {
    let n = 0;
    for (let k = 0; k < Ctrls.length; k++) {
      n +=
        (1 - thedi) ** (Ctrls.length - k - 1) *
        thedi ** k *
        Ctrls[k][1] *
        pascalRow(Ctrls.length - 1, k);
    }
    return n;
  }

  function Midol(Ctrls, di) {
    let arr = [];
    for (let k = 0; k < Ctrls.length - 1; k++) {
      arr.push([
        PascalControlsx(Ctrls.slice(k, k + 2), di),
        PascalControlsy(Ctrls.slice(k, k + 2), di),
      ]);
    }
    return arr;
  }

  let j = Iterations - 1;
  let di = 1 / 2 ** (j + 1);
  let dianch = di;
  let Controlstemp = Controls;
  while (di < 1) {
    Controls = Controlstemp;
    while (Midol(Controls, di).length >= 2) {
      console.log(Midol(Controls, di));
      Fin.push(Midol(Controls, di));
      Controls = Midol(Controls, di);
    }
    di += dianch;
  }
  return Fin;
}

export default BezierProcess;
