import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import React, { Component, useState } from "react";
import Form from 'react-bootstrap/Form'

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

const ColumnName1 = "Red";
const ColumnName2 = "Blue";
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

  export default class DropDownList extends Component{

    constructor(props) {
        super(props);
        this.state = {
          selected: "Changer donnée",
          data : this.props.data,
        };
  
        this.handleChange = this.handleChange.bind(this);
       
    }
  
    handleChange(event){
      console.log(event)
      this.setState({
        selected: event.target.id
      });
    }

    handleChangeCheckbox = (event) => {
      console.log("TARGET NAME",event.target.id.toString())
      this.props.updateLinesFuntion(event.target.id.toString(), event.target.checked)
    
    }

    render(){
      let data = null;
      let items = null;

      items = Object.keys(this.state.data)
                .map(key => { 
                  for(let i in this.props.displayedLines){
                    if(this.state.data[key].name !== null){
                      if(this.state.data[key].name === this.props.displayedLines[i].name){
                        return (
                          <Form.Check key = {this.props.displayedLines[i].name} id={this.state.data[key].name} label={this.state.data[key].name} onChange={this.handleChangeCheckbox} checked={this.props.displayedLines[i].displayed}/>    
                            )
                      }

                      
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
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              {this.state.selected}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
            
                {items}
            
            </Dropdown.Menu>
          </Dropdown>
      );
    }

}
  
