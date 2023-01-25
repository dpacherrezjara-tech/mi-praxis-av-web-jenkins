// * @name     numeric
// * @param    config      { decimal : "." , negative : true }
// * @param    callback     A function that runs if the number is not valid (fires onblur)
// * @author   Sam Collett (http://www.texotela.co.uk)
// * @example  $(".numeric").numeric();
// * @example  $(".numeric").numeric(","); // use , as separator
// * @example  $(".numeric").numeric({ decimal : "," }); // use , as separator
// * @example  $(".numeric").numeric({ negative : false }); // do not allow negative values
// * @example  $(".numeric").numeric(null, callback); // use default values, pass on the 'callback' function
// * @example  $(".numeric").numeric({ scale: 2 }); // allow only two numbers after the decimal point.
// * @example  $(".numeric").numeric({ scale: 0 }); // Same as $(".numeric").numeric({ decimal : false });
// * @example  $(".numeric").numeric({ precision: 2 }); // allow only two numbers.
// * @example  $(".numeric").numeric({ precision: 4, scale: 2 }); // allow four numbers with two decimals. (99.99)

// Tabla de control de teclas para tipo de datos, simplificado a una etiqueta

// Permite 1 decimal, no negativos
$(".decimal1").numeric({ decimal: ".", negative: false, scale: 1 });
// Permite 1 decimal, con negativos
$(".decimal1n").numeric({ decimal: ".", negative: true, scale: 1 });

// Permite 2 decimales, no negativos
$(".decimal2").numeric({ decimal: ".", negative: false, scale: 2 });
// Permite 2 decimales, con negativos
$(".decimal2n").numeric({ decimal: ".", negative: true, scale: 2 });

// Permite 3 decimales, no negativos
$(".decimal3").numeric({ decimal: ".", negative: false, scale: 3 });
// Permite 3 decimales, con negativos
$(".decimal3n").numeric({ decimal: ".", negative: true, scale: 3 });

// Permite 4 decimales, no negativos
$(".decimal4").numeric({ decimal: ".", negative: false, scale: 4 });
// Permite 4 decimales, con negativos
$(".decimal4n").numeric({ decimal: ".", negative: true, scale: 4 });

// Permite 6 decimales, no negativos
$(".decimal6").numeric({ decimal: ".", negative: false, scale: 6 });
// Permite 6 decimales, con negativos
$(".decimal6n").numeric({ decimal: ".", negative: true, scale: 6 });

// Permite enteros, no negativos
$(".entero").numeric({ decimal: ".", negative: false, scale: 0 });
// Permite enteros, con negativos
$(".enteron").numeric({ decimal: ".", negative: true, scale: 0 });

// No permite espacios en blanco al lado izquierdo
$(document).on('keyup', '.noleftspace', function (e) {
    //$(".noleftspace").on('change', function (e) {
    var intId = $(this);
    if (intId.val() === ' ') 
        intId.val('');
});

// No permite espacios en blanco en ambos lados
$(document).on('blur', '.noleftspace', function (e) {
    //$(".noleftspace").on('change', function (e) {
    var intId = $(this);
    intId.val($.trim(intId.val()));
    //return false;
});

// Solo alfanumericos
$(document).on('keypress', '.alfanumeric', function (e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;

});

// Solo alfanumericos
$(document).on('keypress', '.norisk', function (e) {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;

});

// No comillas simples ni dobles ''
$(document).on('keypress', '.noquotes', function (e) {
    //var str = $(this).val();
    //str = str.replace(/(['"])/g, "");
    //str = str.replace(/"/g, '');
    //str = str.replace(/'/g, '');
    //str = str.replace(/'/g, '');
    //  /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/ix
    //    var regex = new RegExp("/\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/ix");
    //    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    //    if (regex.test(str)) {
    //        return true;
    //    }
    //    e.preventDefault();
    //    return false;


    //var validate = regex.test(str);
    //alert(validate);
    //$(this).val(str);
    //    e.preventDefault();
    //    return true;
    var t = $(this); // document.getElementById("text");
    //t.addEventListener("input", function () {
    var str = t.val(); // this.value;
    var pos = str.indexOf("'");
    
    //alert(pos);
    if (str.search(/'|"/g) !== -1) {
        return false; // alert("\'\"is not allowed")
    }
    //}, false);
});
