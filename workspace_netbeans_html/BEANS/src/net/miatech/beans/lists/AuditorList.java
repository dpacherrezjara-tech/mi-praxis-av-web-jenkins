/*
 * AirlineList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import net.miatech.beans.AUDITORES;
import java.util.*;
import java.io.*;
/**
 *
 * @author  Claudia
 */
public class AuditorList extends ArrayList implements Serializable {
    AUDITORES AuditorFilter = null;
    /**
     * Creates a new instance of AuditorList
     */
    public AuditorList() {
        AuditorFilter = new AUDITORES();
    }

    public AUDITORES getAuditor(int i){
        return (AUDITORES) get(i);
    }
        
    public AUDITORES getAuditorFilter() {
        return AuditorFilter;
    }
    
    public void setAuditorFilter(AUDITORES AuditorFilter) {
        this.AuditorFilter = AuditorFilter;
    }
    
}
