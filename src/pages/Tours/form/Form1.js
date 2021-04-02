import React, { Component } from 'react';
import InputClasses from '../Input.module.css';

export default class Form1 extends Component {
    render() {
		const {
			name, status, quantityInStock, productType, company, sku,
			recUsageLimit, recUsageLimitUnit, description, companies,
			apiGrade, packagingSize,packagingSizeUnit,
			nameError, quantityInStockError, productTypeError,companyError,
		 } = this.props;
        return (
                <div className="kt-wizard-v1__content">
                    <div className="kt-heading kt-heading--md">Product Information</div>
                    <div className="kt-form__section kt-form__section--first">
                      <div className="kt-wizard-v1__form">
                      	<div className="form-group">
							<label>Please enter the product information and click on 'Next Step' to continue.</label>
						</div>
                    	<div className="row">
							<div className="col-xl-12">
								<div className="form-group">
									<label>Product Name <span className={InputClasses.required}>*</span></label>
									<input type="text" 
                        				className={"form-control "+ (nameError ? "is-invalid" : '')} 
										id="name" 
										name="name" 
										value={name}  
										onChange={this.props.onChangeHandler}
										required="" 
									/>
									{nameError ? 
										<div className="error invalid-feedback">This field is required.</div>
										:
										<span className="form-text text-muted">Please enter Product Name.</span>
									}
								</div>
							</div>
						</div>

                      <div className="row">
						<div className="col-xl-6">
							<div className="form-group">
								<label>Status <span className={InputClasses.required}>*</span></label>
								<select 
								className="form-control" 
								id="status" 
								name="status" 
								value={status}  
								onChange={this.props.onChangeHandler}
								required=""
								>
									<option value={true}>Active</option>
									<option value={false}>Inactive</option>
								</select>
							</div>
						</div>
						<div className="col-xl-6">
							<div className="form-group">
								<label>Quantity in stock <span className={InputClasses.required}>*</span></label>
								<input 
									type="number" 
                        			className={"form-control "+ (quantityInStockError ? "is-invalid" : '')} 
									id="quantityInStock" 
									name="quantityInStock" 
									value={quantityInStock}  
									onChange={this.props.onChangeHandler}
									required="" 
								/>
								{quantityInStockError ? 
									<div className="error invalid-feedback">This field is required.</div>
									:
									<span className="form-text text-muted">Please enter Quantity in stock.</span>
								}
							</div>
						</div>
					</div>

                  	<div className="row">
						<div className="col-xl-6">
							<div className="form-group">
								<label>Product Type <span className={InputClasses.required}>*</span></label>
								<select 
                        		className={"form-control "+ (productTypeError ? "is-invalid" : '')}  
								id="productType" 
								name="productType" 
								value={productType}  
								onChange={this.props.onChangeHandler}
								required="" 
								>
									<option value=''>Please Select Product Type</option>
									<option value="Oil">Oil</option>
									<option value="Filters">Filters</option>
									<option value="Accessories">Accessories</option>
								</select>
								{productTypeError ? 
									<div className="error invalid-feedback">This field is required.</div>
									:
									<span className="form-text text-muted">Please select Product type.</span>
								}
							</div>
						</div>
                  	</div>

	                <div className="row">
                    	<div className="col-xl-6">
                      		<div className="form-group">
                        		<label>Company <span className={InputClasses.required}>*</span></label>
								<select 
                        		className={"form-control "+ (companyError ? "is-invalid" : '')}  
								id="company" 
								name="company" 
								value={company}  
								onChange={this.props.onChangeHandler}
								required="" 
								>
									<option value="">Select</option>
									{companies && companies.length && companies.map(single => (
									<option key={single._id} value={single.name}>{single.name}</option>
									)) }
								</select>
								{companyError ? 
									<div className="error invalid-feedback">This field is required.</div>
									:
									<span className="form-text text-muted">Please select company.</span>
								}
							</div>
						</div>
						<div className="col-xl-6">
                      		<div className="form-group">
                          		<label>Product SKU</label>
								<input 
								type="text" 
								className="form-control" 
								id="sku" 
								name="sku" 
								value={sku}  
								onChange={this.props.onChangeHandler}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-xl-6">
							<div className="form-group">
							<label>API Grade </label>
							<input 
							type="text" 
							className="form-control" 
							id="apiGrade" 
							name="apiGrade" 
							value={apiGrade}  
							onChange={this.props.onChangeHandler}
							/>
							</div>
						</div>
						<div className="col-xl-6">
							<div className="form-group">
							<label>Packing Size </label>
							<div className="select-group">
								<select 
								className="form-control" 
								id="packagingSize" 
								name="packagingSize" 
								value={packagingSize}  
								onChange={this.props.onChangeHandler}
								
								>
								<option value>Packing Size</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
								<option value={10}>10</option>
								<option value={100}>100</option>
								<option value={200}>200</option>
								<option value={300}>300</option>
								<option value={400}>400</option>
								<option value={500}>500</option>
								</select>

								<select 
								className="form-control" 
								id="packagingSizeUnit" 
								name="packagingSizeUnit" 
								value={packagingSizeUnit}  
								onChange={this.props.onChangeHandler}
								
								>
								<option value>Packing Unit</option>
								<option value="L">Litre</option>
								<option value="ml"> Mili-Litre (ml)</option>
								<option value="KG">Kilogram</option>
								<option value="g">Gram</option>
								</select>
							</div>
						</div>
					</div>
					</div>

                  	<div className="row">
						<div className="col-xl-6">
							<div className="form-group">
								<label>Recommended Usage Limit </label>
								<div className="select-group">
									<select 
										className="form-control" 
										id="recUsageLimit" 
										name="recUsageLimit" 
										value={recUsageLimit}  
										onChange={this.props.onChangeHandler}
									>
										<option value="">------------</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
											<option value="100">100</option>
											<option value="200">200</option>
											<option value="300">300</option>
											<option value="400">400</option>
											<option value="500">500</option>
											<option value="1000">1000</option>
											<option value="2000">2000</option>
											<option value="3000">3000</option>
											<option value="4000">4000</option>
											<option value="5000">5000</option>
											<option value="6000">6000</option>
											<option value="7000">7000</option>
											<option value="8000">8000</option>
											<option value="9000">9000</option>
											<option value="10000">10000</option>
									</select>
									<select 
										className="form-control" 
										id="recUsageLimitUnit" 
										name="recUsageLimitUnit" 
										value={recUsageLimitUnit}  
										onChange={this.props.onChangeHandler}
									>
										<option value="">------------</option>
										<option value="K">Kilometers</option>
										<option value="D">Days</option>
										<option value="Mon">Months</option>
										<option value="Y">Years</option>
									</select>
								</div>
							</div>
						</div>
					</div>

                    <div className="row">
						<div className="col-xl-12">
                          	<div className="form-group">
                              	<label>Product Description </label>
								<textarea 
								style={{minHeight: '150px'}}
								className="form-control" 
								id="description" 
								name="description" 
								value={description}  
								onChange={this.props.onChangeHandler}
								></textarea>
							</div>
						</div>
					</div>

                </div>
            </div>
        </div>
        )
    }
}
