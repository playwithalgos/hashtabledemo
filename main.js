let millisecondsBetweenTwoFrames = 100;
let size = 100;

function arrayToString(L) { 	return L.map(JSON.stringify).join(" -> " ); }

$(document).ready(function () {
	example_direct_adress_table();
	window.setTimeout(live, millisecondsBetweenTwoFrames);
	$("a").click((evt) => $("#exampletitle").html($(evt.currentTarget).html()));
});



/**
 * @returns the array of elements in the hash table (given in the appropriate textbox)
 */
function getElements() {
	const elementsToEval = $("#elements").val().split("\n");
	const elements = [];

	for (const e in elementsToEval)
		if (elementsToEval[e] != "") {
			const element = eval("pioupioupiou = " + elementsToEval[e]);
			if (elements.indexOf(element) < 0)
				elements.push(element);
		}
	return elements;
}

/**
 * 
 * @param {*} elements 
 * @returns the hashtable that contains the elements in elements
 */
function computeHashTable(elements) {
	const T = new Array();

	for (let i = 0; i < size; i++)
		T[i] = [];

	eval("h = " + $("#hash").val());
	for (const e in elements)
		T[h(elements[e])].push(elements[e]);

	return T;

}


/**
 * 
 * @param {*} T 
 * @descr displays the hash table T
 */
function showHashTable(T) {
	let output = "";
	for (const i in T)
		if (i <= 9)
			output += i + "   |_|  -->  " + arrayToString(T[i]) + "\n";
		else
			output += i + "  |_|  -->  " + arrayToString(T[i]) + "\n";


	$("#hashtable").val(output);
}


/**
 * 
 * @param {*} T 
 * @returns the max of the length of the lists in the hash table
 */
function getWorst(T) {
	let max = 0;
	for(const i in T)
		max = Math.max(max, T[i].length);
	return max;
}


/**
 * 
 * @param {*} T 
 * @returns the mean of the length of the non-empty lists in the hash table
 */
function getMean(T) {
	let sum = 0;
	let k = 0;
	for(const i in T)
		if(T[i].length > 0) {
			sum = sum + T[i].length;
			k++;
		}
	
	return sum / k;
}


/**
 * @descr one cycle of "life" of the software (as parameters, hash functions and/or elements can
 * be random, the display is fully recomputed frequently)
 */
function live() {
	try {
		$("#error").html("");
		size = 100;
		eval($("#init").val());
		const elements = getElements();
		const T = computeHashTable(elements);
		
		showHashTable(T);

		$("#factor").html("factor = " + (elements.length / size).toFixed(2));
		$("#mean").html("mean length = " + getMean(T).toFixed(2));
		$("#worst").html("worst length = " + getWorst(T).toFixed(2));
		
	}
	catch (e) {
		$("#error").html(e);
	}
	window.setTimeout(live, millisecondsBetweenTwoFrames);
}







/****************************************************************** EXAMPLES ****/

function pif(n) { return Math.round(n * Math.random()); }


function generate_example_array_of_elements(n, max) {
	if (max === undefined) max = 100000;
	const t = [];

	for (let i = 0; i < n; i++)
		t.push(pif(max));

	return t;
}


function array_to_elements_input(array) {
	let s = "";
	for (const i in array)
		s += array[i] + "\n";
	return s;
}



function generate_bad_hash_function_for_perfect_hashing_elements(array) {
	let s = "";

	s = "function(k)\n{\n //problem: this function runs in O(n)\n //where n is the number of elements \n//and not in O(1)\n"
	for (const i in array)
		s += "    if(k == " + array[i] + ")\n        return " + i + ";\n";

	s += "    \n    return 0;\n}";

	return s;
}

function generate_example(n, max) {
	return array_to_elements_input(generate_example_array_of_elements(n, max));
}


function repeatString(string, n) {
	let result = string;

	for (let i = 1; i < n; i++)
		result += string;

	return result;
}






