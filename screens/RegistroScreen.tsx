import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/Config';
import { ref, set } from 'firebase/database';

export default function RegistroScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [contrasenia, setcontrasenia] = useState("")
    const [nombre, setnombre] = useState("")
    const [edad, setedad] = useState("")

    function registro() {

        createUserWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                guardar(user.uid)
                //console.log(user);
                navigation.navigate('Login')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
            });

    }

    function guardar(uid: String) {
        set(ref(db, 'vendedores/' + uid), {
            nombre: nombre,
            correo: correo,
            edad: edad
        });
    }

    return (
        <View style={styles.container} >
            <Text>Registro</Text>
            <TextInput placeholder='Ingresar el correo' onChangeText={(texto) => setcorreo(texto)} style={styles.txt} />
            <TextInput placeholder='Ingresar la contrasenia' onChangeText={(texto) => setcontrasenia(texto)} style={styles.txt} />
            <TextInput placeholder='Ingresar nombre' onChangeText={(texto) => setnombre(texto)} style={styles.txt} />
            <TextInput placeholder='Ingresar edad' onChangeText={(texto) => setedad(texto)} style={styles.txt} />
            <Button title='Registro' onPress={() => registro()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '##aeb290',
        alignItems: 'center',
        justifyContent: 'center',
    },

    txt: {
        backgroundColor: "#f0f99a",
        fontSize: 30,
        width: "80%",
        margin: 5,
    },
})