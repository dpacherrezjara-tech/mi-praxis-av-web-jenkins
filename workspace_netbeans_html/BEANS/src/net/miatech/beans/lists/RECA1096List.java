/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.lists;
import java.util.*;
import java.io.*;
import net.miatech.beans.RECA1096;
/**
 *
 * @author claudia
 */
public class RECA1096List extends ArrayList implements Serializable {
    RECA1096 RECA1096Filter = null;
    /**
     * Creates a new instance of RECA1096List
     */
    public RECA1096List() {
        RECA1096Filter = new RECA1096();
    }

    public RECA1096 getRECA1096(int i){
        return (RECA1096) get(i);
    }
        
    public RECA1096 getRECA1096Filter() {
        return RECA1096Filter;
    }
    
    public void setRECA1096Filter(RECA1096 RECA1096Filter) {
        this.RECA1096Filter = RECA1096Filter;
    }
    
}

