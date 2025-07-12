import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase/Config'

export default function LeerAutosScreen() {
  const [datos, setdatos] = useState<any[]>([])

  function leer() {
    const starCountRef = ref(db, 'vendedores/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      let arreglo = Object.keys(data).map(uid => ({
        uid,
        ...data[uid]
      }))

      setdatos(arreglo)
    });
  }

  useEffect(() => {
    leer()
  }, [])

  return (
    <View>
      <Text style={styles.titulo}>Lista de Vendedores y Autos</Text>
      <FlatList
        data={datos}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>Vendedor: {item.nombre}</Text>
            {item.autos
              ? Object.values(item.autos).map((auto: any, index: number) => (
                  <View key={index} style={styles.autoCard}>
                    <Text>Placa: {auto.placa}</Text>
                    <Text>Marca: {auto.marca}</Text>
                    <Text>Modelo: {auto.modelo}</Text>
                    <Text>Color: {auto.color}</Text>
                  </View>
                ))
              : <Text>Sin autos registrados</Text>}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
  card: {
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  autoCard: {
    marginLeft: 10,
    paddingVertical: 5
  }
})
