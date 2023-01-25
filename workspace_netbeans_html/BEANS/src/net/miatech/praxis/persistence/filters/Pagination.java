package net.miatech.praxis.persistence.filters;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


import java.io.Serializable;

/**
 *
 * @author lremicio
 */
public class Pagination  implements Serializable{
    
    public int PAGNUM = -1;
    public int PAGROW = -1;
    public int TOTPAG = -1;
    public int TOTROW = -1;
    public int PAGINIT = -1;

    public void setPAGNUM(int PAGNUM) {
        this.PAGNUM = PAGNUM;
    }

    public void setPAGROW(int PAGROW) {
        this.PAGROW = PAGROW;
    }

    public void setTOTPAG(int TOTPAG) {
        this.TOTPAG = TOTPAG;
    }

    public void setTOTROW(int TOTROW) {
        this.TOTROW = TOTROW;
    }

    public void setPAGINIT(int PAGINIT) {
        this.PAGINIT = PAGINIT;
    }

    public int getPAGNUM() {
        return PAGNUM;
    }

    public int getPAGROW() {
        return PAGROW;
    }

    public int getTOTPAG() {
        return TOTPAG;
    }

    public int getTOTROW() {
        return TOTROW;
    }

    public int getPAGINIT() {
        return PAGINIT;
    }
    
}
