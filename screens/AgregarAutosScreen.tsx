import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, push, ref, set, update } from 'firebase/database'
import { auth, db } from '../firebase/Config'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function AgregarAutosScreen({ navigation }: any) {
    const [uid, setuid] = useState("")
    const [placa, setplaca] = useState("")
    const [marca, setmarca] = useState("")
    const [color, setcolor] = useState("")
    const [modelo, setmodelo] = useState("")


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setuid(uid);
                leer(uid)

            } else {
                // User is signed out
                // ...
            }
        });

    }, [])

    function guardar(uid: String) {
        set(ref(db, 'vendedores/' + uid + "/autos/" + placa), {
            marca: marca,
            color: color,
            modelo: modelo,
        });


    }

    function leer(uid: String) {
        const starCountRef = ref(db, 'vendedores/' + uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
        });
    }

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('Home')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <View>
            <TextInput
                placeholder='Ingresar placa'
                onChangeText={(texto) => setplaca(texto)}
                style={styles.input}
            />

            <TextInput
                placeholder='Ingresar marca'
                onChangeText={(texto) => setmarca(texto)}
                style={styles.input}
            />

            <TextInput
                placeholder='Ingresar color'
                onChangeText={(texto) => setcolor(texto)}
                style={styles.input}
            />

            <TextInput
                placeholder='Ingresar modelo'
                onChangeText={(texto) => setmodelo(texto)}
                style={styles.input}
            />

            <Button title='Guardar' onPress={() => guardar(uid)} />
            <Button title='Logout' onPress={() => logout()} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 25,
        backgroundColor: '#9999',
        margin: 6,
        width: "80%",
    },
})