import React, { Fragment, Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.show !== this.props.show || this.props.children !== nextProps.children) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clearBackdrop={() => this.props.modalClosed()} clicked={() => {this.props.modalClosed()}} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
