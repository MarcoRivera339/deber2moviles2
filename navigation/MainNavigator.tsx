import { createStackNavigator } from "@react-navigation/stack";
import { createStaticNavigation, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ReestablecerScreen from "../screens/ReestablecerScreen";
import AgregarAutosScreen from "../screens/AgregarAutosScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} ></Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen} ></Stack.Screen>
            <Stack.Screen name="Registro" component={RegistroScreen} ></Stack.Screen>
            <Stack.Screen name="Perfil" component={PerfilScreen} ></Stack.Screen>
            <Stack.Screen name="Reestablecer" component={ReestablecerScreen} ></Stack.Screen>
            <Stack.Screen name="AgregarAutos" component={AgregarAutosScreen} ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}