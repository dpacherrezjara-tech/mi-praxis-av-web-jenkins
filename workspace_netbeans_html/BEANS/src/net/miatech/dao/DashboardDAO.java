/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.dao;
import java.sql.CallableStatement; import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.DashboardFilter;
import net.miatech.beans.FILTER;
import net.miatech.beans.Pagination;
import net.miatech.beans.UserView;
import net.miatech.beans.implement.IServerSession;
import net.miatech.dao.implement.IBaseDAO;
import net.miatech.dao.implement.IDashboardDAO;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.interline.filter.WRF016Filterwk;
import net.miatech.utils.Application;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author rmayta
 */
public class DashboardDAO implements IBaseDAO,IDashboardDAO {
    private IServerSession session;
    private Application app;
    private static final Logger logError = Logger.getLogger("errorLog");
    /**
     * Creates a new instance of DashboardDAO
     */
    public DashboardDAO(){

    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }


    public DashboardDAO(IServerSession ss){
        session = ss;
    }

    @Override
    public void setSession(IServerSession ss){
        session = ss;
    }
    
    @Override
    public void setApp(Application application) {
        app = application;
    }

    @Override
    public Map<Byte,List<DashboardFilter>> obtaingData(DashboardFilter filter) throws SQLException
    {
        return obtaingData(filter, new Pagination());
    }
/*
    public List<DashboardFilter> obtaingData(DashboardFilter filter, Pagination page) throws SQLException
    {
        List<DashboardFilter> lstRtn = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL LIBPASS.S0001P0001(?,?,?,?,?,?,?,?,?)}";

        try {
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.FLAG);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.DATE_FROM);
            cstmt01.setString(4, filter.DATE_TO);
            cstmt01.setString(5, filter.COUNTRY);
            cstmt01.setInt(6, page.PAGNUM);
            cstmt01.setInt(7, page.PAGROW);
            cstmt01.setInt(8, page.TOTPAG);
            cstmt01.setInt(9, page.TOTROW);

            cstmt01.execute();

            page.PAGNUM = cstmt01.getInt(6);
            page.PAGROW = cstmt01.getInt(7);
            page.TOTPAG = cstmt01.getInt(8);
            page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while(rs01.next()){
                objRtn = new DashboardFilter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                objRtn.CUPONS = rs01.getInt("CUPONS");
                objRtn.OFF = rs01.getDouble("OFF");
                objRtn.ON = rs01.getDouble("ON");
                objRtn.DSALES = rs01.getString("DSALES");
                objRtn.CUPONS_OFF = rs01.getInt("CUPONS_OFF");
                objRtn.CUPONS_ON = rs01.getInt("CUPONS_ON");
                lstRtn.add(objRtn);
            }
        } finally{
            if (rs01 != null) rs01.close();
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
        }

        return lstRtn;
    }
    */
    @Override
    public Map<Byte,List<DashboardFilter>> obtaingData(DashboardFilter filter, Pagination page) throws SQLException
    {
        Map<Byte,List<DashboardFilter>> mapRtn = new HashMap<Byte, List<DashboardFilter>>(0);
        List<DashboardFilter> lstSalesByMonthTotals = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstSalesByMonthData = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstSalesByChannelsTotals = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstSalesByChannelsData = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lstSalesByCountrysData = new ArrayList<DashboardFilter>(0);
        DashboardFilter objRtn;
        String flag="";

        mapRtn.put(DashboardFilter.P_SALES_PER_MONTH_TOTALS, lstSalesByMonthTotals);
        mapRtn.put(DashboardFilter.P_SALES_PER_MONTH_DATA, lstSalesByMonthData);
        mapRtn.put(DashboardFilter.P_SALES_PER_CHANNELS_TOTALS, lstSalesByChannelsTotals);
        mapRtn.put(DashboardFilter.P_SALES_PER_CHANNELS_DATA, lstSalesByChannelsData);
        mapRtn.put(DashboardFilter.P_SALES_PER_COUNTRYS_DATA, lstSalesByCountrysData);

        CallableStatement cstmt01 = null;
        ResultSet rs00 = null, rs01 = null, rs02 = null, rs03 = null, rs04 = null;

        String SQLCLL01 = "{CALL PRAXIS.S0001P0001(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DATE_FROM);
            cstmt01.setString(3, filter.DATE_TO);
            cstmt01.setString(4, filter.COUNTRY);
            cstmt01.setByte(5, filter.TOP);

            cstmt01.execute();
            
            rs00 = cstmt01.getResultSet();
            while(rs00.next()){
                objRtn = new DashboardFilter();
                objRtn.QCPNSF = rs00.getInt("QCPNSF");
                objRtn.AMOUNTF = rs00.getDouble("AMOUNTF");
                objRtn.TOTAL_CUPONS_PERCENTF = rs00.getDouble("TOTAL_COUPON_FLOWN_PER");
                objRtn.TOTAL_AMOUNT = rs00.getDouble("TOTAL_AMOUNT");
                objRtn.TOTAL_CUPONS = rs00.getInt("TOTAL_CUPONS");
                objRtn.TOTAL_AMOUNT_OFF = rs00.getDouble("TOTAL_AMOUNT_OFF");
                objRtn.TOTAL_AMOUNT_ON = rs00.getDouble("TOTAL_AMOUNT_ON");
                objRtn.TOTAL_CUPONS_OFF = rs00.getInt("TOTAL_CUPONS_OFF");
                objRtn.TOTAL_CUPONS_ON = rs00.getInt("TOTAL_CUPONS_ON");
                objRtn.totAVG = rs00.getDouble("TOTAL_AVG");
                objRtn.TOTAL_AMOUNT_ON_AVG_RATE = rs00.getDouble("TOTAL_AMOUNT_ON_AVG_RATE");
                objRtn.TOTAL_AMOUNT_OFF_AVG_RATE = rs00.getDouble("TOTAL_AMOUNT_OFF_AVG_RATE");
                
                
                objRtn.AMOUNT_OFF_PERCENT = rs00.getDouble("AMOUNT_OFF_PERCENT");
                objRtn.AMOUNT_ON_PERCENT = rs00.getDouble("AMOUNT_ON_PERCENT");
                objRtn.CUPONS_OFF_PERCENT = rs00.getDouble("CUPONS_OFF_PERCENT");
                objRtn.CUPONS_ON_PERCENT = rs00.getDouble("CUPONS_ON_PERCENT");
                
                lstSalesByMonthTotals.add(objRtn);
            }
            if(cstmt01.getMoreResults()){
                rs01 = cstmt01.getResultSet();
                
                while(rs01.next()){
                    objRtn = new DashboardFilter();
                    objRtn.DSALES = rs01.getString("DSALES");
                    objRtn.strFormatDate=Functions.getMonthConvert6(objRtn.DSALES);
                    //objRtn.strFormatDate = Functions.getAbreviaturaMes(objRtn.DSALES.substring(4,6));            
 
                    objRtn.AMOUNT = rs01.getDouble("AMOUNT");
                    objRtn.CUPONS = rs01.getInt("CUPONS");
                    objRtn.QCPNSF = rs01.getInt("QCPNSF");
                    objRtn.AMOUNTF = rs01.getDouble("AMOUNTF");
                    objRtn.CUPONS_PERCENTF = rs01.getDouble("COUPON_FLOWN_PERC");
                    objRtn.TARIFA = rs01.getDouble("TARIFA");
                    objRtn.CUPONS_AVG = rs01.getDouble("CUPONS_AVG");
                    objRtn.AMOUNT_AVG_RATE = rs01.getDouble("AMOUNT_AVG_RATE");
                    objRtn.AMOUNT_OFF = rs01.getDouble("AMOUNT_OFF");
                    objRtn.AMOUNT_ON = rs01.getDouble("AMOUNT_ON");
                    objRtn.CUPONS_OFF = rs01.getInt("CUPONS_OFF");
                    objRtn.CUPONS_ON = rs01.getInt("CUPONS_ON");
                    objRtn.AMOUNT_OFF_PERCENT = rs01.getDouble("AMOUNT_OFF_PERCENT");
                    objRtn.AMOUNT_ON_PERCENT = rs01.getDouble("AMOUNT_ON_PERCENT");
                    objRtn.CUPONS_OFF_PERCENT = rs01.getDouble("CUPONS_OFF_PERCENT");
                    objRtn.CUPONS_ON_PERCENT = rs01.getDouble("CUPONS_ON_PERCENT");
                    objRtn.AMOUNT_OFF_AVG_RATE = rs01.getDouble("AMOUNT_OFF_AVG_RATE");
                    objRtn.AMOUNT_ON_AVG_RATE = rs01.getDouble("AMOUNT_ON_AVG_RATE");
                    
                    flag = rs01.getString("FLAG");
                    objRtn.FLAG =flag.substring(0,1);
                    objRtn.COMENTARIO =flag.substring(1);
                    if(!objRtn.FLAG.equals("1")){//cuando sea 0 esta abierto y contiene fecha
                        objRtn.COMENTARIO = Functions.getMonthConvert(objRtn.COMENTARIO);
                        //objRtn.COMENTARIO = Functions.getMonthConvert(Functions.rest1DaytoDate(Functions.getFechaActual()));
                    }
                    lstSalesByMonthData.add(objRtn);
                }
                if(cstmt01.getMoreResults()){
                    rs02 = cstmt01.getResultSet();

                    if(rs02.next()){
                        objRtn = new DashboardFilter();
                        objRtn.TOTAL_AMOUNT = rs02.getDouble("TOTAL_AMOUNT");
                        objRtn.TOTAL_CUPONS = rs02.getInt("TOTAL_CUPONS");
                        objRtn.TOTAL_AMOUNT_OFF = rs02.getDouble("TOTAL_AMOUNT_OFF");
                        objRtn.TOTAL_AMOUNT_ON = rs02.getDouble("TOTAL_AMOUNT_ON");
                        objRtn.TOTAL_CUPONS_OFF = rs02.getInt("TOTAL_CUPONS_OFF");
                        objRtn.TOTAL_CUPONS_ON = rs02.getInt("TOTAL_CUPONS_ON");
                        objRtn.TOTAL_AMOUNT_ON_AVG_RATE = rs02.getDouble("TOTAL_AMOUNT_ON_AVG_RATE");
                        objRtn.TOTAL_AMOUNT_OFF_AVG_RATE = rs02.getDouble("TOTAL_AMOUNT_OFF_AVG_RATE");
                        lstSalesByChannelsTotals.add(objRtn);
                    }

                    if(cstmt01.getMoreResults()){
                        rs03 = cstmt01.getResultSet();

                        while(rs03.next()){
                            objRtn = new DashboardFilter();
                            objRtn.CANAV = rs03.getString("CANAV");
                            objRtn.CANAVT = rs03.getString("CANAVT");
                            objRtn.CUPONS = rs03.getInt("CUPONS");
                            objRtn.AMOUNT = rs03.getDouble("AMOUNT");
                            objRtn.TARIFA = rs03.getDouble("TARIFA");
                            objRtn.CUPONS_AVG = rs03.getDouble("AVG_CUPONS");
                            objRtn.AMOUNT_AVG_RATE = rs03.getDouble("AVG");
                            objRtn.AMOUNT_OFF = rs03.getDouble("AMOUNT_OFF");
                            objRtn.AMOUNT_ON = rs03.getDouble("AMOUNT_ON");
                            objRtn.CUPONS_OFF = rs03.getInt("CUPONS_OFF");
                            objRtn.CUPONS_ON = rs03.getInt("CUPONS_ON");
                            objRtn.AMOUNT_OFF_AVG_RATE = rs03.getDouble("AMOUNT_OFF_AVG_RATE");
                            objRtn.AMOUNT_ON_AVG_RATE = rs03.getDouble("AMOUNT_ON_AVG_RATE");
                            lstSalesByChannelsData.add(objRtn);
                        }

                        if(cstmt01.getMoreResults()){
                            rs04 = cstmt01.getResultSet();

                            while(rs04.next()){
                                objRtn = new DashboardFilter();
                                objRtn.COUNTRY = rs04.getString("COUNTRY");
                                objRtn.COUNTRY_NAME = rs04.getString("COUNTRY_NAME");
                                objRtn.AMOUNT = rs04.getDouble("AMOUNT");
                                objRtn.CUPONS = rs04.getInt("CUPONS");
                                objRtn.AMOUNT_OFF = rs04.getDouble("AMOUNT_OFF");
                                objRtn.AMOUNT_ON = rs04.getDouble("AMOUNT_ON");
                                objRtn.CUPONS_OFF = rs04.getInt("CUPONS_OFF");
                                objRtn.CUPONS_ON = rs04.getInt("CUPONS_ON");

                                lstSalesByCountrysData.add(objRtn);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.getMessage();
        } finally{
            if (rs00 != null) rs00.close();
            if (rs01 != null) rs01.close();
            if (rs02 != null) rs02.close();
            if (rs03 != null) rs03.close();
            if (rs04 != null) rs04.close();
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
        }

        return mapRtn;
    }

    /*public List loadVentasA1426DefaultAmt(FILTER filter) throws SQLException {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "", strSQLGroup = "", strLibreria = "IMF080";
        List listado = new ArrayList();
        List listadoDI = null;
        NumberFormat nfDbl = NumberFormat.getInstance(java.util.Locale.US);
        nfDbl.setMinimumFractionDigits(2);
        nfDbl.setMaximumFractionDigits(2);
        NumberFormat nfLng = NumberFormat.getInstance(java.util.Locale.US);
        nfLng.setMaximumFractionDigits(0);

        // INVOICE DATE ===========================================================================
        String strSQLTemp = "";
        //VALIDACION TEMPORAL
        if (filter.strYearFrom.equals("") && filter.strYearTo.equals("")) {
            filter.strYearFrom = "2013";
            filter.strYearTo = "2013";
        }


        filter.strYearFrom = Functions.fillZeros(2, filter.strYearFrom).replace("00", "");//YY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(2, filter.strYearTo).replace("00", "");//YY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");


        if (!filter.strYearFrom.trim().equals("") && !filter.strMonthFrom.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 1, 4) = '".concat(filter.strYearFrom.trim())
                    + "' AND SUBSTR(DSALES, 5, 2) = '".concat(filter.strMonthFrom.trim()).concat("' ");
        } else if (!filter.strYearFrom.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 1, 4) = '".concat(filter.strYearFrom.trim()).concat("' ");
        } else if (!filter.strMonthFrom.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 5, 2) = '".concat(filter.strMonthFrom.trim()).concat("' ");
        }

        if (!filter.strYearTo.trim().equals("") && !filter.strMonthTo.trim().equals("")) {

            strSQLTemp = " AND SUBSTR(DSALES, 1, 4) BETWEEN '".concat(filter.strYearFrom.trim())
                    + "' AND '".concat(filter.strYearFrom.trim()).concat("' AND  SUBSTR(DSALES, 5, 2) BETWEEN '")
                    + filter.strMonthFrom.trim().concat("' AND '").concat(filter.strMonthTo.trim()).concat("' ");

        } else if (!filter.strYearTo.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 1, 4) BETWEEN '".concat(filter.strYearFrom.trim())
                    + "' AND '".concat(filter.strYearTo).concat("' ");
        } else if (!filter.strMonthTo.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 5, 2) BETWEEN '".concat(filter.strMonthFrom.trim())
                    + "' AND '".concat(filter.strMonthTo).concat("' ");
        }

        if (filter.cmbCountry != null && !filter.cmbCountry.trim().equals("")) {
            strSQLTemp += " AND COUNTRYS = '".concat(filter.cmbCountry.trim()).concat("' ");
            strLibreria = "IMF081";
        }

        strSQLGroup = " GROUP BY DSALES ORDER BY DSALES  ASC";
        session.getCNXIBMDB2().open();
        try {

            strSQL = "SELECT DSALES, SUM(AMOUNTOF) OFF, SUM(AMOUNTON) ON, SUM(QCPNSOF) CUPON_OFF, SUM(QCPNSON) CUPON_ON, ";

            if (strFilters.equals("N")) {
                strSQL += "SUM(AMOUNT1 + AMOUNT4 + AMOUNTIT14 + AMOUNTIT23 + AMOUNTBT14 + AMOUNTBT23 + AMOUNTEX14 + AMOUNTEX23) AMOUNT, "
                        + "SUM(QCPNS1 + QCPNS4 + QCPNS23 + QCPNIT14 + QCPNIT23 + QCPNBT14 + QCPNBT23 + QCPNEX14 + QCPNEX23) CUPONS "
                        + "FROM " + session.getMainLibrary() + "." + strLibreria + " WHERE CCUST = '" + ccust + "' ";
            } else {
                strSQL += "SUM(AMOUNT1 + AMOUNT4) AMOUNT, SUM(QCPNS1 + QCPNS4) CUPONS "
                        + "FROM " + session.getMainLibrary() + "." + strLibreria + " WHERE (AMOUNT1 + AMOUNT4) <> 0 AND CCUST = '" + ccust + "' ";
            }

            strSQL += strSQLTemp + strSQLGroup;

            stmt = session.getCNXIBMDB2().getConnection().createStatement();
            rst = stmt.executeQuery(strSQL);

            int top = -1;
            try {
                top = Integer.parseInt(filter.cmbTop);
            } catch (Exception ex) {
                top = -1;
            }

            double total_off = 0.0;
            double total_on = 0.0;
            double total = 0.0;
            long total_cupon_off = 0;
            long total_cupon_on = 0;
            long total_cupons = 0;
            int contador = 0;
            boolean swap_type = false;

            //TOTALES
            if (top == -1) {
                while (rst.next()) {
                    total += rst.getDouble("AMOUNT");
                    total_cupons += rst.getInt("CUPONS");
                    //******************* ONLINE *******************************
                    //**********************************************************
                    total_on += rst.getDouble("ON");
                    total_cupon_on += rst.getInt("CUPON_ON");
                    //********************* OFFLINE ****************************
                    //**********************************************************
                    if (ccust.trim().equals("13*")) {
                        total_off += rst.getDouble("AMOUNT");
                        total_cupon_off += rst.getInt("CUPONS");
                    } else {
                        total_off += rst.getDouble("OFF");
                        total_cupon_off += rst.getInt("CUPON_OFF");
                    }
                }
            } else {
                while (rst.next()) {
                    contador++;
                    total += rst.getDouble("AMOUNT");
                    total_cupons += rst.getInt("CUPONS");
                }
            }

            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                HashMap hm = new HashMap();
                hm.put("CCUST", ccust.trim());
                hm.put("SELFILTERS", strFilters);
                hm.put("DESCRI", String.valueOf(Functions.getAbreviaturaMes(rst.getString("DSALES").trim().substring(4, 6)) + " - " + rst.getString("DSALES").substring(0, 4)));
                hm.put("MESCHART", Functions.getAbreviaturaMes(rst.getString("DSALES").trim().substring(4, 6)));
                hm.put("DSALES", rst.getString("DSALES").trim());
                hm.put("COMENTARIO", checkFlagByMonth(rst.getString("DSALES").trim(), ccust));

                hm.put("CUPONS", nfLng.format(rst.getInt("CUPONS")));
                hm.put("AMOUNT", rst.getDouble("AMOUNT"));
                hm.put("AMOUNT_TOTAL", nfLng.format(total));
                hm.put("CUPONS_TOTAL", nfLng.format(total_cupons));
                //******************* ONLINE ***********************************
                //**************************************************************
                hm.put("AMOUNT_ON", rst.getDouble("ON"));
                hm.put("CUPONS_ON", nfLng.format(rst.getInt("CUPON_ON")));

                hm.put("AMOUNT_TOTAL_ON", total_on);
                hm.put("CUPONS_TOTAL_ON", nfLng.format(total_cupon_on));
                hm.put("AVG_TOTAL_RATE_ON", nfDbl.format(Double.isNaN(total_on / total_cupon_on) ? 0 : total_on / total_cupon_on));
                //Porcentajes
                hm.put("PER_TOTAL_CPN_ON", nfDbl.format((total_cupons > 0) ? (total_cupon_on * 100.0) / total_cupons : 0));
                hm.put("PER_TOTAL_AMOUNT_ON", nfDbl.format((total > 0) ? (total_on * 100.0) / total : 0));
                try {
                    hm.put("AVG_ON", nfDbl.format(Double.isNaN((rst.getDouble("ON") * 100) / rst.getDouble("AMOUNT")) ? 0 : (rst.getDouble("ON") * 100) / rst.getDouble("AMOUNT")));
                } catch (Exception e) {
                    hm.put("AVG_ON", 0);
                }
                try {
                    hm.put("AVG_CUPONS_ON", nfDbl.format(Double.isNaN((rst.getDouble("CUPON_ON") * 100) / rst.getDouble("CUPONS")) ? 0 : (rst.getDouble("CUPON_ON") * 100) / rst.getDouble("CUPONS")));
                } catch (Exception e) {
                    hm.put("AVG_CUPONS_ON", 0);
                }
                try {
                    hm.put("AVG_RATE_ON", nfDbl.format(Double.isNaN(rst.getDouble("ON") / rst.getDouble("CUPON_ON")) ? 0 : rst.getDouble("ON") / rst.getDouble("CUPON_ON")));
                } catch (Exception e) {
                    hm.put("AVG_RATE_ON", 0);
                }
                //********************* OFFLINE ********************************
                //**************************************************************
                if (ccust.trim().equals("13*")) {
                    hm.put("AMOUNT_OFF", rst.getDouble("AMOUNT"));
                    hm.put("CUPONS_OFF", nfLng.format(rst.getInt("CUPONS")));
                    try {
                        hm.put("AVG_OFF", nfDbl.format(Double.isNaN((rst.getDouble("AMOUNT") * 100) / rst.getDouble("AMOUNT")) ? 0 : (rst.getDouble("AMOUNT") * 100) / rst.getDouble("AMOUNT")));
                    } catch (Exception e) {
                        hm.put("AVG_OFF", 0);
                    }
                    try {
                        hm.put("AVG_CUPONS_OFF", nfDbl.format(Double.isNaN((rst.getDouble("CUPONS") * 100) / rst.getDouble("CUPONS")) ? 0 : (rst.getDouble("CUPONS") * 100) / rst.getDouble("CUPONS")));
                    } catch (Exception e) {
                        hm.put("AVG_CUPONS_OFF", 0);
                    }
                    try {
                        hm.put("AVG_RATE_OFF", nfDbl.format(Double.isNaN(rst.getDouble("AMOUNT") / rst.getDouble("CUPONS")) ? 0 : rst.getDouble("AMOUNT") / rst.getDouble("CUPONS")));
                    } catch (Exception e) {
                        hm.put("AVG_RATE_OFF", 0);
                    }
                } else {
                    hm.put("AMOUNT_OFF", rst.getDouble("OFF"));
                    hm.put("CUPONS_OFF", nfLng.format(rst.getInt("CUPON_OFF")));
                    try {
                        hm.put("AVG_OFF", nfDbl.format(Double.isNaN((rst.getDouble("OFF") * 100) / rst.getDouble("AMOUNT")) ? 0 : (rst.getDouble("OFF") * 100) / rst.getDouble("AMOUNT")));
                    } catch (Exception e) {
                        hm.put("AVG_OFF", 0);
                    }
                    try {
                        hm.put("AVG_CUPONS_OFF", nfDbl.format(Double.isNaN((rst.getDouble("CUPON_OFF") * 100) / rst.getDouble("CUPONS")) ? 0 : (rst.getDouble("CUPON_OFF") * 100) / rst.getDouble("CUPONS")));
                    } catch (Exception e) {
                        hm.put("AVG_CUPONS_OFF", 0);
                    }
                    try {
                        hm.put("AVG_RATE_OFF", nfDbl.format(Double.isNaN(rst.getDouble("OFF") / rst.getDouble("CUPON_OFF")) ? 0 : rst.getDouble("OFF") / rst.getDouble("CUPON_OFF")));
                    } catch (Exception e) {
                        hm.put("AVG_RATE_OFF", 0);
                    }
                }

                hm.put("AMOUNT_TOTAL_OFF", total_off);
                hm.put("CUPONS_TOTAL_OFF", nfLng.format(total_cupon_off));
                hm.put("AVG_TOTAL_RATE_OFF", nfDbl.format(Double.isNaN(total_off / total_cupon_off) ? 0 : total_off / total_cupon_off));

                //Porcentajes
                hm.put("PER_TOTAL_CPN_OFF", nfDbl.format((total_cupons > 0) ? (total_cupon_off * 100.0) / total_cupons : 0));
                hm.put("PER_TOTAL_AMOUNT_OFF", nfDbl.format((total > 0) ? (total_off * 100.0) / total : 0));
                //**************************************************************
                //**************************************************************
                try {
                    hm.put("TARIFA", nfDbl.format(Double.isNaN((rst.getDouble("AMOUNT")) / rst.getDouble("CUPONS")) ? 0 : (rst.getDouble("AMOUNT")) / rst.getDouble("CUPONS")));
                } catch (Exception e) {
                    hm.put("TARIFA", 0);
                }

                listado.add(hm);
            }

            if (swap_type) {
                for (int i = 0; i < listadoDI.size(); i++) {
                    if (((HashMap) listado.get(i)).get("DESCRI").toString().equals(((HashMap) listado.get(i + 1)).get("DESCRI").toString())) {
                    }
                }
            }


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    rst.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            session.getCNXIBMDB2().close();
        }

        return listado;
    }*/

    public List loadVentasA1426Pais(String ccust, String calfa, UserView user, FILTER filter, HashMap hmPaises) throws SQLException {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "", strSQLGroup = "";
        List listado = new ArrayList();
        int top = -1;

        // INVOICE DATE ===========================================================================
        String strSQLTemp = "";
        //VALIDACION TEMPORAL
        if (filter.strYearFrom.equals("") && filter.strYearTo.equals("")) {
            filter.strYearFrom = "2013";
            filter.strYearTo = "2013";
        }

        filter.strYearFrom = Functions.fillZeros(2, filter.strYearFrom).replace("00", "");//YY
        filter.strMonthFrom = Functions.fillZeros(2, filter.strMonthFrom).replace("00", "");
        filter.strYearTo = Functions.fillZeros(2, filter.strYearTo).replace("00", "");//YY
        filter.strMonthTo = Functions.fillZeros(2, filter.strMonthTo).replace("00", "");

        if (!filter.strYearFrom.trim().equals("") && !filter.strMonthFrom.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 1, 4) = '".concat(filter.strYearFrom.trim())
                    + "' AND SUBSTR(DSALES, 5, 2) = '".concat(filter.strMonthFrom.trim()).concat("' ");
        } else if (!filter.strYearFrom.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 1, 4) = '".concat(filter.strYearFrom.trim()).concat("' ");
        } else if (!filter.strMonthFrom.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 5, 2) = '".concat(filter.strMonthFrom.trim()).concat("' ");
        }

        if (!filter.strYearTo.trim().equals("") && !filter.strMonthTo.trim().equals("")) {

            strSQLTemp = " AND SUBSTR(DSALES, 1, 4) BETWEEN '".concat(filter.strYearFrom.trim())
                    + "' AND '".concat(filter.strYearFrom.trim()).concat("' AND  SUBSTR(DSALES, 5, 2) BETWEEN '")
                    + filter.strMonthFrom.trim().concat("' AND '").concat(filter.strMonthTo.trim()).concat("' ");

        } else if (!filter.strYearTo.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 1, 4) BETWEEN '".concat(filter.strYearFrom.trim())
                    + "' AND '".concat(filter.strYearTo).concat("' ");
        } else if (!filter.strMonthTo.trim().equals("")) {
            strSQLTemp = " AND SUBSTR(DSALES, 5, 2) BETWEEN '".concat(filter.strMonthFrom.trim())
                    + "' AND '".concat(filter.strMonthTo).concat("' ");
        }

        if (filter.cmbCountry != null && !filter.cmbCountry.trim().equals("")) {
            strSQLTemp += " AND COUNTRYS = '".concat(filter.cmbCountry.trim()).concat("' ");
        }

        strSQLGroup = " GROUP BY COUNTRYS ORDER BY SUM(AMOUNT1 + AMOUNT4) DESC ";

        session.getCNXIBMDB2().open();
        try {

            strSQL = " SELECT IFNULL(SUM(QCPNSF),0) QCPNSF,IFNULL(SUM(AMOUNTF),0) AMOUNTF,"
                    + " SUM(AMOUNT1 + AMOUNT4) AMOUNT, SUM(QCPNS1 + QCPNS4) CUPONS, SUM(AMOUNTOF) OFF, "
                    + " SUM(AMOUNTON) ON, COUNTRYS, SUM(QCPNSOF) CUPON_OFF, SUM(QCPNSON) CUPON_ON "
                    + " FROM " + session.getMainLibrary() + ".IMF081 WHERE AMOUNT1 + AMOUNT4 <> 0 AND CCUST = '".concat(ccust)
                    + "' ".concat(strSQLTemp).concat(strSQLGroup);

            stmt = session.getCNXIBMDB2().getConnection().createStatement();

            rst = stmt.executeQuery(strSQL);

            double total = 0.0;
            double total_top = 0.0;
            double total_off = 0.0;
            double total_off_top = 0.0;
            double total_on = 0.0;
            double total_on_top = 0.0;

            long total_cupon_off = 0;
            long total_cupon_off_top = 0;
            long total_cupon_on = 0;
            long total_cupon_on_top = 0;
            long total_cupons = 0;
            long total_cupons_top = 0;
            
            long total_cuponsF = 0;
            double total_amountF = 0.0;

            int contador = 0;

            // <editor-fold defaultstate="collapsed" desc="VALIDAR SI ES QUE SE SELECCIONO EL TOP">
            try {
                top = Integer.parseInt(filter.cmbTop);
            } catch (Exception ex) {
                top = -1;
            }// </editor-fold>

            //TOTALES

            while (rst.next()) {
                total_cuponsF += rst.getInt("QCPNSF");
                total_amountF += rst.getDouble("AMOUNTF");
                
                try {
                    total += Double.parseDouble(rst.getString("AMOUNT").trim());
                } catch (Exception e) {
                    total += 0;
                }
                try {
                    total_cupons += Integer.parseInt(rst.getString("CUPONS").trim());
                } catch (Exception e) {
                    total_cupons += 0;
                }
                try {
                    total_off += Double.parseDouble(rst.getString("OFF"));
                } catch (Exception e) {
                    total_off += 0;
                }
                try {
                    total_on += Double.parseDouble(rst.getString("ON"));
                } catch (Exception e) {
                    total_on += 0;
                }
                try {
                    total_cupon_off += Integer.parseInt(rst.getString("CUPON_OFF").trim());
                } catch (Exception e) {
                    total_cupon_off += 0;
                }
                try {
                    total_cupon_on += Integer.parseInt(rst.getString("CUPON_ON").trim());
                } catch (Exception e) {
                    total_cupon_on += 0;
                }
            }


            rst = stmt.executeQuery(strSQL);
            //RESETEAR EL CONTADOR
            contador = 0;

            int c = 0;
            while (rst.next()) {
                c++;
                HashMap hm = new HashMap();
                //hm.put("DESCRI", Functions.searchCityandCountry(lstPaises, rst.getString("COUNTRYS").trim()));
                //Nombre Pais ==================================================

                hm.put("NBR", c);

                if (hmPaises.containsKey(rst.getString("COUNTRYS").trim())) {
                    hm.put("DESCRI", hmPaises.get(rst.getString("COUNTRYS").trim()));
                } else {
                    hm.put("DESCRI", "INTERNET");
                }
                hm.put("COUNTRYS", rst.getString("COUNTRYS").trim());
                try {
                    hm.put("CUPONS", Integer.parseInt(rst.getString("CUPONS").trim()));
                } catch (Exception e) {
                    hm.put("CUPONS", 0);
                }
                try {
                    hm.put("AMOUNT", Double.parseDouble(rst.getString("AMOUNT")));
                } catch (Exception e) {
                    hm.put("AMOUNT", 0);
                }
                hm.put("AMOUNT_TOTAL", total);
                hm.put("CUPONS_TOTAL", total_cupons);
                
                
                hm.put("QCPNSF", rst.getInt("QCPNSF"));
                hm.put("AMOUNTF", rst.getDouble("AMOUNTF"));
                hm.put("CUPONS_PER_USE", (rst.getInt("CUPONS")>0)?((rst.getInt("QCPNSF")*100.0)/rst.getInt("CUPONS")):0);
                hm.put("AMOUNT_TOTALF", total_amountF);
                hm.put("CUPONS_TOTALF", total_cuponsF);
                hm.put("TOTAL_CUPONS_PER_USE", (total>0)?((total_amountF*100.0)/total):0);
                
                try {
                    hm.put("AVG", (Double.parseDouble(rst.getString("AMOUNT")) * 100) / total);
                } catch (Exception e) {
                    hm.put("AVG", 0);
                }
                try {
                    hm.put("AVG_CUPONS", (Double.parseDouble(rst.getString("CUPONS")) * 100) / total_cupons);
                } catch (Exception e) {
                    hm.put("AVG_CUPONS", 0);
                }

                try {
                    hm.put("AMOUNT_OFF", Double.parseDouble(rst.getString("OFF")));
                } catch (Exception e) {
                    hm.put("AMOUNT_OFF", 0);
                }
                try {
                    hm.put("AMOUNT_ON", Double.parseDouble(rst.getString("ON")));
                } catch (Exception e) {
                    hm.put("AMOUNT_ON", 0);
                }
                try {
                    hm.put("CUPONS_OFF", Integer.parseInt(rst.getString("CUPON_OFF").trim()));
                } catch (Exception e) {
                    hm.put("CUPONS_OFF", 0);
                }
                try {
                    hm.put("CUPONS_ON", Integer.parseInt(rst.getString("CUPON_ON").trim()));
                } catch (Exception e) {
                    hm.put("CUPONS_ON", 0);
                }

                hm.put("AMOUNT_TOTAL_OFF", total_off);
                hm.put("AMOUNT_TOTAL_ON", total_on);
                hm.put("CUPONS_TOTAL_OFF", total_cupon_off);
                hm.put("CUPONS_TOTAL_ON", total_cupon_on);
                hm.put("AVG_TOTAL_RATE_ON", Double.isNaN(total_on / total_cupon_on) ? 0 : total_on / total_cupon_on);
                hm.put("AVG_TOTAL_RATE_OFF", Double.isNaN(total_off / total_cupon_off) ? 0 : total_off / total_cupon_off);

                //Porcentajes
                hm.put("PER_TOTAL_CPN_ON", (total_cupons > 0) ? (total_cupon_on * 100.0) / total_cupons : 0);
                hm.put("PER_TOTAL_CPN_OFF", (total_cupons > 0) ? (total_cupon_off * 100.0) / total_cupons : 0);
                hm.put("PER_TOTAL_AMOUNT_ON", (total > 0) ? (total_on * 100.0) / total : 0);
                hm.put("PER_TOTAL_AMOUNT_OFF", (total > 0) ? (total_off * 100.0) / total : 0);
                /////////////////////////////////////////////////////////////////////////////////////////////////////

                try {
                    hm.put("AVG_OFF", Double.isNaN((Double.parseDouble(rst.getString("OFF")) * 100) / Double.parseDouble(rst.getString("AMOUNT"))) ? 0 : (Double.parseDouble(rst.getString("OFF")) * 100) / Double.parseDouble(rst.getString("AMOUNT")));
                } catch (Exception e) {
                    hm.put("AVG_OFF", 0);
                }
                try {
                    hm.put("AVG_CUPONS_OFF", Double.isNaN((Double.parseDouble(rst.getString("CUPON_OFF")) * 100) / Double.parseDouble(rst.getString("CUPONS"))) ? 0 : (Double.parseDouble(rst.getString("CUPON_OFF")) * 100) / Double.parseDouble(rst.getString("CUPONS")));
                } catch (Exception e) {
                    hm.put("AVG_CUPONS_OFF", 0);
                }
                try {
                    hm.put("AVG_RATE_OFF", Double.isNaN(Double.parseDouble(rst.getString("OFF")) / Double.parseDouble(rst.getString("CUPON_OFF"))) ? 0 : Double.parseDouble(rst.getString("OFF")) / Double.parseDouble(rst.getString("CUPON_OFF")));
                } catch (Exception e) {
                    hm.put("AVG_RATE_OFF", 0);
                }
                try {
                    hm.put("AVG_ON", Double.isNaN((Double.parseDouble(rst.getString("ON")) * 100) / Double.parseDouble(rst.getString("AMOUNT"))) ? 0 : (Double.parseDouble(rst.getString("ON")) * 100) / Double.parseDouble(rst.getString("AMOUNT")));
                } catch (Exception e) {
                    hm.put("AVG_ON", 0);
                }
                try {
                    hm.put("AVG_CUPONS_ON", Double.isNaN((Double.parseDouble(rst.getString("CUPON_ON")) * 100) / Double.parseDouble(rst.getString("CUPONS"))) ? 0 : (Double.parseDouble(rst.getString("CUPON_ON")) * 100) / Double.parseDouble(rst.getString("CUPONS")));
                } catch (Exception e) {
                    hm.put("AVG_CUPONS_ON", 0);
                }
                try {
                    hm.put("AVG_RATE_ON", Double.isNaN(Double.parseDouble(rst.getString("ON")) / Double.parseDouble(rst.getString("CUPON_ON"))) ? 0 : Double.parseDouble(rst.getString("ON")) / Double.parseDouble(rst.getString("CUPON_ON")));
                } catch (Exception e) {
                    hm.put("AVG_RATE_ON", 0);
                }
                try {
                    hm.put("TARIFA", Double.isNaN((Double.parseDouble(rst.getString("AMOUNT"))) / Integer.parseInt(rst.getString("CUPONS").trim())) ? 0 : (Double.parseDouble(rst.getString("AMOUNT"))) / Integer.parseInt(rst.getString("CUPONS").trim()));
                } catch (Exception e) {
                    hm.put("TARIFA", 0);
                }
                try {
                    hm.put("AVG_CUPONS", (Double.parseDouble(rst.getString("CUPONS")) * 100) / total_cupons);
                } catch (Exception e) {
                    hm.put("AVG_CUPONS", 0);
                }

                listado.add(hm);

                if (top != -1 && top > contador) {
                    try {
                        total_top += Double.parseDouble(rst.getString("AMOUNT").trim());
                    } catch (Exception e) {
                        total_top += 0;
                    }
                    try {
                        total_cupons_top += Integer.parseInt(rst.getString("CUPONS").trim());
                    } catch (Exception e) {
                        total_cupons_top += 0;
                    }
                    try {
                        total_off_top += Double.parseDouble(rst.getString("OFF"));
                    } catch (Exception e) {
                        total_off_top += 0;
                    }
                    try {
                        total_on_top += Double.parseDouble(rst.getString("ON"));
                    } catch (Exception e) {
                        total_on_top += 0;
                    }
                    try {
                        total_cupon_off_top += Integer.parseInt(rst.getString("CUPON_OFF").trim());
                    } catch (Exception e) {
                        total_cupon_off_top += 0;
                    }
                    try {
                        total_cupon_on_top += Integer.parseInt(rst.getString("CUPON_ON").trim());
                    } catch (Exception e) {
                        total_cupon_on_top += 0;
                    }
                }
                contador++;
            }

            if (top != -1) {
                HashMap hmTop = new HashMap();
                hmTop.put("AMOUNT_TOP_OTHER", total - total_top);
                hmTop.put("CUPONS_TOP_OTHER", total_cupons - total_cupons_top);

                hmTop.put("CUPONS_ON_TOP_OTHER", total_cupon_on - total_cupon_on_top);
                hmTop.put("PER_CUPONS_ON_TOP_OTHER", ((total_cupon_on - total_cupon_on_top) * 100) / (total_cupons - total_cupons_top));
                hmTop.put("AMOUNT_ON_TOP_OTHER", total_on - total_on_top);
                hmTop.put("PER_AMOUNT_ON_TOP_OTHER", ((total_on - total_on_top) * 100) / (total - total_top));
                hmTop.put("AVG_RATE_ON_TOP", total_on_top / total_cupon_on_top);

                hmTop.put("CUPONS_OFF_TOP_OTHER", total_cupon_off - total_cupon_off_top);
                hmTop.put("PER_CUPONS_OFF_TOP_OTHER", ((total_cupon_off - total_cupon_off_top) * 100) / (total_cupons - total_cupons_top));
                hmTop.put("AMOUNT_OFF_TOP_OTHER", total_off - total_off_top);
                hmTop.put("PER_AMOUNT_OFF_TOP_OTHER", ((total_off - total_off_top) * 100) / (total - total_top));
                hmTop.put("AVG_RATE_OFF_TOP", total_off_top / total_cupon_off_top);

                listado.add(hmTop);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    rst.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            session.getCNXIBMDB2().close();
        }

        return listado;
    }

    public List<DashboardFilter> loadPX109SQP00538(FILTER filter)  throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int  CUPONS = 0,CUPON_ON = 0, CUPON_OFF = 0,QCPNSF=0;
        double AMOUNT = 0,  AMT_ON = 0, AMT_OFF = 0,AMOUNTF=0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00538(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.cmbCountry);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                
                CUPONS = rst.getInt("CUPONS");
                CUPON_ON = rst.getInt("CUPON_ON");
                CUPON_OFF = rst.getInt("CUPON_OFF");
                AMOUNT = rst.getDouble("AMOUNT");
                AMT_ON = rst.getDouble("AMT_ON");
                AMT_OFF = rst.getDouble("AMT_OFF");
                //Flown
                QCPNSF = rst.getInt("QCPNSF");
                AMOUNTF = rst.getDouble("AMOUNTF");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.strDescription =rst.getString("PAIS");
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.CUPONS_ON = rst.getInt("CUPON_ON");
                    bean.CUPONS_OFF = rst.getInt("CUPON_OFF");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.AMOUNT_ON = rst.getDouble("AMT_ON");
                    bean.AMOUNT_OFF = rst.getDouble("AMT_OFF");
                    
                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTAL_CUPONS_ON = CUPON_ON;
                    bean.TOTAL_CUPONS_OFF = CUPON_OFF;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAL_AMOUNT_ON = AMT_ON;
                    bean.TOTAL_AMOUNT_OFF = AMT_OFF;
                    
                    //Porcentajes
                    bean.CUPONS_PERCENT = (CUPONS>0)?((bean.CUPONS*100.0)/CUPONS):0;
                    bean.AMOUNT_PERCENT = (AMOUNT>0)?((bean.AMOUNT*100.0)/AMOUNT):0;
                    //AVG
                    bean.TARIFA = (bean.CUPONS>0)?((bean.AMOUNT)/bean.CUPONS):0;
                    bean.AMOUNT_ON_AVG_RATE = (bean.CUPONS_ON>0)?((bean.AMOUNT_ON)/bean.CUPONS_ON):0;
                    bean.AMOUNT_OFF_AVG_RATE = (bean.CUPONS_OFF>0)?((bean.AMOUNT_OFF)/bean.CUPONS_OFF):0;
                    
                    //FLOWN
                    bean.QCPNSF = rst.getInt("QCPNSF");
                    bean.AMOUNTF = rst.getDouble("AMOUNTF");
                    bean.TOT_QCPNSF  = QCPNSF;
                    bean.TOT_AMOUNTF = AMOUNTF;
                    //Porcentajes Flown
                    bean.CUPONS_PERCENTF = (QCPNSF>0)?((bean.QCPNSF*100.0)/QCPNSF):0;
                    bean.AMOUNT_PERCENTF = (AMOUNTF>0)?((bean.AMOUNTF*100.0)/AMOUNTF):0;
                    
                    //Porcentajes Flown respecto a Sales
                    bean.CUPONS_OFF_PERCENT    = (bean.CUPONS>0)?((bean.QCPNSF*100.0)/bean.CUPONS):0;
                    bean.TOTAL_CUPONS_PERCENTF = (CUPONS>0)?((QCPNSF*100.0)/CUPONS):0;
                    
                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }
    
