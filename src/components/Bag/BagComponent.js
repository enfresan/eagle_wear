import React, { useState } from 'react';
import { Flex, Collapse, Rate, Row, Col, Drawer, Image, Divider, Typography, Button, InputNumber, message } from 'antd';
import '../../styles/Bag.css';
import { connect } from 'react-redux';

const Bag = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [count, setCount] = useState(1);

    const success = () => {
        messageApi.open({
        type: 'success',
        content: 'Se ha agrado a la bolsa: ' + count + ' ' + props.productSelected.title,
        });
    };

    const info = () => {
        messageApi.open({
          type: 'info',
          content: 'Es necesario añadir al menos un producto para agregarlo a la bolsa',
        });
      };

    const onChangeInputNum = (value) => { setCount(value); };

    const onAddBag = () => {
        let listLocal = props.allProductsBagList;
        listLocal.forEach(product => {
            if(product.id === props.productSelected.id){
                if(count > 0){
                    product.countBag += count;
                    success();
                } else {
                    info();
                }
            }
        });

        props.onUpdateListBag(listLocal);
    };

    return (<>
    {contextHolder}
    { props.productSelected && 
        <Drawer className='form-login' title={props.productSelected.title} placement={'right'} width={900} onClose={() => props.onCloseDrawer(false)} open={props.drawerOpenBag}>
            <Row justify={'space-evenly'} gutter={[8,8]}>
                <Col span={10}>
                    <Flex justify='center' align='center' gap="middle" horizontal>
                        <Image className='img-wrapper' alt={props.productSelected.title} src={props.productSelected.image} />
                    </Flex>
                </Col>

                <Col span={14}>
                    <Collapse size='small' bordered={false} defaultActiveKey={['2']}  items={[ {  key: '1', label: 'Descripción', children: <Typography.Paragraph> <Typography.Text>{props.productSelected.description}</Typography.Text>  <Divider /> <Typography.Text type="secondary" italic>Código del Producto: {props.productSelected.id}</Typography.Text> </Typography.Paragraph>,  }, 
                        {  key: '2', label: 'Agregar a mi bolsa', children: 
                            <Row justify={'space-between'}> 
                                <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                                    <Typography.Text>Cantidad: </Typography.Text>
                                    <InputNumber min={1} defaultValue={1} onChange={onChangeInputNum} />
                                </Flex>

                                <Button type='primary' onClick={onAddBag}>Agregar</Button>
                            </Row>,  }, ]}
                    />
                </Col>

                <Divider />
            </Row>

            <Row justify={'space-between'}>
                <Typography.Title level={3} style={{color:'red'}}>{'$ ' + parseFloat(props.productSelected.price).toFixed(2)}</Typography.Title>
            
                <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                    <Rate disabled allowHalf defaultValue={props.productSelected.rating.rate} style={{fontSize:12}}/> 
                    <Typography.Text>{props.productSelected.rating.count}</Typography.Text>
                </Flex>
            </Row>
        </Drawer>
    }
    </>);
}

const mapStateToProps = (state) => {
    return {
        productSelected: state.ProductsReducer.productSelected,
        drawerOpenBag: state.ProductsReducer.drawerOpenBag,
        allProductsBagList: state.ProductsReducer.allProductsBagList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDrawer: () => {
            dispatch({ type: 'DRAWER_BAG', drawerOpenBag: false  });
        },
        onUpdateListBag: (allProductsBagList) => {
            dispatch({ type: 'UPDATE_BAG_PRODUCTS', allProductsBagList });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bag);

