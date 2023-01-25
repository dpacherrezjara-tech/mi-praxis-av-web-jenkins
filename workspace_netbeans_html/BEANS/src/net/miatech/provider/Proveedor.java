/*
 * Proveedor.java
 *
 * Created on 6 de julio de 2005, 10:41 AM
 */

package net.miatech.provider;

import java.sql.*;
import java.util.*;
import net.miatech.beans.UserView;

/**
 *
 * @author  fcrisostomo
 */
public class Proveedor {
    
    /** Creates a new instance of Proveedor */
    public Proveedor() {
    }
    
    public static Connection getConnectionIS(){
        Connection con = null;
        ResourceBundle rb = ResourceBundle.getBundle("net.miatech.properties.pool");
        try {
            Class.forName(rb.getString("IS_driver"));
            con = DriverManager.getConnection(rb.getString("IS_url"),rb.getString("IS_user"),rb.getString("IS_pwd"));
        } catch(Exception ex){
            ex.printStackTrace();
        }
        return con;
    }
    
    public static Connection getConnectionIS(UserView uv){
        Connection con = null;
        ResourceBundle rb = ResourceBundle.getBundle("net.miatech.properties.pool");
        try {
            Class.forName(rb.getString("IS_driver"));
            con = DriverManager.getConnection(rb.getString("IS_url"),uv.getUserInfo().USR,uv.getUserInfo().TOKEN);
        } catch(Exception ex){
            ex.printStackTrace();
        }
        return con;
    }
    
    public static Connection getConnectionOracle(){
        Connection con = null;
        ResourceBundle rb = ResourceBundle.getBundle("net.miatech.properties.pool");
        try {
            Class.forName(rb.getString("ORA_driver"));
            con = DriverManager.getConnection(rb.getString("ORA_url"),rb.getString("ORA_user"),rb.getString("ORA_pwd"));
        } catch(Exception ex){
            ex.printStackTrace();
        }
        return con;
    }
    
    public static Connection getConnectionOracle(UserView uv){
        Connection con = null;
        ResourceBundle rb = ResourceBundle.getBundle("net.miatech.properties.pool");
        try {
            Class.forName(rb.getString("ORA_url"));
            con = DriverManager.getConnection(rb.getString("ORA_url"),uv.getUserInfo().USR,uv.getUserInfo().TOKEN);
        } catch(Exception ex){
            ex.printStackTrace();
            
        }
        return con;
    }
}