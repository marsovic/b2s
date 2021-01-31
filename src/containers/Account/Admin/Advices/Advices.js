import React, { Component } from "react";

import Aux from "../../../../hoc/Aux/Aux"
import LinearChart from '../../Admin/Graphiques/LinearChart/LinearChart';
import CSV from '../../../../components/CSV/processingCSV'

class Advices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataObtained: false,
            columnsName: null,
            data: null,
        }
    }

    loadData = (data1, data2) => {
        this.setState({
            dataObtained: true,
            columnsName: data1,
            data: data2,
        });
    }


    render() {

        if (this.state.dataObtained === true) {

            return (
                <Aux >
                    <LinearChart data={this.state.data} columns={this.state.columnsName} />
                </Aux>
            )
        }

        else {
            return (
                <Aux >
                    <CSV sendJSON={this.loadData} />
                </Aux>
            )
        }
    }
}

export default Advices;