import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase/Config';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ReestablecerScreen() {

    const [correo, setcorreo] = useState("")

    function reestablecer() {
        sendPasswordResetEmail(auth, correo)
            .then(() => {
                // Password reset email sent!
                Alert.alert("Mensaje enviado")
                alert("Mensaje enviado")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <View>
            <Text>ReestablecerScreen</Text>
            <TextInput placeholder='Ingresar el correo' onChangeText={(texto) => setcorreo(texto)} />
            <Button title='enviar solicitud' onPress={() => reestablecer()} />
        </View>
    )
}

const styles = StyleSheet.create({})