/*
 * SummaryList.java
 *
 * Created on 05 de Febrero de 2010, 18:16 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import net.miatech.beans.Summary;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class SummaryList extends ArrayList implements Serializable {
    Summary SummaryFilter = null;
    /**
     * Creates a new instance of SummaryList
     */
    public SummaryList() {
        SummaryFilter = new Summary();
    }

    public Summary getSummary(int i){
        return (Summary) get(i);
    }
        
    public Summary getSummaryFilter() {
        return SummaryFilter;
    }
    
    public void setSummaryFilter(Summary SummaryFilter) {
        this.SummaryFilter = SummaryFilter;
    }
    
}
