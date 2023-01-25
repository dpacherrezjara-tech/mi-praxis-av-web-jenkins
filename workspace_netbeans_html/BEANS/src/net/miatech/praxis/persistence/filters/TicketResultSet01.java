/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.filters;

import java.io.Serializable;
import net.miatech.praxis.persistence.entities.ticket.A720;
import net.miatech.praxis.persistence.entities.ticket.A1530;
import net.miatech.praxis.persistence.entities.ticket.A003;
import net.miatech.praxis.persistence.entities.ticket.A1007;

/**
 *
 * @author lremicio
 */
public class TicketResultSet01 implements Serializable {
    
    public A720 fileA720 = new A720();
    public A1530 fileA1530 = new A1530();
    public A003 fileA003 = new A003();
    public A1007 fileA1007 = new A1007();
    
}
