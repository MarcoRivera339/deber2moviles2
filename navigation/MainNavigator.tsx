import { createStackNavigator } from "@react-navigation/stack";
import { createStaticNavigation, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ReestablecerScreen from "../screens/ReestablecerScreen";
import AgregarAutosScreen from "../screens/AgregarAutosScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EditarAutosScreen from "../screens/EditarAutosScreen";
import EliminarAutosScreen from "../screens/EliminarAutosScreen";
import LeerAutosScreen from "../screens/LeerAutosScreen";

const Stack = createStackNavigator()
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="TopTabs" component={MyTopTaps} />
        </Stack.Navigator>
    )
}

const TopTaps = createMaterialTopTabNavigator()
function MyTopTaps() {
    return (
        <TopTaps.Navigator>
            <TopTaps.Screen name="Perfil" component={PerfilScreen} />
            <TopTaps.Screen name="Leer" component={LeerAutosScreen} />
            <TopTaps.Screen name="Agregar" component={AgregarAutosScreen} />
            <TopTaps.Screen name="Editar" component={EditarAutosScreen} />
            <TopTaps.Screen name="Eliminar" component={EliminarAutosScreen} />
            <TopTaps.Screen name="Reestablecer" component={ReestablecerScreen} />
        </TopTaps.Navigator>
    )
}

export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}