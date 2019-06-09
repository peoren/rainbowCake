

$(function(){
    var time=$('#time').text();
    setInterval(function(){
    
      time=time-1;
    $('#time').text(time);
    },1000)
    setTimeout(function() {
        location.href='.'
    },3000);

})