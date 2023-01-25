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
import net.miatech.beans.SaleAudit.A2844Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class IatasBSPFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2844Filter> SearchBspIATAS(A2844Filter filter) throws SQLException, Exception {
        List<A2844Filter> lstRtn = new ArrayList<A2844Filter>(0);
        A2844Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP01323(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_STATUS);
            cstmt01.setString(4, filter.IN_SELET_TYPE);
            cstmt01.setString(5, filter.IN_IATA);
            cstmt01.setString(6, filter.IN_DATEFROM);
            cstmt01.setString(7, filter.IN_DATETO);
            cstmt01.setString(8, filter.IN_FILENAMES);
            cstmt01.setString(9, filter.IN_NUMBERWeekly);
            cstmt01.setString(10, filter.IN_COUNTRY);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2844Filter();
                if (!filter.IN_OPTION.equals("9")) {
                    objRtn.A2844CCUST = rs01.getString("A2843CCUST");
                    objRtn.A2844AGENT = rs01.getString("A2843AGENT");
                    objRtn.A2844NAGET = rs01.getString("A2843NAGET");
                    objRtn.A2844PAIS = rs01.getString("A2843PAIS");
                    objRtn.A2844ESTA = rs01.getString("A2843ESTA");
                    objRtn.A2844FLAG = rs01.getString("A2843FLAG");
                    objRtn.A2844NAME = rs01.getString("A2843NAME");
                    objRtn.A2844NLOTE = rs01.getString("A2843NLOTE");
                    objRtn.A2844EFECT = rs01.getString("A2843EFECT");
                    objRtn.A2844DISCO = rs01.getString("A2843DISCO");
                    objRtn.A2844DISCO = rs01.getString("A2843DISCO");
                    objRtn.A2844REGIS = rs01.getString("A2843REGIS");
                    objRtn.A2844FREGI = rs01.getString("A2843FREGI");
                    objRtn.A2844HREGI = rs01.getString("A2843HREGI");
                    objRtn.A2844DESTA = rs01.getString("A2843DESTA");
                    objRtn.A2844AREA = rs01.getString("A2843AREA");

                } else {
                    objRtn.A2844CCUST = rs01.getString("A2844CCUST");
                    objRtn.A2844NAME = rs01.getString("A2844NAME");
                    objRtn.A2844PAIS = rs01.getString("A2844PAIS");
                    objRtn.A2844ELOTE = rs01.getString("A2844ELOTE");
                    objRtn.A2844DLOTE = rs01.getString("A2844DLOTE");
                    objRtn.A2844AGENT = rs01.getString("A2844AGENT");
                    objRtn.A2844NAGET = rs01.getString("A2843NAGET");
                    objRtn.A2844FLAG = rs01.getString("A2844FLAG");
                    objRtn.A2844COUNT = rs01.getString("A2844COUNT");
                    objRtn.A2844LOCAT = rs01.getString("A2844LOCAT");
                    objRtn.A2844CITY = rs01.getString("A2844CITY");
                    objRtn.A2844CHGE = rs01.getString("A2844CHGE");
                    objRtn.A2844DCHG = rs01.getString("A2844DCHG");
                    objRtn.A2844EFECO = rs01.getString("A2844EFECO");
                    objRtn.A2844ESTA = rs01.getString("A2844ESTA");
                    objRtn.A2844DESTA = rs01.getString("A2844DESTA");
                    objRtn.A2844REASO = rs01.getString("A2844REASO");
                    objRtn.A2844REMAR = rs01.getString("A2844REMAR");
                    objRtn.A2844EFECT = rs01.getString("A2844EFECT");
                    objRtn.A2844DISCO = rs01.getString("A2844DISCO");
                    objRtn.A2844REGIS = rs01.getString("A2844REGIS");
                    objRtn.A2844FREGI = rs01.getString("A2844FREGI");
                    objRtn.A2844HREGI = rs01.getString("A2844HREGI");
                    objRtn.A2844AREA = rs01.getString("A2844AREA");

                }
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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

}
