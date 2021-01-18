import React, { Component } from "react";
import axios from "axios";

import Spinner from "../../../UI/Spinner/Spinner";
import styles from '../Users.module.css';

class ListUsers extends Component {

    state = {
            loading: true,
            users: null
        }
    

    componentDidMount() {
        let url = "https://parseapi.back4app.com/users";

        const options = {
            headers: {
                "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
                "X-Parse-REST-API-Key":  process.env.REACT_APP_API_KEY,
                "X-Parse-Revocable-Session": 1,
                "Content-Type": "application/json",
            }
        };

        axios
            .get(url, options)
            .then((res) => {
                this.setState({ users: res.data.results, loading: false })
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    render() {
        
        let listUsers = null;
        let style = "";

        if (this.state.loading === false) {
            if (this.state.users !== null) {
                style = styles.List;
                listUsers = Object.keys(this.state.users)
                    .map(key => {
                        return [...Array(this.state.users[key])].map((_, i) => {
                            if( this.state.users[key].right === "admin" ||
                                this.state.users[key].right === "client" ||
                                this.state.users[key].right === "admin")
                                return (
                                    <li key={key + 1} onClick={(event) => {
                                        event.preventDefault()
                                        this.props.modal(true, this.state.users[key]) 
                                    }
                                    }>
                                        <p>{this.state.users[key].username}</p>
                                        <p> {this.state.users[key].right}</p>
                                    </li>
                                )
                        })
                    })
            }
        } else {
            listUsers = <Spinner />
            style = styles.Spinner;
        }
        return (
            <div className={style}>
                <ul>
                    {listUsers}
                </ul>
            </div>
        );
    }
}

export default ListUsers;