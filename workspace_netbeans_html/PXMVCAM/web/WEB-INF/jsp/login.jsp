<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="Cache-Control" content="no-store">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Praxis Login - Active Directory</title>
        
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
        <link rel="Shortcut Icon" href="<c:url value="/resources/img/login/favicon_2.png" />" />
        
        <style>
            .instancia {
                color: #F0F0F0;
                font-family: Arial;
                position: absolute;
                left: 47%;
                font-size: 16pt;
            }
            .error-message {
                color: #ff0000;
                font-size: 12px;
                text-align: center;
                padding: 5px;
                margin-bottom: 10px;
            }
        </style>
        
        <script type="text/javascript">
            var CONTEXTPATH = '<%=request.getContextPath()%>';
            console.log('CONTEXTPATH:'+CONTEXTPATH);
        </script>
    </head>
    <body>
        <form name="frmLogin" id="frmLogin" method="post" action="<%=request.getContextPath()%>/Home">
            <input type="hidden" id="txtContextPath" name="txtContextPath" value="<%=request.getContextPath()%>">
            
            <table class="BordeMenuLogin" bgcolor="#F2F2F2" border="0" cellpadding="0" cellspacing="0" align="center">
                <tbody>
                    <tr valign="middle">
                        <td width="100%" align="center" height="100%" valign="middle">
                            <table align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td width="766" height="300" align="center" class="LinesHor">
                                            <div id="theader">
                                                <div id="theader_bar">
                                                    <div id="theader_iata"></div>
                                                    <div id="theader_miatech"></div>
                                                </div>
                                                <center><h3 class="instancia">AVIANCA</h3></center>
                                                <div id="theader_body">
                                                    <div id="theader_revenue"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="766" height="210" align="center">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td width="366" height="210">
                                                            <img alt="Header Login" src="<c:url value="/resources/img/login/avion_atardecer.jpg"/>" align="left" width="366" height="210">
                                                        </td>
                                                        <td width="400" height="210" valign="middle" bgcolor="#DDE5E8">
                                                            <table width="350" border="0" cellpadding="0" cellspacing="0" align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td colspan="3" align="center" height="20">
                                                                            <%
    String mensajeAD = (String) request.getAttribute("mensajeAD");
    if (mensajeAD != null && !mensajeAD.isEmpty()) {
        if (mensajeAD.contains("EXITOSA")) {
            out.print("<div style='background: #d4edda; color: #155724; padding: 10px; margin: 10px 0; border-radius: 5px; text-align: center; font-weight: bold;'>" + mensajeAD + "</div>");
        } else {
            out.print("<div style='background: #f8d7da; color: #721c24; padding: 10px; margin: 10px 0; border-radius: 5px; text-align: center; font-weight: bold;'>" + mensajeAD + "</div>");
        }
    }
%>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="30" align="left">&nbsp;</td>
                                                                        <td width="180" align="right" class="titlelogin">Usuario Red :</td>
                                                                        <td width="140" align="right">
                                                                            <input type="text" size="15" name="txtAuthName" id="txtAuthName" class="css_alpha" maxlength="50" required autofocus>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left">&nbsp;</td>
                                                                        <td align="right" class="titlelogin">Contraseña :</td>
                                                                        <td align="right">
                                                                            <input type="password" size="15" name="txtAuthPass" id="txtAuthPass" class="css_alpha" maxlength="50" required>
                                                                        </td>
                                                                    </tr>
                                                                        
                                                                    <tr>
                                                                        <td align="left">&nbsp;</td>
                                                                        <td align="right" class="titlelogin">&nbsp;Customer :</td>
                                                                        <td align="right" class="titlelogin">&nbsp;
                                                                            <select name="selCustomer" id="selCustomer" class="css_alpha" style="width: 130px;" onkeypress="return validateAlphanumeric(event);">
<!--                                                                            <option value="045" selected="true">LAN Chile</option>
                                                                                <option value="462">LAN Ecuador</option>
                                                                                <option value="469">LAN Argentina</option>
                                                                                <option value="544">LATAM PASS</option>
                                                                                <option value="957">TAM Airlines</option>
                                                                                <option value="692">TAM Transportes</option>
                                                                                <option value="134">AVIANCA</option>-->
                                                                             </select>
                                                                        </td>
                                                                    </tr> 
                                                                    <tr>
                                                                        <td colspan="3" align="right" valign="middle" height="40">
                                                                            <div style="float:right">
                                                                                <input type="submit" name="Submit" id="Submit" value="Ingresar" class="btnlogin">
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="766" align="center" id="tfooter" class="txtFooter" height="30">
                                            2025 © Copyright Miami Technology Group, Inc. All rights reserved. | Active Directory Authentication
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </body>
</html>