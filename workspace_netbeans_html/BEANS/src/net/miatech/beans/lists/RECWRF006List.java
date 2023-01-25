/*
 * RECWRF006List.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.io.*;
import java.util.*;
import net.miatech.beans.RECWRF006;
import net.miatech.beans.WRF006Filter;
/**
 *
 * @author  mflor
 */
public class RECWRF006List extends ArrayList implements Serializable {
    RECWRF006 RECWRF006Filter = null;
    WRF006Filter WRF006Filter = null;
    /**
     * Creates a new instance of RECWRF006List
     */
    public RECWRF006List() {
        RECWRF006Filter = new RECWRF006();
    }

    public RECWRF006 getRECWRF006(int i){
        return (RECWRF006) get(i);
    }
        
    public RECWRF006 getRECWRF006Filter() {
        return RECWRF006Filter;
    }
    
    public void setRECWRF006Filter(RECWRF006 RECWRF006Filter) {
        this.RECWRF006Filter = RECWRF006Filter;
    }
    
    // =====================================
        
    public WRF006Filter getWRF006Filter() {
        return WRF006Filter;
    }
    
    public void setWRF006Filter(WRF006Filter WRF006Filter) {
        this.WRF006Filter = WRF006Filter;
    }
    
}
