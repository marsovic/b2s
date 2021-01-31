import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import SettingsTable from '../LayoutComponent/SettingsTable'



class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({
      modalShow: true
    });
  }
  hideModal() {
    this.setState({
      modalShow: false
    })
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={() => this.showModal()}> Réglages </Button>

        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={this.state.modalShow} onHide={this.hideModal} centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Réglages
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <SettingsTable lines={this.props.lines} data={this.props.data} updateLinesFuntion={this.props.updateLinesFuntion} displayedLines={
                  this.props.displayedLines} changeColor={this.props.changeColor} />
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.hideModal()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>

    );

  }


}

export default Settings;
