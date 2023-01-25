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
import net.miatech.beans.SaleAudit.A3536Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RobotPostbillingControlDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3536Filter> SearchPostbillingControl(A3536Filter filter) throws SQLException, Exception {
        List<A3536Filter> lstRtn = new ArrayList<A3536Filter>(0);
        A3536Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03013(?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(9, filter.IN_TURNO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3536Filter();

                if (filter.IN_OPTION.equals("1") || filter.IN_OPTION.equals("2")) {
                    objRtn.A3536CCUST = rs01.getString("A3536CCUST");
                    objRtn.A3536PAIS = rs01.getString("A3536PAIS");
                    objRtn.A3536CANTI = rs01.getInt("A3536CANTI");
                    objRtn.A3536COUNT = rs01.getInt("A3536COUNT");
                    objRtn.A3536FLAG = rs01.getString("A3536FLAG");
                    objRtn.A3536REGIS = rs01.getString("A3536REGIS");
                    objRtn.A3536FREGI = rs01.getString("A3536FREGI");
                    objRtn.A3536ROBOT = rs01.getString("A3536ROBOT");
                    objRtn.A3536FINA = rs01.getString("A3536FINA");
                    objRtn.A3536HREVI = rs01.getString("A3536HREVI");
                    objRtn.A3536TOTALPAG = rs01.getString("A3536TOTALPAG");
                } else {
                    objRtn.A3536CCUST = rs01.getString("A3543CCUST");
                    objRtn.A3536TRNCU = rs01.getString("A3543TRNCU");
                    objRtn.A3536PAIS = rs01.getString("A3543PAIS");
                    objRtn.A3536FLAG = rs01.getString("A3543FLAG");
                    objRtn.A3536MODO = rs01.getString("A3543MODO");
                    objRtn.A3536IATA = rs01.getString("A3543IATA");
                    objRtn.A3536AREA = rs01.getString("A3543AREA");
                    objRtn.A3536BASE = rs01.getString("A3543BASE");
                    objRtn.A3536REGIS = rs01.getString("A3543RAUDI");
                    objRtn.A3536MDA = rs01.getString("A3543MDA");
                    objRtn.A3536FDIAS = rs01.getString("A3543FDIAS");
                    objRtn.A3536FPBD = rs01.getString("A3543FPBD");
                    objRtn.A3536RDSTE = rs01.getString("A3543RDSTE");
                    objRtn.A3536FREGI = rs01.getString("A3543FREGI");
                    objRtn.A3536TOTALPAG = rs01.getString("A3543COUNT");
                    objRtn.A3536NMEMO = rs01.getString("A3543NMEMO");
                    objRtn.A3536DIAS = rs01.getString("A3543DIAS");

                    objRtn.A3536NETO = rs01.getDouble("A3543PBDNE");
                    objRtn.A3537NMAX = rs01.getDouble("A3543NMAX");

                }

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
