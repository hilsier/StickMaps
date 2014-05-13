package Management;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author hilsierivan
 */
public class Users {
    
   Conexion con;
    
    
   public Users(){
   con = new Conexion();
   
   con.Connect();
   
   }
   
   
   public int getIdUser(String Email){
   ResultSet set=null;
   int id=0;    
   
   set=con.Search("select idUsuario from usuarios where Correo='"+Email+"'");
   
       try {
           while(set.next()){
            id=set.getInt(1);
           }
       
       
       } catch (SQLException ex) {
           Logger.getLogger(Users.class.getName()).log(Level.SEVERE, null, ex);
       }
   
   
   return id;
   }
   
   
    public String NewUser(String Name,String Pass,String Email,String Institution,String NickName){
    
        
        String Result= "";
                
    if(con.Insert("insert into usuarios(idUsuario,Nombre,Contra,Correo,Institucion,Nickname)"
            + "values(NULL,'"+Name+"','"+Pass+"','"+Email+"','"+Institution+"','"+NickName+"')")){
   Result= "El usuario ha sido agregado con exito";
    }
    else{
    Result="fallo";
        
    }
       
        return Result;
        
    }
    
    public String DeleteUser(int id ){
    String isDeleted="";
    
    if(con.Delete("delete from usuarios where idUsuario="+id+"")){
    
        isDeleted="usuario borrado con exito";
        
    }
    
    else{
    isDeleted="no se encontro email";
    }
    
    
    
    return isDeleted;
    }
    
public String UpdateUser(int id,String Name,String Pass,String Email,String Institution,String NickName){
String isUpdate="";


if(con.Update("UPDATE usuarios SET Nombre = '"+Name+"',Contra='"+Pass+"',Correo='"+Email+"',Institucion='"+Institution+"',NickName='"+NickName+"' WHERE idUsuario ="+id+"")){
   isUpdate= "El usuario ha sido actualizado con exito";
    }
    else{
    isUpdate="fallo";
        
    }


  return isUpdate;
}    
    
    
    
    
}
