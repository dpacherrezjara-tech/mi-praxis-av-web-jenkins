/*
 * PSF009List.java
 *
 * Created on 10 de Febrero de 2010, 19:21 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF009;
/**
 *
 * @author  claudia
 */
public class PSF009List extends ArrayList implements Serializable {
    
    PSF009 PSF009Filter = null;
    
    /**
     * Creates a new instance of PSF009List
     */
    
    public PSF009List() {
        PSF009Filter = new PSF009();
    }

    public PSF009 getPSF009(int i){
        return (PSF009) get(i);
    }
        
    public PSF009 getPSF009Filter() {
        return PSF009Filter;
    }
    
    public void setPSF009Filter(PSF009 PSF009Filter) {
        this.PSF009Filter = PSF009Filter;
    }
    
}
