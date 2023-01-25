/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.lists;
import java.util.*;
import java.io.*;
import net.miatech.beans.RECA1007;
/**
 *
 * @author claudia
 */
public class RECA1007List extends ArrayList implements Serializable {
    RECA1007 RECA1007Filter = null;
    /**
     * Creates a new instance of RECA1007List
     */
    public RECA1007List() {
        RECA1007Filter = new RECA1007();
    }

    public RECA1007 getRECA1007(int i){
        return (RECA1007) get(i);
    }
        
    public RECA1007 getRECA1007Filter() {
        return RECA1007Filter;
    }
    
    public void setRECA1007Filter(RECA1007 RECA1007Filter) {
        this.RECA1007Filter = RECA1007Filter;
    }
    
}

