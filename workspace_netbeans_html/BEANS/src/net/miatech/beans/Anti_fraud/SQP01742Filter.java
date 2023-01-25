/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans.Anti_fraud;

import net.miatech.beans.DBException;
import net.miatech.beans.Pagination;
import net.miatech.praxis.Anti_fraud.SQP01742;

/**
 *
 * @author jbazan
 */
public class SQP01742Filter extends SQP01742{
    public String VP_AIRLI  = "";
    public String VP_CASO  = "";
    public String VP_TREG  = "";
    public String VP_ERROR  = "";
    public String VP_DATE_A  = "";
    public String VP_DATE_B  = "";
    public String VP_TYPE = "";
    public String VP_TICKET = "";
    public String VP_TTARJ = "";
    public Pagination page = new Pagination();
    public DBException dbException = new DBException();
}
