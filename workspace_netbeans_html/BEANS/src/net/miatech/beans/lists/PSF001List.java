/*
 * PSF001List.java
 *
 * Created on 10 de Febrero de 2010, 19:21 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF001;
/**
 *
 * @author  claudia
 */
public class PSF001List extends ArrayList implements Serializable {
    
    PSF001 PSF001Filter = null;
    
    /**
     * Creates a new instance of PSF001List
     */
    
    public PSF001List() {
        PSF001Filter = new PSF001();
    }

    public PSF001 getPSF001(int i){
        return (PSF001) get(i);
    }
        
    public PSF001 getPSF001Filter() {
        return PSF001Filter;
    }
    
    public void setPSF001Filter(PSF001 PSF001Filter) {
        this.PSF001Filter = PSF001Filter;
    }
    
}
