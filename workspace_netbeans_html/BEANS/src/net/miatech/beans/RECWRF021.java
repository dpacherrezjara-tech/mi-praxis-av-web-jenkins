/*
 * RECWRF021.java
 *
 * Created on 21 de mayo de 2008, 15:39 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;


public class RECWRF021 implements Serializable {
    
    private String strUser;
    private String strModule;
    private String strOpcion;
    private String strTransaccion;
    private String strOpcionf;
    private String strMenuOpcion;
    
    /** Creates a new instance of RECWRF021 */
    public RECWRF021() {
        strUser = "";
        strModule = "";
        strOpcion = "";
        strTransaccion = "";
        strOpcionf = "";
        strMenuOpcion = "";
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

    public String getStrMenuOpcion() {
        return strMenuOpcion;
    }

    public void setStrMenuOpcion(String strMenuOpcion) {
        this.strMenuOpcion = strMenuOpcion;
    }


    
}
