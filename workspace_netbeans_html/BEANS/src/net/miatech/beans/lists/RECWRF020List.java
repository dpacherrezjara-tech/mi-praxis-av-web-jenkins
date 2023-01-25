/*
 * RECWRF020List.java
 *
 * Created on 21 de mayo de 2008, 15:47 PM
 */

package net.miatech.beans.lists;

import net.miatech.beans.RECWRF020;
import java.util.*;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class RECWRF020List extends ArrayList implements Serializable {
    
    RECWRF020 RECWRF020Filter = null;
    
    /**
     * Creates a new instance of RECWRF020List
     */
    
    public RECWRF020List() {
        RECWRF020Filter = new RECWRF020();
    }

    public RECWRF020 getRECWRF020(int i){
        return (RECWRF020) get(i);
    }
        
    public RECWRF020 getRECWRF020Filter() {
        return RECWRF020Filter;
    }
    
    public void setRECWRF020Filter(RECWRF020 RECWRF020Filter) {
        this.RECWRF020Filter = RECWRF020Filter;
    }
    
}
