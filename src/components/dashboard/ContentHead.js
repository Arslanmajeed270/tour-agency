import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class ContentHead extends Component {
    render() {
        const { title } = this.props;
        return (
            <React.Fragment>
                 <div className="kt-subheader   kt-grid__item" id="kt_subheader">
                    <div className="kt-subheader__main">
                    <h3 className="kt-subheader__title">{title}</h3>
                    <span className="kt-subheader__separator kt-subheader__separator--v" />
                    <span className="kt-subheader__desc">#XRS-45670</span>
                    <Link to='#' className="btn btn-label-warning btn-bold btn-sm btn-icon-h kt-margin-l-10">
                        Add New
                    </Link>
                    <div className="kt-input-icon kt-input-icon--right kt-subheader__search kt-hidden">
                        <input type="text" className="form-control" placeholder="Search order..." id="generalSearch" />
                        <span className="kt-input-icon__icon kt-input-icon__icon--right">
                        <span><i className="flaticon2-search-1" /></span>
                        </span>
                    </div>
                    </div>
                    <div className="kt-subheader__toolbar">
                    <div className="kt-subheader__wrapper">
                        <Link to='#' className="btn kt-subheader__btn-secondary">Today</Link>
                        <Link to='#' className="btn kt-subheader__btn-secondary">Month</Link>
                        <Link to='#' className="btn kt-subheader__btn-secondary">Year</Link>
                        <Link to='#' className="btn kt-subheader__btn-daterange" id="kt_dashboard_daterangepicker" data-toggle="kt-tooltip" title="Select dashboard daterange" data-placement="left">
                        <span className="kt-subheader__btn-daterange-title" id="kt_dashboard_daterangepicker_title">Today</span>&nbsp;
                        <span className="kt-subheader__btn-daterange-date" id="kt_dashboard_daterangepicker_date">Aug 16</span>
                        <i className="flaticon2-calendar-1" />
                        </Link>
                        <div className="dropdown dropdown-inline" data-toggle="kt-tooltip" title="Quick actions" data-placement="left">
                        <Link to='#' className="btn btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon kt-svg-icon--success kt-svg-icon--md">
                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                                <path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" id="Combined-Shape" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                <path d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z" id="Combined-Shape" fill="#000000" />
                            </g>
                            </svg>
                            {/*<i class="flaticon2-plus"></i>*/}
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                            <ul className="kt-nav">
                            <li className="kt-nav__section kt-nav__section--first">
                                <span className="kt-nav__section-text">Add new:</span>
                            </li>
                            <li className="kt-nav__item">
                                <Link to='#' className="kt-nav__link">
                                <i className="kt-nav__link-icon flaticon2-graph-1" />
                                <span className="kt-nav__link-text">Order</span>
                                </Link>
                            </li>
                            <li className="kt-nav__item">
                                <Link to='#' className="kt-nav__link">
                                <i className="kt-nav__link-icon flaticon2-calendar-4" />
                                <span className="kt-nav__link-text">Event</span>
                                </Link>
                            </li>
                            <li className="kt-nav__item">
                                <Link to='#' className="kt-nav__link">
                                <i className="kt-nav__link-icon flaticon2-layers-1" />
                                <span className="kt-nav__link-text">Report</span>
                                </Link>
                            </li>
                            <li className="kt-nav__item">
                                <Link to='#' className="kt-nav__link">
                                <i className="kt-nav__link-icon flaticon2-calendar-4" />
                                <span className="kt-nav__link-text">Post</span>
                                </Link>
                            </li>
                            <li className="kt-nav__item">
                                <Link to='#' className="kt-nav__link">
                                <i className="kt-nav__link-icon flaticon2-file-1" />
                                <span className="kt-nav__link-text">File</span>
                                </Link>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
          
                
            </React.Fragment>
        )
    }
}
