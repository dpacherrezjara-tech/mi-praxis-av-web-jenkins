/*
 * RECA729List.java
 *
 * Created on 02 de Abril de 2009, 18:11 PM
 */

package net.miatech.beans.lists;

import java.io.*;
import java.util.*;
import net.miatech.beans.RECA729;
/**
 *
 * @author  claudia
 */
public class RECA729List extends ArrayList<RECA729> implements Serializable {
    
    RECA729 RECA729Filter = null;
    /**
     * Creates a new instance of RECA729List
     */
    public RECA729List() {
        RECA729Filter = new RECA729();
    }

    public RECA729 getRECA729(int i){
        return (RECA729) get(i);
    }
        
    public RECA729 getRECA729Filter() {
        return RECA729Filter;
    }
    
    public void setRECA729Filter(RECA729 RECA729Filter) {
        this.RECA729Filter = RECA729Filter;
    }
    
}
