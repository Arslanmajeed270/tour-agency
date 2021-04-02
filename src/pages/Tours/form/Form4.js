import React, { Component } from 'react'

export default class Form4 extends Component {

    getDateFormat = (date) => {
        const d = new Date(date)
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
      const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d) 
      console.log(`${mo} ${da}, ${ye}`);
    
      return (`${mo} ${da}, ${ye}`);
      
      }

    render() {
        const {
			name, status, quantityInStock, productType, company, sku,
            description, apiGrade, packagingSize,packagingSizeUnit, 
            cost, price, salePrice,saleStartDate, saleEndDate,
            
		 } = this.props;
        return (
            <div className="kt-wizard-v1__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
                <div className="kt-heading kt-heading--md">Review Product Information &amp; Submit</div>
                <div className="kt-form__section kt-form__section--first">
                    <div className="kt-wizard-v1__review">
                    <div className="kt-wizard-v1__review-item">
                        <div className="kt-wizard-v1__review-title">
                        Product Information
                        </div>
                        <div id="review_product_info" className="kt-wizard-v1__review-content">
                            Product Name: {name &&  name }<br />
                            Product Type: {productType}<br />
                            SKU:{sku} <br />
                            Quantity In Stock: {quantityInStock}<br />
                            Status: {status ? 'Active' : "Inactive"}<br />
                            Company: {company}<br />
                            API Grade: {apiGrade}<br />
                            Packing Size: {packagingSize} {packagingSizeUnit}<br />
                            Description:<br />{description} <br /> 
                            </div>
                        <div className="kt-wizard-v1__review-title">
                        Product Pricing
                        </div>
                        <div id="review_product_pricing">
                            Product Cost: {cost && cost} PKR<br />
                            Product Price: {price && price} PKR<br />
                            Sale Price: {salePrice && salePrice}<br />
                            Sale Start Date: {saleStartDate && this.getDateFormat(saleStartDate)}<br />
                            Sale End Date: {saleEndDate && this.getDateFormat(saleEndDate)}<br />
                        </div>
                    </div>
                </div>
            </div>
        </div>

           )
    }
}
