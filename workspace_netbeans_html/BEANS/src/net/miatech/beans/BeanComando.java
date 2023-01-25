/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.io.Serializable;

/**
 *
 * @author crios
 */
public class BeanComando implements Serializable{

    private String COMAN;
    private String DESC;
    private String HELP;
    private String VALUE;
    private String HELPAR;
    private String CMDSEQ;

    public String getHELPAR() {
        return HELPAR;
    }

    public void setHELPAR(String HELPAR) {
        this.HELPAR = HELPAR;
    }

    public String getHELP() {
        return HELP;
    }

    public void setHELP(String HELP) {
        this.HELP = HELP;
    }

    public String getCOMAN() {
        return COMAN;
    }

    public void setCOMAN(String COMAN) {
        this.COMAN = COMAN;
    }

    public String getDESC() {
        return DESC;
    }

    public void setDESC(String DESC) {
        this.DESC = DESC;
    }

    public String getVALUE() {
        return VALUE;
    }

    public void setVALUE(String VALUE) {
        this.VALUE = VALUE;
    }

    public String getCMDSEQ() {
        return CMDSEQ;
    }

    public void setCMDSEQ(String CMDSEQ) {
        this.CMDSEQ = CMDSEQ;
    }
    
    
}
