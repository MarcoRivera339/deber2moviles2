import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }: any) {
  return (
    <View>
      <Button title='Login' onPress={() => navigation.navigate('Login')} />
      <Button title='Registro' onPress={() => navigation.navigate('Registro')} color={'green'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})