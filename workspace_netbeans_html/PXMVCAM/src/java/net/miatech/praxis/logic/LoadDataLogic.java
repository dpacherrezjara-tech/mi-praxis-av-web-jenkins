package net.miatech.praxis.logic;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1569Filter;
import net.miatech.beans.A1655Filter;
import net.miatech.beans.A1656Filter;
import net.miatech.beans.A1672Filter;
import net.miatech.beans.ARCF24Filter;
import net.miatech.beans.BSPF100Filter;
import net.miatech.beans.BSPF110Filter;
import net.miatech.beans.BSPF99Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.PA_GET_COEFICIENTEFilter;
import net.miatech.beans.PX0094S01A007Filter;
import net.miatech.beans.PX023S01A128Filter;
import net.miatech.beans.PX108S02PXF053Filter;
import net.miatech.beans.PXF051Filter;
import net.miatech.beans.PXF700Filter;
import net.miatech.beans.PXF800Filter;
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1007;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.A005;
import net.miatech.praxis.A128;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.BSPF109;
import net.miatech.praxis.BSPF110;
import net.miatech.praxis.BSPF30Filter;
import net.miatech.praxis.BSPF39Filter;
import net.miatech.praxis.PXF700;
import net.miatech.praxis.dao.LoadDataDAO;

//</editor-fold>gsanchez
/**
 *
 * @author gsanchez
 */
public class LoadDataLogic {

    private LoadDataDAO loadDataDAO = new LoadDataDAO();

