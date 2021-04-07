import React, { Component } from 'react';


export default class Form2 extends Component {
    render() {
        const { tags,
            tag,
            included,
            plan,

            // Methods 
            onChangeHandler,
            addTagsHandler
        } = this.props;

        return (
            <div>
                <div className="kt-wizard-v1__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
            <div className="kt-heading kt-heading--md"> Tags, Included & Plan </div>
            <div className="kt-form__section kt-form__section--first">
                <div className="kt-wizard-v1__form">
                    <div className="col-xl-12">
                        <div className="form-group">
                            <label>You can add tags, what is included in tour and what is the plan for days here</label>
                        </div>
                    </div>			
                
                <div className="row">
                    <div className="col-xl-12">
                        <div className="form-group">
                            <label>Tags</label>
                                <div class="input-group mb-3">
                                    <input 
                                    type="text" 
                                    class="form-control"
                                    id="tag" 
                                    name="tag" 
                                    value={tag}  
                                    onChange={onChangeHandler}
                                    aria-describedby="basic-addon2"
                                    />
                                    <div class="input-group-append">
                                    <button onClick={addTagsHandler} type="button" class="btn btn-secondary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	

                    <div className="row">
                    <div className="col-xl-12">
                        {tags && tags.length ? tags.map( (data,idx) => (
                            <span style={{marginRight: "5px"}} key={idx} className="badge badge-primary"> {data} </span>
                        ) ) : ""}
                    </div>
                    </div>	

                </div>		
                </div>
            </div>
            </div>
        )
    }
}
