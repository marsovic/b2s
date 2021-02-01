import React, { Component } from "react";
import axios from 'axios'



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
    handleStateColumnsData(col, dat) {
        this.setState({ columns: col, data: dat })
    }

    isNumber(n) {
        n = n.replace(/\./g, '').replace(',', '.');
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // handle file upload
    handleFileUpload = e => {
        e.preventDefault();
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("/api/json", formData)
            .then(res => {
                const parsedUserData = JSON.parse(res.data.json)
                let columnsName = [];
                for (let name in parsedUserData[1]) {
                    columnsName.push({
                        "name": name,
                        "selector": name
                    })
                }
                
                this.setState({ userAdvices: parsedUserData })
                this.handleStateColumnsData(columnsName, parsedUserData);
                this.props.sendJSON(parsedUserData, columnsName, file);
            })
    }

    handleFileUpload2 = e => {
        e.preventDefault();
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("/api/test", formData)
            .then(res => {
                console.log(res)
            })
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
