import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import Registered from './AuthComp/Registered';
import NotRegistered from "./AuthComp/NotRegistered";
import { MainContext } from './Context/MainContextProvider';

export default function Main() {
    const { authenticated } = useContext(MainContext)
    return (
        <NavigationContainer>
            {authenticated ? <Registered /> : <NotRegistered />}

        </NavigationContainer>
    )
}