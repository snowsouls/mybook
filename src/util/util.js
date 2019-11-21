const Ajax = function(){
    function request(url,opt){
        function fn(){}
        var async   = opt.async !== false,
            method  = opt.method    || 'GET',
            data    = opt.data      || null,
            success = opt.success   || fn,
            failure = opt.failure   || fn;
            method  = method.toUpperCase();
        if(method == 'GET' && data){
            url += (url.indexOf('?') == -1 ? '?' : '&') + data;
            data = null;
        }
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.onreadystatechange = function(){
            _onStateChange(xhr,success,failure);
        };
        xhr.open(method,url,async);
        if(method == 'POST'){
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
        }
        xhr.send(data);
        return xhr;
    }
    function _onStateChange(xhr,success,failure){
        if(xhr.readyState == 4){
            var s = xhr.status;
            if(s>= 200 && s < 300){
                success(xhr);
            }else{
                failure(xhr);
            }
        }else{}
    }
    return {request:request};
}();

const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
// const passwordReg = /^[0-9a-zA-Z]{6,16}$/;      // 6-16位字母或数字组合
// const passwordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,16}$/;      // 6-16位 数字、字母、特殊字符（除空格），起码其中两种组合
// const passwordReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,20}$/;      // 6-16位 数字、字母、特殊字符（除空格），起码其中两种组合
const passwordReg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,15}$/;      // 6-16位 数字、字母、特殊字符（._)
export {
	Ajax,
	mailReg,
    passwordReg
}
