import React from 'react';
import { Platform, StatusBar } from 'react-native';

import { StackNavigator, DrawerNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';

import * as SignedIn from './containers/signedIn';
import * as SignedOut from './containers/signedOut';

const headerStyle = {
	marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

const Stack = StackNavigator(
	{
		Home: {
			screen: SignedIn.Screens.Home.Component
		},
		Blank: {
			screen: SignedIn.Screens.Blank.Component
		}
	},
	{
		initialRouteName: 'Home',
		navigationOptions: {
			header: (props) => <SignedIn.Header {...props} />,
			headerStyle
		}
	}
);

const Tabs = TabNavigator(
	{
		Stack: {
			screen: Stack
		}
	},
	{
		tabBarComponent: (props) => <SignedIn.Footer {...props} />
	}
);

const SignedInNavigator = DrawerNavigator(
	{
		Tabs: {
			screen: Tabs
		}
	},
	{
		drawerPosition: 'right',
		contentComponent: (props) => <SignedIn.SideBar {...props} />
	}
);

const SignedOutNavigator = StackNavigator(
	{
		Login: {
			screen: SignedOut.Screens.Login,
			navigationOptions: {
				headerStyle
			}
		}
	},
	{ headerMode: 'none' }
);

export const AppNavigator = (signedIn = false) =>
	SwitchNavigator(
		{
			SignedIn: {
				screen: SignedInNavigator
			},
			SignedOut: {
				screen: SignedOutNavigator
			}
		},
		{
			initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
		}
	);
