/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2293Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class NoBankInformationReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public NoBankInformationReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public NoBankInformationReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    
    public List<A2293Filter> loadPX311SQP00958(A2293Filter filter) throws SQLException, Exception {

        List<A2293Filter> lstTkts = new ArrayList<A2293Filter>(0);
        A2293Filter beanTkt;

        long lngTotTOTSET = 0, lngTotTOTBNK = 0, lngTotQMATCH = 0, lngTotQSTWPY = 0, lngTotQPYWST = 0;
        long lngTotQACCEP = 0, lngTotQREJEC = 0, lngTotQSUSPE = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.strYearFrom = Functions.fillZeros(4, filter.strYearFrom).replace("00", "");//YYYY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(4, filter.strYearTo).replace("00", "");//YYYY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");
        //</editor-fold>

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00958(?,?,?,?,?,?,?,?,?)}";
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00958_GG(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strYearFrom + filter.strMonthFrom);
            cstmt.setString(3, filter.strYearTo + filter.strMonthTo);
            cstmt.setString(4, filter.IN_TDOC.trim());
            cstmt.setString(5, filter.IN_FNOBANK);

            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                lngTotQMATCH += rst.getLong("QMATCH");
                lngTotQSTWPY += rst.getLong("QSTWPY");
                lngTotQPYWST += rst.getLong("QPYWST");
                lngTotQACCEP += rst.getLong("QACCEP");
                lngTotQREJEC += rst.getLong("QREJEC");
                lngTotQSUSPE += rst.getLong("QSUSPE");
                lngTotTOTSET = lngTotQMATCH + lngTotQSTWPY + lngTotQPYWST;
                lngTotTOTBNK = lngTotQACCEP + lngTotQREJEC + lngTotQSUSPE;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A2293Filter();
                    beanTkt.strYearFrom = filter.strYearFrom.trim();
                    beanTkt.strMonthFrom = filter.strMonthFrom.trim();
                    beanTkt.strYearTo = filter.strYearTo.trim();
                    beanTkt.strMonthTo = filter.strMonthTo.trim();
                    beanTkt.IN_TDOC = filter.IN_TDOC.trim();
                    beanTkt.IN_FNOBANK = filter.IN_FNOBANK.trim();
                    beanTkt.SDATE = rst.getString("DATE").trim();
                    beanTkt.strFormatDate = Functions.getMonthConvert(rst.getString("DATE").trim());

                    beanTkt.lngQMATCH = rst.getLong("QMATCH");
                    beanTkt.dblSVFOPM = rst.getDouble("SVFOPM");
                    beanTkt.lngQSTWPY = rst.getLong("QSTWPY");
                    beanTkt.dblASTWPY = rst.getDouble("ASTWPY");
                    beanTkt.lngQPYWST = rst.getLong("QPYWST");
                    beanTkt.dblAPYWST = rst.getDouble("APYWST");
                    beanTkt.lngQACCEP = rst.getLong("QACCEP");
                    beanTkt.dblAACCEP = rst.getDouble("AACCEP");
                    beanTkt.lngQREJEC = rst.getLong("QREJEC");
                    beanTkt.dblAREJEC = rst.getDouble("AREJEC");
                    beanTkt.lngQSUSPE = rst.getLong("QSUSPE");
                    beanTkt.dblASUSPE = rst.getDouble("ASUSPE");

                    beanTkt.lngTotQMATCH = lngTotQMATCH;
                    beanTkt.lngTotQSTWPY = lngTotQSTWPY;
                    beanTkt.lngTotQPYWST = lngTotQPYWST;
                    beanTkt.lngTotQACCEP = lngTotQACCEP;
                    beanTkt.lngTotQREJEC = lngTotQREJEC;
                    beanTkt.lngTotQSUSPE = lngTotQSUSPE;
                    beanTkt.lngTotTOTSET = lngTotTOTSET;
                    beanTkt.lngTotTOTBNK = lngTotTOTBNK;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }
    
    
}
