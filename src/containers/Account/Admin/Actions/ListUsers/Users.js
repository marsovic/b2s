import React, { Component } from "react";
import axios from "axios";

import Spinner from "../../../../../components/UI/Spinner/Spinner";
import styles from "./Users.module.css";

class Users extends Component {
    state = {
        loading: true,
        customers: null,
    };

    componentDidMount() {
        axios
            .get(
                "https://batisphere-services-default-rtdb.europe-west1.firebasedatabase.app/customers.json"
            )
            .then((res) => {
                this.setState({ customers: res.data });
                console.log(res.data);
                this.setState({ loading: false });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    render() {
        let listCustomers = null;
        let styling = "";

        if (this.state.loading === false) {
            if (this.state.customers !== null) {
                listCustomers = Object.keys(this.state.customers).map((igKey) => {
                    return [...Array(this.state.customers[igKey])].map((_, i) => {
                        return (
                            <div key={igKey} className={styles.line}>
                                <div className={styles.element}>{igKey}</div>
                                <div className={styles.element}>{this.state.customers[igKey]}</div>
                            </div>
                        );
                    });
                });
            }
            styling = "styles.box";
        } else {
            styling= "styles.spinner";
            listCustomers = <Spinner />;
        }
        return (
            <div className={styling}>
                {listCustomers}
            </div>
        );
    }
}

export default Users;
