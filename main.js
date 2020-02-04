function calculate() {
  let p = {
    size: parseFloat(document.getElementById('size').value),
    width: parseFloat(document.getElementById('width').value),
    thick: parseFloat(document.getElementById('thick').value),
    color: document.getElementById('color').value,
    profile: document.getElementById('profile').checked,
  };
  let sizeCoef = (function (size, thick) {
    if (thick > 1.7) {
      return ((size + thick) * 3.14) + 0.4;
    } else if (thick == 1.2) {
      return ((size + (thick - 0.2)) * 3.14)
    } else {
      return (size + thick) * 3.14;
    }
  })(p.size, p.thick);
  let widthCoef = (function (sizeCoef, width) {
    if (width > 6) {
      return (sizeCoef + 0.4);
    } else if (width > 4) {
      return (sizeCoef + 0.2);
    } else if (width < 4 && width > 2) {
      return sizeCoef;
    } else {
      return (sizeCoef - 0.3);
    }
  })(sizeCoef, p.width);
  let colorCoef = (function (widthCoef, color) {
    if (color === 'White') {
      return widthCoef + 0.3;
    } else if (color === 'Red') {
      return widthCoef;
    } else if (color === 'Lemon') {
      return widthCoef - 0.25;
    }
  })(widthCoef, p.color);
  let profileCoef = (function (colorCoef, profile) {
    if (profile) {
      return colorCoef - 0.2
    } else {
      return colorCoef;
    }
  })(colorCoef, p.profile);
  let res = {
    length: profileCoef.toFixed(2),
    size: p.size,
    width: p.width,
    thick: p.thick,
    color: p.color,
    profile: p.profile
  };

  function createRes(obj) {
    let rs = document.getElementById('result');

    let res = document.createElement('res');
    res.className = "res";
    res.setAttribute('id', 'detail-show')
    res.innerHTML = `${obj.length}, Color: ${obj.color} <br>`;

    let det = document.createElement('det');
    det.className = "detail";
    det.setAttribute('id', 'detail-hide')
    det.innerHTML = `Size: ${obj.size}, Thick: ${obj.thick}, Width: ${obj.width},  Half-rounded: ${obj.profile} <br>`
    rs.append(res);

    function showDetail() {
      res.append(det);

      function hideDetail() {
        det.setAttribute('class', 'hide');
        console.log('yes')
      };

      let hide = document.getElementById('detail-hide');
      if (hide) {
        document.querySelector('#detail-hide').addEventListener('click', hideDetail);
      };
    };

    let show = document.getElementById('detail-show');
    if (show) {
      document.querySelector('#detail-show').addEventListener('click', showDetail);
    }

  }
  createRes(res);
  console.log(res)
}
let go = document.getElementById('calculate');
if (go) {
  document.querySelector('#calculate').addEventListener('click', calculate);
}

function deleteResult() {
  document.getElementById('result').innerHTML = " ";
}
// let res = document.createElement('res');
// res.className = "result hide";
// res.innerHTML = ``;

// document.body.append(res);