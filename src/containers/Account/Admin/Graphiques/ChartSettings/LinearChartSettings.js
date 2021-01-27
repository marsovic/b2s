import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import DropDownlist from '../LayoutComponent/DropDownList'


function LinearSettings(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Réglages
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>

          <Row>
            <DropDownlist data = {this.props.data} />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



class Settings extends Component{
    
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
  hideModal(){
    this.setState({
      modalShow: false
    })
  }

    render() {
      return (
<>
      <Button variant="primary" onClick={() => this.showModal()}>
        Launch vertically centered modal
      </Button>

      <LinearSettings
        show={this.state.modalShow}
        onHide={() => this.hideModal()}
      />
    </>        );
      
    }


}

export default Settings;
