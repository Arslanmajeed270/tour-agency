import React from 'react';
import {Modal} from 'react-bootstrap';

function productModel(props) {  
  const {show , handleClose, product, getDateFormat} = props;
  let backendServerURL = process.env.REACT_APP_API_URL;
    return (
      <Modal
      show={show}
      onHide={handleClose} 
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        {/* <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>  */}
        <Modal.Body>
        <div className="modal-content col-md-12">
  <div className="modal-header">
    <b>
      {product && product.name} &nbsp;
      <a style={{fontSize: '11px', fontWeight: 'normal'}} href={`edit-product-${product &&  product._id}`}>(edit)</a>
    </b> 
      <span className="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">{product && (product.status ? 'Active' : 'Inactive')}</span>
  </div>
  <div className="modal-body">
      <b>Catogory:</b> {product && product.productType && product.productType}<br />
    <b>SKU:</b> {product && product.sku && product.sku}<br />
      Quantity: <span style={product && product.quantityInStock && product.quantityInStock >= 0 ? {color: 'green'} : {color: 'red'}}>{product && product.quantityInStock && product.quantityInStock}</span><br />
    API Grade: {product && product.apiGrade && product.apiGrade} <br />
    Packaging: {product && product.packagingSize && product.packagingSize}{product && product.packagingSizeUnit && product.packagingSizeUnit}<br />
    <br />
    Product Cost: Rs. {product && product.cost && product.cost} <br />
    Product Price: Rs. {product && product.price && product.price} <br /><br />
    { product && product.salePrice && product.salePrice > 0  && product.saleStartDate && new Date(product.saleStartDate).getTime() <= new Date().getTime() &&
    <div className="row">
      <div className="col-lg-12">
        <label className="kt-option" style={{background: 'whitesmoke'}}>
          <span className="kt-option__label">
            <span className="kt-option__head">
              <span className="kt-option__title">This product has sale</span>
              <span className="kt-option__focus"> Rs. {Math.ceil(product.price - product.salePrice)} OFF</span>
            </span>
            <span className="kt-option__body">
            <span>Old Price: <font style={{color: 'red'}}><strike>Rs. {product.price && product.price }</strike></font></span>
              &nbsp; 
              <span>Sale Price: <font style={{color: 'green'}}>Rs. {product.salePrice && product.salePrice }</font></span>
              <br />This sale is <font style={{color: 'green'}}>STARTED</font> on { getDateFormat(product.saleStartDate) } and will <font style={{color: 'red'}}>END</font> on { getDateFormat(product.saleEndDate) }
            </span>
          </span>		
        </label> 
      </div>
    </div>
    }
    <br />
    <b>Description:</b> <br />
    {product && product.description && product.description} <br /><br />
    {product && product.images && product.images.length && product.images.map((image,idx) => (
      <a key={idx} target="blank" href={`${backendServerURL}/images/${image}`}>
      <img src={`${backendServerURL}/images/${image}`} alt={image} style={{maxWidth: '64px', maxHeight: '64px', marginRight: '15px'}} />
    </a>
    )) }
    
  </div>
  <div className="modal-footer" style={{justifyContent: 'left'}}>
    <span style={{fontSize: '11px'}}>
      <b>Company:</b> {product && product.company && product.company}
    </span>
  </div>
</div>

        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }


  export default productModel;