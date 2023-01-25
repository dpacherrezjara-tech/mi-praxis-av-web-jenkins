/*
 * PSF002List.java
 *
 * Created on 23 de Febrero de 2010, 09:44 AM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF002;
/**
 *
 * @author  claudia
 */
public class PSF002List extends ArrayList implements Serializable {
    
    PSF002 PSF002Filter = null;
    
    /**
     * Creates a new instance of PSF002List
     */
    
    public PSF002List() {
        PSF002Filter = new PSF002();
    }

    public PSF002 getPSF002(int i){
        return (PSF002) get(i);
    }
        
    public PSF002 getPSF002Filter() {
        return PSF002Filter;
    }
    
    public void setPSF002Filter(PSF002 PSF002Filter) {
        this.PSF002Filter = PSF002Filter;
    }
    
}
