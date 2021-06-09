import React from "react";


class RedirectTo {
    // constructor(props) {
    //     super(props);
    //     this.redirectToLogin = this.redirectToLogin.bind(this);
    // }

    redirectToHome() {
        window.location.href = "/advertisement";
    }

    //fixme dead code
    redirectToLogin() {
        window.location.href = "login";
    }


    redirectToOrderForm(props) {
        const advertisementId = this.props.advertisementId;
        const path = "/advertisement/order/" + advertisementId;
        this.props.history.push(path);
    }

}
export default new RedirectTo();


