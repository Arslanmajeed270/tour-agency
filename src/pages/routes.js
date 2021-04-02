import React from 'react';
import { Route } from 'react-router-dom';
 
import Dashboard from './Dashboard/Dashboard';

// Tours Link
import ListTours from './Tours/listTours';
import NewTour from './Tours/newTour';
import EditTour from './Tours/editTour';


class Routes extends React.Component {

	render(){
		
		return (
			<React.Fragment>
			
				<Route  
					exact 
					path={"/dashboard"} 
					component={Dashboard}
				/>

				{/* Tours section start */}
				<Route  
					exact 
					path={"/list-tours"} 
					component={ListTours}
				/>
				<Route  
					exact 
					path={"/new-tour"} 
					component={NewTour}
				/>
				<Route  
					exact 
					path={"/edit-tour-:id"} 
					component={EditTour}
				/>

				{/* Tour section end */}

			</React.Fragment>
		);
	}
}

export default Routes;