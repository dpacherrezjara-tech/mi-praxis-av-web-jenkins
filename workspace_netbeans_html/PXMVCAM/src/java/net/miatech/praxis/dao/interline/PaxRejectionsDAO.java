package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import net.miatech.beans.spring.implement.IServerSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.praxis.interline.DetailRank;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class PaxRejectionsDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public HashMap loadPX189S01WRF001(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstCurrency = new ArrayList<WRF016Filter>(0);
        HashMap hm = new HashMap();
        WRF016Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX189S01WRF001(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_TYPEDOC);
            cstmt01.setString(5, filter.IN_CURRENCY);
            cstmt01.setString(6, filter.IN_TYPE);//CLOSED:0 , PROCESS:1 --  STVAL
            cstmt01.setString(7, filter.IN_AIRLINE);
            cstmt01.setString(8, filter.IN_SOURCE);
            cstmt01.setString(9, filter.IN_PERIOD);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new WRF016Filter();
                objRtn.PERMONT = filter.IN_PERIOD;
                /*objRtn.strYearFrom = filter.strYearFrom;
                 objRtn.strYearTo = filter.strYearTo;
                 objRtn.strMonthFrom = filter.strMonthFrom;
                 objRtn.strMonthTo = filter.strMonthTo;*/
                objRtn.AIRLINE = filter.AIRLINE;
                objRtn.TUSO = filter.TUSO;
                //objRtn.STVAL = filter.STVAL;
                objRtn.TDOC = filter.TDOC;
                //objRtn.TDOC = rs01.getString("TDOC");
                /*if (objRtn.TDOC.equals("1")) {
                 objRtn.strDescripcion = "LIFTED";
                 } else if (objRtn.TDOC.equals("2")) {
                 objRtn.strDescripcion = "FIM/SMP";
                 } else if (objRtn.TDOC.equals("3")) {
                 objRtn.strDescripcion = "FIM/MPA";
                 } else if (objRtn.TDOC.equals("4")) {
                 //objRtn.strDescripcion = "CTRs/RMs";
                 objRtn.strDescripcion = "REJECT";
                 }*/
                //objRtn.strTipoSIRAX = filter.strTipoSIRAX;
                objRtn.CURRENP = rs01.getString("CURRENP");
                objRtn.QTYINV = rs01.getLong("QTYINV");
                objRtn.QCUPON = rs01.getLong("QCUPON");
                objRtn.QAUDI = rs01.getLong("QAUDI");
                /*if (rs01.getDouble("QCUPON") > 0) {
                 dblPERC = (rs01.getLong("QAUDI") / rs01.getDouble("QCUPON")) * 100;
                 } else {
                 dblPERC = 0;
                 }*/
                objRtn.dblPerRev = (rs01.getDouble("QCUPON") > 0) ? (rs01.getLong("QAUDI") / rs01.getDouble("QCUPON")) * 100 : 0;
                objRtn.NETI = rs01.getDouble("NETI");
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.GROSSI = rs01.getDouble("GROSSI");
                objRtn.ISCI = rs01.getDouble("ISCI");
                objRtn.ISCUA = rs01.getDouble("OCOMIS");//Other commision
                objRtn.TAXI = rs01.getDouble("TAXI");
                objRtn.GROSSN = rs01.getDouble("GROSSN");
                objRtn.ISCN = rs01.getDouble("ISCN");
                objRtn.TAXN = rs01.getDouble("TAXN");
                objRtn.QRM = rs01.getLong("QRM");
                objRtn.QSFIM = rs01.getInt("QSFIM");
                objRtn.QSOPAUD = rs01.getInt("QSUPAUD");
                objRtn.QSOPRM = rs01.getInt("QSUPRM");
                objRtn.QCORR = rs01.getInt("QCORR");

                objRtn.IN_SELECTBY = filter.IN_SELECTBY;
                objRtn.IN_TYPEDOC = filter.IN_TYPEDOC;
                objRtn.IN_CURRENCY = filter.IN_CURRENCY;
                objRtn.IN_TYPE = filter.IN_TYPE;
                objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                objRtn.IN_SOURCE = filter.IN_SOURCE;
                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.dblPerTax = (rs01.getLong("TAXI") > 0) ? (rs01.getDouble("TAXN") / rs01.getDouble("TAXI")) * 100 : 0;
                if (objRtn.TDOC.equals("4")) {
                    objRtn.dblPerTax = 0;
                }

                lstCurrency.add(objRtn);
            }
            hm.put("lstCurrency", lstCurrency);
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();
                    objRtn.AIRLINE = filter.AIRLINE;
                    objRtn.TUSO = filter.TUSO;
                    objRtn.PERMONT = rs01.getString("PERMONT");
                    //objRtn.STVAL = filter.STVAL;
                    //objRtn.strTipoSIRAX = filter.strTipoSIRAX;
                    objRtn.strFormatDate = rs01.getString("FINVOICE").substring(0, 4).concat("-").concat(rs01.getString("FINVOICE").substring(4, 6));
                    objRtn.FINVOICE = rs01.getString("FINVOICE");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    //objRtn.strDateCAD = rs01.getString("FINVOICE").trim();
                    objRtn.TDOC = rs01.getString("TDOC").trim();
                    /*if (objRtn.TDOC.equals("1")) {
                     objRtn.strDescripcion = "LIFTED";
                     } else if (objRtn.TDOC.equals("2")) {
                     objRtn.strDescripcion = "FIM/SMP";
                     } else if (objRtn.TDOC.equals("3")) {
                     objRtn.strDescripcion = "FIM/MPA";
                     } else if (objRtn.TDOC.equals("4")) {
                     //objRtn.strDescripcion = "CTRs/RMs";
                     objRtn.strDescripcion = "REJECT";
                     }*/
                    objRtn.strDescripcion = rs01.getString("DES_TDOC");
                    if (objRtn.strDescripcion.equals("Rejections Frequent Flyer")) {
                        objRtn.strDescripcion = "Rejected Documents";
                    }
                    objRtn.QTYINV = rs01.getInt("QTYINV");
                    objRtn.QCUPON = rs01.getLong("QCUPON");
                    objRtn.PCUPON = rs01.getInt("PCUPON"); //Doc Physical
                    objRtn.QAUDI = rs01.getLong("QAUDI");
                    /*if (rs01.getDouble("QCUPON") > 0) {
                     dblPERC = (rs01.getDouble("QAUDI") / rs01.getDouble("QCUPON")) * 100;
                     } else {
                     dblPERC = 0;
                     }*/
                    objRtn.dblPerRev = (rs01.getDouble("QCUPON") > 0) ? (rs01.getLong("QAUDI") / rs01.getDouble("QCUPON")) * 100 : 0;
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.GROSSI = rs01.getDouble("GROSSI");
                    objRtn.ISCI = rs01.getDouble("ISCI");
                    objRtn.ISCUA = rs01.getDouble("OCOMIS");//Other commision
                    objRtn.TAXI = rs01.getDouble("TAXI");
                    objRtn.GROSSN = rs01.getDouble("GROSSN");
                    objRtn.ISCN = rs01.getDouble("ISCN");
                    objRtn.TAXN = rs01.getDouble("TAXN");
                    objRtn.NETO = rs01.getDouble("NETO"); //setRejectAmount
                    objRtn.QRM = rs01.getLong("QRM");
                    /*if (rs01.getLong("NETI") > 0) {
                     dblPERC = (rs01.getDouble("NETO") / rs01.getDouble("NETI")) * 100;
                     } else {
                     dblPERC = 0;
                     }*/
                    objRtn.dblPerRec = (rs01.getLong("NETI") > 0) ? (rs01.getDouble("NETO") / rs01.getDouble("NETI")) * 100 : 0;
                    /*if (objRtn.TDOC.equals("4")) {
                     objRtn.dblPerRec = 0;
                     }*/
                    objRtn.dblPerTax = (rs01.getLong("TAXI") > 0) ? (rs01.getDouble("TAXN") / rs01.getDouble("TAXI")) * 100 : 0;
                    /*if (objRtn.TDOC.equals("4")) {
                     objRtn.dblPerTax = 0;
                     }*/
                    objRtn.QSFIM = rs01.getInt("QSFIM");
                    objRtn.QSOPAUD = rs01.getInt("QSUPAUD");
                    objRtn.QSOPRM = rs01.getInt("QSUPRM");
                    objRtn.QCORR = rs01.getInt("QCORR");

                    objRtn.IN_SELECTBY = filter.IN_SELECTBY;
                    objRtn.IN_TYPEDOC = filter.IN_TYPEDOC;
                    objRtn.IN_CURRENCY = filter.IN_CURRENCY;
                    objRtn.IN_TYPE = filter.IN_TYPE;
                    objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                    objRtn.IN_SOURCE = filter.IN_SOURCE;

                    lstRtn.add(objRtn);
                }
                hm.put("lstRtn", lstRtn);
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
        return hm;
    }

    public HashMap loadPX189S02WRF003(WRF016Filter filter) throws SQLException, Exception {

        HashMap hmResultado = new HashMap();
        List<DetailRank> list1 = new ArrayList<DetailRank>();
        List<DetailRank> list2 = new ArrayList<DetailRank>();
        List<DetailRank> list3 = new ArrayList<DetailRank>();
        List<DetailRank> list4 = new ArrayList<DetailRank>();
        DetailRank rank = null;
        long totOthers = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX189S02WRF003(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);//CALFA
            cstmt01.setString(3, filter.FINVOICE);
            cstmt01.setString(4, filter.CURRENP);
            cstmt01.setString(5, filter.AIRLINE);
            cstmt01.setString(6, filter.TUSO);//CLOSED:0 , PROCESS:1 --  STVAL
            cstmt01.setString(7, filter.TDOC);
            cstmt01.setString(8, filter.STVAL);
            //cstmt01.setString(8, filter.TIPOPSIRAX);
            cstmt01.setString(9, filter.GRUPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            //Guardando el Detalle 1 ===========================================            
            int i = 0;

            while (rs01.next()) {

                if (i < 10) {
                    rank = new DetailRank();
                    rank.RN = i + 1;
                    rank.strKEY = rs01.getString("ARGUM");
                    rank.strDescripcion = rank.strKEY.substring(0, 3) + " - " + rank.strKEY.substring(3, 6);
                    rank.lngQty = rs01.getLong("QCANTID");
                    rank.lngSPA = rs01.getLong("QCANSPA");
                    //Datos del filtro ****************************
                    rank.strFecha = filter.FINVOICE;
                    rank.strDescCOM = filter.INVOICE;
                    //rank.billingYearFrom=filter.strYearFrom;
                    //rank.billingYearTo=filter.strYearTo;
                    //rank.setBillingMonthFrom(filter.strMonthFrom);
                    //rank.setBillingMonthTo(filter.strMonthTo);
                    rank.strMoneda = filter.CURRENP;
                    rank.strAirline = filter.AIRLINE;
                    rank.strTipoDoc = filter.TDOC;
                    rank.strTuso = filter.TUSO;
                    rank.strSTVAL = filter.STVAL;
                    rank.strGrupo = filter.GRUPO;
                    list1.add(rank);
                } else {
                    totOthers += rs01.getLong("QCANTID");
                }
                i++;
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (list1 != null && list1.size() > 0) {
                rank = null;
                rank = (DetailRank) list1.get(0);
                rank.lngQtyOthers = totOthers;
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                i = 0;
                while (rs01.next()) {
                    if (i < 10) {
                        rank = new DetailRank();
                        rank.RN = i + 1;
                        if (rs01.getString("A021KEY") != null) {
                            rank.strKEY = rs01.getString("A021KEY").trim();
                        }
                        if (rs01.getString("A021COMEN1") != null) {
                            rank.strCOM = rs01.getString("A021COMEN1").trim().replace("\"", "");
                        }
                        rank.lngQty = rs01.getLong("QCANTID");
                        rank.lngSPA = rs01.getLong("QCANSPA");
                        //Datos del filtro ****************************
                        rank.strFecha = filter.FINVOICE;
                        rank.strDescCOM = filter.INVOICE;
                        /*rank.billingYearFrom=filter.strYearFrom;
                         rank.billingYearTo=filter.strYearTo;
                         rank.billingMonthFrom=filter.strMonthFrom;
                         rank.billingMonthTo=filter.strMonthTo;*/
                        rank.strMoneda = filter.CURRENP;
                        rank.strAirline = filter.AIRLINE;
                        rank.strTipoDoc = filter.TDOC;
                        rank.strTuso = filter.TUSO;
                        rank.strSTVAL = filter.STVAL;
                        rank.strGrupo = filter.GRUPO;
                        list2.add(rank);
                    } else {
                        totOthers += rs01.getLong("QCANTID");
                    }
                    i++;
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                if (list2 != null && list2.size() > 0) {
                    rank = null;
                    rank = (DetailRank) list2.get(0);
                    rank.lngQtyOthers = totOthers;
                }
            }

            //Guardando el Detalle 3 ===========================================
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();

                i = 0;
                while (rs01.next()) {
                    if (i < 10) {
                        rank = new DetailRank();
                        rank.RN = i + 1;
                        rank.strKEY = rs01.getString("ARGUM");
                        if (rs01.getString("A051DESCR1") != null) {
                            rank.strCOM = rs01.getString("A051DESCR1").trim().replace("\"", "");
                        }
                        rank.lngQty = rs01.getLong("QCANTID");
                        rank.lngSPA = rs01.getLong("QCANSPA");
                        //Datos del filtro ****************************
                        rank.strFecha = filter.FINVOICE;
                        rank.strDescCOM = filter.INVOICE;
                        /*rank.setBillingYearFrom(filter.strYearFrom);
                         rank.setBillingYearTo(filter.strYearTo);
                         rank.setBillingMonthFrom(filter.strMonthFrom);
                         rank.setBillingMonthTo(filter.strMonthTo);*/
                        rank.strMoneda = filter.CURRENP;
                        rank.strAirline = filter.AIRLINE;
                        rank.strTipoDoc = filter.TDOC;
                        rank.strTuso = filter.TUSO;
                        rank.strSTVAL = filter.STVAL;
                        rank.strGrupo = filter.GRUPO;
                        list3.add(rank);
                    } else {
                        totOthers += rs01.getLong("QCANTID");
                    }
                    i++;
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                if (list3 != null && list3.size() > 0) {
                    rank = null;
                    rank = (DetailRank) list3.get(0);
                    rank.lngQtyOthers = totOthers;
                }
            }

            //Guardando el Detalle 4 ===========================================
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();

                i = 0;
                while (rs01.next()) {
                    if (i < 10) {
                        rank = new DetailRank();
                        rank.RN = i + 1;
                        rank.strKEY = rs01.getString("ARGUM").trim();
                        rank.strDescripcion = rank.strKEY.substring(0, 3) + " - " + rank.strKEY.substring(3, 6);
                        rank.lngQty = rs01.getLong("QCANTID");
                        rank.lngSPA = rs01.getLong("QCANSPA");
                        //Datos del filtro ****************************
                        rank.strFecha = filter.FINVOICE;
                        rank.strDescCOM = filter.INVOICE;
                        /*rank.setBillingYearFrom(filter.strYearFrom);
                         rank.setBillingYearTo(filter.strYearTo);
                         rank.setBillingMonthFrom(filter.strMonthFrom);
                         rank.setBillingMonthTo(filter.strMonthTo);*/
                        rank.strMoneda = filter.CURRENP;
                        rank.strAirline = filter.AIRLINE;
                        rank.strTipoDoc = filter.TDOC;
                        rank.strTuso = filter.TUSO;
                        rank.strSTVAL = filter.STVAL;
                        rank.strGrupo = filter.GRUPO;
                        list4.add(rank);
                    } else {
                        totOthers += rs01.getLong("QCANSPA");
                    }
                    i++;
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                if (list4 != null && list4.size() > 0) {
                    rank = null;
                    rank = (DetailRank) list4.get(0);
                    rank.lngQtyOthers = totOthers;
                }
            }
            // =================================================================

            hmResultado.put("DETALLE1", list1);
            hmResultado.put("DETALLE2", list2);
            hmResultado.put("DETALLE3", list3);
            hmResultado.put("DETALLE4", list4);
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
        return hmResultado;
    }

    public HashMap loadPX165S03WRF001(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstCurrency = new ArrayList<WRF016Filter>(0);
        HashMap hm = new HashMap();
        WRF016Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX189S03WRF001(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.FINVOICE);
            cstmt01.setString(5, filter.TDOC);
            cstmt01.setString(6, filter.IN_CURRENCY);
            cstmt01.setString(7, filter.IN_TYPE);
            cstmt01.setString(8, filter.IN_AIRLINE);
            cstmt01.setString(9, filter.IN_SOURCE);
            cstmt01.setString(10, filter.PERMONT);
            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new WRF016Filter();
                objRtn.CURRENP = rs01.getString("CURRENP");
                objRtn.QTYINV = rs01.getInt("QTYINV");
                objRtn.QCUPON = rs01.getInt("QCUPON");
                objRtn.QAUDI = rs01.getInt("QAUDI");
                objRtn.dblPerRev = (rs01.getDouble("TOTODOC") > 0) ? (objRtn.QAUDI / rs01.getDouble("TOTODOC")) * 100 : 0;
                objRtn.NETI = rs01.getInt("NETI");
                objRtn.NETO = rs01.getInt("NETO");
                objRtn.QRM = rs01.getInt("QRM");
                objRtn.QSFIM = rs01.getInt("QSFIM");
                objRtn.QCORR = rs01.getInt("QCORR");

                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;

                lstCurrency.add(objRtn);
            }
            hm.put("lstCurrency", lstCurrency);
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();
                    /*objRtn.STVAL = filter.STVAL;
                     objRtn.strTipoSIRAX = filter.strTipoSIRAX;*/
                    objRtn.FINVOICE = rs01.getString("FINVOICE");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.PERMONT = rs01.getString("PERMONT");
                    objRtn.INVOICE = rs01.getString("INVOICE");
                    objRtn.AIRLINE = rs01.getString("AIRLINE");
                    objRtn.strDescripcion = rs01.getString("DES_CIA");
                    objRtn.TUSO = rs01.getString("TUSO");
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.QCUPON = rs01.getLong("QCUPON");
                    objRtn.PCUPON = rs01.getInt("PCUPON");
                    objRtn.QAUDI = rs01.getLong("QAUDI");
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.QRM = rs01.getLong("QRM");
                    /*if (rs01.getLong("NETI") > 0) {
                     dblPERC = (rs01.getDouble("NETO") / rs01.getDouble("NETI")) * 100;
                     } else {
                     dblPERC = 0;
                     }*/
                    objRtn.dblPerRec = (rs01.getLong("NETI") > 0) ? (rs01.getDouble("NETO") / rs01.getDouble("NETI")) * 100 : 0;//dblPerc
                    objRtn.FECLIMIT = rs01.getString("FECLIMIT");
                    objRtn.DATENV = rs01.getString("DATENV");
                    objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.DATENV);
                    objRtn.QSFIM = rs01.getInt("QSFIM");
                    objRtn.FMETHOD = rs01.getString("FMETHOD");
                    objRtn.QCORR = rs01.getInt("QCORR");
                    objRtn.FECL = rs01.getString("FECL");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FECL);
                    //objRtn.STVAL = rs01.getString("STVAL");
                    objRtn.strDescripcion2 = filter.strDescripcion;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
                hm.put("lstRtn", lstRtn);
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
        return hm;
    }

    public HashMap loadPX189S03A020(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstCurrency = new ArrayList<WRF016Filter>(0);
        HashMap hm = new HashMap();
        WRF016Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX189S03A020(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt01.setString(3, filter.GRUPO);
            cstmt01.setString(4, filter.TUSO);
            cstmt01.setString(5, "");
            cstmt01.setString(6, filter.IN_FCLAS);

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

                objRtn = new WRF016Filter();

                objRtn.FCLEAR = rs01.getString("A020FRECHA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FCLEAR);
                objRtn.QCUPON = filter.QCUPON;
                objRtn.QAUDI = rs01.getLong("QTYDOC");;
                //objRtn.dblPerRev = (totQAUDI * 100) / filter.QCUPON;
                objRtn.NETI = rs01.getDouble("NETI");;
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.NETO = rs01.getDouble("NETO");
                //objRtn.dblPerRec = (totNETO * 100) / totNETI;
                objRtn.GROSSN = rs01.getDouble("GROSSN");
                objRtn.ISCN = rs01.getDouble("ISCN");
                objRtn.TAXN = rs01.getDouble("TAXN");
                //if (rs01.getString("A020RMSN").equals("S")) {
                objRtn.QRM = rs01.getLong("QTYDOC");
                //}

                lstCurrency.add(objRtn);
            }
            hm.put("lstCurrency", lstCurrency);
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();
                    objRtn.FCLEAR = rs01.getString("A020FRECHA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FCLEAR);
                    objRtn.AIRLINE = rs01.getString("A020AIRLI3");
                    objRtn.GRUPO = rs01.getString("A020GRUPO");
                    objRtn.FINVOICE = rs01.getString("A020SUFECH");
                    objRtn.INVOICE = rs01.getString("A020SUFACT");
                    objRtn.CURRENP = rs01.getString("A020MONEDA");
                    objRtn.CCIA = rs01.getString("A020CIA");
                    objRtn.FORMA = rs01.getString("A020FORMA");
                    objRtn.SERIE = rs01.getString("A020SERIE");
                    objRtn.CUPON = rs01.getString("A020CUPON");
                    objRtn.strDescripcion = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NROPRT = rs01.getString("A020KEY");
                    objRtn.TDOC = "4";
                    //objRtn.A020RMSN = rst.getString("A020RMSN").trim();
                    objRtn.RMACCEPT = rs01.getString("A020RMSN");
                    objRtn.TUSO = filter.TUSO;
                    objRtn.NETI = (rs01.getDouble("A020SUDEBI") - rs01.getDouble("A020IMPNAC")) + rs01.getDouble("A020TOTDEB");
                    objRtn.NETM = (rs01.getDouble("A020ACEPTA") - rs01.getDouble("A020IMPINT")) + rs01.getDouble("A020TOTHAB");
                    objRtn.NETO = rs01.getDouble("A020NETO");
                    objRtn.RUTAP = rs01.getString("A020RUTAP");
                    //objRtn.TICKET = rs01.getString("A020TICKE2").substring(3);
                    if (!rs01.getString("A020PENAL").trim().equals("")) {
                        objRtn.IPENAL = "Y";
                    } else {
                        objRtn.IPENAL = "N";
                    }
                    //objRtn.CODOB = rs01.getString("A020CODOB1").trim();
                    objRtn.NRORM = rs01.getString("A020RMANT").trim();

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
                hm.put("lstRtn", lstRtn);
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
        return hm;
    }

    @SuppressWarnings("empty-statement")
    public HashMap loadPX165S04WRF002(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstCurrency = new ArrayList<WRF016Filter>(0);
        HashMap hm = new HashMap();
        WRF016Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX165S04WRF002_1_GG(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FINVOICE);
            cstmt01.setString(3, filter.TDOC);
            cstmt01.setString(4, filter.CURRENP);
            cstmt01.setString(5, filter.AIRLINE);
            cstmt01.setString(6, filter.TUSO);
            cstmt01.setString(7, filter.GRUPO);
            cstmt01.setString(8, filter.INVOICE);
            cstmt01.setString(9, filter.IN_FCLAS);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new WRF016Filter();

                objRtn.FCLEAR = rs01.getString("FCLEAR");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FCLEAR);
                objRtn.QCUPON = filter.QCUPON;
                objRtn.QAUDI = rs01.getDouble("QTYINV");
                objRtn.dblPerRev = (objRtn.QCUPON > 0) ? (objRtn.QAUDI * 100) / objRtn.QCUPON : 0;
                objRtn.NETI = rs01.getDouble("NETI");
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.dblPerRec = (objRtn.NETI > 0) ? (objRtn.NETO * 100) / objRtn.NETI : 0;
                objRtn.GROSSN = rs01.getDouble("GROSSN");;
                objRtn.ISCN = rs01.getDouble("ISCN");;
                objRtn.TAXN = rs01.getDouble("TAXN");;
                objRtn.QRM = rs01.getDouble("QRM");;

                lstCurrency.add(objRtn);
            }
            hm.put("lstCurrency", lstCurrency);
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();

                    objRtn.AIRLINE = rs01.getString("AIRLINE");
                    objRtn.strDescripcion4 = filter.strDescripcion;
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.FINVOICE = rs01.getString("FINVOICE");
                    objRtn.PERMONT = filter.PERMONT;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.INVOICE = rs01.getString("INVOICE");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strDescripcion = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NROPRT = rs01.getString("NROPRT");
                    objRtn.NRORM = rs01.getString("NRORM");
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT");
                    objRtn.TUSO = rs01.getString("TUSO");
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETM = rs01.getDouble("NETM");//Accpet
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.FMETHOD = rs01.getString("FMETHOD");
                    objRtn.RUTAP = rs01.getString("RUTAP");
                    if (!rs01.getString("IPENAL").trim().equals("")) {
                        objRtn.IPENAL = "Y";
                    } else {
                        objRtn.IPENAL = "N";
                    }

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
                hm.put("lstRtn", lstRtn);
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
        return hm;
    }

    public WRF016Filter loadPX165S05WRF001(WRF016Filter filter) throws SQLException, Exception {

        WRF016Filter objRtn = new WRF016Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX165S05WRF001(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FINVOICE);
            cstmt01.setString(3, filter.AIRLINE);
            cstmt01.setString(4, filter.INVOICE);
            cstmt01.setString(5, filter.GRUPO);
            cstmt01.setString(6, filter.TUSO);
            cstmt01.setString(7, filter.TDOC);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                if (rs01.getString("ICUPON") != null && !rs01.getString("ICUPON").trim().equals("-")) {
                    objRtn.strFlag = "true";
                    objRtn.ICUPON = rs01.getLong("ICUPON");
                    objRtn.IFARE = rs01.getDouble("IFARE");
                    objRtn.IISC = rs01.getDouble("IISC");
                    objRtn.ITAX = rs01.getDouble("ITAX");
                    objRtn.IOTHER = rs01.getDouble("IOTHER");
                    objRtn.INETO = rs01.getDouble("INETO");
                    try {
                        objRtn.COMENT1 = rs01.getString("COMENT1").trim();
                        objRtn.COMENT2 = rs01.getString("COMENT2").trim();
                    } catch (Exception e) {
                    }
                }
                //==============================================================
                objRtn.FINVOICE = rs01.getString("FINVOICE");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                objRtn.INVOICE = rs01.getString("INVOICE");
                objRtn.AIRLINE = rs01.getString("AIRLINE").trim();
                objRtn.GRUPO = rs01.getString("GRUPO").trim();
                objRtn.strDescripcion = rs01.getString("DES_CIA");
                objRtn.CURRENC = rs01.getString("CURRENC").trim();
                objRtn.CURRENP = rs01.getString("CURRENP").trim();
                objRtn.FCLEAR = rs01.getString("FCLEAR");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.FCLEAR);
                objRtn.PERMONT = rs01.getString("PERMONT");
                objRtn.STVAL = rs01.getString("STVAL").trim();
                objRtn.strDescripcion1 = (objRtn.STVAL.equals("0")) ? "Closed" : "Process";
                objRtn.QRMGROSS = rs01.getInt("QRMGROSS");
                objRtn.QRMISC = rs01.getInt("QRMISC");
                objRtn.QRMTAX = rs01.getInt("QRMTAX");
                objRtn.QCUPON = rs01.getLong("QCUPON");
                objRtn.PCUPON = rs01.getInt("PCUPON");//DocPhysical
                objRtn.QETKT = rs01.getInt("QETKT");
                objRtn.QAUDI = rs01.getLong("QAUDI");
                objRtn.dblPerRev = (objRtn.QCUPON > 0) ? (objRtn.QAUDI / objRtn.QCUPON) * 100 : 0;
                objRtn.CURRENP = rs01.getString("CURRENP").trim();
                objRtn.NETI = rs01.getDouble("NETI");
                objRtn.NETM = rs01.getDouble("NETM");//AcceptNet
                objRtn.NETO = rs01.getDouble("NETO"); //Rejectamt
                objRtn.GROSSN = rs01.getDouble("GROSSN"); //MIaGross
                objRtn.ISCN = rs01.getDouble("ISCN");
                objRtn.TAXN = rs01.getDouble("TAXN");
                objRtn.GROSSI = rs01.getDouble("GROSSI"); //InvGross
                objRtn.ISCI = rs01.getDouble("ISCI");
                objRtn.TAXI = rs01.getDouble("TAXI");
                objRtn.QRMSPA = rs01.getLong("QRMSPA");//qtySPA
                objRtn.strDescripcion2 = (objRtn.QRMSPA > 0) ? "Y" : "N";
                objRtn.QRM = rs01.getLong("QRM");
                objRtn.dblPerRec = (objRtn.NETI > 0) ? (objRtn.NETO / objRtn.NETI) * 100 : 0;
                objRtn.FECLIMIT = rs01.getString("FECLIMIT");
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FECLIMIT);
                objRtn.DATENV = rs01.getString("DATENV");
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.DATENV);
                objRtn.FECL = rs01.getString("FECL");
                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.FECL);
                objRtn.QSFIM = rs01.getInt("QSFIM");
                objRtn.QRMOTH = rs01.getInt("QRMOTH"); //QtyOthers
                objRtn.TUSO = rs01.getString("TUSO").trim();
                objRtn.strDescripcion3 = (objRtn.TUSO.equals("14")) ? "Supp" : "";

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

    public HashMap loadPX189SQP03909(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstCurrency = new ArrayList<WRF016Filter>(0);
        HashMap hm = new HashMap();
        WRF016Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03909(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_REJNUMBER);

            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new WRF016Filter();

                objRtn.FCLEAR = rs01.getString("A020FRECHA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FCLEAR);
                objRtn.QCUPON = filter.QCUPON;
                objRtn.QAUDI = rs01.getLong("QTYDOC");;
                //objRtn.dblPerRev = (totQAUDI * 100) / filter.QCUPON;
                objRtn.NETI = rs01.getDouble("NETI");;
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.NETO = rs01.getDouble("NETO");
                //objRtn.dblPerRec = (totNETO * 100) / totNETI;
                objRtn.GROSSN = rs01.getDouble("GROSSN");
                objRtn.ISCN = rs01.getDouble("ISCN");
                objRtn.TAXN = rs01.getDouble("TAXN");
                //if (rs01.getString("A020RMSN").equals("S")) {
                objRtn.QRM = rs01.getLong("QTYDOC");
                //}

                lstCurrency.add(objRtn);
            }
            hm.put("lstCurrency", lstCurrency);
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();
                    objRtn.FCLEAR = rs01.getString("A020FRECHA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FCLEAR);
                    objRtn.AIRLINE = rs01.getString("A020AIRLI3");
                    objRtn.GRUPO = rs01.getString("A020GRUPO");
                    objRtn.FINVOICE = rs01.getString("A020SUFECH");
                    objRtn.INVOICE = rs01.getString("A020SUFACT");
                    objRtn.CURRENP = rs01.getString("A020MONEDA");
                    objRtn.CCIA = rs01.getString("A020CIA");
                    objRtn.FORMA = rs01.getString("A020FORMA");
                    objRtn.SERIE = rs01.getString("A020SERIE");
                    objRtn.CUPON = rs01.getString("A020CUPON");
                    objRtn.strDescripcion = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NROPRT = rs01.getString("A020KEY");
                    objRtn.TDOC = "4";
                    //objRtn.A020RMSN = rst.getString("A020RMSN").trim();
                    objRtn.RMACCEPT = rs01.getString("A020RMSN");
                    objRtn.TUSO = filter.TUSO;
                    objRtn.NETI = (rs01.getDouble("A020SUDEBI") - rs01.getDouble("A020IMPNAC")) + rs01.getDouble("A020TOTDEB");
                    objRtn.NETM = (rs01.getDouble("A020ACEPTA") - rs01.getDouble("A020IMPINT")) + rs01.getDouble("A020TOTHAB");
                    objRtn.NETO = rs01.getDouble("A020NETO");
                    objRtn.RUTAP = rs01.getString("A020RUTAP");
                    //objRtn.TICKET = rs01.getString("A020TICKE2").substring(3);
                    if (!rs01.getString("A020PENAL").trim().equals("")) {
                        objRtn.IPENAL = "Y";
                    } else {
                        objRtn.IPENAL = "N";
                    }
                    //objRtn.CODOB = rs01.getString("A020CODOB1").trim();
                    objRtn.NRORM = rs01.getString("A020RMANT").trim();

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
                hm.put("lstRtn", lstRtn);
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
        return hm;
    }

    @SuppressWarnings("empty-statement")
    public HashMap loadPX189SQP03910(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstCurrency = new ArrayList<WRF016Filter>(0);
        HashMap hm = new HashMap();
        WRF016Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03910(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TKT);

            cstmt01.setInt(3, filter.page.PAGNUM);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setInt(5, filter.page.TOTPAG);
            cstmt01.setInt(6, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(3);
            filter.page.PAGROW = cstmt01.getInt(4);
            filter.page.TOTPAG = cstmt01.getInt(5);
            filter.page.TOTROW = cstmt01.getInt(6);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new WRF016Filter();

                objRtn.FCLEAR = rs01.getString("FCLEAR");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FCLEAR);
                objRtn.QCUPON = filter.QCUPON;
                objRtn.QAUDI = rs01.getDouble("QTYINV");
                objRtn.dblPerRev = (objRtn.QCUPON > 0) ? (objRtn.QAUDI * 100) / objRtn.QCUPON : 0;
                objRtn.NETI = rs01.getDouble("NETI");
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.NETO = rs01.getDouble("NETO");
                objRtn.dblPerRec = (objRtn.NETI > 0) ? (objRtn.NETO * 100) / objRtn.NETI : 0;
                objRtn.GROSSN = rs01.getDouble("GROSSN");;
                objRtn.ISCN = rs01.getDouble("ISCN");;
                objRtn.TAXN = rs01.getDouble("TAXN");;
                objRtn.QRM = rs01.getDouble("QRM");;

                lstCurrency.add(objRtn);
            }
            hm.put("lstCurrency", lstCurrency);
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();

                    objRtn.AIRLINE = rs01.getString("AIRLINE");
                    objRtn.strDescripcion4 = filter.strDescripcion;
                    objRtn.GRUPO = rs01.getString("GRUPO");
                    objRtn.FINVOICE = rs01.getString("FINVOICE");
                    objRtn.PERMONT = filter.PERMONT;
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    objRtn.INVOICE = rs01.getString("INVOICE");
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strDescripcion = objRtn.CCIA + " " + objRtn.FORMA + objRtn.SERIE + " " + objRtn.CUPON;
                    objRtn.NROPRT = rs01.getString("NROPRT");
                    objRtn.NRORM = rs01.getString("NRORM");
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.RMACCEPT = rs01.getString("RMACCEPT");
                    objRtn.TUSO = rs01.getString("TUSO");
                    objRtn.NETI = rs01.getDouble("NETI");
                    objRtn.NETM = rs01.getDouble("NETM");//Accpet
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.FMETHOD = rs01.getString("FMETHOD");
                    objRtn.RUTAP = rs01.getString("RUTAP");
                    if (!rs01.getString("IPENAL").trim().equals("")) {
                        objRtn.IPENAL = "Y";
                    } else {
                        objRtn.IPENAL = "N";
                    }

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
                hm.put("lstRtn", lstRtn);
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
        return hm;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
