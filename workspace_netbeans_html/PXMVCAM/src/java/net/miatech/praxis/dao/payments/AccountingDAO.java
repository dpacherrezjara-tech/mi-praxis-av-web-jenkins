/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.praxis.payment.filter.SQP05233Filter;
import net.miatech.praxis.payment.filter.SQP05252Filter;
import net.miatech.praxis.payment.filter.SQP05253Filter;
import net.miatech.praxis.payment.filter.SQP05343Filter;
import net.miatech.praxis.payment.filter.SQP05352Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AccountingDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public SQP05233Filter setSQP05233Filter(SQP05233Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PRAXISMP.SQP05233(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.setString(1, filter.VP_CCUST);
            cstmt.setString(2, filter.VP_FECHA);
            cstmt.setString(3, filter.VP_TIPO);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(4);
            filter.dbException.MESSAGE = cstmt.getString(5);

        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public SQP05343Filter setSQP05343Filter(SQP05343Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PRAXISMP.SQP05343(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            //cstmt.setString(1, "134");
            cstmt.setString(2, filter.VP_FECHA_INI);
            cstmt.setString(3, filter.VP_FECHA_FIN);
            cstmt.setString(4, filter.VP_FECHA_CIE);
            cstmt.setString(5, filter.VP_USER);
            cstmt.setString(6, filter.VP_TIPO);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(7);
            filter.dbException.MESSAGE = cstmt.getString(8);

        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public SQP05343Filter setSQP05393Filter(SQP05343Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PRAXISMP.SQP05393(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            //cstmt.setString(1, "134");
            cstmt.setString(2, filter.VP_FECHA_INI);
            cstmt.setString(3, filter.VP_FECHA_FIN);
            cstmt.setString(4, filter.VP_TIPO);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(5);
            filter.dbException.MESSAGE = cstmt.getString(6);

        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public List<SQP05253Filter> getSQP05253Filter(SQP05253Filter filter) throws SQLException, Exception {

        List<SQP05253Filter> lstData = new ArrayList<SQP05253Filter>(0);
        SQP05253Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP05253(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            //cstmt.setString(1, "134");
            cstmt.setString(2, filter.VP_OPCION);
            cstmt.setString(3, filter.VP_FDATE1);
            cstmt.setString(4, filter.VP_FDATE2);

            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                bean = new SQP05253Filter();
                bean.RN = rst.getInt("RN");
                bean.A4556CCUST = rst.getString("A4556CCUST").trim();
                bean.A4556PSTGD = rst.getString("A4556PSTGD").trim();
                bean.A4556CPROC = rst.getString("A4556CPROC").trim();
                bean.A4556FFILE = rst.getString("A4556FFILE").trim();
                bean.A4556TFILE = rst.getString("A4556TFILE").trim();
                bean.A4556TFILE_0 = rst.getString("A4556TFILE_0").trim();                
                bean.A4556TREGI = rst.getString("A4556TREGI").trim();
                bean.A4556NARCH = rst.getString("A4556NARCH").trim();
                bean.A4556ESTAD = rst.getString("A4556ESTAD").trim();
                bean.A4556USR   = rst.getString("A4556USR").trim();
                bean.A4556FECR  = rst.getString("A4556FECR").trim();
                bean.A4556HORA  = rst.getString("A4556HORA").trim();
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
            }
            rst.close();

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
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }
    
    public List<SQP05352Filter> getSQP05352Filter(SQP05352Filter filter) throws SQLException, Exception {

        List<SQP05352Filter> lstData = new ArrayList<SQP05352Filter>(0);
        SQP05352Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP05352(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.VP_OPCION);
            cstmt.setString(3, filter.VP_MODO);
            cstmt.setString(4, filter.VP_PROCESA);
            cstmt.setString(5, filter.VP_IDCON);
            cstmt.setString(6, filter.VP_DTYPE);
            cstmt.setString(7, filter.VP_FDATE1);
            cstmt.setString(8, filter.VP_FDATE2);

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                bean = new SQP05352Filter();
                bean.RN         = rst.getInt("RN");
                bean.CCUST      = rst.getString("CCUST").trim();
                bean.CCUST_0    = rst.getString("CCUST_0").trim();
                bean.HEADER     = rst.getString("HEADER").trim();
                bean.BANDOC     = rst.getString("BANDOC").trim();
                bean.PSTGD      = rst.getString("PSTGD").trim();
                bean.DCONT      = rst.getString("DCONT").trim();
                bean.MODO       = rst.getString("MODO").trim();
                bean.MODO_0     = rst.getString("MODO_0").trim();
                bean.CODPRO     = rst.getString("CODPRO").trim();
                bean.SCURRENCY  = rst.getString("SCURRENCY").trim();
                bean.NETO       = rst.getDouble("NETO");
                bean.STCON      = rst.getString("STCON").trim();
                bean.STCON_0    = rst.getString("STCON_0").trim();
                bean.ITEMS      = rst.getInt("ITEMS");   

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
            }
            rst.close();

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
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public List<SQP05252Filter> getSQP05252Filter(SQP05252Filter filter) throws SQLException, Exception {

        List<SQP05252Filter> lstData = new ArrayList<SQP05252Filter>(0);
        SQP05252Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXISMP.SQP05252(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            //cstmt.setString(1, "134");
            cstmt.setString(2, filter.IN_TIPO);
            cstmt.setString(3, filter.IN_PROCESA);
            cstmt.setInt(4, filter.IN_LEXT);
            cstmt.execute();
            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new SQP05252Filter();
                bean.DETA = rst.getString("DETA").trim();
                lstData.add(bean);
            }
            rst.close();

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
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }
    
    public List<A051> loadProcessors() throws SQLException, Exception {

        List<A051> lista = new ArrayList<>();
        A051 record;
        int i = 1;
        record = new A051();
        
        record.NO = i;
        record.A051KEY1 = "PR";
        record.A051KEY2 = "   ";
        record.A051DESCR1 = "All";
        lista.add(record);
        
        i++;
        
        Statement stmt = null;

        String sql = "SELECT A051KEY1, A051KEY2, A051DESCR1 FROM PRAXIS.A051 WHERE A051KEY1 = 'PR' AND A051KEY2 != '' ORDER BY A051DESCR1";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);
            
            while (rst.next()) {
                record = new A051();
                record.NO = i;
                record.A051KEY1 = rst.getString("A051KEY1").trim();
                record.A051KEY2 = rst.getString("A051KEY2").substring(0,3);
                record.A051DESCR1 = rst.getString("A051DESCR1").trim();
                lista.add(record);
                i++;
            }
            
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
        }

        return lista;
    }
    
    public void updatePending() throws SQLException, Exception {
        
        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL PRAXISMP.STMP001(?,?)}";

        Connection cnx = null;
        
        try {
            
            BufferedReader br = new BufferedReader(new FileReader("D:\\UserFilesMiatech\\gnovoa\\Mis documentos\\Colombia_Reprocesar.csv"));
            String line;
            int i = 0;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(";");
                
                String bandoc = values[0];
                String refd = values[1];
                String dcont = values[2];
                String neto =  values[3];
   
                
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt = cnx.prepareCall(SQLCLL01);
                cstmt.setString(1, bandoc);
                cstmt.setString(2, refd);
                cstmt.execute();
                
                i++;
                if (i % 10 == 0)
                    System.out.println("Line " + i);
            }
            
            br.close();
            
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
        }
    }
}
