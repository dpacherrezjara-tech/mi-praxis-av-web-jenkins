/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.lists;

import java.io.Serializable;
import java.util.ArrayList;
import net.miatech.beans.PSF015;

/**
 *
 * @author claudia
 */


public class PSF015List extends ArrayList implements Serializable {
    PSF015 PSF015Filter = null;

    public PSF015List() {
        PSF015Filter = new PSF015();
    }

    public PSF015 getPSF001(int i){
        return (PSF015) get(i);
    }

    public PSF015 getPSF015Filter() {
        return PSF015Filter;
    }

    public void setPSF015Filter(PSF015 PSF015Filter) {
        this.PSF015Filter = PSF015Filter;
    }
}
