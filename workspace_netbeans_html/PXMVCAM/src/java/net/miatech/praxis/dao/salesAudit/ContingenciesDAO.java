/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2252Filter;
import net.miatech.beans.SaleAudit.A2536Filter;
import net.miatech.beans.SaleAudit.SQP00874Filter;
import net.miatech.beans.SaleAudit.SQP00942Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ContingenciesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ContingenciesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ContingenciesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
     public List<A2536Filter> lstsearch(A2536Filter filter) throws SQLException, Exception {
        List<A2536Filter> lstRtn = new ArrayList<>(0);
        A2536Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01441(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FILTER);
            cstmt01.setString(3, filter.VP_RUTAFROM);
            cstmt01.setString(4, filter.VP_RUTATO);
            cstmt01.setString(5, filter.VP_RFNDFROM);
            cstmt01.setString(6, filter.VP_RFNDTO);
            cstmt01.setString(7, filter.VP_FLOWNFROM);
            cstmt01.setString(8, filter.VP_FLOWNTO);
            cstmt01.setString(9, filter.VP_NFLOWFROM);
            cstmt01.setString(10, filter.VP_NFLOWTO);
            cstmt01.setString(11, filter.VP_DATEFROM);
            cstmt01.setString(12, filter.VP_DATETO);


            cstmt01.setInt(13, filter.page.PAGNUM);
            cstmt01.setInt(14, filter.page.PAGROW);
            cstmt01.setInt(15, filter.page.TOTPAG);
            cstmt01.setInt(16, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(13);
            filter.page.PAGROW = cstmt01.getInt(14);
            filter.page.TOTPAG = cstmt01.getInt(15);
            filter.page.TOTROW = cstmt01.getInt(16);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2536Filter();

                objRtn.A2536CCUST = rs01.getString("A2536CCUST");
                objRtn.A2536KEY = rs01.getString("A2536KEY");
                objRtn.A2536STAT = rs01.getString("A2536STAT");
                objRtn.A2536ID = rs01.getString("A2536ID");
                objRtn.A2536FFROM = rs01.getString("A2536FFROM");
                objRtn.A2536FALE = rs01.getString("A2536FALE");
                objRtn.A2536FTO = rs01.getString("A2536FTO");
                objRtn.A2536APPF = rs01.getString("A2536APPF");
                objRtn.A2536APPT = rs01.getString("A2536APPT");
                objRtn.A2536EMIF = rs01.getString("A2536EMIF");
                objRtn.A2536EMIT = rs01.getString("A2536EMIT");
                objRtn.A2536SERV = rs01.getString("A2536SERV");
                objRtn.A2536FLOWD = rs01.getString("A2536FLOWD");
                objRtn.A2536DESC = rs01.getString("A2536DESC");
                objRtn.A2536RUTAF = rs01.getString("A2536RUTAF");
                objRtn.A2536NAMEF = rs01.getString("A2536NAMEF");
                
                objRtn.A2536INGRE = rs01.getString("A2536INGRE");
                objRtn.A2536FINGR = rs01.getString("A2536FINGR");
                objRtn.A2536HINGR = rs01.getString("A2536HINGR");
                objRtn.A2536MODIF = rs01.getString("A2536MODIF");
                objRtn.A2536FMODI = rs01.getString("A2536FMODI");
                objRtn.A2536HMODI = rs01.getString("A2536HMODI");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;


                lstRtn.add(objRtn);
            }
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

    public A2536Filter mantenimientoContingencies(A2536Filter filter) throws SQLException, Exception {


        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01442(?,?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(20, Types.VARCHAR);
            cstmt01.registerOutParameter(21, Types.VARCHAR);


            cstmt01.setString(1, filter.VP_FILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.A2536FFROM);
            cstmt01.setString(4, filter.A2536FTO);
            cstmt01.setString(5, filter.A2536APPF.replaceAll("/", ""));
            cstmt01.setString(6, filter.A2536APPT.replaceAll("/", ""));
            //cstmt01.setString(7, filter.A2536FVOF.replaceAll("/", ""));
           // cstmt01.setString(8, filter.A2536FVOT.replaceAll("/", ""));
            //cstmt01.setString(9, filter.A2536NVOF);
            //cstmt01.setString(10, filter.A2536NVOT);
            
            cstmt01.setString(7, filter.A2536FALE);
            cstmt01.setString(8, filter.A2536FLOWD);
            cstmt01.setString(9, filter.A2536RUTAF);
            cstmt01.setString(10, filter.A2536NAMEF);
            
            cstmt01.setString(11, filter.A2536EMIF.replaceAll("/", ""));
            cstmt01.setString(12, filter.A2536EMIT.replaceAll("/", ""));
            cstmt01.setString(13, filter.A2536SERV);
            cstmt01.setString(14, filter.A2536DESC);
            cstmt01.setString(15, filter.A2536KEY);
            cstmt01.setString(16, filter.A2536ID);
            // 

            cstmt01.setString(17, session.getUserView().getUserInfo().USR);
            cstmt01.setString(18, Functions.getFechaActual());
            cstmt01.setString(19, Functions.getHoraActual());

            cstmt01.execute();
            filter.dbException.SQLCODE = cstmt01.getString(20);
            filter.dbException.MESSAGE = cstmt01.getString(21);
        } finally {
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
        return filter;
    }
}
