/*
 * AirlineList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.RECA1327;
/**
 *
 * @author  CLAUDIA
 */
public class RECA1327List extends ArrayList implements Serializable {
    RECA1327 RECA1327Filter = null;
    /**
     * Creates a new instance of RECA1327List
     */
    public RECA1327List() {
        RECA1327Filter = new RECA1327();
    }

    public RECA1327 getRECA1327(int i){
        return (RECA1327) get(i);
    }
        
    public RECA1327 getRECA1327Filter() {
        return RECA1327Filter;
    }
    
    public void setRECA1327Filter(RECA1327 RECA1327Filter) {
        this.RECA1327Filter = RECA1327Filter;
    }
    
}
