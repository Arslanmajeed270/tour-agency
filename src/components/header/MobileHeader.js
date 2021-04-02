import React, { Component } from 'react';


export default class MobileHeader extends Component {
    render() {
      const { navBar, navBarHandler, menuWrapper } = this.props;
        return (
            <React.Fragment>
                <div id="kt_header_mobile" className="kt-header-mobile  kt-header-mobile--fixed ">
                    <div className="kt-header-mobile__logo">
                      <a href="index.html">
                        <img alt="Logo" src="../assets/media/logos/logo-light.png" />
                      </a>
                    </div>
                    <div className="kt-header-mobile__toolbar">
                      <button 
                      className={"kt-header-mobile__toggler kt-header-mobile__toggler--left"+
                      (navBar === false ? " kt-header-mobile__toolbar-toggler--active" : "")} 
                        onClick={navBarHandler} id="kt_aside_mobile_toggler"><span /></button>
                      <button className={"kt-header-mobile__toggler"+(menuWrapper === false ? " kt-header-mobile__toolbar-toggler--active" : "")} onClick={this.props.menuWrapperHeadhandler} id="kt_header_mobile_toggler"><span /></button>
                      <button className={"kt-header-mobile__topbar-toggler"+(this.props.navHead === false ? " kt-header-mobile__toolbar-topbar-toggler--active" : "")} onClick={this.props.navHeadhandler} id="kt_header_mobile_topbar_toggler"><i className="flaticon-more" /></button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
