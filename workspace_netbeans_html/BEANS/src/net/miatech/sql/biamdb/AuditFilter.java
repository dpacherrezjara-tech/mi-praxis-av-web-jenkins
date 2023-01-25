/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.sql.biamdb;

import net.miatech.beans.Pagination;

/**
 *
 * @author lzambrano
 */
public class AuditFilter {
    
    public long RN;
    
    //Extend
    public String ACCION = "";
    public String ESTADO = "";
    
    //PK
    public String IN_CCUST = "";
    public String IN_MODULE = "";
    public String IN_PROC_DATE = "";
    public String IN_FROM_DATE = "";
    public String IN_TO_DATE = "";
    public String IN_ACCION = "";
    public String IN_SEQ = "";
    public int IN_STATUS = 0;
    
    public String MODULE = "";
    public String SUB_MODULE = "";
    public String SEQ = "";
    public String PROC_DATE = "";
    public String DATE_CREATE = "";
    public String STATUS = "";
    public String STATUS_LABEL = "";
    public Integer TOTAL = 0;
    
    public String USRIN = "";
    public String USRAC = "";
    public String FECAC = "";
    public String FECIN = "";
    
    //Paginado
    public Pagination page = new Pagination();
    
}
