import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from "react";
import Colors from '../../../../../components/UI/colors'


export default class DropDownColors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "Couleur", //Nom des dropdown par défaut, modifié si une valeur est séléctionnée (à faire)
      highlightColor: this.props.highlightColor, //Valeur utilisée pour pour sauvegarder la couleur a surligner car couleur actuelle de la ligne
      colors: Colors, //Tableau JSON de toutes les couleurs
      activeLine: this.props.activeLine, //Nom de la ligne correspondant au dropdown
    };

    //On bind la fonction handleChange pour qu'elle comprenne le contexte lorsqu'elle est passé en paramètres
    this.handleChange = this.handleChange.bind(this);

  }

  //Fonction appellée lorsqu'un item est selectionné dans un dropdown
  //Change le nom de la case (à faire) et appelle la fonction changeColor du composant LinearChart
  handleChange(event) {
    this.setState({
      selected: event.target.id
    });
    this.props.changeColor(this.state.activeLine, event.target.id);
  }


  render() {
    let items = null; //Liste des items du dropdown généré plus bas

    //Génération des items du dropdown
    items = Object.keys(this.state.colors)
      .map(key => {
        let toReturn = null;
        if (this.state.colors[key].name !== null) {
          //Si la couleur qu'on ajoute est celle de la ligne, on la place comme active
          if (this.state.colors[key].code === this.state.highlightColor) {
            toReturn =  (
              <Dropdown.Item key={this.state.colors[key].name} id={this.state.colors[key].name} onClick={this.handleChange} active >
                {this.state.colors[key].name}
              </Dropdown.Item>
            )
          }
          //Sinon, on retourne un item par nom de couleur
          else {
            toReturn = (
              <Dropdown.Item key={this.state.colors[key].name} id={this.state.colors[key].name} onClick={this.handleChange}>
                {this.state.colors[key].name}
              </Dropdown.Item>
            )
          }

        }
        return toReturn;
      })

    return (
      <DropdownButton id="dropdown-basic-button" title={this.state.selected}>
        {items}
      </DropdownButton>
    );
  }

}

