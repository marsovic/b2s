import React, { Component } from "react";

import Aux from "../../../../hoc/Aux/Aux"

//BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
import LinearChart from '../Graphiques/LinearChart/LinearChart';
import Line from "recharts";
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table'
import advicesJson from './advices.json'

//COMPOSANTS MAISON
import Circuits from "./Circuits"

//TEST
import data from "./TESTdata.json"

class ListAdvices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '',
            dataObtained: false,
            columnsName: this.props.listColumns,
            data: this.props.fullData,
            schema: this.props.schema,
            advices: advicesJson,
            circuits: null
        }
    }





    render() {

        //console.log("full data", this.state.data)
        //console.log("advices", this.state.advices)
        console.log("schema", this.state.schema)
        //console.log("columnsName", this.state.columnsName)    

        return (
            <Aux >
            <Circuits columnsName = {this.state.columnsName} data = {this.state.data} schema = {this.state.schema} advices = {this.state.advices}/>
            </Aux>
        )
//            <LinearChart data={this.state.data} columns={this.state.columnsName} refAreaLeft="12/2/20" refAreaRight="12/3/20"/>

        /* return (
             <Aux >
                 <LinearChart data={this.state.data} columns={this.state.columnsName} />
             </Aux>
         )*/

    }
}

export default ListAdvices;