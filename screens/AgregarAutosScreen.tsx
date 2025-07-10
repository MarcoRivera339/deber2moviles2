import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, push, ref, set, update } from 'firebase/database'
import { auth, db } from '../firebase/Config'
import { onAuthStateChanged } from 'firebase/auth'

export default function AgregarAutosScreen() {
    const [uid, setuid] = useState("")
    const [placa, setplaca] = useState("")
    const [marca, setmarca] = useState("")
    const [color, setcolor] = useState("")
    const [modelo, setmodelo] = useState("")

    function editar(uid: String) {
        const postListRef = ref(db, 'vendedores');
        const newPostRef = push(postListRef);
        set(newPostRef, {
            // ...
        });

    }

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

    function leer(uid: String) {
        const starCountRef = ref(db, 'vendedores/' + uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
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

            <Button title='Añadir' onPress={() => editar(uid)} />
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