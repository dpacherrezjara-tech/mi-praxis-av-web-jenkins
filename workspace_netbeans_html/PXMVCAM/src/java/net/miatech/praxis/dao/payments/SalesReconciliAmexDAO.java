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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.program.ProMasterTicketDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A4113Filter;
import net.miatech.praxis.payment.filter.A4114Filter;
import net.miatech.praxis.payment.filter.A4115Filter;
import net.miatech.praxis.payment.filter.A4116Filter;
import net.miatech.praxis.payment.filter.A4117Filter;
import net.miatech.praxis.payment.filter.A4118Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class SalesReconciliAmexDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesReconciliAmexDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesReconciliAmexDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4113Filter> loadPX570SQP04378(A4113Filter filter) throws SQLException, Exception {

        List<A4113Filter> lstTkts = new ArrayList<A4113Filter>(0);
        A4113Filter beanTkt;
        double totPNETAMOU = 0, totPGROSAMOU = 0, totPDISCAMOU = 0, totPSFEEAMOU = 0, totODBALAMOU = 0, totNETAMOUNC = 0;
        double totPADJAMOUN = 0, totPTAXAMOU = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0;
        double totSFEEAMOUNC = 0, totADJAMOUNC = 0;
        double totTAXAMOUNC = 0, totODBALAMOUC = 0;

        double totDIFF_PGROSAMOU = 0, totDIFF_PDISCAMOU = 0;
        double totDIFF_PSFEEAMOU = 0, totDIFF_PADJAMOUN = 0;
        double totDIFF_PTAXAMOU = 0, totDIFF_ODBALAMOU = 0;
        double totDIFF_PNETAMOU = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04378(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_ZONA_SUMM.trim());
            cstmt.setString(6, filter.IN_SCOUNTRY_SUMM.trim());
            //cstmt.setString(5, filter.IN_CERROIN);
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totPNETAMOU = rst.getDouble("PNETAMOU");
                totPGROSAMOU = rst.getDouble("PGROSAMOU");
                totPDISCAMOU = rst.getDouble("PDISCAMOU");
                totPSFEEAMOU = rst.getDouble("PSFEEAMOU");
                totPADJAMOUN = rst.getDouble("PADJAMOUN");
                totPTAXAMOU = rst.getDouble("PTAXAMOU");
                totODBALAMOU = rst.getDouble("ODBALAMOU");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totADJAMOUNC = rst.getDouble("ADJAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totODBALAMOUC = rst.getDouble("ODBALAMOUC");

                //Diferencias
                totDIFF_PGROSAMOU = totPGROSAMOU - totGROSAMOUNC;
                totDIFF_PDISCAMOU = totPDISCAMOU - totDISCAMOUNC;
                totDIFF_PSFEEAMOU = totPSFEEAMOU - totSFEEAMOUNC;
                totDIFF_PADJAMOUN = totPADJAMOUN - totADJAMOUNC;
                totDIFF_PTAXAMOU = totPTAXAMOU - totTAXAMOUNC;
                totDIFF_ODBALAMOU = totODBALAMOU - totODBALAMOUC;
                totDIFF_PNETAMOU = totPNETAMOU - totNETAMOUNC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4113Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();

                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();

                    beanTkt.PNETAMOU = rst.getDouble("PNETAMOU");
                    beanTkt.PGROSAMOU = rst.getDouble("PGROSAMOU");
                    beanTkt.PDISCAMOU = this.cambioSigno(beanTkt.PGROSAMOU, rst.getDouble("PDISCAMOU"));
                    beanTkt.PTAXAMOU = this.mantenerSigno(beanTkt.PDISCAMOU, rst.getDouble("PTAXAMOU"));
                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();

                    beanTkt.PSFEEAMOU = rst.getDouble("PSFEEAMOU");
                    beanTkt.PADJAMOUN = rst.getDouble("PADJAMOUN");
                    beanTkt.ODBALAMOU = rst.getDouble("ODBALAMOU");
                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.GROSAMOUNC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.TAXAMOUNC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("TAXAMOUNC"));

                    beanTkt.SFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                    beanTkt.ADJAMOUNC = rst.getDouble("ADJAMOUNC");
                    beanTkt.ODBALAMOUC = rst.getDouble("ODBALAMOUC");

                    //Diferencias
                    beanTkt.DIFF_PGROSAMOU = beanTkt.PGROSAMOU - beanTkt.GROSAMOUNC;
                    beanTkt.DIFF_PDISCAMOU = beanTkt.PDISCAMOU - beanTkt.DISCAMOUNC;
                    beanTkt.DIFF_PSFEEAMOU = beanTkt.PSFEEAMOU - beanTkt.SFEEAMOUNC;
                    beanTkt.DIFF_PADJAMOUN = beanTkt.PADJAMOUN - beanTkt.ADJAMOUNC;
                    beanTkt.DIFF_PTAXAMOU = beanTkt.PTAXAMOU - beanTkt.TAXAMOUNC;
                    beanTkt.DIFF_ODBALAMOU = beanTkt.ODBALAMOU - beanTkt.ODBALAMOUC;
                    beanTkt.DIFF_PNETAMOU = beanTkt.PNETAMOU - beanTkt.NETAMOUNC;

                    //TOTALEs
                    beanTkt.totPNETAMOU = totPNETAMOU;
                    beanTkt.totPGROSAMOU = totPGROSAMOU;
                    beanTkt.totPDISCAMOU = this.cambioSigno(beanTkt.totPGROSAMOU, totPDISCAMOU);
                    beanTkt.totPTAXAMOU = this.mantenerSigno(beanTkt.totPDISCAMOU, totPTAXAMOU);
                    beanTkt.totPSFEEAMOU = totPSFEEAMOU;
                    beanTkt.totPADJAMOUN = totPADJAMOUN;
                    beanTkt.totODBALAMOU = totODBALAMOU;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = this.cambioSigno(beanTkt.totGROSAMOUNC, totDISCAMOUNC);
                    beanTkt.totTAXAMOUNC = this.mantenerSigno(beanTkt.totDISCAMOUNC, totTAXAMOUNC);
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totADJAMOUNC = totADJAMOUNC;
                    beanTkt.totODBALAMOUC = totODBALAMOUC;

                    //Diferencia en totales
                    beanTkt.totDIFF_PGROSAMOU = totDIFF_PGROSAMOU;
                    beanTkt.totDIFF_PDISCAMOU = totDIFF_PDISCAMOU;
                    beanTkt.totDIFF_PSFEEAMOU = totDIFF_PSFEEAMOU;
                    beanTkt.totDIFF_PADJAMOUN = totDIFF_PADJAMOUN;
                    beanTkt.totDIFF_PTAXAMOU = totDIFF_PTAXAMOU;
                    beanTkt.totDIFF_ODBALAMOU = totDIFF_ODBALAMOU;
                    beanTkt.totDIFF_PNETAMOU = totDIFF_PNETAMOU;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4113Filter> loadPX570SQP04257(A4113Filter filter) throws SQLException, Exception {

        List<A4113Filter> lstTkts = new ArrayList<A4113Filter>(0);
        A4113Filter beanTkt;
        double totPNETAMOU = 0, totPGROSAMOU = 0, totPDISCAMOU = 0, totPSFEEAMOU = 0, totODBALAMOU = 0, totNETAMOUNC = 0;
        double totPADJAMOUN = 0, totPTAXAMOU = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0;
        double totSFEEAMOUNC = 0, totADJAMOUNC = 0;
        double totTAXAMOUNC = 0, totODBALAMOUC = 0;

        double totDIFF_PGROSAMOU = 0, totDIFF_PDISCAMOU = 0;
        double totDIFF_PSFEEAMOU = 0, totDIFF_PADJAMOUN = 0;
        double totDIFF_PTAXAMOU = 0, totDIFF_ODBALAMOU = 0;
        double totDIFF_PNETAMOU = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04257(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE);
            cstmt.setString(3, filter.IN_PCURRENCY);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.SCOUNTRY);
            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totPNETAMOU = rst.getDouble("PNETAMOU");
                totPGROSAMOU = rst.getDouble("PGROSAMOU");
                totPDISCAMOU = rst.getDouble("PDISCAMOU");
                totPSFEEAMOU = rst.getDouble("PSFEEAMOU");
                totPADJAMOUN = rst.getDouble("PADJAMOUN");
                totPTAXAMOU = rst.getDouble("PTAXAMOU");
                totODBALAMOU = rst.getDouble("ODBALAMOU");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totADJAMOUNC = rst.getDouble("ADJAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totODBALAMOUC = rst.getDouble("ODBALAMOUC");

                //Diferencias
                totDIFF_PGROSAMOU = totPGROSAMOU - totGROSAMOUNC;
                totDIFF_PDISCAMOU = totPDISCAMOU - totDISCAMOUNC;
                totDIFF_PSFEEAMOU = totPSFEEAMOU - totSFEEAMOUNC;
                totDIFF_PADJAMOUN = totPADJAMOUN - totADJAMOUNC;
                totDIFF_PTAXAMOU = totPTAXAMOU - totTAXAMOUNC;
                totDIFF_ODBALAMOU = totODBALAMOU - totODBALAMOUC;
                //totDIFF_PNETAMOU = totDIFF_PGROSAMOU + totDIFF_PDISCAMOU + totDIFF_PSFEEAMOU + totDIFF_PADJAMOUN + totDIFF_PTAXAMOU + totDIFF_ODBALAMOU + totDIFF_PNETAMOU;
                totDIFF_PNETAMOU = totPNETAMOU - totNETAMOUNC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4113Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();

                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.PMERCHID = rst.getString("PMERCHID").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    beanTkt.DES_CERROR = rst.getString("DES_CERROR").trim();

                    beanTkt.PNETAMOU = rst.getDouble("PNETAMOU");
                    beanTkt.PGROSAMOU = rst.getDouble("PGROSAMOU");
                    beanTkt.PDISCAMOU = this.cambioSigno(beanTkt.PGROSAMOU, rst.getDouble("PDISCAMOU"));
                    beanTkt.PTAXAMOU = this.mantenerSigno(beanTkt.PDISCAMOU, rst.getDouble("PTAXAMOU"));

                    beanTkt.PSFEEAMOU = rst.getDouble("PSFEEAMOU");
                    beanTkt.PADJAMOUN = rst.getDouble("PADJAMOUN");
                    beanTkt.ODBALAMOU = rst.getDouble("ODBALAMOU");
                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.GROSAMOUNC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.TAXAMOUNC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("TAXAMOUNC"));

                    beanTkt.SFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                    beanTkt.ADJAMOUNC = rst.getDouble("ADJAMOUNC");
                    beanTkt.ODBALAMOUC = rst.getDouble("ODBALAMOUC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    beanTkt.RATECOMBA = rst.getDouble("RATECOMBA");
                    beanTkt.RATECOMBAC = rst.getDouble("RATECOMBAC");
                    beanTkt.RATECOMSM = rst.getDouble("RATECOMSM");
                    beanTkt.RATEIVABA = rst.getDouble("RATEIVABA");
                    beanTkt.RATEIVABAC = rst.getDouble("RATEIVABAC");
                    beanTkt.RATECOMSMC = rst.getDouble("RATECOMSM");

                    //Diferencias
                    beanTkt.DIFF_PGROSAMOU = beanTkt.PGROSAMOU - beanTkt.GROSAMOUNC;
                    beanTkt.DIFF_PDISCAMOU = beanTkt.PDISCAMOU - beanTkt.DISCAMOUNC;
                    beanTkt.DIFF_PSFEEAMOU = beanTkt.PSFEEAMOU - beanTkt.SFEEAMOUNC;
                    beanTkt.DIFF_PADJAMOUN = beanTkt.PADJAMOUN - beanTkt.ADJAMOUNC;
                    beanTkt.DIFF_PTAXAMOU = beanTkt.PTAXAMOU - beanTkt.TAXAMOUNC;
                    beanTkt.DIFF_ODBALAMOU = beanTkt.ODBALAMOU - beanTkt.ODBALAMOUC;
                    //beanTkt.DIFF_PNETAMOU = beanTkt.DIFF_PGROSAMOU + beanTkt.DIFF_PDISCAMOU + beanTkt.DIFF_PSFEEAMOU + beanTkt.DIFF_PADJAMOUN + beanTkt.DIFF_PTAXAMOU + beanTkt.DIFF_ODBALAMOU;
                    beanTkt.DIFF_PNETAMOU = beanTkt.PNETAMOU - beanTkt.NETAMOUNC;
                    //TOTALEs
                    beanTkt.totPNETAMOU = totPNETAMOU;
                    beanTkt.totPGROSAMOU = totPGROSAMOU;
                    beanTkt.totPDISCAMOU = this.cambioSigno(beanTkt.totPGROSAMOU, totPDISCAMOU);
                    beanTkt.totPTAXAMOU = this.mantenerSigno(beanTkt.totPDISCAMOU, totPTAXAMOU);
                    beanTkt.totPSFEEAMOU = totPSFEEAMOU;
                    beanTkt.totPADJAMOUN = totPADJAMOUN;
                    beanTkt.totODBALAMOU = totODBALAMOU;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = this.cambioSigno(beanTkt.totGROSAMOUNC, totDISCAMOUNC);
                    beanTkt.totTAXAMOUNC = this.mantenerSigno(beanTkt.totDISCAMOUNC, totTAXAMOUNC);
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totADJAMOUNC = totADJAMOUNC;
                    beanTkt.totODBALAMOUC = totODBALAMOUC;

                    //Diferencia en totales
                    beanTkt.totDIFF_PGROSAMOU = totDIFF_PGROSAMOU;
                    beanTkt.totDIFF_PDISCAMOU = totDIFF_PDISCAMOU;
                    beanTkt.totDIFF_PSFEEAMOU = totDIFF_PSFEEAMOU;
                    beanTkt.totDIFF_PADJAMOUN = totDIFF_PADJAMOUN;
                    beanTkt.totDIFF_PTAXAMOU = totDIFF_PTAXAMOU;
                    beanTkt.totDIFF_ODBALAMOU = totDIFF_ODBALAMOU;
                    beanTkt.totDIFF_PNETAMOU = totDIFF_PNETAMOU;

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4113Filter> loadPX570SQP04329(A4113Filter filter) throws SQLException, Exception {
        List<A4113Filter> lstTkts = new ArrayList<A4113Filter>(0);
        A4113Filter beanTkt;
        double totPNETAMOU = 0, totPGROSAMOU = 0, totPDISCAMOU = 0, totPSFEEAMOU = 0, totODBALAMOU = 0, totNETAMOUNC = 0;
        double totPADJAMOUN = 0, totPTAXAMOU = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0;
        double totSFEEAMOUNC = 0, totADJAMOUNC = 0;
        double totTAXAMOUNC = 0, totODBALAMOUC = 0;

        double totDIFF_PGROSAMOU = 0, totDIFF_PDISCAMOU = 0;
        double totDIFF_PSFEEAMOU = 0, totDIFF_PADJAMOUN = 0;
        double totDIFF_PTAXAMOU = 0, totDIFF_ODBALAMOU = 0;
        double totDIFF_PNETAMOU = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04329(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE);
            cstmt.setString(3, "PAYDATE");
            cstmt.setString(4, filter.AXPAYNBR);
            cstmt.setString(5, filter.PMERCHID);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totPNETAMOU = rst.getDouble("PNETAMOU");
                totPGROSAMOU = rst.getDouble("PGROSAMOU");
                totPDISCAMOU = rst.getDouble("PDISCAMOU");
                totPSFEEAMOU = rst.getDouble("PSFEEAMOU");
                totPADJAMOUN = rst.getDouble("PADJAMOUN");
                totPTAXAMOU = rst.getDouble("PTAXAMOU");
                totODBALAMOU = rst.getDouble("ODBALAMOU");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totADJAMOUNC = rst.getDouble("ADJAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totODBALAMOUC = rst.getDouble("ODBALAMOUC");

                //Diferencias
                totDIFF_PGROSAMOU = totPGROSAMOU - totGROSAMOUNC;
                totDIFF_PDISCAMOU = totPDISCAMOU - totDISCAMOUNC;
                totDIFF_PSFEEAMOU = totPSFEEAMOU - totSFEEAMOUNC;
                totDIFF_PADJAMOUN = totPADJAMOUN - totADJAMOUNC;
                totDIFF_PTAXAMOU = totPTAXAMOU - totTAXAMOUNC;
                totDIFF_ODBALAMOU = totODBALAMOU - totODBALAMOUC;
                totDIFF_PNETAMOU = totPNETAMOU - totNETAMOUNC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4113Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();

                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.PMERCHID = rst.getString("PMERCHID").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();

                    beanTkt.PNETAMOU = rst.getDouble("PNETAMOU");
                    beanTkt.PGROSAMOU = rst.getDouble("PGROSAMOU");
                    beanTkt.PDISCAMOU = this.cambioSigno(beanTkt.PGROSAMOU, rst.getDouble("PDISCAMOU"));
                    beanTkt.PTAXAMOU = this.mantenerSigno(beanTkt.PDISCAMOU, rst.getDouble("PTAXAMOU"));

                    beanTkt.PSFEEAMOU = rst.getDouble("PSFEEAMOU");
                    beanTkt.PADJAMOUN = rst.getDouble("PADJAMOUN");
                    beanTkt.ODBALAMOU = rst.getDouble("ODBALAMOU");

                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.GROSAMOUNC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.TAXAMOUNC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("TAXAMOUNC"));

                    beanTkt.SFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                    beanTkt.ADJAMOUNC = rst.getDouble("ADJAMOUNC");
                    beanTkt.ODBALAMOUC = rst.getDouble("ODBALAMOUC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    beanTkt.RATECOMBA = rst.getDouble("RATECOMBA");
                    beanTkt.RATECOMBAC = rst.getDouble("RATECOMBAC");
                    beanTkt.RATEIVABA = rst.getDouble("RATEIVABA");
                    beanTkt.RATEIVABAC = rst.getDouble("RATEIVABAC");

                    //Diferencias
                    beanTkt.DIFF_PGROSAMOU = beanTkt.PGROSAMOU - beanTkt.GROSAMOUNC;
                    beanTkt.DIFF_PDISCAMOU = beanTkt.PDISCAMOU - beanTkt.DISCAMOUNC;
                    beanTkt.DIFF_PSFEEAMOU = beanTkt.PSFEEAMOU - beanTkt.SFEEAMOUNC;
                    beanTkt.DIFF_PADJAMOUN = beanTkt.PADJAMOUN - beanTkt.ADJAMOUNC;
                    beanTkt.DIFF_PTAXAMOU = beanTkt.PTAXAMOU - beanTkt.TAXAMOUNC;
                    beanTkt.DIFF_ODBALAMOU = beanTkt.ODBALAMOU - beanTkt.ODBALAMOUC;
                    beanTkt.DIFF_PNETAMOU = beanTkt.PNETAMOU - beanTkt.NETAMOUNC;

                    //TOTALEs
                    beanTkt.totPNETAMOU = totPNETAMOU;
                    beanTkt.totPGROSAMOU = totPGROSAMOU;
                    beanTkt.totPDISCAMOU = this.cambioSigno(beanTkt.totPGROSAMOU, totPDISCAMOU);
                    beanTkt.totPTAXAMOU = this.mantenerSigno(beanTkt.totPDISCAMOU, totPTAXAMOU);
                    beanTkt.totPSFEEAMOU = totPSFEEAMOU;
                    beanTkt.totPADJAMOUN = totPADJAMOUN;
                    beanTkt.totODBALAMOU = totODBALAMOU;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = this.cambioSigno(beanTkt.totGROSAMOUNC, totDISCAMOUNC);
                    beanTkt.totTAXAMOUNC = this.mantenerSigno(beanTkt.totDISCAMOUNC, totTAXAMOUNC);
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totADJAMOUNC = totADJAMOUNC;
                    beanTkt.totODBALAMOUC = totODBALAMOUC;

                    //Diferencia en totales
                    beanTkt.totDIFF_PGROSAMOU = totDIFF_PGROSAMOU;
                    beanTkt.totDIFF_PDISCAMOU = totDIFF_PDISCAMOU;
                    beanTkt.totDIFF_PSFEEAMOU = totDIFF_PSFEEAMOU;
                    beanTkt.totDIFF_PADJAMOUN = totDIFF_PADJAMOUN;
                    beanTkt.totDIFF_PTAXAMOU = totDIFF_PTAXAMOU;
                    beanTkt.totDIFF_ODBALAMOU = totDIFF_ODBALAMOU;
                    beanTkt.totDIFF_PNETAMOU = totDIFF_PNETAMOU;

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4113Filter> loadPX570SQP04330(A4113Filter filter) throws SQLException, Exception {

        List<A4113Filter> lstTkts = new ArrayList<A4113Filter>(0);
        A4113Filter beanTkt;
        double totPNETAMOU = 0, totPGROSAMOU = 0, totPDISCAMOU = 0, totPSFEEAMOU = 0, totODBALAMOU = 0, totNETAMOUNC = 0;
        double totPADJAMOUN = 0, totPTAXAMOU = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0;
        double totSFEEAMOUNC = 0, totADJAMOUNC = 0;
        double totTAXAMOUNC = 0, totODBALAMOUC = 0;

        double totDIFF_PGROSAMOU = 0, totDIFF_PDISCAMOU = 0;
        double totDIFF_PSFEEAMOU = 0, totDIFF_PADJAMOUN = 0;
        double totDIFF_PTAXAMOU = 0, totDIFF_ODBALAMOU = 0;
        double totDIFF_PNETAMOU = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04330(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totPNETAMOU = rst.getDouble("PNETAMOU");
                totPGROSAMOU = rst.getDouble("PGROSAMOU");
                totPDISCAMOU = rst.getDouble("PDISCAMOU");
                totPSFEEAMOU = rst.getDouble("PSFEEAMOU");
                totPADJAMOUN = rst.getDouble("PADJAMOUN");
                totPTAXAMOU = rst.getDouble("PTAXAMOU");
                totODBALAMOU = rst.getDouble("ODBALAMOU");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totADJAMOUNC = rst.getDouble("ADJAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totODBALAMOUC = rst.getDouble("ODBALAMOUC");

                //Diferencias
                totDIFF_PGROSAMOU = totPGROSAMOU - totGROSAMOUNC;
                totDIFF_PDISCAMOU = totPDISCAMOU - totDISCAMOUNC;
                totDIFF_PSFEEAMOU = totPSFEEAMOU - totSFEEAMOUNC;
                totDIFF_PADJAMOUN = totPADJAMOUN - totADJAMOUNC;
                totDIFF_PTAXAMOU = totPTAXAMOU - totTAXAMOUNC;
                totDIFF_ODBALAMOU = totODBALAMOU - totODBALAMOUC;
                totDIFF_PNETAMOU = totPNETAMOU - totNETAMOUNC;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4113Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.PMERCHID = rst.getString("PMERCHID").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();

                    beanTkt.PNETAMOU = rst.getDouble("PNETAMOU");
                    beanTkt.PGROSAMOU = rst.getDouble("PGROSAMOU");
                    beanTkt.PDISCAMOU = this.cambioSigno(beanTkt.PGROSAMOU, rst.getDouble("PDISCAMOU"));
                    beanTkt.PTAXAMOU = this.mantenerSigno(beanTkt.PDISCAMOU, rst.getDouble("PTAXAMOU"));

                    beanTkt.PSFEEAMOU = rst.getDouble("PSFEEAMOU");
                    beanTkt.PADJAMOUN = rst.getDouble("PADJAMOUN");
                    beanTkt.ODBALAMOU = rst.getDouble("ODBALAMOU");

                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.GROSAMOUNC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.TAXAMOUNC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("TAXAMOUNC"));

                    beanTkt.SFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                    beanTkt.ADJAMOUNC = rst.getDouble("ADJAMOUNC");
                    beanTkt.ODBALAMOUC = rst.getDouble("ODBALAMOUC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    beanTkt.RATECOMBA = rst.getDouble("RATECOMBA");
                    beanTkt.RATECOMBAC = rst.getDouble("RATECOMBAC");
                    beanTkt.RATEIVABA = rst.getDouble("RATEIVABA");
                    beanTkt.RATEIVABAC = rst.getDouble("RATEIVABAC");

                    //Diferencias
                    beanTkt.DIFF_PGROSAMOU = beanTkt.PGROSAMOU - beanTkt.GROSAMOUNC;
                    beanTkt.DIFF_PDISCAMOU = beanTkt.PDISCAMOU - beanTkt.DISCAMOUNC;
                    beanTkt.DIFF_PSFEEAMOU = beanTkt.PSFEEAMOU - beanTkt.SFEEAMOUNC;
                    beanTkt.DIFF_PADJAMOUN = beanTkt.PADJAMOUN - beanTkt.ADJAMOUNC;
                    beanTkt.DIFF_PTAXAMOU = beanTkt.PTAXAMOU - beanTkt.TAXAMOUNC;
                    beanTkt.DIFF_ODBALAMOU = beanTkt.ODBALAMOU - beanTkt.ODBALAMOUC;
                    beanTkt.DIFF_PNETAMOU = beanTkt.PNETAMOU - beanTkt.NETAMOUNC;

                    //TOTALEs
                    beanTkt.totPNETAMOU = totPNETAMOU;
                    beanTkt.totPGROSAMOU = totPGROSAMOU;
                    beanTkt.totPDISCAMOU = this.cambioSigno(beanTkt.totPGROSAMOU, totPDISCAMOU);
                    beanTkt.totPTAXAMOU = this.mantenerSigno(beanTkt.totPDISCAMOU, totPTAXAMOU);
                    beanTkt.totPSFEEAMOU = totPSFEEAMOU;
                    beanTkt.totPADJAMOUN = totPADJAMOUN;
                    beanTkt.totODBALAMOU = totODBALAMOU;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = this.cambioSigno(beanTkt.totGROSAMOUNC, totDISCAMOUNC);
                    beanTkt.totTAXAMOUNC = this.mantenerSigno(beanTkt.totDISCAMOUNC, totTAXAMOUNC);
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totADJAMOUNC = totADJAMOUNC;
                    beanTkt.totODBALAMOUC = totODBALAMOUC;

                    //Diferencia en totales
                    beanTkt.totDIFF_PGROSAMOU = totDIFF_PGROSAMOU;
                    beanTkt.totDIFF_PDISCAMOU = totDIFF_PDISCAMOU;
                    beanTkt.totDIFF_PSFEEAMOU = totDIFF_PSFEEAMOU;
                    beanTkt.totDIFF_PADJAMOUN = totDIFF_PADJAMOUN;
                    beanTkt.totDIFF_PTAXAMOU = totDIFF_PTAXAMOU;
                    beanTkt.totDIFF_ODBALAMOU = totDIFF_ODBALAMOU;
                    beanTkt.totDIFF_PNETAMOU = totDIFF_PNETAMOU;

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    if (beanTkt.DIFF_PNETAMOU != 0) {
                        lstTkts.add(beanTkt);
                    }
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4115Filter> loadPX570SQP04269(A4115Filter filter) throws SQLException, Exception {

        List<A4115Filter> lstTkts = new ArrayList<A4115Filter>(0);
        A4115Filter beanTkt, filaTotal, filaAdjustment;
        double totSGROSAMOS = 0, totGROSAMOUN = 0, totDISCAMOUN = 0, totTAXAMOUN = 0, totNETAMOUN = 0, totSDGROSSA = 0, totSCGROSSA = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0, totTAXAMOUNC = 0, totNETAMOUNC = 0, totTRANCOUNTC = 0, totTRANCOUNT = 0, totINSTANBR = 0;
        double totalParcial = 0;
        String merchID = "";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04269(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_MERCHID);
            cstmt.setString(6, filter.IN_AXPAYNBR);
            cstmt.setString(7, filter.IN_PCURRENCY);
            cstmt.setString(8, filter.strDATE);
            cstmt.setString(9, filter.SCOUNTRY);
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totSGROSAMOS = rst.getDouble("SGROSAMOS");
                totGROSAMOUN = rst.getDouble("GROSAMOUN");
                totDISCAMOUN = rst.getDouble("DISCAMOUN");
                totTAXAMOUN = rst.getDouble("TAXAMOUN");
                totNETAMOUN = rst.getDouble("NETAMOUN");
                totalParcial = totNETAMOUN;
                totNETAMOUN = totNETAMOUN + filter.IN_PADJAMOUN;
                totSDGROSSA = rst.getDouble("SDGROSSA");
                totSCGROSSA = rst.getDouble("SCGROSSA");

                totTRANCOUNT = rst.getDouble("TRANCOUNT");
                totINSTANBR = rst.getDouble("INSTANBR");

                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totTRANCOUNTC = rst.getDouble("TRANCOUNTC");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4115Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();

                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    merchID = beanTkt.MERCHID;
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.SIREFNBR = rst.getString("SIREFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                    beanTkt.SGROSAMOS = rst.getDouble("SGROSAMOS");
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.GROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.TAXAMOUN = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("TAXAMOUN"));

                    beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                    beanTkt.SDGROSSA = rst.getDouble("SDGROSSA");
                    beanTkt.SCGROSSA = rst.getDouble("SCGROSSA");

                    beanTkt.TRANCOUNT = rst.getDouble("TRANCOUNT");
                    beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                    beanTkt.OSETDATE = rst.getString("OSETDATE").trim();

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.GROSAMOUNC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.TAXAMOUNC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("TAXAMOUNC"));

                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                    beanTkt.TRANCOUNTC = rst.getDouble("TRANCOUNTC");

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.totSGROSAMOS = totSGROSAMOS;
                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totDISCAMOUN = this.cambioSigno(beanTkt.totGROSAMOUN, totDISCAMOUN);
                    beanTkt.totTAXAMOUN = this.mantenerSigno(beanTkt.totDISCAMOUN, totTAXAMOUN);
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totSDGROSSA = totSDGROSSA;
                    beanTkt.totSCGROSSA = totSCGROSSA;

                    beanTkt.totTRANCOUNT = totTRANCOUNT;
                    beanTkt.totINSTANBR = totINSTANBR;

                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = this.cambioSigno(beanTkt.totGROSAMOUNC, totDISCAMOUNC);
                    beanTkt.totTAXAMOUNC = this.mantenerSigno(beanTkt.totDISCAMOUNC, totTAXAMOUNC);
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totTRANCOUNTC = totTRANCOUNTC;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
            }
            if (filter.IN_PADJAMOUN != 0) {
                filaTotal = new A4115Filter();
                filaTotal.MERCHID = merchID;
                filaTotal.desCERROR = "Sub Total";
                filaTotal.NETAMOUN = totalParcial;
                lstTkts.add(filaTotal);

                filaAdjustment = new A4115Filter();
                filaAdjustment.MERCHID = merchID;
                filaAdjustment.desCERROR = "Adjustment";
                filaAdjustment.NETAMOUN = filter.IN_PADJAMOUN;
                lstTkts.add(filaAdjustment);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04270(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        double lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0, total = 0;
        double lngTotQTYTRA = 0, lngTotQTYDOC = 0;
        double TGROSAMOUN_TOTAL = 0;
        double TGROSAMOUNC_TOTAL = 0;
        double DISCAMOUN_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double SFEEAMOU_TOTAL = 0;
        double ACCEAMOUC_TOTAL = 0;
        double ACCEAMOU_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04270(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_MERCHID);
            cstmt.setString(6, filter.IN_AXPAYNBR);
            cstmt.setString(7, filter.IN_PCURRENCY);
            cstmt.setString(8, filter.strDATE);
            cstmt.setString(9, filter.IN_IDITEMS);
            cstmt.setString(10, filter.SCOUNTRY);
            cstmt.setInt(11, filter.page.PAGNUM);
            cstmt.setInt(12, filter.page.PAGROW);
            cstmt.setInt(13, filter.page.TOTPAG);
            cstmt.setInt(14, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(11);
            filter.page.PAGROW = cstmt.getInt(12);
            filter.page.TOTPAG = cstmt.getInt(13);
            filter.page.TOTROW = cstmt.getInt(14);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TGROSAMOUN_TOTAL = rst.getDouble("TGROSAMOUN_TOTAL");
                TGROSAMOUNC_TOTAL = rst.getDouble("TGROSAMOUNC_TOTAL");
                DISCAMOUN_TOTAL = rst.getDouble("DISCAMOUN_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                SFEEAMOU_TOTAL = rst.getDouble("SFEEAMOU_TOTAL");
                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                ACCEAMOU_TOTAL = rst.getDouble("ACCEAMOU_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_IDITEMS = filter.IN_IDITEMS.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();

                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.SIREFNBR = rst.getString("SIREFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();

                    beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SELLERID = rst.getString("SELLERID").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");

                    beanTkt.TRANSDATE = rst.getString("TRANSDATE");
                    beanTkt.TRANSID = rst.getString("TRANSID");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                    beanTkt.INSTANBR = rst.getString("INSTANBR");
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.FINSAMOUC = rst.getDouble("FINSAMOUC");
                    beanTkt.SINSAMOUC = rst.getDouble("SINSAMOUC");

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.DISCAMOUNI = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("DISCAMOUNI"));

                    if (rst.getDouble("DISCRATEI") < 0) {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI") * -1;
                    } else {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    }

                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.TGROSAMOUC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.DISCAMOUIC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("DISCAMOUIC"));

                    if (rst.getDouble("DISCRATEIC") < 0) {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC") * -1;
                    } else {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    }
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }
                    beanTkt.CERROIN = rst.getString("CERROIN").trim();
                    beanTkt.DES_CERROIN = rst.getString("DES_CERROIN").trim();

                    if (beanTkt.CERROIN.equals("")) {
                        beanTkt.desCERROIN = "Conciliate";
                    } else {
                        beanTkt.desCERROIN = "Difference";
                    }

                    //Totales
                    beanTkt.TGROSAMOUN_TOTAL = TGROSAMOUN_TOTAL;
                    beanTkt.DISCAMOUN_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUN_TOTAL, DISCAMOUN_TOTAL);
                    beanTkt.DISCAMOUNI_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUN_TOTAL, DISCAMOUNI_TOTAL);

                    beanTkt.TGROSAMOUNC_TOTAL = TGROSAMOUNC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUNC_TOTAL, DISCAMOUNC_TOTAL);
                    beanTkt.DISCAMOUIC_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUNC_TOTAL, DISCAMOUIC_TOTAL);

                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.SFEEAMOU_TOTAL = SFEEAMOU_TOTAL;
                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.ACCEAMOU_TOTAL = ACCEAMOU_TOTAL;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                //rst.close();
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04471(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        double lngTotQMATCH = 0, lngTotQBANK = 0, lngTotQBANK_R = 0, lngTotQPAY = 0, lngTotQDIFF = 0, total = 0;
        double lngTotQTYTRA = 0, lngTotQTYDOC = 0;
        double TGROSAMOUN_TOTAL = 0;
        double TGROSAMOUNC_TOTAL = 0;
        double DISCAMOUN_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double SFEEAMOU_TOTAL = 0;
        double ACCEAMOUC_TOTAL = 0;
        double ACCEAMOU_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04471(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_TDOC.trim());
            cstmt.setInt(6, filter.page.PAGNUM);
            cstmt.setInt(7, filter.page.PAGROW);
            cstmt.setInt(8, filter.page.TOTPAG);
            cstmt.setInt(9, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(6);
            filter.page.PAGROW = cstmt.getInt(7);
            filter.page.TOTPAG = cstmt.getInt(8);
            filter.page.TOTROW = cstmt.getInt(9);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TGROSAMOUN_TOTAL = rst.getDouble("TGROSAMOUN_TOTAL");
                TGROSAMOUNC_TOTAL = rst.getDouble("TGROSAMOUNC_TOTAL");
                DISCAMOUN_TOTAL = rst.getDouble("DISCAMOUN_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                SFEEAMOU_TOTAL = rst.getDouble("SFEEAMOU_TOTAL");
                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                ACCEAMOU_TOTAL = rst.getDouble("ACCEAMOU_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_IDITEMS = filter.IN_IDITEMS.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();

                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.SIREFNBR = rst.getString("SIREFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();

                    beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SELLERID = rst.getString("SELLERID").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.ZONA = rst.getString("ZONA").trim();

                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");

                    beanTkt.TRANSDATE = rst.getString("TRANSDATE");
                    beanTkt.TRANSID = rst.getString("TRANSID");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                    beanTkt.INSTANBR = rst.getString("INSTANBR");
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.FINSAMOUC = rst.getDouble("FINSAMOUC");
                    beanTkt.SINSAMOUC = rst.getDouble("SINSAMOUC");

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.DISCAMOUNI = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("DISCAMOUNI"));

                    if (rst.getDouble("DISCRATEI") < 0) {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI") * -1;
                    } else {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    }

                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.TGROSAMOUC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.DISCAMOUIC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("DISCAMOUIC"));

                    if (rst.getDouble("DISCRATEIC") < 0) {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC") * -1;
                    } else {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    }
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }
                    beanTkt.CERROIN = rst.getString("CERROIN").trim();
                    beanTkt.DES_CERROIN = rst.getString("DES_CERROIN").trim();

                    if (beanTkt.CERROIN.equals("")) {
                        beanTkt.desCERROIN = "Conciliate";
                    } else {
                        beanTkt.desCERROIN = "Difference";
                    }

                    //Totales
                    beanTkt.TGROSAMOUN_TOTAL = TGROSAMOUN_TOTAL;
                    beanTkt.DISCAMOUN_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUN_TOTAL, DISCAMOUN_TOTAL);
                    beanTkt.DISCAMOUNI_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUN_TOTAL, DISCAMOUNI_TOTAL);

                    beanTkt.TGROSAMOUNC_TOTAL = TGROSAMOUNC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUNC_TOTAL, DISCAMOUNC_TOTAL);
                    beanTkt.DISCAMOUIC_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUNC_TOTAL, DISCAMOUIC_TOTAL);

                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.SFEEAMOU_TOTAL = SFEEAMOU_TOTAL;
                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.ACCEAMOU_TOTAL = ACCEAMOU_TOTAL;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                //rst.close();
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
        return lstTkts;
    }

    public List<A4117Filter> loadPX570SQP04278(A4117Filter filter) throws SQLException, Exception {

        List<A4117Filter> lstTkts = new ArrayList<A4117Filter>(0);
        A4117Filter beanTkt;
        double totTGROSAMOUN = 0, totDISCRATE = 0, totDISCAMOUN = 0, totTGROSAMOUC = 0, totDISCAMOUNC = 0;
        double totDISCAMOUN_IVA = 0, totDISCAMOUN_IMPORT = 0, totDISCAMOUNC_IVA = 0, totDISCAMOUNC_IMPORT = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04278(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_MERCHID);
            cstmt.setString(6, filter.IN_AXPAYNBR);
            cstmt.setString(7, filter.IN_PCURRENCY);
            cstmt.setString(8, filter.strDATE);
            cstmt.setString(9, filter.IN_IDITEMS);
            cstmt.setString(10, filter.IN_IDITEMT);
            cstmt.setString(11, filter.SCOUNTRY);
            cstmt.setInt(12, filter.page.PAGNUM);
            cstmt.setInt(13, filter.page.PAGROW);
            cstmt.setInt(14, filter.page.TOTPAG);
            cstmt.setInt(15, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(12);
            filter.page.PAGROW = cstmt.getInt(13);
            filter.page.TOTPAG = cstmt.getInt(14);
            filter.page.TOTROW = cstmt.getInt(15);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totTGROSAMOUN = rst.getDouble("TGROSAMOUN");
                totTGROSAMOUC = rst.getDouble("TGROSAMOUC");
                totDISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                totDISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                totDISCAMOUNC_IVA = rst.getDouble("DISCAMOUNC_IVA");
                totDISCAMOUNC_IMPORT = rst.getDouble("DISCAMOUNC_IMPORT");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4117Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_IDITEMS = filter.IN_IDITEMS.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();

                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    //beanTkt.IDITEMP = rst.getString("IDITEMP").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();
                    beanTkt.FEECODE = rst.getString("FEECODE").trim();
                    beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();
                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN_IMPORT = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN_IMPORT"));
                    beanTkt.DISCAMOUN_IVA = this.mantenerSigno(beanTkt.DISCAMOUN_IMPORT, rst.getDouble("DISCAMOUN_IVA"));

                    if (rst.getDouble("DISCRATE_IVA") < 0) {
                        beanTkt.DISCRATE_IVA = rst.getDouble("DISCRATE_IVA") * -1;
                    } else {
                        beanTkt.DISCRATE_IVA = rst.getDouble("DISCRATE_IVA");
                    }

                    beanTkt.DISCRATE_IMPORT = rst.getDouble("DISCRATE_IMPORT");
                    beanTkt.DISCRATEBA_IVA = rst.getDouble("DISCRATEBA_IVA");
                    beanTkt.DISCRATEBA_IMPORT = rst.getDouble("DISCRATEBA_IMPORT");

                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC_IMPORT = this.cambioSigno(beanTkt.TGROSAMOUC, rst.getDouble("DISCAMOUNC_IMPORT"));
                    beanTkt.DISCAMOUNC_IVA = this.mantenerSigno(beanTkt.DISCAMOUNC_IMPORT, rst.getDouble("DISCAMOUNC_IVA"));

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totDISCAMOUN_IMPORT = this.cambioSigno(beanTkt.totTGROSAMOUN, totDISCAMOUN_IMPORT);
                    beanTkt.totDISCAMOUN_IVA = this.mantenerSigno(beanTkt.totDISCAMOUN_IMPORT, totDISCAMOUN_IVA);

                    beanTkt.totTGROSAMOUC = totTGROSAMOUC;
                    beanTkt.totDISCAMOUNC_IMPORT = this.cambioSigno(beanTkt.totTGROSAMOUC, totDISCAMOUNC_IMPORT);
                    beanTkt.totDISCAMOUNC_IVA = this.mantenerSigno(beanTkt.totDISCAMOUNC_IMPORT, totDISCAMOUNC_IVA);

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4118Filter> loadPX570SQP04279(A4118Filter filter) throws SQLException, Exception {

        List<A4118Filter> lstTkts = new ArrayList<A4118Filter>(0);
        A4118Filter beanTkt;
        double totGROSAMOUN = 0, totDISCAMOUN = 0, totSFEEAMOUN = 0, totTAXAMOUN = 0, totNETAMOUN = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0, totTAXAMOUNC = 0, totNETAMOUNC = 0, totSFEEAMOUNC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04279(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_MERCHID);
            cstmt.setString(6, filter.IN_AXPAYNBR);
            cstmt.setString(7, filter.IN_PCURRENCY);
            cstmt.setString(8, filter.strDATE);
            cstmt.setString(9, filter.SCOUNTRY);

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totGROSAMOUN = rst.getDouble("GROSAMOUN");
                totDISCAMOUN = rst.getDouble("DISCAMOUN");
                totSFEEAMOUN = rst.getDouble("SFEEAMOUN");
                totTAXAMOUN = rst.getDouble("TAXAMOUN");
                totNETAMOUN = rst.getDouble("NETAMOUN");

                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4118Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();

                    beanTkt.CHADJNBR = rst.getString("CHADJNBR").trim();
                    beanTkt.CHAADJCOD = rst.getString("CHAADJCOD").trim();
                    beanTkt.CHAADJDES = rst.getString("CHAADJDES").trim();

                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.GROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.TAXAMOUN = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("TAXAMOUN"));

                    beanTkt.SFEEAMOUN = rst.getDouble("SFEEAMOUN");
                    beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.GROSAMOUNC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.TAXAMOUNC = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("TAXAMOUNC"));

                    beanTkt.SFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totDISCAMOUN = this.cambioSigno(beanTkt.totGROSAMOUN, totDISCAMOUN);
                    beanTkt.totTAXAMOUN = this.mantenerSigno(beanTkt.totDISCAMOUN, totTAXAMOUN);
                    beanTkt.totSFEEAMOUN = totSFEEAMOUN;
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totNETAMOUN = totNETAMOUN;

                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = this.cambioSigno(beanTkt.totGROSAMOUNC, totDISCAMOUNC);
                    beanTkt.totTAXAMOUNC = this.mantenerSigno(beanTkt.totDISCAMOUNC, totTAXAMOUNC);
                    beanTkt.totNETAMOUNC = totNETAMOUNC;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4118Filter> loadPX570SQP04376(A4118Filter filter) throws SQLException, Exception {

        List<A4118Filter> lstTkts = new ArrayList<A4118Filter>(0);
        A4118Filter beanTkt;
        double totGROSAMOUN = 0, totDISCAMOUN = 0, totSFEEAMOUN = 0, totTAXAMOUN = 0, totNETAMOUN = 0;
        double totGROSAMOUNC = 0, totDISCAMOUNC = 0, totTAXAMOUNC = 0, totNETAMOUNC = 0, totSFEEAMOUNC = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04376(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);

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
                totGROSAMOUN = rst.getDouble("GROSAMOUN");
                totDISCAMOUN = rst.getDouble("DISCAMOUN");
                totSFEEAMOUN = rst.getDouble("SFEEAMOUN");
                totSFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                totTAXAMOUN = rst.getDouble("TAXAMOUN");
                totNETAMOUN = rst.getDouble("NETAMOUN");

                totGROSAMOUNC = rst.getDouble("GROSAMOUNC");
                totDISCAMOUNC = rst.getDouble("DISCAMOUNC");
                totTAXAMOUNC = rst.getDouble("TAXAMOUNC");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4118Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.strDATE = filter.strDATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();

                    beanTkt.CHADJNBR = rst.getString("CHADJNBR").trim();
                    beanTkt.CHAADJCOD = rst.getString("CHAADJCOD").trim();
                    beanTkt.CHAADJDES = rst.getString("CHAADJDES").trim();

                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.GROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.TAXAMOUN = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("TAXAMOUN"));

                    beanTkt.SFEEAMOUN = rst.getDouble("SFEEAMOUN");
                    beanTkt.SFEEAMOUNC = rst.getDouble("SFEEAMOUNC");
                    beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.GROSAMOUNC, rst.getDouble("DISCAMOUNC"));
                    beanTkt.TAXAMOUNC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("TAXAMOUNC"));
                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");

                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.STCON = rst.getString("STCON").trim();

                    if (beanTkt.STCON.equals("2")) {
                        beanTkt.descSTCON = "Accounted";
                    } else {
                        beanTkt.descSTCON = "";
                    }

                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.IDCON = rst.getString("IDCON").trim();

                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totDISCAMOUN = this.cambioSigno(beanTkt.totGROSAMOUN, totDISCAMOUN);
                    beanTkt.totTAXAMOUN = this.mantenerSigno(beanTkt.totDISCAMOUN, totTAXAMOUN);
                    beanTkt.totSFEEAMOUN = totSFEEAMOUN;
                    beanTkt.totSFEEAMOUNC = totSFEEAMOUNC;
                    beanTkt.totNETAMOUN = totNETAMOUN;

                    beanTkt.totGROSAMOUNC = totGROSAMOUNC;
                    beanTkt.totDISCAMOUNC = this.cambioSigno(beanTkt.totGROSAMOUNC, totDISCAMOUNC);
                    beanTkt.totTAXAMOUNC = this.mantenerSigno(beanTkt.totDISCAMOUNC, totTAXAMOUNC);
                    beanTkt.totNETAMOUNC = totNETAMOUNC;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4114Filter> loadPX570SQP04571(A4113Filter filter) throws SQLException, Exception {

        List<A4114Filter> lstTkts = new ArrayList<A4114Filter>(0);
        A4114Filter beanTkt;
        double TAXBAMOUN_TOTAL = 0, TAXAMOUNT_TOTAL = 0, TAXBAMOUNC_TOTAL = 0, TAXAMOUNTC_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04571(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATE.trim());
            cstmt.setString(3, filter.PRDA.trim());
            cstmt.setString(4, filter.PAYDATE.trim());
            cstmt.setString(5, filter.ZONA.trim());
            cstmt.setString(6, filter.SCOUNTRY.trim());
            cstmt.setString(7, filter.PMERCHID.trim());
            cstmt.setString(8, filter.AXPAYNBR.trim());
            cstmt.setString(9, filter.PCURRENCY.trim());
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TAXBAMOUN_TOTAL = rst.getDouble("TAXBAMOUN_TOTAL");
                TAXAMOUNT_TOTAL = rst.getDouble("TAXAMOUNT_TOTAL");
                TAXBAMOUNC_TOTAL = rst.getDouble("TAXBAMOUNC_TOTAL");
                TAXAMOUNTC_TOTAL = rst.getDouble("TAXAMOUNTC_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4114Filter();

                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.TAXTCODE = rst.getString("TAXTCODE").trim();
                    beanTkt.TAXDESCRI = rst.getString("TAXDESCRI").trim();
                    beanTkt.TAXPDATE = rst.getString("TAXPDATE").trim();
                    beanTkt.FSELEC = rst.getString("FSELEC").trim();
                    beanTkt.FECSELEC = rst.getString("FECSELEC").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.TAXBAMOUN = rst.getDouble("TAXBAMOUN");
                    beanTkt.TAXRATE = rst.getDouble("TAXRATE");
                    beanTkt.TAXAMOUNT = rst.getDouble("TAXAMOUNT");
                    beanTkt.TAXBAMOUNC = rst.getDouble("TAXBAMOUNC");
                    beanTkt.TAXRATEC = rst.getDouble("TAXRATEC");
                    beanTkt.TAXAMOUNTC = rst.getDouble("TAXAMOUNTC");

                    //TOTALES
                    beanTkt.TAXBAMOUN_TOTAL = TAXBAMOUN_TOTAL;
                    beanTkt.TAXAMOUNT_TOTAL = TAXAMOUNT_TOTAL;
                    beanTkt.TAXBAMOUNC_TOTAL = TAXBAMOUNC_TOTAL;
                    beanTkt.TAXAMOUNTC_TOTAL = TAXAMOUNTC_TOTAL;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    // ---------------------------------------------------
    public List<A4116Filter> loadPX570SQP04328(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04328(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_STVAL);
            cstmt.setString(6, filter.IN_PNR);
            cstmt.setString(7, filter.IN_TDOC);
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanTkt = new A4116Filter();
                beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                beanTkt.IN_DATE = filter.IN_DATE.trim();

                beanTkt.RN = rst.getString("RN").trim();
                beanTkt.DATE = rst.getString(filter.IN_DATE.trim()).trim();
                //beanTkt.PRDA = rst.getString("PRDA").trim();
                //beanTkt.MERCHID = rst.getString("MERCHID").trim();
                //beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                //beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                //beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                //beanTkt.SCARDN = rst.getString("SCARDN").trim();
                //beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                //beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                //beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                //beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");
                beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                beanTkt.ZONA = rst.getString("ZONA");
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");

                beanTkt.DISCAMOUN_IMPORT = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN_IMPORT"));
                beanTkt.DISCAMOUN_IVA = this.mantenerSigno(beanTkt.DISCAMOUN_IMPORT, rst.getDouble("DISCAMOUN_IVA"));

                beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                beanTkt.DISCRATE_IMPORT = rst.getDouble("RATECOMBA");
                beanTkt.DISCRATE_IVA = rst.getDouble("RATEIVABA");
                //beanTkt.CERROR = rst.getString("CERROR").trim();

                /*if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }*/
                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04275(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04275(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;

        double totDISCAMOUN_IMPORT = 0, totDISCAMOUN_IVA = 0, totTAXAMOUN_AD = 0, totTAXAMOUN_CB = 0, totNETAMOUN = 0, totNETAMOUNC = 0, totTGROSAMOUN = 0,
                totSFEEAMOU = 0, totACCEAMOU = 0, totGROSAMOUN = 0, totDISCAMOUN = 0;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE);
            cstmt.setString(3, filter.IN_PCURRENCY);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_STVAL);
            cstmt.setString(6, filter.IN_PNR);
            cstmt.setString(7, filter.IN_TDOC);
            cstmt.setString(8, filter.IN_SCOUNTRY);
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
                totDISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                totDISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                totTAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                totTAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                totNETAMOUN = rst.getDouble("NETAMOUN");
                totNETAMOUNC = rst.getDouble("NETAMOUNC");
                totTGROSAMOUN = rst.getDouble("TGROSAMOUN");

                totSFEEAMOU = rst.getDouble("SFEEAMOU");
                totACCEAMOU = rst.getDouble("ACCEAMOU");
                totGROSAMOUN = rst.getDouble("GROSAMOUN");
                totDISCAMOUN = rst.getDouble("DISCAMOUN");
            }
            rst.close();
//
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString(filter.IN_DATE.trim()).trim();
                    //beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.DES_CERROR = rst.getString("DES_CERROR").trim();
                    //beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                    //beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    //beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    //beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    //beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    //beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                    //beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                    //beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                    beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                    beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                    beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                    beanTkt.NETAMOUNC = rst.getDouble("NETAMOUNC");

                    beanTkt.ZONA = rst.getString("ZONA");
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");

                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN_IMPORT = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN_IMPORT"));
                    beanTkt.DISCAMOUN_IVA = this.mantenerSigno(beanTkt.DISCAMOUN_IMPORT, rst.getDouble("DISCAMOUN_IVA"));

                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCRATE_IMPORT = rst.getDouble("RATECOMBA");
                    beanTkt.DISCRATE_IVA = rst.getDouble("RATEIVABA");
                    beanTkt.RATECOMSM = rst.getDouble("RATECOMSM");
                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    //Totales
                    beanTkt.totTAXAMOUN_AD = totTAXAMOUN_AD;
                    beanTkt.totTAXAMOUN_CB = totTAXAMOUN_CB;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totNETAMOUNC = totNETAMOUNC;
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totDISCAMOUN_IMPORT = this.cambioSigno(beanTkt.totTGROSAMOUN, totDISCAMOUN_IMPORT);
                    beanTkt.totDISCAMOUN_IVA = this.mantenerSigno(beanTkt.totDISCAMOUN_IMPORT, totDISCAMOUN_IVA);
                    beanTkt.totSFEEAMOU = totSFEEAMOU;
                    beanTkt.totACCEAMOU = totACCEAMOU;
                    beanTkt.totDISCAMOUN = totDISCAMOUN;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04284(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");
        hmDescReglas.put("5", "Transact.");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "PLUSGRADE");
        hmDescFCOMPL.put("2", "LIGAS");
        hmDescFCOMPL.put("3", "TABLET");
        hmDescFCOMPL.put("4", "BPO");

        double totGROSAMOUN = 0;
        double totTGROSAMOUN = 0;
        double totDISCAMOUN_IMPORT = 0;
        double totDISCAMOUN_IVA = 0;
        double totSFEEAMOU = 0;
        double totACCEAMOU = 0;
        double totTAXAMOUN_AD = 0;
        double totIVACOM12 = 0;
        double totGROSAMOUN_CB = 0;
        double totDISCAMOUN = 0;
        double totTAXAMOUN_CB = 0;
        double totNETAMOUN = 0;
        double totDISCAMOSC = 0;
        double ACCEAMOUC_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double TGROSAMOUC_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;
        double VATCOMMSIC_TOTAL = 0;
        double DISCAMOUN_CB_TOTAL = 0;
        double SVFOPS_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04284(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM.trim());
            cstmt.setString(3, filter.IN_DATETO.trim());
            cstmt.setString(4, filter.DATE.trim());
            cstmt.setString(5, filter.IN_DATE.trim());
            cstmt.setString(6, filter.IN_MERCHID.trim());
            cstmt.setString(7, filter.IN_PCURRENCY.trim());
            cstmt.setString(8, filter.IN_STVAL.trim());
            cstmt.setString(9, filter.IN_PNR.trim());
            cstmt.setString(10, filter.IN_TDOC.trim());
            cstmt.setString(11, filter.IN_CERROIN.trim());
            cstmt.setString(12, filter.IN_SCARDN11.trim() + '%' + filter.IN_SCARDN22.trim() + '%');
            cstmt.setString(13, filter.IN_AUTHS.trim());
            cstmt.setString(14, filter.IN_RECTYPE.trim());
            cstmt.setString(15, filter.IN_ZONA_SETT.trim());
            cstmt.setString(16, filter.IN_SCOUNTRY_SETT.trim());
            cstmt.setInt(17, filter.page.PAGNUM);
            cstmt.setInt(18, filter.page.PAGROW);
            cstmt.setInt(19, filter.page.TOTPAG);
            cstmt.setInt(20, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(17);
            filter.page.PAGROW = cstmt.getInt(18);
            filter.page.TOTPAG = cstmt.getInt(19);
            filter.page.TOTROW = cstmt.getInt(20);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totGROSAMOUN = rst.getDouble("totGROSAMOUN");
                totTGROSAMOUN = rst.getDouble("totTGROSAMOUN");
                totDISCAMOUN_IMPORT = rst.getDouble("totDISCAMOUN_IMPORT");
                totDISCAMOUN_IVA = rst.getDouble("totDISCAMOUN_IVA");
                totSFEEAMOU = rst.getDouble("totSFEEAMOU");
                totACCEAMOU = rst.getDouble("totACCEAMOU");
                totTAXAMOUN_AD = rst.getDouble("totTAXAMOUN_AD");
                totIVACOM12 = rst.getDouble("totIVACOM12");
                totGROSAMOUN_CB = rst.getDouble("totGROSAMOUN_CB");
                totDISCAMOUN = rst.getDouble("totDISCAMOUN");
                totTAXAMOUN_CB = rst.getDouble("totTAXAMOUN_CB");
                totDISCAMOSC = rst.getDouble("totDISCAMOSC");

                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                TGROSAMOUC_TOTAL = rst.getDouble("TGROSAMOUC_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
                VATCOMMSIC_TOTAL = rst.getDouble("VATCOMMSIC_TOTAL");
                DISCAMOUN_CB_TOTAL = rst.getDouble("DISCAMOUN_CB_TOTAL");
                SVFOPS_TOTAL = rst.getDouble("SVFOPS_TOTAL");

                totNETAMOUN = totTGROSAMOUN - totDISCAMOUN_IMPORT - totDISCAMOUN_IVA - totSFEEAMOU - totACCEAMOU - totGROSAMOUN_CB - totDISCAMOUN - totTAXAMOUN_CB - totTAXAMOUN_AD - DISCAMOUN_CB_TOTAL;
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString(filter.IN_DATE.trim()).trim();
                    beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.PASSED_DAYS = rst.getString("PASSED_DAYS").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                    beanTkt.QTYTKT = rst.getInt("QTYTKT");
                    beanTkt.INVORNBR = rst.getString("INVORNBR");
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescTDOC.containsKey(rst.getString("TDOC").trim())) {
                        beanTkt.descTDOC = hmDescTDOC.get(rst.getString("TDOC").trim()).toString();
                    } else {
                        beanTkt.descTDOC = rst.getString("TDOC").trim();
                    }
                    beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                    beanTkt.DES_CERROR = rst.getString("DES_CERROR").trim();
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");

                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.DISCAMOUNI = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("DISCAMOUNI"));

                    beanTkt.SVFOPS = rst.getDouble("SVFOPS");
                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                    beanTkt.DISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                    beanTkt.DISCRATE_IMPORT = rst.getDouble("DISCRATE_IMPORT");
                    //beanTkt.DISCRATE_IVA = rst.getDouble("DISCRATE_IVA");
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.GROSAMOUN_CB = rst.getDouble("GROSAMOUN_CB");

                    beanTkt.DISCAMOUN_CB = rst.getDouble("DISCAMOUN_CB");
                    beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                    beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                    beanTkt.NETAMOUN = beanTkt.TGROSAMOUN - beanTkt.DISCAMOUN_IMPORT - beanTkt.DISCAMOUN_IVA - beanTkt.SFEEAMOU - beanTkt.ACCEAMOU + beanTkt.GROSAMOUN_CB - rst.getDouble("DISCAMOUN") - beanTkt.TAXAMOUN_CB - beanTkt.TAXAMOUN_AD - beanTkt.DISCAMOUN_CB;
                    beanTkt.DISCAMOSC = rst.getDouble("DISCAMOSC");
                    beanTkt.FREGLA = rst.getString("FREGLA").trim();
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.CERROIN = rst.getString("CERROIN").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.FREGLA = rst.getString("FREGLA").trim();
                    if (hmDescReglas.containsKey(rst.getString("FREGLA").trim())) {
                        beanTkt.descFREGLA = hmDescReglas.get(rst.getString("FREGLA").trim()).toString();
                    } else {
                        beanTkt.descFREGLA = rst.getString("FREGLA").trim();
                    }

                    beanTkt.FCOMPL = rst.getString("FCOMPL").trim();
                    if (hmDescFCOMPL.containsKey(rst.getString("FCOMPL").trim())) {
                        beanTkt.descFCOMPL = hmDescFCOMPL.get(rst.getString("FCOMPL").trim()).toString();
                    } else {
                        beanTkt.descFCOMPL = rst.getString("FCOMPL").trim();
                    }

                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    if (rst.getDouble("DISCRATEI") < 0) {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI") * -1;
                    } else {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    }

                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUNC"));
                    beanTkt.DISCAMOUIC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("DISCAMOUIC"));

                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.VATCOMMSIC = rst.getDouble("VATCOMMSIC");

                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    if (rst.getDouble("DISCRATEIC") < 0) {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC") * -1;
                    } else {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    }

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }
                    if (beanTkt.CERROIN.equals("")) {
                        beanTkt.desCERROIN = "Conciliate";
                    } else {
                        beanTkt.desCERROIN = "Difference";
                    }

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.RATEACCE = rst.getDouble("RATEACCE");
                    beanTkt.IVACOM12 = rst.getDouble("IVACOM12");

                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();

                    beanTkt.CHADJNBR = rst.getString("CHADJNBR").trim();
                    beanTkt.CHAADJCOD = rst.getString("CHAADJCOD").trim();
                    beanTkt.CHAADJDES = rst.getString("CHAADJDES").trim();
                    beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                    beanTkt.SELLERID = rst.getString("SELLERID").trim();

                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();

                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totDISCAMOUN = this.cambioSigno(beanTkt.totTGROSAMOUN, totDISCAMOUN);
                    beanTkt.DISCAMOUNI_TOTAL = this.mantenerSigno(beanTkt.totDISCAMOUN, DISCAMOUNI_TOTAL);
                    beanTkt.totDISCAMOUN_IMPORT = totDISCAMOUN_IMPORT;
                    beanTkt.totDISCAMOUN_IVA = totDISCAMOUN_IVA;
                    beanTkt.totSFEEAMOU = totSFEEAMOU;
                    beanTkt.totACCEAMOU = totACCEAMOU;
                    beanTkt.totTAXAMOUN_AD = totTAXAMOUN_AD;
                    beanTkt.totIVACOM12 = totIVACOM12;
                    beanTkt.totTAXAMOUN_CB = totTAXAMOUN_CB;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totDISCAMOSC = totDISCAMOSC;
                    beanTkt.totGROSAMOUN_CB = totGROSAMOUN_CB;

                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.TGROSAMOUC_TOTAL = TGROSAMOUC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUC_TOTAL, DISCAMOUNC_TOTAL);
                    beanTkt.DISCAMOUIC_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUNC_TOTAL, DISCAMOUIC_TOTAL);
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.VATCOMMSIC_TOTAL = VATCOMMSIC_TOTAL;
                    beanTkt.DISCAMOUN_CB_TOTAL = DISCAMOUN_CB_TOTAL;
                    beanTkt.SVFOPS_TOTAL = SVFOPS_TOTAL;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04377(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        double totGROSAMOUN = 0;
        double totTGROSAMOUN = 0;
        double totDISCAMOUN_IMPORT = 0;
        double totDISCAMOUN_IVA = 0;
        double totSFEEAMOU = 0;
        double totACCEAMOU = 0;
        double totTAXAMOUN_AD = 0;
        double totIVACOM12 = 0;
        double totGROSAMOUN_CB = 0;
        double totDISCAMOUN = 0;
        double totTAXAMOUN_CB = 0;
        double totNETAMOUN = 0;
        double totDISCAMOSC = 0;
        double ACCEAMOUC_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double TGROSAMOUC_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;
        double VATCOMMSIC_TOTAL = 0;
        double DISCAMOUN_CB_TOTAL = 0;
        double SADJUST_TOTAL = 0;

        CallableStatement cstmt = null;
        CallableStatement cstmt_usos = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04377(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SPRUT01556(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DATE);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.MERCHID);
            cstmt.setString(5, filter.SPNR);
            cstmt.setString(6, filter.ISREFNBR);
            cstmt.setString(7, filter.IN_TRANSDATE);
            cstmt.setString(8, filter.IN_AXPRODAT);
            cstmt.setString(9, filter.IN_FREGLA);
            cstmt.setString(10, filter.IN_SCARDN);
            cstmt.setString(11, filter.IN_SAUTHOC);
            cstmt.setString(12, filter.IN_IDITEMT);
            cstmt.setString(13, filter.IN_IDITEMS);
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                totGROSAMOUN = rst.getDouble("totGROSAMOUN");
                totTGROSAMOUN = rst.getDouble("totTGROSAMOUN");
                totDISCAMOUN_IMPORT = rst.getDouble("totDISCAMOUN_IMPORT");
                totDISCAMOUN_IVA = rst.getDouble("totDISCAMOUN_IVA");
                totSFEEAMOU = rst.getDouble("totSFEEAMOU");
                totACCEAMOU = rst.getDouble("totACCEAMOU");
                totTAXAMOUN_AD = rst.getDouble("totTAXAMOUN_AD");
                totIVACOM12 = rst.getDouble("totIVACOM12");
                totGROSAMOUN_CB = rst.getDouble("totGROSAMOUN_CB");
                totDISCAMOUN = rst.getDouble("totDISCAMOUN");
                totTAXAMOUN_CB = rst.getDouble("totTAXAMOUN_CB");
                totNETAMOUN = totTGROSAMOUN - totDISCAMOUN_IMPORT - totDISCAMOUN_IVA - totSFEEAMOU - totACCEAMOU - totGROSAMOUN_CB - totDISCAMOUN - totTAXAMOUN_CB - totTAXAMOUN_AD;
                totDISCAMOSC = rst.getDouble("totDISCAMOSC");

                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                TGROSAMOUC_TOTAL = rst.getDouble("TGROSAMOUC_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
                VATCOMMSIC_TOTAL = rst.getDouble("VATCOMMSIC_TOTAL");
                DISCAMOUN_CB_TOTAL = rst.getDouble("DISCAMOUN_CB_TOTAL");
                SADJUST_TOTAL = rst.getDouble("SADJUST_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_ISREFNBR = filter.ISREFNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_TGROSAMOUN = filter.IN_TGROSAMOUN;
                    beanTkt.IN_descSTVAL = filter.IN_descSTVAL;

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString(filter.IN_DATE.trim()).trim();
                    beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                    beanTkt.OBSERV = rst.getString("OBSERV").trim();
                    //beanTkt.QTYTKT = rst.getInt("QTYTKT");
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.INSTANBR = rst.getString("INSTANBR").trim();
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.DISCAMOUN_CB = rst.getDouble("DISCAMOUN_CB");

                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.DISCAMOUNI = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("DISCAMOUNI"));

                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCAMOUN_IMPORT = rst.getDouble("DISCAMOUN_IMPORT");
                    beanTkt.DISCAMOUN_IVA = rst.getDouble("DISCAMOUN_IVA");
                    beanTkt.DISCRATE_IMPORT = rst.getDouble("DISCRATE_IMPORT");
                    //beanTkt.DISCRATE_IVA = rst.getDouble("DISCRATE_IVA");
                    beanTkt.SADJUST = rst.getDouble("SADJUST");
                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                    beanTkt.GROSAMOUN_CB = rst.getDouble("GROSAMOUN_CB");
                    beanTkt.TAXAMOUN_CB = rst.getDouble("TAXAMOUN_CB");
                    beanTkt.TAXAMOUN_AD = rst.getDouble("TAXAMOUN_AD");
                    beanTkt.NETAMOUN = beanTkt.TGROSAMOUN - beanTkt.DISCAMOUN_IMPORT - beanTkt.DISCAMOUN_IVA - beanTkt.SFEEAMOU - beanTkt.ACCEAMOU - beanTkt.GROSAMOUN_CB - beanTkt.DISCAMOUN - beanTkt.TAXAMOUN_CB - beanTkt.TAXAMOUN_AD;
                    beanTkt.DISCAMOSC = rst.getDouble("DISCAMOSC");
                    beanTkt.CERROR = rst.getString("CERROR").trim();
                    beanTkt.desCERROR = rst.getString("desCERROR").trim();

                    beanTkt.SAGENT = rst.getString("SAGENT").trim();
                    beanTkt.FUENTE = rst.getString("FUENTE").trim();

                    beanTkt.ZONA = rst.getString("ZONA").trim();
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                    beanTkt.SDATE = rst.getString("SDATE").trim();

                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();

                    /*if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }*/
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    if (rst.getDouble("DISCRATEI") < 0) {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI") * -1;
                    } else {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    }

                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUNC"));
                    beanTkt.DISCAMOUIC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("DISCAMOUIC"));

                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.VATCOMMSIC = rst.getDouble("VATCOMMSIC");

                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    if (rst.getDouble("DISCRATEIC") < 0) {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC") * -1;
                    } else {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    }
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescTDOC.containsKey(rst.getString("TDOC").trim())) {
                        beanTkt.descTDOC = hmDescTDOC.get(rst.getString("TDOC").trim()).toString();
                    } else {
                        beanTkt.descTDOC = rst.getString("TDOC").trim();
                    }

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.RATEACCE = rst.getDouble("RATEACCE");
                    beanTkt.IVACOM12 = rst.getDouble("IVACOM12");

                    beanTkt.totGROSAMOUN = totGROSAMOUN;
                    beanTkt.totTGROSAMOUN = totTGROSAMOUN;
                    beanTkt.totDISCAMOUN = this.cambioSigno(beanTkt.totTGROSAMOUN, totDISCAMOUN);
                    beanTkt.DISCAMOUNI_TOTAL = this.mantenerSigno(beanTkt.totDISCAMOUN, DISCAMOUNI_TOTAL);
                    beanTkt.totDISCAMOUN_IMPORT = totDISCAMOUN_IMPORT;
                    beanTkt.totDISCAMOUN_IVA = totDISCAMOUN_IVA;
                    beanTkt.totSFEEAMOU = totSFEEAMOU;
                    beanTkt.totACCEAMOU = totACCEAMOU;
                    beanTkt.totTAXAMOUN_AD = totTAXAMOUN_AD;
                    beanTkt.totIVACOM12 = totIVACOM12;
                    beanTkt.totTAXAMOUN_CB = totTAXAMOUN_CB;
                    beanTkt.totNETAMOUN = totNETAMOUN;
                    beanTkt.totDISCAMOSC = totDISCAMOSC;
                    beanTkt.totGROSAMOUN_CB = totGROSAMOUN_CB;

                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.TGROSAMOUC_TOTAL = TGROSAMOUC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUC_TOTAL, DISCAMOUNC_TOTAL);
                    beanTkt.DISCAMOUIC_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUNC_TOTAL, DISCAMOUIC_TOTAL);
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.VATCOMMSIC_TOTAL = VATCOMMSIC_TOTAL;
                    beanTkt.DISCAMOUN_CB_TOTAL = DISCAMOUN_CB_TOTAL;
                    beanTkt.SADJUST_TOTAL = SADJUST_TOTAL;

                    cstmt_usos = cnx.prepareCall(SQLCLL02);
                    cstmt_usos.registerOutParameter(1, Types.VARCHAR);
                    cstmt_usos.setString(1, beanTkt.CCIA + beanTkt.FORMA + beanTkt.SERIE);
                    cstmt_usos.execute();
                    beanTkt.USOS = cstmt_usos.getString(1);
                    cstmt_usos.close();

                    beanTkt.A1531TTARJ = "AX";
                    beanTkt.FDESGLOSE = "1";
                    beanTkt.A1531NREF = beanTkt.SCARDN;
                    beanTkt.A1531CAPL = beanTkt.SAUTHOC;
                    beanTkt.A1531VFOP = beanTkt.TGROSAMOUN;
                    beanTkt.tot_VFOP = beanTkt.totTGROSAMOUN;
                    beanTkt.A720FECVTA = beanTkt.SDATE;
                    beanTkt.A720PNR = beanTkt.SPNR;
                    beanTkt.A1531TKT = beanTkt.ISREFNBR;
                    beanTkt.A720AGENTE = beanTkt.SAGENT;
                    beanTkt.A720ORIG = beanTkt.FUENTE;

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04619(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04619(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CHADJNBR);
            cstmt.setString(3, filter.CHAADJCOD);
            cstmt.setString(4, filter.MERCHID);
            cstmt.setString(5, filter.SMERCHID);
            cstmt.setString(6, filter.AXPAYNBR);
            cstmt.setString(7, filter.PRDA);
            cstmt.setString(8, filter.PAYDATE);
            cstmt.setString(9, filter.BSUMDATE);
            cstmt.setString(10, filter.ISREFNBR);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                beanTkt = new A4116Filter();

                beanTkt.MERCHID = rst.getString("MERCHID").trim();
                beanTkt.ZONA = rst.getString("ZONA").trim();
                beanTkt.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                beanTkt.PRDA = rst.getString("PRDA").trim();
                beanTkt.CHADJNBR = rst.getString("CHADJNBR").trim();
                beanTkt.CHAADJCOD = rst.getString("CHAADJCOD");
                beanTkt.CHAADJDES = rst.getString("CHAADJDES").trim();
                beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");
                beanTkt.DISCAMOUN = rst.getDouble("DISCAMOUN");
                beanTkt.TAXAMOUN = rst.getDouble("TAXAMOUN");
                beanTkt.NETAMOUN = rst.getDouble("NETAMOUN");
                beanTkt.SDATES = rst.getString("SDATES").trim();
                beanTkt.SAGENT = rst.getString("SAGENT").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.IDCONFLE = rst.getString("IDCONFLE").trim();
                beanTkt.IDCON = rst.getString("IDCON").trim();
                beanTkt.FCONT = rst.getString("FCONT").trim();
                beanTkt.STCON = rst.getString("STCON").trim();

                beanTkt.USCR = rst.getString("USCR");
                beanTkt.FECR = rst.getString("FECR");
                beanTkt.HOCR = rst.getString("HOCR");
                beanTkt.USUP = rst.getString("USUP");
                beanTkt.FEUP = rst.getString("FEUP");
                beanTkt.HOUP = rst.getString("HOUP");

                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        List<SQP00697Filter> lstRtn = new ArrayList<SQP00697Filter>(0);
        SQP00697Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00697(?,?,?,?,?,?,?,?,?)}"; //LIBSAP23.SQP00697V2

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TFILTER);
            cstmt01.setString(3, filter.IN_TEXT);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setString(5, "");//filter.page.ROWLST.get(filter.page.PAGNUM));
            cstmt01.setString(6, filter.IN_DATE_FROM);
            cstmt01.setString(7, filter.IN_DATE_TO);
            cstmt01.setString(8, filter.IN_IATA);
            cstmt01.setString(9, ""); //IN_CAPL

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00697Filter();
                objRtn.ROWKEY = rs01.getString("ROWKEY");
                objRtn.A720PAX = rs01.getString("A720PAX");
                objRtn.TICKET = rs01.getString("TICKET");
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                objRtn.A720CIUVTA = rs01.getString("A720CIUVTA");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                objRtn.A720FECVTA = Functions.getMonthConvertDate(rs01.getString("A720FECVTA"));
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720PNR = rs01.getString("A720PNR");
                objRtn.IN_IATA = rs01.getString("A1531CAPL"); // Deberías ser A1531CAPL en lugar de IN_IATA
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            e.printStackTrace();
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public A4118Filter loadPX570SQP04466(A4118Filter filter) throws SQLException, Exception {

        A4118Filter objRtn = new A4118Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");
        hmDescReglas.put("5", "Transact.");

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "PLUSGRADE");
        hmDescFCOMPL.put("2", "LIGAS");
        hmDescFCOMPL.put("3", "TABLET");
        hmDescFCOMPL.put("4", "BPO");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04466(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CHADJNBR.trim());
            cstmt01.setString(3, filter.CHAADJCOD.trim());
            cstmt01.setString(4, filter.MERCHID.trim());
            cstmt01.setString(5, filter.SMERCHID.trim());
            cstmt01.setString(6, filter.AXPAYNBR.trim());
            cstmt01.setString(7, filter.PRDA.trim());
            cstmt01.setString(8, filter.PAYDATE.trim());
            cstmt01.setString(9, filter.BSUMDATE.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();
                objRtn.MERCHID = rs01.getString("MERCHID").trim();
                objRtn.PAYDATE = rs01.getString("PAYDATE").trim();
                objRtn.PCURRENCY = rs01.getString("PCURRENCY").trim();
                objRtn.AXPAYNBR = rs01.getString("AXPAYNBR").trim();
                objRtn.SMERCHID = rs01.getString("SMERCHID").trim();

                objRtn.BSUMDATE = rs01.getString("BSUMDATE").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.ISREFNBR = rs01.getString("ISREFNBR").trim();
                objRtn.CHADJNBR = rs01.getString("CHADJNBR").trim();
                objRtn.CHAADJCOD = rs01.getString("CHAADJCOD").trim();
                objRtn.RECTYPE = rs01.getString("RECTYPE").trim();

                objRtn.STYPECD = rs01.getString("STYPECD").trim();
                objRtn.LMERCHID = rs01.getString("LMERCHID").trim();

                objRtn.INVORNBR = rs01.getString("INVORNBR").trim();
                objRtn.SPNR = rs01.getString("SPNR").trim();
                objRtn.TDOC = rs01.getString("TDOC").trim();
                if (hmDescTDOC.containsKey(rs01.getString("TDOC").trim())) {
                    objRtn.descTDOC = hmDescTDOC.get(rs01.getString("TDOC").trim()).toString();
                } else {
                    objRtn.descTDOC = rs01.getString("TDOC").trim();
                }

                objRtn.SELLERID = rs01.getString("SELLERID").trim();
                objRtn.AXPRODAT = rs01.getString("AXPRODAT").trim();
                objRtn.SIREFNBR = rs01.getString("SIREFNBR").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

            }
        } catch (Exception e) {
            e.getMessage();
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

        return objRtn;
    }

    // ---------------------------------------------------------------------------------------------------------------
    public List<A4116Filter> loadPX570SQP04357(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        double TGROSAMOUN_TOTAL = 0;
        double TGROSAMOUNC_TOTAL = 0;
        double DISCAMOUN_TOTAL = 0;
        double DISCAMOUNI_TOTAL = 0;
        double SFEEAMOUC_TOTAL = 0;
        double SFEEAMOU_TOTAL = 0;
        double ACCEAMOUC_TOTAL = 0;
        double ACCEAMOU_TOTAL = 0;
        double DISCAMOUNC_TOTAL = 0;
        double DISCAMOUIC_TOTAL = 0;

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "Match"); //PLUSGRADE
        hmDescFCOMPL.put("2", "Match"); //LIGAS
        hmDescFCOMPL.put("3", "Match"); //TABLET
        hmDescFCOMPL.put("4", "Match"); //BPO

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");
        hmDescReglas.put("5", "Transact.");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04357(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_DATE);
            cstmt.setString(5, filter.IN_WARNING);
            cstmt.setString(6, filter.IN_CERROR);
            cstmt.setString(7, filter.IN_COMPLEMENT);
            cstmt.setString(8, filter.IN_PNRError);
            cstmt.setString(9, filter.IN_TDOCError);
            cstmt.setString(10, filter.IN_SCARDN1.trim() + '%' + filter.IN_SCARDN2.trim() + '%');
            cstmt.setString(11, filter.IN_AUTHE);
            cstmt.setString(12, filter.IN_DRILLDOWN);
            cstmt.setString(13, filter.IN_DRILLDOWN_DATE);
            cstmt.setString(14, filter.IN_ZONA_ERR);
            cstmt.setString(15, filter.IN_SCOUNTRY_ERR);
            cstmt.setString(16, filter.IN_VOID);
            cstmt.setInt(17, filter.page.PAGNUM);
            cstmt.setInt(18, filter.page.PAGROW);
            cstmt.setInt(19, filter.page.TOTPAG);
            cstmt.setInt(20, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(17);
            filter.page.PAGROW = cstmt.getInt(18);
            filter.page.TOTPAG = cstmt.getInt(19);
            filter.page.TOTROW = cstmt.getInt(20);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TGROSAMOUN_TOTAL = rst.getDouble("TGROSAMOUN");
                TGROSAMOUNC_TOTAL = rst.getDouble("TGROSAMOUNC_TOTAL");
                DISCAMOUN_TOTAL = rst.getDouble("DISCAMOUN_TOTAL");
                DISCAMOUNI_TOTAL = rst.getDouble("DISCAMOUNI_TOTAL");
                SFEEAMOUC_TOTAL = rst.getDouble("SFEEAMOUC_TOTAL");
                SFEEAMOU_TOTAL = rst.getDouble("SFEEAMOU_TOTAL");
                ACCEAMOUC_TOTAL = rst.getDouble("ACCEAMOUC_TOTAL");
                ACCEAMOU_TOTAL = rst.getDouble("ACCEAMOU_TOTAL");
                DISCAMOUNC_TOTAL = rst.getDouble("DISCAMOUNC_TOTAL");
                DISCAMOUIC_TOTAL = rst.getDouble("DISCAMOUIC_TOTAL");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();
                    //    beanTkt.IN_CERROR = filter.IN_CERROR.trim();
                    beanTkt.strDATE = filter.strDATE.trim();

                    beanTkt.IN_MERCHID = filter.IN_MERCHID.trim();
                    beanTkt.IN_AXPAYNBR = filter.IN_AXPAYNBR.trim();
                    beanTkt.IN_PCURRENCY = filter.IN_PCURRENCY.trim();
                    beanTkt.IN_IDITEMS = filter.IN_IDITEMS.trim();

                    beanTkt.RN = rst.getString("RN").trim();
                    beanTkt.DATE = rst.getString("DATE").trim();
                    beanTkt.PRDA = rst.getString("PRDA").trim();
                    beanTkt.RECTYPE = rst.getString("RECTYPE").trim();
                    beanTkt.MERCHID = rst.getString("MERCHID").trim();
                    beanTkt.STYPECD = rst.getString("STYPECD").trim();
                    beanTkt.AXPAYNBR = rst.getString("AXPAYNBR").trim();
                    beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                    beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                    beanTkt.SPNR = rst.getString("SPNR").trim();
                    beanTkt.TDOC = rst.getString("TDOC").trim();
                    if (hmDescTDOC.containsKey(rst.getString("TDOC").trim())) {
                        beanTkt.descTDOC = hmDescTDOC.get(rst.getString("TDOC").trim()).toString();
                    } else {
                        beanTkt.descTDOC = rst.getString("TDOC").trim();
                    }
                    beanTkt.descVOID = rst.getString("VOID").trim();
                    beanTkt.STVAL = rst.getString("STVAL").trim();
                    if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                        beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                    } else {
                        beanTkt.descSTVAL = rst.getString("STVAL").trim();
                    }

                    beanTkt.FREGLA = rst.getString("FREGLA").trim();
                    if (hmDescReglas.containsKey(rst.getString("FREGLA").trim())) {
                        beanTkt.descFREGLA = hmDescReglas.get(rst.getString("FREGLA").trim()).toString();
                    } else {
                        beanTkt.descFREGLA = rst.getString("FREGLA").trim();
                    }

                    beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                    beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                    beanTkt.AXPRODAT = rst.getString("AXPRODAT").trim();
                    beanTkt.SIREFNBR = rst.getString("SIREFNBR").trim();
                    beanTkt.SCURRENCY = rst.getString("SCURRENCY").trim();
                    beanTkt.QTYTKT = rst.getInt("QTYTKT");
                    beanTkt.IDITEMS = rst.getString("IDITEMS").trim();
                    beanTkt.IDITEMT = rst.getString("IDITEMT").trim();

                    beanTkt.FCOMPL = rst.getString("FCOMPL").trim();
                    if (hmDescFCOMPL.containsKey(rst.getString("FCOMPL").trim())) {
                        beanTkt.descFCOMPL = hmDescFCOMPL.get(rst.getString("FCOMPL").trim()).toString();
                    } else {
                        beanTkt.descFCOMPL = rst.getString("FCOMPL").trim();
                    }

                    beanTkt.LMERCHID = rst.getString("LMERCHID").trim();
                    beanTkt.INVORNBR = rst.getString("INVORNBR").trim();
                    beanTkt.SELLERID = rst.getString("SELLERID").trim();
                    beanTkt.SCARDN = rst.getString("SCARDN").trim();
                    beanTkt.ISREFNBR = rst.getString("ISREFNBR").trim();
                    beanTkt.DES_MERCHANT = rst.getString("DES_MERCHANT").trim();
                    beanTkt.DES_SMERCHANT = rst.getString("DES_SMERCHANT").trim();
                    if (beanTkt.SMERCHID.equals("9353227755")) {
                        beanTkt.DES_SMERCHANT = "PLUSGRADE";
                    } else if (beanTkt.SMERCHID.equals("8133735688")) {
                        beanTkt.DES_SMERCHANT = "LIGAS";
                    } else if (beanTkt.SMERCHID.equals("9352724851")) {
                        beanTkt.DES_SMERCHANT = "TABLET";
                    }

                    beanTkt.GROSAMOUN = rst.getDouble("GROSAMOUN");

                    beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    beanTkt.DISCAMOUN = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUN"));
                    beanTkt.DISCAMOUNI = this.mantenerSigno(beanTkt.DISCAMOUN, rst.getDouble("DISCAMOUNI"));

                    beanTkt.TRANSDATE = rst.getString("TRANSDATE");
                    beanTkt.TRANSID = rst.getString("TRANSID");
                    beanTkt.SAUTHOC = rst.getString("SAUTHOC");
                    beanTkt.INSTANBR = rst.getString("INSTANBR");
                    beanTkt.NBRINSTA = rst.getInt("NBRINSTA");
                    beanTkt.DES_CERROR = rst.getString("DES_CERROR");

                    beanTkt.ZONA = rst.getString("ZONA");
                    beanTkt.SCOUNTRY = rst.getString("SCOUNTRY");

                    beanTkt.GROSAMOUNC = rst.getDouble("GROSAMOUNC");

                    beanTkt.TGROSAMOUC = rst.getDouble("TGROSAMOUC");
                    beanTkt.DISCAMOUNC = this.cambioSigno(beanTkt.TGROSAMOUN, rst.getDouble("DISCAMOUNC"));
                    beanTkt.DISCAMOUIC = this.mantenerSigno(beanTkt.DISCAMOUNC, rst.getDouble("DISCAMOUIC"));

                    beanTkt.FINSAMOUC = rst.getDouble("FINSAMOUC");
                    beanTkt.SINSAMOUC = rst.getDouble("SINSAMOUC");

                    beanTkt.RATESFEE = rst.getDouble("RATESFEE");
                    beanTkt.DISCRATE = rst.getDouble("DISCRATE");
                    if (rst.getDouble("DISCRATEI") < 0) {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI") * -1;
                    } else {
                        beanTkt.DISCRATEI = rst.getDouble("DISCRATEI");
                    }
                    beanTkt.RATESFEEC = rst.getDouble("RATESFEEC");
                    beanTkt.SFEEAMOUC = rst.getDouble("SFEEAMOUC");
                    beanTkt.SFEEAMOU = rst.getDouble("SFEEAMOU");
                    beanTkt.ACCEAMOUC = rst.getDouble("ACCEAMOUC");
                    beanTkt.ACCEAMOU = rst.getDouble("ACCEAMOU");
                    beanTkt.DISCRATEC = rst.getDouble("DISCRATEC");
                    if (rst.getDouble("DISCRATEIC") < 0) {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC") * -1;
                    } else {
                        beanTkt.DISCRATEIC = rst.getDouble("DISCRATEIC");
                    }

                    beanTkt.DISCAMOUNI_TOTAL = DISCAMOUNI_TOTAL;
                    beanTkt.SFEEAMOUC_TOTAL = SFEEAMOUC_TOTAL;
                    beanTkt.SFEEAMOU_TOTAL = SFEEAMOU_TOTAL;
                    beanTkt.ACCEAMOUC_TOTAL = ACCEAMOUC_TOTAL;
                    beanTkt.ACCEAMOU_TOTAL = ACCEAMOU_TOTAL;
                    beanTkt.TGROSAMOUN_TOTAL = TGROSAMOUN_TOTAL;
                    beanTkt.DISCAMOUN_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUN_TOTAL, DISCAMOUN_TOTAL);
                    beanTkt.DISCAMOUNI_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUN_TOTAL, DISCAMOUNI_TOTAL);
                    beanTkt.TGROSAMOUNC_TOTAL = TGROSAMOUNC_TOTAL;
                    beanTkt.DISCAMOUNC_TOTAL = this.cambioSigno(beanTkt.TGROSAMOUNC_TOTAL, DISCAMOUNC_TOTAL);
                    beanTkt.DISCAMOUIC_TOTAL = this.mantenerSigno(beanTkt.DISCAMOUNC_TOTAL, DISCAMOUIC_TOTAL);

                    beanTkt.CERROR = rst.getString("CERROR").trim();

                    if (beanTkt.CERROR.equals("")) {
                        beanTkt.desCERROR = "Conciliate";
                        beanTkt.DES_CERROR = "";
                    } else {
                        beanTkt.desCERROR = "Difference";
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    // ---------------------------------------------------------------------------------------------------------------
    public List<A4116Filter> loadPX570SQP04468(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;
        Integer TNCM_TOTAL = 0, TNCP_TOTAL = 0;
        Integer CPLM_TOTAL = 0, CPLP_TOTAL = 0;
        Integer CTAM_TOTAL = 0, CTAP_TOTAL = 0;
        Integer CLIM_TOTAL = 0, CLIP_TOTAL = 0;
        Integer TGP_TOTAL = 0, TGM_TOTAL = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04468(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_CERROR);
            cstmt.setString(5, filter.IN_COMPLEMENT);
            cstmt.setString(6, filter.IN_TDOCError);
            cstmt.setString(7, filter.IN_ZONA_ERR);
            cstmt.setString(8, filter.IN_SCOUNTRY_ERR);
            cstmt.setString(9, filter.IN_VOID);
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                TNCM_TOTAL = rst.getInt("TNCM");
                TNCP_TOTAL = rst.getInt("TNCP");
                CPLM_TOTAL = rst.getInt("CPLM");
                CPLP_TOTAL = rst.getInt("CPLP");
                CTAM_TOTAL = rst.getInt("CTAM");
                CTAP_TOTAL = rst.getInt("CTAP");
                CLIM_TOTAL = rst.getInt("CLIM");
                CLIP_TOTAL = rst.getInt("CLIP");
                TGM_TOTAL = rst.getInt("TGM");
                TGP_TOTAL = rst.getInt("TGP");
            }
            rst.close();

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    beanTkt = new A4116Filter();
                    beanTkt.IN_DATEFROM = filter.IN_DATEFROM.trim();
                    beanTkt.IN_DATETO = filter.IN_DATETO.trim();
                    beanTkt.IN_DATE = filter.IN_DATE.trim();

                    beanTkt.PAYDATE = rst.getString("PAYDATE");
                    beanTkt.TNCM = rst.getInt("TNCM");
                    beanTkt.TNCP = rst.getInt("TNCP");
                    beanTkt.CPLM = rst.getInt("CPLM");
                    beanTkt.CPLP = rst.getInt("CPLP");
                    beanTkt.CTAM = rst.getInt("CTAM");
                    beanTkt.CTAP = rst.getInt("CTAP");
                    beanTkt.CLIM = rst.getInt("CLIM");
                    beanTkt.CLIP = rst.getInt("CLIP");
                    beanTkt.TGM = rst.getInt("TGM");
                    beanTkt.TGP = rst.getInt("TGP");

                    //TOTALES
                    beanTkt.TNCM_TOTAL = TNCM_TOTAL;
                    beanTkt.TNCP_TOTAL = TNCP_TOTAL;
                    beanTkt.CPLM_TOTAL = CPLM_TOTAL;
                    beanTkt.CPLP_TOTAL = CPLP_TOTAL;
                    beanTkt.CTAM_TOTAL = CTAM_TOTAL;
                    beanTkt.CTAP_TOTAL = CTAP_TOTAL;
                    beanTkt.CLIM_TOTAL = CLIM_TOTAL;
                    beanTkt.CLIP_TOTAL = CLIP_TOTAL;
                    beanTkt.TGM_TOTAL = TGM_TOTAL;
                    beanTkt.TGP_TOTAL = TGP_TOTAL;

                    if (beanTkt.TGM > 0) {
                        double match = beanTkt.TGM;
                        double pending = beanTkt.TGP;
                        beanTkt.PENDING_PERCENTAGE = pending * 100 / match;
                    }

                    if (beanTkt.TGM_TOTAL > 0) {
                        double match_total = beanTkt.TGM_TOTAL;
                        double pending_total = beanTkt.TGP_TOTAL;
                        beanTkt.PENDING_PERCENTAGE_TOTAL = pending_total * 100 / match_total;
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }
                rst.close();
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

        return lstTkts;
    }

    public A4116Filter loadPX570SQP04359(A4116Filter filter) throws SQLException, Exception {

        A4116Filter objRtn = new A4116Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescSTCONL = new HashMap<String, String>();
        hmDescSTCONL.put("", "");
        hmDescSTCONL.put("1", "Accounted");
        hmDescSTCONL.put("2", "Accounted to Debug");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");
        hmDescReglas.put("5", "Transact.");

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "PLUSGRADE");
        hmDescFCOMPL.put("2", "LIGAS");
        hmDescFCOMPL.put("3", "TABLET");
        hmDescFCOMPL.put("4", "BPO");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04359(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PRDA.trim());
            cstmt01.setString(3, filter.MERCHID.trim());
            cstmt01.setString(4, filter.PAYDATE.trim());
            cstmt01.setString(5, filter.PCURRENCY.trim());
            cstmt01.setString(6, filter.AXPAYNBR.trim());
            cstmt01.setString(7, filter.SMERCHID.trim());
            cstmt01.setString(8, filter.BSUMDATE.trim());
            cstmt01.setString(9, filter.SCARDN.trim());
            cstmt01.setString(10, filter.SAUTHOC.trim());
            cstmt01.setString(11, filter.IDITEMS.trim());
            cstmt01.setString(12, filter.IDITEMT.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.PRDA = rs01.getString("PRDA").trim();
                objRtn.RECTYPE = rs01.getString("RECTYPE").trim();
                objRtn.MERCHID = rs01.getString("MERCHID").trim();
                objRtn.STYPECD = rs01.getString("STYPECD").trim();
                objRtn.AXPAYNBR = rs01.getString("AXPAYNBR").trim();
                objRtn.PAYDATE = rs01.getString("PAYDATE").trim();
                objRtn.PCURRENCY = rs01.getString("PCURRENCY").trim();
                objRtn.ZONA = rs01.getString("ZONA").trim();
                objRtn.SCOUNTRY = rs01.getString("SCOUNTRY").trim();

                objRtn.AREFNBR = rs01.getString("AREFNBR").trim();
                objRtn.OBSERV_BPO = rs01.getString("OBSERV_BPO").trim();
                objRtn.SMERCHID = rs01.getString("SMERCHID").trim();
                objRtn.BSUMDATE = rs01.getString("BSUMDATE").trim();
                objRtn.AXPRODAT = rs01.getString("AXPRODAT").trim();
                objRtn.SIREFNBR = rs01.getString("SIREFNBR").trim();
                objRtn.SCURRENCY = rs01.getString("SCURRENCY").trim();
                objRtn.IDITEMS = rs01.getString("IDITEMS").trim();
                objRtn.IDITEMT = rs01.getString("IDITEMT").trim();
                objRtn.STVAL = rs01.getString("STVAL").trim();
                if (hmDescEstados.containsKey(rs01.getString("STVAL").trim())) {
                    objRtn.descSTVAL = hmDescEstados.get(rs01.getString("STVAL").trim()).toString();
                } else {
                    objRtn.descSTVAL = rs01.getString("STVAL").trim();
                }
                objRtn.QTYTKT = rs01.getInt("QTYTKT");

                objRtn.STCONL = rs01.getString("STCONL").trim();
                if (hmDescSTCONL.containsKey(rs01.getString("STCONL").trim())) {
                    objRtn.descSTCONL = hmDescSTCONL.get(rs01.getString("STCONL").trim()).toString();
                } else {
                    objRtn.descSTCONL = rs01.getString("STCONL").trim();
                }

                objRtn.FREGLA = rs01.getString("FREGLA").trim();
                if (hmDescReglas.containsKey(rs01.getString("FREGLA").trim())) {
                    objRtn.descFREGLA = hmDescReglas.get(rs01.getString("FREGLA").trim()).toString();
                } else {
                    objRtn.descFREGLA = rs01.getString("FREGLA").trim();
                }

                objRtn.PASSED_DAYS = rs01.getString("PASSED_DAYS").trim();

                objRtn.FCONTL = rs01.getString("FCONTL").trim();
                objRtn.IDCONL = rs01.getString("IDCONL").trim();

                objRtn.FCOMPL = rs01.getString("FCOMPL").trim();
                if (hmDescFCOMPL.containsKey(rs01.getString("FCOMPL").trim())) {
                    objRtn.descFCOMPL = hmDescFCOMPL.get(rs01.getString("FCOMPL").trim()).toString();
                } else {
                    objRtn.descFCOMPL = rs01.getString("FCOMPL").trim();
                }

                objRtn.TDOC = rs01.getString("TDOC").trim();
                if (hmDescTDOC.containsKey(rs01.getString("TDOC").trim())) {
                    objRtn.descTDOC = hmDescTDOC.get(rs01.getString("TDOC").trim()).toString();
                } else {
                    objRtn.descTDOC = rs01.getString("TDOC").trim();
                }
                objRtn.descVOID = rs01.getString("VOID").trim();
                objRtn.FREVERSA = rs01.getString("FREVERSA").trim();
                if (rs01.getString("FREVERSA").equals("0")) {
                    objRtn.descFREVERSA = "Processed Reverse";
                } else if (rs01.getString("FREVERSA").equals("1")) {
                    objRtn.descFREVERSA = "Pending reverse";
                }
                objRtn.FREVADM = rs01.getString("FREVADM").trim();
                if (rs01.getString("FREVADM").equals("0")) {
                    objRtn.descFREVADM = "Processed Reverse";
                } else if (rs01.getString("FREVADM").equals("1")) {
                    objRtn.descFREVADM = "Pending reverse";
                }
                objRtn.FADM = rs01.getString("FADM").trim();
                if (rs01.getString("FADM").equals("1")) {
                    objRtn.descFADM = "ADM generado";
                }
                objRtn.LMERCHID = rs01.getString("LMERCHID").trim();
                objRtn.INVORNBR = rs01.getString("INVORNBR").trim();
                objRtn.SPNR = rs01.getString("SPNR").trim();
                objRtn.SELLERID = rs01.getString("SELLERID").trim();
                objRtn.SCARDN = rs01.getString("SCARDN").trim();
                objRtn.ISREFNBR = rs01.getString("ISREFNBR").trim();
                objRtn.DES_MERCHANT = rs01.getString("DES_MERCHANT").trim();
                objRtn.DES_SMERCHANT = rs01.getString("DES_SMERCHANT").trim();

                objRtn.GROSAMOUN = rs01.getDouble("GROSAMOUN");
                objRtn.TGROSAMOUN = rs01.getDouble("TGROSAMOUN");
                objRtn.SVFOPS = rs01.getDouble("SVFOPS");

                objRtn.DIFF_AMOUNT = objRtn.TGROSAMOUN - objRtn.SVFOPS;

                objRtn.TRANSDATE = rs01.getString("TRANSDATE");
                objRtn.TRANSID = rs01.getString("TRANSID");
                objRtn.SAUTHOC = rs01.getString("SAUTHOC");
                objRtn.INSTANBR = rs01.getString("INSTANBR");
                objRtn.NBRINSTA = rs01.getInt("NBRINSTA");

                objRtn.GROSAMOUNC = rs01.getDouble("GROSAMOUNC");
                objRtn.TGROSAMOUC = rs01.getDouble("TGROSAMOUC");
                objRtn.FINSAMOUC = rs01.getDouble("FINSAMOUC");
                objRtn.SINSAMOUC = rs01.getDouble("SINSAMOUC");

                objRtn.CERRORHST = rs01.getString("CERRORHST");
                objRtn.CERROR = rs01.getString("CERROR");
                objRtn.DES_CERROR = rs01.getString("DES_CERROR");
                if ("".equals(objRtn.CERROR.trim())) {
                    objRtn.DES_CERROR = "";
                }

                objRtn.CERROIN = rs01.getString("CERROIN");
                objRtn.DES_CERROIN = rs01.getString("DES_CERROIN");
                if ("".equals(objRtn.CERROIN.trim())) {
                    objRtn.DES_CERROIN = "";
                }

                objRtn.CODADJU = rs01.getString("CODADJU");
                objRtn.DES_CODADJU = rs01.getString("DES_CODADJU");
                if ("".equals(objRtn.CODADJU.trim())) {
                    objRtn.DES_CODADJU = "";
                }

                objRtn.FSELEC = rs01.getString("FSELEC");
                if ("".equals(objRtn.FSELEC.trim())) {
                    objRtn.FSELEC = "Not loaded";
                } else {
                    objRtn.FSELEC = "Loaded";
                }

                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

            }
        } catch (Exception e) {
            e.getMessage();
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

        return objRtn;
    }

    public String loadPX570SQP04360(A4116Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String msj = "";
        String fecha_a_validar = "";
        String SQLCLL01 = "";

        if (filter.TDOC.trim().equals("R")) {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04462(?,?,?,?,?,?,?)}";
        } else {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04360(?,?,?,?,?,?,?)}";
        }

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            if (filter.INSTANBR.trim().equals("0")) {
                fecha_a_validar = filter.BSUMDATE.trim();
            } else {
                fecha_a_validar = filter.TRANSDATE.trim();
            }

            cstmt01.registerOutParameter(7, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SCARDN.trim());
            cstmt01.setString(3, filter.SPNR.trim());
            cstmt01.setString(4, filter.ISREFNBR.trim());
            cstmt01.setString(5, fecha_a_validar);
            cstmt01.setDouble(6, filter.TGROSAMOUN);
            cstmt01.setString(7, msj);

            cstmt01.execute();

            msj = cstmt01.getString(7).trim();

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }

    public String loadPX570SQP04361(A4116Filter filter) throws SQLException, Exception {

        A4116Filter objRtn = new A4116Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //lstSendManual
        List<A4116Filter> lstSendManual = filter.lstSendManual;
        A4116Filter beanDet;
        A4116Filter beanObser;
        String msj = "";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04361(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PRDA.trim());
            cstmt01.setString(3, filter.MERCHID.trim());
            cstmt01.setString(4, filter.PAYDATE.trim());
            cstmt01.setString(5, filter.SCOUNTRY.trim());
            cstmt01.setString(6, filter.AXPAYNBR.trim());
            cstmt01.setString(7, filter.SMERCHID.trim());
            cstmt01.setString(8, filter.BSUMDATE.trim());
            cstmt01.setString(9, filter.SCARDN.trim());
            cstmt01.setString(10, filter.SAUTHOC.trim());
            cstmt01.setString(11, filter.IDITEMS.trim());
            cstmt01.setString(12, filter.IDITEMT.trim());
            cstmt01.setString(13, filter.SPNR.trim());
            cstmt01.setString(14, filter.ISREFNBR.trim());
            cstmt01.setDouble(15, filter.TGROSAMOUN);
            cstmt01.setString(16, filter.CERROR.trim());
            cstmt01.setInt(17, lstSendManual.size());
            cstmt01.setString(18, filter.ADJ_TYPE.trim());
            cstmt01.setString(19, session.getUserView().getUserInfo().USR);
            cstmt01.setString(20, Functions.getFechaActual());
            cstmt01.setString(21, Functions.getHoraActual());

            cstmt01.execute();

            //Añadir tickets para el desglose
            if (lstSendManual != null && lstSendManual.size() > 0) {
                String SQLCLL02 = "{CALL " + session.getMainLibrary() + "MP.SQP04453(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
                cstmt01 = cnx.prepareCall(SQLCLL02);
                for (int i = 0; i < lstSendManual.size(); i++) {
                    beanDet = lstSendManual.get(i);

                    cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
                    cstmt01.setString(2, filter.PRDA.trim());
                    cstmt01.setString(3, filter.IDITEMS.trim());
                    cstmt01.setString(4, filter.IDITEMT.trim());
                    cstmt01.setString(5, filter.MERCHID.trim());
                    cstmt01.setString(6, filter.PAYDATE.trim());
                    cstmt01.setString(7, filter.AXPAYNBR.trim());
                    cstmt01.setString(8, filter.BSUMDATE.trim());

                    cstmt01.setString(9, beanDet.A1531NREF.trim());
                    cstmt01.setString(10, beanDet.A1531CAPL.trim());
                    cstmt01.setDouble(11, beanDet.A1531VFOP);
                    cstmt01.setString(12, beanDet.A720PNR.trim());
                    cstmt01.setString(13, beanDet.A1531TKT.trim());
                    cstmt01.setString(14, beanDet.A720FECVTA.trim());
                    cstmt01.setString(15, beanDet.A720SEQ.trim());
                    cstmt01.setString(16, beanDet.A720GRUPO.trim());
                    cstmt01.setDouble(17, 0); //beanDet.SADJUST
                    cstmt01.setString(18, filter.ADJ_TYPE.trim());
                    cstmt01.setString(19, beanDet.STMANUAL);
                    cstmt01.setString(20, beanDet.A720AGENTE.trim());
                    cstmt01.setString(21, beanDet.A720ORIG.trim());
                    cstmt01.setString(22, session.getUserView().getUserInfo().USR);
                    cstmt01.setString(23, Functions.getFechaActual());
                    cstmt01.setString(24, Functions.getHoraActual());
                    cstmt01.setString(25, filter.OBSERV.trim());
                    if (!beanDet.STMANUAL.trim().equals("Blocked")) {
                        cstmt01.execute();
                    }
                }
            }

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }

    public String loadPX570SQP04636(A4116Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //lstSendManual

        String msj = "";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04636(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PRDA.trim());
            cstmt01.setString(3, filter.PAYDATE.trim());
            cstmt01.setString(4, filter.BSUMDATE.trim());
            cstmt01.setString(5, filter.IDITEMS.trim());
            cstmt01.setString(6, filter.IDITEMT.trim());
            cstmt01.setString(7, filter.CERROR.trim());
            cstmt01.setString(8, filter.SCOUNTRY.trim());
            cstmt01.setString(9, session.getUserView().getUserInfo().USR);
            cstmt01.setString(10, Functions.getFechaActual());
            cstmt01.setString(11, Functions.getHoraActual());

            cstmt01.execute();

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }

    public String loadPX570SQP04729(A4116Filter filter) throws SQLException, Exception {

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //lstSendManual

        String msj = "";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04729(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.AREFNBR.trim());
            cstmt01.setString(3, filter.PRDA.trim());
            cstmt01.setString(4, filter.TDOC.trim());
            cstmt01.setString(5, filter.OBSERV_BPO.trim());
            cstmt01.setString(6, session.getUserView().getUserInfo().USR);
            cstmt01.setString(7, Functions.getFechaActual());
            cstmt01.setString(8, Functions.getHoraActual());

            cstmt01.execute();

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }

    public String loadPX570SQP04469(A4116Filter filter) throws SQLException, Exception {

        A4116Filter objRtn = new A4116Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String NEW_CERROR = "";
        //lstSendManual
        List<A4116Filter> lstSendManual = filter.lstSendManual;
        A4116Filter beanDet;
        String msj = "";

        Connection cnx = null;
        try {
            //Cambiar Status a las transacciones
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            String SQLCLL02 = "{CALL " + session.getMainLibrary() + "MP.SQP04469(?,?,?,?,?,?,?,?)}";
            cstmt01 = cnx.prepareCall(SQLCLL02);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.AREFNBR_1.trim());
            cstmt01.setString(3, filter.TDOC_1.trim());
            cstmt01.setString(4, filter.AREFNBR_2.trim());
            cstmt01.setString(5, filter.TDOC_2.trim());
            cstmt01.setString(6, session.getUserView().getUserInfo().USR);
            cstmt01.setString(7, Functions.getFechaActual());
            cstmt01.setString(8, Functions.getHoraActual());

            cstmt01.execute();

        } catch (Exception e) {
            msj = e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    msj = e.getMessage();
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return msj;
    }

    public List<A4116Filter> loadPX570SQP04414(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        A4116Filter objRtn;
        objRtn = new A4116Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04414(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_WARNING.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();
                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04465(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        A4116Filter objRtn;
        objRtn = new A4116Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04465(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_WARNING.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();
                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04569(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        A4116Filter objRtn;
        objRtn = new A4116Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04569(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();
                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04570(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        A4116Filter objRtn;
        objRtn = new A4116Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04570(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_ZONA.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();
                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04617(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04617(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

                beanTkt.EMAIL = rst.getString("EMAIL").trim();
                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public double cambioSigno(double numero_base, double numero_a_cambiar) {
        if (numero_base >= 0) {
            numero_a_cambiar = Math.abs(numero_a_cambiar) * -1;
        } else {
            numero_a_cambiar = Math.abs(numero_a_cambiar);
        }
        return numero_a_cambiar;
    }

    public double mantenerSigno(double numero_base, double numero_a_cambiar) {
        if (numero_base >= 0) {
            numero_a_cambiar = Math.abs(numero_a_cambiar);
        } else {
            numero_a_cambiar = Math.abs(numero_a_cambiar) * -1;
        }
        return numero_a_cambiar;
    }

    public List<A4116Filter> loadPX570SQP04395(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);
        A4116Filter beanRec;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "";

        String IN_FECVTA = "";
        String IN_FECVTA_FROM = "";
        String IN_FECVTA_TO = "";
        
        int dias_antes = -1;
        int dias_despues = 1;

        if (filter.INSTANBR.trim().equals("0")) {
            IN_FECVTA = filter.BSUMDATE.trim();
        } else {
            IN_FECVTA = filter.TRANSDATE.trim();
        }

        if (filter.TDOC.trim().equals("R")) {
            IN_FECVTA_FROM = Functions.restXDaystoDate(IN_FECVTA, 730);
            IN_FECVTA_TO = Functions.restXDaystoDate(IN_FECVTA, -60);
            SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04456(?,?,?,?,?,?,?,?,?)}";
        } else {
            IN_FECVTA_FROM = Functions.restXDaystoDate(IN_FECVTA, dias_despues);
            IN_FECVTA_TO = Functions.restXDaystoDate(IN_FECVTA, dias_antes);
            SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04395(?,?,?,?,?,?,?,?,?)}";
        }

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SCARDN.trim());
            cstmt.setString(3, filter.SAUTHOC.trim());
            cstmt.setString(4, IN_FECVTA);
            cstmt.setString(5, IN_FECVTA_TO);
            cstmt.setString(6, IN_FECVTA_FROM);
            cstmt.setString(7, filter.ISREFNBR.trim());
            cstmt.setString(8, filter.SMERCHID.trim());
            cstmt.setString(9, filter.SPNR.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanRec = new A4116Filter();

                beanRec.A1531NREF = rst.getString("A1531NREF").trim();
                beanRec.A1531CAPL = rst.getString("A1531CAPL").trim();
                beanRec.A1531CIA = rst.getString("A1531CIA").trim();
                beanRec.A1531FORMA = rst.getString("A1531FORMA").trim();
                beanRec.A1531SERIE = rst.getString("A1531SERIE").trim();
                beanRec.A1531TKT = beanRec.A1531CIA + beanRec.A1531FORMA + beanRec.A1531SERIE;
                beanRec.A1531CFOP = rst.getString("A1531CFOP").trim();
                beanRec.A1531TTARJ = rst.getString("A1531TTARJ").trim();
                beanRec.A1531VFOP = rst.getDouble("A1531VFOP");
                beanRec.SADJUST = rst.getDouble("SADJUST");
                beanRec.tot_VFOP = rst.getDouble("tot_VFOP");
                beanRec.tot_VFOPB = rst.getDouble("tot_VFOPB");
                beanRec.FDUPLI = rst.getInt("FDUPLI");
                beanRec.FDUPLIB = rst.getInt("FDUPLIB");

                beanRec.A720PNR = rst.getString("A720PNR").trim();
                beanRec.A720SEQ = rst.getString("A720SEQ").trim();
                beanRec.A720GRUPO = rst.getString("A720GRUPO").trim();
                beanRec.A720FECVTA = rst.getString("A720FECVTA").trim();
                beanRec.A720AGENTE = rst.getString("A720AGENTE").trim();
                beanRec.A720ORIG = rst.getString("A720ORIG").trim();

                if (filter.TDOC.trim().equals("R")) {
                    beanRec.A1531VFOP = beanRec.A1531VFOP * -1;
                    beanRec.tot_VFOP = beanRec.tot_VFOP * -1;
                    beanRec.tot_VFOPB = beanRec.tot_VFOPB * -1;
                }

                lstInfo.add(beanRec);
            }
            rst.close();

            /*
            for (int i = 0; i < lstInfo.size(); i++) {
                String pnr2 = "";
                String pnr1 = lstInfo.get(i).A720PNR;
                try {
                    pnr2 = lstInfo.get(i + 1).A720PNR;
                } catch (Exception e) {
                }
                if (pnr2.equals(pnr1)) {
                    lstInfo.get(i).tot_VFOP = 0.00;
                }
            }
             */
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

        return lstInfo;
    }

    public List<A4116Filter> loadPX570SQP04455(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstInfo = new ArrayList<A4116Filter>(0);
        A4116Filter beanRec;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "";

        String IN_FECVTA = "";
        String IN_FECVTA_FROM = "";
        String IN_FECVTA_TO = "";

        IN_FECVTA = filter.BSUMDATE.trim();
        IN_FECVTA_FROM = Functions.restXDaystoDate(filter.BSUMDATE.trim(), 1);
        IN_FECVTA_TO = Functions.restXDaystoDate(filter.BSUMDATE.trim(), -1);

        if (filter.TDOC.trim().equals("R")) {
            IN_FECVTA_FROM = Functions.restXDaystoDate(filter.BSUMDATE.trim(), 365);
            IN_FECVTA_TO = Functions.restXDaystoDate(filter.BSUMDATE.trim(), -1);

            SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04457(?,?,?,?,?,?,?,?,?)}";
        } else {
            SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04455(?,?,?,?,?,?,?,?,?)}";
        }

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.TKT.trim());
            cstmt.setString(3, filter.SCARDN.trim());
            cstmt.setString(4, filter.SAUTHOC.trim());
            cstmt.setString(5, IN_FECVTA);
            cstmt.setString(6, IN_FECVTA_TO);
            cstmt.setString(7, IN_FECVTA_FROM);
            cstmt.setString(8, filter.INSTANBR.trim());
            cstmt.setString(9, filter.SMERCHID.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanRec = new A4116Filter();

                beanRec.A1531NREF = rst.getString("A1531NREF").trim();
                beanRec.A1531CAPL = rst.getString("A1531CAPL").trim();
                beanRec.A1531CIA = rst.getString("A1531CIA").trim();
                beanRec.A1531FORMA = rst.getString("A1531FORMA").trim();
                beanRec.A1531SERIE = rst.getString("A1531SERIE").trim();
                beanRec.A1531TKT = beanRec.A1531CIA + beanRec.A1531FORMA + beanRec.A1531SERIE;
                beanRec.A1531CFOP = rst.getString("A1531CFOP").trim();
                beanRec.A1531TTARJ = rst.getString("A1531TTARJ").trim();
                beanRec.A1531VFOP = rst.getDouble("A1531VFOP");
                beanRec.tot_VFOP = rst.getDouble("tot_VFOP");
                beanRec.tot_VFOPB = rst.getDouble("tot_VFOPB");
                beanRec.FDUPLI = rst.getInt("FDUPLI");
                beanRec.FDUPLIB = rst.getInt("FDUPLIB");

                beanRec.A720PNR = rst.getString("A720PNR").trim();
                beanRec.A720SEQ = rst.getString("A720SEQ").trim();
                beanRec.A720GRUPO = rst.getString("A720GRUPO").trim();
                beanRec.A720FECVTA = rst.getString("A720FECVTA").trim();
                beanRec.A720AGENTE = rst.getString("A720AGENTE").trim();

                if (filter.TDOC.trim().equals("R")) {
                    beanRec.A1531VFOP = beanRec.A1531VFOP * -1;
                    beanRec.tot_VFOP = beanRec.tot_VFOP * -1;
                    beanRec.tot_VFOPB = beanRec.tot_VFOPB * -1;
                }

                lstInfo.add(beanRec);
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

        return lstInfo;
    }

    public List<A4116Filter> loadPX570SQP04463(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");
        hmDescReglas.put("5", "Transact.");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "PLUSGRADE");
        hmDescFCOMPL.put("2", "LIGAS");
        hmDescFCOMPL.put("3", "TABLET");
        hmDescFCOMPL.put("4", "BPO");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04463(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.SCARDN);
            cstmt.setDouble(3, filter.TGROSAMOUN);
            cstmt.setString(4, filter.AREFNBR.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

                beanTkt.PRDA = rst.getString("PRDA").trim();
                beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                beanTkt.TRANSDATE = rst.getString("TRANSDATE").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.AREFNBR = rst.getString("AREFNBR").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                if (hmDescTDOC.containsKey(rst.getString("TDOC").trim())) {
                    beanTkt.descTDOC = hmDescTDOC.get(rst.getString("TDOC").trim()).toString();
                } else {
                    beanTkt.descTDOC = rst.getString("TDOC").trim();
                }
                beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                beanTkt.SVFOPS = rst.getDouble("SVFOPS");
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                    beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.descSTVAL = rst.getString("STVAL").trim();
                }

                beanTkt.DES_CERROR = rst.getString("DES_CERROR").trim();

                beanTkt.IDITEMS = rst.getString("IDITEMS");
                beanTkt.IDITEMT = rst.getString("IDITEMT");

                beanTkt.INSTANBR = rst.getString("INSTANBR");
                beanTkt.NBRINSTA = rst.getInt("NBRINSTA");

                lstTkts.add(beanTkt);
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04420(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "Pending");
        hmDescEstados.put("0", "Stand By");
        hmDescEstados.put("1", "Match");
        hmDescEstados.put("2", "Sales Without Settlement");
        hmDescEstados.put("3", "Settlement Without Sales");
        hmDescEstados.put("4", "Match with Differences");
        hmDescEstados.put("5", "Match Manual");
        hmDescEstados.put("6", "Forced Match");
        hmDescEstados.put("7", "Compensation Match");
        hmDescEstados.put("8", "Pending RFND");

        HashMap<String, String> hmDescReglas = new HashMap<String, String>();
        hmDescReglas.put("", "");
        hmDescReglas.put("1", "Tkt");
        hmDescReglas.put("2", "PNR");
        hmDescReglas.put("3", "CCard");
        hmDescReglas.put("4", "Manual");
        hmDescReglas.put("5", "Transact.");

        HashMap<String, String> hmDescTDOC = new HashMap<String, String>();
        hmDescTDOC.put("", "");
        hmDescTDOC.put("S", "Sales");
        hmDescTDOC.put("R", "Refund");
        hmDescTDOC.put("A", "Adjust.");
        hmDescTDOC.put("N", "ADM");

        HashMap<String, String> hmDescFCOMPL = new HashMap<String, String>();
        hmDescFCOMPL.put("", "");
        hmDescFCOMPL.put("1", "PLUSGRADE");
        hmDescFCOMPL.put("2", "LIGAS");
        hmDescFCOMPL.put("3", "TABLET");
        hmDescFCOMPL.put("4", "BPO");

        int contador = 0;
        String SCARDN = "";
        double TGROSAMOUN = 0;
        boolean color = true;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04420(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_STVAL_CP.trim());
            cstmt.setString(5, filter.IN_TDOC_CP.trim());
            cstmt.setString(6, filter.IN_SCARDN1_CP.trim() + '%' + filter.IN_SCARDN2_CP.trim() + '%');
            cstmt.setString(7, filter.IN_SAUTHOC_CP.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

                if (contador == 0) {
                    TGROSAMOUN = Math.abs(rst.getDouble("TGROSAMOUN"));
                    SCARDN = rst.getString("SCARDN").trim();
                }

                beanTkt.PRDA = rst.getString("PRDA").trim();
                beanTkt.PAYDATE = rst.getString("PAYDATE").trim();
                beanTkt.PCURRENCY = rst.getString("PCURRENCY").trim();
                beanTkt.SMERCHID = rst.getString("SMERCHID").trim();
                beanTkt.BSUMDATE = rst.getString("BSUMDATE").trim();
                beanTkt.SCARDN = rst.getString("SCARDN").trim();
                beanTkt.SAUTHOC = rst.getString("SAUTHOC").trim();
                beanTkt.SPNR = rst.getString("SPNR").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                if (hmDescTDOC.containsKey(rst.getString("TDOC").trim())) {
                    beanTkt.descTDOC = hmDescTDOC.get(rst.getString("TDOC").trim()).toString();
                } else {
                    beanTkt.descTDOC = rst.getString("TDOC").trim();
                }
                beanTkt.TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                beanTkt.SVFOPS = rst.getDouble("SVFOPS");
                beanTkt.STVAL = rst.getString("STVAL").trim();
                if (hmDescEstados.containsKey(rst.getString("STVAL").trim())) {
                    beanTkt.descSTVAL = hmDescEstados.get(rst.getString("STVAL").trim()).toString();
                } else {
                    beanTkt.descSTVAL = rst.getString("STVAL").trim();
                }

                beanTkt.INSTANBR = rst.getString("INSTANBR");
                beanTkt.NBRINSTA = rst.getInt("NBRINSTA");

                if (!(SCARDN.equals(rst.getString("SCARDN").trim()) && TGROSAMOUN == Math.abs(rst.getDouble("TGROSAMOUN")))) {
                    TGROSAMOUN = rst.getDouble("TGROSAMOUN");
                    SCARDN = rst.getString("SCARDN").trim();
                    color = !color;
                }

                if (color) {
                    beanTkt.COLOR = "#91b9fa";
                } else {
                    beanTkt.COLOR = "#e6ecf5";
                }

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
                contador++;
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

        return lstTkts;
    }

    public List<A4116Filter> loadPX570SQP04470(A4116Filter filter) throws SQLException, Exception {

        List<A4116Filter> lstTkts = new ArrayList<A4116Filter>(0);
        A4116Filter beanTkt;

        A4116Filter objRtn;
        objRtn = new A4116Filter();
        objRtn.CODE = "";
        objRtn.NAME = "None";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.SQP04470(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4116Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();
                lstTkts.add(beanTkt);
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

        return lstTkts;
    }
}
