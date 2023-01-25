/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class OracleControlAcknowledgmentDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public OracleControlAcknowledgmentDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public OracleControlAcknowledgmentDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1955Filter> loadPX247S01A1955(A1955Filter filter) throws SQLException, Exception {
        List<A1955Filter> lstRtn = new ArrayList(0);
        A1955Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;
        CallableStatement cstmt01 = null, cstmt02 = null;
        ResultSet rs01 = null, rs02 = null;

        String SQLCLL01 = "{CALL PRAXIS.PX247S01A1955(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_MODULO", filter.IN_MODULO);
            cstmt01.setString("IN_ENVIO", filter.IN_ENVIO);
            cstmt01.setString("IN_FEC_INI", filter.IN_FECHA_PROCESO);
            cstmt01.setString("IN_FEC_FIN", filter.IN_FECHA_ACUSE);
            cstmt01.setString("IN_FUENTE", filter.A1955FUENT);
            cstmt01.setString("IN_PAIS", filter.A1955KEY2);
            cstmt01.setString("IN_CANAL", filter.A1955KEY3);
            cstmt01.setString("IN_ESTADO", filter.A1955STATU);
            cstmt01.setString("IN_ACCION", filter.A1955ACTIO);

            cstmt01.setInt("IO_PAGNUM", PAGINIT);
            cstmt01.setInt("IO_PAGROW", totRowsPag);
            cstmt01.setInt("IO_TOTPAG", totRows);
            cstmt01.setInt("IO_TOTROW", filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt("IO_PAGNUM");
            filter.page.PAGROW = cstmt01.getInt("IO_PAGROW");
            filter.page.TOTPAG = cstmt01.getInt("IO_TOTPAG");
            filter.page.TOTROW = cstmt01.getInt("IO_TOTROW");

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt("IO_PAGROW")) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt("IO_TOTROW");
                    int total = (int) (totRows / totRowsPag);
                    int resto = (totRows % totRowsPag);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.page.TOTPAG = totPAGS;

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1955Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1955CCUST = rs01.getString("A1955CCUST").trim();
                objRtn.A1955MODUL = rs01.getString("A1955MODUL").trim();
                objRtn.A1955ENVIO = rs01.getString("A1955ENVIO").trim();
                objRtn.A1955FPROC = rs01.getString("A1955FPROC").trim();
                objRtn.A1955ACTIO = rs01.getString("A1955ACTIO").trim();
                objRtn.ACCION = rs01.getString("ACCION").trim();
                objRtn.MODULE = rs01.getString("MODULE").trim();

                objRtn.A1955FUENT = rs01.getString("A1955FUENT").trim();
                objRtn.A1955KEY2 = rs01.getString("A1955KEY2").trim();
                objRtn.A1955KEY3 = rs01.getString("A1955KEY3").trim();

                objRtn.A1955STATU = rs01.getString("A1955STATU").trim();
                objRtn.ESTADO = rs01.getString("ESTADO").trim();
                objRtn.A1955FCONT = rs01.getString("A1955FCONT").trim();
                objRtn.A1955HCONT = rs01.getString("A1955HCONT").trim();
                objRtn.A1955FECRC = rs01.getString("A1955FECRC").trim();
                objRtn.A1955HORRC = rs01.getString("A1955HORRC").trim();
                objRtn.A1955QCPNF = rs01.getInt("A1955QCPNF");
                objRtn.A1955QCPNR = rs01.getInt("A1955QCPNR");
                objRtn.A1955COMRC = rs01.getString("A1955COMRC").trim();

                objRtn.A1955STREC = rs01.getString("A1955STREC").trim();
                objRtn.A1955ORACL = rs01.getString("A1955ORACL").trim();
                objRtn.A1955ERRLG = rs01.getString("A1955ERRLG").trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            String str = ex.getMessage();
            str = "";
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

}
