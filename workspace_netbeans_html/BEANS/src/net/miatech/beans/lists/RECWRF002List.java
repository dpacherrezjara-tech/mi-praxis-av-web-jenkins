/*
 * RECWRF002List.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.io.*;
import java.util.*;
import net.miatech.beans.RECWRF002;
/**
 *
 * @author  mflor
 */
public class RECWRF002List extends ArrayList implements Serializable {
    RECWRF002 RECWRF002Filter = null;
    /**
     * Creates a new instance of RECWRF002List
     */
    public RECWRF002List() {
        RECWRF002Filter = new RECWRF002();
    }

    public RECWRF002 getRECWRF002(int i){
        return (RECWRF002) get(i);
    }
        
    public RECWRF002 getRECWRF002Filter() {
        return RECWRF002Filter;
    }
    
    public void setRECWRF002Filter(RECWRF002 RECWRF002Filter) {
        this.RECWRF002Filter = RECWRF002Filter;
    }
    
}
