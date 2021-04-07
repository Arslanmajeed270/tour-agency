import React from 'react';
import { Route } from 'react-router-dom';
 
import Dashboard from './Dashboard/Dashboard';

// Tours Link
import ListTours from './Tours/listTours';
import NewTour from './Tours/newTour';
// import EditTour from './Tours/editTour';

// Product Link
import ListProducts from './Products/allProducts';
import NewProduct from './Products/NewProduct';
import EditProduct from './Products/EditProduct';


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
				{/* <Route  
					exact 
					path={"/edit-tour-:id"} 
					component={EditTour}
				/> */}

				{/* Tour section end */}

				{/* Product section start */}
					<Route  
					exact 
					path={"/list-products"} 
					component={ListProducts}
				/>
				<Route  
					exact 
					path={"/new-product"} 
					component={NewProduct}
				/>
				<Route  
					exact 
					path={"/edit-product-:id"} 
					component={EditProduct}
				/>

				{/* Product section end */}

			</React.Fragment>
		);
	}
}

export default Routes;