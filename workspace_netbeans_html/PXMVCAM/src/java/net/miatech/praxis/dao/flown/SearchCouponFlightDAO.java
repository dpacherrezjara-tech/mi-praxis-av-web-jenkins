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
import java.util.List;
import java.util.logging.Level;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1952Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class SearchCouponFlightDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SearchCouponFlightDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SearchCouponFlightDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadPX080S01A1692(A1692Filter filter) throws SQLException, Exception {
        List<A1692Filter> lstRtn = new ArrayList<>(0);
        A1692Filter objRtn;
        String tkt = Functions.fillString(filter.IN_TKT, 13);
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX080S01A1692(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, Functions.getFechaActual());
            cstmt01.setString(5, tkt.substring(0, 3).trim());//CIA
            cstmt01.setString(6, tkt.substring(3, 7).trim());//FORMA
            cstmt01.setString(7, tkt.substring(7, 13).trim());//SERIE
            cstmt01.setString(8, filter.IN_STVAL);
            cstmt01.setString(9, filter.IN_CARR);
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1692Filter();
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.strTicket = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                objRtn.FCONT = rs01.getString("FCONT");
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);
                objRtn.CDEPART = rs01.getString("CDEPART");
                objRtn.CARRIVA = rs01.getString("CARRIVA");
                objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                objRtn.LEGSEQ = rs01.getString("LEGSEQ");
                objRtn.TDOC = rs01.getString("TDOC");
                objRtn.PSVVTA = rs01.getString("PSVVTA");
                objRtn.AGTIA = rs01.getString("AGTIA");
                objRtn.FVTA = rs01.getString("FVTA");
                objRtn.strFormatFVTA = Functions.getMonthConvert(objRtn.FVTA);
                objRtn.TOPUS = rs01.getString("TOPUS");
                objRtn.CARR = rs01.getString("CARR");
                objRtn.CABI = rs01.getString("CABI");
                objRtn.VCPN = rs01.getDouble("VCPN");
                objRtn.MDACP = rs01.getString("MDACP");
                objRtn.VCPMX = rs01.getDouble("VCPMX");
                objRtn.TCMUS = rs01.getDouble("TCMUS");
                objRtn.VCPUS = rs01.getDouble("VCPUS");
                objRtn.COMISI = rs01.getDouble("COMISI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
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
}
