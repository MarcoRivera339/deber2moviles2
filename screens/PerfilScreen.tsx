import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/Config';
import { onValue, ref } from 'firebase/database';

export default function PerfilScreen({ navigation }: any) {

    const [nombre, setnombre] = useState("")
    const [edad, setedad] = useState(0)

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('Home')
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
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
            setnombre(data.nombre)
            setedad(data.edad)
        });
    }

    return (
        <View>
            <Text>PerfilScreen</Text>
            <Text style={styles.txt}>Nombre:{nombre}</Text>
            <Text style={styles.txt}>Edad:{edad}</Text>
            <Button title='cerrar sesion' onPress={() => logout()} />
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 25
    }
})