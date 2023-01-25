/*
 * ProrateHeaderList.java
 *
 * Created on 05 de Junio de 2012, 11:55 AM
 */

package net.miatech.beans.lists;

import net.miatech.beans.ProrateHeader;
import java.util.*;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class ProrateHeaderList extends ArrayList implements Serializable {

    ProrateHeader ProrateHeaderFilter = null;
    /**
     * Creates a new instance of ProrateHeaderList
     */
    public ProrateHeaderList() {
        ProrateHeaderFilter = new ProrateHeader();
    }

    public ProrateHeader getProrateHeader(int i){
        return (ProrateHeader) get(i);
    }

    public ProrateHeader getProrateHeaderFilter() {
        return ProrateHeaderFilter;
    }

    public void setProrateHeaderFilter(ProrateHeader ProrateHeaderFilter) {
        this.ProrateHeaderFilter = ProrateHeaderFilter;
    }

}
