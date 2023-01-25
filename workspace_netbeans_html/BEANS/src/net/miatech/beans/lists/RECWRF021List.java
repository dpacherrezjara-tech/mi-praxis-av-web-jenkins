/*
 * RECWRF021List.java
 *
 * Created on 21 de mayo de 2008, 15:47 PM
 */

package net.miatech.beans.lists;

import net.miatech.beans.RECWRF021;
import java.util.*;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class RECWRF021List extends ArrayList implements Serializable {
    
    RECWRF021 RECWRF021Filter = null;
    
    /**
     * Creates a new instance of RECWRF020List
     */
    
    public RECWRF021List() {
        RECWRF021Filter = new RECWRF021();
    }

    public RECWRF021 getRECWRF021(int i){
        return (RECWRF021) get(i);
    }
        
    public RECWRF021 getRECWRF021Filter() {
        return RECWRF021Filter;
    }
    
    public void setRECWRF021Filter(RECWRF021 RECWRF021Filter) {
        this.RECWRF021Filter = RECWRF021Filter;
    }
    
}
