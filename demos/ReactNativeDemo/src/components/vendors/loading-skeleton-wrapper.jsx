import React, { Fragment } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';

const COLOR = Variables.lightGrayColor;
const ACTIVE_COLOR = Variables.grayColor;

const skeletons = (count) => {
	let skeletons = [];
	while (skeletons.length < count) {
		skeletons.push(skeletons.length);
	}
	return skeletons;
}


const DetailSkeleton = (props) => {
	const { type, count = 3, speed = 800, color, activeColor } = props;

	return (
		<Fragment>
			{skeletons(count).map((skeleton, index) => (
				<View style={{padding: 15}}>
					<SkeletonPlaceholder speed={speed} backgroundColor={color} highlightColor={activeColor}>
			      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
				      <SkeletonPlaceholder.Item width={60} height={60} borderRadius={60}/>
			        <SkeletonPlaceholder.Item marginTop={10} width={140} height={20} borderRadius={0} />
			        <SkeletonPlaceholder.Item marginTop={8} width={100} height={10} borderRadius={0}/>
			        <SkeletonPlaceholder.Item marginTop={8} width={80} height={10} borderRadius={0}/>
			      </SkeletonPlaceholder.Item>
			    </SkeletonPlaceholder>
		    </View>
	    ))}
    </Fragment>
	)
}


const ListSkeleton = (props) => {
	const { type, speed = 800, color, activeColor } = props;

	return (
		<Fragment>
			{skeletons(count).map((skeleton, index) => (
				<SkeletonPlaceholder speed={speed} backgroundColor={color} highlightColor={activeColor}>
		      <SkeletonPlaceholder.Item paddingTop={15} paddingBottom={15} flexDirection="row" alignItems="center">
			      <SkeletonPlaceholder.Item width={60} height={60} />
		        <SkeletonPlaceholder.Item marginLeft={20}>
		          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={0} />
		          <SkeletonPlaceholder.Item
		            marginTop={6}
		            width={80}
		            height={20}
		            borderRadius={0}
		          />
		        </SkeletonPlaceholder.Item>
		      </SkeletonPlaceholder.Item>
		    </SkeletonPlaceholder>
	    ))}
    </Fragment>
	)
}

export { DetailSkeleton, ListSkeleton }

// Docs
// https://www.npmjs.com/package/react-native-skeleton-placeholder
