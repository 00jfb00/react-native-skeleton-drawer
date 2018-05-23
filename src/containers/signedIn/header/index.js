import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Header, Title, Button, Icon, Left, Right, Body } from 'native-base';

class APPHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stackLenght: 1
		};
	}

	componentWillMount() {
		DeviceEventEmitter.addListener('navigation', (route) => {
			if ([ 'DrawerToggle', 'SignedOut' ].indexOf(route.name) >= 0) {
				this.props.navigation.navigate(route.name);
				return;
			}

			let requestedRoute = this.getRouteKeyInStack(this.props.navigation.state, route.name);

			if (this.getCurrentRouteName(this.props.navigation.state) === route.name) {
				this.props.navigation.navigate('DrawerClose');
				this.props.navigation.dispatch(
					NavigationActions.setParams({
						key: requestedRoute[0],
						params: route.params
					})
				);
				DeviceEventEmitter.emit('refresh', route.name);
				return;
			}
			this.props.navigation.dispatch(
				NavigationActions.navigate({
					routeName: route.name,
					key: requestedRoute[0],
					params: route.params
				})
			);
			if (requestedRoute[1] !== null) this.setState({ stackLenght: requestedRoute[1] + 1 });
			else this.setState({ stackLenght: this.state.stackLenght + 1 });
		});
		DeviceEventEmitter.addListener('reset', (route) => {
			this.props.navigation.dispatch(
				NavigationActions.reset({
					index: 0,
					actions: [
						{
							routeName: route,
							key: route
						}
					]
				})
			);
			this.setState({ stackLenght: 1 });
		});
	}

	componentWillUnmount() {
		DeviceEventEmitter.removeAllListeners();
	}

	goBack() {
		this.setState({ stackLenght: this.state.stackLenght - 1 });
		this.props.navigation.dispatch(NavigationActions.back());
		this.props.navigation.goBack();
	}

	getRouteKeyInStack(navState, name) {
		for (let [ index, route ] of navState.routes.entries()) {
			if (route.routeName == name) return [ route.key, index ];
		}
		return [ name, null ];
	}

	getCurrentRouteName(navState) {
		return navState.routes[navState.index].routeName;
	}

	render() {
		const { getScreenDetails, scene } = this.props;
		return (
			<Header>
				<Left>
					{this.state.stackLenght > 1 ? (
						<Button transparent onPress={() => this.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					) : null}
				</Left>
				<Body>
					<Title>{getScreenDetails(scene).options.title}</Title>
				</Body>
				<Right>
					<Button transparent onPress={() => this.props.navigation.navigate('DrawerToggle')}>
						<Icon name="ios-menu" />
					</Button>
				</Right>
			</Header>
		);
	}
}

export default APPHeader;
