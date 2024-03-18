function BezierLogicv2(Iterations, Inputx, Inputy) {
  console.log("DIVIDE AND CONQUER");
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

  function LeftMids(Ctrls) {
    let arr = [];
    for (let i = 1; i < Ctrls.length - 1; i++) {
      arr.unshift([
        PascalControlsx(Ctrls.slice(0, Ctrls.length - i), 0.5),
        PascalControlsy(Ctrls.slice(0, Ctrls.length - i), 0.5),
      ]);
    }
    arr.unshift(Ctrls[0]);
    return arr;
  }

  function RightMids(Ctrls) {
    let arr = [];
    for (let i = 1; i < Ctrls.length - 1; i++) {
      arr.push([
        PascalControlsx(Ctrls.slice(i), 0.5),
        PascalControlsy(Ctrls.slice(i), 0.5),
      ]);
    }
    arr.push(Ctrls[Ctrls.length - 1]);
    return arr;
  }

  function EnterLeft(arr, entry) {
    for (let i = entry.length - 1; i >= 0; i--) {
      arr.unshift(entry[i]);
    }
  }

  function EnterRight(arr, entry) {
    for (let i = 0; i < entry.length; i++) {
      arr.push(entry[i]);
    }
  }

  function recFind(Ctrls, Iter, MaxIter) {
    if (Iter < MaxIter) {
      let mid = [[PascalControlsx(Ctrls, 0.5), PascalControlsy(Ctrls, 0.5)]];
      //   console.log(mid);
      //   console.log("a");
      let midsl = LeftMids(Ctrls);
      let midsr = RightMids(Ctrls);

      midsl.push(mid[0]);
      midsr.unshift(mid[0]);

      if (Iter + 1 < MaxIter) {
        let lefts = recFind(midsl, Iter + 1, MaxIter);
        let rights = recFind(midsr, Iter + 1, MaxIter);
        EnterLeft(mid, lefts);
        EnterRight(mid, rights);
        // console.log(lefts);
        // console.log(rights);
        // console.log(mid);
        return mid;
      } else {
        // console.log(mid);
        return mid;
      }
    } else {
      return Ctrls;
    }
  }

  Fin = recFind(Controls, 0, Iterations);
  Fin.unshift(Controls[0]);
  Fin.push(Controls[Controls.length - 1]);

  // Mainalgo

  //   Fin.push(Controls[Controls.length - 1]);
  return Fin;
}

export default BezierLogicv2;
