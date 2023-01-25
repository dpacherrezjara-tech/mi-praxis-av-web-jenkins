/*
 * PSF052List.java
 *
 * Created on 12 de Octubre de 2010, 09:05 AM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF052;
/**
 *
 * @author  claudia
 */
public class PSF052List extends ArrayList implements Serializable {
    
    PSF052 PSF052Filter = null;
    
    /**
     * Creates a new instance of PSF052List
     */
    
    public PSF052List() {
        PSF052Filter = new PSF052();
    }

    public PSF052 getPSF052(int i){
        return (PSF052) get(i);
    }
        
    public PSF052 getPSF052Filter() {
        return PSF052Filter;
    }
    
    public void setPSF052Filter(PSF052 PSF052Filter) {
        this.PSF052Filter = PSF052Filter;
    }
    
}
