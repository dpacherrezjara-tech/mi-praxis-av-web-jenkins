/*
 * RECWRF015List.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import net.miatech.beans.RECWRF015;
import java.util.*;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class RECWRF015List extends ArrayList implements Serializable {
    RECWRF015 RECWRF015Filter = null;
    /**
     * Creates a new instance of RECWRF015List
     */
    public RECWRF015List() {
        RECWRF015Filter = new RECWRF015();
    }

    public RECWRF015 getRECWRF015(int i){
        return (RECWRF015) get(i);
    }
        
    public RECWRF015 getRECWRF015Filter() {
        return RECWRF015Filter;
    }
    
    public void setRECWRF015Filter(RECWRF015 RECWRF015Filter) {
        this.RECWRF015Filter = RECWRF015Filter;
    }
    
}
