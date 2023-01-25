/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis;



/**
 *
 * @author vhidalgo
 */
public class A1720 {
    public String A1720CCUST = ""; //3A         COLHDG('Cliente')      
    public String A1720NATUR = ""; //2A         COLHDG('Naturaleza DB/C
    public String A1720TIPO  = ""; //2A         COLHDG('Tipo CA,CC,EX,CM,FA,TX')     
    public String A1720STIPO = ""; //4A         COLHDG('Sub Tipo')     
    public String A1720DESCR = ""; //40A         COLHDG('Descripcion')  
    public int A1720QDOSA  =0;  //  7S 0       COLHDG('Qty Doc  SALE')
    public int  A1720QTRSA =0;  //  7S 0       COLHDG('Qty Tran SALE')
    public int  A1720QDORF =0;  //  7S 0       COLHDG('Qty Doc  RFND')
    public int  A1720QTRRF =0;  //  7S 0       COLHDG('Qty Tran RFND')
    public String A1720MDALC ="";   //    3A         COLHDG('Moneda Local')    
    public double A1720VSALC =0.00; //    13S 2       COLHDG('Importe SALE Loc')
    public double A1720VRFLC=0.00; //    13S 2       COLHDG('Importe RFND Loc')
    public double A1720VNTLC=0.00;  //    13S 2       COLHDG('Importe NETO Loc')                                                     
    public String A1720MDARV="";    //     3A         COLHDG('Moneda Revenue')  
    public double A1720VSARV=0.00;  //  13S 2       COLHDG('Importe SALE Rev')
    public double A1720VRFRV=0.00;  //  13S 2       COLHDG('Importe RFND Rev')
    public double A1720VNTRV=0.00;  //  13S 2       COLHDG('Importe NETO Rev')
    //Datos de Reporte(Header)                                 
    public String A1720GRUPO="";    // 8A         COLHDG('Grupo')      
    public String A1720IDFIL="";    // 9A         COLHDG('NRO_ID_FILE')
    // Datos de Auditoria    
    public String A1720USRIN="";    //10A         COLHDG('USUARIO Inserta')  
    public String A1720FECIN="";    //8A         COLHDG('FECHA   Inserta')  
    public String A1720HORIN="";    //6A         COLHDG('HORA    Inserta')                                                       
    public String A1720USRAC="";    //10A        COLHDG('USUARIO Actualiza')
    public String A1720FECAC="";    //8A         COLHDG('FECHA   Actualiza')
    public String A1720HORAC="";    //6A         COLHDG('HORA    Actualiza') 
    // Campos Adicionales
    public String A1720NATUR_00 =""; 
    public String A1720TIPO_00="";
    
}