      public List<DashboardFilter> loadPX109SQP00550(FILTER filter)  throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int  CUPONS = 0,CUPON_ON = 0, CUPON_OFF = 0;
        double AMOUNT = 0,  AMT_ON = 0, AMT_OFF = 0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00550(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.COUNTRY);
            cstmt.setString(5, filter.CLASS);
            cstmt.setString(6, filter.strONOFF);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                
                CUPONS = rst.getInt("CUPONS");
                AMOUNT = rst.getDouble("AMOUNT");
                
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.strDescription =rst.getString("BOOKI");
                    bean.strDescription1 =rst.getString("A051DESCR1");
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                   
                    bean.AMOUNT_ON= bean.AMOUNT/bean.CUPONS;
                    bean.AMOUNT_OFF=bean.AMOUNT_ON*bean.CUPONS;
                    bean.TARIFA = (bean.CUPONS>0)?((bean.AMOUNT)/bean.CUPONS):0;
                    
                    
                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.totAVG = (CUPONS>0)?((AMOUNT)/CUPONS):0;
                    bean.Perc1= (rst.getDouble("CUPONS") * 100)/bean.TOTAL_CUPONS;
                    bean.Perc2= (rst.getDouble("AMOUNT") * 100)/bean.TOTAL_AMOUNT;
                    /*bean.AMOUNT_PERCENT=bean.AMOUNT_OFF-bean.AMOUNT;
                    bean.AMOUNT_ON_PERCENT=bean.AMOUNT-bean.AMOUNT_OFF;*/
                    
