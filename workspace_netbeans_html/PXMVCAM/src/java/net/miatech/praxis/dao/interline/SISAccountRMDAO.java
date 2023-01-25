/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.dao.interline;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.interline.ISIDECControlDAO.pasarGarbageCollector;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jtorres
 */
public class SISAccountRMDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<SFI021Filter> loadPX280SQP00773(SFI021Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<SFI021Filter>(0);
        SFI021Filter objRtn;

        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTOTHCD = 0, totTNET = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00773(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.PERNUM);
            cstmt01.setString(6, filter.BDAIR);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTNET += rs01.getDouble("TNETRR");
                totTGROSSD += rs01.getDouble("TGROSSDR");
                totTISCD += rs01.getDouble("TISCDR");
                totTTAXD += rs01.getDouble("TTAXDR");
                totHFEEAMD += rs01.getDouble("THDFDR");
                totTUATPD += rs01.getDouble("TUATPDR");
                totTOTHCD += rs01.getDouble("TOTHCDR");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.DES_BAIR = "USD";
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.RMS = rs01.getInt("RMS");
                    objRtn.QRM = rs01.getInt("QRM");
                    objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSD"));
                    objRtn.TISCD = (rs01.getDouble("TISCD"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXD"));
                    objRtn.THDFD = (rs01.getDouble("THDFD"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPD"));
                    objRtn.TOTHCD = (rs01.getDouble("TOTHCD"));

                    objRtn.totTNET = totTNET;
                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.totTOTHCD = totTOTHCD;


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
            setClose();
        }

        return lstRtn;
    }
    
    
    
    
    
}
