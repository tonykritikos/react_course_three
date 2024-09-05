import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import FavoritesScreen from "./screens/FavoritesScreen";
import {Ionicons} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
            <Drawer.Navigator screenOptions={{
                    headerStyle: {backgroundColor: '#351401'},
                    headerTintColor: 'white',
                    sceneContainerStyle: { backgroundColor: '#3f2f25'},
                    drawerContentStyle: { backgroundColor: '#351401' },
                    drawerActiveTintColor: '#351401',
                    drawerInactiveTintColor: 'white',
                    drawerActiveBackgroundColor: '#e4baa1'
                }}>
                <Drawer.Screen name="Categories" component={CategoriesScreen} options={{
                    title: 'All Categories',
                    drawerIcon: ({color, size}) => {
                        return (
                                <Ionicons name="list" color={color} size={size}></Ionicons>
                        );
                    }
                }}></Drawer.Screen>
                <Drawer.Screen name="Favorites" component={FavoritesScreen} options={{
                    drawerIcon: ({color, size}) => {
                        return (
                                <Ionicons name="star" color={color} size={size}></Ionicons>
                        );
                    }
                }}></Drawer.Screen>
            </Drawer.Navigator>
    );
}
export default function App() {

  return (
          <>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MealsCategories" screenOptions={{
                    headerStyle: {backgroundColor: '#351401'},
                    headerTintColor: 'white',
                    contentStyle: { backgroundColor: '#3f2f25'}
                }}>
                    <Stack.Screen name="Drawer" options={{title: 'All Categories', headerShown: false}} component={DrawerNavigator}/>
                    <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
                    <Stack.Screen name="MealDetail" component={MealDetailScreen} options={{title: 'About the Meal'}} />
                </Stack.Navigator>
            </NavigationContainer>
          </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
