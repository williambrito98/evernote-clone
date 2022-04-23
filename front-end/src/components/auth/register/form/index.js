import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Navigate } from "react-router-dom";
import UserService from '../../../../services/users';

function RegisterForm() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);

    if (redirectToLogin) {
        return <Navigate replace to="/login" />
    }

    const HandleSubmit = async (event) => {
        event.preventDefault()


        try {
            const user = await UserService.regsiter({ name, email, password })
            return setRedirectToLogin(true)
        } catch (error) {
            return setError(true)
        }
    }


    return (
        <Fragment>
            <Column.Group centered>
                <form onSubmit={HandleSubmit} >
                    <Column size={12}>
                        <Field>
                            <Label size="small">Name:</Label>
                            <Control>
                                <Input
                                    type="name"
                                    required
                                    name="name"
                                    onChange={e => setName(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Email:</Label>
                            <Control>
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Password:</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column>
                                        <a className="button is-white has-text-custom-purple" onClick={e => setRedirectToLogin(true)}>Login or</a>
                                    </Column>
                                    <Column>
                                        <Button color="custom-purple" outlined>Register</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>
                        {error && <Help color="danger">Email or Password invalid</Help>}
                    </Column>
                </form>
            </Column.Group>
        </Fragment >
    )
}

export default RegisterForm;