function example_direct_adress_table() {
	$("#init").val("size = 100");
	$("#hash").val("(k) => k");
	$("#elements").val(generate_example(10, 50));

}



function example_uniform_hash() {
	$("#init").val("size = 20");
	$("#hash").val("(k) => k % size");
	$("#elements").val(generate_example(50));
}


function example_uniform_hash_point() {
	$("#init").val("size = 20");
	$("#hash").val("(k) => (k.x + k.y) % size");
	$("#elements").val("{x: 3, y: 5}\n{x: 1, y: 55}\n{x: 13, y: 25}");
}

function example_uniform_hash_rand() {
	$("#init").val("size = 20");
	$("#hash").val("(k) => k % size");
	$("#elements").val(repeatString("pif(1000000)\n", 100));
}

function example_uniform_hash_real_numbers() {
	$("#init").val("size = 20");
	$("#hash").val("(k) => Math.floor(k * size)");
	$("#elements").val("0.05\n0.6\n0.7\n0.145\n0.89\n0.96");

}


function strings_example() {
	return '"arrosoir"\n'
		+ '"plante"\n'
		+ '"chat"\n'
		+ '"chien"\n'
		+ '"chenille"\n'
		+ '"anticonstitutionnellement"\n'
		+ '"à"\n'
		+ '"de"\n'
		+ '"et"\n'
		+ '"avec"\n'
		+ '"pour"\n'
		+ '"car"\n'
		+ '"là"\n'
		+ '"toujours"\n'
		+ '"parfois"\n'
		+ '"pareil"\n'
		+ '"nénuphar"\n'
		+ '"miroir"\n'
		+ '"avancer"\n'
		+ '"agrégation"\n'
		+ '"concours"\n'
		+ '"épreuve"\n'
		+ '"succès"\n'
		+ '"chouette"\n'
		+ '"vacances"\n'
		+ '"orgues"\n'
		+ '"flûte"\n'
		+ '"piano"\n'
		+ '"note"\n'
		+ '"chacun"\n'
		+ '"groseille"\n'
		+ '"dromadaire"\n'
		+ '"paix"\n'
		+ '"trombone"\n'
		+ '"trompette"\n'
		+ '"miaou"\n'
		+ '"école"\n'
		+ '"avec"\n'
		+ '"toujours"\n'
		+ '"logique"\n'
		+ '"entente"\n';

}


function example_hash_strings() {
	$("#init").val("");
	$("#hash").val("(k) => k.length");
	$("#elements").val(strings_example());

}

function example_hash_strings2() {
	$("#init").val("size = 19");
	$("#hash").val("function(k) {\n     let result = 0;\n"
		+ "     for(let i = 0; i < k.length; i++)\n"
		+ "          result += k.charCodeAt(i);\n"
		+ "     return result % size;\n"
		+ "}");
	$("#elements").val(strings_example());

}

function attack_example_elements() {
	let s = "";

	for (let i = 2; i < 3000; i += 20)
		s += i + "\n";

	return s;
}


function example_uniform_hash_attack() {
	$("#init").val("size = 20");
	$("#hash").val("(k) => k % size");


	$("#elements").val(attack_example_elements());
}




function example_universal_hash() {
	$("#init").val("size = 20\np = 1987;\na = 1 + pif(p-2); \nb = pif(p-1);");
	$("#hash").val("(k) => ((a * k + b) % p) % size");
	$("#elements").val(attack_example_elements());
}



function example_perfect_hash_bad_example() {
	let array_elements = generate_example_array_of_elements(30);
	$("#init").val("");
	$("#hash").val(generate_bad_hash_function_for_perfect_hashing_elements(array_elements));
	$("#elements").val(array_to_elements_input(array_elements));
}

function example_perfect_hash_first_part() {
	$("#init").val("p = 1987;\na = 1 + pif(p-2); \nb = pif(p-1);\n\nn = 7;");
	$("#hash").val("function(k)\n{\n      return ((a * k + b) % p) % (n*n);\n}");
	$("#elements").val(generate_example(7));
}

