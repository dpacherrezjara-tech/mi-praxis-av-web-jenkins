/*
 * PSF051List.java
 *
 * Created on 10 de Febrero de 2010, 19:21 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.PSF051;
/**
 *
 * @author  claudia
 */
public class PSF051List extends ArrayList implements Serializable {
    
    PSF051 PSF051Filter = null;
    
    /**
     * Creates a new instance of PSF051List
     */
    
    public PSF051List() {
        PSF051Filter = new PSF051();
    }

    public PSF051 getPSF051(int i){
        return (PSF051) get(i);
    }
        
    public PSF051 getPSF051Filter() {
        return PSF051Filter;
    }
    
    public void setPSF051Filter(PSF051 PSF051Filter) {
        this.PSF051Filter = PSF051Filter;
    }
    
}
