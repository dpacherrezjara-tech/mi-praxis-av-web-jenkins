var offSetX = -5;offSetY = 0;
var xIni = 0; var xFin = 0;
var colParent = null;

$(document).ready(function(e){
    function mouseCoords(ev) {
        if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        };
        
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    };

    $('.resizeColumn').on('mousedown', function(ev){
        var mousePos = mouseCoords(ev);

        xIni = mousePos.x + offSetX;

        $('#drag').css('display', 'block');
        $('#drag').css('left', xIni);	

        colParent = ev.target.parentNode;
        return false;
    });

    document.addEventListener('mousemove', function(ev){
        if ($('#drag').css('display') === 'block') {
                var mousePos = mouseCoords(ev);
                $('#drag').css('left', mousePos.x + offSetY);
        };
    }, false);

    document.addEventListener('mouseup', function(ev) {
        if($('#drag').length === 0) return;
        if($('#drag').css('display') === 'none') return;

        $('#drag').css('display', 'none');
        var mousePos = mouseCoords(ev);
        xFin = mousePos.x;
        var xDif = xFin - xIni;	
        var columnas = colParent.parentNode.cells;

        for(var i=0;i<columnas.length;i++){
            if(columnas[i] === colParent){
                var wd = columnas[i].offsetWidth + xDif;
                columnas[i].style.width = wd.toString()  + "px";
                break;
            };
        };
    }, false);
});