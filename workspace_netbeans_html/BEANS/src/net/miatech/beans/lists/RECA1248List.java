/*
 * AirlineList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.libmiatec.A1248;
/**
 *
 * @author  CLAUDIA
 */
public class RECA1248List extends ArrayList implements Serializable {
    A1248 RECA1248Filter = null;
    /**
     * Creates a new instance of RECA1248List
     */
    public RECA1248List() {
        RECA1248Filter = new A1248();
    }

    public A1248 getRECA1248(int i){
        return (A1248) get(i);
    }
        
    public A1248 getRECA1248Filter() {
        return RECA1248Filter;
    }
    
    public void setAirlineFilter(A1248 RECA1248Filter) {
        this.RECA1248Filter = RECA1248Filter;
    }
    
}
