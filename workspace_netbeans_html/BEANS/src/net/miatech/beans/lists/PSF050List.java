/*
 * PSF050List.java
 *
 * Created on 10 de Febrero de 2010, 19:21 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF050;
/**
 *
 * @author  claudia
 */
public class PSF050List extends ArrayList implements Serializable {
    
    PSF050 PSF050Filter = null;
    
    /**
     * Creates a new instance of PSF050List
     */
    
    public PSF050List() {
        PSF050Filter = new PSF050();
    }

    public PSF050 getPSF050(int i){
        return (PSF050) get(i);
    }
        
    public PSF050 getPSF050Filter() {
        return PSF050Filter;
    }
    
    public void setPSF050Filter(PSF050 PSF050Filter) {
        this.PSF050Filter = PSF050Filter;
    }
    
}
