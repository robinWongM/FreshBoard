﻿import React, { Component } from "react";
import { Container, FormGroup, Label, Input, Form, Button } from "reactstrap";
import { SearchUsers } from "./SearchUsers";
import { FormPost } from "../../../utils/HttpRequest";

export class ApplyManager extends Component {
    displayName = ApplyManager.name

    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };
        this.saveApply = this.saveApply.bind(this);
    }

    saveApply() {
        var form = document.getElementById('applyForm');
        if (form.reportValidity()) {
            this.setState({ disabled: true });
            FormPost('/Admin/ModifyApplyStatusAsync', form)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        disabled: false
                    });
                    if (data.succeeded) {
                        alert('保存成功');
                    }
                    else {
                        alert(data.message);
                        this.setState({
                            disabled: false
                        });
                    }
                })
                .catch(() => {
                    alert('发生未知错误');
                    this.setState({
                        disabled: false
                    });
                });
        }
    }

    render() {
        return (
            <Container>
                <br />
                <h2>申请管理</h2>
                <Form id='applyForm'>
                    <FormGroup>
                        <Label>用户 Id</Label>
                        <Input name='userId' type='text' required />
                    </FormGroup>
                    <FormGroup>
                        <Label>新录取状态</Label>&nbsp;
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <Input type="radio" name="status" id="apply0" value="0" defaultChecked />暂无
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <Input type="radio" name="status" id="apply1" value="1" />等待一面
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <Input type="radio" name="status" id="apply2" value="2" />等待二面
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <Input type="radio" name="status" id="apply3" value="3" />录取失败
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <Input type="radio" name="status" id="apply4" value="4" />录取成功
                            </label>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <Input type="checkbox" name="requireResponse" id="requireResponse" />要求短信回执
                            </label>
                        </div>
                    </FormGroup>
                    <br />
                    <h4>成员信息搜索</h4>
                    <SearchUsers />
                    <br />
                    <p><Button className="float-right" color="primary" onClick={this.saveApply} disabled={this.state.disabled}>保存</Button></p>
                </Form>
                <br />
            </Container>
        );
    }
}