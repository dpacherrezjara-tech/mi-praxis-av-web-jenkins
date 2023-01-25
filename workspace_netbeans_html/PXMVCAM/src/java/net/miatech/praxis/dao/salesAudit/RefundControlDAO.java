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
import net.miatech.beans.SaleAudit.A3388Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RefundControlDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3388Filter> searchRefundControl(A3388Filter filter) throws SQLException, Exception {
        List<A3388Filter> lstRtn = new ArrayList<A3388Filter>(0);
        A3388Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02500(?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(8, filter.IN_USER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3388Filter();

                if (filter.IN_ROBOT.equals("1") || filter.IN_ROBOT.equals("2")) {
                    objRtn.A3388CCUST = rs01.getString("A3388CCUST");
                    objRtn.A3388PAIS = rs01.getString("A3388PAIS");
                    objRtn.A3388CANTI = rs01.getInt("A3388CANTI");
                    objRtn.A3388COUNT = rs01.getInt("A3388COUNT");
                    objRtn.A3388FLAG = rs01.getString("A3388FLAG");
                    objRtn.A3388REGIS = rs01.getString("A3388REGIS");
                    objRtn.A3388FREGI = rs01.getString("A3388FREGI");
                    objRtn.A3388ROBOT = rs01.getString("A3388ROBOT");
                    objRtn.A3388FINA = rs01.getString("A3388FINA");
                    objRtn.A3388TOTALPAG = rs01.getString("A3388TOTALPAG");
                    objRtn.A3388CHANEL = rs01.getString("A3388CHANEL");
                } else {
                    objRtn.A3388CCUST = rs01.getString("A3388CCUST");
                    objRtn.A3388PAIS = rs01.getString("A3388PAIS");
                    objRtn.A3388NUMER = rs01.getString("A3388NUMER");
                    objRtn.A3388TKT = rs01.getString("A3388TKT");
                    objRtn.A3388STATU = rs01.getString("A3388STATU");
                    objRtn.A3388IATA = rs01.getString("A3388IATA");
                    objRtn.A3388FAPPI = rs01.getString("A3388FAPPI");

                    objRtn.A3388MDA = rs01.getString("A3388MDA");
                    objRtn.A3388TTARJ = rs01.getString("A3388TTARJ");
                    objRtn.A3388TARIF = rs01.getDouble("A3388TARIF");
                    objRtn.A3388CANTI = rs01.getInt("A3388CANTI");
                    objRtn.A3388COUNT = rs01.getInt("A3388COUNT");
                    objRtn.A3388DESCR = rs01.getString("A3388DESCR");
                    objRtn.A3388STATO = rs01.getString("A3388STATO");
                    objRtn.A3388FLAG = rs01.getString("A3388FLAG");
                    objRtn.A3388REGAS = rs01.getString("A3388REGAS");
                    objRtn.A3388DIAS = rs01.getString("A3388DIAS");
                    objRtn.A3388CHANEL = rs01.getString("A3388CHANEL");
                }

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

    public List<A3388Filter> SearchRefundDetail(A3388Filter filter) throws SQLException, Exception {
        List<A3388Filter> lstRtn = new ArrayList<A3388Filter>(0);
        A3388Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02500(?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(8, filter.IN_USER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3388Filter();
                objRtn.A3388CCUST = rs01.getString("A3388CCUST");
                objRtn.A3388PAIS = rs01.getString("A3388PAIS");
                objRtn.A3388NUMER = rs01.getString("A3388NUMER");
                objRtn.A3388TKT = rs01.getString("A3388TKT");
                objRtn.A3388STATU = rs01.getString("A3388STATU");
                objRtn.A3388IATA = rs01.getString("A3388IATA");
                objRtn.A3388FAPPI = rs01.getString("A3388FAPPI");
                objRtn.A3388PREME = rs01.getString("A3388PREME");

                objRtn.A3388MDA = rs01.getString("A3388MDA");
                objRtn.A3388TTARJ = rs01.getString("A3388TTARJ");
                objRtn.A3388TARIF = rs01.getDouble("A3388TARIF");
                objRtn.A3388CANTI = rs01.getInt("A3388CANTI");
                objRtn.A3388COUNT = rs01.getInt("A3388COUNT");
                objRtn.A3388DESCR = rs01.getString("A3388DESCR");
                objRtn.A3388STATO = rs01.getString("A3388STATO");
                objRtn.A3388FLAG = rs01.getString("A3388FLAG");
                objRtn.A3388REGAS = rs01.getString("A3388REGAS");
                objRtn.A3388DIAS = rs01.getString("A3388DIAS");
                objRtn.A3388TOTALPAG = rs01.getString("A3255COUNT");
                objRtn.A3388CHANEL = rs01.getString("A3388CHANEL");
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
