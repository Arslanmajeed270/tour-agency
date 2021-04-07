import React, { Component } from 'react';
import InputClasses from '../Input.module.css';

export default class Form1 extends Component {
    render() {
		const {
			title, description, location, departure,
			returning, price, duration, allowedPersons, checkoutDestination,

			titleError, locationError, priceError, durationError, allowedPersonsError,

			onChangeHandler
		 } = this.props;
        return (
                <div className="kt-wizard-v1__content">
                    <div className="kt-heading kt-heading--md">Tour Information</div>
                    <div className="kt-form__section kt-form__section--first">
                      <div className="kt-wizard-v1__form">
                      	<div className="form-group">
							<label>Please enter the tour information and click on 'Next Step' to continue.</label>
						</div>

                    	<div className="row">
							<div className="col-xl-12">
								<div className="form-group">
									<label>Tour Title <span className={InputClasses.required}>*</span></label>
									<input type="text" 
                        				className={"form-control "+ (titleError ? "is-invalid" : '')} 
										id="title" 
										name="title" 
										value={title}  
										onChange={onChangeHandler}
										required="" 
									/>
									{titleError ? 
										<div className="error invalid-feedback">This field is required.</div>
										:
										<span className="form-text text-muted">Please enter Tour Title.</span>
									}
								</div>
							</div>
						</div>

						<div className="row">
						<div className="col-xl-12">
                          	<div className="form-group">
                              	<label>Tour Description </label>
								<textarea 
								style={{minHeight: '150px'}}
								className="form-control" 
								id="description" 
								name="description" 
								value={description}  
								onChange={onChangeHandler}
								></textarea>
							</div>
						</div>
					</div>

						<div className="row">
								<div className="col-xl-12">
									<div className="form-group">
										<label> Location <span className={InputClasses.required}>*</span></label>
										<input type="text" 
											className={"form-control "+ (locationError ? "is-invalid" : '')} 
											id="location" 
											name="location" 
											value={location}  
											onChange={onChangeHandler}
											required="" 
										/>
										{locationError ? 
											<div className="error invalid-feedback">This field is required.</div>
											:
											<span className="form-text text-muted">Please enter Tour location.</span>
										}
									</div>
								</div>
							</div>

						<div className="row">
							<div className="col-xl-12">
								<div className="form-group">
									<label> Checkout Destination</label>
									<input type="text" 
										className={"form-control"} 
										id="checkoutDestination" 
										name="checkoutDestination" 
										value={checkoutDestination}  
										onChange={onChangeHandler}
										required="" 
									/>
									<span className="form-text text-muted">Please enter Tour checkout destination.</span>
								</div>
							</div>
						</div>

						<div className="row">
						<div className="col-xl-12">
							<div className="form-group">
								<label>Duration <span className={InputClasses.required}>*</span></label>
								<input 
									type="number" 
                        			className={"form-control "+ (durationError ? "is-invalid" : '')} 
									id="duration" 
									name="duration" 
									value={duration}  
									onChange={this.props.onChangeHandler}
									required="" 
								/>
								{durationError ? 
									<div className="error invalid-feedback">This field is required.</div>
									:
									<span className="form-text text-muted">Please enter tour duration in days.</span>
								}
							</div>
						</div>
					</div>

						<div className="row">
						<div className="col-xl-12">
							<div className="form-group">
								<label>Departure</label>
								<input 
									type="date" 
                        			className={"form-control"} 
									id="departure" 
									name="departure" 
									value={departure}  
									onChange={onChangeHandler}
									required="" 
								/>
								<span className="form-text text-muted">Please enter tour departure date.</span>
							</div>
						</div>
					</div>

						<div className="row">
							<div className="col-xl-12">
								<div className="form-group">
									<label>returning</label>
									<input 
										type="date" 
										className={"form-control"} 
										id="returning" 
										name="returning" 
										value={returning}  
										onChange={onChangeHandler}
										required="" 
									/>
									<span className="form-text text-muted">Please enter tour return date.</span>
								</div>
							</div>
						</div>

						<div className="row">
						<div className="col-xl-12">
							<div className="form-group">
								<label>Price <span className={InputClasses.required}>*</span></label>
								<input 
									type="number" 
                        			className={"form-control "+ (priceError ? "is-invalid" : '')} 
									id="price" 
									name="price" 
									value={price}  
									onChange={onChangeHandler}
									required="" 
								/>
								{priceError ? 
									<div className="error invalid-feedback">This field is required.</div>
									:
									<span className="form-text text-muted">Please enter price.</span>
								}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-xl-12">
							<div className="form-group">
								<label> Allowed Persons <span className={InputClasses.required}>*</span></label>
								<input 
									type="number" 
                        			className={"form-control "+ (allowedPersonsError ? "is-invalid" : '')} 
									id="allowedPersons" 
									name="allowedPersons" 
									value={allowedPersons}  
									onChange={onChangeHandler}
									required="" 
								/>
								{priceError ? 
									<div className="error invalid-feedback">This field is required.</div>
									:
									<span className="form-text text-muted">Please enter allowed persons.</span>
								}
							</div>
						</div>
					</div>


                </div>
            </div>
        </div>
        )
    }
}
