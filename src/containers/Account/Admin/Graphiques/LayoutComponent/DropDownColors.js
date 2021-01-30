import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import React, { Component, useState } from "react";
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Colors from '../../../../../components/UI/colors'


export default class DropDownColors extends Component{

    constructor(props) {
        super(props);
        this.state = {
          selected: "Couleur",
          highlightColor : this.props.highlightColor,
          colors : Colors,
          activeLine : this.props.activeLine,
          items : null,
        };
       
        this.handleChange = this.handleChange.bind(this);


        this.state.items = Object.keys(this.state.colors)
                .map(key => { 
                  if(this.state.colors[key].name !== null){
                    //console.log("HIGHLIGHT COLOR", this.state.highlightColor)
                    //console.log("COLORD CODE", this.state.colors[key].code)
                        //Si la couleur qu'on ajoute est celle de la ligne, on la place comme active
                        if(this.state.colors[key].code === this.state.highlightColor){
                          //this.state.selected = this.state.colors[key].name;
                          return (
                            <Dropdown.Item key = {this.state.colors[key].name} id={this.state.colors[key].name} onClick={this.handleChange} active >
                              {this.state.colors[key].name}
                            </Dropdown.Item>    
                          )
                        }
                        else{
                          return (
                            <Dropdown.Item key = {this.state.colors[key].name} id={this.state.colors[key].name} onClick={this.handleChange}>
                              {this.state.colors[key].name}
                            </Dropdown.Item>    
                          )
                        }

                  }
                   
                    
                })
  
       
    }
  
    handleChange(event){
      console.log("EVENT",event.target.id)
      this.setState({
        selected: event.target.id
      });
      console.log("WTF",event.target.id)

      this.props.changeColor(this.state.activeLine,event.target.id);

    }

  /*  handleChangeCheckbox = (event) => {
      console.log("TARGET NAME",event.target.id.toString())
      this.props.updateLinesFuntion(event.target.id.toString(), event.target.checked)
    
    }*/

    render(){
      let lines = null;
      let items = null;

      items = Object.keys(this.state.colors)
                .map(key => { 
                  if(this.state.colors[key].name !== null){
                    //console.log("HIGHLIGHT COLOR", this.state.highlightColor)
                    //console.log("COLORD CODE", this.state.colors[key].code)
                        //Si la couleur qu'on ajoute est celle de la ligne, on la place comme active
                        if(this.state.colors[key].code === this.state.highlightColor){
                          //this.state.selected = this.state.colors[key].name;
                          return (
                            <Dropdown.Item key = {this.state.colors[key].name} id={this.state.colors[key].name} onClick={this.handleChange} active >
                              {this.state.colors[key].name}
                            </Dropdown.Item>    
                          )
                        }
                        else{
                          return (
                            <Dropdown.Item key = {this.state.colors[key].name} id={this.state.colors[key].name} onClick={this.handleChange}>
                              {this.state.colors[key].name}
                            </Dropdown.Item>    
                          )
                        }

                  }
                   
                    
                })
      /*data = Object.keys(this.state.data)
                .map(key => {

                    if(this.state.data[key].name !== null){
                        return (

                          <Dropdown.Item id = {this.state.data[key].name} onClick={this.handleChange}>{this.state.data[key].name}</Dropdown.Item> 
    
                            )
            
                    }
                    
                })*/
    
        return(
        <DropdownButton id="dropdown-basic-button" title={this.state.selected}>  
           {this.state.items}
          </DropdownButton>
      );
    }

}
  
