/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.payment.filter;

import net.miatech.beans.DBException;

/**
 *
 * @author vhidalgo
 */
public class SQP05233Filter {

    public String VP_CCUST = "";
    public String VP_FECHA_INI = "";
    public String VP_FECHA_FIN = "";
    public String VP_TIPO = "";  //-- P=Pasajes A=Carga C=Correo, J=Ajuste, D=Debito, E=Exterior, F=FP
    public DBException dbException = new DBException();

}