    public void setSession(IServerSession ss) {
        loadDataDAO.setSession(ss);
    }

//    public HashMap loadAeropuertos() throws SQLException {
//        return loadDataDAO.loadAeropuertos();
//    }
//    // =========================================================================
//    // =========================================================================
//
//    public List<BSPF100Filter> loadBSPReport(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//        return loadDataDAO.loadBSPReport(ccust, user, filter);
//    }
//
//    public List<BSPF100Filter> loadBSPReportByCountry(String ccust, UserView user, BSPF100Filter filter, HashMap hmPaises, HashMap hmCiudades, String option) throws SQLException {
//        return loadDataDAO.loadBSPReportByCountry(ccust, user, filter, hmPaises, hmCiudades, option);
//    }
//
//    public List<BSPF100Filter> loadBSPReportByFuente(String ccust, UserView user, BSPF100Filter filter, HashMap hmPaises, HashMap hmCiudades, String option) throws SQLException {
//        return loadDataDAO.loadBSPReportByFuente(ccust, user, filter, hmPaises, hmCiudades, option);
//    }
//
//    public List<BSPF100Filter> loadBSPReportByDay(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//        return loadDataDAO.loadBSPReportByDay(ccust, user, filter);
//    }
//
//    public List<BSPF100Filter> loadBSPReportByCountryMes(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//        return loadDataDAO.loadBSPReportByCountryMes(ccust, user, filter);
//    }
//
//    public List<BSPF100Filter> loadBSPReportByCountryTotals(String ccust, UserView user, BSPF100Filter filter, String option) throws SQLException {
//        return loadDataDAO.loadBSPReportByCountryTotals(ccust, user, filter, option);
//    }
//
//    public List<BSPF100Filter> loadBSPDetailReport(String ccust, UserView user, BSPF100Filter filter, HashMap hmPaises) throws SQLException {
//        return loadDataDAO.loadBSPDetailReport(ccust, user, filter, hmPaises);
//    }
//
//    public List<BSPF100Filter> loadBSPDetailAgentReport(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//        return loadDataDAO.loadBSPDetailAgentReport(ccust, user, filter);
//    }
//
//    public List<BSPF110> loadBSPCalendar(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//        return loadDataDAO.loadBSPCalendar(ccust, user, filter);
//    }
//
//    public BSPF100Filter loadAgentData(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//        return loadDataDAO.loadAgentData(ccust, user, filter);
//    }
//
//    public List<BSPF104> loadBSPDetailTktReport(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//        return loadDataDAO.loadBSPDetailTktReport(ccust, user, filter);
//    }
//
//    public List<PXF700> loadBSPDetailTktReportPXF700(String ccust, UserView user, BSPF100Filter filter) throws SQLException {
//        return loadDataDAO.loadBSPDetailTktReportPXF700(ccust, user, filter);
//    }
//
//    public List<BSPF30Filter> loadBSPDetailTaxesReport(String ccust, UserView user, BSPF104 filter) throws SQLException {
//        return loadDataDAO.loadBSPDetailTaxesReport(ccust, user, filter);
//    }
//
//    public List<BSPF39Filter> loadBSPDetailCommissionReport(String ccust, UserView user, BSPF104 filter) throws SQLException {
//        return loadDataDAO.loadBSPDetailCommissionReport(ccust, user, filter);
//    }
//
//    public List<PXF800Filter> loadPXF800Report(String ccust, UserView user, PXF800Filter filter, int rowsPag) throws SQLException {
//        return loadDataDAO.loadPXF800Report(ccust, user, filter, rowsPag);
//    }
//
//    public List<PXF800Filter> loadPXF800Totals(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadPXF800Totals(ccust, user, filter);
//    }
//
//    public List<PXF800Filter> loadPXF801Control(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadPXF801Control(ccust, user, filter);
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadPXF801CtrlTotals(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadPXF801CtrlTotals(ccust, user, filter);
//    }
//
//    public List<PXF800Filter> loadPXF801DetControl(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadPXF801DetControl(ccust, user, filter);
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadPXF801DetTotals(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadPXF801DetTotals(ccust, user, filter);
//    }
//
//    public List<PXF800Filter> loadPXF801DetTkt(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadPXF801DetTkt(ccust, user, filter);
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadMainDailyHot(String ccust, UserView user, PXF800Filter filter, HashMap hmPaises) throws SQLException {
//        return loadDataDAO.loadMainDailyHot(ccust, user, filter, hmPaises);
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadMainTranscDailyHot(String ccust, UserView user, PXF800Filter filter, HashMap hmPaises) throws SQLException {
//        return loadDataDAO.loadMainTranscDailyHot(ccust, user, filter, hmPaises);
//    }
//
//    public List<PXF800Filter> loadMainTNUbyCountryDH(String ccust, String moneda, UserView user, PXF800Filter filter, HashMap hmPaises) throws SQLException {
//        return loadDataDAO.loadMainTNUbyCountryDH(ccust, moneda, user, filter, hmPaises);
//    }
//
//    public List<PXF800Filter> loadMainTNUbyTransaction(String ccust, String moneda, UserView user, PXF800Filter filter, HashMap hmPaises) throws SQLException {
//        return loadDataDAO.loadMainTNUbyTransaction(ccust, moneda, user, filter, hmPaises);
//    }
//
//    public List<PXF800Filter> loadDetTNUConcFTEDH(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadDetTNUConcFTEDH(ccust, moneda, user, filter);
//    }
//
//    public List<PXF800Filter> loadMainTNUConcDailyHot(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadMainTNUConcDailyHot(ccust, moneda, user, filter);
//    }
//
//    public List<PXF800Filter> loadMainTNUAnalDailyHot(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadMainTNUAnalDailyHot(ccust, moneda, user, filter);
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadDetailDailyHot(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadDetailDailyHot(ccust, user, filter);
//    }
//
//    public HashMap<String, List<PXF800Filter>> loadDetailTranscDailyHot(String ccust, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadDetailTranscDailyHot(ccust, user, filter);
//    }
//
//    public List<PXF800Filter> loadDetTNUConcDailyHot(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadDetTNUConcDailyHot(ccust, moneda, user, filter);
//    }
//
//    public List<PXF800Filter> loadDetTNUConcbyTran(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadDetTNUConcbyTran(ccust, moneda, user, filter);
//    }
//
//    public List<PXF800Filter> loadDetTktDailyhot(String ccust, UserView user, PXF800Filter filter, String flagRate, int rowsPag) throws SQLException {
//        return loadDataDAO.loadDetTktDailyhot(ccust, user, filter, flagRate, rowsPag);
//    }
//
//    public List<BSPF109> loadBSPF109(String CCUST, UserView user) throws SQLException {
//        return loadDataDAO.loadBSPF109(CCUST, user);
//    }
//
//    public List<ARCF24Filter> loadARCReport(String ccust, UserView user, ARCF24Filter filter, int rowsPag) throws SQLException {
//        return loadDataDAO.loadARCReport(ccust, user, filter, rowsPag);
//    }
//
//    public List<BSPF110Filter> loadBSPF110List(String CCUST, UserView user, BSPF110Filter filter, HashMap hmPaises, HashMap hmCiudades) throws SQLException {
//        return loadDataDAO.loadBSPF110(CCUST, user, filter, hmPaises, hmCiudades);
//    }
//
//    public List<PXF800Filter> loadDetTNUbyTRNC(String ccust, String moneda, UserView user, PXF800Filter filter) throws SQLException {
//        return loadDataDAO.loadDetTNUbyTRNC(ccust, moneda, user, filter);
//    }
//
//    public List<BSPF110Filter> loadDrillBSPF110List(String CCUST, UserView user, BSPF110Filter filter, HashMap hmPaises, HashMap hmCiudades) throws SQLException {
//        return loadDataDAO.loadDrillBSPF110(CCUST, user, filter, hmPaises, hmCiudades);
//    }
//
//    public List<PXF051Filter> loadPXF051(PXF051Filter filter) throws SQLException {
//        return loadDataDAO.loadPXF051(filter);
//    }
//
//    public List<PXF700Filter> loadPXF704Transactions(String CCUST, UserView user, BSPF100Filter filter, HashMap hmPaises, HashMap hmCiudades) throws SQLException {
//        return loadDataDAO.loadPXF704Transactions(CCUST, user, filter, hmPaises, hmCiudades);
//    }
//
//    public List<A1569Filter> loadA1569List(String CCUST, UserView user, A1569Filter filter, String option, HashMap hmCiudades) throws SQLException {
//        return loadDataDAO.loadA1569List(CCUST, user, filter, option, hmCiudades);
//    }
//
//    public List<A1569Filter> loadA1568List(String CCUST, UserView user, A1569Filter filter, HashMap hmCiudades, HashMap hmPaises) throws SQLException {
//        return loadDataDAO.loadA1568List(CCUST, user, filter, hmCiudades, hmPaises);
//    }
//
//    /*public String searchDelivery(String ccust, UserView user, FACSIMILFilter filter, String fuente) throws SQLException {
//        return loadDataDAO.searchDelivery(ccust, user, filter, fuente);
//    }*/
//            
//    public String searchDeliveryRFND(String ccust, UserView user, FACSIMILFilter filter, String fuente) throws SQLException {
//        return loadDataDAO.searchDeliveryRFND(ccust, user, filter, fuente);
//    }
//
//    public int maintance(String strOption, A1569Filter bn, String ccust, UserView user) throws SQLException {
//        return loadDataDAO.maintance(strOption, bn, ccust, user);
//    }
//
//    public List<BSPF110Filter> loadControlSales(String ccust, UserView user, BSPF110Filter filter,
//            HashMap hmPaises, HashMap hmCiudades) throws SQLException {
//        return loadDataDAO.loadControlSales(ccust, user, filter, hmPaises, hmCiudades);
//    }
//    // =========================================================================
//
//    public List<BSPF99Filter> loadBSPF99(BSPF99Filter filter) throws SQLException {
//        return loadDataDAO.loadBSPF99(filter);
//    }
//
//    public List<A1569Filter> loadA1568ListTotales(String CCUST, UserView user, A1569Filter filter) throws SQLException {
//        return loadDataDAO.loadA1568ListTotales(CCUST, user, filter);
//    }
//
//    public void insertPXF051(PXF051Filter filter) throws SQLException {
//        loadDataDAO.insertPXF051(filter);
//    }
//
//    public void updatePXF051(PXF051Filter filter) throws SQLException {
//        loadDataDAO.updatePXF051(filter);
//    }
//
//    /*public List<A1580Filter> loadA1580(A1580Filter filter) throws SQLException {
//        return loadDataDAO.loadA1580(filter);
//    }*/
//
//    public List<A1655Filter> loadA1655(A1655Filter filter) throws SQLException {
//        return loadDataDAO.loadA1655(filter);
//    }
//
//    public List<A1655Filter> loadA1655ByMonth(A1655Filter filter) throws SQLException {
//        return loadDataDAO.loadA1655ByMonth(filter);
//    }
//
//    public List<A1655Filter> loadA1655ByTypeOfDocument(A1655Filter filter) throws SQLException {
//        return loadDataDAO.loadA1655ByTypeOfDocument(filter);
//    }
//
//    /*public List<A1580Filter> searchADM(String ccust, UserView user, FACSIMILFilter filter) throws SQLException {
//        return loadDataDAO.searchADM(ccust, user, filter);
//    }*/
//
//    public List<A1655Filter> loadA1655BySalesSource(A1655Filter filter) throws SQLException {
//        return loadDataDAO.loadA1655BySalesSource(filter);
//    }
//
//    /*public A1672Filter searchADMData(String ccust, UserView user, FACSIMILFilter filter) throws SQLException {
//        return loadDataDAO.searchADMData(ccust, user, filter);
//    }*/
//
//    public List<A1656Filter> loadA1656SalesDate(A1656Filter filter) throws SQLException {
//        return loadDataDAO.loadA1656BySalesDate(filter);
//    }
//
//    public List<A1656Filter> loadA1656ByFareType(A1656Filter filter) throws SQLException {
//        return loadDataDAO.loadA1656ByFareType(filter);
//    }
//
//    public List<A1656Filter> loadA1656SalesDate02(A1656Filter filter) throws SQLException {
//        return loadDataDAO.loadA1656BySalesDate02(filter);
//    }
//
//    public List<A1655Filter> loadA1655ByCountry(A1655Filter filter) throws SQLException {
//        return loadDataDAO.loadA1655ByCountry(filter);
//    }
//
//    public List<A1672Filter> loadDetailByTicket(A1655Filter filter) throws SQLException {
//        return loadDataDAO.loadDetailByTicket(filter);
//    }
//
//    public List<PA_GET_COEFICIENTEFilter> loadPA_GET_COEFICIENTE(PA_GET_COEFICIENTEFilter filter) throws SQLException {
//        return loadDataDAO.loadPA_GET_COEFICIENTE(filter);
//    }
//
//    public List<PA_GET_COEFICIENTEFilter> load2PA_GET_COEFICIENTE(PA_GET_COEFICIENTEFilter filter) throws SQLException {
//        return loadDataDAO.load2PA_GET_COEFICIENTE(filter);
//    }
//    // =========================================================================
//
//    public List<A1007> loadCityReport(String ccust, UserView user, A1007 filter, int rowsPag, HashMap<String, String> hmPaises) throws SQLException {
//        return loadDataDAO.loadCityReport(ccust, user, filter, rowsPag, hmPaises);
//    }
//
//    /*public List<A1059> loadRegionReport(String ccust, UserView user, A1059 filter, int rowsPag, HashMap<String, String> hmPaises) throws SQLException {
//        return loadDataDAO.loadRegionReport(ccust, user, filter, rowsPag, hmPaises);
//    }*/
//
//    public List<A128> loadRegionMF(String ccust, UserView user, PX023S01A128Filter filter, int rowsPag) throws SQLException {
//        return loadDataDAO.loadRegionMF(ccust, user, filter, rowsPag);
//    }
//    
//    public List<PX0094S01A007Filter> loadPX0094S01A007(PX0094S01A007Filter filter) throws SQLException {
//        return loadDataDAO.loadPX0094S01A007(filter);
//    }
//
    public List<A1248> loadFieldsConditions() {
        return loadDataDAO.loadFieldsConditions();
    }
//    
//    public List<A1248> loadFields(String tabla,Connection cnx) {
//        return loadDataDAO.loadFields(tabla,cnx);
//    }
//    
    public List<A1248> loadColumns(String tabla) throws SQLException {
        return loadDataDAO.loadColumns(tabla);
    }
    
    public List<A1248> loadFieldsA1248(String ccust, String tipo, String tabname, String num) throws Exception {
        return loadDataDAO.loadFieldsA1248(ccust, tipo, tabname, num);
    }
//    
//    public String maintanceRegionMF(String strOption,UserView user, A128 bn) throws SQLException {
//        return loadDataDAO.maintanceRegionMF(strOption, user, bn);
//    }
//    
//    public List<PX108S02PXF053Filter> loadPX108S02PXF053(PX108S02PXF053Filter filter) throws SQLException {
//        return loadDataDAO.loadPX108S02PXF053(filter);
//    }
//    
//    public List<A005> loadAirlines() {
//        return loadDataDAO.loadAirlines();
//    }

    public List<PX0094S01A007Filter> SQP03624(PX0094S01A007Filter filter) throws SQLException, Exception {
        return loadDataDAO.SQP03624(filter);
    }
    
    public List<PX0094S01A007Filter> SQP03925(PX0094S01A007Filter filter) throws SQLException, Exception {
        return loadDataDAO.SQP03925(filter);
    }
    
    public List<PX0094S01A007Filter> SQP03927(PX0094S01A007Filter filter) throws SQLException, Exception {
        return loadDataDAO.SQP03927(filter);
    }
    
    public List<PX0094S01A007Filter> SQP03929(PX0094S01A007Filter filter) throws SQLException, Exception {
        return loadDataDAO.SQP03929(filter);
    }
}
