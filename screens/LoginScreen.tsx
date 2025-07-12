import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';


export default function LoginScreen({ navigation }: any) {

  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigation.navigate('TopTabs')
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode == "auth/invalid-credenntial") {
          errorCode = "Credenciales invalidas"
          errorMessage = "Verificar correo y contrasenia"

        } else if (errorCode == "auth/missing-password") {
          errorCode = "Error de contrasenia"
          errorMessage = "Se envio contrasenia en blanco o no se reconocio"

        } else {
          errorCode = "Error"
          errorMessage = "Error en las credenciales, verificar correo y contrasenia"
        }

        alert(errorMessage)
        alert(errorCode)
        Alert.alert(errorCode, errorMessage)


      });
  }

  return (
    <View style={styles.container} >
      <Text>Login</Text>
      <TextInput placeholder='Ingresar el correo' onChangeText={(texto) => setcorreo(texto)} style={styles.txt} />
      <TextInput placeholder='Ingresar la contrasenia' onChangeText={(texto) => setcontrasenia(texto)} style={styles.txt} />
      <Button title='Login' onPress={() => login()} />
      <Text onPress={() => navigation.navigate('Reestablecer')} >Olvidaste la contrasenia</Text>
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