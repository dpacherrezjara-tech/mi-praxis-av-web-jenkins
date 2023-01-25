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
import net.miatech.beans.SaleAudit.A3540Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class SpdrspcrQueryDAO {

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
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02918(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DOCUMET);
            cstmt01.setString(4, filter.IN_DATEFROM);
            cstmt01.setString(5, filter.IN_DATETO);
            cstmt01.setString(6, filter.IN_COUNTRY);
            cstmt01.setString(7, filter.IN_STATUS);
            cstmt01.setString(8, filter.IN_IATA);
            cstmt01.setString(9, filter.IN_TRNCU);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3540Filter();
                objRtn.A3540CCUST = rs01.getString("A3541CCUST");
                objRtn.A3540TYPE = rs01.getString("A3541TYPE");
                objRtn.A3540PAIS = rs01.getString("A3541PAIS");
                objRtn.A3540SEQ = rs01.getString("A3541SEQ");
                objRtn.A3540FMEMO = rs01.getString("A3541REASO");
                objRtn.A3540REASO = rs01.getString("A3541REASO");
                objRtn.A3540NMEMO = rs01.getString("A3541NMEMO");
                objRtn.A3540STATU = rs01.getString("A3541STATU");
                objRtn.A3540FTE = rs01.getString("A3541FTE");
                objRtn.A3540RMEMO = rs01.getString("A3541RMEMO");
                objRtn.A3540FTKT = rs01.getString("A3541FTKT");
                objRtn.A3540CIA = rs01.getString("A3541CIA");
                objRtn.A3540IATA = rs01.getString("A3541IATA");
                objRtn.A3540NIATA = rs01.getString("A3541NIATA");
                objRtn.A3540AGEN = rs01.getString("A3541AGEN");
                objRtn.A3540NAGENCIA = rs01.getString("A3541NAGENCIA");
                objRtn.A3540FLAG = rs01.getString("A3541FLAG");
                objRtn.A3540CUR = rs01.getString("A3541CUR");
                objRtn.A3540STAT = rs01.getString("A3541STAT");
                objRtn.A3540RELA = rs01.getString("A3541RELA");
                objRtn.A3540DESCR = rs01.getString("A3541DESCR");
                objRtn.A3540PERIO = rs01.getString("A3541PERIO");
                objRtn.A3540RELAT = rs01.getString("A3541RELAT");
                objRtn.A3540REGIS = rs01.getString("A3541REGIS");
                
                objRtn.A3540FREGI = rs01.getString("A3541FREGI");
                objRtn.A3540HREGI = rs01.getString("A3541HREGI");
                objRtn.A3540REVIS = rs01.getString("A3541REVIS");
                objRtn.A3540FREVI = rs01.getString("A3541FREVI");
                objRtn.A3540HREVI = rs01.getString("A3541HREVI");
                objRtn.A3540TRNCU = rs01.getString("A3541TRNCU");
                ///montos
                //MONTOS DEL DEBITO
                objRtn.A3540TARID = rs01.getDouble("A3541TARID");
                objRtn.A3540TTAXD = rs01.getDouble("A3541TTAXD");
                objRtn.A3540SERVD = rs01.getDouble("A3541SERVD");
                objRtn.A3540IVACD = rs01.getDouble("A3541IVACD");
                objRtn.A3540COMID = rs01.getDouble("A3541COMID");
                objRtn.A3540SCOMD = rs01.getDouble("A3541SCOMD");
                objRtn.A3540TAXCD = rs01.getDouble("A3541TAXCD");
                objRtn.A3540PENAD = rs01.getDouble("A3541PENAD");
                objRtn.A3540FEED = rs01.getDouble("A3541FEED");
                objRtn.A3540TTACD = rs01.getDouble("A3541TTACD");
                objRtn.A3540TTAMD = rs01.getDouble("A3541TTAMD");
                objRtn.A3540TCARD = rs01.getDouble("A3541TCARD");
                objRtn.A3540TOTAD = rs01.getDouble("A3541TOTAD");
                //MONTOS DE LA AGENCIA
                objRtn.A3540TARIA = rs01.getDouble("A3541TARIA");
                objRtn.A3540TTAXA = rs01.getDouble("A3541TTAXA");
                objRtn.A3540COMIA = rs01.getDouble("A3541COMIA");
                objRtn.A3540SCOMA = rs01.getDouble("A3541SCOMA");
                objRtn.A3540TAXCA = rs01.getDouble("A3541TAXCA");
                objRtn.A3540PENAA = rs01.getDouble("A3541PENAA");
                objRtn.A3540SERVA = rs01.getDouble("A3541SERVA");
                objRtn.A3540TOTAA = rs01.getDouble("A3541TOTAA");
                //MONTOS DE LA AEROLINEA
                 objRtn.A3540TARIF = rs01.getDouble("A3541TARIF");
                objRtn.A3540TTAX = rs01.getDouble("A3541TTAX");
                objRtn.A3540COMIS = rs01.getDouble("A3541COMIS");
                objRtn.A3540SCOM = rs01.getDouble("A3541SCOM");
                objRtn.A3540TAXCM = rs01.getDouble("A3541TAXCM");
                objRtn.A3540PENAL = rs01.getDouble("A3541PENAL");
                objRtn.A3540SERVI = rs01.getDouble("A3541SERVI");
                objRtn.A3540TOTAL = rs01.getDouble("A3541TOTAL");
                //NETO
		objRtn.A3540NETO = rs01.getDouble("A3541NETO");
                objRtn.A3540NETD = rs01.getDouble("A3541NETD");
                
                
                
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
