import React, { Component } from "react";
import CSV from '../../../components/CSV/processingCSV'
import Logout from "../../../components/MyAccount/Logout/Logout";
import MyAccount from "../../../components/MyAccount/MyAccount";
import Chart1 from "./Charts/Chart1"
import Advices from "./Advices/Advices";


// Page affichée lorsqu'on est connecté  en tant que client
class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dataObtained: false,
          columnsName : null,
          data : null,
        };
    
    this.loadData = this.loadData.bind(this);

    }

    loadData(data1, data2) {
        //console.log(data1); // Show the names of the columns
        //console.log(data2); // Show data on each row 
        this.setState({
            dataObtained: true,
            columnsName : data1,
            data : data2,
          });
    }

    render() {
        if(this.state.dataObtained === true){
            return (
                <div style={{paddingTop: "52px"}}>
                    <MyAccount mode={this.props.mode}/>
                    <Advices />
                    <Logout loginOut={this.props.login}/>
                </div>
            );
        }

        else {

            return (
                <div style={{paddingTop: "52px"}}>
                    <MyAccount mode={this.props.mode}/>
                    <Advices />
                    <CSV sendJSON={this.loadData}/>
                    <Logout loginOut={this.props.login}/>
                </div>
                
            );
        }
        
        
    }
}

export default Account;