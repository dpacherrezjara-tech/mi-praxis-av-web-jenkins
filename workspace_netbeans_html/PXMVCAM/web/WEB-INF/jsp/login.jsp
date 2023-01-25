<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="Cache-Control" content="no-store">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Praxis Login</title>
        <link href="<c:url value="/resources/css/estilos.css" />" rel="stylesheet" type="text/css">
        <link href="<c:url value="/resources/css/modal.css" />" rel="stylesheet" type="text/css">
        
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <script type="text/javascript" src="<c:url value="/resources/js/jquery-1.10.2.min.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/jquery.numeric.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/modal/bootstrap.min.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/ext-6.0.2/ext-all.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/controllers/PraxisValidate.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/controllers/frmLogin.js" />"></script>
        <link rel="Shortcut Icon" href="<c:url value="/resources/img/login/favicon_2.png" />"  />
        <!--[if IE]>
        <style>
            body{ 
                margin:0px;
                height:100%;
            }
        </style>
        <![endif]-->
        
        <!--[if lt IE 9]>
        <style>
            #theader_iata{
                background-image: none !important;
        filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<c:url value="/resources/img/login/logo_IATA_transparent.png" />',sizingMethod='scale');-ms-filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<c:url value="/img/login/logo_IATA_transparent.png" />',sizingMethod='scale')";
            }
            
            #theader_miatech{
                background-image: none !important;
                filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<c:url value="/resources/img/login/logo_miatech3.png" />',sizingMethod='scale');-ms-filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<c:url value="/img/login/logo_miatech3.png" />',sizingMethod='scale')";                
            }
        </style>
        <![endif]-->
        <style>
            .instancia {
                color: #F0F0F0;
                font-family: Arial;
                position: absolute;
                left: 45.5%;
                font-size: 16pt;
            }
        </style>
        <script type="text/javascript">
           var CONTEXTPATH = '<%=request.getContextPath()%>';
           console.log('CONTEXTPATH:'+CONTEXTPATH);
           var URL =  window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
           if(window.location.hostname==='10.19.17.33')
               window.location = 'https://praxisamtesting.miatech.net'+CONTEXTPATH;
           if(window.location.hostname==='10.19.17.40')
               window.location = 'https://praxisam.miatech.net'+CONTEXTPATH;
           console.log('URL:'+URL);
        </script>
    </head>
    <body>
        <form name="frmLogin" id="frmLogin" method="post" action="<%=request.getContextPath()%>/Home">
        	<input type="hidden" id="txtContextPath" name="txtContextPath" value="<%=request.getContextPath()%>">
                <table class="BordeMenuLogin" bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" align="center">
                <tbody><tr valign="middle">
                    <td width="100%" align="center" height="100%" valign="middle">
                        <table align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody><tr>
                                <td width="766" height="300" align="center" class="LinesHor">
                                    <div id="theader">
                                        <div id="theader_bar">
                                            <div id="theader_iata"></div>
                                            <div id="theader_miatech"></div>
                                        </div>
                                        <center><h3 class="instancia">AEROMEXICO</h3></center>
                                        <div id="theader_body">
                                            <div id="theader_revenue"></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td width="766" height="210" align="center">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0">
                                        <tbody><tr>
                                            <td width="366" height="210" background="assets/img/bg_options.gif">
                                                <img alt="Header Login" src="resources/img/login/avion_atardecer.jpg" align="left" width="366" height="210">
                                            </td>
                                            <td width="400" height="210" valign="middle" bgcolor="#DDE5E8" background="assets/img/bg_options.gif">
                                                <table width="350" border="0" cellpadding="0" cellspacing="0">
                                                    <tbody><tr>
                                                        <td colspan="3" align="center" height="20">&nbsp;
                                                            
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30" align="left">&nbsp;</td>
                                                        <td width="180" align="right" class="titlelogin">&nbsp;User :</td>
                                                        <td width="140" align="right">&nbsp;<!--TextLogin-->
                                                            <input type="text" size="15" name="txtAuthName" onkeypress="return validateAlphanumeric(event);" class="css_alpha" maxlength="10" id="txtAuthName" required="">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">&nbsp;</td>
                                                        <td align="right" class="titlelogin">&nbsp;Password :</td>
                                                        <td align="right">&nbsp;
                                                            <input type="password" size="15" name="txtAuthPass" maxlength="15" id="txtAuthPass" onkeypress="return validateAlphanumeric(event);" class="css_alpha" required="">
                                                        </td>
                                                    </tr>
                                                    <tr id="tnewpass" style="display: none">
                                                        <td align="left">&nbsp;</td>
                                                        <td align="right" class="titlelogin" valign="middle">&nbsp;New Password :</td>
                                                        <td align="right">&nbsp;
                                                            <input type="password" size="15" name="txtNewPass" maxlength="15" id="txtNewPass" onkeypress="return validateAlphanumeric(event);" class="css_alpha">
                                                        </td>
                                                    </tr>
                                                    <tr id="tconfpass" style="display: none">
                                                        <td align="left">&nbsp;</td>
                                                        <td align="right" class="titlelogin" valign="middle">&nbsp;Confirm Password :</td>
                                                        <td align="right">&nbsp;
                                                            <input type="password" size="15" name="txtConfirmPass" maxlength="15" id="txtConfirmPass" onkeypress="return validateAlphanumeric(event);" class="css_alpha">
                                                        </td>
                                                    </tr>                                                    
                                                    <tr>
                                                        <td colspan="3" align="" valign="middle" height="40"><!--buttonLogin-->
                                                            <div style="float:right">
                                                            <input type="button" name="Submit" id="Submit" value="Sign In" class="btnlogin">
                                                            <input type="button" name="ChangePassword" id="ChangePassword" value="Change Password" class="btnChangePassword" style="display:none">
                                                            <input type="button" name="CancelPassword" id="CancelPassword" value="Cancel" class="btnChangePassword" onclick="cancelChangePwd();" style="display:none">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3" align="right" valign="middle">
                                                            <div style="float:right">
                                                            <a id="lnkChangePwd" href="#" onclick="changePwd();">Change password</a>
                                                            </div>
                                                        </td>
                                                    </tr>                                                    
                                                    <tr>
                                                        <td colspan="3" align="center" height="20" valign="top" class="clsTextError" id="divMensajeError">                                                            
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td width="766" align="center" id="tfooter" class="txtFooter" height="30">
                                    2021 © Copyright Miami Technology Group,Inc. Rights reserved. v1.0
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>            
            <div id="pnlAlertMessage" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="pnlAlertMessage" aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3>AEROMEXICO - Revenue Accounting Modules</h3>
                </div>
                <div class="modal-body">
                    <label id="lblMessage" name="lblMessage">Message</label>
                </div>
                <div class="modal-footer">
                    <input type="button" name="btnCloseAlert" id="btnCloseAlert" value="Accept" class="btnlogin" data-dismiss="modal">
                </div>                
            </div>
        </form>
    </body>
</html>