const state = {
    userMessage: {}
}

if(!state.userMessage.postbox) {
    if (localStorage.getItem("mybook_user_msg")) {
    	state.userMessage = JSON.parse(localStorage.getItem("mybook_user_msg"))
    }
}
export default state
