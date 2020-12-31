import React, { Fragment } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Image, Text, Button } from 'react-native';

const BookListCard = (props) => {
	const { book = {}, loading, onPress } = props;

	// Render
	return (
  	<TouchableHighlight activeOpacity={1} underlayColor={Colors.lighterGrayColor} onPress={onPress} style={{}}>
			<View style={{}}>
				<View style={{}}>
					<Image style={{}} source={{ uri: book.photo }}/>
					<View style={{}}>
						<Text style={{}}>{title}</Text>
						<Text style={{}}>{subtitle}</Text>
						<Text style={{}}>{line1}</Text>
						<Text style={{}}>{timestamp}</Text>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	)
}

export { BookListCard }
