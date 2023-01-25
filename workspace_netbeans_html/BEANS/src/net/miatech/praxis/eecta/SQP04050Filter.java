/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.eecta;

/**
 *
 * @author vhidalgo
 */
public class SQP04050Filter {
    public String VP_A3981CCUST = "";
    public String VP_A3981FPERI = "";
    public String VP_A3981CDCLI = ""; 
    public String VP_A3981FEJEC = ""; 
    //    
    public A3981 rpteCab = new A3981();    
    public A3958 rpteDet = new A3958();
    public A3961 tbl_misl= new A3961();
    public A3953 tbl_client = new A3953();    
    //info antigueda de saldos
    public A3990 tbl_saldos = new A3990();     
    //public A3996 tbl_saldos_det = new A3996(); 
     public Integer CANT_DIA = 0;
}
