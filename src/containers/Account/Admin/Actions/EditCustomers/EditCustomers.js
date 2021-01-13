import React, { Component } from "react";
import axios from "axios";

import Spinner from "../../../../../components/UI/Spinner/Spinner";

class EditCustomers extends Component {
    state = {
        loading: true,
        customers: null
    }

    componentDidMount() {
        axios.get("https://batisphere-services-default-rtdb.europe-west1.firebasedatabase.app/customers.json")
            .then(res => {
                this.setState({ customers: res.data })
                console.log(res.data)
                this.setState({loading: false})
            })
            .catch( err => {
                console.log(err);
                this.setState({loading: false})
            })
    }

    render() {

        let listCustomers = null;

        if (this.state.loading === false) {
            if (this.state.customers !== null) {
                listCustomers = Object.keys(this.state.customers)
                    .map(igKey => {
                        return [...Array(this.state.customers[igKey])].map((_, i) => {
                            return <p key={igKey + 1}> {igKey} {i} </p>
                        });
                    })
            }
        } else {
            listCustomers = <Spinner />
        }
        return (

            <div>
                <ul>
                    {listCustomers}
                </ul>
            </div>


        );
    }
}

export default EditCustomers;