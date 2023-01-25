/*
 * WRF021List.java
 *
 * Created on 09 de Febrero de 2010, 11:36 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.WRF021;
/**
 *
 * @author  claudia
 */
public class WRF021List extends ArrayList implements Serializable {
    
    WRF021 WRF021Filter = null;
    
    /**
     * Creates a new instance of RECWRF020List
     */
    
    public WRF021List() {
        WRF021Filter = new WRF021();
    }

    public WRF021 getWRF021(int i){
        return (WRF021) get(i);
    }
        
    public WRF021 getWRF021Filter() {
        return WRF021Filter;
    }
    
    public void setWRF021Filter(WRF021 WRF021Filter) {
        this.WRF021Filter = WRF021Filter;
    }
    
}
