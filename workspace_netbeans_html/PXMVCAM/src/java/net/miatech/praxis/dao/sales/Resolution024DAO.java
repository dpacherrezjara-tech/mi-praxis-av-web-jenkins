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
import java.util.logging.Level;
import net.miatech.beans.PX019S01A823Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A881;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class Resolution024DAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public Resolution024DAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public Resolution024DAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List loadResolution024(A881 filter) throws SQLException, Exception {

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A881 bean;
        List<A881> listaData = new ArrayList();
        int rowsPag = 20;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = 0;

        if (filter.strExcel.equals("TRUE")) {
            totRowsPag = -1;
        }

        Connection cnx = null;
        try {

            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
            }

            strSQL = "{CALL " + session.getMainLibrary() + ".PX021S01PXA881(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, "139");
            cs.setString(2, filter.dateFrom);
            cs.setString(3, filter.dateTo);
            cs.setString(4, filter.strCampo);
            cs.setString(5, filter.strValor);
            cs.setInt(6, totRowsPag);
            cs.setInt(7, PAGINIT);
            cs.setInt(8, filter.page.TOTROW);
            cs.execute();
            filter.intTotalRws = filter.page.TOTROW;
            filter.intTotalPgs = filter.page.TOTPAG;

            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(7)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(8);
                    /*String temp = String.valueOf(totRows / 15.0);
                     if (temp.contains(".")) {
                     totPAGS = (totRows / totRowsPag) + 1;*/
                    int t = totRows % rowsPag;
                    if (t > 0) {
                        totPAGS = (totRows / totRowsPag) + 1;
                    } else {
                        totPAGS = totRows / totRowsPag;
                    }
                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                bean = new A881();

                bean.A881PAIS = rst.getString("A881PAIS");
                bean.strNombrePais = rst.getString("A006PAIS");
                bean.A881FECHA = rst.getString("A881FECHA");
                bean.strFormatDate = rst.getString("A881FECHA").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("A881FECHA").substring(4, 6));
                bean.A881IND024 = rst.getString("A881IND024");
                bean.A881REGIST = rst.getString("A881REGIST");
                bean.A881FREGIS = rst.getString("A881FREGIS");
                if (rst.getString("A881FREGIS").trim().length() == 8) {
                    bean.strFormatDate2 = rst.getString("A881FREGIS").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("A881FREGIS").substring(4, 6)) + " " + rst.getString("A881FREGIS").substring(6, 8);
                } else {
                    bean.strFormatDate2 = rst.getString("A881FREGIS");
                }
                bean.A881HREGIS = rst.getString("A881HREGIS");
                bean.A881REVISA = rst.getString("A881REVISA");
                bean.A881FREVIS = rst.getString("A881FREVIS");
                if (rst.getString("A881FREVIS").trim().length() == 8) {
                    bean.strFormatDate2 = rst.getString("A881FREVIS").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("A881FREVIS").substring(4, 6)) + " " + rst.getString("A881FREVIS").substring(6, 8);
                } else {
                    bean.strFormatDate2 = rst.getString("A881FREVIS");
                }
                bean.A881HREVIS = rst.getString("A881HREVIS");
                bean.A881MONEDA = rst.getString("A881MONEDA");

                //Paginación ===================================================
                if (filter.intCurrentPg > 0) {
                    bean.intCurrentPg = filter.intCurrentPg;
                    bean.pos = PAGINIT + pos;
                } else {
                    bean.intCurrentPg = 1;
                    bean.pos = pos;
                }
                //bean.pos = (20 * (bean.intCurrentPg - 1) + pos);
                bean.intPageRws = totRowsPag;
                bean.intTotalPgs = totPAGS;
                bean.intTotalRws = totRows;
                bean.page.PAGNUM = bean.intCurrentPg;
                bean.page.PAGROW = bean.intPageRws;
                bean.page.TOTPAG = bean.intTotalPgs;
                bean.page.TOTROW = bean.intTotalRws;

                listaData.add(bean);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                System.out.println("--> "+e.getMessage());
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                 System.out.println("--> "+e.getMessage());
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //===============
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return listaData;
    }

    public int maintanceA881(A881 filter, String strOption) throws SQLException {

        String strSQL;
        int result = 0;

        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".PX021S02PXA881_2(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, strOption);
            cs.setString(2, filter.A881PAIS);
            cs.setString(3, filter.A881FECHA);
            cs.setString(4, filter.A881IND024);
            cs.setString(5, filter.A881MONEDA);
            cs.setString(6, session.getUserView().getUserInfo().USR);
            cs.setString(7, Functions.getFechaActual());
            cs.setString(8, Functions.getHoraActual());

            //cs.execute();
            result = cs.executeUpdate();

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            result=2;            
            e.printStackTrace();
        } finally {
            strSQL = null;
            try {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } catch (Exception ex) {
                java.util.logging.Logger.getLogger(Resolution024DAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return result;
    }
}
