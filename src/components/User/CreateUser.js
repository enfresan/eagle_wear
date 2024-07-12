import React, { useState } from 'react';
import { Form, Input, Row, Col, Drawer, Divider, Button } from 'antd';
import '../../styles/Login.css';
import { LockOutlined, NumberOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { City, CityOne, EditName, Mail, MapDraw, PhoneCall, UserBusiness, Zip } from '@icon-park/react';

const layout = { labelCol: { span: 24 }, wrapperCol: { span: 24 }, };

const CreateUser = (props) => {
    const [form] = Form.useForm();
    // const [passwordBool, setPasswordBool] = useState(true);
    // const [validatePassBool, setValidatePassBool] = useState(true);
    const onFinish = (values) => { props.onCreateUser(values); };

    if (props.cleanForm && props.cleanForm === 'crear-usuario') {
        form.resetFields();
        props.onCleanForm();
    }

    return (
        <Drawer className='form-login' title='Crear Usuario' placement={'right'} width={600} onClose={() => props.onCloseCreateDrawer()} open={props.drawerCreateUserOpen}>
            <Form {...layout} form={form} initialValues={{ remember: true }} onFinish={onFinish}>
                <Row justify="space-evenly" gutter={[8, 8]}>
                    <Divider orientation='left'>Datos Generales</Divider>

                    <Col span={12}>
                        <Form.Item name='email' rules={[{ required: true, message: 'Favor de utilizar un correo válido', type: 'email' }]}>
                            <Input prefix={<Mail />} placeholder='Correo' variant="filled" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name='username' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input prefix={<UserBusiness />} placeholder='Nombre de usuario' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name='firstname' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input prefix={<EditName />} placeholder='Nombre' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name='lastname' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input prefix={<EditName />} placeholder='Apellido' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Divider orientation='left'>Dirección</Divider>

                    <Col span={8}>
                        <Form.Item name='city' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input prefix={<CityOne />} placeholder='Ciudad' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Col span={10}>
                        <Form.Item name='street' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input prefix={<City />} placeholder='Calle' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name='number' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input prefix={<NumberOutlined />} placeholder='Número' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name='zipcode' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input maxLength={5} prefix={<Zip />} placeholder='Código postal' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name='lat' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input prefix={<MapDraw />} placeholder='Latitud' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name='long' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input prefix={<MapDraw />} placeholder='Longuitud' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name='phone' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input maxLength={10} prefix={<PhoneCall />} placeholder='Telefono' variant="filled"/>
                        </Form.Item>
                    </Col>

                    <Divider orientation='left'>Contraseña</Divider>

                    <Col span={12}>
                        <Form.Item name='password' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder='Ingresa tu contraseña'/>
                        </Form.Item>
                    </Col>

                    {/* <Col span={12}>
                        <Form.Item name='passwordConfirmed' rules={[{ required: true, message: 'Favor de llenar el campo' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder='Confirma tu contraseña'/>
                        </Form.Item>
                    </Col> */}

                    <Col span={12}>
                        <Button style={{ width: "100%" }} type="primary" htmlType='submit' loading={props.fetchingCreateUser} className='button-login'>
                            Crear
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
}

const mapStateToProps = (state) => {
    return {
        drawerCreateUserOpen: state.LoginReducer.drawerCreateUserOpen,
        cleanForm: state.LoginReducer.cleanForm,
        fetchingCreateUser: state.LoginReducer.fetchingCreateUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseCreateDrawer: () => {
            dispatch({ type: 'DRAWER_CREATE_USER', drawerCreateUserOpen: false });
        },
        onCreateUser: (form) => {
            dispatch({ type: 'CREATE_USER_REQUEST', form });
        },
        onCleanForm: () => {
            dispatch({ type: 'CLEAN_FORM', cleanForm: false });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

