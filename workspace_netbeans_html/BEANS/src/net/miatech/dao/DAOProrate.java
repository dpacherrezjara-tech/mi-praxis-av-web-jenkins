/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.dao;

import org.apache.log4j.Logger;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import net.miatech.beans.Airline;
import net.miatech.beans.ETKTCupon;
import net.miatech.beans.ProrateHeader;
import net.miatech.beans.ProrateSector;
import net.miatech.beans.RECA021;
import net.miatech.beans.TCNFilter;
import net.miatech.beans.RECA729;
import net.miatech.beans.RECA774;
import net.miatech.beans.lists.ETKTCuponList;
import net.miatech.beans.lists.ProrateSectorList;
import net.miatech.beans.lists.RECA021List;
import net.miatech.beans.lists.RECA729List;
import net.miatech.beans.lists.RECA774List;
import net.miatech.provider.Proveedor;
import net.miatech.utils.Functions;




/**
 *
 * @author claudia
 */
public class DAOProrate {

    private static final Logger logError = Logger.getLogger("errorLog");

    public List loadcustomers() {

        Connection con = null;
        Statement stmt = null; 
        ResultSet rst = null;
        Airline airline = null;
        List<Airline> lista = new ArrayList<Airline>();

        String strSQL = "SELECT * FROM LIBMIATEC.WRF000";

        try {
            con = Proveedor.getConnectionIS();
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {

                airline = new Airline();
                airline.setStrNumericCode(rst.getString("CCUST"));
                airline.setStrAlfaCode(rst.getString("CALFA"));
                airline.setStrName(rst.getString("NAMEC"));
                airline.setStrStatus(rst.getString("STATU"));
                airline.setStrMonedaDflt(rst.getString("CURRENP"));
                airline.setStrRutaImg(rst.getString("RUTAIMG"));
                airline.setStrTamanoImg(rst.getString("TAMANOI"));
                airline.setStrflagHolding(rst.getString("FHOLDI"));
                airline.setStrCustHolding(rst.getString("CCUSTH"));
                airline.setStrRutaIcono(rst.getString("RUTAICO"));
                airline.setStrTamanoIcono(rst.getString("TAMAICO"));
                airline.setStrCodPais(rst.getString("COUNTRY"));
                lista.add(airline);

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (con != null) {
                    con.close();
                    con = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return lista;
    }

    public ProrateHeader loadProrate(String nroPrt, String ticket, String ccust) {
        
        ProrateHeader data = new ProrateHeader();
        ProrateSector sector = null;
        ProrateSector sectorINI = null;
        ProrateSectorList list = new ProrateSectorList();
        List customers = loadcustomers();
        Connection con = null;
        Statement stm = null;
        ResultSet rst = null;
        String strSQL = "", calfa = "";
        int intQty = 0;
        long lngTotFACTOR = 0;
        double dblTotSURCHARGE = 0, dblTotXFARE = 0, dblTotPROVISOC = 0, dblTotSPA = 0;
        double dblTotAMOUNT = 0, dblTotVLSRP = 0, dblTotVLMPA = 0, dblTotADJUST = 0, dblTotDIFER = 0;
        
        for (int i = 0; i < customers.size(); i++) {
            Airline air = (Airline)customers.get(i);
            if (air.getStrNumericCode().trim().equals(ccust)) {
                calfa = air.getStrAlfaCode();
            }
        }
        
        try {
            
             strSQL = "SELECT * FROM ".concat(calfa).concat("D.A020 ")
                     .concat("WHERE A020AIRLIN='").concat(ccust).concat("' ");
            
            if(!ticket.trim().equals("")){
               strSQL = strSQL.concat(" AND A020CIA = '").concat(ticket.substring(0, 3))
                     .concat("' AND A020FORMA='").concat(ticket.substring(3, 7))
                     .concat("' AND A020SERIE='").concat(ticket.substring(7, 13))
                     .concat("' AND A020CUPON='").concat(ticket.substring(13, 14))
                     .concat("' "); 
            }
             
            if(!nroPrt.trim().equals("")){
                strSQL = strSQL.concat(" AND A020KEY = '").concat(nroPrt).concat("'");
            }
            
            con = Proveedor.getConnectionIS();
            stm = con.createStatement();
            rst = stm.executeQuery(strSQL);
            
            if(rst.next()) {                
                // <editor-fold defaultstate="collapsed" desc="Obteniendo data del A020.">
                data.setStrCCUST(ccust);
                data.setStrDOCNBR(rst.getString("A020CIA").concat(rst.getString("A020FORMA")).concat(rst.getString("A020SERIE")).concat(rst.getString("A020CUPON")));
                data.setStrNROPRT(nroPrt.trim());
                data.setStrA020SUFACT(rst.getString("A020SUFACT"));
                data.setDblA020SUDEBI(rst.getDouble("A020SUDEBI"));
                data.setDblA020IMPNAC(rst.getDouble("A020IMPNAC"));
                data.setDblA020ANALIZ(rst.getDouble("A020ANALIZ"));
                data.setDblA020TOTDEB(rst.getDouble("A020TOTDEB"));
                data.setDblA020ACEPTA(rst.getDouble("A020ACEPTA"));
                data.setDblA020IMPINT(rst.getDouble("A020IMPINT"));
                data.setDblA020COMISIP(rst.getDouble("A020COMISP"));
                data.setDblA020TOTHAB(rst.getDouble("A020TOTHAB"));
                data.setDblA020REDEBI(rst.getDouble("A020REDEBI"));
                data.setDblA020COMISI(rst.getDouble("A020COMISI"));
                data.setDblA020TAX(rst.getDouble("A020TAX"));
                data.setStrA020GRUPO(rst.getString("A020GRUPO"));
                data.setStrA020NROPRT(rst.getString("A020NROPRT"));
                data.setStrA020USER(rst.getString("A020USER"));
                data.setStrA020SDATE(rst.getString("A020SDATE"));
                data.setStrA020STIME(rst.getString("A020STIME"));
                data.setStrA020FRECHA(rst.getString("A020FRECHA"));
                data.setStrA020PSTRF(rst.getString("A020PSTRF"));
                data.setStrA020RMSN(rst.getString("A020RMSN"));
                data.setStrA020RMANT(rst.getString("A020RMANT"));
                data.setDblA020NETO(rst.getDouble("A020NETO"));
                data.setStrA020SUFECH(rst.getString("A020SUFECH"));
                data.setStrA020FUSO(rst.getString("A020FUSO"));
                data.setStrA020CLASRM(rst.getString("A020CLASRM"));
                data.setStrA020CODMOT(rst.getString("A020CODMOT"));
                data.setStrA020BASE(rst.getString("A020BASE"));
                data.setEsEscogido(false);
                data.setDblA020TARIFA(rst.getDouble("A020TARIFA"));
                data.setStrA020MONEDA(rst.getString("A020MONEDA"));
                data.setDblA020FAREUS(rst.getDouble("A020FAREUS"));
                data.setStrA020MNRCD(rst.getString("A020MNRCD"));
                data.setStrA020DEBHAB(rst.getString("A020DEBHAB"));
                data.setStrA020QSEG(rst.getString("A020QSEGUS"));

                if(rst.getString("A020TIPORM").trim().equals("N")){
                    data.setStrA020TIPORM("1");
                }else if(rst.getString("A020TIPORM").trim().equals("V")){
                    data.setStrA020TIPORM("2");
                }else{
                    data.setStrA020TIPORM("3");
                }
                if(rst.getString("A020TICKE1") != null){
                    data.setStrA020TICKET(rst.getString("A020TICKE1").trim().concat("\n")
                            .concat(rst.getString("A020TICKE2").trim()));
                }
                if(rst.getString("A020TICKE2") != null && rst.getString("A020TICKE2").trim().length()>5){
                    data.setStrNumeroRechazo(rst.getString("A020TICKE2").trim().substring(4));
                }
                //Guardando los comentarios =============================================================
                RECA021List listaComentarios = new RECA021List();
                RECA021 comentario = null;
                
                for(int i=1; i<6; i++){
                    comentario = new RECA021();
                    if(rst.getString("A020CODOB" + i) != null && !rst.getString("A020CODOB" + i).trim().equals("")){
                        comentario.strCodigo = rst.getString("A020CODOB" + i).trim(); 
                        if (rst.getString("A020COMME" + i) != null) {
                            comentario.strComentario1 = rst.getString("A020COMME" + i).trim();
                        } else {
                            comentario.strComentario1 = "";
                        }
                        if ((i + 1) < 6) {
                            if (rst.getString("A020CODOB" + (i + 1)) == null || 
                                rst.getString("A020CODOB" + (i + 1)).trim().equals("")) {
                                comentario.strComentario2 = rst.getString("A020COMME" + (i + 1));
                            }else{
                                comentario.strComentario2 = "";
                            }
                        }else{
                            //Para el comentario 6
                            comentario.strComentario2 = rst.getString("A020COMME" + (i + 1));
                        } 
                        if(rst.getString("A020DEBHAB")!=null){
                            comentario.strConcept = Functions.fillString(rst.getString("A020DEBHAB"), 5).substring(i-1, i);
                        }else{
                            comentario.strConcept = " ";
                        }
                        listaComentarios.add(comentario);
                    }
                }
                
                Functions.limpiarCamposA020Comentarios(data);
                comentario = null;
                for(int i=0; i<listaComentarios.size(); i++){
                    comentario = listaComentarios.getRECA021(i);
                    Functions.colocarComentarios(data, comentario);
                }
                //</editor-fold>
            }
            try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            //===========================================================================================
            //OBTENIENDO DATA DEL A728 ==================================================================
            strSQL = "SELECT * FROM LIBMIATEC.A728 WHERE A728AIRLIN = '"
                    .concat(ccust.trim()).concat("' ");
            
            if(data.getStrNROPRT() != null && !data.getStrNROPRT().trim().equals("")) {
                strSQL += "AND A728NROPRT = '".concat(data.getStrA020NROPRT()).concat("' ");
            }
            rst = stm.executeQuery(strSQL);
            
            while(rst.next()) {
                // <editor-fold defaultstate="collapsed" desc="Obteniendo Data del A728.">
                sector = new ProrateSector();
                
                if(intQty == 0) {
                    
                    sectorINI = new ProrateSector();
                    data.setStrNROPRT(data.getStrNROPRT());
                    data.setStrA728CUPON(rst.getString("A728CUPON"));
                    data.setStrBILLINGDATE(rst.getString("A728FECFAC"));
                    data.setStrISSUEDATE(rst.getString("A728FECVTA"));
                    data.setStrBILLINGAIRLINE(rst.getString("A728AIRFAC"));
                    data.setStrSELLINGPLACE(rst.getString("A728CTYVTA"));
                    data.setStrISSUEPLACE(rst.getString("A728CTYEMI"));
                    data.setStrGRUPO(rst.getString("A728GRUPO"));
                    data.setStrCOUVTA(rst.getString("A728COUVTA"));
                    data.setStrCOUEMI(rst.getString("A728COUEMI"));
                    data.setStrAJTRAM(rst.getString("A728AJTRAM"));
                    data.setStrSORIGIN(rst.getString("A728SECOR"));
                    data.setStrSDESTINY(rst.getString("A728SECDS"));
                    data.setStrRUTAORIGENDESTINO(rst.getString("A728SECOR").concat(rst.getString("A728SECDS")));
                    try {
                        data.setDblATBP(rst.getDouble("A728ATBP"));
                    }catch(Exception e){
                        data.setDblATBP(0);
                    }
                    data.setStrCURR(rst.getString("A728MDAATB"));
                    data.setStrMISC(rst.getString("A728CODTAX"));
                    data.setStrDISCT(rst.getString("A728TDESC"));
                    try {
                        data.setDblDISCC(rst.getDouble("A728PORDES"));
                    }catch(Exception e){
                        data.setDblDISCC(0);
                    }
                    data.setStrIT(rst.getString("A728CODIT"));
                    data.setDblSTOPOVERC(rst.getDouble("A728CSOVER"));
                    data.setIntSTOPOVERQ(rst.getInt("A728QSOVER"));
                    data.setStrPLUSSI(rst.getString("A728IPLUS"));
                    data.setDblPLUSSC(rst.getInt("A728CPLUSS"));
                    data.setDblNET(rst.getDouble("A728TAJUST"));
                    data.setStrINIT(rst.getString("A728RUTORG"));
                    data.setStrRCURR(rst.getString("A728MONSYS"));
                    data.setStrLOHO(rst.getString("A728LOHO"));
                    data.setDblFARE(rst.getDouble("A728TARIFA"));
                    data.setStrFCURR(rst.getString("A728MONEDA"));
                    data.setDblEQVFARE(rst.getDouble("A728TRFPAG"));
                    data.setStrECURR(rst.getString("A728MDAPAG"));
                    data.setDblROE(rst.getDouble("A728ROE"));
                    sectorINI.setStrOD(rst.getString("A728RUTAO").trim());
                    sectorINI.setStrA728RERUT(rst.getString("A728RERUT").trim());
                    sectorINI.setStrEsSector("");
                    //==========================================================
                    //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MODIFICADOS EN EL FORMULARIO
                    data.setStrSEQPRT(rst.getString("A728SEQPRT"));
                    data.setStrTUSO(rst.getString("A728TUSO"));
                    data.setStrDCHEQ(rst.getString("A728DCHEQ"));
                    data.setStrTVENTA(rst.getString("A728TVENTA"));
                    data.setDblTCAREG(rst.getDouble("A728TCAREG"));
                    data.setStrMONREG(rst.getString("A728MONREG"));
                    data.setDblTCASYS(rst.getDouble("A728TCASYS"));
                    data.setDblTCAPAG(rst.getDouble("A728TCAPAG"));
                    data.setStrINDSAM(rst.getString("A728INDSAM"));
                    data.setIntINDPRT(rst.getInt("A728INDPRT"));
                    data.setStrSELEC(rst.getString("A728SELEC"));
                    data.setValidarTiempoLimite(true);
                    if(ccust.trim().equals("057")){
                        data.setTieneComision(poseeDetalleComision(calfa, rst.getString("A728AIRFAC").trim())); 
                    }else{
                        data.setTieneComision(false);
                    }
                    //==========================================================
                    list.add(sectorINI);
                }
                
                if(rst.getString("A728SECOR").trim().equals(rst.getString("A728RUTAO").trim()) &&
                        rst.getString("A728SECDS").trim().equals(rst.getString("A728RUTAD").trim())) {
                    data.setStrFLIGHTDATE(rst.getString("A728FVLO1"));
                    data.setStrFABASIS(rst.getString("A728FBASE1"));
                }
                
                if (!rst.getString("A728RUTAD").trim().equals("")) {
                    //Obteniendo Totales =======================================
                    dblTotSURCHARGE += rst.getDouble("A728SS1");
                    dblTotXFARE += rst.getDouble("A728FARE1");
                    lngTotFACTOR += rst.getLong("A728FACT1");
                    dblTotPROVISOC += rst.getDouble("A728PROV1");
                    dblTotSPA += rst.getDouble("A728ACUEO1");
                    dblTotAMOUNT += rst.getDouble("A728VALOR1");
                    dblTotVLSRP += rst.getDouble("A728VLSRP1");
                    dblTotVLMPA += rst.getDouble("A728VLMPA1");
                    dblTotADJUST += rst.getDouble("A728AJUST1");
                    dblTotDIFER += rst.getDouble("A728DIFER1");

                    sector.setStrOD(rst.getString("A728RUTAD").trim());
                    sector.setStrCARR(rst.getString("A728CARRA1").trim());
                    sector.setStrNFLIGHT(rst.getString("A728NVLO1").trim());
                    sector.setStrRBD(rst.getString("A728BOOKI1").trim());
                    sector.setDblSURCHARGE(rst.getDouble("A728SS1"));
                    sector.setStrXO(rst.getString("A728XO").trim());
                    sector.setLngFACTOR(rst.getLong("A728FACT1"));
                    sector.setDblPROVISOC(rst.getDouble("A728PROV1"));
                    sector.setDblPROVISOP((rst.getDouble("A728PPRO1")*100)/100);
                    sector.setDblFARE(rst.getDouble("A728TARI1"));
                    sector.setDblSPA(rst.getDouble("A728ACUEO1"));
                    sector.setDblAMOUNT(rst.getDouble("A728VALOR1"));
                    if (rst.getString("A728INDPR1").equals("S")) {
                        sector.setStrAMTV("SRP");
                    } else if (rst.getString("A728INDPR1").equals("A")) {
                        sector.setStrAMTV("SPA");
                        
                        if (rst.getString("A728ACUCO1").substring(9, 10).equals("Z")) {
                            sector.setStrAMTV("ZED");
                        } else if (rst.getString("A728ACUCO1").substring(9, 10).equals("M")) {
                            sector.setStrAMTV("MXP");
                        }else if (rst.getString("A728ACUCO1").substring(9, 10).equals("Q")) {
                            sector.setStrAMTV("FQT");
                        }else if (rst.getString("A728ACUCO1").substring(9, 10).equals("P")) {
                            sector.setStrAMTV("SMP");
                        }else if (rst.getString("A728ACUCO1").substring(9, 10).equals("&")) {
                            sector.setStrAMTV("F&F");
                        }else if (rst.getString("A728ACUCO1").substring(9, 10).equals("R")) {
                            sector.setStrAMTV("RTW");
                        }else if (rst.getString("A728ACUCO1").substring(9, 10).equals("L")) {
                            sector.setStrAMTV("GLB");
                        }
                    } else if (rst.getString("A728INDPR1").equals("M") || rst.getString("A728INDPRT").equals("P")) {
                        sector.setStrAMTV("MPA");
                    } else if (rst.getString("A728INDPR1").equals("R")) {
                        sector.setStrAMTV("RTW");
                    } else if (rst.getString("A728INDPR1").equals("H")) {
                        sector.setStrAMTV("ACH");
                    } else {
                        sector.setStrAMTV("");
                    }
                    sector.setDblADJUST(rst.getDouble("A728AJUST1"));
                    //==============================================================
                    //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                    sector.setStrVIA(rst.getString("A728VIA1").trim());
                    sector.setStrCARRN(rst.getString("A728CARRN1"));
                    sector.setStrFCVLO(rst.getString("A728FVLO1"));
                    sector.setStrCLASE(rst.getString("A728CLASE1"));
                    sector.setStrFBASE(rst.getString("A728FBASE1"));
                    sector.setStrLOHO(rst.getString("A728LOHO"));
                    sector.setStrTBASE(rst.getString("A728TBASE1"));
                    sector.setStrSTBAS(rst.getString("A728STBAS1"));
                    sector.setDblXFARE(rst.getDouble("A728FARE1"));
                    sector.setStrTFARE(rst.getString("A728TFARE1"));
                    sector.setDblDIFER(rst.getDouble("A728DIFER1"));
                    sector.setStrFDIFE(rst.getString("A728FDIFE1"));
                    sector.setDblTRFM(rst.getDouble("A728TRFM1"));
                    sector.setStrMNTFM(rst.getString("A728MNTFM1"));
                    sector.setDblPLUSS(rst.getDouble("A728CPLUSS"));
                    sector.setDblSTOP(rst.getDouble("A728STOP1"));
                    sector.setStrMNACU(rst.getString("A728MNACU1"));
                    sector.setStrACUCO(rst.getString("A728ACUCO1"));
                    sector.setDblACUE(rst.getDouble("A728ACUE1"));
                    sector.setDblYANQ(rst.getDouble("A728YANQ1"));
                    sector.setStrSUBPA(rst.getString("A728SUBPA1"));
                    sector.setDblVLMPA(rst.getDouble("A728VLMPA1"));
                    sector.setDblVLSRP(rst.getDouble("A728VLSRP1"));
                    sector.setStrINDPR(rst.getString("A728INDPR1"));
                    sector.setStrINDISC(rst.getString("A728INDISC"));
                    sector.setDblISC(rst.getDouble("A728ISC"));
                    sector.setDblCOEFIC(rst.getDouble("A728COEFIC"));
                    sector.setStrACUBAS(rst.getString("A728ACUBS1"));
                    sector.setStrACUSTS(rst.getString("A728ACUST1"));
                    sector.setStrPRVSTS(rst.getString("A728PRVST1"));
                    sector.setStrA728RERUT(rst.getString("A728RERUT"));
                    //=================================================================
                    /*Para saber si la ruta que viene pertenece al sector a prorratear.
                     Esto se hace para que se pueda mostrar "La pistolita" */
                    if(list.getProrateSector(list.size()-1).getStrOD().trim().equals(rst.getString("A728SECOR").trim()) &&
                       rst.getString("A728RUTAD").trim().equals(rst.getString("A728SECDS").trim())){
                        list.getProrateSector(list.size()-1).setStrEsSector("solo");
                        sector.setStrEsSector("todo"); 
                    }else{
                        sector.setStrEsSector("");
                    }
                    //=================================================================
                    list.add(sector);
                }
                
                intQty++;
                //</editor-fold>
            }
            try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            
            //Colocando el X/O ===========================================================================
            for(int x=0;x<list.size()-1;x++){
                list.getProrateSector(x).setStrXO(list.getProrateSector(x+1).getStrXO());
            }
            if (list != null && list.size() > 0) {
                list.getProrateSector(list.size() - 1).setStrXO("");
                list.getProrateSector(0).setDblTotSURCHARGE(Functions.redondear(dblTotSURCHARGE, 2));
                list.getProrateSector(0).setDblTotXFARE(Functions.redondear(dblTotXFARE, 2));
                list.getProrateSector(0).setLngTotFACTOR(lngTotFACTOR);
                list.getProrateSector(0).setDblTotPROVISOC(Functions.redondear(dblTotPROVISOC, 2));
                list.getProrateSector(0).setDblTotSPA(Functions.redondear(dblTotSPA, 2));
                list.getProrateSector(0).setDblTotAMOUNT(Functions.redondear(dblTotAMOUNT, 2));
                list.getProrateSector(0).setDblTotVLSRP(Functions.redondear(dblTotVLSRP, 2));
                list.getProrateSector(0).setDblTotVLMPA(Functions.redondear(dblTotVLMPA, 2));
                list.getProrateSector(0).setDblTotADJUST(Functions.redondear(dblTotADJUST, 2));
                list.getProrateSector(0).setDblTotDIFER(Functions.redondear(dblTotDIFER, 2));
            }
            data.setSECTORS(list);
            // ===========================================================================================
            // <editor-fold defaultstate="collapsed" desc="Obteniendo Imagenes.">
            //Obteniendo Ruta de Imagen Principal ========================================================
            if (data.getStrDOCNBR() != null && !data.getStrDOCNBR().trim().equals("")) {

                strSQL = "SELECT FILENAME, ETKTIND FROM LIBMIATEC.A1200R WHERE CCUST = '".concat(ccust.trim())
                        .concat("' AND CCIA = '").concat(data.getStrDOCNBR().substring(0, 3))
                        .concat("' AND FORMA='").concat(data.getStrDOCNBR().substring(3, 7))
                        .concat("' AND SERIE='").concat(data.getStrDOCNBR().substring(7, 13))
                        .concat("' AND CUPON='").concat(data.getStrDOCNBR().substring(13, 14))
                        .concat("' AND SEQ='00'");

                rst = stm.executeQuery(strSQL);
                if (rst.next()) {
                    data.setStrFILENAME(rst.getString("FILENAME"));
                    data.setStrFILENAMEORIG(rst.getString("FILENAME"));
                    data.setStrETKTIND(rst.getString("ETKTIND"));
                }
                try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            }
            // ===========================================================================================
            //Obteniendo Ruta de Imagenes de la Factura y del Rechazo ====================================            
            if (data.getStrNumeroRechazo() != null && !data.getStrNumeroRechazo().trim().equals("")) {

                strSQL = "SELECT A1352FNAME FROM LIBMIATEC.A1352 WHERE A1352CCUST = '"
                        .concat(ccust.trim()).concat("' AND A1352NRORM = '")
                        .concat(data.getStrNumeroRechazo()).concat("'");

                rst = stm.executeQuery(strSQL);
                int n = 1;
                String[] listaImgs = new String[20];
                listaImgs[0] = data.getStrFILENAME();
                while (rst.next()) {
                    listaImgs[n] = rst.getString("A1352FNAME");
                    n++;
                }
                data.setListaOtrasRutas(listaImgs);
            }
            try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            // </editor-fold>
            //=============================================================================================
            // Obteniendo la Informacion Adicional ========================================================
            strSQL = "SELECT * FROM LIBMIATEC.A1292 WHERE CCUST = '"
                    .concat(ccust.trim()).concat("' AND NROPRT = '")
                    .concat(data.getStrNROPRT()).concat("'");
            
            rst = stm.executeQuery(strSQL);
            String addInfo="";
            if(rst.next()) {
                for(int i=1;i<16;i++){
                    addInfo+=rst.getString("LINE"+i);
                }
            }
            data.setStrAdditionalInfo(addInfo);
            try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            //=============================================================================================
            //=============================================================================================
            strSQL = "SELECT A005KEY2, A005KEY3, A005KEY1, A005CHS FROM "
                    .concat(calfa.trim()).concat("D.A005 WHERE A005KEY = '")
                    .concat(data.getStrBILLINGAIRLINE()).concat("' ");
            
            rst = stm.executeQuery(strSQL);
            if(rst.next()) {
                if(rst.getString("A005KEY3").trim().isEmpty()){
                    data.setStrAirlineName(rst.getString("A005KEY2").trim());
                }else{
                    data.setStrAirlineName(rst.getString("A005KEY3").trim());
                }
                data.setStrAirlineAlfaCode(rst.getString("A005KEY1"));
                data.setStrCHS(rst.getString("A005CHS"));
            }
            try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            //=============================================================================================
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            try{
                if(rst!=null){ try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); } rst = null;}
                if(stm!=null){ try { stm.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); } stm = null;}
                if(con!=null){
                    con.close();
                    con = null;
                }
            }catch(Exception ex01){
                ex01.printStackTrace();
            }
        }
        
        return data;
    }
    
