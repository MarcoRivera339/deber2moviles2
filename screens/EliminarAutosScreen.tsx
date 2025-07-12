import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase/Config'
import { ref, onValue, remove } from 'firebase/database'

type Auto = {
  placa: string
  marca: string
  color: string
  modelo: string
}

export default function EliminarAutosScreen() {
  const [uid, setUid] = useState<string | null>(null)
  const [autos, setAutos] = useState<Auto[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
        leerAutos(user.uid)
      } else {
        setUid(null)
        setAutos([])
        setCargando(false)
      }
    })

    return () => unsubscribeAuth()
  }, [])

  function leerAutos(uid: string) {
    setCargando(true)
    const autosRef = ref(db, 'vendedores/' + uid + '/autos')
    onValue(
      autosRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          // Convertir objeto de autos a arreglo con placa incluida
          const listaAutos: Auto[] = Object.entries(data).map(([placa, valores]) => ({
            placa,
            marca: (valores as any).marca,
            color: (valores as any).color,
            modelo: (valores as any).modelo,
          }))
          setAutos(listaAutos)
        } else {
          setAutos([])
        }
        setCargando(false)
      },
      { onlyOnce: false }
    )
  }

  function eliminarAuto(placa: string) {
    if (!uid) return

    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de eliminar el auto con placa ${placa}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            const autoRef = ref(db, 'vendedores/' + uid + '/autos/' + placa)
            remove(autoRef)
              .then(() => {
                Alert.alert("Éxito", "Auto eliminado correctamente")
                alert("Auto eliminado correctamente")
                // La lista se actualizará automáticamente por onValue
              })
              .catch((error) => {
                Alert.alert("Error", "No se pudo eliminar el auto: " + error.message)
                alert("No se pudo eliminar el auto")
              })
          },
        },
      ]
    )
  }

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando autos...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Autos guardados</Text>
      {autos.length === 0 ? (
        <Text>No tienes autos guardados.</Text>
      ) : (
        <FlatList
          data={autos}
          keyExtractor={(item) => item.placa}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.autoCard}
              onPress={() => eliminarAuto(item.placa)}
            >
              <Text style={styles.textoAuto}>Placa: {item.placa}</Text>
              <Text style={styles.textoAuto}>Marca: {item.marca}</Text>
              <Text style={styles.textoAuto}>Color: {item.color}</Text>
              <Text style={styles.textoAuto}>Modelo: {item.modelo}</Text>
              <Text style={styles.textoEliminar}>Tocar para eliminar</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  autoCard: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  textoAuto: {
    fontSize: 18,
  },
  textoEliminar: {
    marginTop: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
})
