//CONFIGURATION DATA
const bits = 16;

//PROGRAM
function full_adder(a, b, c_in)
{
	var returnData = {};

	var xor_1 = a ^ b;
	returnData.sum = xor_1 ^ c_in;

	var and_1 = a & b;
	var and_2 = xor_1 & c_in;
	returnData.carry = and_1 | and_2;
	return returnData;
}

result = {}; //To pass starting carry
result.sum = 0;
result.carry = 0;

function sum()
{;
	var a = [];
	var b = [];

	//Get switch values
	for(var i = 0; i < bits; i++)
	{
		a.push(document.getElementById(`a${i}`).checked ? 1 : 0);
		b.push(document.getElementById(`b${i}`).checked ? 1 : 0);
	}
	//Generate sum
	totalSum = [];
	carry = 0;
	for(var i = 0; i < a.length; i++)
	{
		carry = result.carry;
		result = full_adder(a[i], b[i], result.carry);
		totalSum.push(result.sum);
	}
	console.log(totalSum);
	updateGraphics(totalSum, carry);
}

function updateGraphics(totalSum, carry)
{
	for(var i = 0; i < totalSum.length; i++)
		document.getElementById(`out${i}`).style.backgroundColor = totalSum[i] == 1 ? '#090' : '#900';
	 document.getElementById(`out${bits}`).style.backgroundColor = carry == 1 ? '#099' : '#900';
}

function setup()
{
	for(var i = 0; i < bits; i++)
	{
		num = Math.pow(2, i);
		document.getElementById("inputs").innerHTML +=
		`<label class="switch">
			<input type="checkbox" id="a${i}" onclick="sum()">
			<div class="slider"></div>
		</label>
		<label class="switch">
			<input type="checkbox" id="b${i}" onclick="sum()">
			<div class="slider"></div>
		</label><span>${num}</span><br>`;

		document.getElementById("outputs").innerHTML +=
		`<div class="square" id="out${i}"><span>${num}</span></div>`;
	}

	document.getElementById("outputs").innerHTML +=
	`<div class="square" id="out${bits}"><span>Carry</span></div>`;
}
