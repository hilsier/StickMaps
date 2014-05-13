/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Management;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;

/**
 *
 * @author hilsier
 */
public class Conexion {
       String driver = "com.mysql.jdbc.Driver";
    String url = "jdbc:mysql://localhost:3306/mindmaps";
    String usuario = "root";
    String contra="";
    Statement St=null;
    ResultSet set=null;
    Connection conexion=null;
    boolean isconected=false;
    
    
    
    public Conexion(){
          
    }
    
    public ResultSet Search(String sql) {
           try {
               St=conexion.createStatement();
                set=St.executeQuery(sql);
           } catch (SQLException ex) {
              System.out.println(ex.toString());
           }
  
 
  return set; 
    }
    
public void Connect(){
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException ex) {
           System.out.println(ex.toString());
        }
        try {
            conexion =  (Connection) DriverManager.getConnection(url,usuario,contra);
            System.out.println("Conectado");
       isconected=true;
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null,ex.toString(),"informacion",JOptionPane.INFORMATION_MESSAGE);
        }
   
    }
    
    
    public boolean Insert(String sql) {
           try {
               St=conexion.createStatement();
               
               if(St.executeUpdate(sql)==1){
                   return true;
               }  } catch (SQLException ex) {
              System.out.println(ex.toString());
           }
        return false;
       
        
    
    }
    
    public boolean Update(String sql) {
        try {
            St=conexion.createStatement();
         if (St.executeUpdate(sql)==1){
             System.out.println("Exito");
             
            return true; 
             }
        } catch (SQLException ex) {
         System.out.println(ex.toString());
         return false;
        }
    return false;  
        
    
    }
     public boolean Delete(String sql){
        try {
            St=conexion.createStatement();
               
              if(St.executeUpdate(sql)==1){
              return true;
              }
        } catch (SQLException ex) {
              System.out.println(ex.toString());
        }
      return false;
        
        
    
    }
     
 
    public void Shutdown(){
        try {
            conexion.close();
            isconected=false;
            System.out.println("Desconectado");
        } catch (SQLException ex) {
           System.out.println(ex.toString());
        }
    
    }
    
    public boolean isConected(){
        return  isconected;
    }
}
