/*
 * RECWRF030List.java
 *
 * Created on 21 de mayo de 2008, 15:47 PM
 */

package net.miatech.beans.lists;

import net.miatech.beans.RECWRF030;
import java.util.*;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class RECWRF030List extends ArrayList implements Serializable {
    
    RECWRF030 RECWRF030Filter = null;
    
    /**
     * Creates a new instance of RECWRF030List
     */
    
    public RECWRF030List() {
        RECWRF030Filter = new RECWRF030();
    }

    public RECWRF030 getRECWRF030(int i){
        return (RECWRF030) get(i);
    }
        
    public RECWRF030 getRECWRF030Bean() {
        return RECWRF030Filter;
    }
    
    public void setRECWRF020Filter(RECWRF030 RECWRF030Filter) {
        this.RECWRF030Filter = RECWRF030Filter;
    }
    
}
