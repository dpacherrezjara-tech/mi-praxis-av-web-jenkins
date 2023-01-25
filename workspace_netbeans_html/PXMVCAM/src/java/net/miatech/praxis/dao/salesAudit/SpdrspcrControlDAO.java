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
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A3540Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class SpdrspcrControlDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3540Filter> Search(A3540Filter filter) throws SQLException, Exception {
        List<A3540Filter> lstRtn = new ArrayList<A3540Filter>(0);
        A3540Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02917(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_COUNTRY);
            cstmt01.setString(7, filter.IN_ROBOT);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3540Filter();
                objRtn.A3540CCUST = rs01.getString("A3540CCUST");
                objRtn.A3540PAIS = rs01.getString("A3540PAIS");
                objRtn.A3540CANT = rs01.getInt("A3540CANT");
                objRtn.A3540FLAG = rs01.getString("A3540FLAG");
                objRtn.A3540REGIS = rs01.getString("A3540REGIS");
                objRtn.A3540FREGI = rs01.getString("A3540FREGI");
                objRtn.A3540HREGI = rs01.getString("A3540HREGI");
                objRtn.A3540TYPE = rs01.getString("A3540TYPE");
                objRtn.A3540STATO = rs01.getString("A3540FINA");
                objRtn.A3540TOTALPAG = rs01.getString("A3540TOTALPAG");

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

    public List<A3540Filter> SearchDetail(A3540Filter filter) throws SQLException, Exception {
        List<A3540Filter> lstRtn = new ArrayList<A3540Filter>(0);
        A3540Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02917(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_STATUS);
            cstmt01.setString(6, filter.IN_COUNTRY);
            cstmt01.setString(7, filter.IN_ROBOT);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3540Filter();
                objRtn.A3540CCUST = rs01.getString("A3540CCUST");
                objRtn.A3540TYPE = rs01.getString("A3540TYPE");
                objRtn.A3540PAIS = rs01.getString("A3540PAIS");
                objRtn.A3540FMEMO = rs01.getString("A3540FMEMO");
                //objRtn.A3268TYPE = rs01.getString("A3090TYPE"); 
                objRtn.A3540REASO = rs01.getString("A3540REASO");
                objRtn.A3540NMEMO = rs01.getString("A3540NMEMO");

                objRtn.A3540STATU = rs01.getString("A3540STATU");
                objRtn.A3540FTE = rs01.getString("A3540FTE");
                objRtn.A3540RMEMO = rs01.getString("A3540RMEMO");
                objRtn.A3540FTKT = rs01.getString("A3540FTKT");
                objRtn.A3540CIA = rs01.getString("A3540CIA");
                objRtn.A3540CANT = rs01.getInt("A3540CANT");
                objRtn.A3540IATA = rs01.getString("A3540IATA");
                objRtn.A3540CUR = rs01.getString("A3540CUR");
                objRtn.A3540NETO = rs01.getDouble("A3540NETO");

                objRtn.A3540DESCR = rs01.getString("A3540DESCR");
                objRtn.A3540FREGI = rs01.getString("A3540FREGI");
                objRtn.A3540PERIO = rs01.getString("A3540PERIO");
                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
