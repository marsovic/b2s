import React, { Component } from "react";
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import "bootstrap/dist/css/bootstrap.min.css";
import Settings from '../ChartSettings/LinearChartSettings';
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

class LinearChart extends Component {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            columns: this.props.columns,
            displayedColumns: [],
            keys: [],
            maxLine: 150,
            colors: Colors,


            //VARIBALES ZOOM
            /*left: 'dataMin',
            right: 'dataMax',
            refAreaLeft: '',
            refAreaRight: '',
            top: 'dataMax+1',
            bottom: 'dataMin-1',
            top2: 'dataMax+20',
            bottom2: 'dataMin-20',
            animation: true,
            dropDownLeft : "15 min",
            dropDownRight : "1 mois",*/


            //Variables pour otpions des graphiques

            //Distance pointillés grille
            dashArrayXSpace: 3,
            dashArrayYSpace: 3,
            dashArray: "3 3",

            //Longueur et largeur du graph
            graphWidth: 900,
            graphHeight: 400,

            //Nom axe abscisse (mettre le nom du keyword dans le tableau de données)
            XAxisName: "name",

            //Nom axe ordonnée (mettre le nom du keyword dans le tableau de données)
            YAxisName: "",
            lines: null,
        }

        //Lines initialisation
        this.state.lines = Object.keys(this.state.columns)
            .map(key => {
                let toReturn = null;
                switch (parseInt(key)) {
                    case 0:
                        this.state.XAxisName = this.state.columns[key].name.toString()

                        break;

                    case 1:
                        break;

                    default:
                        if (this.state.columns[key].name !== null) {

                            let color;
                            let colorsCopy = this.state.colors;
                            let iterator = 0;
                            let found = false;

                            while (iterator < colorsCopy.length && found === false) {

                                if (colorsCopy[iterator].used === false) {

                                    colorsCopy[iterator].used = true;
                                    colorsCopy[iterator].line = this.state.columns[key].name;
                                    found = true;
                                    color = colorsCopy[iterator].code;
                                }

                                iterator++;
                            }

                            this.state.displayedColumns.push({ "name": this.state.columns[key].name.toString(), "displayed": true })
                            toReturn = (
                                <Line key={this.state.columns[key].name.toString()} type="natural" dataKey={this.state.columns[key].name.toString()} stroke={color} dot={false} />
                            )
                            // this.state.colors = colorsCopy;
                        }
                        break;
                }
                return toReturn;
            })
        this.state.lines.splice(0, 1);

        this.updateDisplayedLines = this.updateDisplayedLines.bind(this);
        this.changeColor = this.changeColor.bind(this);

    }


    /*
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
    
    
        //A AJOUTER DANS LE RENDER
    
                        onMouseDown={e => this.setState({ refAreaLeft: e.activeTooltipIndex })}
                    onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeTooltipIndex })}
                    onMouseUp={this.zoom.bind(this)}
    
    
         
                        {
                            (this.state.refAreaLeft && this.state.refAreaRight) ? (
                            <ReferenceArea x1={this.state.refAreaLeft} x2={this.state.refAreaRight} strokeOpacity={0.3} />) : null
                        }
    }*/

    deleteColor(name) {
        let colorsCopy = this.state.colors; 
        let colorDeleted;
        let tabLines = this.state.lines;
        let secondLine = "";

        for (let iterator in colorsCopy) {
            if (name === colorsCopy[iterator].line) {
                colorsCopy[iterator].used = false;
                colorsCopy[iterator].line = "";
                colorDeleted = colorsCopy[iterator].code;
            }
        }

        for (let i in tabLines) {
            if (typeof (tabLines[i]) !== 'undefined') {

                if (tabLines[i].props.stroke === colorDeleted) {
                    secondLine = tabLines[i].key;
                }
            }
        }

        if (secondLine !== "") {
            for (let iterator in colorsCopy) {
                if (colorDeleted === colorsCopy[iterator].code) {
                    colorsCopy[iterator].used = true;
                    colorsCopy[iterator].line = secondLine;
                }
            }
        }

        this.setState({
            colors: colorsCopy,
            data: this.state.data.slice(),
        });

    }

    generateColor(name) {

        let color;
        let colorsCopy = this.state.colors;
        let iterator = 0;
        let found = false;

        while (iterator < colorsCopy.length && found === false) {

            if (colorsCopy[iterator].used === false) {

                colorsCopy[iterator].used = true;
                colorsCopy[iterator].line = name;
                found = true;
                color = colorsCopy[iterator].code;
            }

            iterator++;
        }
        this.setState({
            colors: colorsCopy
        });
        return color;
    }

    changeColor(lineName, color) {
        let tabLines = this.state.lines;
        let colorsCopy = this.state.colors;
        let colorCode = "#fa4d56"; //couleur par défaut est rouge

        for (let iterator in colorsCopy) {
            //On récupère le code couleur de la couleur a attribuer
            if (color === colorsCopy[iterator].name) {
                colorCode = colorsCopy[iterator].code;
            }


        }

        //On cherche la ligne, on la supprime et recréée avec la bonne couleur (pas possible de modifier juste la variable stroke)
        //Suppression de la ligne entrain suppression de la couleur de cette ligne et réattribution de la couleur initiale de la ligne a une autre si elle est utilisée plusieurs fois 
        //On récrée une ligne avec la bonne couleur
        for (let i in tabLines) {
            if (typeof (tabLines[i]) !== 'undefined') {
                if (tabLines[i].key === lineName) {
                    //tabLines[i].props.stroke = color;
                    tabLines.splice(i, 1);
                    //Delete color va se charger de supprimer la ligne dans les couleurs et de changer de propriétaire la couleur si elle est utilisée par d'autres lignes
                    this.deleteColor(lineName);
                    tabLines.push(<Line key={lineName} type="natural" dataKey={lineName} stroke={colorCode} dot={false} />)
                }

            }
        }

        //On change les valeurs dans colors (pour référence des utilisations des couleurs)
        for (let iterator in colorsCopy) {
            //Si la nouvelle couleur n'était pas utilisée, on la marque comme tel avec le nom de la ligne associé
            if (colorsCopy[iterator].name === color && colorsCopy[iterator].used === false) {
                colorsCopy[iterator].used = true;
                colorsCopy[iterator].line = lineName;
            }
        }

        this.setState({
            colors: colorsCopy,
            lines: tabLines,
            data: this.state.data.slice(),
        });

    }

    updateDisplayedLines(name, displayed) {

        //Variable pour savoir si une ligne marquée comme affichée est absente des lignes affichée (auquel cas on la créée)
        let toDisplay = true;
        let tab = this.state.displayedColumns;
        let tabLines = this.state.lines;
        //On rempli d'abord le tableau des lignes affichées
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].name === name) {
                tab[i].displayed = displayed
            }

        }

        //Puis on update les lignes affichées avec le tableau
        for (let i = 0; i < tab.length; i++) {

            //SUPPRESSION
            //Si la ligne n'est pas affichée, on supprime la ligne qui a le même nom si elle est présente dans le tableau
            if (tab[i].displayed === false) {
                let lenghtLines = tabLines.length;
                for (let j = 0; j < lenghtLines; j++) {

                    if (typeof (tabLines[j]) !== 'undefined' && typeof (tab[i]) !== 'undefined') {
                        if (tab[i].name === tabLines[j].props.dataKey) {
                            tabLines.splice(j, 1);
                            this.deleteColor(tab[i].name);

                        }
                    }

                }
            }

            //AJOUT
            //Si la ligne marquée pour l'affichage , on vérifie si si elle l'est déjà, sinon on l'ajoute aux lignes
            if (tab[i].displayed === true) {
                for (let j = 0; j < tabLines.length; j++) {
                    if (typeof (tabLines[j]) !== 'undefined' && typeof (tab[i]) !== 'undefined') {

                        if (tab[i].name === tabLines[j].props.dataKey) {
                            toDisplay = false;
                        }
                    }
                }

                if (toDisplay === true) {

                    tabLines.push(<Line key={tab[i].name.toString()} type="natural" dataKey={tab[i].name.toString()} stroke={this.generateColor(tab[i].name.toString())} dot={false} />)

                }

                if (toDisplay === false) {
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

        return (

            <>
                <div>
                    <Settings lines={this.state.lines} data={this.state.columns} updateLinesFuntion={this.updateDisplayedLines} displayedLines={this.state.displayedColumns} changeColor={this.changeColor} />
                </div>

                <div style={{ width: '90%', height: 600, marginTop: 15 }}>

                    <ResponsiveContainer>
                        <LineChart

                            width={this.state.graphWidth}
                            height={this.state.graphHeight}
                            data={this.state.data}>
                            <CartesianGrid strokeDasharray={this.state.dashArray} />
                            <XAxis dataKey={this.state.XAxisName} />
                            <YAxis dataKey={this.state.YAxisName} />
                            {this.state.lines}
                            <Tooltip />
                            <Legend height={60} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </>
        );

    }

}

export default LinearChart;