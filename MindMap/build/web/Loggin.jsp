<%-- 
    Document   : Loggin
    Created on : 12-may-2014, 12:49:28
    Author     : hilsierivan
--%>

<%@page import="Management.Conexion"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="jquery.js"></script>
        <script type="text/javascript" src="Management.js"></script>
        <title>JSP Page</title>
       
    </head>
    <body>
       
        
        
        <label id="result">Resultado:</label>
        <input type="button" value="NuevoUsuario" id="ajaxNew">      
        <input type="button" value="EliminarUsuario" id="ajaxDelete"> 
        <input type="button" value="ActualizarUsuario" id="ajaxUpdate">
        
        
    </body>
</html>
