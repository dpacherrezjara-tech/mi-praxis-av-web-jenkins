/*
 * WRF021.java
 *
 * Created on 09 de Febrero de 2010, 11:34 AM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;


public class WRF021 implements Serializable {
        
    private String strUser;
    private String strModule;
    private String strOpcion;
    private String strTransaccion;
    private String strOpcionf;
    
    
    /** Creates a new instance of WRF021 */
    public WRF021() {
        strUser = "";
        strModule = "";
        strOpcion = "";
        strTransaccion = "";
        strOpcionf = "";
    }

    
    
    
    public String getStrUser() {
        return this.strUser;
    }
    public void setStrUser(String strUser) {
        this.strUser = strUser;
    }    

    
    
    public String getStrModule() {
        return this.strModule;
    }
    public void setStrModule(String strModule) {
        this.strModule = strModule;
    }
    
    
    
    public String getStrOpcion(){
        return this.strOpcion;
    }
    public void setStrOpcion(String strOpcion) {
        this.strOpcion = strOpcion;
    }
    
    
    
    public String getStrTransaccion() {
        return this.strTransaccion;
    }
    public void setStrTransaccion(String strTransaccion) {
        this.strTransaccion = strTransaccion;
    }

    public String getStrOpcionf() {
        return strOpcionf;
    }

    public void setStrOpcionf(String strOpcionf) {
        this.strOpcionf = strOpcionf;
    }
    
    
}
