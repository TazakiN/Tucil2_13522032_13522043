function BezierBF(Iterations, Inputx, Inputy) {
  let Fin = [];

  function makePoints(arrayX, arrayY) {
    let arr = [];
    for (let i = 0; i < arrayX.length; i++) {
      arr.push([arrayX[i], arrayY[i]]);
    }
    return arr;
  }

  let Controls = makePoints(Inputx, Inputy);

  Fin.push(Controls[0]);

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
  let j = Iterations - 1;
  let x = 0;
  let y = 0;
  let di = 1 / 2 ** (j + 1);
  let dianch = di;
  // console.log("diath: " + di);
  // console.log("j: " + j);
  while (di < 1) {
    // console.log("bif" + di);
    x = PascalControlsx(Controls, di);
    y = PascalControlsy(Controls, di);
    Fin.push([x, y]);
    di += dianch;
    // console.log("af" + di);
  }
  Fin.push(Controls[Controls.length - 1]);
  return Fin;
}

export default BezierBF;
