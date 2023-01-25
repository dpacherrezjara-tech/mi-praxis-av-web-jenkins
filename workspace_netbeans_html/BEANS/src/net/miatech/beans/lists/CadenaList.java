/*
 * CadenaList.java
 *
 * Created on 05 de Febrero de 2010, 18:16 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import net.miatech.beans.Cadena;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class CadenaList extends ArrayList implements Serializable {
    Cadena CadenaFilter = null;
    /**
     * Creates a new instance of CadenaList
     */
    public CadenaList() {
        CadenaFilter = new Cadena();
    }

    public Cadena getCadena(int i){
        return (Cadena) get(i);
    }
        
    public Cadena getCadenaFilter() {
        return CadenaFilter;
    }
    
    public void setCadenaFilter(Cadena CadenaFilter) {
        this.CadenaFilter = CadenaFilter;
    }
    
}
