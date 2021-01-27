import React, { Component,useState,PureComponent} from "react";
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,Legend
} from 'recharts';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import "bootstrap/dist/css/bootstrap.min.css";
import Settings from '../ChartSettings/LinearChartSettings';
import CSV from '../../../../../components/CSV/processingCSV'

//import Data from '../data'

//const data = Data.importCsv("/Users/louiscauquelin/Downloads/data.csv");

//const data = null;

const data = [
    { name: 1, cost: 4.11, impression: 100 },
    { name: 2, cost: 2.39, impression: 120 },
    { name: 3, cost: 1.37, impression: 150 },
    { name: 4, cost: 1.16, impression: 180 },
    { name: 5, cost: 2.29, impression: 200 },
    { name: 6, cost: 3, impression: 499 },
    { name: 7, cost: 0.53, impression: 50 },
    { name: 8, cost: 2.52, impression: 100 },
    { name: 9, cost: 1.79, impression: 200 },
    { name: 10, cost: 2.94, impression: 222},
    { name: 11, cost: 4.3, impression: 210 },
    { name: 12, cost: 4.41, impression: 300 },
    { name: 13, cost: 2.1, impression: 50 },
    { name: 14, cost: 8, impression: 190 },
    { name: 15, cost: 0, impression: 300 },
    { name: 16, cost: 9, impression: 400 },
    { name: 17, cost: 3, impression: 200 },
    { name: 18, cost: 2, impression: 50 },
    { name: 19, cost: 3, impression: 100 },
    { name: 20, cost: 7, impression: 100 }
];



//fonction pour zoom

class LinearChart extends PureComponent{
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

    constructor(props) {
      super(props);
      this.state = {
        data: this.props.data,
        columns : this.props.columns,
        left: 'dataMin',
        right: 'dataMax',
        refAreaLeft: '',
        refAreaRight: '',
        top: 'dataMax+1',
        bottom: 'dataMin-1',
        top2: 'dataMax+20',
        bottom2: 'dataMin-20',
        animation: true,
        dropDownLeft : "15 min",
        dropDownRight : "1 mois",
         //Variables pour otpions des graphiques
    
        //Distance pointillés grille
        dashArrayXSpace : 3,
        dashArrayYSpace : 3,
        //dashArray : dashArrayXSpace.toString() + " " + dashArrayYSpace.toString(),
        dashArray : "3 3",
        //Longueur et largeur du graph
        graphWidth : 900,
        graphHeight : 400,
        
        //Nom axe abscisse (mettre le nom du keyword dans le tableau de données)
        XAxisName : "name",
        
        //Nom axe ordonnée (mettre le nom du keyword dans le tableau de données)
        YAxisName : "",
      }
  
  
    }

    getAxisYDomain = (from, to, ref, offset) => {
        const refData = this.state.data.slice(from - 1, to);
        let [bottom, top] = [refData[0][ref], refData[0][ref]];
        refData.forEach((d) => {
          if (d[ref] > top) top = d[ref];
          if (d[ref] < bottom) bottom = d[ref];
        });
      
        return [(bottom | 0) - offset, (top | 0) + offset];
      };
      
    
   
    

    zoom() {
        let { refAreaLeft, refAreaRight, data } = this.state;

        if (refAreaLeft === refAreaRight || refAreaRight === '') {
        this.setState(() => ({
            refAreaLeft: '',
            refAreaRight: '',
        }));
        return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

        // yAxis domain
        const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'C', 1);
        const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'D', 50);

        this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
        data: data.slice(),
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top,
        bottom2,
        top2,
        }));
    }

    zoomOut() {
        const { data } = this.state;
        this.setState(() => ({
          data: data.slice(),
          refAreaLeft: '',
          refAreaRight: '',
          left: 'dataMin',
          right: 'dataMax',
          top: 'dataMax+1',
          bottom: 'dataMin',
          top2: 'dataMax+50',
          bottom2: 'dataMin+50',
        }));
      }


      
  
    //Line type --> courbes (monotone) ou traits droits (rien)
  render() {

    let lines = null;
    console.log(this.state.data);
    lines = Object.keys(this.state.columns)
                .map(key => {

                    switch(parseInt(key)){
                        case 0:
                        console.log("case 0", this.state.columns[key].name)

                        this.setState({
                            XAxisName: this.state.columns[key].name
                          });
                        break;

                        case 1 :
                        break;

                        default:
                        console.log("this.state.columns[key].name = ")
                        console.log(this.state.columns[key].name)
                        console.log("cpt")
                        console.log(key)

                        if(this.state.columns[key].name !== null){
                            return (

                                <Line key={key + 1} type="natural" dataKey={this.state.columns[key].name} stroke="#8884d8" animationDuration={300} />
        
                                )
                        }

                        break;


                    }
                    
                })

  
    return(
    
    <Container fluid>
        <Row>
            <Col>
            <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>
        
                <Button variant="secondary" onClick={this.zoomOut.bind(this)}>
                    Dézoomer
                </Button>
                
                </div>
            </Col>
        <Col>
            <Settings data = {this.state.columns} /></Col>
        </Row>
        
        <Row style={{marginTop: 15}}>
        <LineChart 
                width={this.state.graphWidth} 
                height={this.state.graphHeight} 
                data={this.state.data}
                onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
                onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
                onMouseUp={this.zoom.bind(this)}>
                    <CartesianGrid strokeDasharray={this.state.dashArray} />
                    <XAxis allowDataOverflow dataKey={this.state.XAxisName} domain={[this.state.left, this.state.right]} type="number"/>
                    <YAxis orientation="left" allowDataOverflow domain={[this.state.bottom, this.state.top]} type="number" yAxisId="1"/>
                    <YAxis
                        orientation="right"
                        allowDataOverflow
                        domain={[this.state.bottom2, this.state.top2]}
                        type="number"
                        yAxisId="2"
                    />
                    <Tooltip />
                    <Legend />
                    {lines}
                    {
                        (this.state.refAreaLeft && this.state.refAreaRight) ? (
                        <ReferenceArea yAxisId="1" x1={this.state.refAreaLeft} x2={this.state.refAreaRight} strokeOpacity={0.3} />) : null
                        }
                </LineChart>
                </Row>


                <Row style={{marginTop: 15}}>

                

                </Row>

    </Container>    
   
    );
    
  }
  
  }
  
  export default LinearChart;