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
import net.miatech.beans.A1692Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class FlightManifestVCRDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FlightManifestVCRDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FlightManifestVCRDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadPX233S01A1691(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<>(0);
        A1692Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        int QTYPAX = 0, VCPN = 0, QTYMANI = 0;

       

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX233S01A1691(?,?,?,?,?,?,?,?,?)}";
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_NFLIGHT);
            cstmt01.setString(5, filter.IN_FVAL);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                VCPN = rs01.getInt("QCPNVC");
                QTYPAX = rs01.getInt("QCPNFI");
                QTYMANI = rs01.getInt("QTY");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.IN_STVAL = filter.IN_STVAL;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.VCPN = rs01.getInt("QCPNVC");//CPN VCR
                    objRtn.QTYPAX = rs01.getInt("QCPNFI");//CPN Physical Flight Manifest
                    objRtn.pos = rs01.getInt("QTY");//QTY Physical Flight Manifest
                    objRtn.difVakues = objRtn.VCPN - objRtn.QTYPAX;

                    objRtn.totCPN_Proc = QTYMANI;
                    objRtn.totTAX = QTYPAX;
                    objRtn.totVCPMX = VCPN;
                    objRtn.totNETO = objRtn.totVCPMX - objRtn.totTAX;

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
    
    public List<A1692Filter> loadPX233S02A1892(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<>(0);
        A1692Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        
    

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX233S02A1892(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.NFLIGHT);
            cstmt01.setString(4, filter.IN_STVAL);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1692Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.CDEPART = rs01.getString("CDEPART");
                objRtn.strDescCDEPART = rs01.getString("DES_ORIG");
                objRtn.strTicket = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE;
                objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                objRtn.STVAL = rs01.getString("STVAL");
                objRtn.strDescripcion = rs01.getString("STVAL_DES");
                objRtn.USCR = session.getUserView().getUserInfo().USR;
                objRtn.RFIC = rs01.getString("RUTA");
                objRtn.QTYPAX = filter.QTYPAX;

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
