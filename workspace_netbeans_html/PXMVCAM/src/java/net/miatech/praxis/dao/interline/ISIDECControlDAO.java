package net.miatech.praxis.dao.interline;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author gsanchez
 */
public class ISIDECControlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ISIDECControlDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ISIDECControlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<SFI010Filter> loadPX195S01SFI010_3(SFI010Filter filter) throws SQLException, Exception {
        List<SFI010Filter> lstRtn = new ArrayList<SFI010Filter>(0);
        SFI010Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, totTOHCOM = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX195S01SFI010_3_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);
            cstmt01.setString(8, filter.BNUMBER);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += (rs01.getInt("TGROSS") * -1);
                } else {
                    totTGROSS += (rs01.getInt("TGROSS"));
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISC") * -1);
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAX") * -1);
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("HFEEAM") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATP") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNET") * -1);
                } else {
                    totTNET += rs01.getDouble("TNET");
                }
                if (rs01.getString("TVATSG").trim().equals("M")) {
                    totTVAT += (rs01.getDouble("TVAT") * -1);
                } else {
                    totTVAT += rs01.getDouble("TVAT");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTOHCOM += (rs01.getDouble("TOHCOM") * -1);
                } else {
                    totTOHCOM += rs01.getDouble("TOHCOM");
                }

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI010Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.BDAIR = rs01.getString("BDAIR");
                    objRtn.BCODE = rs01.getInt("BCODE");
                    objRtn.BNUMBER = rs01.getString("BNUMBER").trim();
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.BCURREN = rs01.getString("BCURREN");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.SETMETH = rs01.getString("SETMETH");
                    objRtn.DES_BAIR = rs01.getString("DES_BAIR");
                    objRtn.DES_BDAIR = rs01.getString("DES_BDAIR");
                    objRtn.IDATE = rs01.getString("IDATE").trim();
                    objRtn.strFormatDate2 = Functions.getMonthConvert3(objRtn.IDATE).trim();
                    objRtn.STPM = rs01.getString("STPM").trim();
                    objRtn.STRM = rs01.getString("STRM").trim();
                    objRtn.STBM = rs01.getString("STBM").trim();
                    objRtn.STCM = rs01.getString("STCM").trim();
                    objRtn.STCONS = rs01.getString("STCONS").trim();
                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.TNET = (rs01.getDouble("TNET"));
                    objRtn.TVAT = (rs01.getDouble("TVAT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.totTOHCOM = totTOHCOM;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<SFI010Filter> loadPX195S01SFI010_2(SFI010Filter filter) throws SQLException, Exception {
        List<SFI010Filter> lstRtn = new ArrayList<SFI010Filter>(0);
        SFI010Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, totTOHCOM = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX195S01SFI010_4_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BAIR);
            cstmt01.setString(8, filter.BNUMBER);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += (rs01.getInt("TGROSSR"));
                totTISC += rs01.getDouble("TISCR");
                totTTAX += rs01.getDouble("TTAXR");
                totHFEEAM += rs01.getDouble("HFEEAMR");
                totTUATP += rs01.getDouble("TUATPR");
                totTNET += rs01.getDouble("TNETR");
                totTVAT += rs01.getDouble("TVATR");
                totTOHCOM += rs01.getDouble("TOHCOMR");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI010Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.BDAIR = rs01.getString("BDAIR");
                    objRtn.BCODE = rs01.getInt("BCODE");
                    objRtn.BNUMBER = rs01.getString("BNUMBER").trim();
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.BCURREN = rs01.getString("BCURREN");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.SETMETH = rs01.getString("SETMETH");
                    objRtn.DES_BAIR = rs01.getString("DES_BAIR");
                    objRtn.DES_BDAIR = rs01.getString("DES_BDAIR");
                    objRtn.IDATE = rs01.getString("IDATE").trim();
                    objRtn.strFormatDate2 = Functions.getMonthConvert3(objRtn.IDATE).trim();
                    objRtn.STPM = rs01.getString("STPM").trim();
                    objRtn.STRM = rs01.getString("STRM").trim();
                    objRtn.STBM = rs01.getString("STBM").trim();
                    objRtn.STCM = rs01.getString("STCM").trim();
                    objRtn.STCONS = rs01.getString("STCONS").trim();
                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.TNET = (rs01.getDouble("TNET"));
                    objRtn.TVAT = (rs01.getDouble("TVAT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.totTOHCOM = totTOHCOM;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
//
//    public List<SFI010Filter> loadPX446SQC035(SFI010Filter filter) throws SQLException, Exception {
//
//        List<SFI010Filter> lstTkts = new ArrayList<>(0);
//        SFI010Filter beanTkt;
//
//        double TWEIG = 0.0;
//        double TOTHER = 0.0;
//        double ISCCH = 0.0;
//        double TNET = 0.0;
//        double TNETB = 0.0;
//        double TVALCH = 0.0;
//        double TVAT = 0.0;
//        double TNETSVAT = 0.0;
//
//        CallableStatement cstmt = null;
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQC035(?,?,?,?,?,?,?,?,?,?)}";
//
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//
//            cstmt.registerOutParameter(7, Types.INTEGER);
//            cstmt.registerOutParameter(8, Types.INTEGER);
//            cstmt.registerOutParameter(9, Types.INTEGER);
//            cstmt.registerOutParameter(10, Types.INTEGER);
//
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(2, filter.IN_DATEFROM);
//            cstmt.setString(3, filter.IN_DATETO);
//            cstmt.setString(4, filter.IN_PERIOD);
//            cstmt.setString(5, filter.IN_AIRLINE);
//            cstmt.setString(6, filter.IN_TTRANS);
//
//            cstmt.setInt(7, filter.page.PAGNUM);
//            cstmt.setInt(8, filter.page.PAGROW);
//            cstmt.setInt(9, filter.page.TOTPAG);
//            cstmt.setInt(10, filter.page.TOTROW);
//            cstmt.execute();
//
//            filter.page.PAGNUM = cstmt.getInt(7);
//            filter.page.PAGROW = cstmt.getInt(8);
//            filter.page.TOTPAG = cstmt.getInt(9);
//            filter.page.TOTROW = cstmt.getInt(10);
//
//            rst = cstmt.getResultSet();
//
//            while (rst.next()) {
//                TWEIG += rst.getDouble("TWEIG");
//                TOTHER += rst.getDouble("TOTHER");
//                ISCCH += rst.getDouble("ISCCH");
//                TNET += rst.getDouble("TNET");
//                TNETB += rst.getDouble("TNETB");
//                TVALCH += rst.getDouble("TVALCH");
//                TVAT += rst.getDouble("TVAT");
//                TNETSVAT += rst.getDouble("TNETSVAT");
//            }
//
//            rst.close();
//
//            if (cstmt.getMoreResults()) {
//                rst = cstmt.getResultSet();
//
//                while (rst.next()) {
//
//                    beanTkt = new SFI010Filter();
//                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
//                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
//                    beanTkt.IN_PERIOD = filter.IN_PERIOD.trim();
//                    beanTkt.IN_AIRLINE = filter.IN_AIRLINE.trim();
//                    beanTkt.IN_TTRANS = filter.IN_TTRANS.trim();
//
//                    beanTkt.RN = rst.getString("RN").trim();
//                    beanTkt.CCUST = rst.getString("CCUST").trim();
//                    beanTkt.TTRAN = rst.getString("TTRAN").trim();
//                    beanTkt.NAID = rst.getString("NAID").trim();
//                    beanTkt.STPM = rst.getString("STPM").trim();
//                    beanTkt.STRM = rst.getString("STRM").trim();
//                    beanTkt.STBM = rst.getString("STBM").trim();
//                    beanTkt.STCM = rst.getString("STCM").trim();
//                    beanTkt.STCONS = rst.getString("STCONS").trim();
//                    beanTkt.SMI = rst.getString("SMI").trim();
//                    beanTkt.RSN = rst.getString("RSN").trim();
//                    beanTkt.SFI = rst.getString("SFI").trim(); 
//                    beanTkt.BAIR = rst.getString("BAIR").trim();
//                    beanTkt.BDAIR = rst.getString("BDAIR").trim();
//                    beanTkt.strBAIR = rst.getString("strBAIR").trim();
//                    beanTkt.strBDAIR = rst.getString("strBDAIR").trim();
//                    beanTkt.BCODE = rst.getString("BCODE").trim();
//                    beanTkt.BDATE = rst.getString("BDATE").trim();
//                    beanTkt.IDATE = rst.getString("IDATE").trim();
//                    beanTkt.strFormatDate = Functions.getMonthConvert7(rst.getString("BDATE").trim());//YYMM
//                    beanTkt.strFormatIDate = Functions.getMonthConvert3(rst.getString("IDATE").trim());//YYMMDD
//                    beanTkt.PERNUM = rst.getString("PERNUM").trim();
//                    beanTkt.BNUMBER = rst.getString("BNUMBER").trim();
//                    beanTkt.LCURREN = rst.getString("LCURREN").trim();
//                    beanTkt.BCURREN = rst.getString("BCURREN").trim();
//                    beanTkt.ACURREN = rst.getString("ACURREN").trim();
//                    beanTkt.KGLBID = rst.getString("KGLBID").trim();
//                    beanTkt.RATE = rst.getString("RATE").trim();
//                    beanTkt.CCURRENID = rst.getString("CCURRENID").trim();
//                    beanTkt.LBRATE = rst.getString("LBRATE").trim();
//                    beanTkt.SINVFLAG = rst.getString("SINVFLAG").trim();
//                    beanTkt.BAIRLOC1 = rst.getString("BAIRLOC1").trim();
//                    beanTkt.BAIRLOC2 = rst.getString("BAIRLOC2").trim();
//                    beanTkt.BTYPE = rst.getString("BTYPE").trim();
//
//                    beanTkt.TWEIG = rst.getDouble("TWEIG");
//                    beanTkt.TOTHER = rst.getDouble("TOTHER");
//                    beanTkt.ISCCH = rst.getDouble("ISCCH");
//                    beanTkt.TNET = rst.getDouble("TNET");
//                    beanTkt.TNETB = rst.getDouble("TNETB");
//                    beanTkt.TVALCH = rst.getDouble("TVALCH");
//                    beanTkt.TVAT = rst.getDouble("TVAT");
//                    beanTkt.TNETSVAT = rst.getDouble("TNETSVAT");
//
//                    beanTkt.totTWEIG = TWEIG;
//                    beanTkt.totTOTHER = TOTHER;
//                    beanTkt.totISCCH = ISCCH;
//                    beanTkt.totTNET = TNET;
//                    beanTkt.totTNETB = TNETB;
//                    beanTkt.totTVALCH = TVALCH;
//                    beanTkt.totTVAT = TVAT;
//                    beanTkt.totTNETSVAT = TNETSVAT;
//
//                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
//                    beanTkt.page.PAGROW = filter.page.PAGROW;
//                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
//                    beanTkt.page.TOTROW = filter.page.TOTROW;
//
//                    lstTkts.add(beanTkt);
//                }
//                rst.close();
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (rst != null) {
//                try {
//                    rst.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return lstTkts;
//    }

}
