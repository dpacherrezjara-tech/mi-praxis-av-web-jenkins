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
import net.miatech.beans.SaleAudit.A3268Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RobotDisputeControlDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3268Filter> SearchDebitos(A3268Filter filter) throws SQLException, Exception {
        List<A3268Filter> lstRtn = new ArrayList<A3268Filter>(0);
        A3268Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02242(?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(8, filter.IN_AREA);
            cstmt01.setString(9, filter.IN_USER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3268Filter();

                if (filter.IN_ROBOT.equals("1")) {
                    objRtn.A3268CCUST = rs01.getString("A3254CCUST");
                    objRtn.A3268PAIS = rs01.getString("A3254PAIS");
                    objRtn.A3268CANT = rs01.getInt("A3254COUNT");
                    objRtn.A3268CTAPROCESADA = rs01.getInt("A3254CANTI");
                    objRtn.A3268STATUS = rs01.getString("A3254FLAG");
                    objRtn.A3268REGIS = rs01.getString("A3254REGIS");
                    objRtn.A3268FREGI = rs01.getString("A3254FREGI");
                    objRtn.A3268HREGI = rs01.getString("A3254HREGI");
                    objRtn.A3268ROBOT = rs01.getString("ROBOT");
                    objRtn.A3268STATO = rs01.getString("A3254FINA");
                    objRtn.A3268TOTALPAG = rs01.getString("A3254CANTPAGI");
                } else {
                    objRtn.A3268CCUST = rs01.getString("A3255CCUST");
                    objRtn.A3268PAIS = rs01.getString("A3255PAIS");
                    objRtn.A3268CANT = rs01.getInt("A3255COUNT");
                    objRtn.A3268CTAPROCESADA = rs01.getInt("A3255COUNT");
                    objRtn.A3268STATUS = rs01.getString("A3255STATU");
                    objRtn.A3268REGIS = rs01.getString("A3255REGIS");
                    objRtn.A3268FREGI = rs01.getString("A3255FREGI");
                    objRtn.A3268HREGI = rs01.getString("A3255HREGI");
                    objRtn.A3268ROBOT = rs01.getString("ROBOT");
                    objRtn.A3268STATO = rs01.getString("A3255FINA");
                    objRtn.A3268TOTALPAG = rs01.getString("A3255CANTPAGI");
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

    public List<A3268Filter> SearchDebitosDetail(A3268Filter filter) throws SQLException, Exception {
        List<A3268Filter> lstRtn = new ArrayList<A3268Filter>(0);
        A3268Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02242(?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(8, filter.IN_AREA);
            cstmt01.setString(9, filter.IN_USER);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3268Filter();
                objRtn.A3268CCUST = rs01.getString("A3090CCUST");
                objRtn.A3268PAIS = rs01.getString("A3090PAIS");
                objRtn.A3268AREA = rs01.getString("A3090AREA");
                objRtn.A3268FLAG = rs01.getString("A3090FLAG");
                //objRtn.A3268TYPE = rs01.getString("A3090TYPE"); 
                objRtn.A3268BASE = rs01.getString("A3090BASE");
                objRtn.A3268MODO = rs01.getString("A3090MODO");

                objRtn.A3268FBILI = rs01.getString("A3090FBILI");
                objRtn.A3268FDISP = rs01.getString("A3090FDISP");
                objRtn.A3268FBCP = rs01.getString("A3090FBCP");
                objRtn.A3268RAUDI = rs01.getString("A3090RAUDI");
                objRtn.A3268TOTALPAG = rs01.getString("A3254CANTI");
                objRtn.A3268CANT = rs01.getInt("A3254COUNT");
                objRtn.A3268NMEMO = rs01.getString("A3090NMEMO");
                objRtn.A3268DIAS = rs01.getString("A3268DIAS");

                objRtn.A3268REGIS = rs01.getString("A3090REGIS");
                objRtn.A3268FREGI = rs01.getString("A3090FREGI");
                objRtn.A3268HREGI = rs01.getString("A3090HREGI");
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
