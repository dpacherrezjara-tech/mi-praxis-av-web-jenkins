/*
 * RECA774.java
 *
 * Created on 14 de Diciembre de 2009, 11:21 AM
 */

package net.miatech.beans.lists;

import java.io.*;
import java.util.*;
import net.miatech.beans.RECA774;
/**
 *
 * @author  claudia
 */
public class RECA774List extends ArrayList<RECA774> implements Serializable {
    RECA774 RECA774Filter = null;
    /**
     * Creates a new instance of RECA774List
     */
    public RECA774List() {
        RECA774Filter = new RECA774();
    }

    public RECA774 getRECA774(int i){
        return (RECA774) get(i);
    }
        
    public RECA774 getRECA774Filter() {
        return RECA774Filter;
    }
    
    public void setRECA774Filter(RECA774 RECA774Filter) {
        this.RECA774Filter = RECA774Filter;
    }
    
}
