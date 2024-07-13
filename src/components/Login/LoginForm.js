import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Drawer, Image, Result, Typography, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import logoEagle from '../../assets/images/logo.svg';
import CreateUser from '../User/CreateUser';
import { SmileOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const Login = (props) => {
    const onFinish = (values) => {
        props.onRequestLogin(values);
    };

    const resetPassword = (e) => {  props.onAbrirModal(); };

    return (
        <Drawer style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_361591-4356.jpg?w=740&t=st=1720820083~exp=1720820683~hmac=1211c45b7d2920fca5cfefd09f57b1c150194eeec4b27381ce0194840abe8563")' }} title={props.isAuthenticated ? 'Bienvenido' : 'Ingresar'} placement={'right'} width={600} onClose={() => props.onCloseDrawer(false)} open={props.drawerOpen}>
            {!props.isAuthenticated ? 
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
            :
                <Flex justify='center' align='center' gap="middle" horizontal style={{paddingTop:'8em'}}>
                    <Result
                        icon={<SmileOutlined />}
                        title={"Hola " + props.usuario}
                        extra={<Button type="primary" onClick={() => props.onLogout()} loading={props.fetchingLogout}>Salir</Button>}
                    />
                </Flex>
            }
            <CreateUser />
        </Drawer>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchingLogin: state.LoginReducer.fetchingLogin,
        fetchingLogout: state.LoginReducer.fetchingLogout,
        usuario: state.LoginReducer.usuario,
        isAuthenticated: state.LoginReducer.isAuthenticated,
        drawerOpen: state.LoginReducer.drawerOpen,
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
        onLogout:() => {
            dispatch({ type: 'LOG_OUT_REQUEST' });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

