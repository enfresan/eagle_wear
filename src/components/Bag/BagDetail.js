import React, { useState } from 'react';
import { Row, Col, Drawer, List, Space, Image, Flex, Typography, InputNumber, Button, Empty, Link, Popconfirm } from 'antd';
import { StarOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../styles/Bag.css';
import { connect } from 'react-redux';

const BagDetail = (props) => {
    const [filteredProducts, setFilteredProducts] = useState(props.listWithProducts);
    const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
    );

    const deleteItem = (id) => {
        console.log('item :>> ', id);

        // Remove item from array
        let filteredArray = props.listWithProducts.filter(function(e) { return e.id !== id })
        setFilteredProducts(filteredArray);
        // props.onUpdate(filteredArray);
    };

    return (<>
        {props.listWithProducts &&
        <Drawer className='form-login' title={"Mi Bolsa"} placement={'right'} width={600} onClose={() => props.onCloseDrawer(false, props.listWithProducts)} open={props.drawerOpenBagDetail}>
            { props.listWithProducts[0] ? (
                <List
                itemLayout="vertical"
                size="large"
                dataSource={props.listWithProducts}
                footer={
                    <Row justify={'end'}>
                        <Button type='primary'>Comprar</Button>
                    </Row>
                }
                 renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                                <IconText icon={StarOutlined} text={item.rating.rate} key="list-vertical-star-o" />,
                                <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                                    <Typography.Text></Typography.Text>
                                    <InputNumber min={1} defaultValue={item.countBag} />
                                </Flex>,
                                <Popconfirm
                                    title="Borrar producto"
                                    description="¿Estás seguro que quieres borrar el artículo?"
                                    onConfirm={() => deleteItem(item.id)}
                                    okText="Sí"
                                    cancelText="No"
                                >
                                    <Button disabled><DeleteOutlined/></Button>
                                </Popconfirm>
                            </Flex>
                        ]}
                        extra={
                        <Image
                            preview={false} style={{maxHeight:180, maxWidth:130}}
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
    </>);
}

const mapStateToProps = (state) => {
    return {
        drawerOpenBagDetail: state.ProductsReducer.drawerOpenBagDetail,
        allProductsBagList: state.ProductsReducer.allProductsBagList,
        listWithProducts: state.ProductsReducer.listWithProducts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDrawer: (listWithProducts) => {
            dispatch({ type: 'DRAWER_BAG_DETAIL', drawerOpenBagDetail: false, listWithProducts  });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BagDetail);

