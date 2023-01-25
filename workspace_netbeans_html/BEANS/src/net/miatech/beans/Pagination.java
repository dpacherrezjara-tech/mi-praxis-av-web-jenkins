/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author rmayta
 */
public class Pagination {
    public int PAGROW = -1;
    public int PAGNUM = -1;
    public List<String> ROWLST;
    
    @Deprecated
    public int TOTPAG = -1;
    @Deprecated
    public int TOTROW = -1;
    @Deprecated
    public int PAGINIT = -1;
    
    /**
     * Paginacion Extjs
     */
    public int TOTROWS=-1;
    public int START=0;
    public int LIMIT=20;
    public int PAGE=1;

    public Pagination() {
        this.ROWLST = new ArrayList();
    }
    
}
