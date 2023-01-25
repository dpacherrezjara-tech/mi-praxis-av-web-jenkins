/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A2597Filter;
import net.miatech.beans.A2865Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingControlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingControlDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingControlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2597Filter> search(A2597Filter filter) throws SQLException, Exception {
        List<A2597Filter> lstRtn = new ArrayList<A2597Filter>(0);
        A2597Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01;

        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00889(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_FINI);
            cstmt01.setString(3, filter.IN_FFIN);
            cstmt01.setInt(4, PAGINIT);
            cstmt01.setInt(5, totRowsPag);
            cstmt01.setInt(6, totRows);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(5)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(7);
                    int total = (int) (totRows / 20);
                    int resto = (totRows % 20);

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

            while (rs01.next()) {
                objRtn = new A2597Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.CCUST = rs01.getString("CCUST").trim();
                objRtn.CCIA = rs01.getString("CCIA").trim();
                objRtn.FECVAL = Functions.FormatFecha(rs01.getString("FECVAL").trim(), "yyyyMMdd", "yyyy-MM-dd");
                objRtn.FCONT = Functions.FormatFecha(rs01.getString("FCONT").trim(), "yyyyMMdd", "yyyy-MM-dd");
                objRtn.CURRENCY = rs01.getString("CURRENCY").trim();
                objRtn.MODULO = rs01.getString("MODULO").trim();
                objRtn.QTY = rs01.getDouble("QTY");
                objRtn.FARE = rs01.getDouble("FARE");
                objRtn.ISC = rs01.getDouble("ISC");
                objRtn.TAX = rs01.getDouble("TAX");
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.DAUDIT = Functions.FormatFecha(rs01.getString("DAUDIT").trim(), "yyyyMMdd", "yyyy-MM-dd");
                objRtn.MENSAJ = rs01.getString("MENSAJ").trim();

                /*objRtn.SQTYCPN = rs01.getDouble("SQTYCPN");
                 objRtn.SMDACP = rs01.getString("SMDACP").trim();
                 objRtn.SVCPUS = rs01.getDouble("SVCPUS");
                 objRtn.SCOMISI = rs01.getDouble("SCOMISI");
                 objRtn.SVTAX = rs01.getDouble("SVTAX");
                 objRtn.QTYCPN = rs01.getDouble("QTYCPN");
                 objRtn.MDACP = rs01.getString("MDACP").trim();
                 objRtn.VCPUS = rs01.getDouble("VCPUS");
                 objRtn.COMISI = rs01.getDouble("COMISI");
                 objRtn.VTAX = rs01.getDouble("VTAX");
                 objRtn.PQTYCPN = rs01.getDouble("PQTYCPN");
                 objRtn.PMDACP = rs01.getString("PMDACP");
                 objRtn.PAVCPUS = rs01.getDouble("PAVCPUS");
                 objRtn.PACOMISI = rs01.getDouble("PACOMISI");
                 objRtn.PAVTAX = rs01.getDouble("PAVTAX");
                 objRtn.PPVCPUS = rs01.getDouble("PPVCPUS");
                 objRtn.PPCOMISI = rs01.getDouble("PPCOMISI");                
                 objRtn.PPVTAX = rs01.getDouble("PPVTAX");   
                 objRtn.STVAL = rs01.getString("STVAL").trim();
                 objRtn.DAUDIT = Functions.FormatFecha(rs01.getString("DAUDIT").trim(),"yyyyMMdd","yyyy-MM-dd");
                 objRtn.MENSAJ = rs01.getString("MENSAJ").trim();
                 objRtn.USCR = rs01.getString("USCR").trim();
                 objRtn.FECR = rs01.getString("FECR").trim();
                 objRtn.HOCR = rs01.getString("HOCR").trim();
                
                 //Sales
                 objRtn.TOTSQTYCPN += objRtn.SQTYCPN;
                 objRtn.TOTSVCPUS += objRtn.SVCPUS;
                 objRtn.TOTSCOMISI += objRtn.SCOMISI;
                 objRtn.TOTSVTAX += objRtn.SVTAX;
                 //Flown
                 objRtn.TOTQTYCPN += objRtn.QTYCPN;
                 objRtn.TOTVCPUS += objRtn.VCPUS;
                 objRtn.TOTCOMISI += objRtn.COMISI;
                 objRtn.TOTVTAX += objRtn.VTAX;
                 //Accounting
                 objRtn.TOTPQTYCPN += objRtn.PQTYCPN;
                
                 objRtn.TOTPAVCPUS += objRtn.PAVCPUS;
                 objRtn.TOTPACOMISI += objRtn.PACOMISI;
                 objRtn.TOTPAVTAX += objRtn.PAVTAX;
                
                 objRtn.TOTPPVCPUS += objRtn.PPVCPUS;
                 objRtn.TOTPPCOMISI += objRtn.PPCOMISI;
                 objRtn.TOTPPVTAX += objRtn.PPVTAX;*/
                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (SQLException ex) {
            String data = ex.getMessage();
        } catch (Exception e) {
            String data = e.getMessage();
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
