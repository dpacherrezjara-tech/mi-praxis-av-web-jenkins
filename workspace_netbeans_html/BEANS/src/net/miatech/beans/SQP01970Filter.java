/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

/**
 *
 * @author lremicio
 */
public class SQP01970Filter { 
    
    public String VP_OPCION = "";
    public String VP_CCUST = "";
    public String VP_ANIO = "";
    public String VP_IATA = "";
    public String VP_FTE = "";
    public String VP_SFTE = "";
    public String VP_PSVTA = "";
    public String VP_NAME = "";
    public String VP_PARM1 = "";
    
    public int RN = 0;
    public String CCUST = "";
    public String ANIO = "";
    public String IATA = "";
    public String AGENTE = "";
    public String FUENTE = "";
    public String SUBFUENTE = "";
    public String PAIS = "";
    public String ESTADO = "";
    public double VENTAS = 0d;
    public double CANJES = 0d;
    public double TOTALVENT = 0d;
    public int CANTCPN = 0;
    public double COMISION = 0d;
    public double INTERLINE = 0d;
    public double COMMINTER = 0d;
    public double REEMBOLSO = 0d;
    public double REVISADOS = 0d;
    public double NETO = 0d;
    public double GDS = 0d;
    
    public int typeColumn = 0;
    
    // Campos para paginar SQL
    public Pagination page = new Pagination();
    
}
