import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, Text, View,
    Image, FlatList, Dimensions, Pressable
} from 'react-native'
import { ProductContext } from '../ProductContext';

export default Home = (props) => {
    const { navigation } = props;

    const { onGetProductForHomePage } = useContext(ProductContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);
        const res = await onGetProductForHomePage();
        setData(res);
        setIsLoading(false);
        return () => {
            res;
        };
    }, []);


    const renderItem = ({ item }) => {
        const { name, products } = item;
        return (
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryName}>{name}</Text>

                <View style={styles.productsContainer} >
                    {
                        products.map(product => {
                            return (
                                <Pressable onPress={() => navigation.navigate('Detail', { id: product._id })} style={styles.product} key={product._id}>
                                    <View style={styles.productImageContainer}>
                                        <Image style={styles.productImage} resizeMode='cover'
                                            source={{ uri: product.images[0] }}></Image>
                                    </View>
                                    <View style={styles.productNameContainer}>
                                        <Text numberOfLines={1} style={styles.productName} >{product.name}</Text>
                                    </View>
                                    <View style={styles.productPriceContainer}>
                                        <Text style={styles.productPrice}>{product.price}đ</Text>
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </View>

            </View>

        )
    }

    const renderHeader = () => {
        return (
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode='cover'
                    source={require('../../../assets/images/baner2.jpg')}>
                </Image>
            </View>
        )
    }

    //hiển thị từng cái item
    return (
        <View style={styles.container}>
            {
                isLoading == true ?
                    <Text style={styles.text}>Đang tải dữ liệu</Text> :
                    <FlatList data={data}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={item => item._id}
                    />
            }
        </View>
    );
};


const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 30,
        justifyContent: 'space-between',
    },
    categoryName: {
        color: '#221F1F',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 34,
        marginTop: 24,
    },
    categoryContainer: {
        paddingHorizontal: 24,
    },
    product: {
        width: '46%',
        marginTop: 30,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    imageContainer: {
        width: '100%',
        height: 205,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productImageContainer: {
        height: 134,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
    },
    productNameContainer: {
        marginTop: 4,
    },
    productName: {
        fontSize: 16,
        color: '#221F1F',
        fontWeight: '500',
    },
    productPriceContainer: {

    },
    productPrice: {
        fontSize: 18,
        color: '#007537',
        fontWeight: '700',
    },


});

// var data = [
//     {
//         "_id": "61d11c4b86511f0016f490ed",
//         "name": "Phân bón dinh dưỡng",
//         "products": [
//             {
//                 "_id": "61d12f0c555401c8610fb8d1",
//                 "name": "Ambrosia ambrosioides (Cav.) Payne",
//                 "price": 1,
//                 "madein": "Indonesia",
//                 "quantity": 1547072375,
//                 "category": "61d11c4b86511f0016f490ed",
//                 "images": [
//                     "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                     "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//                 ],
//                 "sold": 100,
//                 "size": "XS",
//                 "createdAt": "2021-05-20T00:40:04.000Z",
//                 "updatedAt": "2021-02-15T15:54:50.000Z"
//             },
//             {
//                 "_id": "61d12f0c555401c8610fb8d2",
//                 "name": "Chamaedorea costaricana Oerst.",
//                 "price": 1,
//                 "madein": "Russia",
//                 "quantity": 4639830041,
//                 "category": "61d11c4b86511f0016f490ed",
//                 "images": [
//                     "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                     "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//                 ],
//                 "sold": 82,
//                 "size": "3XL",
//                 "createdAt": "2021-07-25T08:56:22.000Z",
//                 "updatedAt": "2021-08-21T13:12:26.000Z"
//             },
//             {
//                 "_id": "61d12f0c555401c8610fb8d3",
//                 "name": "Eucalyptus baxteri (Benth.) Maiden & Blakely ex J.M. Black",
//                 "price": 3,
//                 "madein": "Morocco",
//                 "quantity": 9770738275,
//                 "category": "61d11c4b86511f0016f490ed",
//                 "images": [
//                     "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                     "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//                 ],
//                 "sold": 72,
//                 "size": "XL",
//                 "createdAt": "2021-08-13T04:01:17.000Z",
//                 "updatedAt": "2021-09-17T15:08:23.000Z"
//             },
//             {
//                 "_id": "61d12f0c555401c8610fb8d4",
//                 "name": "Cakile edentula (Bigelow) Hook. ssp. edentula var. lacustris Fernald",
//                 "price": 1,
//                 "madein": "Venezuela",
//                 "quantity": 3590677389,
//                 "category": "61d11c4b86511f0016f490ed",
//                 "images": [
//                     "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                     "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//                 ],
//                 "sold": 98,
//                 "size": "XL",
//                 "createdAt": "2020-12-04T13:31:47.000Z",
//                 "updatedAt": "2021-05-13T11:00:25.000Z"
//             },
//             {
//                 "_id": "61d12f0c555401c8610fb8d5",
//                 "name": "Spiranthes ×folsomii P.M. Brown",
//                 "price": 3,
//                 "madein": "China",
//                 "quantity": 6865976454,
//                 "category": "61d11c4b86511f0016f490ed",
//                 "images": [
//                     "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                     "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//                 ],
//                 "sold": 77,
//                 "size": "L",
//                 "createdAt": "2021-07-27T12:19:46.000Z",
//                 "updatedAt": "2021-05-12T02:18:43.000Z"
//             },
//             {
//                 "_id": "61d12f0c555401c8610fb8d6",
//                 "name": "Platycerium superbum de Jonch. & Hennipman",
//                 "price": 1,
//                 "madein": "China",
//                 "quantity": 4215161331,
//                 "category": "61d11c4b86511f0016f490ed",
//                 "images": [
//                     "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                     "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//                 ],
//                 "sold": 63,
//                 "size": "3XL",
//                 "createdAt": "2021-09-13T12:02:02.000Z",
//                 "updatedAt": "2021-04-01T22:53:42.000Z"
//             }
//         ]
//     },
//     {
//         "_id": "61d11c2e86511f0016f490e4",
//         "name": "Chậu cảnh",
//         "products": [
//             {
//                 "_id": "61d12e94555401c8610ef8bb",
//                 "name": "Onosma L.",
//                 "price": 3,
//                 "madein": "Russia",
//                 "quantity": 6108684890,
//                 "category": "61d11c2e86511f0016f490e4",
//                 "images": [
//                     "https://2.pik.vn/2022767c344b-f95d-40ab-8e35-d40b5b2139c0.jpg",
//                     "https://2.pik.vn/20226a42a6d5-a09d-47fd-91f1-68c9de2fdc12.jpg"
//                 ],
//                 "sold": 77,
//                 "size": "XS",
//                 "createdAt": "2021-04-13T23:50:47.000Z",
//                 "updatedAt": "2021-10-10T22:29:38.000Z"
//             },
//             {
//                 "_id": "61d12e94555401c8610ef8bc",
//                 "name": "Mentzelia incisa Urb. & Gilg",
//                 "price": 1,
//                 "madein": "Indonesia",
//                 "quantity": 8591745443,
//                 "category": "61d11c2e86511f0016f490e4",
//                 "images": [
//                     "https://2.pik.vn/2022767c344b-f95d-40ab-8e35-d40b5b2139c0.jpg",
//                     "https://2.pik.vn/20226a42a6d5-a09d-47fd-91f1-68c9de2fdc12.jpg"
//                 ],
//                 "sold": 80,
//                 "size": "XS",
//                 "createdAt": "2021-10-22T23:01:50.000Z",
//                 "updatedAt": "2021-02-24T01:26:57.000Z"
//             },
//             {
//                 "_id": "61d12e94555401c8610ef8bd",
//                 "name": "Hemerocallis L.",
//                 "price": 2,
//                 "madein": "Greece",
//                 "quantity": 6062086995,
//                 "category": "61d11c2e86511f0016f490e4",
//                 "images": [
//                     "https://2.pik.vn/2022767c344b-f95d-40ab-8e35-d40b5b2139c0.jpg",
//                     "https://2.pik.vn/20226a42a6d5-a09d-47fd-91f1-68c9de2fdc12.jpg"
//                 ],
//                 "sold": 98,
//                 "size": "L",
//                 "createdAt": "2021-06-21T05:15:56.000Z",
//                 "updatedAt": "2021-12-02T07:31:11.000Z"
//             },
//             {
//                 "_id": "61d12e94555401c8610ef8be",
//                 "name": "Crepis bakeri Greene ssp. cusickii (Eastw.) Babc. & Stebbins",
//                 "price": 3,
//                 "madein": "Honduras",
//                 "quantity": 2841611276,
//                 "category": "61d11c2e86511f0016f490e4",
//                 "images": [
//                     "https://2.pik.vn/2022767c344b-f95d-40ab-8e35-d40b5b2139c0.jpg",
//                     "https://2.pik.vn/20226a42a6d5-a09d-47fd-91f1-68c9de2fdc12.jpg"
//                 ],
//                 "sold": 56,
//                 "size": "M",
//                 "createdAt": "2021-03-18T08:23:44.000Z",
//                 "updatedAt": "2021-03-23T12:07:07.000Z"
//             },
//             {
//                 "_id": "61d12e94555401c8610ef8bf",
//                 "name": "Deschampsia brevifolia R. Br.",
//                 "price": 3,
//                 "madein": "China",
//                 "quantity": 3051478257,
//                 "category": "61d11c2e86511f0016f490e4",
//                 "images": [
//                     "https://2.pik.vn/2022767c344b-f95d-40ab-8e35-d40b5b2139c0.jpg",
//                     "https://2.pik.vn/20226a42a6d5-a09d-47fd-91f1-68c9de2fdc12.jpg"
//                 ],
//                 "sold": 71,
//                 "size": "XL",
//                 "createdAt": "2021-09-14T12:25:27.000Z",
//                 "updatedAt": "2021-02-26T21:07:39.000Z"
//             },
//             {
//                 "_id": "61d12e94555401c8610ef8c0",
//                 "name": "Trichomanes kapplerianum Sturm",
//                 "price": 3,
//                 "madein": "China",
//                 "quantity": 4243487599,
//                 "category": "61d11c2e86511f0016f490e4",
//                 "images": [
//                     "https://2.pik.vn/2022767c344b-f95d-40ab-8e35-d40b5b2139c0.jpg",
//                     "https://2.pik.vn/20226a42a6d5-a09d-47fd-91f1-68c9de2fdc12.jpg"
//                 ],
//                 "sold": 69,
//                 "size": "2XL",
//                 "createdAt": "2021-10-22T12:17:00.000Z",
//                 "updatedAt": "2021-08-21T06:25:40.000Z"
//             }
//         ]
//     },
//     {
//         "_id": "61d11c1d86511f0016f490db",
//         "name": "Dụng cụ bảo hộ",
//         "products": [
//             {
//                 "_id": "61d12e06555401c8610e376a",
//                 "name": "Eryngium planum L.",
//                 "price": 1,
//                 "madein": "Russia",
//                 "quantity": 7910816549,
//                 "category": "61d11c1d86511f0016f490db",
//                 "images": [
//                     "https://2.pik.vn/20223888f64a-675e-40b3-a51c-7c848428f13d.jpg",
//                     "https://2.pik.vn/202284760130-1f9d-4e36-b04f-c6aa9808cab9.jpg"
//                 ],
//                 "sold": 52,
//                 "size": "3XL",
//                 "createdAt": "2021-03-05T07:43:19.000Z",
//                 "updatedAt": "2020-12-22T06:57:56.000Z"
//             },
//             {
//                 "_id": "61d12e06555401c8610e376b",
//                 "name": "Brassica oleracea L. var. gemmifera DC.",
//                 "price": 2,
//                 "madein": "China",
//                 "quantity": 1634576582,
//                 "category": "61d11c1d86511f0016f490db",
//                 "images": [
//                     "https://2.pik.vn/20223888f64a-675e-40b3-a51c-7c848428f13d.jpg",
//                     "https://2.pik.vn/202284760130-1f9d-4e36-b04f-c6aa9808cab9.jpg"
//                 ],
//                 "sold": 80,
//                 "size": "XL",
//                 "createdAt": "2021-02-12T06:21:23.000Z",
//                 "updatedAt": "2021-02-11T10:31:41.000Z"
//             },
//             {
//                 "_id": "61d12e06555401c8610e376c",
//                 "name": "Cladonia ecmocyna Leight.",
//                 "price": 3,
//                 "madein": "Indonesia",
//                 "quantity": 7904974549,
//                 "category": "61d11c1d86511f0016f490db",
//                 "images": [
//                     "https://2.pik.vn/20223888f64a-675e-40b3-a51c-7c848428f13d.jpg",
//                     "https://2.pik.vn/202284760130-1f9d-4e36-b04f-c6aa9808cab9.jpg"
//                 ],
//                 "sold": 56,
//                 "size": "L",
//                 "createdAt": "2021-12-25T14:41:07.000Z",
//                 "updatedAt": "2021-12-06T06:51:33.000Z"
//             },
//             {
//                 "_id": "61d12e06555401c8610e376d",
//                 "name": "Herissantia crispa (L.) Briz.",
//                 "price": 3,
//                 "madein": "Philippines",
//                 "quantity": 8629080415,
//                 "category": "61d11c1d86511f0016f490db",
//                 "images": [
//                     "https://2.pik.vn/20223888f64a-675e-40b3-a51c-7c848428f13d.jpg",
//                     "https://2.pik.vn/202284760130-1f9d-4e36-b04f-c6aa9808cab9.jpg"
//                 ],
//                 "sold": 96,
//                 "size": "XS",
//                 "createdAt": "2021-04-27T22:39:36.000Z",
//                 "updatedAt": "2021-04-07T01:15:44.000Z"
//             },
//             {
//                 "_id": "61d12e06555401c8610e376e",
//                 "name": "Botrychium lunarioides (Michx.) Sw.",
//                 "price": 2,
//                 "madein": "Sweden",
//                 "quantity": 9978844060,
//                 "category": "61d11c1d86511f0016f490db",
//                 "images": [
//                     "https://2.pik.vn/20223888f64a-675e-40b3-a51c-7c848428f13d.jpg",
//                     "https://2.pik.vn/202284760130-1f9d-4e36-b04f-c6aa9808cab9.jpg"
//                 ],
//                 "sold": 63,
//                 "size": "3XL",
//                 "createdAt": "2021-05-06T18:55:35.000Z",
//                 "updatedAt": "2021-01-02T03:57:13.000Z"
//             },
//             {
//                 "_id": "61d12e06555401c8610e376f",
//                 "name": "Geranium dissectum L.",
//                 "price": 3,
//                 "madein": "Russia",
//                 "quantity": 3069055804,
//                 "category": "61d11c1d86511f0016f490db",
//                 "images": [
//                     "https://2.pik.vn/20223888f64a-675e-40b3-a51c-7c848428f13d.jpg",
//                     "https://2.pik.vn/202284760130-1f9d-4e36-b04f-c6aa9808cab9.jpg"
//                 ],
//                 "sold": 75,
//                 "size": "S",
//                 "createdAt": "2021-06-16T13:43:59.000Z",
//                 "updatedAt": "2021-06-11T04:08:51.000Z"
//             }
//         ]
//     },
//     {
//         "_id": "61d11c0986511f0016f490d2",
//         "name": "Dụng cụ làm vườn",
//         "products": [
//             {
//                 "_id": "61d12d92555401c8610d87e1",
//                 "name": "Saxifraga rhomboidea Greene",
//                 "price": 3,
//                 "madein": "France",
//                 "quantity": 2282286575,
//                 "category": "61d11c0986511f0016f490d2",
//                 "images": [
//                     "https://2.pik.vn/2022fc2c70c8-2d1d-4a9d-b106-7e94c7a07c35.jpg",
//                     "https://2.pik.vn/2022a4be494a-dbfc-4218-bd14-9a99c2ced289.jpg"
//                 ],
//                 "sold": 90,
//                 "size": "XL",
//                 "createdAt": "2021-11-25T10:25:28.000Z",
//                 "updatedAt": "2021-04-27T01:21:14.000Z"
//             },
//             {
//                 "_id": "61d12d92555401c8610d87e2",
//                 "name": "Pyrenula leucostoma Ach.",
//                 "price": 1,
//                 "madein": "United States",
//                 "quantity": 7149993573,
//                 "category": "61d11c0986511f0016f490d2",
//                 "images": [
//                     "https://2.pik.vn/2022fc2c70c8-2d1d-4a9d-b106-7e94c7a07c35.jpg",
//                     "https://2.pik.vn/2022a4be494a-dbfc-4218-bd14-9a99c2ced289.jpg"
//                 ],
//                 "sold": 88,
//                 "size": "2XL",
//                 "createdAt": "2021-02-13T22:29:33.000Z",
//                 "updatedAt": "2021-02-04T02:12:19.000Z"
//             },
//             {
//                 "_id": "61d12d92555401c8610d87e3",
//                 "name": "Rotala indica (Willd.) Koehne",
//                 "price": 1,
//                 "madein": "China",
//                 "quantity": 2378776170,
//                 "category": "61d11c0986511f0016f490d2",
//                 "images": [
//                     "https://2.pik.vn/2022fc2c70c8-2d1d-4a9d-b106-7e94c7a07c35.jpg",
//                     "https://2.pik.vn/2022a4be494a-dbfc-4218-bd14-9a99c2ced289.jpg"
//                 ],
//                 "sold": 82,
//                 "size": "2XL",
//                 "createdAt": "2021-09-03T00:38:04.000Z",
//                 "updatedAt": "2021-03-04T23:16:34.000Z"
//             },
//             {
//                 "_id": "61d12d92555401c8610d87e4",
//                 "name": "Eryngium planum L.",
//                 "price": 2,
//                 "madein": "China",
//                 "quantity": 7146158015,
//                 "category": "61d11c0986511f0016f490d2",
//                 "images": [
//                     "https://2.pik.vn/2022fc2c70c8-2d1d-4a9d-b106-7e94c7a07c35.jpg",
//                     "https://2.pik.vn/2022a4be494a-dbfc-4218-bd14-9a99c2ced289.jpg"
//                 ],
//                 "sold": 51,
//                 "size": "XL",
//                 "createdAt": "2021-12-25T13:59:10.000Z",
//                 "updatedAt": "2021-01-03T02:50:59.000Z"
//             },
//             {
//                 "_id": "61d12d92555401c8610d87e5",
//                 "name": "Centranthus Neck. ex Lam. & DC.",
//                 "price": 1,
//                 "madein": "Ukraine",
//                 "quantity": 7416553371,
//                 "category": "61d11c0986511f0016f490d2",
//                 "images": [
//                     "https://2.pik.vn/2022fc2c70c8-2d1d-4a9d-b106-7e94c7a07c35.jpg",
//                     "https://2.pik.vn/2022a4be494a-dbfc-4218-bd14-9a99c2ced289.jpg"
//                 ],
//                 "sold": 90,
//                 "size": "S",
//                 "createdAt": "2021-06-05T04:00:01.000Z",
//                 "updatedAt": "2021-10-12T10:31:51.000Z"
//             },
//             {
//                 "_id": "61d12d92555401c8610d87e6",
//                 "name": "Celtis bungeana Blume",
//                 "price": 3,
//                 "madein": "Mexico",
//                 "quantity": 9702116416,
//                 "category": "61d11c0986511f0016f490d2",
//                 "images": [
//                     "https://2.pik.vn/2022fc2c70c8-2d1d-4a9d-b106-7e94c7a07c35.jpg",
//                     "https://2.pik.vn/2022a4be494a-dbfc-4218-bd14-9a99c2ced289.jpg"
//                 ],
//                 "sold": 61,
//                 "size": "XL",
//                 "createdAt": "2021-04-18T04:12:12.000Z",
//                 "updatedAt": "2021-01-14T17:42:41.000Z"
//             }
//         ]
//     },
//     {
//         "_id": "61d11bf386511f0016f490c9",
//         "name": "Cây cảnh",
//         "products": [
//             {
//                 "_id": "61d12d14555401c8610cfa3a",
//                 "name": "Lygeum Loefl. ex L.",
//                 "price": 3,
//                 "madein": "Mexico",
//                 "quantity": 3781040078,
//                 "category": "61d11bf386511f0016f490c9",
//                 "images": [
//                     "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                     "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//                 ],
//                 "sold": 73,
//                 "size": "2XL",
//                 "createdAt": "2021-11-18T02:13:41.000Z",
//                 "updatedAt": "2021-12-21T06:00:50.000Z"
//             },
//             {
//                 "_id": "61d12d14555401c8610cfa3b",
//                 "name": "Eucalyptus delegatensis R.T. Baker",
//                 "price": 2,
//                 "madein": "Indonesia",
//                 "quantity": 3801758691,
//                 "category": "61d11bf386511f0016f490c9",
//                 "images": [
//                     "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                     "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//                 ],
//                 "sold": 90,
//                 "size": "3XL",
//                 "createdAt": "2021-03-25T23:21:45.000Z",
//                 "updatedAt": "2021-10-07T08:02:19.000Z"
//             },
//             {
//                 "_id": "61d12d14555401c8610cfa3c",
//                 "name": "Oryctes nevadensis S. Watson",
//                 "price": 3,
//                 "madein": "Indonesia",
//                 "quantity": 2432908536,
//                 "category": "61d11bf386511f0016f490c9",
//                 "images": [
//                     "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                     "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//                 ],
//                 "sold": 87,
//                 "size": "XS",
//                 "createdAt": "2021-10-29T23:33:53.000Z",
//                 "updatedAt": "2020-12-16T02:06:23.000Z"
//             },
//             {
//                 "_id": "61d12d14555401c8610cfa3d",
//                 "name": "Cardamine nuttallii Greene",
//                 "price": 2,
//                 "madein": "Japan",
//                 "quantity": 3475860462,
//                 "category": "61d11bf386511f0016f490c9",
//                 "images": [
//                     "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                     "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//                 ],
//                 "sold": 70,
//                 "size": "L",
//                 "createdAt": "2021-01-18T16:41:57.000Z",
//                 "updatedAt": "2020-12-18T04:01:41.000Z"
//             },
//             {
//                 "_id": "61d12d14555401c8610cfa3e",
//                 "name": "Aethusa cynapium L.",
//                 "price": 2,
//                 "madein": "Somalia",
//                 "quantity": 1632117070,
//                 "category": "61d11bf386511f0016f490c9",
//                 "images": [
//                     "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//                     "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//                 ],
//                 "sold": 82,
//                 "size": "L",
//                 "createdAt": "2021-02-16T08:01:58.000Z",
//             }
//         ]
//     }
// ]
