import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop">
                          <div className="kt-footer__copyright">
                            2019&nbsp;©&nbsp;<Link to="/" target="_blank" className="kt-link">Keenthemes</Link>
                          </div>
                          <div className="kt-footer__menu">
                            <Link to='#' target="_blank" className="kt-footer__menu-link kt-link">About</Link>
                            <Link to='#' target="_blank" className="kt-footer__menu-link kt-link">Team</Link>
                            <Link to='#' target="_blank" className="kt-footer__menu-link kt-link">Contact</Link>
                          </div>
                </div>
            </React.Fragment>
        )
    }
}
