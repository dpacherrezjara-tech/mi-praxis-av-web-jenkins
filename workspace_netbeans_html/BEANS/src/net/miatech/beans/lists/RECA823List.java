/*
 * RECA021List.java
 *
 * Created on 25 de Marzo de 2005, 06:04 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.RECA823;
/**
 *
 * @author  claudia
 */
public class RECA823List extends ArrayList implements Serializable {
    
    RECA823 RECA823Filter = null;
    /**
     * Creates a new instance of RECA823List
     */
    public RECA823List() {
        RECA823Filter = new RECA823();
    }

    public RECA823 getRECA823(int i){
        return (RECA823) get(i);
    }
        
    public RECA823 getRECA823Filter() {
        return RECA823Filter;
    }
    
    public void setRECA823Filter(RECA823 RECA823Filter) {
        this.RECA823Filter = RECA823Filter;
    }
    
}
