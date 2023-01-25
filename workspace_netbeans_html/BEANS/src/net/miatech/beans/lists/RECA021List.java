/*
 * RECA021List.java
 *
 * Created on 25 de Marzo de 2005, 06:04 PM
 */

package net.miatech.beans.lists;

import java.io.*;
import java.util.*;
import net.miatech.beans.RECA021;
/**
 *
 * @author  claudia
 */
public class RECA021List extends ArrayList<RECA021> implements Serializable {
    RECA021 RECA021Filter = null;
    /**
     * Creates a new instance of RECA021List
     */
    public RECA021List() {
        RECA021Filter = new RECA021();
    }

    public RECA021 getRECA021(int i){
        return (RECA021) get(i);
    }
        
    public RECA021 getRECA021Filter() {
        return RECA021Filter;
    }
    
    public void setRECA021Filter(RECA021 RECA021Filter) {
        this.RECA021Filter = RECA021Filter;
    }
    
}
