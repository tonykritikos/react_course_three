import {Button, Image, Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({route, navigation}) {
	const favoriteMealsCtx = useContext(FavoritesContext);
	const mealId = route.params.mealId;
	const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
	const selectedMeal = MEALS.find((meal) => meal.id === mealId);

	function changeFavoriteStatusHandler() {
		if (mealIsFavorite) {
			favoriteMealsCtx.removeFavorite(mealId);
		} else {
			favoriteMealsCtx.addFavorite(mealId);
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
						<IconButton icon={mealIsFavorite ? 'star' : 'star-outline'} color='white' onPress={changeFavoriteStatusHandler}/>
				);
			}
		});
	}, [navigation, changeFavoriteStatusHandler]);

	return (
		<ScrollView style={styles.rootContainer}>
				<Image style={styles.image} source={{uri: selectedMeal.imageUrl}}/>
				<Text style={styles.title}>{selectedMeal.title}</Text>
				<MealDetails textStyle={styles.detailText} duration={selectedMeal.duration} affordability={selectedMeal.affordability} complexity={selectedMeal.complexity}/>
				<View style={styles.listOuterContainer}>
					<View style={styles.listContainer}>
						<Subtitle>Ingredients</Subtitle>
						<List data={selectedMeal.ingredients}></List>
						<Subtitle>Steps</Subtitle>
						<List data={selectedMeal.steps}></List>
					</View>
				</View>
		</ScrollView>
	);
}

export default MealDetailScreen;


const styles = StyleSheet.create({
	rootContainer: {
		marginBottom: 32
	},
	image: {
		width: '100%',
		height: 350
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		margin: 8,
		textAlign: 'center',
		color: 'white'
	},
	detailText: {
		color: 'white'
	},
	listOuterContainer: {
		alignItems: 'center'
	},
	listContainer: {
		width: '80%'
	}
});