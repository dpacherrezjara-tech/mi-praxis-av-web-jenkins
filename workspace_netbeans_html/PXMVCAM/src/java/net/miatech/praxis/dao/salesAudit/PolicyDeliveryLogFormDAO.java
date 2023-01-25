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
import net.miatech.beans.A4014Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.salesAudit.ADMReportDAO.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class PolicyDeliveryLogFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4014Filter> Search(A4014Filter filter) throws SQLException, Exception {
        List<A4014Filter> lstRtn = new ArrayList<A4014Filter>(0);
        A4014Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP04087(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_NCAMP);
            cstmt01.setString(6, filter.IN_PRAXID);
            cstmt01.setString(7, filter.IN_MODULO);
            cstmt01.setString(8, filter.IN_TIPOM);
            cstmt01.setString(9, filter.IN_POLIZ);
            cstmt01.setString(10, filter.IN_TPOLI);
            cstmt01.setString(11, filter.IN_ORACLESTATU);

            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4014Filter();
                objRtn.A4014AIRLI = rs01.getString("A4014AIRLI");
                objRtn.RN = rs01.getInt("RN");
                objRtn.A4014MODUL = rs01.getString("A4014MODUL");
                objRtn.A4014TIPOM = rs01.getString("A4014TIPOM");
                objRtn.A4014STAT = rs01.getString("A4014STAT");
                objRtn.A4014POLIZ = rs01.getString("A4014POLIZ");
                objRtn.A4014TPOLI = rs01.getString("A4014TPOLI");
                objRtn.A4014PROGR = rs01.getString("A4014PROGR");
                objRtn.A4014FPROC = rs01.getString("A4014FPROC");
                objRtn.A4014FCONT = rs01.getString("A4014FCONT");
                objRtn.A4014FUENT = rs01.getString("A4014FUENT");
                objRtn.A4014PAIS = rs01.getString("A4014PAIS");
                objRtn.A4014SUBFU = rs01.getString("A4014SUBFU");
                objRtn.A4014CORRL = rs01.getInt("A4014CORRL");
                objRtn.A4014NCAMP = rs01.getString("A4014NCAMP");
                objRtn.A4014NOMCT = rs01.getString("A4014NOMCT");
                objRtn.A4014IDLOT = rs01.getString("A4014IDLOT");
                objRtn.A4014FFILE = rs01.getString("A4014FFILE");
                objRtn.A4014QTYPL = rs01.getInt("A4014QTYPL");
                objRtn.A4014QTYAF = rs01.getInt("A4014QTYAF");
                objRtn.A4014CARGO = rs01.getDouble("A4014CARGO");
                objRtn.A4014ABONO = rs01.getDouble("A4014ABONO");
                objRtn.A4014MDA = rs01.getString("A4014MDA");
                objRtn.A4014STSOA = rs01.getString("A4014STSOA");
                objRtn.A4014USOA = rs01.getString("A4014USOA");
                objRtn.A4014FISOA = rs01.getString("A4014FISOA");
                objRtn.A4014HISOA = rs01.getString("A4014HISOA");
                objRtn.A4014STSOR = rs01.getString("A4014STSOR");
                objRtn.A4014NUP = rs01.getString("A4014NUP");
                objRtn.A4014USOR = rs01.getString("A4014USOR");
                objRtn.A4014FISOR = rs01.getString("A4014FISOR");
                objRtn.A4014HISOR = rs01.getString("A4014HISOR");
                objRtn.A4014STSAF = rs01.getString("A4014STSAF");
                objRtn.A4014USAF = rs01.getString("A4014USAF");
                objRtn.A4014FISAF = rs01.getString("A4014FISAF");
                objRtn.A4014HISAF = rs01.getString("A4014HISAF");
                objRtn.A4014STSDB = rs01.getString("A4014STSDB");
                objRtn.A4014USDB = rs01.getString("A4014USDB");
                objRtn.A4014FISDB = rs01.getString("A4014FISDB");
                objRtn.A4014HISDB = rs01.getString("A4014HISDB");
                objRtn.A4014USUAR = rs01.getString("A4014USUAR");
                objRtn.A4014FECIN = rs01.getString("A4014FECIN");
                objRtn.A4014HORIN = rs01.getString("A4014HORIN");
                objRtn.A4014REVIS = rs01.getString("A4014REVIS");
                objRtn.A4014FREVI = rs01.getString("A4014FREVI");
                objRtn.A4014HREVI = rs01.getString("A4014HREVI");
                objRtn.A1955STATU = rs01.getString("A1955STATU");
                objRtn.A1955STATU_LABEL = rs01.getString("A1955STATU_LABEL");                
                
                // A2548EMISION
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
