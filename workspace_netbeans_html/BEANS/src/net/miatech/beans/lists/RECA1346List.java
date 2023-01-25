/*
 * AirlineList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.RECA1346;
/**
 *
 * @author  CLAUDIA
 */
public class RECA1346List extends ArrayList implements Serializable {
    RECA1346 RECA1346Filter = null;
    /**
     * Creates a new instance of RECA1346List
     */
    public RECA1346List() {
        RECA1346Filter = new RECA1346();
    }

    public RECA1346 getRECA1346(int i){
        return (RECA1346) get(i);
    }
        
    public RECA1346 getRECA1346Filter() {
        return RECA1346Filter;
    }
    
    public void setRECA1346Filter(RECA1346 RECA1346Filter) {
        this.RECA1346Filter = RECA1346Filter;
    }
    
}
