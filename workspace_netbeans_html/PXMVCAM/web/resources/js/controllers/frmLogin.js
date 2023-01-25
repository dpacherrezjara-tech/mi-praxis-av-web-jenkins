
$(document).ready(function() {
    var myInput1 = document.getElementById('txtAuthName');
    myInput1.onpaste = function(e) {
      e.preventDefault();
    };
    
    var myInput2 = document.getElementById('txtAuthPass');
    myInput2.onpaste = function(e) {
      e.preventDefault();
    };
    
    var myInput3 = document.getElementById('txtNewPass');
    myInput3.onpaste = function(e) {
      e.preventDefault();
    };
    
    var myInput4 = document.getElementById('txtConfirmPass');
    myInput4.onpaste = function(e) {
      e.preventDefault();
    };    
    
    
    $('#txtAuthName').keyup(function(e) {
        if (e.keyCode === 13) {
            $('#txtAuthPass').select();
            
        }
    });
    $('#txtAuthPass').keypress(function(e) {
        if (e.keyCode === 13) {
            fnLogin();
        }
    });
    $('#Submit').click(fnLogin);
    $('#ChangePassword').click(fnChangePassword);
    $("#txtAuthName").focus();
    $("#txtAuthName").select();
    //return(pageLoad());
});

function validateAlphanumeric(e) { // 1
        tecla = (document.all) ? e.keyCode : e.which; // 2
        //console.log(tecla);
        if (tecla === 8 || tecla === 0) return true; // 3
        patron =/\w/; // Acepta números y letras
        te = String.fromCharCode(tecla); // 5
        return patron.test(te); // 6
}

function pageLoad()
{
//    <% if(request.getAttribute("txtLoginError")!=null){ %>
//            alert(request.getAttribute("txtLoginError"));
//    <% } %>
//    document.getElementById('txtAuthName').focus();
}

function showMessage(strMsg){ 
    
    if($('#pnlAlertMessage') !== null){
    $('#lblMessage').html(strMsg);
    $('#pnlAlertMessage')
            .modal(
            { 
                backdrop : true,
                show: true,
                keyboard: true
            }); 
     $("#btnCloseAlert").focus();       
    }
    
}

function fnLogin(){
    if ($('#txtAuthName').val().length === 0 || $('#txtAuthPass').val().length === 0) {
        showMessage('You must enter Username and Password.');
    } else {    
        AsyncLogin();
    }
}

function fnChangePassword() {
    if ($('#txtAuthName').val().length === 0 || $('#txtAuthPass').val().length === 0 || $('#txtNewPass').val() .length < 8 || $('#txtConfirmPass').val().length < 8) {
        showMessage('The following fields are mandatories:<br/>User.<br/>Password.<br/>New Password (Alphanumeric between 8 and 11 characters).<br/>Confirm Password.<br/>Do not use old passwords');
        //alert('You must enter a Username/Password.');
    } else {
        if($('#txtNewPass').val() !==  $('#txtConfirmPass').val()){
            //alert('Password and New Password are differents.');
            showMessage('New Password and Confirm Password are differents.');
        } else {
            AsyncChangePassword();//$('#frmLogin').submit();
        }                
    }
}

function cambiarVista(element,style){
    objectDOM = document.getElementById(element);
    objectDOM.style.display = style;
}

function changePwd(){
    //Mostrar elementos para cambiar password
    cambiarVista('tnewpass','table-row');
    cambiarVista('tconfpass','table-row');
    cambiarVista('Submit','none');
    cambiarVista('lnkChangePwd','none');
    cambiarVista('ChangePassword','inline');
    cambiarVista('CancelPassword','inline');
    document.getElementById('txtNewPass').value = '';
    document.getElementById('txtConfirmPass').value = '';                
    //document.getElementById('txtNewPass').focus();
}

function cancelChangePwd(){
    //Ocultar elementos para cambiar password
    cambiarVista('tnewpass','none');
    cambiarVista('tconfpass','none');
    cambiarVista('Submit','inherit');
    cambiarVista('lnkChangePwd','inherit');
    cambiarVista('ChangePassword','none');
    cambiarVista('CancelPassword','none');
    document.getElementById('txtAuthName').focus();
}

function AsyncLogin() {
        //document.forms[0].submit();
    $.ajax({
        url: $('#txtContextPath').val() +'/Login/',
        type: 'POST',
        async: false,    
        data: {txtAuthName: $('#txtAuthName').val().toUpperCase(), txtAuthPass: $('#txtAuthPass').val()},
        success: function(status) {
            if (status === 'success') {
                    //showMessage('You have logged in successfully.');
                    document.forms[0].submit();
                    //strHtmlAplication = data.substring(count_customer + 7, count_application);
                
            } else {
                //alert('There was a problem with the request. Error: ' + xhr);
                //showMessage('Username or Password is incorrect');
                showMessage(status);
            }
        },
        error: function(throwError) {
                showMessage('Username or Password is incorrect');
        },
        cache: false
    });
}

function AsyncChangePassword() {
    $.ajax({
        url: $('#txtContextPath').val() + '/changePassword/',
        type: 'POST',
        async: false,    
        data: {txtAuthName: $('#txtAuthName').val().toUpperCase(), txtAuthPass: $('#txtAuthPass').val(), txtNewPass: $('#txtNewPass').val()},
        success: function(status) {
            if (status === '') {
                //if (data.indexOf("changed", 0) !== -1) {
                    //alert('Your password has been successfully changed.');
                    showMessage('Your password has been successfully changed.');
                    cancelChangePwd();
                    document.getElementById('txtAuthPass').value = '';
                    document.getElementById('txtNewPass').value = '';
                    document.getElementById('txtConfirmPass').value = '';
                    //strHtmlAplication = data.substring(count_customer + 7, count_application);
                //} else {
                    //alert(data);
                    //showMessage(data);
                //}
                //$("#divMensajeError").append(strHtmlMensajeError);
            } else {
                //alert('There was a problem with the request. Error: ' + xhr);
                //showMessage('The following 1 fields are mandatories:<br/>User.<br/>Password.<br/>New Password (Alphanumeric between 8 and 10 characters).<br/>Confirm Password.<br/>Do not use old passwords.');
                showMessage(status);
            }
        },
        error: function(throwError) {
                //showMessage('The following 2 fields are mandatories:<br/>User.<br/>Password.<br/>New Password (Alphanumeric between 8 and 10 characters).<br/>Confirm Password.<br/>Do not use old passwords.');
                showMessage('There was a problem with the request. Try again.');
        },
        cache: false
    });
}