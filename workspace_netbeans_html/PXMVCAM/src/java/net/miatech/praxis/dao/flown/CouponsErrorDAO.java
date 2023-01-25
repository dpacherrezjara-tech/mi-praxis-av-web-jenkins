/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CouponsErrorDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CouponsErrorDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CouponsErrorDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadPX091SQP0006(A1692Filter filter, HashMap<String, String> hmPaises, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1692Filter> lstTkts = new ArrayList<>(0);
        A1692Filter beanTkt;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0006(?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.NFLIGHT.trim());
            cstmt.setString(5, filter.PSVVTA.trim());
            cstmt.setString(6, filter.CDEPART.trim());
            cstmt.setString(7, filter.CARRIVA.trim());
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                beanTkt = new A1692Filter();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.CUPON = rst.getString("CUPON").trim();
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                beanTkt.FCONT = rst.getString("FCONT").trim();
                beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.FCONT);
                beanTkt.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanTkt.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanTkt.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                    beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                }
                beanTkt.AGTIA = rst.getString("AGTIA").trim();
                beanTkt.FVTA = rst.getString("FVTA").trim();
                beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                beanTkt.TOPUS = rst.getString("TOPUS").trim();
                beanTkt.CARR = rst.getString("CARR").trim();
                beanTkt.CABI = rst.getString("CABI").trim();
                beanTkt.VCPN = rst.getDouble("VCPN");
                beanTkt.MDACP = rst.getString("MDACP").trim();
                beanTkt.VCPMX = rst.getDouble("VCPMX");
                beanTkt.TCMUS = rst.getDouble("TCMUS");
                beanTkt.VCPUS = rst.getDouble("VCPUS");

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public A1692Filter loadPX095S06A1692(String strTicket, String strSeq, HashMap<String, String> hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {

        A1692Filter beanCons = new A1692Filter();

        CallableStatement cstmt = null;

        int seq = 0;
        String Flag = "", tktpadre = "";

        //PX09500007
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S06A1692(?,?,?,?,?,?)}";//Schema
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, strTicket.substring(0, 3));
            cstmt.setString(3, strTicket.substring(3, 7));
            cstmt.setString(4, strTicket.substring(7, 13));
            cstmt.setString(5, strTicket.substring(13, 14));
            cstmt.setString(6, strSeq);
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {
                seq = rst.getInt("A720NSEQ");
                Flag = rst.getString("A720FLAG");
                tktpadre = rst.getString("A720CIAI") + rst.getString("A720FORMAI") + rst.getString("A720SERIEI");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                if (rst.next()) {
                    beanCons = new A1692Filter();
                    beanCons.monthTo = tktpadre;
                    beanCons.yearTo = Flag;
                    beanCons.CPN_Billed = seq;

                    if (rst.getString("STAT") != null && !rst.getString("STAT").trim().equals("-")) {
                        beanCons.strDescSTVAL = rst.getString("STAT").trim();
                    }
                    beanCons.CCUST = rst.getString("CCUST").trim();
                    beanCons.CCIA = rst.getString("CCIA").trim();
                    beanCons.FORMA = rst.getString("FORMA").trim();
                    beanCons.SERIE = rst.getString("SERIE").trim();
                    beanCons.CUPON = rst.getString("CUPON").trim();
                    beanCons.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + rst.getString("CUPON").trim();
                    beanCons.DCHEQ = rst.getString("DCHEQ").trim();
                    beanCons.SEQ = rst.getString("SEQ").trim();
                    beanCons.STVAL = rst.getString("STVAL").trim();
                    beanCons.FVAL = rst.getString("FVAL").trim();
                    beanCons.STCON = rst.getString("STCON").trim();
                    beanCons.FTE = rst.getString("FTE").trim();
                    beanCons.FLOAD = rst.getString("FLOAD").trim();
                    beanCons.FOPERZUL = rst.getString("FOPERZUL").trim();
                    beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanCons.CDEPART = rst.getString("CDEPART").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                        beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                    }
                    beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                        beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                    }
                    beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanCons.NPLANE = rst.getString("NPLANE").trim();
                    beanCons.ZONA = rst.getString("ZONA").trim();
                    //beanCons.STORG = rst.getString("STORG").trim();
                    beanCons.CDOC = rst.getString("CDOC").trim();
                    beanCons.TDOC = rst.getString("TDOC").trim();
                    beanCons.PSVVTA = rst.getString("PSVVTA").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanCons.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    beanCons.AGTIA = rst.getString("AGTIA").trim();
                    beanCons.FVTA = rst.getString("FVTA").trim();
                    beanCons.TVTA = rst.getString("TVTA").trim();
                    beanCons.TPAX = rst.getString("TPAX").trim();
                    if (rst.getString("TOPER") != null && !rst.getString("TOPER").trim().equals("")) {
                        beanCons.TOPUS = rst.getString("TOPER").trim();
                    } else {
                        beanCons.TOPUS = rst.getString("TOPUS").trim();
                    }
                    beanCons.CARR = rst.getString("CARR").trim();
                    beanCons.CABI = rst.getString("CABI").trim();
                    beanCons.CLAS = rst.getString("CLAS").trim();
                    beanCons.FBASE = rst.getString("FBASE").trim();
                    beanCons.CFF = rst.getString("CFF").trim();
                    beanCons.VCPN = rst.getDouble("VCPN");
                    beanCons.COMISI = rst.getDouble("COMISI");
                    beanCons.VTAX = rst.getDouble("VTAX");
                    beanCons.MDACP = rst.getString("MDACP").trim();
                    beanCons.VCPMX = rst.getDouble("VCPMX");
                    beanCons.TCMUS = rst.getDouble("TCMUS");
                    beanCons.VCPUS = rst.getDouble("VCPUS");
                    beanCons.QTYPAX = rst.getInt("QTYPAX");
                    beanCons.FCONT = rst.getString("FCONT").trim();
                    beanCons.IDCON = rst.getString("IDCON").trim();
                    beanCons.USCR = rst.getString("USCR").trim();
                    beanCons.FECR = rst.getString("FECR").trim();
                    beanCons.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                    beanCons.USUP = rst.getString("USUP").trim();
                    beanCons.FEUP = rst.getString("FEUP").trim();
                    beanCons.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());
                    //Deshabiltado a Raíz del cambio del A720 A PRAXIS.
                    if (rst.getString("A1711SOURC") != null && !rst.getString("A1711SOURC").trim().equals("-")) {
                        beanCons.strFuente = rst.getString("A1711SOURC").trim();
                        beanCons.FTE = rst.getString("A1711SOURC").trim();
                    }
                    beanCons.FECVAL = rst.getString("FECVAL");
                    beanCons.FINVO = rst.getString("FINVO").trim();
                    //beanCons.strFuente = rst.getString("FTE").trim();
                }
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return beanCons;
    }
    
    
     public String loadPX095S08VALID(UserView user, A1692Filter filter, String flag) throws SQLException, Exception {

       
        String strSQL;
        String msj = "";
        
        try {
            //PX09500005
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04358(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(11, Types.VARCHAR);
            cs.registerOutParameter(12, Types.VARCHAR);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.CDEPART.trim());
            cs.setString(3, filter.CARRIVA.trim());
            cs.setString(4, filter.NFLIGHT.trim());
            cs.setString(5, filter.DFLIGHT.trim());
            cs.setString(6, filter.PSVVTA.trim());
            cs.setString(7, filter.AGTIA.trim());
            cs.setString(8, filter.CARR.trim());
            cs.setString(9, filter.STVAL.trim());
            cs.setString(10, flag.trim());
            cs.setString(11, "");//INOUT   IO_NCARR     VARCHAR(2),   -- CARRIER A1691
            cs.setString(12, "");//INOUT   IO_ZONE      VARCHAR(3),   -- ZONA
            cs.setString(13, "");//INOUT   IO_TOPER     VARCHAR(1),   -- TIPO DE OPERACIÓN
            cs.setString(14, "");//INOUT   IO_MSJ       VARCHAR(100), -- MENSAJE DE SALIDA
            cs.setString(15, "");//INOUT   IO_NPLANE    VARCHAR(10)   -- AVION
            cs.execute();

            //Obteniendo el Carrier correcto ===================================
            if (cs.getString(11) != null) {
                filter.IN_CARR = cs.getString(11).trim();
            }
            //Obteniendo la zona resultante ====================================
            if (cs.getString(12) != null) {
                filter.ZONA = cs.getString(12).trim();
            }
            //Obteniendo el Tipo de Operacion ==================================
            if (cs.getString(13) != null) {
                filter.TOPER = cs.getString(13).trim();
                filter.TVTA = cs.getString(13).trim();
                filter.TOPUS = cs.getString(13).trim();
            }
            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(14) != null) {
                msj = cs.getString(14).trim();
            }
            //Obteniendo el nplane correcto ===================================
            if (cs.getString(15) != null) {
                filter.NPLANE = cs.getString(15).trim();
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }
}
