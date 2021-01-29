import React, { Component,useState,PureComponent} from "react";
import {
  Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,Legend,ResponsiveContainer
} from 'recharts';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import "bootstrap/dist/css/bootstrap.min.css";
import Settings from '../ChartSettings/LinearChartSettings';
import CSV from '../../../../../components/CSV/processingCSV';
import Colors from '../../../../../components/UI/colors'

//import Data from '../data'

//const data = Data.importCsv("/Users/louiscauquelin/Downloads/data.csv");

//const data = null;
/*
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
];*/



//fonction pour zoom

class LinearChart extends Component{
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

    constructor(props) {
      super(props);
      this.state = {
        data: this.props.data,
        columns : this.props.columns,
        displayedColumns : [],

        
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
        lines : null,
      }

      //Lines initialisation
      this.state.lines = Object.keys(this.state.columns)
      .map(key => {

          switch(parseInt(key)){
              case 0:
              console.log("case 0", this.state.columns[key].name)
              this.state.XAxisName = this.state.columns[key].name.toString()
               
              break;

              case 1 :
              break;

              default:
              /*console.log("this.state.columns[key].name = ")
              console.log(this.state.columns[key].name)
              console.log("cpt")
              console.log(key)*/

              if(this.state.columns[key].name !== null){
                this.state.displayedColumns.push({"name":this.state.columns[key].name.toString(), "displayed":true})
                  return (
                      <Line key={key} type="natural" dataKey={this.state.columns[key].name.toString()} stroke={Colors[key-2].code} dot={false} />
                      )
              }

              break;


          }
          
      })

this.state.lines.splice(0,1);
//console.log("before update", tab);

this.updateDisplayedLines = this.updateDisplayedLines.bind(this);


    }



updateDisplayedLines(name,displayed){

    console.log("name",name)
    console.log("displayed",displayed)
    //Variable pour savoir si une ligne marquée comme affichée est absente des lignes affichée (auquel cas on la créée)
    let toDisplay = true;
    let tab = this.state.displayedColumns;
    let tabLines = this.state.lines;
//On rempli d'abord le tableau des lignes affichées
        for(let i = 0; i<tab.length; i++){
            if(tab[i].name === name ){
                tab[i].displayed = displayed
            }

        }
//Puis on update les lignes affichées avec le tableau
        for(let i = 0; i<tab.length; i++){

            //Si la ligne n'est pas affichée, on supprime la ligne qui a le même nom si elle est présente dans le tableau
            if(tab[i].displayed === false ){
                for(let j = 0; j<tabLines.length; j++){
                if(typeof(tabLines[j]) !== 'undefined' && typeof(tab[i]) !== 'undefined'){
                    if(tab[i].name === tabLines[j].props.dataKey ){
                        tabLines.splice(j,1);
                    }
                }
                    
                }
            }
            //Si la ligne marquée pour l'affichage , on vérifie si si elle l'est déjà, sinon on l'ajoute aux lignes
            if(tab[i].displayed === true ){
                for(let j = 0; j<tabLines.length; j++){
                    if(typeof(tabLines[j]) !== 'undefined' && typeof(tab[i]) !== 'undefined'){

                        if(tab[i].name === tabLines[j].props.dataKey ){
                            toDisplay = false;
                        }
                    }
                }

                if(toDisplay===true){
                    console.log("tab[i].name.toString()",tab[i].name.toString())
                    console.log("KEY",parseInt(tabLines.length)+i)
                    tabLines.push(<Line key={parseInt(tabLines.length)+i} type="natural" dataKey={tab[i].name.toString()} stroke={Colors[2].code} dot={false} />)
                }

                if(toDisplay === false){
                    toDisplay = true;
                }

            }
        }
        const { data } = this.state;
        this.setState({
            displayedColumns: tab,
            lines: tabLines,
            data: data.slice(),
        });

    
        

    }

    render() {

    
    //this.updateDisplayedLines("Cpt_gaz",true)
console.log(this.state.lines)
    return(
   
    <div style={{ width: '90%', height: 600 }}>
     
    <Settings data = {this.state.columns} updateLinesFuntion = {this.updateDisplayedLines} displayedLines = {this.state.displayedColumns}/>
    <ResponsiveContainer>
        <LineChart 
                
                width={this.state.graphWidth} 
                height={this.state.graphHeight} 
                data={this.state.data}>
                    <CartesianGrid strokeDasharray={this.state.dashArray} />
                    <XAxis  dataKey={this.state.XAxisName}/>
                    <YAxis />
                    {this.state.lines}
                    <Tooltip />
                    <Legend height={60} />
                </LineChart>
    </ResponsiveContainer>    
   </div>
    );
    
  }
  
  }
  
  export default LinearChart;