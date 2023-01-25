/*
 * RECWRF006List.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import net.miatech.beans.RECWRF008;
import java.util.*;
import java.io.*;
/**
 *
 * @author  mflor
 */
public class RECWRF008List extends ArrayList implements Serializable {
    RECWRF008 RECWRF008Filter = null;
    /**
     * Creates a new instance of RECWRF008List
     */
    public RECWRF008List() {
        RECWRF008Filter = new RECWRF008();
    }

    public RECWRF008 getRECWRF008(int i){
        return (RECWRF008) get(i);
    }
        
    public RECWRF008 getRECWRF008Filter() {
        return RECWRF008Filter;
    }
    
    public void setRECWRF008Filter(RECWRF008 RECWRF008Filter) {
        this.RECWRF008Filter = RECWRF008Filter;
    }
    
}
