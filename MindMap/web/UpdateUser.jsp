<%-- 
    Document   : UpdateUser
    Created on : 12-may-2014, 15:34:42
    Author     : hilsierivan
--%>

<%@page import="Management.Users"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
Users user=new Users();

 String Name=request.getParameter("Name").toString();
//Password:'molina',Email:'hilsier_sim@hotmail.com',Institution:'poli',NickName:'ivan'
String Password=request.getParameter("Password").toString();
String Email=request.getParameter("Email").toString();
String Institution=request.getParameter("Institution").toString();
String NickName=request.getParameter("NickName").toString();

int id=user.getIdUser(Email);


out.print(user.UpdateUser(id, Name, Password, Email, Institution, NickName));


    
    

%>
