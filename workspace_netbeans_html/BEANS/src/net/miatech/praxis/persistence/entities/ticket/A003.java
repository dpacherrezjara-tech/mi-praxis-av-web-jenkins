/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.persistence.entities.ticket;

import java.io.Serializable;

/**
 *
 * @author lremicio
 */
public class A003 implements Serializable {
    
    public String A003KEY = "";
    public String A003TIPO = "";
    public String A003KEY3 = "";
    public String A003KEY1 = "";
    public String A003DIREC1 = "";
    public String A003DIREC2 = "";
    public String A003REFER = "";
    public String A003DISTRI = "";
    public String A003PROVIN = "";
    public String A003DEPART = "";
    public String A003PSALF = "";
    public String A003PAIS = "";
    public String A003CIUDAD = "";
    public String A003ZIPCOD = "";
    public String A003TELEF1 = "";
    public String A003TELEF2 = "";
    public String A003FAX = "";
    public String A003MAIL = "";
    public String A003KEY2 = "";
    public String A003ANEXO = "";
    public String A003INDICA = "";
    public String A003IATA = "";
    public String A003REPRES = "";
    public String A003REPCAR = "";
    public String A003REPDIR = "";
    public String A003REPTLF = "";
    public String A003CONTA1 = "";
    public String A003CONTA2 = "";
    public String A003PROCOD = "";
    public String A003PROMOT = "";
    public String A003CRMONE = "";
    public double A003CRLIMI = 0d;
    public long A003CRDIAS = 0;
    public double A003CNACON = 0d;
    public double A003CNACOF = 0d;
    public double A003CINTON = 0d;
    public double A003CINTOF = 0d;
    public String A003FIANT1 = "";
    public String A003FIAND1 = "";
    public String A003FIANM1 = "";
    public double A003FIANI1 = 0d;
    public String A003FIANB1 = "";
    public int A003FIINI1 = 0;
    public int A003FITER1 = 0;
    public String A003FIANT2 = "";
    public String A003FIAND2 = "";
    public String A003FIANM2 = "";
    public double A003FIANI2 = 0d;
    public String A003FIANB2 = "";
    public int A003FIINI2 = 0;
    public int A003FITER2 = 0;
    public int A003REPORT = 0;
    public int A003PERIDE = 0;
    public int A003PERIA = 0;
    public int A003FREMES = 0;
    public int A003REMESA = 0;
    public String A003STATUS = "";
    public int A003INICIO = 0;
    public int A003TERMIN = 0;
    public String A003COMENT = "";
    public String A003OPERA = "";
    public int A003FSIST = 0;
    public String A003TERMI = "";
    public String A003INDI1 = "";
    public String A003OFPRC = "";
    public String A003CODS = "";
    public String A003GENE = "";
    public String A003TRPN = "";
    public String A003TRPI = "";
    public String A003TRPM = "";
    public String A003FRPN = "";
    public String A003FRPI = "";
    public String A003FRPM = "";
    public String A003TURNO = "";
    public String A003FIVA = "";
    public String A003FTAZA = "";
    public String A003FLAG1 = "";
    public String A003FLAG2 = "";
    public String A003FLAG3 = "";
    public String A003MONN = "";
    public String A003MONI = "";
    public String A003MONM = "";
    public String A003ADMN = "";
    public int A003DPAG = 0;
    public String A003OVERPP = "";
    public String A003OVERCL = "";
    public String A003OVERNA = "";
    public String A003OVERFN = "";
    public String A003OVERIN = "";
    public String A003OVERFI = "";
    public String strNomPais = "";
    public String strNomCiudad = "";    
    public String A003CANAL = "";
    public String A003SABCTY = "";
    // PARA FECHAS 
    public String VP_A003OVERFN = ""; 
    public String VP_A003OVERFI = ""; 
    public String VP_A003INICIO = ""; 
    public String VP_A003TERMIN = ""; 
    public String VP_A003REPORT = ""; 
    public String VP_A003PERIDE = ""; 
    public String VP_A003PERIA  = ""; 
    public String VP_A003FREMES = ""; 
    public String VP_A003FIINI2 = ""; 
    public String VP_A003FITER2 = ""; 
    public String VP_A003FIINI1 = ""; 
    public String VP_A003FITER1 = ""; 
    
    //public String A003UBICA = "";
    public String A003CTACIA = "";// VARCHAR(2),--     2A         COLHDG('CtaCtb Cia')      
    public String A003CTANEG = "";// VARCHAR(2), --   2A         COLHDG('CtaCtb U.Negocio')
    public String A003CTACTO = "";// VARCHAR(6), --   6A         COLHDG('CtaCtb C.Costo')  
    public String A003CTAUBC = "";// VARCHAR(4), --   4A         COLHDG('CtaCtb Ubicacion')
    public String A003CTACTA = "";// VARCHAR(4), --   4A         COLHDG('CtaCtb Cuenta')   
    public String A003CTASCT = "";// VARCHAR(5), --   5A         COLHDG('CtaCtb SuCuenta') 
    public String A003CTAEQP = "";// VARCHAR(4), --   4A         COLHDG('CtaCtb Equipo')   
    public String A003CTAICI = "";// VARCHAR(2), --   2A         COLHDG('CtaCtb Inter Cia')
    
    
    public String A003AREA = "";
    public String A003CPROVE = "";
    public String A003CCLIEN = "";
    //EXTRAS
    public String VP_A003SABCTY = "";
    
    public int pos = 0;
    //PAGINACION ===============================================================
    public int intCurrentPg = -1;
    public int intPageRws = -1;
    public int intTotalPgs = -1;
    public int intTotalRws = -1;
    //Mantenaince
    public String VP_ACTION = ""; 
    
}
