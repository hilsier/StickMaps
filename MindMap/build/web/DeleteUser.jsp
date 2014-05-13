<%-- 
    Document   : DeleteUser
    Created on : 12-may-2014, 15:06:25
    Author     : hilsierivan
--%>

<%@page import="Management.Users"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    Users user=new Users();
    String Email=request.getParameter("Email").toString();
    
    int id=user.getIdUser(Email);
    
    out.print( user.DeleteUser(id));
      
    
    
    
    


%>