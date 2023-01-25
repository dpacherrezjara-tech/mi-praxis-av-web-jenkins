var alertOffSetX = -5, alertOffSetY = -5;
var xIni = 0, xFin = 0;
var colParent = null;
var toggleAlert = false, toggleModal = false;

$(document).ready(function(e){
    if(!alertCords){
        var alertCords = function(ev) {
            if (ev.pageX || ev.pageY) {
                return { x: ev.pageX, y: ev.pageY };
            }
            return {
                x: ev.clientX,
                y: ev.clientY
            };
        };
    };

    document.addEventListener('mousedown', function(ev){
        var classTarget = ev.target.className;

        if(
            classTarget !== 'alert-message' && 
            classTarget !== 'alert-title' &&
            classTarget.indexOf('modal-dialog') === -1
        ){ 
            toggleAlert = false;
            toggleModal = false; 
            //lg(classTarget.indexOf('modal-dialog') === -1);
            return; 
        };


        if(classTarget.indexOf('modal-dialog') !== -1){
            toggleModal = true;
        }else{
            toggleAlert = true;
        };

        return false;
    }, false);
	
    document.addEventListener('mousemove', function(ev){
        var mousePos = alertCords(ev);
        var mitad = null;
        if (toggleAlert) {
            mitad = parseInt($('.alert-message').css('width').replace('px','')) / 2;

            $('.alert-message').css('left', mousePos.x + alertOffSetX - mitad);
            $('.alert-message').css('top', mousePos.y + alertOffSetY);
        }
        else{
            if(toggleModal){
                mitad = parseInt($('.modal-dialog').css('width').replace('px','')) / 2;
                $('.modal-dialog').css('left', mousePos.x + alertOffSetX - mitad);
                $('.modal-dialog').css('top', mousePos.y + alertOffSetY);
            }
        };

    }, false);

    document.addEventListener('mouseup', function(ev){
        toggleAlert = false;
        toggleModal = false;
    }, false);
});