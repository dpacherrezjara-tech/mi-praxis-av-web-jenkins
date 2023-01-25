/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.flown.filter;

import net.miatech.beans.Pagination;
import net.miatech.praxis.flown.A4161;

/**
 *
 * @author nestacio
 */
public class A4161Filter extends A4161{
    public long RN;
    
    //Extend
    public String ACCION = "";
    public String ESTADO = "";
    
    //PK
    public String IN_CCUST = "";
    public String IN_ENVIO = "";
    public String IN_MODULO = "";
    public String IN_FECHA_PROCESO = "";
    public String IN_ACCION = "";
    
    public String IN_SEQ = "";
    public String IN_SEQREG = "";
    
    //Campos actualizar
    public String IN_FECHA_CONTABLE = "";
    public String IN_COMENTARIO = "";
    public String IN_FECHA_ACUSE = "";
    public String IN_HORA_ACUSE = "";
    public int IN_CANT_ARCHIVOS = 0;
    public int IN_CAN_REGISTROS = 0;     
    
    public String MODULE = "";
    public String IN_ACC_ORIGEN = "";
    
    public String IN_CIA = "";
    public String IN_PFLIGHT = "";
    public String IN_CARR = "";
    public String IN_STOCK = "";
    public String IN_PERIODO = "";
            
    
    
    
    //Paginado
    public Pagination page = new Pagination();
}
