function ajax(method, url, params, callback, async) {
    async = (async == undefined) ? true : async;
  
    let xhr;
    if(window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
  
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log('数据返回阶段。');
        callback(xhr.responseText);
      } else {
        console.log('失败。');
      };
    }
  
    if(method == 'get') {
      xhr.open(method, url + '?' + formsParams(params) + '&t=' +Math.random(), async);
      xhr.send(null)
    } else if(method == 'post') {
      xhr.open(method, url, async);
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xhr.send(formsParams(params));
    }
  }
  
  function formsParams(data) {
    var arr = [];
    for(var prop in data){
        arr.push(prop + "=" + data[prop]);
    }
    return arr.join("&");
  }