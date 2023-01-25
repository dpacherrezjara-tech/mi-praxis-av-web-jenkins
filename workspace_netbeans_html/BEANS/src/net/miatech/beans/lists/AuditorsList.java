/*
 * AuditorsList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.Auditor;
/**
 *
 * @author  Claudia
 */
public class AuditorsList extends ArrayList implements Serializable {
    Auditor AuditorFilter = null;
    /**
     * Creates a new instance of AuditorList
     */
    public AuditorsList() {
        AuditorFilter = new Auditor();
    }

    public Auditor getAuditor(int i){
        return (Auditor) get(i);
    }
        
    public Auditor getAuditorFilter() {
        return AuditorFilter;
    }
    
    public void setAuditorFilter(Auditor AuditorFilter) {
        this.AuditorFilter = AuditorFilter;
    }
    
}
