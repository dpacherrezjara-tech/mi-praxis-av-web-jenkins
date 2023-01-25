/*
 * RECWRF015List.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import net.miatech.beans.RECWRF017;
import java.util.*;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class RECWRF017List extends ArrayList implements Serializable {
    RECWRF017 RECWRF017Filter = null;
    /**
     * Creates a new instance of RECWRF015List
     */
    public RECWRF017List() {
        RECWRF017Filter = new RECWRF017();
    }

    public RECWRF017 getRECWRF017(int i){
        return (RECWRF017) get(i);
    }
        
    public RECWRF017 getRECWRF017Filter() {
        return RECWRF017Filter;
    }
    
    public void setRECWRF017Filter(RECWRF017 RECWRF017Filter) {
        this.RECWRF017Filter = RECWRF017Filter;
    }
    
}
