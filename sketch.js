/*
	! ===> not
	& ===> and
	| ===> or
	> ===> imp
	= ===> eq
	$ ===> Sheffer stroke
	% ===> Logical NOR
*/
let TextBox, TextBoxAns;
let Button;
//let formula = [];
let symbols = ['&', '|', '!', '>', '=', '(', ')', '$', '%'];
function setup() {
	TextBox = createInput("");
	Button = createButton("Press");
	TextBoxAns = createInput("");
	Button.mousePressed(myButtonIvent);
	createCanvas(500, 500);
}

function myButtonIvent() {
	background(255);
	let answer = [];
	let formula = split(TextBox.elt.value, '');
	formula = delSpace(formula);
	//formula = addBracket(formula);
	let countLat = countLatters(formula);
	let ans0 = 0, ans1 = 0;
	for (let i = 0; i < pow(2, countLat.length); i++) {
		let nums = numtobinary(countLat.length, i);
	//	console.log("numbers to try: " + nums);
		append(answer, "numbers to try: " + nums +"  ---  ");
	//	console.log("answer: " + counting(changeLetToNum(formula, nums, countLat), ''));
		append(answer, "answer: " + counting(changeLetToNum(formula, nums, countLat)) + "\n");
		if (counting(changeLetToNum(formula, nums, countLat)) == '1') {
			ans1++;
		} else {
			ans0++;
		}
	}
	text(answer, 20, 20)
	console.log(answer);
	if (ans0 == 0) {
  TextBoxAns.elt.value = join(formula, '') + " - tautology";
} else {
	TextBoxAns.elt.value = join(formula, '') + " - not tautology";
}
}


function counting(arr) {
	let temp = reversing(arr);
	let ttt = [];

	for (let i = 0; i < lastBracket(temp); i++) {
		append(ttt, temp[i]);
	}

	let t = [];
	let end;
	for (let i = lastBracket(temp) + 1; i < temp.length; i++) {
		if(temp[i] == ')') {end = i + 1; break;}
		append(t, temp[i]);
	}

	append(ttt, smallcount(t));

	for (let i = end; i < temp.length; i++) {
		append(ttt, temp[i]);
	}

	ttt = reversing(ttt);
	if (ttt.length > 1) {
		ttt = counting(ttt);
	}
	return ttt;
}

function smallcount(arr) {
		if (arr.length == 1) return arr[0];
		switch (arr[1]) {
			case '|':
				return(int(arr[0]) || int(arr[2]));
				break;
			case '&':
			return(int(arr[0]) && int(arr[2]));
			break;
			case '>':
			return(int(!int(arr[0])) || int(arr[2]));
			break;
			case '=':
			return((int(arr[0]) && int(arr[2])) || (int(!int(arr[0])) && int(!int(arr[2]))));
			break;
			case '$':
			return( int(!int(arr[0]) || !int(arr[2])) );
			break;
			case '%':
			return( int(!(int(arr[0]) || int(arr[2]))) );
			break;
		}
}

function reversing(arr) {
	let temp = [];
		for(let i = 0; i < arr.length; i++) {
			if (arr[i] == '!' && !symbols.includes(arr[i+1])) {
				append(temp, int(!int(arr[i+1])));
				i++;
			} else append(temp, arr[i]);
		}
		return temp;
}

// function addBracket(arr) {
// 	let temp = [];
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] == '!' && arr[i+1] == '(') {
// 			append(temp, '(');
// 			while(arr[i] != ')') {
// 					append(temp, arr[i]);
// 					i++;
// 			}
// 				append(temp, ')');
// 				append(temp, ')');
// 		} else {
// 			append(temp, arr[i]);
// 		}
// 	}
// 	return temp;
// }

function changeLetToNum(arr, nums, letters) {
	let temp = arr.slice();
	for (let i = 0; i < temp.length; i++) {
		for (let j = 0; j < letters.length; j++) {
			if (temp[i] == letters[j]) {
				temp[i] = nums[j];
			}
		}
	}
	return temp;
}

function numtobinary(number, position) {
	let temp = [];
	for (let i = 0; i < number; i++) {
		append(temp, Math.floor(position%2));
		position = position / 2;
	}
	return temp;
}


function countLatters(arr) {
	let temp = [];
	for (let i = 0; i < arr.length; i++) {
		if (!temp.includes(arr[i]) && !symbols.includes(arr[i])) {
			append(temp, arr[i]);
		}
	}
	return temp;
}

// DONT NEED IT, TO HARD
// function checkBrackets(arr) {
// 	let temp = 0;
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] == '(') {
// 			temp++;
// 		}
// 		else if (arr[i] == ')') {
// 			temp--;
// 		}
// 	}
// 	return temp;
// }

function lastBracket(arr) {
	let temp = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == '(') {
			temp = i;
		}
	}
	return temp;
}

function delSpace(arr) {
	let temp = [];
	append(temp, '(');
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] != ' ') {
			append(temp, arr[i]);
		}
	}
	append(temp, ')');
	return temp;
}
