/*
 * PSF002List.java
 *
 * Created on 22 de Marzo de 2010, 16:04 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF020;
/**
 *
 * @author  claudia
 */
public class PSF020List extends ArrayList implements Serializable {
    
    PSF020 PSF020Filter = null;
    
    /**
     * Creates a new instance of PSF020List
     */
    
    public PSF020List() {
        PSF020Filter = new PSF020();
    }

    public PSF020 getPSF020(int i){
        return (PSF020) get(i);
    }
        
    public PSF020 getPSF020Filter() {
        return PSF020Filter;
    }
    
    public void setPSF020Filter(PSF020 PSF020Filter) {
        this.PSF020Filter = PSF020Filter;
    }
    
}
