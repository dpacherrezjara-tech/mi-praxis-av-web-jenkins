/*
 * ETKTCuponList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;
import java.util.*;
import net.miatech.beans.ETKTCupon;
/**
 *
 * @author  claudia
 */
public class ETKTCuponList extends ArrayList<ETKTCupon> {
    ETKTCupon ETKTFilter = null;
    /**
     * Creates a new instance of ETKTCuponList
     */
    public ETKTCuponList() {
        ETKTFilter = new ETKTCupon();
    }

    public ETKTCupon getETKTCupon(int i){
        return (ETKTCupon) get(i);
    }
        
    public ETKTCupon getETKTFilter() {
        return ETKTFilter;
    }
    
    public void setETKTFilter(ETKTCupon ETKTFilter) {
        this.ETKTFilter = ETKTFilter;
    }
    
}
