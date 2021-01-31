import React, { Component } from "react";
import * as XLSX from 'xlsx';



// HOW TO USE :
/*
    - Function to declare to log data in the CSV :
        consoleLogJSON(data1, data2, file) {
            console.log(data1); // Show the names of the columns
            console.log(data2); // Show data on each row 
            console.log(file); // Show file
        }

    - In render Method : 
        <ProcessingCSV sendJSON={this.consoleLogJSON}/>
*/



class ParseCSV extends Component {
    state = {
        columns: [],
        data: [],
        file: null
    }

    handleStateColumnsData(col, dat) {
        this.setState({ columns: col, data: dat })
    }

    isNumber(n) {
        n = n.replace(/\./g, '').replace(',', '.');
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // process CSV data
    processData = (dataString, file) => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length === headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] === '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] === '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        if (this.isNumber(d)) {
                            obj[headers[j]] = parseFloat(d.replace(',', '.'))
                        } else {
                            obj[headers[j]] = d
                        }
                    }
                }
                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));

        this.handleStateColumnsData(columns, list);
        this.props.sendJSON(columns, list);

    }

    // handle file upload
    handleFileUpload = e => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            // console.log(data)
            this.processData(data, file);
        };
        reader.readAsBinaryString(file);
    }

    render() {
        return (
            <div >
                <input
                    type="file"
                    accept=".csv"
                    onChange={this.handleFileUpload}
                />
            </div>
        )
    }
}

export default ParseCSV;
