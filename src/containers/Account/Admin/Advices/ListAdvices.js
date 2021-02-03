import React, { Component } from "react";

import Aux from "../../../../hoc/Aux/Aux"

//COMPOSANTS MAISON
import Circuits from "./Circuits"

class ListAdvices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '',
            dataObtained: false,
            columnsName: this.props.listColumns,
            data: this.props.fullData,
            schema: this.props.schema,
            advices: this.props.advices,
            circuits: null
        }
    }

    render() {
        return (
            <Aux >
                <Circuits columnsName={this.state.columnsName} data={this.state.data} schema={this.state.schema} advices={this.state.advices} />
            </Aux>
        )
    }
}

export default ListAdvices;