/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.dao;

import org.apache.log4j.Logger;

import net.miatech.provider.Proveedor;
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
import net.miatech.beans.PRO9629;
import net.miatech.beans.ProrateSector;
import net.miatech.beans.lists.ProrateSectorList;
import net.miatech.utils.Functions;




/**
 *
 * @author claudia
 */
public class DAOProrateNew {


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

    public PRO9629 loadProrate(String nroPrt, String ticket, String ccust) {
        
        PRO9629 data = new PRO9629();
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
            
             //OBTENIENDO DATA DEL A728 ==================================================================
            strSQL = "SELECT * FROM LIBMIATEC.A728 WHERE A728AIRLIN = '"
                    .concat(ccust.trim()).concat("' ");
             
            if(!nroPrt.trim().equals("")){
                strSQL = strSQL.concat(" AND A728NROPRT = '").concat(nroPrt).concat("'");
            }
            
            con = Proveedor.getConnectionIS();
            stm = con.createStatement();
            rst = stm.executeQuery(strSQL);
            
            while(rst.next()) {
                // <editor-fold defaultstate="collapsed" desc="Obteniendo Data del A728.">
                sector = new ProrateSector();
                
                if(intQty == 0) {
                    
                    sectorINI = new ProrateSector();
                    data.setStrCCUST(ccust);
                    data.setStrA728NROPRT(nroPrt);
                    data.setStrA728CIA(rst.getString("A728CIA"));
                    data.setStrA728NRODOC(rst.getString("A728NRODOC"));
                    data.setStrA728CUPON(rst.getString("A728CUPON"));
                    data.setStrA728FECFAC(rst.getString("A728FECFAC"));
                    data.setStrA728FECVTA(rst.getString("A728FECVTA"));
                    data.setStrA728AIRFAC(rst.getString("A728AIRFAC"));
                    data.setStrA728CTYVTA(rst.getString("A728CTYVTA"));
                    data.setStrA728CTYEMI(rst.getString("A728CTYEMI"));
                    data.setStrA728GRUPO(rst.getString("A728GRUPO"));
                    data.setStrA728COUVTA(rst.getString("A728COUVTA"));
                    data.setStrA728COUEMI(rst.getString("A728COUEMI"));
                    data.setStrA728AJTRAM(rst.getString("A728AJTRAM"));
                    data.setStrA728SECOR(rst.getString("A728SECOR"));
                    data.setStrA728SECDS(rst.getString("A728SECDS"));
                    try {
                        data.setDblA728ATBP(rst.getDouble("A728ATBP"));
                    }catch(Exception e){
                        data.setDblA728ATBP(0);
                    }
                    data.setStrA728MDAATB(rst.getString("A728MDAATB"));
                    data.setStrA728CODTAX(rst.getString("A728CODTAX"));
                    data.setStrA728TDESC(rst.getString("A728TDESC"));
                    try {
                        data.setDblA728PORDES(rst.getDouble("A728PORDES"));
                    }catch(Exception e){
                        data.setDblA728PORDES(0);
                    }
                    data.setStrA728CODIT(rst.getString("A728CODIT"));
                    data.setDblA728CSOVER(rst.getDouble("A728CSOVER"));
                    data.setStrA728QSOVER(rst.getString("A728QSOVER"));
                    data.setStrA728IPLUS(rst.getString("A728IPLUS"));
                    data.setDblA728CPLUSS(rst.getInt("A728CPLUSS"));
                    data.setDblA728TAJUST(rst.getDouble("A728TAJUST"));
                    data.setStrA728RUTORG(rst.getString("A728RUTORG"));
                    data.setStrA728MONSYS(rst.getString("A728MONSYS"));
                    data.setStrA728LOHO(rst.getString("A728LOHO"));
                    data.setDblA728TARIFA(rst.getDouble("A728TARIFA"));
                    data.setStrA728MONEDA(rst.getString("A728MONEDA"));
                    data.setDblA728TRFPAG(rst.getDouble("A728TRFPAG"));
                    data.setStrA728MDAPAG(rst.getString("A728MDAPAG"));
                    data.setDblA728ROE(rst.getDouble("A728ROE"));
                    sectorINI.setStrOD(rst.getString("A728RUTAO").trim());
                    sectorINI.setStrA728RERUT(rst.getString("A728RERUT").trim());
                    sectorINI.setStrEsSector("");
                    //==========================================================
                    //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MODIFICADOS EN EL FORMULARIO
                    data.setStrA728SEQPRT(rst.getString("A728SEQPRT"));
                    data.setStrA728TUSO(rst.getString("A728TUSO"));
                    data.setStrA728DCHEQ(rst.getString("A728DCHEQ"));
                    data.setStrA728TVENTA(rst.getString("A728TVENTA"));
                    data.setDblA728TCAREG(rst.getDouble("A728TCAREG"));
                    data.setStrA728MONREG(rst.getString("A728MONREG"));
                    data.setDblA728TCASYS(rst.getDouble("A728TCASYS"));
                    data.setDblA728TCAPAG(rst.getDouble("A728TCAPAG"));
                    data.setStrA728INDSAM(rst.getString("A728INDSAM"));
                    data.setStrA728INDPRT(rst.getString("A728INDPRT"));
                    data.setStrA728SELEC(rst.getString("A728SELEC"));
                    data.setBooValidarTiempoLimite(true);
                    //==========================================================
                    list.add(sectorINI);
                }
                
                if(rst.getString("A728SECOR").trim().equals(rst.getString("A728RUTAO").trim()) &&
                        rst.getString("A728SECDS").trim().equals(rst.getString("A728RUTAD").trim())) {
                    data.setStrA728FVLO1(rst.getString("A728FVLO1"));
                    data.setStrA728FBASE1(rst.getString("A728FBASE1"));
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
            data.setLstSECTORS(list);
            //=============================================================================================
            // Obteniendo la Informacion Adicional ========================================================
            strSQL = "SELECT * FROM LIBMIATEC.A1292 WHERE CCUST = '"
                    .concat(ccust.trim()).concat("' AND NROPRT = '")
                    .concat(nroPrt).concat("'");
            
            rst = stm.executeQuery(strSQL);
            String addInfo="";
            if(rst.next()) {
                for(int i=1;i<16;i++){
                    addInfo += rst.getString("LINE" + i);
                }
            }
            data.setStrAdditionalInfo(addInfo);
            try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            //=============================================================================================
            //=============================================================================================
            strSQL = "SELECT A005KEY2, A005KEY3, A005KEY1, A005CHS FROM "
                    .concat(calfa.trim()).concat("D.A005 WHERE A005KEY = '")
                    .concat(data.getStrA728AIRFAC()).concat("' ");
            
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
    
    public Boolean saveProrateInteractive(PRO9629 data, String ccust, String calfa) {
        
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
            cstmt = con.prepareCall("{CALL LIBMIATEC".concat(dmd.getCatalogSeparator()).concat("SPPRO9629(?)}"));
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
    
}
