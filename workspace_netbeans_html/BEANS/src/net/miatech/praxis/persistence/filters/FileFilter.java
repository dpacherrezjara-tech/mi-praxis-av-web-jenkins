/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.yopt.File;

/**
 *
 * @author lremicio
 */
public class FileFilter extends File  implements Serializable {
    
    public String VP_TABLE = "";
    public String FILE_NAME = "";

    public String getVP_TABLE() {
        return VP_TABLE;
    }

    public void setVP_TABLE(String VP_TABLE) {
        this.VP_TABLE = VP_TABLE;
    }

}
