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
import net.miatech.beans.PX0094S01A007Filter;
import net.miatech.beans.PX019S01A823Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A881;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ProrationFactorPMPDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ProrationFactorPMPDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ProrationFactorPMPDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX0094S01A007Filter> loadPX0094S01A007(PX0094S01A007Filter filter) throws SQLException, Exception {
        List<PX0094S01A007Filter> lstRtn = new ArrayList<>(0);
        PX0094S01A007Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04171(?,?,?,?,?,?,?,?,?,?,?,?)}"; // SE REEMPLAZA POR PX0094S01A007
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FFILTRO);
            cstmt01.setString(3, filter.IN_CITY_ORIG);
            cstmt01.setString(4, filter.IN_CITY_DEST);
            cstmt01.setString(5, filter.IN_DATE_FROM);
            cstmt01.setString(6, filter.IN_DATE_TO);
            cstmt01.setString(7, filter.IN_CORDER);
            cstmt01.setString(8, filter.IN_DORDER);
            cstmt01.setInt(9, PAGINIT);
            cstmt01.setInt(10, totRowsPag);
            cstmt01.setInt(11, totRows);
            cstmt01.setInt(12, filter.page.TOTROW);
            /*cstmt01.setInt(9, filter.page.PAGNUM);
             cstmt01.setInt(10, filter.page.PAGROW);
             cstmt01.setInt(11, filter.page.TOTPAG);
             cstmt01.setInt(12, filter.page.TOTROW);*/

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(11)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(12);
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
                objRtn = new PX0094S01A007Filter();
                objRtn.ROWNUM = rs01.getLong("RN");
                objRtn.A007OACC = rs01.getString("A007OACC");
                objRtn.A007DACC = rs01.getString("A007DACC");
                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
                objRtn.A007BASICM = rs01.getInt("A007BASICM");
                objRtn.PROVISO = rs01.getInt("PROVISO");
                objRtn.A007OACURC = rs01.getString("A007OACURC");
                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
                //objRtn.A007EDATEA = rs01.getString("A007EDATEA");                
                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
                objRtn.A007EDATEA =""+rs01.getString("A007EDATEA")+" "+Functions.getAbreviaturaMes(rs01.getString("A007EDATEM")) ;                
                
                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
                

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.getMessage();
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
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }
    
    public List<PX0094S01A007Filter> loadSQP03924(PX0094S01A007Filter filter) throws SQLException, Exception {
        List<PX0094S01A007Filter> lstRtn = new ArrayList<>(0);
        PX0094S01A007Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03924(?,?,?,?,?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FFILTRO);
            cstmt01.setString(3, filter.IN_CITY_ORIG);
            cstmt01.setString(4, filter.IN_CITY_DEST);
            cstmt01.setString(5, filter.IN_DATE_FROM);
            cstmt01.setString(6, filter.IN_DATE_TO);
            cstmt01.setString(7, filter.IN_CORDER);
            cstmt01.setString(8, filter.IN_DORDER);
            cstmt01.setInt(9, PAGINIT);
            cstmt01.setInt(10, totRowsPag);
            cstmt01.setInt(11, totRows);
            cstmt01.setInt(12, filter.page.TOTROW);
            /*cstmt01.setInt(9, filter.page.PAGNUM);
             cstmt01.setInt(10, filter.page.PAGROW);
             cstmt01.setInt(11, filter.page.TOTPAG);
             cstmt01.setInt(12, filter.page.TOTROW);*/

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(11)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(12);
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
                objRtn = new PX0094S01A007Filter();
                objRtn.ROWNUM = rs01.getLong("RN");
                objRtn.A007OACC = rs01.getString("A007OACC");
                objRtn.A007DACC = rs01.getString("A007DACC");
                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
                objRtn.A007BASICM = rs01.getInt("A007BASICM");
                objRtn.PROVISO = rs01.getInt("PROVISO");
                objRtn.A007OACURC = rs01.getString("A007OACURC");
                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
                objRtn.A007EDATEA = rs01.getString("A007EDATEA");                
                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
                objRtn.A007EDATEA =""+rs01.getString("A007EDATEA")+" "+Functions.getAbreviaturaMes(rs01.getString("A007EDATEM")) ;                
                
                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
                

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.getMessage();
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
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }
    
    public List<PX0094S01A007Filter> loadSQP03926(PX0094S01A007Filter filter) throws SQLException, Exception {
        List<PX0094S01A007Filter> lstRtn = new ArrayList<>(0);
        PX0094S01A007Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03926(?,?,?,?,?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FFILTRO);
            cstmt01.setString(3, filter.IN_CITY_ORIG);
            cstmt01.setString(4, filter.IN_CITY_DEST);
            cstmt01.setString(5, filter.IN_DATE_FROM);
            cstmt01.setString(6, filter.IN_DATE_TO);
            cstmt01.setString(7, filter.IN_CORDER);
            cstmt01.setString(8, filter.IN_DORDER);
            cstmt01.setInt(9, PAGINIT);
            cstmt01.setInt(10, totRowsPag);
            cstmt01.setInt(11, totRows);
            cstmt01.setInt(12, filter.page.TOTROW);
            /*cstmt01.setInt(9, filter.page.PAGNUM);
             cstmt01.setInt(10, filter.page.PAGROW);
             cstmt01.setInt(11, filter.page.TOTPAG);
             cstmt01.setInt(12, filter.page.TOTROW);*/

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(11)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(12);
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
                objRtn = new PX0094S01A007Filter();
                objRtn.ROWNUM = rs01.getLong("RN");
                objRtn.A007OACC = rs01.getString("A007OACC");
                objRtn.A007DACC = rs01.getString("A007DACC");
                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
                objRtn.A007BASICM = rs01.getInt("A007BASICM");
                objRtn.PROVISO = rs01.getInt("PROVISO");
                objRtn.A007OACURC = rs01.getString("A007OACURC");
                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
                //objRtn.A007EDATEA = rs01.getString("A007EDATEA");                
                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
                objRtn.A007EDATEA =""+rs01.getString("A007EDATEA")+" "+Functions.getAbreviaturaMes(rs01.getString("A007EDATEM")) ;                
                
                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
                

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.getMessage();
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
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }
    
    public List<PX0094S01A007Filter> loadSQP03928(PX0094S01A007Filter filter) throws SQLException, Exception {
        List<PX0094S01A007Filter> lstRtn = new ArrayList<>(0);
        PX0094S01A007Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03928(?,?,?,?,?,?,?,?,?,?,?,?)}";
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FFILTRO);
            cstmt01.setString(3, filter.IN_CITY_ORIG);
            cstmt01.setString(4, filter.IN_CITY_DEST);
            cstmt01.setString(5, filter.IN_DATE_FROM);
            cstmt01.setString(6, filter.IN_DATE_TO);
            cstmt01.setString(7, filter.IN_CORDER);
            cstmt01.setString(8, filter.IN_DORDER);
            cstmt01.setInt(9, PAGINIT);
            cstmt01.setInt(10, totRowsPag);
            cstmt01.setInt(11, totRows);
            cstmt01.setInt(12, filter.page.TOTROW);
            /*cstmt01.setInt(9, filter.page.PAGNUM);
             cstmt01.setInt(10, filter.page.PAGROW);
             cstmt01.setInt(11, filter.page.TOTPAG);
             cstmt01.setInt(12, filter.page.TOTROW);*/

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(11)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt(12);
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
                objRtn = new PX0094S01A007Filter();
                objRtn.ROWNUM = rs01.getLong("RN");
                objRtn.A007OACC = rs01.getString("A007OACC");
                objRtn.A007DACC = rs01.getString("A007DACC");
                objRtn.A007PRORAF = rs01.getInt("A007PRORAF");
                objRtn.A007BASICM = rs01.getInt("A007BASICM");
                objRtn.PROVISO = rs01.getInt("PROVISO");
                objRtn.A007OACURC = rs01.getString("A007OACURC");
                objRtn.A007AIRLIN = rs01.getString("A007AIRLIN");
                objRtn.A007CLASSC = rs01.getString("A007CLASSC");
                //objRtn.A007EDATEA = rs01.getString("A007EDATEA");                
                objRtn.A007EDATEM = rs01.getString("A007EDATEM");
                objRtn.A007EDATEA =""+rs01.getString("A007EDATEA")+" "+Functions.getAbreviaturaMes(rs01.getString("A007EDATEM")) ;                
                
                objRtn.A1007NOMBR_ORI = rs01.getString("A1007NOMBR_ORI");
                objRtn.A1007NOMBR_DES = rs01.getString("A1007NOMBR_DES");
                objRtn.A006PAIS_ORI = rs01.getString("A006PAIS_ORI");
                objRtn.A006PAIS_DES = rs01.getString("A006PAIS_DES");
                

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            String error = e.getMessage();
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
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstRtn;
    }
}
