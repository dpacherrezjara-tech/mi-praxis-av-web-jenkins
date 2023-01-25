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
import net.miatech.beans.PX019S01A004Filter;
import net.miatech.beans.PX019S01A823Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A722;
import net.miatech.libmiatec.A881;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class FptfABestPracticeDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FptfABestPracticeDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FptfABestPracticeDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List loadFormaReport(A722 filter) throws SQLException, Exception {

        String strSQL;
        A722 bean;
        List<A722> listaData = new ArrayList();
        int rowsPag = 20;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = rowsPag, totRows = 0;

        if (filter.strExcel.equals("TRUE")) {
            totRowsPag = -1;
        }

        try {
            session.getCNXIBMDB2().open();
            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag;
            }

            strSQL = "{CALL " + session.getMainLibrary() + ".PX024S01A722(?,?,?,?,?,?,?)}";

            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, filter.dateFrom);
            cs.setString(2, filter.dateTo);
            cs.setString(3, filter.A722FORMA);
            cs.setString(4, filter.A722FTEVTA);
            cs.setInt(5, totRowsPag);
            cs.setInt(6, PAGINIT);
            cs.setInt(7, filter.page.TOTROW);
            cs.execute();

            filter.intTotalRws = filter.page.TOTROW;
            filter.intTotalPgs = filter.page.TOTPAG;

            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(6)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(7);
                    /*String temp = String.valueOf(totRows / 15.0);
                     if (temp.contains(".")) {
                     totPAGS = (totRows / totRowsPag) + 1;*/
                    int t = totRows % 20;
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
                bean = new A722();

                bean.A722AIRLIN = rst.getString("A722AIRLIN");
                bean.A722FORMA = rst.getString("A722FORMA");

                bean.A722FDESDE = rst.getString("A722FDESDE");
                bean.strFormatDate = rst.getString("A722FDESDE").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("A722FDESDE").substring(4, 6));

                bean.A722FHASTA = rst.getString("A722FHASTA");
                bean.strFormatDate2 = rst.getString("A722FHASTA").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("A722FHASTA").substring(4, 6));

                bean.A722FTEVTA = rst.getString("A722FTEVTA");
                bean.A722TFORM1 = rst.getString("A722TFORM1");
                bean.A722TFORM2 = rst.getString("A722TFORM2");
                bean.A722TFORM2 = rst.getString("A722TFORM3");
                bean.A722UFORMA = rst.getString("A722UFORMA");

                bean.A722VFORMA = rst.getString("A722VFORMA");
                if (bean.A722VFORMA.equals("I")) {
                    bean.strA722VFORMA = "INTERNATIONAL";
                } else if (bean.A722VFORMA.equals("D")) {
                    bean.strA722VFORMA = "DOMESTIC";
                } else if (bean.A722VFORMA.equals("M")) {
                    bean.strA722VFORMA = "MIXED";
                }

                bean.A722DIGSER = rst.getInt("A722DIGSER");

                bean.A722METODO = rst.getString("A722METODO");
                if (bean.A722METODO.equals("1")) {
                    bean.strA722METODO = "PRE-PRINTED";
                } else if (bean.A722METODO.equals("2")) {
                    bean.strA722METODO = "TAT & MPD";
                } else if (bean.A722METODO.equals("3")) {
                    bean.strA722METODO = "CPN BY CPN";
                }
                bean.A722EMTCUP = rst.getString("A722EMTCUP");
                bean.A722TOTCUP = rst.getInt("A722TOTCUP");

                bean.A722INDSCN = rst.getString("A722INDSCN");
                if (bean.A722INDSCN.equals("S")) {
                    bean.strA722INDSCN = "SCN PERMITTED";
                } else if (bean.A722INDSCN.equals("N")) {
                    bean.strA722INDSCN = "SCN NOT PERMITTED";
                }
                bean.A722REGIST = rst.getString("A722REGIST");
                bean.A722FREGIS = rst.getString("A722FREGIS");
                bean.A722HREGIS = rst.getString("A722HREGIS");
                bean.A722REVISA = rst.getString("A722REVISA");
                bean.A722FREVIS = rst.getString("A722FREVIS");
                bean.A722HREVIS = rst.getString("A722HREVIS");

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
            rst.close();
            cs.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cs != null) {
                cs.close();
            }
            //===============
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }
        return listaData;
    }

    public A722 loadA722CompleteData(A722 filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A722 bean = new A722();

        try {
            session.getCNXIBMDB2().open();
            strSQL = "{CALL " + session.getMainLibrary() + ".PX024S02A722(?,?,?,?,?,?,?,?,?,?,?)}";

            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);

            cs.registerOutParameter(8, Types.VARCHAR);
            cs.registerOutParameter(9, Types.VARCHAR);
            cs.registerOutParameter(10, Types.VARCHAR);
            cs.registerOutParameter(11, Types.VARCHAR);

            cs.setString(1, filter.A722FDESDE.trim());
            cs.setString(2, filter.A722FHASTA.trim());
            cs.setString(3, filter.A722FORMA.trim());
            cs.setString(4, filter.A722FTEVTA.trim());
            cs.setString(5, filter.A722TFORM3.trim());
            cs.setString(6, filter.A722UFORMA.trim());
            cs.setString(7, filter.A722EMTCUP.trim());
            cs.setString(8, "");
            cs.setString(9, "");
            cs.setString(10, "");
            cs.setString(11, "");
            cs.execute();

            bean.ds_A722FTEVTA = cs.getString(8);
            bean.ds_A722TFORM3 = cs.getString(9);
            bean.ds_A722UFORMA = cs.getString(10);
            bean.ds_A722EMTCUP = cs.getString(11);

            rst = cs.getResultSet();

            if (rst.next()) {
                bean.A722AIRLIN = rst.getString("A722AIRLIN");
                bean.A722FORMA = rst.getString("A722FORMA");

                bean.A722FDESDE = rst.getString("A722FDESDE");
                bean.strFormatDate = rst.getString("A722FDESDE").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("A722FDESDE").substring(4, 6));

                bean.A722FHASTA = rst.getString("A722FHASTA");
                bean.strFormatDate2 = rst.getString("A722FHASTA").substring(0, 4) + " " + Functions.getAbreviaturaMes(rst.getString("A722FHASTA").substring(4, 6));

                bean.A722FTEVTA = rst.getString("A722FTEVTA");
                bean.A722TFORM1 = rst.getString("A722TFORM1");
                bean.A722TFORM2 = rst.getString("A722TFORM2");
                bean.A722TFORM3 = rst.getString("A722TFORM3");
                bean.A722UFORMA = rst.getString("A722UFORMA");

                bean.A722VFORMA = rst.getString("A722VFORMA");
                if (bean.A722VFORMA.equals("I")) {
                    bean.strA722VFORMA = "INTERNATIONAL";
                } else if (bean.A722VFORMA.equals("D")) {
                    bean.strA722VFORMA = "DOMESTIC";
                } else if (bean.A722VFORMA.equals("M")) {
                    bean.strA722VFORMA = "MIXED";
                }

                bean.A722DIGSER = rst.getInt("A722DIGSER");

                bean.A722METODO = rst.getString("A722METODO");
                if (bean.A722METODO.equals("1")) {
                    bean.strA722METODO = "PRE-PRINTED";
                } else if (bean.A722METODO.equals("2")) {
                    bean.strA722METODO = "TAT & MPD";
                } else if (bean.A722METODO.equals("3")) {
                    bean.strA722METODO = "CPN BY CPN";
                }
                bean.A722EMTCUP = rst.getString("A722EMTCUP");
                bean.A722TOTCUP = rst.getInt("A722TOTCUP");

                bean.A722INDSCN = rst.getString("A722INDSCN");
                if (bean.A722INDSCN.equals("S")) {
                    bean.strA722INDSCN = "SCN PERMITTED";
                } else if (bean.A722INDSCN.equals("N")) {
                    bean.strA722INDSCN = "SCN NOT PERMITTED";
                }
                bean.A722REGIST = rst.getString("A722REGIST");
                bean.A722FREGIS = rst.getString("A722FREGIS");
                bean.A722HREGIS = rst.getString("A722HREGIS");
                bean.A722REVISA = rst.getString("A722REVISA");
                bean.A722FREVIS = rst.getString("A722FREVIS");
                bean.A722HREVIS = rst.getString("A722HREVIS");
                //aerolinea.A005CODX = rst.getString("A005CODX");
            }

            rst.close();
            cs.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cs != null) {
                cs.close();
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return bean;
    }

}
