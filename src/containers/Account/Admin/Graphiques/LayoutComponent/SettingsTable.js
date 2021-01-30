import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import React, { Component, useState } from "react";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'
import DropDownColors from './DropDownColors'


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </Button>
));


// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

  export default class SettingsTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
          selected: "Changer donnée",
          data : this.props.data,
          item : null
        };
         
    }


    handleChangeCheckbox = (event) => {
      //console.log("TARGET NAME",event.target.id.toString())
      this.props.updateLinesFuntion(event.target.id.toString(), event.target.checked)
    
    }

    //Retourne la couleur en hex de la ligne passée en paramètres
    getHighlightedColor(name){
      let color="";
      for(let i in this.props.lines){

        if(typeof(this.props.lines[i]) !== 'undefined'){
          //console.log(this.props.lines[i].props)

          if(this.props.lines[i].key === name){
            color = this.props.lines[i].props.stroke;
          }
        }
      }

      return color;
    }

    render(){
      let items = null;
      let highlightColor = "";

      //Création des lignes affichées
      //Pour chaque colonne
      items = Object.keys(this.state.data)
                .map(key => { 
                  //On parcours le tableau de référence d'affichage des lignes pour savoir lesquelles sont déjà affichées et donc lesquelles doivent être cochées 
                  for(let i in this.props.displayedLines){
                    //Si la valeur du tableau de colonnes n'est pas null
                    if(this.state.data[key].name !== null){
                      //si on trouve la même ligne dans les deux tableaux, on peut créé l'objet en entrant dans la valeur checked de la checkbox le bolléen d'affichage
                      if(this.state.data[key].name === this.props.displayedLines[i].name){
                        //console.log("get highlight",this.getHighlightedColor(this.state.data[key].name))
                        return (
                          <tr>
                            <td> <Form.Check key = {this.props.displayedLines[i].name} id={this.state.data[key].name} onChange={this.handleChangeCheckbox} checked={this.props.displayedLines[i].displayed}/> </td>
                            <td>{this.state.data[key].name}</td>
                            <td><DropDownColors highlightColor = {this.getHighlightedColor(this.state.data[key].name)} changeColor = { this.props.changeColor} activeLine = {this.state.data[key].name}/></td>
                          </tr>
                            
                            )
                      }

                      
                    }
                  }
                   
                    
                })
      
        return(
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
  
