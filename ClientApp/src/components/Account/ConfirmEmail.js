﻿import React, { Component } from "react";
import { Container } from "reactstrap";

export class ConfirmEmail extends Component {
    displayName = ConfirmEmail.name;

    constructor(props) {
        super(props);
        const p = window.location.toString();
        this.state = {
            succeeded: false,
            loading: true,
            errors: []
        };
        const param = p.substring(p.indexOf('?'));
        fetch('/Account/ConfirmEmailAsync' + param, { method: 'GET', credentials: "same-origin" })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    succeeded: data.succeeded,
                    loading: false,
                    errors: data.succeeded ? [] : data.errors
                });
                if (this.state.succeeded)
                    this.props.updateStatus();
            }).catch(() => this.setState({ succeeded: false, loading: false, errors: ['发生未知错误'] }));
    }

    render() {
        let result = this.state.loading ? <p>正在验证...</p> :
            this.state.succeeded ? <div>
                <p className="text-success">已成功验证邮箱，感谢使用</p>
            </div>
                : <div>
                    <p className="text-danger">邮箱验证失败</p>
                    <ul>
                        {this.state.errors.map(x => <li><small>{x}</small></li>)}
                    </ul>
                </div>;
        return (
            <Container>
                <br />
                <h2>验证邮箱</h2>
                {result}
            </Container>
        );
    }
}