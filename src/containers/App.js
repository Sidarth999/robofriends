import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import './App.css'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'


class App extends Component{
	constructor() {
		super()
		this.state = {
			robots : [],
			searchfeild: ''
		}
	} 

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({ robots: users}));		
	}

	onSearchChange = (event) =>{
		this.setState({ searchfeild: event.target.value })
		// const filteredRobot = this.state.robots.filter(robot =>{
		// 	return robot.name.toLowerCase().includes(this.state.searchfeild.toLowerCase());
		// })
		// console.log(filteredRobot);
	}
	render(){
		const { robots, searchfeild } = this.state;
		const filteredRobot = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfeild.toLowerCase());
		})
		if(!robots.length){
			return <h1>Loading</h1>
		}else{
			return(
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<ErrorBoundary>
							<CardList robots={filteredRobot} />
						</ErrorBoundary>
					</Scroll>
				</div>
			);	
		}
		
	}
}

export default App;