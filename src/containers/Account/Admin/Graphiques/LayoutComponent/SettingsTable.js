import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import DropDownColors from './DropDownColors'


export default class SettingsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "Changer donnée",
      data: this.props.data,
      item: null
    };

  }

  handleChangeCheckbox = (event) => {
    this.props.updateLinesFuntion(event.target.id.toString(), event.target.checked)
  }

  //Retourne la couleur en hex de la ligne passée en paramètres
  getHighlightedColor(name) {
    let color = "";
    for (let i in this.props.lines) {
      if (typeof (this.props.lines[i]) !== 'undefined' && this.props.lines[i] !== null) {
        if (this.props.lines[i].key === name) {
          color = this.props.lines[i].props.stroke;
        }
      }
    }
    return color;
  }

  render() {
    let items = null;

    //Création des lignes affichées
    //Pour chaque colonne
    items = Object.keys(this.state.data)
      .map(key => {
        let toReturn = null;
        //On parcours le tableau de référence d'affichage des lignes pour savoir lesquelles sont déjà affichées et donc lesquelles doivent être cochées 
        for (let i in this.props.displayedLines) {
          //Si la valeur du tableau de colonnes n'est pas null
          if (this.state.data[key].name !== null) {
            //si on trouve la même ligne dans les deux tableaux, on peut créé l'objet en entrant dans la valeur checked de la checkbox le bolléen d'affichage
            if (this.state.data[key].name === this.props.displayedLines[i].name) {
              toReturn = (
                <tr key={this.props.displayedLines[i].name}>
                  <td> <Form.Check key={this.props.displayedLines[i].name} id={this.state.data[key].name} onChange={this.handleChangeCheckbox} checked={this.props.displayedLines[i].displayed} /> </td>
                  <td>{this.state.data[key].name}</td>
                  <td><DropDownColors key={this.props.displayedLines[i].name} highlightColor={this.getHighlightedColor(this.state.data[key].name)} changeColor={this.props.changeColor} activeLine={this.state.data[key].name} /></td>
                </tr>
              )
            }
          }
        }
        return toReturn;
      })

    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Affichée</th>
            <th>Donnée</th>
            <th>Couleur</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    );
  }

}

