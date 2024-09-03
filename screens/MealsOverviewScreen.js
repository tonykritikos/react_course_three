import { MEALS, CATEGORIES } from "../data/dummy-data";
import {FlatList, View, StyleSheet} from "react-native";
import MealItem from "../components/MealItem";
import {useLayoutEffect} from "react";

function MealsOverviewScreen({route, navigation}) {
	const catId = route.params.categoryId;

	const displayedMeals = MEALS.filter((mealItem) => {
		return mealItem.categoryIds.indexOf(catId) >= 0;
	})

	useLayoutEffect(() => {
		const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
		navigation.setOptions({
			title: categoryTitle
		});
	}, [catId, navigation]);

	function renderMealItem(itemData){
		const mealItemProps = {
			id: itemData.item.id,
			title: itemData.item.title,
			imageUrl: itemData.item.imageUrl,
			duration: itemData.item.duration,
			complexity: itemData.item.complexity,
			affordability: itemData.item.affordability
		};
		return ( <MealItem {...mealItemProps}></MealItem> );
	}
	return (
			<View style={styles.container}>
				<FlatList data={displayedMeals} renderItem={renderMealItem} keyExtractor={(item) => item.id} />
			</View>
	);
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16
	}
});