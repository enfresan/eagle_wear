import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Drawer, Image, Divider, Typography, Flex } from 'antd';
import '../../styles/Login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import logoEagle from '../../assets/images/logo.svg';
import CreateUser from '../User/CreateUser';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const Login = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);
        props.onRequestLogin(values);
    };

    const resetPassword = (e) => {  props.onAbrirModal(); };

    return (
        <Drawer className='form-login' title='Ingresar' placement={'right'} width={600} onClose={() => props.onCloseDrawer(false)} open={props.drawerOpen}>
            <Row justify={'space-evenly'}>
                <Col span={24} style={{paddingTop:'5em'}}>
                    <Flex justify='center' align='center' gap="middle" horizontal>
                        <Image preview={false} src={logoEagle} />
                    </Flex>
                </Col>

                <Col span={18}>
                    <Form {...layout} name='login' initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item name='userName' rules={[{ required: true, message: 'Favor de utilizar un correo válido' }]}>
                            <Input prefix={<UserOutlined />} placeholder='Ingresa el usuario' variant="filled"/>
                        </Form.Item>

                        <Form.Item name='password' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder='Ingresa contraseña' variant="filled"/>
                        </Form.Item>

                        <Row justify='end' gutter={[8,8]}>
                        {/* <Typography.Paragraph>
                            <Typography.Text>
                                ¿Olvidaste tu contraseña?
                            </Typography.Text>
                            <Typography.Link  onClick={() => props.onAbrirModal()}> Recupérala </Typography.Link>
                        </Typography.Paragraph> */}

                            <Col span={24}>
                                <Button style={{ width: "100%" }} type="primary" htmlType='submit' loading={props.fetchingLogin} className='button-login'>
                                    Ingresar
                                </Button>
                            </Col>

                            <Col span={24}>
                                <Button style={{ width: "100%" }} onClick={() => props.onOpenCreateDrawer()} className='button-login'>
                                    Crear cuenta
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <CreateUser />
        </Drawer>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingLogin: state.LoginReducer.fetchingLogin,
        usuario: state.LoginReducer.usuario,
        errorLogin: state.LoginReducer.errorLogin,
        drawerOpen: state.LoginReducer.drawerOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestLogin: (loginInfo) => {
            dispatch({ type: 'LOGIN_API_CALL_REQUEST', loginInfo: loginInfo });
        },
        onAbrirModal: () => {
            dispatch({ type: 'MODAL_RESET_PASSWORD', showModalReset: true });
        },
        onCloseDrawer: () => {
            dispatch({ type: 'DRAWER_LOGIN', drawerOpen: false });
        },
        onOpenCreateDrawer: () => {
            dispatch({ type: 'DRAWER_CREATE_USER', drawerCreateUserOpen: true });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

