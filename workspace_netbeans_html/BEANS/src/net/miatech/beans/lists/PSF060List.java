/*
 * PSF060List.java
 *
 * Created on 10 de Febrero de 2010, 19:21 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF060;
/**
 *
 * @author  claudia
 */
public class PSF060List extends ArrayList implements Serializable {
    
    PSF060 PSF060Filter = null;
    
    /**
     * Creates a new instance of PSF060List
     */
    
    public PSF060List() {
        PSF060Filter = new PSF060();
    }

    public PSF060 getPSF060(int i){
        return (PSF060) get(i);
    }
        
    public PSF060 getPSF060Filter() {
        return PSF060Filter;
    }
    
    public void setPSF060Filter(PSF060 PSF060Filter) {
        this.PSF060Filter = PSF060Filter;
    }
    
}
