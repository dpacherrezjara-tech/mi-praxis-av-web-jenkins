/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A2282Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author 
 */
public class TourismConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public TourismConciliationDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public TourismConciliationDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2282Filter> loadMPF146SQP00905(A2282Filter filter) throws SQLException, Exception {
        List<A2282Filter> list = new ArrayList<>();
        A2282Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblAmount = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS227(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.SDATE.trim());
            cstmt.setString(6, filter.SAGENT.trim());
            cstmt.setString(7, filter.REFER.trim());
            cstmt.setString(8, filter.STVAL.trim());
            cstmt.setString(9, filter.CERROR.trim());
    //        cstmt.setString(7, filter.CERROR.trim());

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rs01 = cstmt.getResultSet();
            if (rs01.next()) {
                dblAmount = rs01.getDouble("AMOUNT");
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2282Filter();
                    objRtn.CCUST = rs01.getString("CCUST").trim();
                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.SAGENT_DESC = rs01.getString("SAGENT_DESC").trim();

                    objRtn.STVAL = rs01.getString("STVAL").trim();
                    objRtn.SVFOPS = rs01.getDouble("SVFOP");
                    objRtn.QTYTRAN1 = rs01.getDouble("QTYTRAN1");
                    objRtn.QTYDOC = rs01.getDouble("QTYDOC");
                    objRtn.REFER = rs01.getString("REFERTUR").trim();
                    objRtn.DATEC = rs01.getString("DATEC").trim();
                    objRtn.TRANC = rs01.getString("TRANC").trim();
                    objRtn.DATCO = rs01.getString("DATCO").trim();
                    objRtn.FREGLA = rs01.getString("FREGLA").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    objRtn.CERROR = rs01.getString("ERROR_DESC").trim();


                    objRtn.FECR = rs01.getString("FECR").trim();
                    objRtn.HOCR = rs01.getString("HOCR").trim();
                    objRtn.USUP = rs01.getString("USUP").trim();
                    objRtn.USCR = rs01.getString("USCR").trim();
                    objRtn.FEUP = rs01.getString("FEUP").trim();
                    objRtn.HOUP = rs01.getString("HOUP").trim();

    //                objRtn.SVFOPA = rs01.getDouble("MONTOADJUST");
                    objRtn.TOTALSVFOP = objRtn.SVFOPS + objRtn.SVFOPA;
                    objRtn.TOTdblAmount = dblAmount;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);              
                }
            }

        } 


        catch (Exception e) {
            e.printStackTrace();
        }
    
    
        finally {
            if (rs01 != null) try { rs01.close(); } catch (SQLException e) { logError.error("Error cerrando rs01", e); }
            if (cstmt != null) try { cstmt.close(); } catch (SQLException e) { logError.error("Error cerrando cstmt", e); }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }
    
        public List<A2282Filter> loadReportMPF147(A2282Filter filter) throws SQLException, Exception {
        List<A2282Filter> list = new ArrayList<>();
        A2282Filter objRtn;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        double dblAmount = 0;

        String SQLCLL01 = "{CALL PRAXISMP.MPS664(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.getFechaActual().substring(0, 4));
            cstmt.setString(3, filter.IN_DATE_FROM.trim());
            cstmt.setString(4, filter.IN_DATE_TO.trim());
            cstmt.setString(5, filter.SDATE.trim());
            cstmt.setString(6, filter.SAGENT.trim());
            cstmt.setString(7, filter.REFER.trim());
            cstmt.setString(8, filter.STVAL.trim());
            cstmt.setString(9, filter.CERROR.trim());
    //        cstmt.setString(7, filter.CERROR.trim());

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rs01 = cstmt.getResultSet();
//            if (rs01.next()) {
//                dblAmount = rs01.getDouble("AMOUNT");
//            }

//            if (cstmt.getMoreResults()) {
//                rs01 = cstmt.getResultSet();
                while (rs01.next()) {
                    objRtn = new A2282Filter();
                    objRtn.CCUST = rs01.getString("CCUST").trim();
                    objRtn.SDATE = rs01.getString("SDATE").trim();
                    objRtn.SAGENT = rs01.getString("SAGENT").trim();
                    objRtn.BANDOC = rs01.getString("BANDOC").trim();
                    objRtn.IDCONT = rs01.getString("IDCONT").trim();
                    objRtn.VALDATE = rs01.getString("VALDATE").trim();
                    objRtn.STCON = rs01.getString("STCON").trim();
                    objRtn.STVALSALE = rs01.getString("STVALSALE").trim();
                    objRtn.STVALSAP = rs01.getString("STVALSAP").trim();
                    objRtn.SVFOPS = rs01.getDouble("SVFOPS");
                    objRtn.SVFOPV = rs01.getDouble("SVFOPV");
                    objRtn.DATECI = rs01.getString("DATECI").trim();
                    objRtn.TRANCI = rs01.getString("TRANCI").trim();
                    objRtn.DESCERR = rs01.getString("DESCERR").trim();

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);              
                }
