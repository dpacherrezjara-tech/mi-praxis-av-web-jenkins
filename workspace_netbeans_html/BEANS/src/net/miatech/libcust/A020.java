/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.libcust;

/**
 *
 * @author rmayta
 */
public class A020 {

    public Boolean FOUND = false;
    //****************************
    public String A020KEY = "";
    //****************************
    public String A020CIA = "";
    public String A020FORMA = "";
    public String A020SERIE = "";
    public String A020CUPON = "";
    public String A020DCHEQ = "";
    public String A020FORMUL = "";
    public String A020AIRLI2 = "";
    public String A020AIRLI3 = "";
    public String A020SUFACT = "";
    public int A020SUFECH = 0;
    public String A020FRECIB = "";
    public String A020FRECHA = "";
    public int A020FVENTA = 0;
    public int A020FUSO = 0;
    public Double A020NUC = 0d;
    public Double A020ROE = 0d;
    public String A020MNRCD = "";
    public String A020TCALC = "";
    public Double A020TARIFA = 0d;
    public String A020MONEDA = "";
    public Double A020TCTRF = 0d;
    public Double A020FAREUS = 0d;
    public Double A020DESCUP = 0d;
    public String A020BASE = "";
    public String A020RUTA = "";
    public String A020TIPO = "";
    //Importes para Rechazar.
    public String A020SELECT = "";
    public Double A020SUDEBI = 0d;
    public Double A020ACEPTA = 0d;
    public Double A020REDEBI = 0d;
    public Double A020COMISP = 0d;
    public Double A020COMISI = 0d;
    public Double A020TAX = 0d;
    public Double A020NETO = 0d;
    //Ocurrencia 15.
    public String A020TRANSP = "";
    public String A020CLASE = "";
    public String A020FACTOR = "";
    public String A020TARIF = "";
    public String A020TARIFY = "";
    public String A020PPROVI = "";
    public String A020PROVIS = "";
    public String A020ACUERD = "";
    public String A020VALOR = "";
    public String A020VUELO = "";
    //Sumatoria de Totales de Ocurrencia 15.
    public int A020TOFACT = 0;
    public Double A020TOTARF = 0d;
    public Double A020TOTRFY = 0d;
    public Double A020TOPROV = 0d;
    public Double A020TOACUE = 0d;
    public Double A020TOVALO = 0d;
    //Contabilidad ocurrencia 5.
    public String A020MONTO = "";
    public String A020DEBHAB = "";
    //REDEFINICIONES.
    public String A020NUMCTA = "";
    public Double A020TOTDEB = 0d;
    public Double A020TOTHAB = 0d;
    public Double A020DIFERE = 0d;
    //Datos Comentarios Adicionales.
    public Double A020YIELD = 0d;
    public String A020TIPORM = "";
    public String A020CLASRM = "";
    public String A020RMSN = "";
    public int A020QCUPON = 0;
    public int A020CONECT = 0;
    public String A020TICKE1 = "";
    public String A020TICKE2 = "";
    public String A020COMME1 = "";
    public String A020COMME2 = "";
    public String A020COMME3 = "";
    //Datos para ContraRechazos.
    public String A020ORDRM = "";
    public String A020RMANT = "";
    //Datos de Auditoria.
    public String A020FIMPRE = "";
    public String A020USER = "";
    public String A020SDATE = "";
    public String A020STIME = "";
    public String A020CRT = "";
    //Datos para la Forma 3.
    public String A020DIVISI = "";
    public Double A020ANALIZ = 0d;
    public Double A020IMPNAC = 0d;
    public Double A020IMPINT = 0d;
    //Duplicacion de Datos moneda DOLARES (USD).
    public Double A020TCRC = 0d;
    public Double A020FARE = 0d;
    public Double A020SUDEB = 0d;
    public Double A020ACEPT = 0d;
    public Double A020REDEB = 0d;
    public Double A020COMI = 0d;
    public Double A020TAX1 = 0d;
    public Double A020NET = 0d;
    public String A020VALO = "";
    public Double A020TVALO = 0d;
    //Duplicacion de Datos moneda NACIONAL (COP).
    public Double A020NTCRC = 0d;
    public Double A020NFARE = 0d;
    public Double A020NSUDEB = 0d;
    public Double A020NACEPT = 0d;
    public Double A020NREDEB = 0d;
    public Double A020NCOMI = 0d;
    public Double A020NTAX = 0d;
    public Double A020NNET = 0d;
    public String A020NVALO = "";
    public Double A020NTVALO = 0d;
    public String A020CODDSC = "";
    public String A020CODMOT = "";
    public String A020TDES = "";
    //REDONDEO DE MONEDAS.
    public String A020MDATRF = "";
    public Double A020VALTRF = 0d;
    public String A020MDAPAG = "";
    public Double A020TRFPAG = 0d;
    public String A020PSTRF = "";
    public String A020PSPAG = "";
    //ENLACE PARA MOTOR DE PRORRATEO.
    public String A020AIRLIN = "";
    public String A020AIRLON = "";
    public String A020NROPRT = "";
    public String A020CODOB1 = "";
    public String A020CODOB2 = "";
    public String A020CODOB3 = "";
    public String A020RUTAP = "";
    public String A020TUSO = "";
    public String A020INDTAX = "";
    public Double A020QNUC = 0d;
    public Double A020QSEG = 0d;
    public Double A020QSEGUS = 0d;
    public Double A020QUSD = 0d;
    public Double A020QNAC = 0d;
    //CAMPOS DE AGRUPACION.
    public String A020PERI = "";
    public String A020FVLO = "";
    public String A020GRUPO = "";
    public String A020CLASR2 = "";
    public String A020TAXA = "";
    public String A020ETKT = "";
    public String A020GENRM = "";
    public String A020CODOB4 = "";
    public String A020CODOB5 = "";
    public String A020COMME4 = "";
    public String A020COMME5 = "";
    public String A020COMME6 = "";
    public Double A020SOVEUS = 0d;
    public Double A020PLUSUS = 0d;
    public Double A020DIFLUS = 0d;
    public String A020BRKUS = "";
    public int A020BATCH = 0;
    public int A020ORDEN = 0;
    public String A020SEQUB = "";
    public String A020PENAL = "";
    //ADICION DE CAMPOS SIS.
    public String A020TFACT = "";
    public String A020SRCIB = "";
    public String A020TIPEX = "";
    public String A020REASON = "";
    public Double A020BOTCPR = 0d;
    public Double A020BOTCRM = 0d;
    public Double A020BUATPM = 0d;
    public Double A020BUATRM = 0d;
    public Double A020BHAFRM = 0d;
    public Double A020BVATRM = 0d;
    public Double A020AOTCPM = 0d;
    public Double A020AOTCRM = 0d;
    public Double A020AUATPM = 0d;
    public Double A020AUATRM = 0d;
    public Double A020AHAFRM = 0d;
    public Double A020AVATRM = 0d;
    public Double A020DOTCRM = 0d;
    public Double A020DUATRM = 0d;
    public Double A020DHAFRM = 0d;
    public Double A020DVATRM = 0d;
    public Double A020BOTCPL = 0d;
    public Double A020BOTCCL = 0d;
    public Double A020BUATPL = 0d;
    public Double A020BUATCL = 0d;
    public Double A020BHAFCL = 0d;
    public Double A020BVATCL = 0d;
    public Double A020AOTCPL = 0d;
    public Double A020AOTCCL = 0d;
    public Double A020AUATPL = 0d;
    public Double A020AUATCL = 0d;
    public Double A020AHAFCL = 0d;
    public Double A020AVATCL = 0d;
    public Double A020DOTCPL = 0d;
    public Double A020DOTCCL = 0d;
    public Double A020DUATPC = 0d;
    public Double A020DUATCL = 0d;
    public Double A020DHAFCL = 0d;
    public Double A020DVATCL = 0d;
    public Double A020DOTCPB = 0d;
    public Double A020DOTCCB = 0d;
    public Double A020DUATPB = 0d;
    public Double A020DUATCB = 0d;
    public Double A020DHAFCB = 0d;
    public Double A020DVATCB = 0d;
    
}
