<!--%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Validación Active Directory</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .login-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            padding: 40px;
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        
        .logo h1 {
            color: #1a2a6c;
            font-size: 28px;
            margin-bottom: 5px;
        }
        
        .logo p {
            color: #666;
            font-size: 14px;
            margin-bottom: 30px;
        }
        
        .ad-icon {
            font-size: 60px;
            margin-bottom: 20px;
        }
        
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
        }
        
        input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 14px;
        }
        
        input:focus {
            border-color: #1a2a6c;
            outline: none;
        }
        
        button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }
        
        button:hover {
            transform: translateY(-2px);
        }
        
        .error-message {
            background: #fee;
            color: #c33;
            padding: 12px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .info-box {
            margin-top: 20px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 10px;
            font-size: 11px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <div class="ad-icon">🔐</div>
            <h1>Validación Active Directory</h1>
            <p>Ingresa tus credenciales corporativas</p>
        </div>
        
        %
            String error = (String) request.getAttribute("error");
            if (error != null && !error.isEmpty()) {
                out.print("<div class='error-message'>" + error + "</div>");
            }
        %>
        
        <form action="${pageContext.request.contextPath}/loginAD" method="post">
            <div class="form-group">
                <label> Usuario Corporativo</label>
                <input type="text" name="username" required autofocus>
            </div>
            
            <div class="form-group">
                <label> Contraseña</label>
                <input type="password" name="password" required>
            </div>
            
            <button type="submit">Validar Acceso</button>
        </form>
        
        <div class="info-box">
            ⚠️ Debes tener una cuenta activa en el Directorio Activo
        </div>
            
            
    </div>
  
}
            
</body>
</html>

-->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="Cache-Control" content="no-store">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Validación Active Directory</title>
        
        <!-- Estilos originales de Avianca -->
        <link href="<c:url value="/resources/css/estilos.css" />" rel="stylesheet" type="text/css">
        <link href="<c:url value="/resources/css/modal.css" />" rel="stylesheet" type="text/css">
        
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <script type="text/javascript" src="<c:url value="/resources/js/jquery-1.10.2.min.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/jquery.numeric.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/modal/bootstrap.min.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/ext-6.0.2/ext-all.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/controllers/PraxisValidate.js" />"></script>
        <link rel="Shortcut Icon" href="<c:url value="/resources/img/login/favicon_2.png" />" />
        
        <style>
            .instancia {
                color: #F0F0F0;
                font-family: Arial;
                position: absolute;
                left: 47%;
                font-size: 16pt;
            }
            .ad-badge {
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: rgba(0,0,0,0.6);
                color: #4CAF50;
                padding: 3px 8px;
                border-radius: 10px;
                font-size: 10px;
                font-family: Arial;
                z-index: 9999;
            }
        </style>
        
        <script type="text/javascript">
           var CONTEXTPATH = '<%=request.getContextPath()%>';
           console.log('CONTEXTPATH:'+CONTEXTPATH);
        </script>
    </head>
    <body>
        <div class="ad-badge">Validación Active Directory</div>
        
        <form name="frmLoginAD" id="frmLoginAD" method="post" action="${pageContext.request.contextPath}/loginAD">
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
                                                <center><h3 class="instancia">AVIANCA AD</h3></center>
                                                <div id="theader_body">
                                                    <div id="theader_revenue"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <!-- FORMULARIO DE LOGIN AD -->
                                    <tr>
                                        <td width="766" height="210" align="center">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <!-- IMAGEN LATERAL -->
                                                        <td width="366" height="210">
                                                            <img alt="Header Login" src="<c:url value="/resources/img/login/avion_atardecer.jpg"/>" align="left" width="366" height="210">
                                                        </td>
                                                        
                                                        <!-- CAMPOS DEL FORMULARIO -->
                                                        <td width="400" height="210" valign="middle" bgcolor="#DDE5E8">
                                                            <table width="350" border="0" cellpadding="0" cellspacing="0" align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td colspan="3" align="center" height="20">&nbsp;</td>
                                                                    </tr>
                                                                    
                                                                    <!-- Mensaje de error -->
                                                                    <tr>
                                                                        <td colspan="3" align="center">
                                                                            <%
                                                                                String error = (String) request.getAttribute("error");
                                                                                if (error != null && !error.isEmpty()) {
                                                                                    out.print("<div style='color: #c33; background: #fee; padding: 8px; border-radius: 5px; margin-bottom: 10px; font-size: 12px;'>" + error + "</div>");
                                                                                }
                                                                            %>
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                    <tr>
                                                                        <td width="30" align="left">&nbsp;</td>
                                                                        <td width="180" align="right" class="titlelogin">&nbsp;Usuario Corporativo :</td>
                                                                        <td width="140" align="right">&nbsp;
                                                                            <input type="text" size="15" name="username" class="css_alpha" maxlength="50" id="txtAuthName" required autofocus>
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                    <tr>
                                                                        <td align="left">&nbsp;</td>
                                                                        <td align="right" class="titlelogin">&nbsp;Contraseña :</td>
                                                                        <td align="right">&nbsp;
                                                                            <input type="password" size="15" name="password" maxlength="50" id="txtAuthPass" class="css_alpha" required>
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                    <tr>
                                                                        <td align="left">&nbsp;</td>
                                                                        <td align="right" class="titlelogin">&nbsp;Dominio :</td>
                                                                        <td align="right" class="titlelogin">&nbsp;
                                                                            <select name="selDominio" id="selDominio" class="css_alpha" style="width: 130px;">
                                                                                <option value="miatech.net" selected>miatech.net</option>
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                    <tr>
                                                                        <td colspan="3" align="" valign="middle" height="40">
                                                                            <div style="float:right">
                                                                                <input type="submit" name="Submit" id="Submit" value="Validar Acceso" class="btnlogin">
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                    <tr>
                                                                        <td colspan="3" align="center" height="20" valign="top" class="clsTextError" id="divMensajeError"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                    <!-- FOOTER -->
                                    <tr>
                                        <td width="766" align="center" id="tfooter" class="txtFooter" height="30">
                                            2025 © Copyright Miami Technology Group, Inc. All rights reserved. | Validación Active Directory v1.0
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
