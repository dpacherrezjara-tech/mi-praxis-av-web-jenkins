/*
 * RECA051List.java
 *
 * Created on 25 de Marzo de 2005, 06:04 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.RECA051;
/**
 *
 * @author  claudia
 */
public class RECA051List extends ArrayList implements Serializable {
    RECA051 RECA051Filter = null;
    /**
     * Creates a new instance of RECA051List
     */
    public RECA051List() {
        RECA051Filter = new RECA051();
    }

    public RECA051 getRECA051(int i){
        return (RECA051) get(i);
    }
        
    public RECA051 getRECA051Filter() {
        return RECA051Filter;
    }
    
    public void setRECA051Filter(RECA051 RECA051Filter) {
        this.RECA051Filter = RECA051Filter;
    }
    
}
