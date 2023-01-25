/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.interline;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1964Filter;
import net.miatech.beans.A1965Filter;

import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.interline.LoadInterlineDAO.pasarGarbageCollector;
import net.miatech.praxis.interline.SFI041;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.SFI022Filter;
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.interline.filter.SFI100Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingPasseInvoicesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingPasseInvoicesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingPasseInvoicesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SFI100Filter> SQP04008(SFI100Filter filter) throws SQLException, Exception {
        List<SFI100Filter> lstRtn = new ArrayList<SFI100Filter>(0);
        SFI100Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totTOHCOM = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04008(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_TFECHA.trim());
            cstmt01.setString(5, filter.IN_TTRAN);
            cstmt01.setString(6, filter.IN_PEREST);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSS");
                totTISC += rs01.getDouble("TISC");
                totTTAX += rs01.getDouble("TTAX");
                totTOHCOM += rs01.getDouble("TOHCOM");
                totHFEEAM += rs01.getDouble("HFEEAM");
                totTUATP += rs01.getDouble("TUATP");
                totTNET += rs01.getDouble("TNET");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI100Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TTRAN = filter.IN_TTRAN;
                    objRtn.IN_PEREST = filter.IN_PEREST;
                    objRtn.IN_TFECHA = filter.IN_TFECHA.trim();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.FCONT = rs01.getString("FCONT");
                    objRtn.DATEPROV = rs01.getString("DATEPROV");
                    
                    if(filter.IN_TFECHA.equals("PD")){
                        objRtn.typeDate = rs01.getString("DATEPROV");
                    }else{
                        objRtn.typeDate = rs01.getString("FCONT");
                    }
                    
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
//                    objRtn.strFormatDate = Functions.getMonthConvert3(objRtn.BDATE);//YYMMDD
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.SOURDES = rs01.getString("SOURDES");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.FECR = rs01.getString("FECR");

                    objRtn.TGROSS = rs01.getDouble("TGROSS");
                    objRtn.TISC = rs01.getDouble("TISC");
                    objRtn.TTAX = rs01.getDouble("TTAX");
                    objRtn.TOHCOM = rs01.getDouble("TOHCOM");
                    objRtn.HFEEAM = rs01.getDouble("HFEEAM");
                    objRtn.TUATP = rs01.getDouble("TUATP");
                    objRtn.TNET = rs01.getDouble("TNET");
                    
                    objRtn.IDCON = rs01.getString("IDCON");

                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTOHCOM = totTOHCOM;
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTNET = totTNET;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    
    public List<A1964Filter> SQP04010(SFI100Filter filter) throws SQLException, Exception {
        List<A1964Filter> lstRtn = new ArrayList<A1964Filter>(0);
        A1964Filter objRtn;
        double totActivo = 0, totPasivo = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04010(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_TFECHA.trim());
            cstmt01.setString(5, filter.IN_TTRAN);
            cstmt01.setString(6, filter.IN_PEREST);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totActivo += rs01.getDouble("A1964ACTIV");
                totPasivo += rs01.getDouble("A1964PASIV");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1964Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_TTRAN = filter.IN_TTRAN;
                    objRtn.IN_PEREST = filter.IN_PEREST;

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.A1964TITU = rs01.getString("A1964TITU");
                    objRtn.CUENTA = rs01.getString("CUENTA");
                    objRtn.A1964CUR = rs01.getString("A1964CUR");
                   

                    objRtn.A1964ACTIV = rs01.getDouble("A1964ACTIV");
                    objRtn.A1964PASIV = rs01.getDouble("A1964PASIV");
                    
                    objRtn.totACTIVO = totActivo;
                    objRtn.totPASIVO = totPasivo;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
    
    public List<A1965Filter> SQP04011(SFI100Filter filter) throws SQLException, Exception {
        List<A1965Filter> lstRtn = new ArrayList<A1965Filter>(0);
        A1965Filter objRtn;
        double totActivo = 0, totPasivo = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04011(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_TFECHA.trim());
            cstmt01.setString(5, filter.IN_TTRAN);
            cstmt01.setString(6, filter.IN_PEREST);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totActivo += rs01.getDouble("A1965ACTIV");
                totPasivo += rs01.getDouble("A1965PASIV");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1965Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
//                    objRtn.IN_TTRAN = filter.IN_TTRAN;
//                    objRtn.IN_PEREST = filter.IN_PEREST;

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.A1965TITU = rs01.getString("A1965TITU");
                    objRtn.CUENTA = rs01.getString("CUENTA");
                    objRtn.A1965CUR = rs01.getString("A1965CUR");

                    objRtn.A1965ACTIV = rs01.getDouble("A1965ACTIV");
                    objRtn.A1965PASIV = rs01.getDouble("A1965PASIV");
                    
                    objRtn.totACTIVO = totActivo;
                    objRtn.totPASIVO = totPasivo;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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

    public List<SFI100Filter> SQP03987(SFI100Filter filter) throws SQLException, Exception {
        List<SFI100Filter> lstRtn = new ArrayList<SFI100Filter>(0);
        SFI100Filter objRtn;
        double totSCREAL = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03987(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_TFECHA.trim());
            cstmt01.setString(5, filter.IN_TTRAN);
            cstmt01.setString(6, filter.IN_PEREST);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SFI100Filter();
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.IN_TTRAN = filter.IN_TTRAN;
                objRtn.IN_PEREST = filter.IN_PEREST;

                objRtn.RN = rs01.getLong("RN");
                objRtn.SOURCECODE = rs01.getString("SOURCECODE");
                objRtn.CONCEPTO = rs01.getString("CONCEPTO");
                objRtn.SCREAL = rs01.getDouble("SCREAL");
                
                totSCREAL = totSCREAL + objRtn.SCREAL;

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
            for (int i = 0; i < lstRtn.size(); i++) {
                lstRtn.get(i).totSCREAL = totSCREAL;
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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

    // --------------------------------------------------------------------------------------------------------------------------
    public List<A1964Filter> loadPX538(A1964Filter filter) throws SQLException, Exception {
        List<A1964Filter> lstRtn = new ArrayList<A1964Filter>(0);
        A1964Filter objRtn;
        double tot_QTY_ACTIV = 0, tot_QTY_PASIV = 0, tot_TOTAL = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PXSQP538(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_A1964TUSO);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                tot_QTY_ACTIV += rs01.getDouble("QTY_ACTIV");
                tot_QTY_PASIV += rs01.getDouble("QTY_PASIV");
                tot_TOTAL += rs01.getDouble("TOTAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1964Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_A1964TUSO = filter.IN_A1964TUSO;

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.A1964FCONT = rs01.getString("A1964FCONT");
                    objRtn.A1964TUSO = rs01.getString("A1964TUSO");
                    objRtn.DES_SOURCOD = rs01.getString("DES_SOURCOD");
                    objRtn.A1964CUR = rs01.getString("A1964CUR");
                    objRtn.QTY_ACTIV = rs01.getDouble("QTY_ACTIV");
                    objRtn.QTY_PASIV = rs01.getDouble("QTY_PASIV");
                    objRtn.TOTAL = rs01.getDouble("TOTAL");

                    objRtn.tot_TOTAL = tot_TOTAL;
                    objRtn.tot_QTY_ACTIV = tot_QTY_ACTIV;
                    objRtn.tot_QTY_PASIV = tot_QTY_PASIV;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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

    public List<A1965Filter> loadPX538_Xpagar(A1964Filter filter) throws SQLException, Exception {
        List<A1965Filter> lstRtn = new ArrayList<A1965Filter>(0);
        A1965Filter objRtn;
        double tot_QTY_ACTIV = 0, tot_QTY_PASIV = 0, tot_TOTAL = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PXSQP538xP(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.A1964TUSO);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                tot_QTY_ACTIV += rs01.getDouble("QTY_ACTIV");
                tot_QTY_PASIV += rs01.getDouble("QTY_PASIV");
                tot_TOTAL += rs01.getDouble("TOTAL");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1965Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.IN_A1965TUSO = filter.IN_A1964TUSO;

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.A1965FCONT = rs01.getString("A1965FCONT");
                    objRtn.A1965TUSO = rs01.getString("A1965TUSO");
                    objRtn.DES_SOURCOD = rs01.getString("DES_SOURCOD");
                    objRtn.A1965CUR = rs01.getString("A1965CUR");
                    objRtn.QTY_ACTIV = rs01.getDouble("QTY_ACTIV");
                    objRtn.QTY_PASIV = rs01.getDouble("QTY_PASIV");
                    objRtn.TOTAL = rs01.getDouble("TOTAL");

                    objRtn.tot_TOTAL = tot_TOTAL;
                    objRtn.tot_QTY_ACTIV = tot_QTY_ACTIV;
                    objRtn.tot_QTY_PASIV = tot_QTY_PASIV;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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

    public List<SFI020Filter> loadPX538_excel(SFI020Filter filter) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PXSQP538_EX(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.SOURCOD);

            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI020Filter();
//                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
//                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
//                objRtn.IN_A1964TUSO = filter.IN_A1964TUSO;
//
//                objRtn.RN = rs01.getLong("RN");
                objRtn.BDATE = rs01.getString("CLEATING_DATE");
                objRtn.PERNUM = rs01.getString("PERIODO");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                objRtn.REASCOD = rs01.getString("REASON_CODE");

                objRtn.AIRNUM = rs01.getString("TKT_ISSUING_AIRLINE");
                objRtn.TKTNUM = rs01.getString("TKTNUM");
                objRtn.CPNNUM = rs01.getString("CPNNUM");

                objRtn.GROSS = rs01.getDouble("GROSS_AMOUNT");
                objRtn.ISCCH = rs01.getDouble("ISCCH");
                objRtn.ISC_AMOUNT = rs01.getDouble("ISC_AMOUNT");
                objRtn.TAX = rs01.getDouble("TAX_AMOUNT");
                objRtn.OTHCOMAM = rs01.getDouble("OTHER_COMMISION");
                objRtn.HFEEAM = rs01.getDouble("HANDLING_FREE");
                objRtn.UATPAMT = rs01.getDouble("UATP_AMOUNT");
                objRtn.CPNTAM = rs01.getDouble("CPNTAM");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
            //  System.out.println( e.getMessage());
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
