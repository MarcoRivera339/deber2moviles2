import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref, update } from 'firebase/database'
import { auth, db } from '../firebase/Config'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function EditarAutosScreen({ navigation }: any) {
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
                // Usuario no está autenticado
            }
        });
    }, [])

    function editar(uid: string) {
        if (!placa) {
            Alert.alert("Error", "Debe ingresar la placa para editar el auto")
            return;
        }
        const autoRef = ref(db, 'vendedores/' + uid + "/autos/" + placa);

        update(autoRef, {
            marca: marca,
            color: color,
            modelo: modelo,
        })
        .then(() => {
            Alert.alert("Éxito", "Auto editado correctamente")
        })
        .catch((error) => {
            Alert.alert("Error", "No se pudo editar el auto: " + error.message)
        });
    }

    function leer(uid: string) {
        const starCountRef = ref(db, 'vendedores/' + uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // Puedes usar los datos si quieres mostrar algo
        });
    }

    function logout() {
        signOut(auth).then(() => {
            navigation.navigate('Home')
        }).catch((error) => {
            Alert.alert("Error", error.message)
        });
    }

    return (
        <View>
            <TextInput
                placeholder='Ingresar placa'
                onChangeText={(texto) => setplaca(texto)}
                style={styles.input}
                value={placa}
            />

            <TextInput
                placeholder='Ingresar marca'
                onChangeText={(texto) => setmarca(texto)}
                style={styles.input}
                value={marca}
            />

            <TextInput
                placeholder='Ingresar color'
                onChangeText={(texto) => setcolor(texto)}
                style={styles.input}
                value={color}
            />

            <TextInput
                placeholder='Ingresar modelo'
                onChangeText={(texto) => setmodelo(texto)}
                style={styles.input}
                value={modelo}
            />

            <Button title='Editar' onPress={() => editar(uid)} />
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
