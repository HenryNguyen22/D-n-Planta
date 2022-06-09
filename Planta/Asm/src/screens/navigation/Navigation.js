import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import UserNavigation from '../user/UserNavigation';
import ProductNavigation from '../product/ProductNavigation';
import { UserContext } from '../user/UserContext';

export default Navigation = (props) => {
    const {isLoggedIn} = useContext(UserContext);
    return (
        <NavigationContainer>
            {
                isLoggedIn == true ?
                    <ProductNavigation /> :
                    <UserNavigation />
            }
        </NavigationContainer>
    )
}