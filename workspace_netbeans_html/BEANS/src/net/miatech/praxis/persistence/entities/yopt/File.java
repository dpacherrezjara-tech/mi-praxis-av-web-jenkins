/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.entities.yopt;

import java.io.Serializable;

/**
 *
 * @author lremicio
 */
public class File implements Serializable {
    
    public String TXT = "";

    public String getTXT() {
        return TXT;
    }

    public void setTXT(String TXT) {
        this.TXT = TXT;
    }
    
}
