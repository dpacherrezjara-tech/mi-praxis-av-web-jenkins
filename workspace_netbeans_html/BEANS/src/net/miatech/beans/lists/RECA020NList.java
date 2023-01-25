/*
 * RECA020NList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.RECA020N;
/**
 *
 * @author  CLAUDIA
 */
public class RECA020NList extends ArrayList implements Serializable {
    RECA020N RECA020NFilter = null;
    /**
     * Creates a new instance of RECA1248List
     */
    public RECA020NList() {
        RECA020NFilter = new RECA020N();
    }

    public RECA020N getRECA020N(int i){
        return (RECA020N) get(i);
    }
        
    public RECA020N getRECA020NFilter() {
        return RECA020NFilter;
    }
    
    public void setAirlineFilter(RECA020N RECA020NFilter) {
        this.RECA020NFilter = RECA020NFilter;
    }
    
}
