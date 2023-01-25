/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.praxis.PXF051;

/**
 *
 * @author rmayta
 */
public class PXF051Filter extends PXF051 {
    public int item = 0;
    public String filterType = "";
    
    public String yearFrom = "";
    public String monthFrom = "";
    public String dayFrom = "";
    public String yearTo = "";
    public String monthTo = "";
    public String dayTo = "";
    
    public String processState = "";
    
    public int diffTransactions = 0;
    
    public String userLastModify = "";
    public String dateLastModify = "";
}
