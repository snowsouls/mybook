const state = {
    userMessage: {}
}
/*从本地存储读取数据*/
for(var item in state) {
  localStorage.getItem(item)? state[item] = JSON.parse(localStorage.getItem(item)): false;
}


export default state
