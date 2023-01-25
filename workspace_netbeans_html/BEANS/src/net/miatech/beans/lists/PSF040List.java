/*
 * PSF040List.java
 *
 * Created on 10 de Febrero de 2010, 19:21 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF040;
/**
 *
 * @author  claudia
 */
public class PSF040List extends ArrayList implements Serializable {
    
    PSF040 PSF040Filter = null;
    
    /**
     * Creates a new instance of PSF040List
     */
    
    public PSF040List() {
        PSF040Filter = new PSF040();
    }

    public PSF040 getPSF040(int i){
        return (PSF040) get(i);
    }
        
    public PSF040 getPSF040Filter() {
        return PSF040Filter;
    }
    
    public void setPSF040Filter(PSF040 PSF040Filter) {
        this.PSF040Filter = PSF040Filter;
    }
    
}
