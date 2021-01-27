import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import React, { Component, useState } from "react";

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
        };
  
        this.handleChange = this.handleChange.bind(this);
       
    }
  
    handleChange(event){
      console.log(event)
      this.setState({
        selected: event.target.id
      });
    }

    render(){
        return(
          <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
            {this.state.selected}
          </Dropdown.Toggle>
      
          <Dropdown.Menu as={CustomMenu} >
            <Dropdown.Item id = {ColumnName1} onClick={this.handleChange}>{ColumnName1}</Dropdown.Item>
            <Dropdown.Item id = {ColumnName2} onClick={this.handleChange}>{ColumnName2}</Dropdown.Item>
            <Dropdown.Item onClick={this.handleChange}>
              Orange
            </Dropdown.Item>
            <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

}
  
