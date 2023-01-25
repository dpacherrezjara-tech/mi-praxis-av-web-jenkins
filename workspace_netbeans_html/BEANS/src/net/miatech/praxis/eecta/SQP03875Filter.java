/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

import java.sql.Blob;
import net.miatech.beans.DBException;

/**
 *
 * @author vhidalgo
 */
public class SQP03875Filter {
    public String VP_OPCION = "";	
    public String VP_CDCLI = "";
    public String VP_NOMBRE = "";
    public String VP_PATHTMP = "";    
    public Blob  VP_CIMG=null;
    //--OUT
    public Blob  OU_CIMG=null;
    public String OU_NOMBRE= "";
    public DBException dbException = new DBException();	
}
