/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.entities.yopt;

import java.io.Serializable;

/**
 *
 * @author zperez
 */
public class A1957 implements Serializable{
    
    public String   DFLIGHT = "";
    public Integer  QTYFLIGHT  = 0;        
    public Integer  QTYPAXCBNY = 0;   
    public Integer  QTYPAXCBNJ = 0;    
    public Integer  TOTQTYPAX  = 0;     
    public float    TOTREVCBNY = 0;   
    public float    TOTREVCBNJ = 0;   
    public float    TOTREV     = 0; 

    public String getDFLIGHT() {
        return DFLIGHT;
    }

    public void setDFLIGHT(String DFLIGHT) {
        this.DFLIGHT = DFLIGHT;
    }

    public Integer getQTYFLIGHT() {
        return QTYFLIGHT;
    }

    public void setQTYFLIGHT(Integer QTYFLIGHT) {
        this.QTYFLIGHT = QTYFLIGHT;
    }

    public Integer getQTYPAXCBNY() {
        return QTYPAXCBNY;
    }

    public void setQTYPAXCBNY(Integer QTYPAXCBNY) {
        this.QTYPAXCBNY = QTYPAXCBNY;
    }

    public Integer getQTYPAXCBNJ() {
        return QTYPAXCBNJ;
    }

    public void setQTYPAXCBNJ(Integer QTYPAXCBNJ) {
        this.QTYPAXCBNJ = QTYPAXCBNJ;
    }

    public Integer getTOTQTYPAX() {
        return TOTQTYPAX;
    }

    public void setTOTQTYPAX(Integer TOTQTYPAX) {
        this.TOTQTYPAX = TOTQTYPAX;
    }

    public float getTOTREVCBNY() {
        return TOTREVCBNY;
    }

    public void setTOTREVCBNY(float TOTREVCBNY) {
        this.TOTREVCBNY = TOTREVCBNY;
    }

    public float getTOTREVCBNJ() {
        return TOTREVCBNJ;
    }

    public void setTOTREVCBNJ(float TOTREVCBNJ) {
        this.TOTREVCBNJ = TOTREVCBNJ;
    }

    public float getTOTREV() {
        return TOTREV;
    }

    public void setTOTREV(float TOTREV) {
        this.TOTREV = TOTREV;
    }

    
    
}
