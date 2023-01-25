/*
 * RECA728List.java
 *
 * Created on 22 de Abril de 2008, 03:58 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.RECA728;
/**
 *
 * @author  claudia
 */
public class RECA728List extends ArrayList implements Serializable {
    RECA728 RECA728Filter = null;
    /**
     * Creates a new instance of RECA728List
     */
    public RECA728List() {
        RECA728Filter = new RECA728();
    }

    public RECA728 getRECA728(int i){
        return (RECA728) get(i);
    }
        
    public RECA728 getRECA728Filter() {
        return RECA728Filter;
    }
    
    public void setRECA728Filter(RECA728 RECA728Filter) {
        this.RECA728Filter = RECA728Filter;
    }
    
}
