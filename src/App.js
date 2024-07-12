import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import reactLogo from './assets/images/react.svg'
import spsLogo from './assets/images/SPSLogo.svg'
import './styles/App.css'
import logo from './assets/images/logo-vertical.svg'
import {Layout, Row, Col, Button, Image, Affix, Typography, Flex} from 'antd'
import { ShoppingOutlined, LoginOutlined } from '@ant-design/icons';

import LoginForm from './components/Login/LoginForm';
import ContentComponent from './components/Content/ContentComponent';
import Bag from './components/Bag/BagDetail'

const { Header, Content, Footer } = Layout;

const App = (props) => {
  console.log('props :>> ', props);
  const dispatch = useDispatch();
  useEffect(() => {
    if(props.allProductsList) if (!props.allProductsList[0]) dispatch({ type: 'GET_ALL_PRODUCTS_REQUEST' });
  }, [props]);

  const onBag = () => {
    let listWithProducts = [];
    props.allProductsBagList.forEach(product => {
      if(product.countBag > 0){
        listWithProducts.push(product)
      }
    });
    props.onOpenBag(listWithProducts)
  };

  return ( 
    <>
      <Layout className='app-layout'>
        <Affix offsetTop={0.01}>
          <Header>
            <Row justify={'space-between'} gutter={[0,0]}>
              <Col className="demo-logo" xs={14} sm={8} md={5} lg={3} xl={3} xxl={3} >
                <Image preview={false} src={logo} />
              </Col>
              <Col xs={10} sm={10} md={4} lg={4} xl={3} xxl={3} style={{paddingTop:'.5em'}}>
                <Button type='link' onClick={onBag}>
                  <ShoppingOutlined style={{ fontSize:'1.5em' }}/>
                </Button>

                { props.isAuthenticated ? 
                  <Typography.Text>{props.usuario}</Typography.Text>
                : 
                <Button type='link' onClick={() => props.onOpenDrawer()}>
                  <LoginOutlined style={{ fontSize:'1.5em' }}/>
                </Button> }
              </Col>
            </Row>
          </Header>
        </Affix>
        <Content className='app-content'>
            <ContentComponent />
        </Content>
        <Footer style={{ textAlign: 'center'}} >
          <Row justify={'space-between'}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
              <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                <Typography.Text style={{paddingBottom:'1em'}}>Ant Design ©{new Date().getFullYear()} Created by me</Typography.Text>
              </Flex>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
              <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                <div className='footer-logos'>
                  <a href="https://spsolutions.com.mx/" target="_blank">
                    <img src={spsLogo} className="logo" alt="SPS logo" />
                  </a>
                  <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                  </a>
                </div>
              </Flex>
            </Col>
          </Row>
        </Footer>
      </Layout>
      <Bag />
      <LoginForm />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.LoginReducer.isAuthenticated,
      usuario: state.LoginReducer.usuario,
      allProductsList: state.ProductsReducer.allProductsList,
      allProductsBagList: state.ProductsReducer.allProductsBagList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onOpenDrawer: () => {
        dispatch({ type: 'DRAWER_LOGIN', drawerOpen: true });
      },
      onOpenBag: (listWithProducts) => {
        dispatch({ type: 'DRAWER_BAG_DETAIL', drawerOpenBagDetail: true, listWithProducts });
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);