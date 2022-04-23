import React, { Fragment } from 'react';
import Header from '../../../components/header';
import logoImage from '../../../assets/images/logo.png'
import { Card, Column, Container, Section, Title } from 'rbx';
import '../../../styles/auth.scss'
import RegisterForm from '../../../components/auth/register/form'

const Register = () => (
    <>
        <Header />
        <Section size="medium" className="auth">
            <Container>
                <Column.Group centered>
                    <Column size={3}>
                        <Card>
                            <Card.Content>
                                <Section>
                                    <Column.Group centered>
                                        <Column size={12}>
                                            <img src={logoImage} alt="" />
                                        </Column>
                                    </Column.Group>

                                    <Column.Group>
                                        <Column size={12}>
                                            <Title size={6} className="has-text-grey has-text-centered">
                                                Your notes on the cloud
                                            </Title>
                                        </Column>
                                    </Column.Group>

                                    <RegisterForm />
                                </Section>
                            </Card.Content>
                        </Card>
                    </Column>
                </Column.Group>
            </Container>
        </Section>
    </>
);

export default Register;