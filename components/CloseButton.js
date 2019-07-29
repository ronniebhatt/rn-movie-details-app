import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const CloseButton = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={{
                position: "absolute",
                right: 20,
                top: 45,
                height: 35,
                width: 35,
                borderRadius: 17,
                backgroundColor: '#000',
                justifyContent: "center",
                alignItems: "center",
                shadowColor: 'rgba(255,255,255, 0.5)',
                shadowOffset: { height: 0, width: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 17,
                elevation: 2,
                zIndex: 100
            }}
            onPress={() => {
                navigation.goBack()
            }}>
            <Text style={{
                fontSize: 18,
                color: '#FFF'
            }}>X</Text>
        </TouchableOpacity>
    )
}

export default CloseButton
