import React, { Component } from 'react';
import InputClasses from '../Input.module.css';


export default class Form2 extends Component {
    render() {
        const {cost, price, salePrice,saleStartDate, saleEndDate,
            costError, priceError
        } = this.props;

        return (
            <div>
                <div className="kt-wizard-v1__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
            <div className="kt-heading kt-heading--md">Set Prices &amp; Sale Price</div>
            <div className="kt-form__section kt-form__section--first">
                <div className="kt-wizard-v1__form">
                <div className="col-xl-12">
                    <div className="form-group">
                    <label>You can set price and sale price (if applicable) for product here</label>
                    </div>
                </div>			
                <div className="row">
                    <div className="col-xl-6">
                    <div className="form-group">
                        <label>Product Cost <span className={InputClasses.required}>*</span></label>
                        <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text">PKR</span></div>
                        <input 
                        type="number" 
                        className={"form-control "+ (costError ? "is-invalid" : '')}  
                        id="cost" 
                        name="cost" 
                        value={cost}  
                        onChange={this.props.onChangeHandler}
                        required="" 
                        />
                        {costError ? 
									<div className="error invalid-feedback">This field is required.</div>
                                    :
                                    <span className="form-text text-muted">Price at which you purchased product from company</span>
								}
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-6">
                    <div className="form-group">
                        <label>Product Price <span className={InputClasses.required}>*</span></label>
                        <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text">PKR</span></div>
                        <input 
                        type="number" 
                        className={"form-control "+ (priceError ? "is-invalid" : '')}  
                        id="price" 
                        name="price" 
                        value={price}  
                        onChange={this.props.onChangeHandler}
                        required="" 
                        />
                        </div>
                        {priceError ? 
                            <div className="error invalid-feedback">This field is required.</div>
                            :
                            <span className="form-text text-muted">This is the price you want to sell product at.</span>
                        }
                    </div>
                    </div>
                </div>			
                <div className="row">
                    <div className="col-xl-6">
                    <div className="form-group">
                        <label>Sale Price </label>
                        <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text">PKR</span></div>
                        <input 
                        type="number" 
                        className="form-control" 
                        id="salePrice" 
                        name="salePrice" 
                        value={salePrice}  
                        onChange={this.props.onChangeHandler}
                        />
                        </div>
                        <span className="form-text text-muted">Leave empty for no sale</span>
                    </div>
                    </div>
                    <div className="col-xl-6">
                    <div className="form-group">
                        <label>Sale Date </label>
                        <input 
                        type="Date" 
                        className="form-control" 
                        id="saleStartDate" 
                        name="saleStartDate" 
                        value={saleStartDate}  
                        onChange={this.props.onChangeHandler}
                        />
                        <input 
                        type="date" 
                        className="form-control" 
                        id="saleEndDate" 
                        name="saleEndDate" 
                        value={saleEndDate}  
                        onChange={this.props.onChangeHandler}
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        )
    }
}
