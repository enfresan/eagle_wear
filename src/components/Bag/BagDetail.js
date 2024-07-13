import React, { useState } from 'react';
import { Col, Drawer, List, Space, Image, Flex, Typography, InputNumber, Button, Empty, Popconfirm, message} from 'antd';
import { StarOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../styles/Bag.css';
import { connect } from 'react-redux';
import { Dollar } from '@icon-park/react';
import LoginDrawer from '../Login/LoginForm';

const BagDetail = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [filteredProducts, setFilteredProducts] = useState(undefined);
    const [total, setTotal] = useState(undefined);
    const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
    );

    const deleteItem = (id) => {
        // Remove item from array
        let filteredArray = props.listWithProducts.filter(function(e) { return e.id !== id });
        let allProductsBagListLocal = props.allProductsBagList;
        let totalLocal = 0;
        let totalItemsLocal = props.totalItems;
        filteredArray.forEach(element => { totalLocal += element.price * element.countBag; });
        setFilteredProducts(filteredArray);
        setTotal(totalLocal);
        allProductsBagListLocal.forEach(element => { 
            if(element.id === id) {
                totalItemsLocal -= element.countBag;
                element.countBag = 0 
            }
        });
        props.onUpdateItems(totalItemsLocal);
        props.onUpdate(allProductsBagListLocal, filteredArray, totalLocal);
    };

    const onCloseDrawer = () => {
        props.onCloseDrawer(false);
        // props.onUpdate(props.allProductsBagList, filteredProducts ? filteredProducts : props.listWithProducts, total ? total : props.total);
        setFilteredProducts(undefined);
        setTotal(undefined);
    };

    const info = () => { messageApi.open({  type: 'success', content: 'Iniciar proceso de compra', });  };

    return (<>
        {contextHolder}
        {props.listWithProducts &&
        <Drawer title={"Mi Bolsa"} placement={'right'} width={600} onClose={onCloseDrawer} open={props.drawerOpenBagDetail} style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_361591-4356.jpg?w=740&t=st=1720820083~exp=1720820683~hmac=1211c45b7d2920fca5cfefd09f57b1c150194eeec4b27381ce0194840abe8563")' }}
            footer={<>
                { props.listWithProducts[0] ? (
                <Flex justify='space-between' align='center' gap="middle" horizontal>
                    <Col style={{paddingTop:'2em'}}>
                    <Button type='primary' onClick={ () => { !props.isAuthenticated ? props.onOpenLoginDrawer() : info() } }>Comprar</Button>
                    </Col>

                    <Typography.Title level={4}> Total: $ {parseFloat(total ? total : props.total).toFixed(2)} </Typography.Title>
                </Flex>  ) : false }
            </>}
        >
            { props.listWithProducts[0] ? (
                <List
                itemLayout="vertical"
                size="large"
                dataSource={filteredProducts ? filteredProducts : props.listWithProducts}
                 renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                                <IconText icon={StarOutlined} text={item.rating.rate} key="list-vertical-star-o" />
                                <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                                    <Typography.Text></Typography.Text>
                                    <InputNumber disabled min={1} defaultValue={item.countBag} />
                                </Flex>
                                
                                <IconText icon={Dollar} text={(item.countBag * item.price).toFixed(2)} key="list-vertical-star-o" />

                                <Popconfirm
                                    title="Borrar producto"
                                    description="¿Estás seguro que quieres borrar el artículo?"
                                    onConfirm={() => deleteItem(item.id)}
                                    okText="Sí"
                                    cancelText="No"
                                >
                                    <Button><DeleteOutlined/></Button>
                                </Popconfirm>
                            </Flex>
                        ]}
                        extra={
                        <Image
                            preview={false} style={{maxHeight:180, maxWidth:130, borderRadius:'12px'}}
                            alt={item.title}
                            src={ item.image }
                        />
                        }
                    >
                        <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={<Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'más'}}> {item.description} </Typography.Paragraph>}
                        />
                        {item.content}
                    </List.Item>
                    )}
                />
            ): 
            <Flex justify='center' align='center' gap="middle" vertical style={{paddingTop:'14em'}}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Aún no hay productos en tu bolsa'/>
            </Flex>
            }
        </Drawer>}
        <LoginDrawer />
    </>);
}

const mapStateToProps = (state) => {
    return {
        drawerOpenBagDetail: state.ProductsReducer.drawerOpenBagDetail,
        allProductsBagList: state.ProductsReducer.allProductsBagList,
        listWithProducts: state.ProductsReducer.listWithProducts,
        total: state.ProductsReducer.total,
        isAuthenticated: state.LoginReducer.isAuthenticated,
        totalItems: state.ProductsReducer.totalItems
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDrawer: () => {
            dispatch({ type: 'DRAWER_BAG_DETAIL', drawerOpenBagDetail: false  });
        },
        onUpdate: (allProductsBagList, listWithProducts, total) => {
            dispatch({ type: 'UPDATE_BAG_PRODUCTS', allProductsBagList, listWithProducts, total });
        }, 
        onOpenLoginDrawer: () => {
            dispatch({ type: 'DRAWER_LOGIN', drawerOpen: true });
        },
        onUpdateItems: (totalItems) => {
            dispatch({ type: 'TOTAL_ITEMS', totalItems });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BagDetail);

