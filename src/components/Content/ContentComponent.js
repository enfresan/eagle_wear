import React, { useState } from 'react';
import { Flex, Rate, Row, Col, Card, theme, Image, Typography, Badge, Pagination, Divider, Segmented, Avatar, Skeleton } from 'antd';
import '../../styles/Content.css';
import { connect } from 'react-redux';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { AllApplication, ClothesSuit, DiamondRing, FullDressLonguette, PlugOne } from '@icon-park/react';
import Bag from '../Bag/BagComponent';

const { Meta } = Card;

const Content = (props) => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [category, setCategory] = useState(undefined);
    const [sort, setSort] = useState(undefined);

    const onChangePage = (current) => { setPage(current) };

    const onShowSizeChange = (current, pageSizeLocal) => { setPageSize(pageSizeLocal);  setPage(current); props.onGetAllProducts(pageSizeLocal, sort); setCategory(undefined) };

    const onCategorySelected = (value) =>  { if(value) { props.onGetProductosByCategory(value); setCategory(value); setSort('asc') } else { props.onGetAllProducts(pageSize, sort); setCategory(undefined) } };

    const onChangeSort = (order) => { props.onGetAllProducts(pageSize, order); setSort(order); };

    return (<>
        <Row className='select-category' gutter={[8,8]} justify={'space-evenly'} style={{ borderRadius: borderRadiusLG, padding:'1em',}}>
            <Col xs={0} sm={0}  md={14} lg={16} xl={16} xxl={16}/>
            <Col span={24}>
                <Row justify={'space-evenly'} gutter={[8,8]}>
                    <Col xs={7} sm={4}  md={4} lg={4} xl={4} xxl={4} className={category === "men's clothing" ? 'segment-category-selected' : 'segment-category'} onClick={() => onCategorySelected("men's clothing")}>
                        <Avatar className='bounce-in-top' size="large" style={{ backgroundColor: 'red',  }} icon={<ClothesSuit />}  /> <Divider/>  <Typography.Title level={5} style={{paddingTop:'1em'}}>Ropa para hombre</Typography.Title>
                    </Col>
                    <Col xs={7} sm={4}  md={4} lg={4} xl={4} xxl={4} onClick={() => onCategorySelected("jewelery")} className={category === "jewelery" ? 'segment-category-selected' : 'segment-category '}>
                        <Avatar className='bounce-in-top-1' size="large" style={{ backgroundColor: 'red',  }} icon={<DiamondRing />}  /> <Divider/>  <Typography.Title level={5}  style={{paddingTop:'1em'}}>Joyería</Typography.Title >
                    </Col>
                    <Col xs={7} sm={4}  md={4} lg={4} xl={4} xxl={4} className={category === "electronics" ? 'segment-category-selected' : 'segment-category '} onClick={() => onCategorySelected("electronics")}>
                        <Avatar className='bounce-in-top-2' size="large" style={{ backgroundColor: 'red',  }} icon={<PlugOne />} /> <Divider/> <Typography.Title level={5}  style={{paddingTop:'1em'}}>Electrónica</Typography.Title >
                    </Col>
                    <Col xs={7} sm={4}  md={4} lg={4} xl={4} xxl={4} className={category === "women's clothing" ? 'segment-category-selected' : 'segment-category'} onClick={() => onCategorySelected("women's clothing")}>
                        <Avatar className='bounce-in-top-3' size="large" style={{ backgroundColor: 'red',  }} icon={<FullDressLonguette />}  /> <Divider/> <Typography.Title level={5}  style={{paddingTop:'1em'}}>Ropa para mujer</Typography.Title >
                    </Col>
                    <Col xs={7} sm={4}  md={4} lg={4} xl={4} xxl={4} className={category === undefined ? 'segment-category-selected' : 'segment-category '} onClick={() => onCategorySelected(undefined)}>
                        <Avatar className='bounce-in-top-4' size="large" style={{ backgroundColor: 'red',  }} icon={<AllApplication />}  /> <Divider/> <Typography.Title level={5}  style={{paddingTop:'1em'}}>Mostrar todas</Typography.Title >
                    </Col>
                </Row>
            </Col>
        </Row>
        <br />
    
        <Row className='content-container' gutter={[8,8]} justify={'end'} style={{ background: colorBgContainer, borderRadius: borderRadiusLG, }}>

            <Col xs={12} sm={12} md={4} lg={4} xl={3} xxl={3}>
                <Segmented
                    disabled={category}
                    value={sort}
                    options={[
                    { label: 'ASC', value: 'asc', icon: <ArrowUpOutlined />, }, { label: 'DESC', value: 'desc', icon: <ArrowDownOutlined />, }, ]}
                    onChange={(value) => onChangeSort(value)}
                />
            </Col>

            <Divider />

            {props.fetchingGetAllProducts ?  <Skeleton active /> : <> {props.allProductsList && ( <>
                { props.allProductsList.map((product) => (
                    <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={4}>
                        <Skeleton loading={props.fetchingGetAllProducts} active size='large'>
                            <Badge.Ribbon text={'$ ' + parseFloat(product.price).toFixed(2)}>
                                <Card
                                    className='card-content'
                                    cover={ <Image preview={false} style={{height:300, width: 250}} className='image-products' alt={product.title} src={product.image} />  }
                                    actions={[
                                        <Flex justify='space-evenly' align='center' gap="middle" horizontal>
                                            <Rate disabled allowHalf defaultValue={product.rating.rate} style={{fontSize:12}}/> 
                                            <Typography.Text style={{ fontSize: 10 }}>{product.rating.count}</Typography.Text>
                                        </Flex>,
                                        <Typography.Text type="secondary" italic style={{ fontSize: 10 }}>Código del Producto: {product.id}</Typography.Text>,
                                        // <Button onClick={() => onAddBag(product)}>Agregar a mi bolsa</Button>
                                    ]}
                                    onClick={() => props.onOpenBag(product)}
                                >
                                    <Meta
                                        title={<Typography.Link onClick={() => props.onOpenBag(product)}> {product.title} </Typography.Link> }
                                        // description={ <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'más'}}> {product.description} </Typography.Paragraph> }
                                    />
                                </Card>
                            </Badge.Ribbon>
                        </Skeleton>
                    </Col>
                ))}
            </>  )} </> }
                

            <Divider />

            <Pagination defaultCurrent={page} total={props.countAllProducts} pageSize={pageSize} onChange={onChangePage} showSizeChanger onShowSizeChange={onShowSizeChange}/>
        </Row>
        <Bag/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        allProductsList: state.ProductsReducer.allProductsList,
        drawerOpen: state.LoginReducer.drawerOpen,
        countAllProducts: state.ProductsReducer.countAllProducts,
        fetchingGetAllProducts: state.ProductsReducer.fetchingGetAllProducts,
        allProductsBagList: state.ProductsReducer.allProductsBagList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDrawer: () => {
            dispatch({ type: 'DRAWER_LOGIN', drawerOpen: false });
        },
        onGetProductosByCategory: (category) => {
            dispatch({ type: 'GET_PRODUCTS_BY_CATEGORY_REQUEST', category });
        },
        onGetAllProducts: (limit, sort) => {
            dispatch({ type: 'GET_ALL_PRODUCTS_REQUEST', limit, sort });
        },
        onOpenBag: (productSelected) => {
            dispatch({ type: 'DRAWER_BAG', drawerOpenBag: true, productSelected });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);