                    //Porcentajes
                   // bean.CUPONS_PERCENT = (CUPONS>0)?((bean.CUPONS*100.0)/CUPONS):0;
                    //bean.AMOUNT_PERCENT = (AMOUNT>0)?((bean.AMOUNT*100.0)/AMOUNT):0;
                    //AVG
                    //bean.AMOUNT_ON_AVG_RATE = (bean.CUPONS_ON>0)?((bean.AMOUNT_ON)/bean.CUPONS_ON):0;
                    //bean.AMOUNT_OFF_AVG_RATE = (bean.CUPONS_OFF>0)?((bean.AMOUNT_OFF)/bean.CUPONS_OFF):0;
                    
                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }
    

    public List<DashboardFilter> loadPX109SQP00539(DashboardFilter filter)  throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00539(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DSALES);
            cstmt.setString(3, filter.DSALES);
            cstmt.setString(4, filter.strDescription);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new DashboardFilter();
                bean.strDescription = filter.strDescription;
                bean.DSALES =rst.getString("DSALES");
                bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                bean.CUPONS = rst.getInt("CUPONS");
                bean.CUPONS_ON = rst.getInt("CUPON_ON");
                bean.CUPONS_OFF = rst.getInt("CUPON_OFF");
                bean.AMOUNT = rst.getDouble("AMOUNT");
                bean.AMOUNT_ON = rst.getDouble("AMT_ON");
                bean.AMOUNT_OFF = rst.getDouble("AMT_OFF");


                lista.add(bean);
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00540(FILTER filter) throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00540(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.cmbCountry);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new DashboardFilter();
                bean.DSALES =rst.getString("DSALES");
                bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                bean.CUPONS_MEX = rst.getInt("CPN_MEX");
                bean.CUPONS_OTHER = rst.getInt("CPN_OTHER");
                bean.CUPONS_ASR = rst.getInt("CPN_ASR");
                bean.CUPONS_ARC = rst.getInt("CPN_ARC");
                
                bean.CUPONS = rst.getInt("CPN_MEX_F");
                bean.CUPONS_OFF = rst.getInt("CPN_OTHER_F");
                bean.CUPONS_ON = rst.getInt("CPN_ASR_F");
                bean.CUPONS_ON_AVG = rst.getInt("CPN_ARC_F");
                
                lista.add(bean);
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00541(DashboardFilter filter)throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int  CUPONS = 0,CUPON_F = 0, CUPON_J = 0, CUPON_Y = 0;
        double AMOUNT = 0,  AMOUNT_F = 0, AMOUNT_J = 0,AMOUNT_Y=0;
        int  QCPNSF = 0,CUPONF_F = 0, CUPONF_J = 0, CUPONF_Y = 0;
        double AMOUNTF = 0,  AMOUNTF_F = 0, AMOUNTF_J = 0,AMOUNTF_Y=0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00541(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_ONOFF);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                
                CUPONS = rst.getInt("CUPONS");
                CUPON_F= rst.getInt("CPN_F");
                CUPON_J= rst.getInt("CPN_J");
                CUPON_Y= rst.getInt("CPN_Y");
                AMOUNT = rst.getDouble("AMOUNT");
                AMOUNT_F = rst.getDouble("AMT_F");
                AMOUNT_J = rst.getDouble("AMT_J");
                AMOUNT_Y = rst.getDouble("AMT_Y");
                //FLOWN
                QCPNSF = rst.getInt("QCPNSF");
                CUPONF_F= rst.getInt("CPNF_F");
                CUPONF_J= rst.getInt("CPNF_J");
                CUPONF_Y= rst.getInt("CPNF_Y");
                AMOUNTF = rst.getDouble("AMOUNTF");
                AMOUNTF_F = rst.getDouble("AMTF_F");
                AMOUNTF_J = rst.getDouble("AMTF_J");
                AMOUNTF_Y = rst.getDouble("AMTF_Y");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.DSALES = rst.getString("DSALES");
                    bean.strFormatDate=Functions.getMonthConvert6(bean.DSALES);
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.CUPON_F= rst.getInt("CPN_F");
                    bean.CUPON_J= rst.getInt("CPN_J");
                    bean.CUPON_Y= rst.getInt("CPN_Y");
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.AMOUNT_F = rst.getDouble("AMT_F");
                    bean.AMOUNT_J = rst.getDouble("AMT_J");
                    bean.AMOUNT_Y = rst.getDouble("AMT_Y");
                    
                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTCUPON_F = CUPON_F;
                    bean.TOTCUPON_J = CUPON_J;
                    bean.TOTCUPON_Y = CUPON_Y;
                    
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAMOUNT_F = AMOUNT_F;
                    bean.TOTAMOUNT_J = AMOUNT_J;
                    bean.TOTAMOUNT_Y = AMOUNT_Y;
                    
                    //FLOWN
                    bean.QCPNSF = rst.getInt("QCPNSF");
                    bean.CUPONF_F= rst.getInt("CPNF_F");
                    bean.CUPONF_J= rst.getInt("CPNF_J");
                    bean.CUPONF_Y= rst.getInt("CPNF_Y");
                    bean.AMOUNTF = rst.getDouble("AMOUNTF");
                    bean.AMOUNTF_F = rst.getDouble("AMTF_F");
                    bean.AMOUNTF_J = rst.getDouble("AMTF_J");
                    bean.AMOUNTF_Y = rst.getDouble("AMTF_Y");
                    
                    bean.TOTAL_CUPONSF = QCPNSF;
                    bean.TOTCUPONF_F = CUPONF_F;
                    bean.TOTCUPONF_J = CUPONF_J;
                    bean.TOTCUPONF_Y = CUPONF_Y;
                    
                    bean.TOTAL_AMOUNTF = AMOUNTF;
                    bean.TOTAMOUNTF_F = AMOUNTF_F;
                    bean.TOTAMOUNTF_J = AMOUNTF_J;
                    bean.TOTAMOUNTF_Y = AMOUNTF_Y;
                    
                    //Porcentaje usado Cupones
                    bean.CUPONS_PERCENT =(bean.CUPONS>0)?((bean.QCPNSF*100.0)/bean.CUPONS):0;
                    bean.CUPON_F_PER =  (bean.CUPON_F>0)?((bean.CUPONF_F*100.0)/bean.CUPON_F):0;
                    bean.CUPON_J_PER =  (bean.CUPON_J>0)?((bean.CUPONF_J*100.0)/bean.CUPON_J):0;
                    bean.CUPON_Y_PER =  (bean.CUPON_Y>0)?((bean.CUPONF_Y*100.0)/bean.CUPON_Y):0;
                    
                    bean.TOTCUPON_F_PER =  (bean.TOTCUPON_F>0)?((bean.TOTCUPONF_F*100.0)/bean.TOTCUPON_F):0;
                    bean.TOTCUPON_J_PER =  (bean.TOTCUPON_J>0)?((bean.TOTCUPONF_J*100.0)/bean.TOTCUPON_J):0;
                    bean.TOTCUPON_Y_PER =  (bean.TOTCUPON_Y>0)?((bean.TOTCUPONF_Y*100.0)/bean.TOTCUPON_Y):0;
                    bean.TOTAL_CUPONS_PERCENTF =(bean.TOTAL_CUPONS>0)?((bean.TOTAL_CUPONSF*100.0)/bean.TOTAL_CUPONS):0;
                    
                    //Porcentaje usado Amount
                    bean.AMOUNT_PERCENT =(bean.AMOUNT>0)?((bean.AMOUNTF*100.0)/bean.AMOUNT):0;
                    bean.AMOUNT_F_PER =  (bean.AMOUNT_F>0)?((bean.AMOUNTF_F*100.0)/bean.AMOUNT_F):0;
                    bean.AMOUNT_J_PER =  (bean.AMOUNT_J>0)?((bean.AMOUNTF_J*100.0)/bean.AMOUNT_J):0;
                    bean.AMOUNT_Y_PER =  (bean.AMOUNT_Y>0)?((bean.AMOUNTF_Y*100.0)/bean.AMOUNT_Y):0;
                    
                    bean.TOTAMOUNT_F_PER =  (bean.TOTAMOUNT_F>0)?((bean.TOTAMOUNTF_F*100.0)/bean.TOTAMOUNT_F):0;
                    bean.TOTAMOUNT_J_PER =  (bean.TOTAMOUNT_J>0)?((bean.TOTAMOUNTF_J*100.0)/bean.TOTAMOUNT_J):0;
                    bean.TOTAMOUNT_Y_PER =  (bean.TOTAMOUNT_Y>0)?((bean.TOTAMOUNTF_Y*100.0)/bean.TOTAMOUNT_Y):0;
                    bean.TOTAL_AMOUNT_PERCENTF =(bean.TOTAL_AMOUNT>0)?((bean.TOTAL_AMOUNTF*100.0)/bean.TOTAL_AMOUNT):0;
                    
                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00932(FILTER filter)throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int  CUPONS = 0,CUPON_F = 0, CUPON_J = 0, CUPON_Y = 0 , CUPON_O=0;
        double AMOUNT = 0,  AMOUNT_F = 0, AMOUNT_J = 0,AMOUNT_Y=0 ,AMOUNT_O=0;
        int  QCPNSF = 0,CUPONF_F = 0, CUPONF_J = 0, CUPONF_Y = 0;
        double AMOUNTF = 0,  AMOUNTF_F = 0, AMOUNTF_J = 0,AMOUNTF_Y=0;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00932_1(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.strONOFF);
            cstmt.setString(5, filter.strCITY);
            cstmt.setString(6, "");
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
                
                CUPONS = rst.getInt("CUPONS");
                CUPON_F= rst.getInt("CPN_F");
                CUPON_J= rst.getInt("CPN_J");
                CUPON_Y= rst.getInt("CPN_Y");
                //CUPON_O= rst.getInt("CPN_O");
                AMOUNT = rst.getDouble("AMOUNT");
                AMOUNT_F = rst.getDouble("AMT_F");
                AMOUNT_J = rst.getDouble("AMT_J");
                AMOUNT_Y = rst.getDouble("AMT_Y");
                //AMOUNT_O = rst.getDouble("AMT_O");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    
                    if(!filter.strCITY.equals("")){
                        bean.strFormatDate = rst.getString("CITYO")+" - " + rst.getString("CITYD"); 
                    }else{
                        bean.DSALES = rst.getString("DSALES");
                        bean.strFormatDate=Functions.getMonthConvert6(bean.DSALES);
                    }
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.CUPON_F= rst.getInt("CPN_F");
                    bean.CUPON_J= rst.getInt("CPN_J");
                    bean.CUPON_Y= rst.getInt("CPN_Y");
                    //bean.CUPON_O= rst.getInt("CPN_O");//OTHER
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.AMOUNT_F = rst.getDouble("AMT_F");
                    bean.AMOUNT_J = rst.getDouble("AMT_J");
                    bean.AMOUNT_Y = rst.getDouble("AMT_Y");
                    //bean.AMOUNT_O = rst.getDouble("AMT_O");//OTHER
                    
                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTCUPON_F = CUPON_F;
                    bean.TOTCUPON_J = CUPON_J;
                    bean.TOTCUPON_Y = CUPON_Y;
                    //bean.TOTCUPON_O = CUPON_O;
                    
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.TOTAMOUNT_F = AMOUNT_F;
                    bean.TOTAMOUNT_J = AMOUNT_J;
                    bean.TOTAMOUNT_Y = AMOUNT_Y;
                    //bean.TOTAMOUNT_O = AMOUNT_O;
                    
                    bean.Perc1 = (CUPONS>0)?(CUPON_F*100.0)/CUPONS:0;
                    bean.Perc2 = (CUPONS>0)?(CUPON_J*100.0)/CUPONS:0;
                    bean.Perc3 = (CUPONS>0)?(CUPON_Y*100.0)/CUPONS:0;
                    
                    bean.Perc4 = (AMOUNT>0)?(AMOUNT_F*100.0)/AMOUNT:0;
                    bean.Perc5 = (AMOUNT>0)?(AMOUNT_J*100.0)/AMOUNT:0;
                    bean.Perc6 = (AMOUNT>0)?(AMOUNT_Y*100.0)/AMOUNT:0;
          
                    bean.totAVG  = (CUPONS>0)?AMOUNT/CUPONS:0;
                    bean.totAVG1 = (CUPON_F>0)?AMOUNT_F/CUPON_F:0;
                    bean.totAVG2 = (CUPON_J>0)?AMOUNT_J/CUPON_J:0;
                    bean.totAVG3 = (CUPON_Y>0)?AMOUNT_Y/CUPON_Y:0;
                    
                    
                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    
                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00645(FILTER filter)  throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int  CUPONS = 0,CUPON_ON = 0, CUPON_OFF = 0;
        double AMOUNT = 0,  AMT_ON = 0, AMT_OFF = 0;
        

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00645(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.rbtTypeRoute);
            cstmt.setString(6, filter.strONOFF);
            cstmt.setString(7, filter.strSearchParam);
            cstmt.setString(8, filter.strTIPO);
            cstmt.setString(9, filter.strOrden);
            
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
                
                CUPONS = rst.getInt("CUPONS");
                AMOUNT = rst.getDouble("AMOUNT");
                
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.TYPE = filter.strOrden;
                    bean.RN = rst.getLong("RN");
                    //bean.RN = rst.getLong("REG");
                    bean.strCITYO =rst.getString("V_CITYO");
                    bean.strCITYD =rst.getString("V_CITYD");
                    bean.ValMax=rst.getDouble("VALMAX");
                    bean.CITYO = rst.getString("CITYO");
                    bean.CITYD = rst.getString("CITYD");
                    bean.strDescription = bean.CITYO + " - " + bean.CITYD;
                    bean.COUNTRYO =rst.getString("COUNTRYO");
                    bean.strDescription4 = rst.getString("DES_CO");
                    bean.strDescription5 = rst.getString("DES_CD");
                    bean.COUNTRYD =rst.getString("COUNTRYD");
                    bean.strDescription1 = bean.COUNTRYO + " - " + bean.COUNTRYD;
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.Perc1 = (CUPONS>0)?(bean.CUPONS*100.0)/CUPONS:0;
                    bean.AMOUNT = rst.getDouble("AMOUNT");
                    bean.Perc2 = (AMOUNT>0)?(bean.AMOUNT*100)/AMOUNT:0;
                    bean.AVG = (bean.CUPONS>0)?bean.AMOUNT/bean.CUPONS:0;
                    bean.PMP = rst.getDouble("PMP");
                    //bean.RevMil = (bean.PMP >0)?bean.AVG/bean.PMP:0;
                    bean.RevMil = rst.getDouble("REVMIL");
                    bean.AMOUNT_PERCENT = rst.getDouble("WMIL");
                    
                    bean.TOTAL_CUPONS = CUPONS;
                    bean.TOTAL_AMOUNT = AMOUNT;
                    bean.totAVG =(CUPONS>0)?AMOUNT/CUPONS:0;
                    
                    
                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    //Porcentajes
                   // bean.CUPONS_PERCENT = (CUPONS>0)?((bean.CUPONS*100.0)/CUPONS):0;
                    //bean.AMOUNT_PERCENT = (AMOUNT>0)?((bean.AMOUNT*100.0)/AMOUNT):0;
                    //AVG
                    //bean.TARIFA = (bean.CUPONS>0)?((bean.AMOUNT)/bean.CUPONS):0;
                    //bean.AMOUNT_ON_AVG_RATE = (bean.CUPONS_ON>0)?((bean.AMOUNT_ON)/bean.CUPONS_ON):0;
                    //bean.AMOUNT_OFF_AVG_RATE = (bean.CUPONS_OFF>0)?((bean.AMOUNT_OFF)/bean.CUPONS_OFF):0;
                    
                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }

    public List<A006> loadPX109SQP00579() throws SQLException {
        List<A006> lista = new ArrayList<A006>(0);
        A006 bean;
        
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00579(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            
            cstmt.execute();
            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A006();
                bean.A006PAIS = rst.getString("A006KEY").trim();
                bean.A006NOMBRE = rst.getString("A006KEY1").trim();
                if(bean.A006NOMBRE.contains("VENEZUELA")){
                    bean.A006NOMBRE = "VENEZUELA";
                }

                lista.add(bean);
            }
            
        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }
    
