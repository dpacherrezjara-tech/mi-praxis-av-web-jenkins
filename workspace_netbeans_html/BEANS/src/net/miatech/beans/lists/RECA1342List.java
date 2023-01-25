/*
 * AirlineList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.TCNFilter;
/**
 *
 * @author  CLAUDIA
 */
public class RECA1342List extends ArrayList implements Serializable {
    TCNFilter RECA1342Filter = null;
    /**
     * Creates a new instance of RECA1342List
     */
    public RECA1342List() {
        RECA1342Filter = new TCNFilter();
    }

    public TCNFilter getRECA1342(int i){
        return (TCNFilter) get(i);
    }
        
    public TCNFilter getRECA1342Filter() {
        return RECA1342Filter;
    }
    
    public void setRECA1342Filter(TCNFilter RECA1342Filter) {
        this.RECA1342Filter = RECA1342Filter;
    }
    
}
