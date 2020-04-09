function calculate() {
	let data = {
		size: parseFloat(document.getElementById("size").value),
		width: parseFloat(document.getElementById("width").value),
		thick: parseFloat(document.getElementById("thick").value),
		color: document.getElementById("color").value,
		profile: document.getElementById("profile").checked,
  };
  
	let sizeCoef = (function (size, thick) {
		if (thick > 1.7) {
			return (size + thick) * 3.14 + 0.4;
		} else if (thick == 1.2) {
			return (size + (thick - 0.2)) * 3.14;
		} else {
			return (size + thick) * 3.14;
		}
  })(data.size, data.thick);
  
	let widthCoef = (function (sizeCoef, width) {
		if (width > 6) {
			return sizeCoef + 0.4;
		} else if (width > 4) {
			return sizeCoef + 0.2;
		} else if (width < 4 && width > 2) {
			return sizeCoef;
		} else {
			return sizeCoef - 0.3;
		}
  })(sizeCoef, data.width);
  
	let colorCoef = (function (widthCoef, color) {
		if (color === "White") {
			return widthCoef + 0.3;
		} else if (color === "Red") {
			return widthCoef;
		} else if (color === "Lemon") {
			return widthCoef - 0.25;
		}
  })(widthCoef, data.color);
  
	let profileCoef = (function (colorCoef, profile) {
		if (profile) {
			return colorCoef - 0.2;
		} else {
			return colorCoef;
		}
  })(colorCoef, data.profile);
  
	let weight = profileCoef.toFixed(2) * data.thick * data.width * 0.013;
  
	let res = {
		length: profileCoef.toFixed(2),
		size: data.size,
		width: data.width,
		thick: data.thick,
		color: data.color,
    profile: data.profile,
    weight: weight.toFixed(2)
  };
  
  

	function createRes(obj) {
		let rs = document.getElementById("result");

		let res = document.createElement("res");
    res.innerHTML = `
      <p>${obj.length}, 
      Color: ${obj.color} ,
      Size: ${obj.size}, <br>
      Thick: ${obj.thick},
      Width: ${obj.width}, <br>
      &#8978 ${obj.profile} <br>
      Weight: ${obj.weight}</p>`;
    
    rs.append(res);
		
	}
	createRes(res);
	console.log(res);
}

let go = document.getElementById("calculate");
if (go) {
	document.querySelector("#calculate").addEventListener("click", calculate);
}

function deleteResult() {
	document.getElementById("result").innerHTML = " ";
}

function clearInput() {
    document.getElementById("size").value = ''
		document.getElementById("width").value = '' 
    document.getElementById("thick").value = ''
}