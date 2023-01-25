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
import net.miatech.beans.A1878Filter;
import net.miatech.beans.A1879Filter;
import net.miatech.beans.A1880Filter;
import net.miatech.beans.A1881Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CommissionsGlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CommissionsGlDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CommissionsGlDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1879Filter> loadPX153S01A1879(A1879Filter filter) throws SQLException, Exception {
        List<A1879Filter> lstRtn = new ArrayList<A1879Filter>(0);
        A1879Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;
        //totRowsPag = 20;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX153S01A1879(?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1879CCUST);
            cstmt01.setString(2, filter.IN_A1879FECHA);
            cstmt01.setString(3, filter.IN_A1879PERIO);

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
            while (rs01.next()) {
                objRtn = new A1879Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1879CCUST = rs01.getString("A1879CCUST");
                objRtn.A1879FECHA = Functions.getMonthConvertDate(rs01.getString("A1879FECHA"));
                objRtn.A1879DESCR = rs01.getString("A1879DESCR");
                objRtn.A1879PERIO = rs01.getString("A1879PERIO");
                objRtn.A1879LOTE = rs01.getString("A1879LOTE");
                objRtn.A1879MONED = rs01.getString("A1879MONED");
                objRtn.A1879TCAMB = rs01.getDouble("A1879TCAMB");
                objRtn.A1879TCONV = rs01.getString("A1879TCONV");
                objRtn.A1879FCONV = rs01.getString("A1879FCONV");
                objRtn.A1879CARGO = rs01.getDouble("A1879CARGO");
                objRtn.A1879ABONO = rs01.getDouble("A1879ABONO");

                //Pagination
                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            String err = ex.toString();
        }//
        finally {
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);//session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<A1879Filter> loadPX153S02A1879(A1879Filter filter) throws SQLException, Exception {
        List<A1879Filter> lstRtn = new ArrayList<>(0);
        A1879Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;
        //totRowsPag = 20;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX153S02A1879(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1879CCUST);
            cstmt01.setString(2, filter.IN_A1879FECHA);
            cstmt01.setString(3, filter.IN_A1879PERIO);
            cstmt01.setString(4, filter.IN_A1879LOTE);
            cstmt01.setString(5, filter.IN_A1879MONED);

            cstmt01.setInt(6, PAGINIT);
            cstmt01.setInt(7, totRowsPag);
            cstmt01.setInt(8, totRows);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(8)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(9);
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
            while (rs01.next()) {
                objRtn = new A1879Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1879CCUST = rs01.getString("A1879CCUST");
                objRtn.A1879FECHA = Functions.getMonthConvertDate(rs01.getString("A1879FECHA"));
                objRtn.A1879LOTE = rs01.getString("A1879LOTE");
                objRtn.A1879MONED = rs01.getString("A1879MONED");
                objRtn.A1879NCTA = rs01.getString("A1879NCTA");
                objRtn.A1879MONED = rs01.getString("A1879MONED");
                objRtn.A1879TITU = rs01.getString("A1879TITU");
                objRtn.A1879CARGO = rs01.getDouble("A1879CARGO");
                objRtn.A1879ABONO = rs01.getDouble("A1879ABONO");

                //Pagination
                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            String err = ex.toString();
        }//
        finally {
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);//session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<A1878Filter> loadPX153S01A1878(A1878Filter filter) throws SQLException, Exception {
        List<A1878Filter> lstRtn = new ArrayList<>(0);
        A1878Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;
        //totRowsPag = 20;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX153S01A1878(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;//session.getCNXIBMDB2().open();         
        try {

            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1878CCUST);
            cstmt01.setString(2, filter.IN_A1878FPRO);
            cstmt01.setString(3, filter.IN_A1878UBICA);
            cstmt01.setString(4, filter.IN_A1878CUENT);
            cstmt01.setString(5, filter.IN_A1878SUBCU);
            cstmt01.setString(6, filter.IN_A1878CIAF);
            cstmt01.setString(7, filter.IN_A1878UNID);
            cstmt01.setString(8, filter.IN_A1878CECO);
            cstmt01.setString(9, filter.IN_A1878EQUI);
            cstmt01.setString(10, filter.IN_A1878ICIA.trim());
            cstmt01.setString(11, filter.IN_A1878MONED);
            cstmt01.setString(12, filter.IN_A1878TITU.trim());

            cstmt01.setInt(13, PAGINIT);
            cstmt01.setInt(14, totRowsPag);
            cstmt01.setInt(15, totRows);
            cstmt01.setInt(16, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(13);
            filter.page.PAGROW = cstmt01.getInt(14);
            filter.page.TOTPAG = cstmt01.getInt(15);
            filter.page.TOTROW = cstmt01.getInt(16);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(15)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(16);
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
            while (rs01.next()) {
                objRtn = new A1878Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1878CCUST = rs01.getString("A1878CCUST");
                objRtn.A1878PAIS = rs01.getString("A1878PAIS");
                objRtn.A1878ZONA = rs01.getString("A1878ZONA");
                objRtn.A1878NFACT = rs01.getString("A1878NFACT");
                objRtn.A1878FFACT = rs01.getString("A1878FFACT");
                objRtn.A1878ACTIV = rs01.getDouble("A1878ACTIV");
                objRtn.A1878PASIV = rs01.getDouble("A1878PASIV");

                //Pagination
                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            String err = ex.toString();
        }//
        finally {
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);//session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;
    }

}
