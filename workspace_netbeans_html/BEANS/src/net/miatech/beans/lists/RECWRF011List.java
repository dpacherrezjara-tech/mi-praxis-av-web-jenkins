/*
 * RECWRF011List.java
 *
 * Created on 8 de abril de 2008, 10:08 AM
 */

package net.miatech.beans.lists;

import net.miatech.beans.RECWRF011;
import java.util.*;
import java.io.*;
/**
 *
 * @author  mflor
 */
public class RECWRF011List extends ArrayList implements Serializable {
    RECWRF011 RECWRF011Filter = null;
    /**
     * Creates a new instance of RECWRF011List
     */
    public RECWRF011List() {
        RECWRF011Filter = new RECWRF011();
    }

    public RECWRF011 getRECWRF011(int i){
        return (RECWRF011) get(i);
    }
        
    public RECWRF011 getRECWRF011Filter() {
        return RECWRF011Filter;
    }
    
    public void setRECWRF011Filter(RECWRF011 RECWRF011Filter) {
        this.RECWRF011Filter = RECWRF011Filter;
    }
    
}
