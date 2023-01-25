/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author lremicio
 */
public class TicketFilter implements Serializable {
    
    public String VP_CCUST = "";
    public String VP_CIA = "";
    public String VP_FORMA = "";
    public String VP_SERIE = "";
    
    public List<TicketResultSet01> lstResultSet01 = new ArrayList<TicketResultSet01>();
    public List<TicketResultSet02> lstResultSet02 = new ArrayList<TicketResultSet02>();
    public List<TicketResultSet03> lstResultSet03 = new ArrayList<TicketResultSet03>();
    public List<TicketResultSet04> lstResultSet04 = new ArrayList<TicketResultSet04>();
    public List<TicketResultSet05> lstResultSet05 = new ArrayList<TicketResultSet05>();
    public List<TicketResultSet05> lstResultSet06 = new ArrayList<TicketResultSet05>();
    public List<TicketResultSet07> lstResultSet07 = new ArrayList<TicketResultSet07>();
    public List<TicketResultSet07> lstResultSet08 = new ArrayList<TicketResultSet07>();
    public List<TicketResultSet07> lstResultSet09 = new ArrayList<TicketResultSet07>();
    public List<TicketResultSet07> lstResultSet10 = new ArrayList<TicketResultSet07>();
    public List<TicketResultSet11> lstResultSet11 = new ArrayList<TicketResultSet11>();
    public List<TicketResultSet12> lstResultSet12 = new ArrayList<TicketResultSet12>();
    public List<TicketResultSet13> lstResultSet13 = new ArrayList<TicketResultSet13>();
    
}