//            }

        } 


        catch (Exception e) {
                e.printStackTrace();
            }


        finally {
            if (rs01 != null) try { rs01.close(); } catch (SQLException e) { logError.error("Error cerrando rs01", e); }
            if (cstmt != null) try { cstmt.close(); } catch (SQLException e) { logError.error("Error cerrando cstmt", e); }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return list;
    }
   
    
    public List<A2282Filter> loadPX268SQP00907(A2282Filter filter) throws SQLException, Exception {

        List<A2282Filter> lstObjetos = new ArrayList<A2282Filter>(0);
        A2282Filter objRtn;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00907(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                objRtn = new A2282Filter();
                objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                objRtn.PROCIND = rs01.getString("PROCIND").trim();
                if (objRtn.PROCIND.equals("1")) {
                    objRtn.strDescrip = "1 - BILLED ELECTRONICALLY";
                } else if (objRtn.PROCIND.equals("2")) {
                    objRtn.strDescrip = "2 - BILLED ELECTRONICALLY";
                } else if (objRtn.PROCIND.equals("4")) {
                    objRtn.strDescrip = "4 - NOT PRESENTED TO CARD COMPANY";
                } else {
                    objRtn.strDescrip = " ";
                }
                objRtn.TRANSTYPE = rs01.getString("TRANSTYPE").trim();
                if (objRtn.TRANSTYPE.equals("S")) {
                    objRtn.strDescrip2 = "SALES";
                } else if (objRtn.TRANSTYPE.equals("R")) {
                    objRtn.strDescrip2 = "REFUNDS";
                }
                objRtn.CURRENC = rs01.getString("CURRENC").trim();
                objRtn.CREDITCARD = rs01.getString("CREDITCARD").trim();
                objRtn.ISSUEDATE = rs01.getString("ISSUEDATE").trim();
                objRtn.strFecha = Functions.getMonthConvert5(objRtn.ISSUEDATE);
                objRtn.DOCNUM = rs01.getString("AIRLINE").trim() + " " + rs01.getString("DOCNUM").trim();
                objRtn.DOCIND = rs01.getString("DOCIND").trim();
                objRtn.AGENTE = rs01.getString("AGENTE").trim();
                objRtn.APPROVCOD = rs01.getString("APPROVCOD").trim();
                objRtn.EXPDATE = rs01.getString("EXPDATE").trim();
                objRtn.CUSTFILE = rs01.getString("CUSTFILE").trim();
                objRtn.ENTITY = rs01.getString("ENTITY").trim();
                //  objRtn.strDescrip3 = rs01.getString("DES_ENTITY"); 
                objRtn.INVOICENUM = rs01.getString("INVOICENUM").trim();
                objRtn.LCCBREF = rs01.getString("LCCBREF").trim();
                objRtn.MERCHANTNU = rs01.getString("MERCHANTNU").trim();
                objRtn.PERIOD = rs01.getString("PERIODE").trim();
                objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                objRtn.RN = rs01.getLong("TTANSAC");

                lstObjetos.add(objRtn);
            }

            
            
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

        return lstObjetos;
    }
    
    public List<A2282Filter> loadMPF101SQP00909(A2282Filter filter) throws SQLException, Exception {
        List<A2282Filter> list = new ArrayList<>();
        CallableStatement cstmt = null;
        ResultSet rs = null;
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            String sql = "{CALL PRAXISMP.MPS227PAYMENTS(?, ?, ?)}";
            cstmt = cnx.prepareCall(sql);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE);
            cstmt.setString(3, filter.REFER);

            boolean hasResults = cstmt.execute();
            if (hasResults) {
                rs = cstmt.getResultSet();
                while (rs.next()) {
                    A2282Filter item = new A2282Filter();

                    item.TDOC = rs.getString("TDOC");
                    item.STVAL = rs.getString("STVAL");
                    item.SCOUNTRY = rs.getString("SCOUNTRY");
                    item.SDATE = rs.getString("SDATE");
                    item.SAGENT = rs.getString("SAGENT");
                    item.NEGOC = rs.getString("NEGOC");
                    item.MERCHNC = rs.getString("MERCHNC");
                    item.SUCMERCH = rs.getString("SUCMERCH");
                    item.SPNR = rs.getString("SPNR");
                    item.CODPRO = rs.getString("CODPRO");
                    item.PRDA = rs.getString("PRDA");
                    item.PAYDATE = rs.getString("PAYDATE");
                    item.VALDATE = rs.getString("VALDATE");
                    item.SCARCOD = rs.getString("SCARCOD");
                    item.SCARDN = rs.getString("SCARDN");
                    item.SCARDNCOR = rs.getString("SCARDNCOR");
                    item.SAUTHOC = rs.getString("SAUTHOC");
                    item.BANDOC = rs.getString("BANDOC");
                    item.TERMI = rs.getString("TERMI");
                    item.ACCNUMBER = rs.getString("ACCNUMBER");
                    item.QTYTKT = rs.getDouble("QTYTKT");
                    item.FREGLA = rs.getString("FREGLA");
                    item.SCURRENCY = rs.getString("SCURRENCY");
                    item.SVFOP = rs.getString("SVFOP");
                    item.NETO = rs.getDouble("NETO");
                    item.SVFOPC = rs.getDouble("SVFOPC");
                    item.STVALS = rs.getString("STVALS");
                    item.SDATES = rs.getString("SDATES");
                    item.DATECS = rs.getString("DATECS");
                    item.TRANCS = rs.getString("TRANCS");
                    item.DATECI = rs.getString("DATECI");
                    item.TRANCI = rs.getString("TRANCI");
                    item.TRANC = rs.getString("TRANC");
                    item.USCR = rs.getString("USCR");
                    item.HOCR = rs.getString("HOCR");
                    item.USUP = rs.getString("USUP");
                    item.FEUP = rs.getString("FEUP");
                    item.HOUP = rs.getString("HOUP");
                    item.DATECT = rs.getString("DATECT");
                    item.REFER = rs.getString("REFER");
                   

                    list.add(item);
                }
            }

        } finally {
            if (rs != null) try { rs.close(); } catch (Exception e) {}
            if (cstmt != null) try { cstmt.close(); } catch (Exception e) {}
            if (cnx != null) session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return list;
    }
    
    public List<A2282Filter> loadMPF148MPS227(A2282Filter filter) throws SQLException, Exception {
        List<A2282Filter> list = new ArrayList<>();
        CallableStatement cstmt = null;
        ResultSet rs = null;
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            String sql = "{CALL PRAXISMP.MPS227DETAIL(?, ?, ?)}";
            cstmt = cnx.prepareCall(sql);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE);
            cstmt.setString(3, filter.REFER);

            boolean hasResults = cstmt.execute();
            if (hasResults) {
                rs = cstmt.getResultSet();
                while (rs.next()) {
                    A2282Filter item = new A2282Filter();

                    item.TDOC = rs.getString("TDOC");
                    item.BANDOC = rs.getString("BANDOC");
                    item.SCURRENCY = rs.getString("SCURRENCY");
                    item.SVFOPT = rs.getDouble("SVFOP");
                    item.DATECI = rs.getString("DATECI");
                    item.TRANCI = rs.getString("TRANCI");
                    item.DATECT = rs.getString("DATECT");
                    item.REFER = rs.getString("REFERTUR");
                    item.FECR = rs.getString("FECR");
                    item.USCR = rs.getString("USCR");
                    item.HOCR = rs.getString("HOCR");
                   

                    list.add(item);
                }
            }

        } finally {
            if (rs != null) try { rs.close(); } catch (Exception e) {}
            if (cstmt != null) try { cstmt.close(); } catch (Exception e) {}
            if (cnx != null) session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return list;
    }

    public Map<String, List<A2282Filter>> loadMPF101SQP00910(A2282Filter filter) throws SQLException, Exception {
        List<A2282Filter> list1 = new ArrayList<>();
        List<A2282Filter> list2 = new ArrayList<>();
        Map<String, List<A2282Filter>> data = new HashMap();
        CallableStatement cstmt = null;
        ResultSet rs = null;
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();//MPS368
            String sql = "{CALL PRAXISMP.MPS368(?, ?, ?)}";
            cstmt = cnx.prepareCall(sql);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SDATE);
            cstmt.setString(3, filter.SAGENT);

            boolean hasResults = cstmt.execute();
            int resultIndex = 1;

            while (hasResults) {
                rs = cstmt.getResultSet();

                if (resultIndex == 1) {
                    
                    while (rs.next()) {
                        A2282Filter item = new A2282Filter();

                        item.TDOC = rs.getString("TDOC");
                        item.STVAL = rs.getString("STVAL");
                        item.SCOUNTRY = rs.getString("SCOUNTRY");
                        item.SDATE = rs.getString("SDATE");
                        item.SAGENT = rs.getString("SAGENT");
                        item.NEGOC = rs.getString("NEGOC");
                        item.MERCHNC = rs.getString("MERCHNC");
                        item.SUCMERCH = rs.getString("SUCMERCH");
                        item.SPNR = rs.getString("SPNR");
                        item.CODPRO = rs.getString("CODPRO");
                        item.PRDA = rs.getString("PRDA");
                        item.PAYDATE = rs.getString("PAYDATE");
                        item.VALDATE = rs.getString("VALDATE");
                        item.SCARCOD = rs.getString("SCARCOD");
                        item.SCARDN = rs.getString("SCARDN");
                        item.SCARDNCOR = rs.getString("SCARDNCOR");
                        item.SAUTHOC = rs.getString("SAUTHOC");
                        item.BANDOC = rs.getString("BANDOC");
                        item.TERMI = rs.getString("TERMI");
                        item.ACCNUMBER = rs.getString("ACCNUMBER");
                        item.QTYTKT = rs.getDouble("QTYTKT");
                        item.FREGLA = rs.getString("FREGLA");
                        item.SCURRENCY = rs.getString("SCURRENCY");
                        item.SVFOP = rs.getString("SVFOP");
                        item.NETO = rs.getDouble("NETO");
                        item.SVFOPC = rs.getDouble("SVFOPC");
                        item.STVALS = rs.getString("STVALS");
                        item.SDATES = rs.getString("SDATES");
                        item.DATECS = rs.getString("DATECS");
                        item.TRANCS = rs.getString("TRANCS");
                        item.DATECI = rs.getString("DATECI");
                        item.TRANCI = rs.getString("TRANCI");
                        item.TRANC = rs.getString("TRANC");
                        item.USCR = rs.getString("USCR");
                        item.HOCR = rs.getString("HOCR");
                        item.USUP = rs.getString("USUP");
                        item.FEUP = rs.getString("FEUP");
                        item.HOUP = rs.getString("HOUP");
                        item.DATECT = rs.getString("DATECT");
                        item.REFER = rs.getString("REFER");

                        list1.add(item);
                    }

                } else if (resultIndex == 2) {
                    
                    while (rs.next()) {
                        A2282Filter item2 = new A2282Filter();

                        item2.TDOC = rs.getString("TDOC");
                        item2.BANDOC = rs.getString("BANDOC");
                        item2.SCURRENCY = rs.getString("SCURRENCY");
                        item2.SVFOPT = rs.getDouble("SVFOP");
                        item2.DATECI = rs.getString("DATECI");
                        item2.TRANCI = rs.getString("TRANCI");
                        item2.DATECT = rs.getString("DATECT");
                        item2.REFER = rs.getString("REFERTUR");
                        list2.add(item2);
                    }
                }

                rs.close();
                hasResults = cstmt.getMoreResults();
                resultIndex++;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs != null) {
                try {
                    rs.close();
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
        data.put("lista1", list1);
        data.put("lista2", list2);
        return data;
    }
    
    public A2282Filter loadMPF101SQP00911(A2282Filter filter) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2291.
        String strMsj = "SUCCESSFUL. Information Updated.", strCardn = "";
        CallableStatement cstmt = null;
        CallableStatement cstmt2 = null;
        CallableStatement cstmt3 = null;
        Connection cnx = null;
        Connection cnx2 = null;
        Connection cnx3 = null;
        A2282Filter objRpt = new A2282Filter();
        String SQLCLL01 = "{CALL PRAXISMP.MPS369(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);


            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, filter.SDATE.trim());
            cstmt.setString(2, filter.SAGENT.trim());
              
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.VARCHAR);

            cstmt.setInt(3, 1);
            cstmt.setString(4, "");

            cstmt.execute();
            objRpt.VSQLCODE = cstmt.getInt(3);
            objRpt.VMESSAGE = cstmt.getString(4);
            cstmt.close(); // Cerrar el CallableStatement después de cada ejecución

            

        } catch (Exception e) {
            e.printStackTrace();
            strMsj = e.getMessage();
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

        return objRpt;
    }

    
}
