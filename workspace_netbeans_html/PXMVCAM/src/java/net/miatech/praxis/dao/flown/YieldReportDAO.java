package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.dao.sales.*;
import static com.ibm.as400.data.PcmlMessageLog.logError;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class YieldReportDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public YieldReportDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadPX084S03A1784(A1692Filter filter, HashMap<String, String> hmPaises, HashMap<String, String> hmAeropuertos, int rowsPag) throws SQLException, Exception {
        String SQLCLL01;
        A1692Filter beanYield;
        List<A1692Filter> lstYield = new ArrayList(0);
        int PAGINIT = 0, totPAGS, totRowsPag = rowsPag, totRows = -1;
        try {

            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag + 1;
            }

            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX084S03A1784(?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            //cs.setString(4, Functions.getFechaActual());
            cs.setString(4, filter.NFLIGHT.trim());
            //cs.setString(5, filter.STVAL.trim());
            //cs.setString(6, filter.PSVVTA.trim());
            cs.setString(5, filter.CDEPART.trim());
            cs.setString(6, filter.CARRIVA.trim());
            cs.setInt(7, PAGINIT); //9
            cs.setInt(8, totRowsPag); //10
            cs.setInt(9, filter.intTotalRws); //11
            cs.execute();

            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(8)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(9);
                    String temp = String.valueOf(totRows / 20.0);
                    if (temp.contains(".")) {
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
                beanYield = new A1692Filter();
                beanYield.RN = rst.getLong("RN");
                beanYield.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                beanYield.IN_FECHA_TO = filter.IN_FECHA_TO;
                beanYield.DFLIGHT = rst.getString("DFLIGHT").trim(); //Flight Date
                beanYield.strFormatDate = Functions.getMonthConvert(beanYield.DFLIGHT);

                beanYield.NFLIGHT = rst.getString("NFLIGHT").trim(); //Flight No
                beanYield.CDEPART = rst.getString("CDEPART").trim(); //Departure
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanYield.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanYield.CARRIVA = rst.getString("CARRIVA").trim(); //Arrival
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanYield.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }

                beanYield.PASSNG = rst.getString("PAX").trim(); //Passengers
                beanYield.RVNUE = rst.getString("VCPN").trim(); //Revenue                
                beanYield.YIELD = rst.getString("YIELD").trim(); //Yield
                beanYield.RVNPAX = rst.getString("REVENUE").trim(); //Revenue by pax
                beanYield.KMS = rst.getString("KMS").trim(); //KMS

                beanYield.intCurrentPg = filter.intCurrentPg;
                beanYield.intPageRws = filter.intPageRws;
                beanYield.intTotalPgs = filter.intTotalPgs;
                beanYield.intTotalRws = filter.intTotalRws;

                //Paginación ===================================================
                if (filter.intCurrentPg > 0) {
                    beanYield.intCurrentPg = filter.intCurrentPg;
                } else {
                    beanYield.intCurrentPg = 1;
                }
                beanYield.pos = (20 * (beanYield.intCurrentPg - 1) + pos);
                beanYield.intPageRws = totRowsPag;
                beanYield.intTotalPgs = totPAGS;
                beanYield.intTotalRws = totRows;
                
                beanYield.page.PAGNUM = beanYield.pos;
                beanYield.page.PAGROW = beanYield.intPageRws;
                beanYield.page.TOTPAG = beanYield.intTotalPgs;
                beanYield.page.TOTROW = beanYield.intTotalRws;

                lstYield.add(beanYield);
            }

        } finally {
            setClose();
        }

        return lstYield;
    }
    
    public List<A1692Filter> loadPX084S02A1784(A1692Filter filter, int rowsPag) throws SQLException, Exception {
        String SQLCLL01;
        A1692Filter beanYield;
        List<A1692Filter> lstYield = new ArrayList(0);
        int PAGINIT = 0, totPAGS, totRowsPag = rowsPag, totRows = -1, PAX = 0;
        double VCPN = 0;
        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        //</editor-fold>
        try {

            if (filter.intCurrentPg > 0) {
                PAGINIT = (filter.intCurrentPg - 1) * totRowsPag + 1;
            }

            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX084S02A1784(?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.NFLIGHT.trim());
            cs.setString(6, filter.CDEPART.trim());
            cs.setString(7, filter.CARRIVA.trim());
            cs.setString(8, filter.KMS.trim());
            cs.setInt(9, PAGINIT); //9
            cs.setInt(10, totRowsPag); //10
            cs.setInt(11, filter.intTotalRws); //11
            cs.execute();

            if (filter.intTotalRws > 0 && filter.intTotalRws == cs.getInt(10)) {
                totRows = filter.intTotalRws;
                totPAGS = filter.intTotalPgs;
            } else {
                try {
                    totRows = cs.getInt(11);
                    String temp = String.valueOf(totRows / 20.0);
                    if (temp.contains(".")) {
                        totPAGS = (totRows / totRowsPag) + 1;
                    } else {
                        totPAGS = totRows / totRowsPag;
                    }
                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            rst = cs.getResultSet();

            while (rst.next()) {
                PAX = rst.getInt("PAX");
                VCPN = rst.getDouble("VCPN");
            }
//            try {
//                rst.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                int pos = 0;
                while (rst.next()) {
                    pos++;
                    beanYield = new A1692Filter();
                    beanYield.RN = rst.getLong("RN");
                    beanYield.DFLIGHT = rst.getString("DFLIGHT").trim(); //Flight Date
                    beanYield.DFLIGHT = Functions.getMonthConvert(beanYield.DFLIGHT);

                    beanYield.NFLIGHT = rst.getString("NFLIGHT").trim(); //Flight No

                    beanYield.CDEPART = rst.getString("CDEPART").trim(); //Departure
                    beanYield.CARRIVA = rst.getString("CARRIVA").trim(); //Arrival

                    beanYield.CLAS = rst.getString("CLAS").trim(); //Fare Class
                    beanYield.PASSNG = rst.getString("PAX").trim(); //Passengers
                    beanYield.RPK = rst.getString("RPK").trim(); //RPK
                    beanYield.RVNUE = rst.getString("REVENUE").trim(); //Revenue

                    beanYield.YIELD = rst.getString("YIELD").trim(); //Yield
                    beanYield.FBASE = rst.getString("FBASE").trim(); //Fare Basis CD
                    beanYield.ZONA = rst.getString("ZONA").trim(); //Zone
                    beanYield.RVNPAX = rst.getString("VCPN").trim(); //Revenue by pax
                    beanYield.CARR = rst.getString("CARR").trim(); //Carrier
                    beanYield.KMS = rst.getString("KMS").trim(); //KMS
                    beanYield.totTAX = PAX;
                    beanYield.totNETO = VCPN;

                    beanYield.intCurrentPg = filter.intCurrentPg;
                    beanYield.intPageRws = filter.intPageRws;
                    beanYield.intTotalPgs = filter.intTotalPgs;
                    beanYield.intTotalRws = filter.intTotalRws;

                    //Paginación ===================================================
                    if (filter.intCurrentPg > 0) {
                        beanYield.intCurrentPg = filter.intCurrentPg;
                    } else {
                        beanYield.intCurrentPg = 1;
                    }

                    beanYield.pos = (20 * (beanYield.intCurrentPg - 1) + pos);
                    beanYield.intPageRws = totRowsPag;
                    beanYield.intTotalPgs = totPAGS;
                    beanYield.intTotalRws = totRows;
                
                    beanYield.page.PAGNUM = beanYield.pos;
                    beanYield.page.PAGROW = beanYield.intPageRws;
                    beanYield.page.TOTPAG = beanYield.intTotalPgs;
                    beanYield.page.TOTROW = beanYield.intTotalRws;

                    lstYield.add(beanYield);
                }
            }
        } finally {
            setClose();
        }

        return lstYield;
    }
    
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
