/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.lists;

import net.miatech.beans.PSF003;
import java.util.*;
import java.io.*;

/**
 *
 * @author claudia
 */
public class PSF003List extends ArrayList implements Serializable {
    PSF003 PSF003Filter = null;

    /**
     * Creates a new instance of PSF003List
     */

    public PSF003List() {
        PSF003Filter = new PSF003();
    }

    public PSF003 getPSF003(int i){
        return (PSF003) get(i);
    }

    public PSF003 getPSF003Filter() {
        return PSF003Filter;
    }

    public void setPSF003Filter(PSF003 PSF003Filter) {
        this.PSF003Filter = PSF003Filter;
    }
}
