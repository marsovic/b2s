import * as fs from 'fs'
//const fs = require('fs');


export default function importCsv(pathname) {

	function isNumber(n) {
	    'use strict';
	    n = n.replace(/\./g, '').replace(',', '.');
	    return !isNaN(parseFloat(n)) && isFinite(n);
	}

	var SeparatorColumn = null;
	var Document = fs.readFileSync(pathname).toString().split('\r\n')
	var Columns = Document[0]
	Document.shift()

	if (Columns.includes(',')) {
	   SeparatorColumn = ','
	} else if (Columns.includes(';')) {
	  SeparatorColumn = ';'
	}

	Columns = Columns.split(SeparatorColumn)

	var Json = []

	for (var i = 0; i < Document.length; i++) {
	  var Data = {}
	  var Element = Document[i].split(SeparatorColumn)
	  for (var j = 0; j < Element.length; j++) {
	  	if(isNumber(Element[j])) {
	  		Data[Columns[j]] = parseInt(Element[j])
	  		Data[Columns[j]] = Element[j]

	  	} else {	  	}
	  }
	  Json.push(Data)
	}

	Data = JSON.stringify(Json)
	fs.writeFileSync('data.json', Data, function (err) {
	  if (err) throw err
	})

	Data = JSON.parse(Data)

	return Data;
}


// Appel de la fonction
console.log(importCsv("coucou"));