/*
    public List<WRF016Filterwk> loadPX109SQP01236(FILTER filter)  throws SQLException {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk bean;
        int  CUPONS = 0,CUPON_ON = 0, CUPON_OFF = 0;
        double AMOUNT1 = 0, AMOUNT2 = 0, AMOUNT3 = 0, AMOUNT4 = 0, AMOUNT5 = 0, AMOUNT6 = 0 ;
        double AMOUNT7 = 0, AMOUNT8 = 0, AMOUNT9 = 0, AMOUNT10 = 0, AMOUNT11 = 0, AMOUNT12 = 0 ;
        

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01236(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_SOURCE);
            cstmt.setString(6, filter.IN_FLAG);
            
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                
                AMOUNT1 = rst.getDouble("AMOUNT1");
                AMOUNT2 = rst.getDouble("AMOUNT2");
                AMOUNT3 = rst.getDouble("AMOUNT3");
                AMOUNT4 = rst.getDouble("AMOUNT4");
                AMOUNT5 = rst.getDouble("AMOUNT5");
                AMOUNT6 = rst.getDouble("AMOUNT6");
                AMOUNT7 = rst.getDouble("AMOUNT7");
                AMOUNT8 = rst.getDouble("AMOUNT8");
                AMOUNT9 = rst.getDouble("AMOUNT9");
                AMOUNT10 = rst.getDouble("AMOUNT10");
                AMOUNT11 = rst.getDouble("AMOUNT11");
                AMOUNT12 = rst.getDouble("AMOUNT12");
                
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    bean = new WRF016Filterwk();
                    
                    bean.Aud1 =  rst.getDouble("AMOUNT1");
                    bean.Aud2 =  rst.getDouble("AMOUNT2");
                    bean.Aud3 =  rst.getDouble("AMOUNT3");
                    bean.Aud4 =  rst.getDouble("AMOUNT4");
                    bean.Aud5 =  rst.getDouble("AMOUNT5");
                    bean.Aud6 =  rst.getDouble("AMOUNT6");
                    bean.Rate1 = rst.getDouble("AMOUNT7");
                    bean.Rate2 = rst.getDouble("AMOUNT8");
                    bean.Rate3 = rst.getDouble("AMOUNT9");
                    bean.Rate4 = rst.getDouble("AMOUNT10");
                    bean.Rate5 = rst.getDouble("AMOUNT11");
                    bean.Rate6 = rst.getDouble("AMOUNT12");
                    
                    
                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;
                    
                    lista.add(bean);
                }
            }
        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }*/

    public List<WRF016Filterwk> loadPX109SQP01230_MESES(FILTER filter) throws SQLException {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        int CP1=0 ,CP2=0,CP3=0,CP4=0,CP5=0,CP6=0 ,TKT1=0,TKT2=0,TKT3=0,TKT4=0 ,TKT5=0 ,TKT6=0;
        double AMT1=0 ,AMT2=0 , AMT3=0 ,AMT4=0 , AMT5=0 , AMT6=0,TOTVAR=0,TOTGEN=0,PROMEDIO=0;
        String mes1="",mes2="",mes3="",mes4="",mes5="",mes6="",fec_actual="";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01230(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_SOURCE);
            cstmt.setString(6, filter.IN_FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.execute();
            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                AMT1 = rst.getDouble("M1");
                CP1 = rst.getInt("C1");
                TKT1 = rst.getInt("T1");
                AMT2 = rst.getDouble("M2");
                CP2 = rst.getInt("C2");
                TKT2 = rst.getInt("T2");
                AMT3 = rst.getDouble("M3");
                CP3 = rst.getInt("C3");
                TKT3 = rst.getInt("T3");
                AMT4 = rst.getDouble("M4");
                CP4 = rst.getInt("C4");
                TKT4 = rst.getInt("T4");
                AMT5 = rst.getDouble("M5");
                CP5 = rst.getInt("C5");
                TKT5 = rst.getInt("T5");
                AMT6 = rst.getDouble("M6");
                CP6 = rst.getInt("C6");
                TKT6 = rst.getInt("T6");
                //TOTGEN = rst.getDouble("TOTGEN");
                PROMEDIO = rst.getDouble("PROMEDIO");
                TOTVAR = rst.getDouble("TOTVAR");
                
            }
            rst.close();
            
            if (cstmt.getMoreResults()){
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("CODTRAN");


                    objRtn.Aud1 = rst.getDouble("M1");
                    objRtn.Rej1 = rst.getInt("C1");
                    objRtn.Sup1 = rst.getInt("T1");

                    objRtn.Aud2 = rst.getDouble("M2");
                    objRtn.Rej2 = rst.getInt("C2");
                    objRtn.Sup2 = rst.getInt("T2");

                    objRtn.Aud3 = rst.getDouble("M3");
                    objRtn.Rej3 = rst.getInt("C3");
                    objRtn.Sup3 = rst.getInt("T3");

                    objRtn.Aud4 = rst.getDouble("M4");
                    objRtn.Rej4 = rst.getInt("C4");
                    objRtn.Sup4 = rst.getInt("T4");

                    objRtn.Aud5 = rst.getDouble("M5");
                    objRtn.Rej5 = rst.getInt("C5");
                    objRtn.Sup5 = rst.getInt("T5");

                    objRtn.Aud6 = rst.getDouble("M6");
                    objRtn.Rej6 = rst.getInt("C6");
                    objRtn.Sup6 = rst.getInt("T6");

                    objRtn.Rate1 = rst.getDouble("DIFF");
                    objRtn.Rate2 = rst.getDouble("PROMEDIO");
                    objRtn.Rate3 = rst.getDouble("VAR");

                    //objRtn.Rate4 = TOTGEN;
                    objRtn.Rate5 = PROMEDIO;
                    objRtn.Rate6 = TOTVAR;

                    objRtn.dblPerRev = (TOTGEN > 0) ? objRtn.Rate1 * 100 / TOTGEN : 0;
                    if (objRtn.Rate1 < 0) {
                        objRtn.dblPerRev = objRtn.dblPerRev * -1;
                    }

                    objRtn.totNet1 = AMT1;
                    objRtn.totRej1 = CP1;
                    objRtn.totSup1 = TKT1;
                    objRtn.totNet2 = AMT2;
                    objRtn.totRej2 = CP2;
                    objRtn.totSup2 = TKT2;
                    objRtn.totNet3 = AMT3;
                    objRtn.totRej3 = CP3;
                    objRtn.totSup3 = TKT3;
                    objRtn.totNet4 = AMT4;
                    objRtn.totRej4 = CP4;
                    objRtn.totSup4 = TKT4;
                    objRtn.totNet5 = AMT5;
                    objRtn.totRej5 = CP5;
                    objRtn.totSup5 = TKT5;
                    objRtn.totNet6 = AMT6;
                    objRtn.totRej6 = CP6;
                    objRtn.totSup6 = TKT6;


                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);


                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
        
    }
    

    public List<WRF016Filterwk> loadPX109SQP01231_AGENT(FILTER filter) throws SQLException {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        int CP1=0 ,CP2=0,CP3=0,CP4=0,CP5=0,CP6=0 ,TKT1=0,TKT2=0,TKT3=0,TKT4=0 ,TKT5=0 ,TKT6=0;
        double AMT1=0 ,AMT2=0 , AMT3=0 ,AMT4=0 , AMT5=0 , AMT6=0,TOTVAR=0,TOTDIFF=0,PROMEDIO=0;
        String mes1="",mes2="",mes3="",mes4="",mes5="",mes6="",fec_actual="";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01231(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_SOURCE);
            cstmt.setString(6, filter.IN_FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            
            cstmt.execute();
            
            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                AMT1 = rst.getDouble("M1");
                CP1 = rst.getInt("C1");
                TKT1 = rst.getInt("T1");
                AMT2 = rst.getDouble("M2");
                CP2 = rst.getInt("C2");
                TKT2 = rst.getInt("T2");
                AMT3 = rst.getDouble("M3");
                CP3 = rst.getInt("C3");
                TKT3 = rst.getInt("T3");
                AMT4 = rst.getDouble("M4");
                CP4 = rst.getInt("C4");
                TKT4 = rst.getInt("T4");
                AMT5 = rst.getDouble("M5");
                CP5 = rst.getInt("C5");
                TKT5 = rst.getInt("T5");
                AMT6 = rst.getDouble("M6");
                CP6 = rst.getInt("C6");
                TKT6 = rst.getInt("T6");
                //TOTDIFF = rst.getDouble("TOTDIFF");
                PROMEDIO = rst.getDouble("PROMEDIO");
                TOTVAR = rst.getDouble("TOTVAR");
                
            }
            rst.close();
            
            if (cstmt.getMoreResults()){
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("VENDOR");
                    objRtn.strFlag = rst.getString("DESCRIP");
                    objRtn.strFormatDate = rst.getString("DIRECC");
                    objRtn.strFormatDate1 = rst.getString("CANAV");
                    objRtn.COMENT1 = rst.getString("CANAL");//TYPE

                    objRtn.Aud1 = rst.getDouble("M1");
                    objRtn.Rej1 = rst.getInt("C1");
                    objRtn.Sup1 = rst.getInt("T1");

                    objRtn.Aud2 = rst.getDouble("M2");
                    objRtn.Rej2 = rst.getInt("C2");
                    objRtn.Sup2 = rst.getInt("T2");

                    objRtn.Aud3 = rst.getDouble("M3");
                    objRtn.Rej3 = rst.getInt("C3");
                    objRtn.Sup3 = rst.getInt("T3");

                    objRtn.Aud4 = rst.getDouble("M4");
                    objRtn.Rej4 = rst.getInt("C4");
                    objRtn.Sup4 = rst.getInt("T4");

                    objRtn.Aud5 = rst.getDouble("M5");
                    objRtn.Rej5 = rst.getInt("C5");
                    objRtn.Sup5 = rst.getInt("T5");

                    objRtn.Aud6 = rst.getDouble("M6");
                    objRtn.Rej6 = rst.getInt("C6");
                    objRtn.Sup6 = rst.getInt("T6");

                    //objRtn.Rate1 = rst.getDouble("TOTGEN");
                    objRtn.Rate2 = rst.getDouble("PROMEDIO");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Rate3 = rst.getDouble("VAR");

                    //objRtn.Rate4 = TOTGEN;
                    objRtn.Rate4 = TOTDIFF;
                    objRtn.Rate5 = PROMEDIO;
                    objRtn.Rate6 = TOTVAR;

                    objRtn.totNet1 = AMT1;
                    objRtn.totRej1 = CP1;
                    objRtn.totSup1 = TKT1;
                    objRtn.totNet2 = AMT2;
                    objRtn.totRej2 = CP2;
                    objRtn.totSup2 = TKT2;
                    objRtn.totNet3 = AMT3;
                    objRtn.totRej3 = CP3;
                    objRtn.totSup3 = TKT3;
                    objRtn.totNet4 = AMT4;
                    objRtn.totRej4 = CP4;
                    objRtn.totSup4 = TKT4;
                    objRtn.totNet5 = AMT5;
                    objRtn.totRej5 = CP5;
                    objRtn.totSup5 = TKT5;
                    objRtn.totNet6 = AMT6;
                    objRtn.totRej6 = CP6;
                    objRtn.totSup6 = TKT6;


                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);


                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
        
    }
    
    public List<WRF016Filterwk> loadPX109SQP01232_COUNTRY(FILTER filter) throws SQLException {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1=0 ;
        String mes1="",mes2="",mes3="",mes4="",mes5="",mes6="",fec_actual="";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01232(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_SOURCE);
            cstmt.setString(6, filter.IN_FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            
            cstmt.execute();
            
            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                    AMT1 = rst.getDouble("M6");
                    
            }
            rst.close();
            
            if (cstmt.getMoreResults()){
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("COUNTRYS");
                    objRtn.strFlag = rst.getString("DESCRIP");

                    objRtn.Aud1 = rst.getDouble("M6");
                    objRtn.Avg1 = rst.getDouble("AVG");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Var1 = rst.getDouble("VAR");


                    objRtn.totNet1 = AMT1;


                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);


                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
        
    }
    
    public List<WRF016Filterwk> loadPX109SQP01233_ABNORMAL(FILTER filter) throws SQLException {
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1=0 ;
        String mes1="",mes2="",mes3="",mes4="",mes5="",mes6="",fec_actual="";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01233(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
   
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_SOURCE);
            cstmt.setString(6, filter.IN_FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");
            cstmt.setString(13, "");

            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            
            cstmt.execute();
            
            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);
            fec_actual = cstmt.getString(13);

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                    AMT1 = rst.getDouble("M6");
                    
            }
            rst.close();
            
            if (cstmt.getMoreResults()){
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("VENDOR");
                    objRtn.strFlag = rst.getString("DESCRIP");
                    objRtn.FECHA = fec_actual;
                    objRtn.COMENT1 = "Country : " + filter.IN_COUNTRY + " - " + filter.strFlag;

                    objRtn.Aud1 = rst.getDouble("M6");
                    objRtn.Avg1 = rst.getDouble("AVG");
                    //objRtn.Diff1 = rst.getDouble("M6") - rst.getDouble("AVG");
                    objRtn.Diff1 = rst.getDouble("DIFF");
                    objRtn.Var1 = rst.getDouble("VAR");


                    objRtn.totNet1 = AMT1;

                    objRtn.strFormatDate4 = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    //objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(fec_actual);


                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
        
    }

    public List<WRF016Filterwk> loadPX109SQP00955_ABNORMAL_PORTRNCU(FILTER filter) throws SQLException {//SIN USO
        List<WRF016Filterwk> lista = new ArrayList<WRF016Filterwk>(0);
        WRF016Filterwk objRtn;
        double AMT1=0 ,AMT2=0 , AMT3=0 ,AMT4=0 , AMT5=0 ;
        double AVG1=0 ,AVG2=0 , AVG3=0 ,AVG4=0 , AVG5=0 ;
        double VAR1=0 ,VAR2=0 , VAR3=0 ,VAR4=0 , VAR5=0 ;
        String mes1="",mes2="",mes3="",mes4="",mes5="",mes6="";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00955_ABNORMAL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);
            cstmt.registerOutParameter(10, Types.VARCHAR);
            cstmt.registerOutParameter(11, Types.VARCHAR);
            cstmt.registerOutParameter(12, Types.VARCHAR);
            cstmt.registerOutParameter(13, Types.INTEGER);
            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_SOURCE);
            cstmt.setString(6, filter.IN_FLAG);
            cstmt.setString(7, "");
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.setString(10, "");
            cstmt.setString(11, "");
            cstmt.setString(12, "");

            cstmt.setInt(13, filter.page.PAGNUM);
            cstmt.setInt(14, filter.page.PAGROW);
            cstmt.setInt(15, filter.page.TOTPAG);
            cstmt.setInt(16, filter.page.TOTROW);
            
            cstmt.execute();
            
            mes1 = cstmt.getString(7);
            mes2 = cstmt.getString(8);
            mes3 = cstmt.getString(9);
            mes4 = cstmt.getString(10);
            mes5 = cstmt.getString(11);
            mes6 = cstmt.getString(12);

            filter.page.PAGNUM = cstmt.getInt(13);
            filter.page.PAGROW = cstmt.getInt(14);
            filter.page.TOTPAG = cstmt.getInt(15);
            filter.page.TOTROW = cstmt.getInt(16);

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                    AMT1 = rst.getDouble("M6_SA");
                    AMT2 = rst.getDouble("M6_RF");
                    AMT3 = rst.getDouble("M6_EX");
                    AMT4 = rst.getDouble("M6_AC");
                    AMT5 = rst.getDouble("M6_AM");
                    
                    /*AVG1 = rst.getDouble("AVG_SA");
                    AVG2 = rst.getDouble("AVG_RF");
                    AVG3 = rst.getDouble("AVG_EX");
                    AVG4 = rst.getDouble("AVG_AC");
                    AVG5 = rst.getDouble("AVG_AM");
                    
                    VAR1 = rst.getDouble("VAR_SA");
                    VAR2 = rst.getDouble("VAR_RF");
                    VAR3 = rst.getDouble("VAR_EX");
                    VAR4 = rst.getDouble("VAR_AC");
                    VAR5 = rst.getDouble("VAR_AM");*/
                    
            }
            rst.close();
            
            if (cstmt.getMoreResults()){
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    objRtn = new WRF016Filterwk();
                    objRtn.AIRLINE = rst.getString("VENDOR");
                    objRtn.strFlag = rst.getString("DESCRIP");
                    
                    objRtn.Aud1 = rst.getDouble("M6_SA");
                    objRtn.Avg1 = rst.getDouble("AVG_SA");
                    objRtn.Var1 = rst.getDouble("VAR_SA");
                    
                    objRtn.Aud2 = rst.getDouble("M6_RF");
                    objRtn.Avg2 = rst.getDouble("AVG_RF");
                    objRtn.Var2 = rst.getDouble("VAR_RF");
                    
                    objRtn.Aud3 = rst.getDouble("M6_EX");
                    objRtn.Avg3 = rst.getDouble("AVG_EX");
                    objRtn.Var3 = rst.getDouble("VAR_EX");
                    
                    objRtn.Aud4 = rst.getDouble("M6_AC");
                    objRtn.Avg4 = rst.getDouble("AVG_AC");
                    objRtn.Var4 = rst.getDouble("VAR_AC");
                    
                    objRtn.Aud5 = rst.getDouble("M6_AM");
                    objRtn.Avg5 = rst.getDouble("AVG_AM");
                    objRtn.Var5 = rst.getDouble("VAR_AM");
                    
                    
                    
                    objRtn.totNet1 = AMT1 ; 
                    objRtn.totNet2 = AMT2 ;
                    objRtn.totNet3 = AMT3 ;
                    objRtn.totNet4 = AMT4 ;
                    objRtn.totNet5 = AMT5 ;
                    
                    /*objRtn.totAvg1 = AVG1;
                    objRtn.totAvg2 = AVG2;
                    objRtn.totAvg3 = AVG3;
                    objRtn.totAvg4 = AVG4;
                    objRtn.totAvg5 = AVG5;
                    
                    objRtn.totVar1 = VAR1;
                    objRtn.totVar2 = VAR2;
                    objRtn.totVar3 = VAR3;
                    objRtn.totVar4 = VAR4;
                    objRtn.totVar5 = VAR5;*/
                    
                    objRtn.strFormatDate4  = Functions.getMonthConvert(mes1);
                    objRtn.strDescripcion  = Functions.getMonthConvert(mes2);
                    objRtn.strDescripcion1 = Functions.getMonthConvert(mes3);
                    objRtn.strDescripcion2 = Functions.getMonthConvert(mes4);
                    objRtn.strDescripcion3 = Functions.getMonthConvert(mes5);
                    objRtn.strDescripcion4 = Functions.getMonthConvert(mes6);
                    
                    
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                                        
                    lista.add(objRtn);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
        
    }
    
    public List<DashboardFilter> loadPX109SQP00955(FILTER filter) throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS=0 ,TKT=0;
        double AMOUNT=0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00955(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            cstmt.setString(5, filter.IN_SOURCE);
            cstmt.setString(6, filter.IN_FLAG);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                CUPONS = rst.getInt("QCPNS1");
                TKT = rst.getInt("QTKTS1");
                AMOUNT = rst.getDouble("AMOUNT1");
                
            }
            rst.close();
            
            if (cstmt.getMoreResults()){
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.DSALES =rst.getString("DSALES");
                    bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    bean.TYPE = rst.getString("TRNCU");

                    bean.TKT = rst.getInt("QTKTS1");
                    bean.CUPONS = rst.getInt("QCPNS1");
                    bean.AMOUNT = rst.getDouble("AMOUNT1");
                    
                    bean.totTKT =TKT;
                    bean.TOTAL_CUPONS =CUPONS;
                    bean.TOTAL_AMOUNT =AMOUNT;
                    
                    bean.Perc1 = (AMOUNT>0)?(bean.AMOUNT*100)/AMOUNT:0  ;
                    if(bean.AMOUNT<0){
                        bean.Perc1 = bean.Perc1 * -1.0;
                    }
                                        
                    lista.add(bean);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00970(DashboardFilter filter)  throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS=0 ,TKT=0;
        double AMOUNT=0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00970(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.DSALES);
            cstmt.setString(3, filter.TYPE);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                TKT = rst.getInt("QTKTS1");
                CUPONS = rst.getInt("CUPONS");
                AMOUNT = rst.getDouble("AMOUNT1");
                
            }
            rst.close();
            
            if (cstmt.getMoreResults()){
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.DSALES =filter.DSALES;
                    bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    bean.strDescription = filter.TYPE;
                    bean.TYPE = rst.getString("TDOC");

                    bean.QCPNSF = rst.getInt("QTKTS1");
                    bean.CUPONS = rst.getInt("CUPONS");
                    bean.AMOUNT = rst.getDouble("AMOUNT1");
                    
                    bean.TOTAL_CUPONSF =TKT;
                    bean.TOTAL_CUPONS =CUPONS;
                    bean.TOTAL_AMOUNT =AMOUNT;
                    
                    bean.Perc1 = (AMOUNT>0)?(bean.AMOUNT*100)/AMOUNT:0  ;
                    if(bean.AMOUNT<0){
                        bean.Perc1 = bean.Perc1 * -1.0;
                    }
                                        
                    lista.add(bean);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }

    public List<DashboardFilter> loadPX109SQP00988(FILTER filter)  throws SQLException {
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS_A=0,CUPONS=0 ;
        double AMOUNT_A=0,AMOUNT=0;
        String DESCRIP_A="",DESCRIP="";
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00988(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_COUNTRY);
            
            cstmt.execute();

            rst = cstmt.getResultSet();
            
            while (rst.next()) {
                CUPONS_A = rst.getInt("CUPONS");
                AMOUNT_A = rst.getDouble("AMOUNT");
                DESCRIP_A= rst.getString("DESCRIP");
                
            }
            rst.close();
            
            if (cstmt.getMoreResults()){
                rst = cstmt.getResultSet();
            
                while (rst.next()) {
                    CUPONS = rst.getInt("CUPONS");
                    AMOUNT = rst.getDouble("AMOUNT");

                }
                rst.close();
            
                if (cstmt.getMoreResults()){
                    rst = cstmt.getResultSet();

                    while (rst.next()) {
                        bean = new DashboardFilter();
                        bean.DSALES =filter.DSALES;
                        bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                        bean.FLAG = rst.getString("ALLIC");
                        bean.CUPONS = rst.getInt("CUPONS");
                        bean.AMOUNT = rst.getDouble("AMOUNT");
                        bean.strDescription = rst.getString("DESCRIP");
                        bean.Perc1 = (CUPONS>0)?(bean.CUPONS * 100)/CUPONS:0;
                        bean.Perc2 = (AMOUNT>0)?(bean.AMOUNT * 100)/AMOUNT:0;
                        bean.AVG = (bean.CUPONS>0)?bean.AMOUNT/bean.CUPONS:0;
                        //TOTALES DETALLE
                        bean.CUPONS_OFF=CUPONS;
                        bean.AMOUNT_OFF=AMOUNT;
                        bean.totAVG =  (CUPONS>0)?AMOUNT/CUPONS:0;
                        
                        //AEROMEXICO
                        bean.CUPONS_ON = CUPONS_A;
                        bean.AMOUNT_ON = AMOUNT_A;
                        bean.strDescription1 = DESCRIP_A;
                        bean.totAVG1 =  (CUPONS_A>0)?AMOUNT_A/CUPONS_A:0;

                        //TOTALES
                        bean.TOTAL_CUPONS =CUPONS+CUPONS_A;
                        bean.TOTAL_AMOUNT =AMOUNT+AMOUNT_A;
                        bean.totAVG2 =  (bean.TOTAL_CUPONS>0)?bean.TOTAL_AMOUNT/bean.TOTAL_CUPONS:0;

                        
                        //Porcentajes Generales
                        bean.Perc3 = (bean.TOTAL_AMOUNT>0)?(bean.AMOUNT * 100)/bean.TOTAL_AMOUNT:0;
                        //TOTALES DETALLE
                        bean.Perc4 = (bean.TOTAL_AMOUNT>0)?(AMOUNT * 100)/bean.TOTAL_AMOUNT:0;
                        //AEROMEXICO
                        bean.Perc5 = (bean.TOTAL_AMOUNT>0)?(AMOUNT_A * 100)/bean.TOTAL_AMOUNT:0;

                        lista.add(bean);
                    }

                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lista;
    }

    public HashMap loadPX109SQP00994(FILTER filter)  throws SQLException {
        HashMap hm = new HashMap();
        List<DashboardFilter> lista = new ArrayList<DashboardFilter>(0);
        List<DashboardFilter> lista2 = new ArrayList<DashboardFilter>(0);
        DashboardFilter bean;
        int CUPONS=0;
        double AMOUNT=0;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00994(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_FLAG);
            
            cstmt.execute();
            
            rst = cstmt.getResultSet();

            while (rst.next()) {
                CUPONS = rst.getInt("QTKTS1");
                AMOUNT = rst.getDouble("AMOUNT1");
            }
            rst.close();
            
            if(cstmt.getMoreResults()){

                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new DashboardFilter();
                    bean.DSALES =rst.getString("DSALES");
                    bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                    bean.TYPE = rst.getString("TRNCU");

                    bean.CUPONS = rst.getInt("QTKTS1");
                    bean.AMOUNT = rst.getDouble("AMOUNT1");
                    bean.Perc1 = (AMOUNT>0)?(bean.AMOUNT*100)/AMOUNT:0  ;
                    if(bean.AMOUNT<0){
                        bean.Perc1 = bean.Perc1 * -1.0;
                    }

                    lista2.add(bean);
                }
                hm.put("lstTotales",lista2);
                rst.close();

                if (cstmt.getMoreResults()){
                    rst = cstmt.getResultSet();

                    while (rst.next()) {
                        bean = new DashboardFilter();
                        bean.DSALES =rst.getString("DSALES");
                        bean.strFormatDate = Functions.getMonthConvert6(bean.DSALES);
                        bean.TYPE = rst.getString("TRNCU");

                        bean.CUPONS = rst.getInt("QTKTS1");
                        bean.AMOUNT = rst.getDouble("AMOUNT1");

                        bean.TOTAL_CUPONS =CUPONS;
                        bean.TOTAL_AMOUNT =AMOUNT;

                        bean.Perc1 = (AMOUNT>0)?(bean.AMOUNT*100)/AMOUNT:0  ;
                        if(bean.AMOUNT<0){
                            bean.Perc1 = bean.Perc1 * -1.0;
                        }

                        lista.add(bean);
                    }
                    hm.put("lstDetalle",lista);
                }
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return hm;
    }
}
