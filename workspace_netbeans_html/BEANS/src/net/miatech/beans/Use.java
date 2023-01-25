/*
 * Use.java
 *
 * Created on 8 de agosto de 2007, 12:36 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author claudia
 */
public class Use implements Serializable {
    
    private String strNumericCode;
    private String strName;
    
    /** Creates a new instance of Use */
    public Use() {
        strNumericCode = "";
        strName = "";
    }

    
    
    public String getStrNumericCode() {
        return this.strNumericCode;
    }
    public void setStrNumericCode(String strNumericCode) {
        this.strNumericCode = strNumericCode;
    }

    
    public String getStrName() {
        return this.strName;
    }
    public void setStrName(String strName) {
        this.strName = strName;
    }

    
}
