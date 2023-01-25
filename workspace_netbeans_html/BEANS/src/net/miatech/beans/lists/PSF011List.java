/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans.lists;

import java.io.Serializable;
import java.util.ArrayList;
import net.miatech.beans.PSF011;

/**
 *
 * @author crios
 */
public class PSF011List extends ArrayList
                                implements Serializable{

     PSF011 beanPSF011 = null;

    public PSF011List() {
        beanPSF011 = new PSF011();
    }
    public PSF011 getPSF011Unit(int i){
        return (PSF011) get(i);
    }
    public PSF011 getPSF011(){
        return beanPSF011;
    }
    public void setPSF011(PSF011 beanPSF011){
        this.beanPSF011 = beanPSF011;
    }
     
}