    public static boolean poseeDetalleComision(String calfa, String aer){

        Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        boolean ok = false;

        strSQL = " SELECT * FROM ".concat(calfa.trim().toUpperCase())
                .concat("D.A051 WHERE A051KEY1='98' AND A051KEY2='")
                .concat(aer.trim()).concat("' ");
        try {
            con = Proveedor.getConnectionIS();            
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            if (rst.next()) {
                ok = true;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }}
                if (stmt != null) {stmt.close();}
                if (con != null) {con.close();con = null;}
            } catch (Exception ex) {ex.printStackTrace();}
        }

        return ok;
    }
    
    public RECA729List loadTaxes(String ccust, String aer, String nroPrt) {

        RECA729 invoice = null;
        RECA729List lstTaxes = new RECA729List();
        Connection con = null;
        Statement stmt = null, stmt2 = null;
        ResultSet rst = null, rst2 = null;
        String strSQL = "", SQL2 = "";
        double dblTotA729TAXRES = 0;

        strSQL = " SELECT * FROM LIBMIATEC.A729 WHERE A729AIRLIN='".concat(ccust.trim())
                .concat("' AND A729TUSO='04' AND A729CIA='").concat(aer.trim())
                .concat("' AND A729NRODOC='0").concat(nroPrt.trim())
                .concat("' AND A729CUPON='0' ");

        //==============================================================================================

        try {
            con = Proveedor.getConnectionIS();
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {

                dblTotA729TAXRES += rst.getDouble("A729TAXRES");
                
                invoice = new RECA729();
                invoice.A729AIRLIN = rst.getString("A729AIRLIN");
                invoice.A729CIA = rst.getString("A729CIA");
                invoice.A729CODTAX = rst.getString("A729CODTAX");
                invoice.A729CUPON = rst.getString("A729CUPON");
                invoice.A729FCAMBI = rst.getString("A729FCAMBI");
                invoice.A729MDARES = rst.getString("A729MDARES");
                invoice.A729MONEDA = rst.getString("A729MONEDA");
                invoice.A729NRODOC = rst.getString("A729NRODOC");
                invoice.A729SEQ = rst.getString("A729SEQ");
                invoice.A729TAXRES = Functions.redondear(rst.getDouble("A729TAXRES"), 2);
                invoice.A729TUSO = rst.getString("A729TUSO");
                invoice.A729VALTAX = Functions.redondear(rst.getDouble("A729VALTAX"), 2);

                //*************************OBTENIENDO NOMBRE TAX ***************             
                SQL2 = " SELECT A1094TNM FROM LIBMIATEC.A1094B WHERE A1094TID='"
                        .concat(rst.getString("A729CODTAX")).concat("'");

                try {
                    stmt2 = con.createStatement();
                    rst2 = stmt2.executeQuery(SQL2);
                    if (rst2.next()) {
                        invoice.strNombreTax = rst2.getString("A1094TNM");
                    }
                    rst2.close();
                    stmt2.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                //**************************************************************
                lstTaxes.add(invoice);
            }
            
            if(lstTaxes!=null && lstTaxes.size()>0){
                lstTaxes.getRECA729(0).A729TAXRES = Functions.redondear(dblTotA729TAXRES, 2);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (con != null) {
                    con.close();
                    con = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return lstTaxes;
    }
    
    public TCNFilter loadTCNTickets(String documento, String ccust, String calfa) {

        Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        TCNFilter record = null;
        boolean encontroData = false;
        String[] lstConjunciones = new String[4];
        String[] lstExchanges = new String[3];
        String taxes = "";
        String cia = documento.substring(0, 3);
        String formaSerie = documento.substring(3, 13); 
        int n =0;
        long intFormaSerie = 0;
        
        try {
            intFormaSerie = Long.parseLong(Functions.fillZeros(13, documento).substring(3, 13));
        } catch (Exception e) {
        }
        
        if (!formaSerie.trim().equals("")) {

            String sql = " SELECT * FROM QGPL.A1342A WHERE CXRRNUM = '".concat(ccust)
                    .concat("' AND CIA='").concat(documento.substring(0, 3))
                    .concat("' AND FORMASERIE='").concat(formaSerie).concat("' ");

            try {
                con = Proveedor.getConnectionIS();
                stmt = con.createStatement();
                rst = stmt.executeQuery(sql);

                record = new TCNFilter();
                while (rst.next()) {

                    encontroData = true;
                    String TCNMAXLONG = Functions.fillString(rst.getString("TCNMAXLONG"), 358);

                    switch (Integer.parseInt(rst.getString("RCID"))) {
                        
                        case 1:
                            record.strIssuedBy = obtenerCampoA005("A005KEY3", rst.getString("CIA"), calfa.trim());
                            record.strPassBagg = TCNMAXLONG.substring(0, 4);
                            record.strDatePlaceIssue = TCNMAXLONG.substring(114, 122);
                            record.strAgentNumber = TCNMAXLONG.substring(123, 131);
                            record.strBooking = TCNMAXLONG.substring(49, 62);
                            record.strPassenger = TCNMAXLONG.substring(65, 114);
                            record.strNumTkt = rst.getString("TDNR");
                            //**************** Hallando las Conjunciones **************************************************
                            int posicion = Integer.parseInt(TCNMAXLONG.substring(12, 14).replace(" ", "0"));
                            int ttlConjun = Integer.parseInt(TCNMAXLONG.substring(14, 16).replace(" ", "0"));
                            //Asumiendo q vienen solo 4 conjunciones
                            switch (ttlConjun) {
                                case 2:
                                    switch (posicion) {
                                        case 1:
                                            record.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                            lstConjunciones[0] = cia + formaSerie;
                                            lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                            break;
                                        case 2:
                                            record.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie);
                                            lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                            lstConjunciones[1] = cia + formaSerie;
                                    }
                                    break;
                                case 3:
                                    switch (posicion) {
                                        case 1:
                                            record.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                            lstConjunciones[0] = cia + formaSerie;
                                            lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                            lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 2);
                                            break;
                                        case 2:
                                            record.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                            lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                            lstConjunciones[1] = cia + formaSerie;
                                            lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 1);
                                            break;
                                        case 3:
                                            record.strConjTkts = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie);
                                            lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 2);
                                            lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 1);
                                            lstConjunciones[2] = cia + formaSerie;
                                    }
                                    break;
                                case 4:
                                    switch (posicion) {
                                        case 1:
                                            record.strConjTkts = formaSerie.concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 3).substring(8, 10));
                                            lstConjunciones[0] = cia + formaSerie;
                                            lstConjunciones[1] = cia + String.valueOf(intFormaSerie + 1);
                                            lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 2);
                                            lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 3);
                                            break;
                                        case 2:
                                            record.strConjTkts = String.valueOf(intFormaSerie - 1).substring(8, 10).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie + 2).substring(8, 10));
                                            lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 1);
                                            lstConjunciones[1] = cia + formaSerie;
                                            lstConjunciones[2] = cia + String.valueOf(intFormaSerie + 1);
                                            lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 2);
                                            break;
                                        case 3:
                                            record.strConjTkts = String.valueOf(intFormaSerie - 2).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie).concat("-").concat(String.valueOf(intFormaSerie + 1).substring(8, 10));
                                            lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 2);
                                            lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 1);
                                            lstConjunciones[2] = cia + formaSerie;
                                            lstConjunciones[3] = cia + String.valueOf(intFormaSerie + 1);
                                            break;
                                        case 4:
                                            record.strConjTkts = String.valueOf(intFormaSerie - 3).substring(8, 10).concat("-").concat(String.valueOf(intFormaSerie - 2).substring(8, 10)).concat("-").concat(String.valueOf(intFormaSerie - 1).substring(8, 10)).concat("-").concat(formaSerie);
                                            lstConjunciones[0] = cia + String.valueOf(intFormaSerie - 3);
                                            lstConjunciones[1] = cia + String.valueOf(intFormaSerie - 2);
                                            lstConjunciones[2] = cia + String.valueOf(intFormaSerie - 1);
                                            lstConjunciones[3] = cia + formaSerie;
                                    }


                            }
                            record.lstConjunciones = lstConjunciones;
                            //************************************************************************************************
                            break;

                        case 3:
                            record.strOrigDestin = TCNMAXLONG.substring(10, 24);
                            record.strEndorsRest = TCNMAXLONG.substring(204, 351);
                            record.strTourCode = TCNMAXLONG.substring(105, 120);
                            record.strFare = TCNMAXLONG.substring(39, 50);
                            record.strEquivFare = TCNMAXLONG.substring(50, 61);
                            record.strTax01 = TCNMAXLONG.substring(61, 72);
                            record.strTax02 = TCNMAXLONG.substring(72, 83);
                            record.strTax03 = TCNMAXLONG.substring(83, 94);
                            record.strTotal = TCNMAXLONG.substring(94, 105);
                            record.strOrigIssue = TCNMAXLONG.substring(172, 204);
                            break;

                        case 4: 
                            taxes = taxes.concat(TCNMAXLONG.trim() + "\n" + "***************************************");
                            break;

                        case 5:
                            record.strItinerario = TCNMAXLONG;
                            break;

                        case 7:
                            record.strFormPay = TCNMAXLONG.substring(0, 10).concat(TCNMAXLONG.substring(123, 133));
                            // ***  Hallando los Exchanged *******************
                            String strIssue1 = "",
                             strIssue2 = "";
                            if (TCNMAXLONG.contains("EX")) {
                                strIssue1 = record.strOrigIssue.substring(0, 13);
                                if (strIssue1.trim().equals("")) {
                                    strIssue1 = TCNMAXLONG.substring(TCNMAXLONG.indexOf("EX") + 2, TCNMAXLONG.indexOf("EX") + 36);
                                }
                                strIssue2 = TCNMAXLONG.substring(144, 157);
                                if (!strIssue1.trim().startsWith("139")) {
                                    strIssue1 = TCNMAXLONG.substring(144, 157);
                                    strIssue2 = "";
                                }
                                if (!strIssue2.trim().startsWith("139")) {
                                    strIssue2 = "";
                                }

                            }
                            // ***********************************************
                            record.strIssueExc1 = strIssue1;
                            record.strIssueExc2 = strIssue2;
                            lstExchanges[0] = cia + formaSerie;
                            lstExchanges[1] = strIssue1;
                            lstExchanges[2] = strIssue2;
                            record.lstExchanges = lstExchanges;
                            break;

                        case 8:
                            record.strFareCal = TCNMAXLONG.substring(2);

                    }
                }
                record.strTotalTaxes = taxes.trim();

                if (!encontroData) {
                    record.msgError = "Record not found.";
                }

            } catch (Exception e) {
                record = new TCNFilter();
                record.msgError = e.getMessage();
                e.printStackTrace();
            } finally {
                try {
                    if (rst != null) {
                        try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                    }
                    if (stmt != null) {
                        stmt.close();
                    }
                    if (con != null) {
                        con.close();
                        con = null;
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }

        }

        return record;

    }
    
    public static String obtenerCampoA005(String campo, String codNumAer, String codAlfaAer) {

        Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        String campoResultado = "";

        strSQL = "SELECT ".concat(campo.trim().toUpperCase()).concat(" FROM ")
                .concat(codAlfaAer.trim().toUpperCase()).concat("D.A005 WHERE A005KEY='")
                .concat(codNumAer.trim()).concat("' ");


        try {
            con = Proveedor.getConnectionIS();
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            if (rst.next()) {
                campoResultado = rst.getString(campo.trim().toUpperCase());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (con != null) {
                    con.close();
                    con = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return campoResultado;
    }
    
    public RECA774List loadTonusTickets(String documento, String ccust, String calfa) {

        Connection con = null;
        Statement stmt = null, stmt2 = null;
        ResultSet rst = null, rst2 = null;
        RECA774 record = null;
        RECA774List lstImgTonus = new RECA774List();
        String formaSerie = documento.substring(3, 13); 
        int n = 0;

        String sql = " SELECT * FROM LIBMIATEC.A773F WHERE A773FOUND = 'OK' "
                .concat(" AND A773AIRLIN='").concat(ccust.trim())
                .concat("' AND A773CCIA='").concat(documento.substring(0, 3))
                .concat("' AND A773FORMA='").concat(formaSerie.substring(0, 4))
                .concat("' AND A773SERIE='").concat(formaSerie.substring(4))
                .concat("' AND A773CUPON='").concat(documento.substring(13, 14))
                .concat("' ");
        
        try {
            con = Proveedor.getConnectionIS();
            stmt = con.createStatement();
            rst = stmt.executeQuery(sql);
            
            if (rst.next()) {
                
                sql = " SELECT * FROM LIBMIATEC.A774 WHERE "
                        .concat(" A774AIRLIN='").concat(ccust.trim())
                        .concat("' AND A774TIPSEA='").concat(rst.getString("A773TIPSEA"))
                        .concat("' AND A774ENVIO='").concat(rst.getString("A773ENVIO"))
                        .concat("' AND A774KEYENV='").concat(rst.getString("A773KEYENV"))
                        .concat("' AND A774PCID='").concat(rst.getString("A773PCID"))
                        .concat("' AND SUBSTR(A774TKTORI,4,14)='").concat(documento.trim())
                        .concat("' ");
                
                stmt2 = con.createStatement();
                rst2 = stmt.executeQuery(sql);
                
                while (rst2.next()) {
                                        
                    record  = new RECA774();
                    record.setStrA774DISSUE(rst2.getString("A774DISSUE"));
                    record.setStrA774CUPON(rst2.getString("A774CUPON"));
                    record.setStrA774OFFIID(rst2.getString("A774OFFIID"));
                    record.setStrA774AGECOD(rst2.getString("A774AGECOD"));
                    record.setStrA774NOMPAX(rst2.getString("A774NOMPAX"));
                    record.setStrA774FBASIS(rst2.getString("A774FBASIS"));
                    record.setStrA774TCODE(rst2.getString("A774TCODE"));
                    record.setStrA774FI(rst2.getString("A774FI"));
                    record.setStrA774FROM(rst2.getString("A774FROM"));
                    record.setStrA774CARRIE(rst2.getString("A774CARRIE"));
                    record.setStrA774FLIGHT(rst2.getString("A774FLIGHT"));
                    record.setStrA774CLRESA(rst2.getString("A774CLRESA"));
                    record.setStrA774CLTRAN(rst2.getString("A774CLTRAN"));
                    record.setStrA774DATE(rst2.getString("A774DATE"));
                    record.setStrA774TIME(rst2.getString("A774TIME"));
                    record.setStrA774TO(rst2.getString("A774TO"));
                    record.setStrA774ENDRT(rst2.getString("A774ENDRT"));
                    record.setStrA774ORIISS(rst2.getString("A774ORIISS"));
                    record.setStrA774ISSEXC(rst2.getString("A774ISSEXC"));
                    record.setStrA774FARCAL(rst2.getString("A774FARCAL"));
                    record.setDblA774FARCUR(rst2.getDouble("A774FARCUR"));
                    record.setStrA774FARE(rst2.getString("A774FARE"));
                    record.setStrA774EQVCUR(rst2.getString("A774EQVCUR"));
                    record.setDblA774EQV(rst2.getDouble("A774EQV"));
                    record.setStrA774FPAG(rst2.getString("A774FPAG"));
                    record.setStrA774TCURR1(rst2.getString("A774TCURR1"));
                    record.setDblA774TAXAM1(rst2.getDouble("A774TAXAM1"));
                    record.setStrA774TXCOD1(rst2.getString("A774TXCOD1"));
                    record.setStrA774TCURR2(rst2.getString("A774TCURR2"));
                    record.setDblA774TAXAM2(rst2.getDouble("A774TAXAM2"));
                    record.setStrA774TXCOD2(rst2.getString("A774TXCOD2"));
                    record.setStrA774TCURR3(rst2.getString("A774TCURR3"));
                    record.setDblA774TAXAM3(rst2.getDouble("A774TAXAM3"));
                    record.setStrA774TXCOD3(rst2.getString("A774TXCOD3"));
                    record.setStrA774CURREN(rst2.getString("A774CURREN"));
                    record.setDblA774TOTAL(rst2.getDouble("A774TOTAL"));
                    record.setStrA774DOCUM(rst2.getString("A774DOCUM"));
                    record.setStrA774TKTORI(rst2.getString("A774TKTORI"));
                    record.setIntPosicion(n);
                    if(rst2.getString("A774CUPON")!=null && rst2.getString("A774CUPON").trim().equals(documento.substring(13, 14))){
                        record.setIsSelected(true);
                    }
                    n++;
                    lstImgTonus.add(record);
                }
                rst2.close();
                stmt2.close();
                
                if(lstImgTonus!=null && lstImgTonus.size()>0){
                    for(int i=0; i<lstImgTonus.size(); i++){
                        lstImgTonus.getRECA774(i).setIntListaSize(n);
                    }
                }
                
            }
            

        } catch (Exception e) {
            record = new RECA774();
            record.setStrMsgError(e.getMessage()); 
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (con != null) {
                    con.close();
                    con = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return lstImgTonus;

    }
    
    public ETKTCuponList selectNotA1200(ETKTCuponList list) {
       
        boolean flagFather = false;
        boolean flagShowETKT = false;
        ETKTCupon filtro = null;
        filtro = list.getETKTFilter();
        Connection conIS = null;
        Connection conOra = null;
        ConnectionPoolIS poolIS = null;
        ConnectionPoolOra poolOra = null;
        Statement stmOra = null;
        ResultSet rstOra = null;
        Statement stmIS = null;
        ResultSet rstIS = null;
        String strSQLIS = "";
        try {
            poolIS = ConnectionPoolIS.getConnectionPool();
            poolOra = ConnectionPoolOra.getConnectionPool();
            conIS = poolIS.getConnection();
            conOra = poolOra.getConnection();
            stmIS = conIS.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            stmOra = conOra.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

            strSQLIS = "SELECT * FROM LIBMIATEC.A1200 WHERE CCUST = '"
                    .concat(filtro.getStrCcust()).concat("' AND CCIA = '").concat(filtro.getStrCcust())
                    .concat("' AND FORMA = '").concat(filtro.getStrDocnbr().substring(0, 4))
                    .concat("' AND SERIE = '").concat(filtro.getStrDocnbr().substring(4, 10))
                    .concat("' AND CUPON = '").concat(filtro.getStrCupon()).concat("' ");

            rstIS = stmIS.executeQuery(strSQLIS);
            if (rstIS.next() && (rstIS.getString("USAC").trim().equals("PRT-ETKT") || rstIS.getString("USAC").trim().equals("PRT-NOETKT") || rstIS.getString("USAC").trim().equals("AUTO-IDEC") || rstIS.getString("ETKTIND").trim().equals("E"))) {
                flagShowETKT = true;
            }
            rstIS.beforeFirst();
            if (!rstIS.next()) {
                flagShowETKT = true;
            }

            if (flagShowETKT) {
                String strSQL = "SELECT * FROM ETKTXPAGAR etkt LEFT JOIN ERROR_ETKTXPAGAR error ON "
                        .concat(" error.cia = etkt.cliente AND error.forma||error.serie = etkt.docnbr AND ")
                        .concat(" error.billingdate = etkt.billingdate WHERE etkt.father = '")
                        .concat(filtro.getStrDocnbr()).concat("' ");
                
                if (filtro.getStrCcust().equals("139")) {
                    strSQL = strSQL.concat("AND (etkt.cliente = '").concat(filtro.getStrCcust())
                            .concat("' OR etkt.cliente = '642') ");
                } else {
                    strSQL = strSQL.concat("AND etkt.cliente = '").concat(filtro.getStrCcust()).concat("' ");
                }

                if ((filtro.getStrBillingdate() != null) && !(filtro.getStrBillingdate().equals(""))) {
                    strSQL = strSQL.concat("AND etkt.billingdate='").concat(filtro.getStrBillingdate().trim()).concat("' ");
                }
                strSQL = strSQL.concat("ORDER BY etkt.tradm, etkt.cia, etkt.docnbr, etkt.cupon");
                rstOra = stmOra.executeQuery(strSQL);

                ETKTCupon etkt = null;

                while (rstOra.next()) {
                    flagFather = true;
                    etkt = new ETKTCupon();
                    etkt.setStrCia(filtro.getStrBillingdate().trim());
                    etkt.setStrCcust(filtro.getStrCcust());
                    etkt.setStrFiltroDoc(filtro.getStrDocnbr());
                    etkt.setStrFiltroCupon(filtro.getStrCupon());
                    etkt.setStrBillingdate(rstOra.getString("billingdate"));
                    etkt.setStrDocnbr(rstOra.getString("docnbr"));
                    etkt.setStrDocfareamt(rstOra.getString("docfareamt"));
                    etkt.setStrIssuedate(rstOra.getString("issuedate"));
                    etkt.setStrIndcnj(rstOra.getString("indcnj"));
                    etkt.setStrCnjnbr(rstOra.getString("cnjnbr"));
                    etkt.setStrTourcode(rstOra.getString("tourcode"));
                    etkt.setStrCurrencyfare(rstOra.getString("currencyfare"));
                    etkt.setStrEqufarepaid(rstOra.getString("equfarepaid"));
                    etkt.setStrCupon(rstOra.getString("cupon"));
                    etkt.setStrFlightdate(rstOra.getString("flightdate"));
                    etkt.setStrFlightnumber(rstOra.getString("flightnumber"));
                    etkt.setStrCityorig(rstOra.getString("cityorig"));
                    etkt.setStrCitydest(rstOra.getString("citydest"));
                    etkt.setStrIndstop(rstOra.getString("indstop"));
                    etkt.setStrCarrier(rstOra.getString("carrier"));
                    etkt.setStrFarebasis(rstOra.getString("farebasis"));
                    etkt.setStrClase(rstOra.getString("class"));
                    etkt.setStrFarecal(rstOra.getString("farecal"));
                    etkt.setStrTipocupon(rstOra.getString("tipocupon"));
                    etkt.setStrTktOriginal(rstOra.getString("boletoorginal"));
                    etkt.setStrLugarEmision(rstOra.getString("lugar_venta"));
                    etkt.setStrLugarEmisionCambio(rstOra.getString("lugarventaorginal"));
                    etkt.setStrPasajero(rstOra.getString("nombre"));
                    etkt.setStrTipoPasajero(rstOra.getString("typepasser"));
                    if (rstOra.getString("cod_error") != null) {
                        etkt.setStrError(rstOra.getString("cod_error").concat(" - ").concat(rstOra.getString("descripcion")));
                    }
                    list.add(etkt);
                }

                if (!flagFather) {
                    strSQL = "SELECT father FROM ETKTXPAGAR WHERE docnbr = '"
                            .concat(filtro.getStrDocnbr()).concat("' AND cliente = '")
                            .concat(filtro.getStrCcust()).concat("' ");

                    if ((filtro.getStrBillingdate() != null) && !(filtro.getStrBillingdate().equals(""))) {
                        strSQL = strSQL.concat("AND billingdate='").concat(filtro.getStrBillingdate().trim()).concat("' ");
                    }
                    rstOra = stmOra.executeQuery(strSQL);

                    if (rstOra.next()) {
                        strSQL = "SELECT * FROM ETKTXPAGAR etkt LEFT JOIN ERROR_ETKTXPAGAR error "
                                .concat(" ON error.cia = etkt.cliente AND ")
                                .concat(" error.forma||error.serie = etkt.docnbr AND ")
                                .concat(" error.billingdate = etkt.billingdate ")
                                .concat(" WHERE etkt.father = '").concat(rstOra.getString("father"))
                                .concat("' ");
                        
                        if ((filtro.getStrBillingdate() != null) && !(filtro.getStrBillingdate().equals(""))) {
                            strSQL = strSQL.concat("AND etkt.billingdate='").concat(filtro.getStrBillingdate().trim())
                                    .concat("' ");
                        }
                        strSQL = strSQL.concat("ORDER BY etkt.tradm, etkt.cia, etkt.docnbr, etkt.cupon");
                        rstOra = stmOra.executeQuery(strSQL);
                    }

                    while (rstOra.next()) {
                        etkt = new ETKTCupon();
                        etkt.setStrBillingdate(rstOra.getString("billingdate"));
                        etkt.setStrDocnbr(rstOra.getString("docnbr"));
                        etkt.setStrDocfareamt(rstOra.getString("docfareamt"));
                        etkt.setStrIssuedate(rstOra.getString("issuedate"));
                        etkt.setStrIndcnj(rstOra.getString("indcnj"));
                        etkt.setStrCnjnbr(rstOra.getString("cnjnbr"));
                        etkt.setStrTourcode(rstOra.getString("tourcode"));
                        etkt.setStrCurrencyfare(rstOra.getString("currencyfare"));
                        etkt.setStrEqufarepaid(rstOra.getString("equfarepaid"));
                        etkt.setStrCupon(rstOra.getString("cupon"));
                        etkt.setStrFlightdate(rstOra.getString("flightdate"));
                        etkt.setStrFlightnumber(rstOra.getString("flightnumber"));
                        etkt.setStrCityorig(rstOra.getString("cityorig"));
                        etkt.setStrCitydest(rstOra.getString("citydest"));
                        etkt.setStrIndstop(rstOra.getString("indstop"));
                        etkt.setStrCarrier(rstOra.getString("carrier"));
                        etkt.setStrFarebasis(rstOra.getString("farebasis"));
                        etkt.setStrClase(rstOra.getString("class"));
                        etkt.setStrFarecal(rstOra.getString("farecal"));
                        etkt.setStrTipocupon(rstOra.getString("tipocupon"));
                        etkt.setStrTktOriginal(rstOra.getString("boletoorginal"));
                        etkt.setStrLugarEmision(rstOra.getString("lugar_venta"));
                        etkt.setStrLugarEmisionCambio(rstOra.getString("lugarventaorginal"));
                        etkt.setStrPasajero(rstOra.getString("nombre"));
                        etkt.setStrTipoPasajero(rstOra.getString("typepasser"));
                        if (rstOra.getString("cod_error") != null) {
                            etkt.setStrError(rstOra.getString("cod_error").concat(" - ").concat(rstOra.getString("descripcion")));
                        }
                        list.add(etkt);
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (rstIS != null) {
                    rstIS.close();
                }
                if (rstOra != null) {
                    rstOra.close();
                }
                if (stmIS != null) {
                    stmIS.close();
                }
                if (stmOra != null) {
                    stmOra.close();
                }
                if (conIS != null) {
                    poolIS.free(conIS);
                }
                if (conOra != null) {
                    poolOra.free(conOra);
                }
            } catch (Exception ex01) {
                ex01.printStackTrace();
            }
        }
        return list;
    }
    
    public Boolean saveProrateInteractive(ProrateHeader data, String ccust, String calfa) {
        
        boolean flag = false;
        Connection con = null;
        CallableStatement cstmt = null;
        String strBuffer = "";
        
        try{
            con = Proveedor.getConnectionIS();
            DatabaseMetaData dmd = con.getMetaData();
            cstmt = con.prepareCall("{CALL LIBMIATEC".concat(dmd.getCatalogSeparator()).concat("SPCL3050(?)}"));
            cstmt.setString(1, calfa.trim());
            cstmt.execute();
            cstmt.close();
            // ==================================================================================================
            cstmt = con.prepareCall("{CALL LIBMIATEC".concat(dmd.getCatalogSeparator()).concat("SPPRO9500(?)}"));
            strBuffer = data.toString(ccust);            
            cstmt.setString(1, strBuffer);
            cstmt.registerOutParameter(1, Types.CHAR);
            cstmt.execute();
            
            String sBuffer = cstmt.getString(1);
            data.loadData(sBuffer, calfa); 
            flag = true;
            
        }catch(Exception ex01){
            ex01.printStackTrace();
        }finally{
            try {
                if(con!=null) con.close();
                if(cstmt!=null) cstmt.close();
                con = null;
                cstmt = null;
            }catch(Exception ex02){ex02.printStackTrace();}
        }
        
        return new Boolean(flag);
    }
    
    public Vector obtenerLog(String cust, String forma, String serie) {

        Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String fechaActual = Functions.getFechaActual();
        Vector<String> log = new Vector<String>();

        String strSQL = "SELECT * FROM LIBMIATEC.A723 WHERE A723AIRLIN='".concat(cust.trim())
                .concat("' AND A723REGIST='QUSER' AND A723TUSO='IT' AND A723CIA='")
                .concat(cust.trim()).concat("' AND A723FORMA='").concat(forma.trim())
                .concat("' AND A723SERIE='").concat(serie.trim()).concat("' AND A723FREGIS='")
                .concat(fechaActual.trim()).concat("' ")
                .concat(" AND A723HREGIS>=(SELECT MAX(A723HREGIS) FROM LIBMIATEC.A723 WHERE A723AIRLIN='")
                .concat(cust.trim()).concat("' AND A723REGIST='QUSER' AND A723TUSO='IT' AND A723CIA='")
                .concat(cust.trim()).concat("' AND A723FORMA='").concat(forma.trim())
                .concat("' AND A723SERIE='").concat(serie.trim()).concat("' AND A723FREGIS='")
                .concat(fechaActual.trim()).concat("' AND A723CODLOG='000000')");

        try {
            con = Proveedor.getConnectionIS();
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                log.add(rst.getString("A723CODLOG").trim().concat(rst.getString("A723DESLOG")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (con != null) {
                    con.close();
                    con = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return log;
    }
    
    public String obtenerRutaSPA(String ccust, String cia){
        
        Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "", ruta = "";

        strSQL = "SELECT A1155FNAME FROM LIBMIATEC.A1155 WHERE A1155AIRLI = '"
                .concat(ccust.trim()).concat("' AND A1155FNUM = '")
                .concat(cia.trim()).concat("' ");

        //==============================================================================================

        try {
            con = Proveedor.getConnectionIS();
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            
            while (rst.next()) {
                if(rst.getString("A1155FNAME")!=null && !rst.getString("A1155FNAME").trim().equals("")){
                    ruta = rst.getString("A1155FNAME");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (con != null) {
                    con.close();
                    con = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        
        return ruta.trim();
    }
    
}
