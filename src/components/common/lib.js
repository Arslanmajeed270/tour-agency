export const redirectDashboardIfAlreadyLogin = (auth, history) =>{
    if (auth && auth.isAuthenticated ) {
        history.push(`/dashboard`);
        return true;
    }
    return false;
}