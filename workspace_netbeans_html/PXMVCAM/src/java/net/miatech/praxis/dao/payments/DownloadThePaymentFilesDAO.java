/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A4719Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class DownloadThePaymentFilesDAO {
    
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A4719Filter> DowloadFilesPayment(A4719Filter filter) throws SQLException, Exception {
        List<A4719Filter> lstRtn = new ArrayList<A4719Filter>(0);
        A4719Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXISAV.SQP05569(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
 
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_TYPEPROCES);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_DATEFROM);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4719Filter();
                objRtn.A4719CCUST = rs01.getString("A4719CCUST");
                objRtn.A4719FCARG = rs01.getString("A4719FCARG");
                 objRtn.A4719FFIN = rs01.getString("A4719FFIN");
                objRtn.A4719TYPE = rs01.getString("A4719TYPE");
                objRtn.A4719TYPEDES = rs01.getString("A4719TYPEDES");
                objRtn.A4719ESTAT = rs01.getString("A4719ESTAT");
                objRtn.A4719CODEF = rs01.getString("A4719CODEF");
                //objRtn.A4719CORRE = rs01.getInt("A4719CORRE"); 
                objRtn.A4719TOTAL = rs01.getDouble("A4719TOTAL");
                objRtn.A4719DIFE = rs01.getDouble("A4719DIFE");
               // objRtn.A4719CODEF = rs01.getString("A4719CODEF");
                //objRtn.A4719IQTIP = rs01.getString("A4719IQTIP");
                objRtn.A4719USRIN = rs01.getString("A4719USRIN");
                objRtn.A4719FECIN = rs01.getString("A4719FECIN");
                //objRtn.A4719HORIN = rs01.getString("A4719HORIN");
                objRtn.A4719USRAC = rs01.getString("A4719USRAC");
                objRtn.A4719FECAC = rs01.getString("A4719FECAC");
                objRtn.A4719HORAC = rs01.getString("A4719HORAC");
                objRtn.A4719ESTATDES = rs01.getString("A4719ESTATDES"); 
                // 
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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
    
}
