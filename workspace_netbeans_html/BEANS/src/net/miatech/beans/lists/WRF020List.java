/*
 * WRF020List.java
 *
 * Created on 05 de Febrero de 2010, 17:08 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import net.miatech.beans.WRF020;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class WRF020List extends ArrayList implements Serializable {
    
    WRF020 WRF020Filter = null;
    
    /**
     * Creates a new instance of WRF020List
     */
    
    public WRF020List() {
        WRF020Filter = new WRF020();
    }

    public WRF020 getWRF020(int i){
        return (WRF020) get(i);
    }
        
    public WRF020 getWRF020Filter() {
        return WRF020Filter;
    }
    
    public void setWRF020Filter(WRF020 WRF020Filter) {
        this.WRF020Filter = WRF020Filter;
    }
    
}
