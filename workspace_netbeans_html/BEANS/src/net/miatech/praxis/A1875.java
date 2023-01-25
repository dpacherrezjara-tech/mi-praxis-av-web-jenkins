/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis;

/**
 *
 * @author vhidalgo
 */
public class A1875 {
    
    public String A1875CCUST = ""; //3A         COLHDG('Cliente')      
    public String A1875NATUR = ""; //2A         COLHDG('Naturaleza DB/C
    public String A1875TIPO  = ""; //2A         COLHDG('Tipo CA,CC,EX,CM,FA,TX')     
    public String A1875STIPO = ""; //4A         COLHDG('Sub Tipo')     
    public String A1875DESCR = ""; //40A         COLHDG('Descripcion')  
    public int A1875QDOSA  =0;  //  7S 0       COLHDG('Qty Doc  SALE')
    public int  A1875QTRSA =0;  //  7S 0       COLHDG('Qty Tran SALE')
    public int  A1875QDORF =0;  //  7S 0       COLHDG('Qty Doc  RFND')
    public int  A1875QTRRF =0;  //  7S 0       COLHDG('Qty Tran RFND')
    public String A1875MDALC ="";   //    3A         COLHDG('Moneda Local')    
    public double A1875VSALC =0.00; //    13S 2       COLHDG('Importe SALE Loc')
    public double A1875VRFLC=0.00; //    13S 2       COLHDG('Importe RFND Loc')
    public double A1875VNTLC=0.00;  //    13S 2       COLHDG('Importe NETO Loc')                                                     
    public String A1875MDARV="";    //     3A         COLHDG('Moneda Revenue')  
    public double A1875VSARV=0.00;  //  13S 2       COLHDG('Importe SALE Rev')
    public double A1875VRFRV=0.00;  //  13S 2       COLHDG('Importe RFND Rev')
    public double A1875VNTRV=0.00;  //  13S 2       COLHDG('Importe NETO Rev')
    //Datos de Reporte(Header)                                 
    public String A1875GRUPO="";    // 8A         COLHDG('Grupo')      
    public String A1875IDFIL="";    // 9A         COLHDG('NRO_ID_FILE')
    // Datos de Auditoria    
    public String A1875USRIN="";    //10A         COLHDG('USUARIO Inserta')  
    public String A1875FECIN="";    //8A         COLHDG('FECHA   Inserta')  
    public String A1875HORIN="";    //6A         COLHDG('HORA    Inserta')                                                       
    public String A1875USRAC="";    //10A        COLHDG('USUARIO Actualiza')
    public String A1875FECAC="";    //8A         COLHDG('FECHA   Actualiza')
    public String A1875HORAC="";    //6A         COLHDG('HORA    Actualiza') 
    // Campos Adicionales
    public String A1875NATUR_00 =""; 
    public String A1875TIPO_00="";
    
    
}
