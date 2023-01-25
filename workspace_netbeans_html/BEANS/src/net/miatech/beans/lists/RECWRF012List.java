/*
 * RECWRF002List.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import net.miatech.beans.RECWRF012;
import java.util.*;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class RECWRF012List extends ArrayList implements Serializable {
    RECWRF012 RECWRF012Filter = null;
    /**
     * Creates a new instance of RECWRF012List
     */
    public RECWRF012List() {
        RECWRF012Filter = new RECWRF012();
    }

    public RECWRF012 getRECWRF012(int i){
        return (RECWRF012) get(i);
    }
        
    public RECWRF012 getRECWRF012Filter() {
        return RECWRF012Filter;
    }
    
    public void setRECWRF012Filter(RECWRF012 RECWRF012Filter) {
        this.RECWRF012Filter = RECWRF012Filter;
    }
    
}
