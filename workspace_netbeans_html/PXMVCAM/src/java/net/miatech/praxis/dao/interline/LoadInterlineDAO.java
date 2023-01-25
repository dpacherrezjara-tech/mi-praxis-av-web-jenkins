package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.libcust.A051;
import static net.miatech.praxis.dao.interline.PassengerInvoicesIpDAO.pasarGarbageCollector;
import net.miatech.praxis.interline.SFI010;
import net.miatech.praxis.interline.SFI021;
import net.miatech.praxis.interline.SFI022;
import net.miatech.praxis.interline.SFI030;
import net.miatech.praxis.interline.SFI031;
import net.miatech.praxis.interline.SFI032;
import net.miatech.praxis.interline.SFI041;
import net.miatech.praxis.interline.filter.SFI010Filter;
import net.miatech.praxis.interline.filter.SFI020Filter;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.SFI022Filter;
import net.miatech.praxis.interline.filter.SFI030Filter;
import net.miatech.praxis.interline.filter.SFI033Filter;
import net.miatech.praxis.interline.filter.SFI040Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadInterlineDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public HashMap loadPX165S01WRF016(WRF016Filter filter) throws SQLException, Exception {
        String SQLCLL01 = "";
        HashMap hm = new HashMap();
        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstRtn2 = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstRates = new ArrayList<WRF016Filter>(0);
        WRF016Filter objRtn;
        int Aud1 = 0, Rej1 = 0, Aud2 = 0, Rej2 = 0, Aud3 = 0, Rej3 = 0, Aud4 = 0, Rej4 = 0, Aud5 = 0, Rej5 = 0, Aud6 = 0, Rej6 = 0;
        int Supp6 = 0, Supp5 = 0, Supp4 = 0, Supp3 = 0;
        int QSFIM = 0, QSUPAUD = 0, QSUPRM = 0;
        double QCUPON = 0, QAUDI = 0, QRM = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX165S01WRF016(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_TO);
            cstmt01.setInt(3, filter.IN_SELECTBY);
            cstmt01.setString(4, filter.IN_TYPEDOC);
            cstmt01.setString(5, filter.IN_CURRENCY);
            cstmt01.setInt(6, filter.IN_TIPOFECHA);
            cstmt01.setString(7, filter.IN_TYPE);
            cstmt01.setString(8, filter.IN_AIRLINE);
            cstmt01.setString(9, filter.IN_SOURCE);
            cstmt01.setInt(10, 0);
            cstmt01.setInt(11, 0);

            cstmt01.execute();

            filter.Workable = cstmt01.getInt(10);
            filter.Pending = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                Aud1 = rs01.getInt("A1");
                Aud2 = rs01.getInt("A2");
                Aud3 = rs01.getInt("A3");
                Aud4 = rs01.getInt("A4");
                Aud5 = rs01.getInt("A5");
                Aud6 = rs01.getInt("A6");
                if (filter.IN_SELECTBY == 1) {
                    Rej1 = rs01.getInt("B1");
                    Rej2 = rs01.getInt("B2");
                    Rej3 = rs01.getInt("B3");
                    Rej4 = rs01.getInt("B4");
                    Rej5 = rs01.getInt("B5");
                    Rej6 = rs01.getInt("B6");

                    /*Supp6 = rs01.getInt("C6");
                     Supp5 = rs01.getInt("C5");
                     Supp4 = rs01.getInt("C4");
                     Supp3 = rs01.getInt("C3");*/
                    QSFIM = rs01.getInt("QSFIM");
                    QSUPAUD = rs01.getInt("QSUPAUD");
                    QSUPRM = rs01.getInt("QSUPRM");
                }

                QCUPON = rs01.getDouble("QCUPON");
                QAUDI = rs01.getDouble("QAUDI");
                QRM = rs01.getDouble("QRM");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                int c = 0;
                while (rs01.next()) {
                    c++;
                    objRtn = new WRF016Filter();
                    objRtn.RN = rs01.getInt("NBR");
                    objRtn.strDescripcion = rs01.getString("DESCRIP");
                    objRtn.totNet1 = rs01.getDouble("MES1");
                    objRtn.totNet2 = rs01.getDouble("MES2");
                    objRtn.totNet3 = rs01.getDouble("MES3");
                    objRtn.totNet4 = rs01.getDouble("MES4");
                    objRtn.totNet5 = rs01.getDouble("MES5");
                    objRtn.totNet6 = rs01.getDouble("MES6");
                    lstRates.add(objRtn);
                }
                hm.put("lstRates", lstRates);
                if (cstmt01.getMoreResults()) {
                    rs01 = cstmt01.getResultSet();
                    while (rs01.next()) {
                        objRtn = new WRF016Filter();

                        objRtn.FINVOICE = rs01.getString("FECHA");
                        objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);

                        objRtn.Aud1 = rs01.getInt("A1");
                        objRtn.Aud2 = rs01.getInt("A2");
                        objRtn.Aud3 = rs01.getInt("A3");
                        objRtn.Aud4 = rs01.getInt("A4");
                        objRtn.Aud5 = rs01.getInt("A5");
                        objRtn.Aud6 = rs01.getInt("A6");
                        if (filter.IN_SELECTBY == 1) {
                            objRtn.Rej1 = rs01.getInt("B1");
                            objRtn.Rej2 = rs01.getInt("B2");
                            objRtn.Rej3 = rs01.getInt("B3");
                            objRtn.Rej4 = rs01.getInt("B4");
                            objRtn.Rej5 = rs01.getInt("B5");
                            objRtn.Rej6 = rs01.getInt("B6");

                            /*objRtn.Sup6 = rs01.getInt("C6");
                             objRtn.Sup5 = rs01.getInt("C5");
                             objRtn.Sup4 = rs01.getInt("C4");
                             objRtn.Sup3 = rs01.getInt("C3");*/
                            objRtn.totSup6 = Supp6;
                            objRtn.totSup5 = Supp5;
                            objRtn.totSup4 = Supp4;
                            objRtn.totSup3 = Supp3;

                            objRtn.QSFIM = rs01.getInt("QSFIM");
                            objRtn.QSUPAUD = rs01.getInt("QSUPAUD");
                            objRtn.QSUPRM = rs01.getInt("QSUPRM");

                            objRtn.totQSFIM = QSFIM;
                            objRtn.totQSUPAUD = QSUPAUD;
                            objRtn.totQSUPRM = QSUPRM;
                        }

                        objRtn.QCUPON = rs01.getDouble("QCUPON");
                        objRtn.QAUDI = rs01.getDouble("QAUDI");
                        objRtn.QRM = rs01.getDouble("QRM");

                        if (filter.IN_SELECTBY == 1) {
                            objRtn.Porc = (objRtn.QCUPON > 0) ? objRtn.QAUDI * 100 / objRtn.QCUPON : 0;
                        } else {
                            objRtn.Porc = (objRtn.QRM > 0) ? objRtn.QCUPON * 100 / objRtn.QRM : 0;
                        }

                        objRtn.totAud1 = Aud1;
                        objRtn.totRej1 = Rej1;
                        objRtn.totAud2 = Aud2;
                        objRtn.totRej2 = Rej2;
                        objRtn.totAud3 = Aud3;
                        objRtn.totRej3 = Rej3;
                        objRtn.totAud4 = Aud4;
                        objRtn.totRej4 = Rej4;
                        objRtn.totAud5 = Aud5;
                        objRtn.totRej5 = Rej5;
                        objRtn.totAud6 = Aud6;
                        objRtn.totRej6 = Rej6;

                        objRtn.totQCUPON = QCUPON;
                        objRtn.totQAUDI = QAUDI;
                        objRtn.totQRM = QRM;

                        if (filter.IN_SELECTBY == 1) {
                            objRtn.totPorc = (objRtn.totQCUPON > 0) ? objRtn.totQAUDI * 100 / objRtn.totQCUPON : 0;
                        } else {
                            objRtn.totPorc = (objRtn.totQRM > 0) ? objRtn.totQCUPON * 100 / objRtn.totQRM : 0;
                        }

                        objRtn.Workable = filter.Workable;
                        objRtn.Pending = filter.Pending;

                        objRtn.strFormatDate4 = Functions.getMonthConvert(filter.IN_FECHA_TO);
                        objRtn.strDescripcion = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 1));
                        objRtn.strDescripcion1 = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 2));
                        objRtn.strDescripcion2 = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 3));
                        objRtn.strDescripcion3 = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 4));
                        objRtn.strDescripcion4 = Functions.getMonthConvert(Functions.restMonthtoDate(filter.IN_FECHA_TO, 5));

                        objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                        objRtn.IN_SELECTBY = filter.IN_SELECTBY;
                        objRtn.IN_TYPEDOC = filter.IN_TYPEDOC;
                        objRtn.IN_CURRENCY = filter.IN_CURRENCY;
                        objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                        objRtn.IN_TYPE = filter.IN_TYPE;
                        objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                        objRtn.IN_SOURCE = filter.IN_SOURCE;

                        lstRtn.add(objRtn);
                    }
                    hm.put("lst1", lstRtn);

                    if (cstmt01.getMoreResults()) {
                        rs01 = cstmt01.getResultSet();
                        while (rs01.next()) {
                            objRtn = new WRF016Filter();

                            objRtn.TDOC = rs01.getString("TDOC");
                            objRtn.strDescripcion = rs01.getString("DES_TDOC");
                            /*if (objRtn.TDOC.equals("1")) {
                             objRtn.strDescripcion = "LIFTED";
                             } else if (objRtn.TDOC.equals("2")) {
                             objRtn.strDescripcion = "FIM/SMP";
                             } else if (objRtn.TDOC.equals("3")) {
                             objRtn.strDescripcion = "FIM/MPA";
                             } else if (objRtn.TDOC.equals("4")) {
                             objRtn.strDescripcion = "CTRs/RMs";
                             } else if (objRtn.TDOC.equals("9")) {
                             objRtn.strDescripcion = "Billing Memo";
                             }*/

                            objRtn.Aud1 = rs01.getInt("A1");
                            objRtn.Aud2 = rs01.getInt("A2");
                            objRtn.Aud3 = rs01.getInt("A3");
                            objRtn.Aud4 = rs01.getInt("A4");
                            objRtn.Aud5 = rs01.getInt("A5");
                            objRtn.Aud6 = rs01.getInt("A6");

                            if (filter.IN_SELECTBY == 1) {
                                objRtn.Rej1 = rs01.getInt("B1");
                                objRtn.Rej2 = rs01.getInt("B2");
                                objRtn.Rej3 = rs01.getInt("B3");
                                objRtn.Rej4 = rs01.getInt("B4");
                                objRtn.Rej5 = rs01.getInt("B5");
                                objRtn.Rej6 = rs01.getInt("B6");
                            }

                            lstRtn2.add(objRtn);

                        }
                        hm.put("lst2", lstRtn2);
                    }
                }
            }
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

    public HashMap loadPX165S02WRF001(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        List<WRF016Filter> lstCurrency = new ArrayList<WRF016Filter>(0);
        HashMap hm = new HashMap();
        WRF016Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX165S02WRF001(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FINVOICE);
            cstmt01.setString(3, filter.IN_TYPEDOC);
            cstmt01.setString(4, filter.IN_CURRENCY);
            cstmt01.setString(5, filter.IN_TYPE);
            cstmt01.setString(6, filter.IN_AIRLINE);
            cstmt01.setString(7, filter.IN_SOURCE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new WRF016Filter();
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
                 objRtn.strDescripcion = "CTRs/RMs";
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
                objRtn.TAXI = rs01.getDouble("TAXI");
                objRtn.GROSSN = rs01.getDouble("GROSSN");
                objRtn.ISCN = rs01.getDouble("ISCN");
                objRtn.TAXN = rs01.getDouble("TAXN");
                objRtn.QRM = rs01.getLong("QRM");
                objRtn.QSFIM = rs01.getInt("QSFIM");
                objRtn.QSOPAUD = rs01.getInt("QSUPAUD");
                objRtn.QSOPRM = rs01.getInt("QSUPRM");
                objRtn.QCORR = rs01.getInt("QCORR");

                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.IN_SELECTBY = filter.IN_SELECTBY;
                objRtn.IN_TYPEDOC = filter.IN_TYPEDOC;
                objRtn.IN_CURRENCY = filter.IN_CURRENCY;
                objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                objRtn.IN_TYPE = filter.IN_TYPE;
                objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                objRtn.IN_SOURCE = filter.IN_SOURCE;

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
                    //objRtn.STVAL = filter.STVAL;
                    //objRtn.strTipoSIRAX = filter.strTipoSIRAX;
                    objRtn.CCUST = rs01.getString("CCUST");
                    objRtn.strFormatDate = rs01.getString("FINVOICE").substring(0, 4).concat("-").concat(rs01.getString("FINVOICE").substring(4, 6));
                    objRtn.FINVOICE = rs01.getString("FINVOICE");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOICE);
                    //objRtn.strDateCAD = rs01.getString("FINVOICE").trim();
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.strDescripcion = rs01.getString("DES_TDOC");
                    /*if (objRtn.TDOC.equals("1")) {
                     objRtn.strDescripcion = "LIFTED";
                     } else if (objRtn.TDOC.equals("2")) {
                     objRtn.strDescripcion = "FIM/SMP";
                     } else if (objRtn.TDOC.equals("3")) {
                     objRtn.strDescripcion = "FIM/MPA";
                     } else if (objRtn.TDOC.equals("4")) {
                     objRtn.strDescripcion = "CTRs/RMs";
                     }*/
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
                    if (objRtn.TDOC.equals("4")) {
                        objRtn.dblPerRec = 0;
                    }
                    objRtn.QSFIM = rs01.getInt("QSFIM");
                    objRtn.QSOPAUD = rs01.getInt("QSUPAUD");
                    objRtn.QSOPRM = rs01.getInt("QSUPRM");
                    objRtn.QCORR = rs01.getInt("QCORR");

                    lstRtn.add(objRtn);
                }
                hm.put("lstRtn", lstRtn);
            }
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
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX189S03A020(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt01.setString(3, filter.GRUPO);
            cstmt01.setString(4, filter.TUSO);
            cstmt01.setString(5, "");

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

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

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
                hm.put("lstRtn", lstRtn);
            }
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
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX165S04WRF002(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FINVOICE);
            cstmt01.setString(3, filter.TDOC);
            cstmt01.setString(4, filter.CURRENP);
            cstmt01.setString(5, filter.AIRLINE);
            cstmt01.setString(6, filter.TUSO);
            cstmt01.setString(7, filter.GRUPO);
            cstmt01.setString(8, filter.INVOICE);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

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

    public A020Filter loadPX164SQP00113(String grupo) throws SQLException, Exception {

        A020Filter invoice = new A020Filter();
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        String data = "";

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00113(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);//CALFA
            cstmt.setString(3, grupo.trim());

            cstmt.execute();
            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                invoice.A020GRUPO = rs01.getString("GRUPO").trim();
                invoice.A020FRECHA = rs01.getString("FCLEAR").trim();
                //invoice.A020FRECHA = "201408";
                invoice.A020TUSO = rs01.getString("TUSO").trim();
                invoice.strInvoice = rs01.getString("INVOICE").trim();
                invoice.A020PERI = rs01.getString("PERMONT").trim();
                invoice.A020AIRLIN = rs01.getString("CCIA").trim();
                invoice.A020SUFACT = rs01.getString("FINVOICE").trim();
                invoice.strStval = rs01.getString("STVAL").trim();
                invoice.A020MONEDA = rs01.getString("CURRENP").trim();
                invoice.strCurrenc = rs01.getString("CURRENC").trim();
                invoice.lngQCUPON = rs01.getLong("QCUPON");
                invoice.lngICUPON = rs01.getLong("ICUPON");
                invoice.lngPCUPON = rs01.getLong("PCUPON");
                invoice.dblTCFACT = rs01.getDouble("TCFACT");
                invoice.dblTCSIST = rs01.getDouble("TCSIST");
                if (rs01.getString("A005KEY1") != null) {
                    if (rs01.getString("A005KEY3").trim().isEmpty()) {
                        invoice.strAirlineName = rs01.getString("A005KEY2").trim();
                    } else {
                        invoice.strAirlineName = rs01.getString("A005KEY3").trim();
                    }
                    invoice.strAlfa = rs01.getString("A005KEY1").trim();
                    invoice.strCHS = rs01.getString("A005CHS").trim();
                }
                if (rs01.getString("A750INDTAC") != null) {
                    invoice.strIndSPA = rs01.getString("A750INDTAC").trim();
                }

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (!invoice.A020AIRLIN.trim().equals("") && !invoice.A020FRECHA.trim().equals("") && !invoice.A020GRUPO.trim().equals("")) {
                DatabaseMetaData dmd = cnx.getMetaData();
                cstmt = cnx.prepareCall("{CALL PRAXIS".concat(dmd.getCatalogSeparator()).concat("SPCL3050(?)}"));
                cstmt.setString(1, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
                cstmt.execute();
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                cstmt = cnx.prepareCall("{CALL PRAXIS".concat(dmd.getCatalogSeparator()).concat("SPPRO9304(?)}"));
                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim().concat(invoice.A020AIRLIN.trim()).concat(invoice.A020FRECHA.trim()).concat(invoice.A020GRUPO.trim()));
                cstmt.registerOutParameter(1, Types.CHAR);
                cstmt.execute();

                data = cstmt.getString(1);
                invoice.lngQOVER = Long.parseLong(data.substring(18, 24));
                invoice.lngQREV = Long.parseLong(data.substring(24, 30));
                invoice.lngQOW1 = Long.parseLong(data.substring(30, 36));
                invoice.lngQOW2 = Long.parseLong(data.substring(36, 42));
                invoice.lngQRT1 = Long.parseLong(data.substring(42, 48));
                invoice.lngQRT2 = Long.parseLong(data.substring(48, 54));
                invoice.lngQRM = Long.parseLong(data.substring(54, 60));
                invoice.lngQOTAX = Long.parseLong(data.substring(60, 66));

                try {
                    invoice.dblMinTarifa = Double.parseDouble(data.substring(66, 73)) / 100;
                } catch (Exception e) {
                    invoice.dblMinTarifa = 0.0;
                }

                try {
                    invoice.dblMinTax = Double.parseDouble(data.substring(73, 80)) / 100;
                } catch (Exception e) {
                    invoice.dblMinTax = 0.0;
                }

                invoice.lngQLIMIT = Long.parseLong(data.substring(80, 86));
                invoice.lngQMISS = Long.parseLong(data.substring(86, 92));
                invoice.lngQDUP = Long.parseLong(data.substring(92, 98));
                invoice.lngQNSPA = Long.parseLong(data.substring(98, 104));
                invoice.lngQSSPA = Long.parseLong(data.substring(104, 110));
                invoice.lngQEXC = Long.parseLong(data.substring(110, 116));
                invoice.lngQPPAGO = Long.parseLong(data.substring(116, 122));
                invoice.lngQMATCH = Long.parseLong(data.substring(122, 128));
                invoice.lngQFFLYER = Long.parseLong(data.substring(128, 134));
                invoice.lngQIT = Long.parseLong(data.substring(134, 140));
                invoice.lngQOTROS = Long.parseLong(data.substring(140, 146));
                invoice.lngQPGROSS = Long.parseLong(data.substring(146, 152));
                invoice.lngQPTAX = Long.parseLong(data.substring(152, 158));
                invoice.lngQUNDER = Long.parseLong(data.substring(158, 164));
                invoice.lngQPEND = Long.parseLong(data.substring(164, 170));

                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }

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

        return invoice;
    }

    public List<A020Filter> loadPX164SQP00114(String sqlAlt, A020Filter filter, String consulta) throws SQLException, Exception {

        /**
         * *************************SQL MASIVO DE TAX*************************
         */
        List<A020Filter> list = new ArrayList<A020Filter>();
        A020Filter invoice = new A020Filter();
        String nroprt = "";
        String taxes = "", localCurr = "";
        String ruta = "";
        String sector = "";
        boolean flagStart = false;
        int n = 0;

        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00114(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
//            cstmt.setString(3, filter.A020FRECHA.trim());
            cstmt.setString(3, "20" + filter.A020FRECHA.trim().substring(0, 2) + filter.A020FRECHA.trim().substring(2, 4));
            cstmt.setString(4, filter.A020GRUPO.trim());
            cstmt.setString(5, consulta.trim());
            cstmt.setDouble(6, filter.dblMinTarifa);
            cstmt.setDouble(7, filter.dblMinTax);
            cstmt.setString(8, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                if (!nroprt.trim().equals("") && !nroprt.trim().equals(rs01.getString("A020KEY"))) {

                    // TAXES ===================================================
                    invoice.strTaxes = taxes;
                    invoice.strMonTax = localCurr;
                    // =========================================================
                    //Para la funcion View Images ==============================
                    if ((!sqlAlt.trim().equals("")
                            && rs01.getString(sqlAlt.substring(0, 20).trim()).trim().equals(sqlAlt.substring(20, 40).trim()))
                            || flagStart == true) {
                        flagStart = true;
                        list.add(invoice);
                    } else if (sqlAlt.trim().equals("")) {
                        list.add(invoice);
                    }
                    // =========================================================
                    taxes = "";
                    localCurr = "";
                    n = 0;
                }

                invoice = new A020Filter();
                invoice.A020FRECHA = filter.A020FRECHA.trim();
                invoice.strSQL = filter.strSQL.trim();
                invoice.A020GRUPO = filter.A020GRUPO.trim();
                invoice.dblMinTarifa = filter.dblMinTarifa;
                invoice.dblMinTax = filter.dblMinTax;
                invoice.A020KEY = rs01.getString("A020KEY");//setStrPrememo
                invoice.A020CIA = rs01.getString("A020CIA");
                invoice.A020FORMA = rs01.getString("A020FORMA");
                invoice.A020SERIE = rs01.getString("A020SERIE");
                invoice.A020CUPON = rs01.getString("A020CUPON");
                invoice.strTicket = invoice.A020CIA + invoice.A020FORMA + invoice.A020SERIE + invoice.A020CUPON; //strDOC
                invoice.A020RUTAP = rs01.getString("A020RUTAP");//setStrRuta
                //invoice.A020TUSO = rs01.getString("A020TUSO");
                //invoice.A020SUFACT = rs01.getString("A020SUFACT");//setStrA020SUFACT
                //invoice.A020BATCH = rs01.getLong("A020BATCH");//setStrA020BATCH
                //invoice.A020ORDEN = rs01.getLong("A020ORDEN");//setStrA020ORDEN
                //Factura (Gross-Isc-Tax-%)
                invoice.A020SUDEBI = rs01.getDouble("A020SUDEBI");//setDblBilling
                //invoice.A020IMPNAC = rs01.getDouble("A020IMPNAC");//setDblA020IMPNAC
                invoice.A020TOTDEB = rs01.getDouble("A020TOTDEB");//setDblA020TOTDEB
                //invoice.A020ANALIZ = rs01.getDouble("A020ANALIZ");//setDblA020ANALIZ
                //Miatech (Gross-Isc-Tax-%)
                invoice.A020ACEPTA = rs01.getDouble("A020ACEPTA");//setDblAcepMiatech
                //invoice.A020IMPINT = rs01.getDouble("A020IMPINT");//setDblIMPINT
                invoice.A020TOTHAB = rs01.getDouble("A020TOTHAB");//setDblA020TOTHAB
                //invoice.A020COMISP = rs01.getDouble("A020COMISP");//setDblA020COMISP
                //Neto Rechazo (Gross-Isc-Tax)
                invoice.A020REDEBI = rs01.getDouble("A020REDEBI");//setDblGROSS
                invoice.A020COMISI = rs01.getDouble("A020COMISI");//setDblISC
                invoice.A020TAX = rs01.getDouble("A020TAX");//setDblTAX
                invoice.A020NETO = rs01.getDouble("A020NETO");//setDblNETO
                invoice.A020BASE = rs01.getString("A020BASE");//setStrBase
                invoice.A020RUTA = rs01.getString("A020RUTA");//setStrRUTAP
                invoice.A020FVENTA = rs01.getString("A020FVENTA");//setStrA020FVENTA
                invoice.A020FUSO = rs01.getString("A020FUSO");//setStrA020FUSO
                //Other Commision ==========================================
                //invoice.A020BOTCPR = rs01.getDouble("A020BOTCPR");//setDblA020BOTCPR
                //invoice.A020BOTCRM = rs01.getDouble("A020BOTCRM");//setDblA020BOTCRM
                //invoice.A020AOTCPM = rs01.getDouble("A020AOTCPM");//setDblA020AOTCPM
                //invoice.A020AOTCRM = rs01.getDouble("A020AOTCRM");//setDblA020AOTCRM
                //invoice.A020DOTCRM = rs01.getDouble("A020DOTCRM");//setDblA020DOTCRM
                // =========================================================
                /*if (rs01.getString("A020USER").startsWith("PRT-")) {
                 invoice.strFlag = "NN";
                 } else {
                 invoice.strFlag = "AUDIT";
                 }*/
                invoice.A020CLASRM = rs01.getString("A020CLASRM");//setStrClassRM
                invoice.A020TIPEX = rs01.getString("A020TIPEX");//setStrA728RERUT
                invoice.A728XO = rs01.getString("A728XO");//setStrA728XO
                /*if (rs01.getString("A020TIPORM").trim().equals("N") || rs01.getString("A020CLASRM").trim().equals("F")) {
                 invoice.A020SUFECH = rs01.getString("A020SUFECH");//setStrSuFech
                 } else {
                 invoice.A020SUFECH = rs01.getString("A020FUSO");//setStrSuFech
                 }*/

                ruta = Functions.fillString(rs01.getString("A020RUTA"), 6);
                sector = invoice.A020RUTAP;
                int nx = 0, x = 0, v = 0;
                for (int i = 0; i < ruta.trim().length(); i += 3) {
                    if (i + 6 <= ruta.trim().length()
                            && ruta.trim().substring(i, i + 3).equals(sector.substring(0, 3))
                            && ruta.trim().substring(i + 3, i + 6).equals(sector.substring(3, 6))) {
                        invoice.A020TRANSP = rs01.getString("A020TRANSP").substring(nx, nx + 2);//setStrCarrrier
                        invoice.A020CLASE = rs01.getString("A020CLASE").substring(x, x + 1);//setStrClase
                        invoice.A020VUELO = rs01.getString("A020VUELO").substring(v, v + 5);//setStrA728NVLO1
                    }
                    v += 5;
                    nx += 2;
                    x++;
                }
                //invoice.A020AIRLI3 = rs01.getString("A020AIRLI3");//setStrAirli3

                invoice.page.PAGNUM = filter.page.PAGNUM;
                invoice.page.PAGROW = filter.page.PAGROW;
                invoice.page.TOTPAG = filter.page.TOTPAG;
                invoice.page.TOTROW = filter.page.TOTROW;

                nroprt = rs01.getString("A020KEY");

                //Guardando los Taxes ==========================================
                if (rs01.getString("A020INDTAX").trim().toUpperCase().equals("S")) {
                    if (n == 5) {
                        taxes = taxes.concat("**");
                        n++;
                    } else if (n < 6) {
                        taxes = taxes.concat(rs01.getString("A729CODTAX")).concat(" ")
                                + String.valueOf(rs01.getDouble("A729TAXRES")).concat("  ");
                        n++;
                    }
                    localCurr = rs01.getString("A729MDARES");
                }
                // =============================================================

            }

            if (invoice != null && !nroprt.trim().equals("")) {
                // TAXES =======================================================
                invoice.strTaxes = taxes;
                invoice.strMonTax = localCurr;
                // =============================================================
                //Para la funcion View Images ==================================
                if ((!sqlAlt.trim().equals("")
                        && rs01.getString(sqlAlt.substring(0, 20).trim()).trim().equals(sqlAlt.substring(20, 40).trim()))
                        || flagStart == true) {
                    flagStart = true;
                    list.add(invoice);
                } else if (sqlAlt.trim().equals("")) {
                    list.add(invoice);
                }
                // =============================================================
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

        return list;
    }

    public List<SFI040Filter> loadPX185S01SFI040(SFI040Filter filter) throws SQLException, Exception {
        List<SFI040Filter> lstRtn = new ArrayList<SFI040Filter>(0);
        SFI040Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, VATABP = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI040(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);

            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += (rs01.getInt("TGROSS") * -1);
                } else {
                    totTGROSS += (rs01.getInt("TGROSS"));
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISC") * -1);
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAX") * -1);
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("HFEEAM") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATP") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNET") * -1);
                } else {
                    totTNET += rs01.getDouble("TNET");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTVAT += (rs01.getDouble("TOHCOM") * -1);
                } else {
                    totTVAT += rs01.getDouble("TOHCOM");
                }
                if (rs01.getString("TVATSG").trim().equals("M")) {
                    VATABP += (rs01.getDouble("TVAT") * -1);
                } else {
                    VATABP += rs01.getDouble("TVAT");
                }

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI040Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.DES_BAIR = Functions.getMonthConvert4(objRtn.BDATE);
                    objRtn.PERNUM = rs01.getString("PERNUM");

                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.TNET = (rs01.getDouble("TNET"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));
                    objRtn.TVAT = (rs01.getDouble("TVAT"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;//Other
                    objRtn.VATABP = VATABP;//VAT

                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.BAIR = filter.BAIR;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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

    public List<SFI030Filter> loadPX185SSQP767(SFI030Filter filter) throws SQLException, Exception {
        List<SFI030Filter> lstRtn = new ArrayList<SFI030Filter>(0);
        SFI030Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00767(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);
            cstmt01.setString(8, filter.SOURCOD);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += (rs01.getInt("TGROSS") * -1);
                } else {
                    totTGROSS += (rs01.getInt("TGROSS"));
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISC") * -1);
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAX") * -1);
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("HFEEAM") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATP") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNET") * -1);
                } else {
                    totTNET += rs01.getDouble("TNET");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTVAT += (rs01.getDouble("TOHCOM") * -1);
                } else {
                    totTVAT += rs01.getDouble("TOHCOM");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.TNET = (rs01.getDouble("TNET"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
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

    public List<SFI030Filter> loadPX185S01SFI030(SFI040Filter filter) throws SQLException, Exception {
        List<SFI030Filter> lstRtn = new ArrayList<SFI030Filter>(0);
        SFI030Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, totTAXI = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI030(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);
            cstmt01.setString(8, filter.BDATE);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += (rs01.getDouble("TGROSS") * -1);
                } else {
                    totTGROSS += rs01.getDouble("TGROSS");
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISC") * -1);
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAX") * - 1);
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("HFEEAM") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATP") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNET") * -1);
                } else {
                    totTNET += rs01.getDouble("TNET");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTVAT += (rs01.getDouble("TOHCOM") * -1);
                } else {
                    totTVAT += rs01.getDouble("TOHCOM");
                }
                if (rs01.getString("TVATSG").trim().equals("M")) {
                    totTAXI += (rs01.getDouble("TVAT") * -1);
                } else {
                    totTAXI += rs01.getDouble("TVAT");
                }

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.IN_FECHA_FROM = rs01.getString("DES_SOURCOD");
                    objRtn.DES_SOURCOD = rs01.getString("DES_SOURCOD");

                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.TNET = (rs01.getDouble("TNET"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));
                    objRtn.TVAT = (rs01.getDouble("TVAT"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;// OTHER
                    objRtn.totTAXI = totTAXI;//VAT

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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

        return lstRtn;
    }

    public List<SFI030Filter> loadPX185S02SFI030(SFI040Filter filter) throws SQLException, Exception {
        List<SFI030Filter> lstRtn = new ArrayList<SFI030Filter>(0);
        SFI030Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, totTAXI = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S02SFI030_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);
            cstmt01.setString(8, filter.BDATE);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += (rs01.getDouble("TGROSS") * -1);
                } else {
                    totTGROSS += rs01.getDouble("TGROSS");
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISC") * -1);
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAX") * - 1);
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("HFEEAM") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATP") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNET") * -1);
                } else {
                    totTNET += rs01.getDouble("TNET");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTVAT += (rs01.getDouble("TOHCOM") * -1);
                } else {
                    totTVAT += rs01.getDouble("TOHCOM");
                }

                if (rs01.getString("TVATSG").trim().equals("M")) {
                    totTAXI += (rs01.getDouble("TVAT") * -1);
                } else {
                    totTAXI += rs01.getDouble("TVAT");
                }

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BDAIR = rs01.getString("BDAIR");
                    objRtn.IN_FECHA_FROM = rs01.getString("DES_BDAIR");

                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.TNET = (rs01.getDouble("TNET"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));
                    objRtn.TVAT = (rs01.getDouble("TVAT"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.totTAXI = totTAXI;

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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

    public List<SFI020Filter> loadPX185SSQP785(SFI030Filter filter) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00785(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PERNUM);
            cstmt01.setString(3, filter.BDAIR);
            cstmt01.setString(4, filter.BDATE);
            cstmt01.setString(5, filter.SOURCOD);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += rs01.getDouble("GROSSR");
                totTISC += rs01.getDouble("ISCAMTR");
                totTTAX += rs01.getDouble("TAXR");
                totHFEEAM += rs01.getDouble("HFEEAMR");
                totTUATP += rs01.getDouble("UATPAMTR");
                totTNET += rs01.getDouble("CPNTAMR");
                totTVAT += rs01.getDouble("OTHCOMAMR");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;

                    objRtn.FLIGHTN = rs01.getString("FLIGHTN");
                    objRtn.ORIGPMI = rs01.getString("ORIGPMI");
                    objRtn.VALDPMI = rs01.getString("VALDPMI");

                    objRtn.ACURREN = rs01.getString("ACURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);

                    objRtn.GROSS = (rs01.getDouble("GROSS"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMT"));
                    objRtn.TAX = (rs01.getDouble("TAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAM"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAM"));
                    /* objRtn.OTHCOMPER = (rs01.getDouble("OTHCOMPER"));
                     objRtn.UATPPER = (rs01.getDouble("UATPPER"));
                     objRtn.ISCCH = (rs01.getDouble("ISCCH"));*/

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
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

    public List<SFI021Filter> loadPX185SSQP786(SFI030Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<SFI021Filter>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00786(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PERNUM);
            cstmt01.setString(3, filter.BDAIR);
            cstmt01.setString(4, filter.BDATE);
            cstmt01.setString(5, filter.SOURCOD);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totTGROSS += rs01.getDouble("TGROSSBRT");
                totTISC += rs01.getDouble("TISCALRT");
                totTTAX += rs01.getDouble("TTAXBRT");
                totHFEEAM += rs01.getDouble("THDFALRT");
                totTUATP += rs01.getDouble("TUATPALRT");
                totTNET += rs01.getDouble("TNETRRT");
                totTGROSSA += rs01.getDouble("TGROSSART");
                totTISCA += rs01.getDouble("TISCART");
                totTTAXA += rs01.getDouble("TTAXART");
                totHFEEAMA += rs01.getDouble("THDFART");
                totTUATPA += rs01.getDouble("TUATPART");
                totTGROSSD += rs01.getDouble("TGROSSDRT");
                totTISCD += rs01.getDouble("TISCDRT");
                totTTAXD += rs01.getDouble("TTAXDRT");
                totHFEEAMD += rs01.getDouble("THDFDRT");
                totTUATPD += rs01.getDouble("TUATPDRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.TGROSSB = (rs01.getDouble("TGROSSBRT"));
                    objRtn.TISCAL = (rs01.getDouble("TISCALRT"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXBRT"));
                    objRtn.THDFAL = (rs01.getDouble("THDFALRT"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPALRT"));
                    objRtn.TNETR = (rs01.getDouble("TNETRRT"));
                    objRtn.TGROSSA = (rs01.getDouble("TGROSSART"));
                    objRtn.TISCA = (rs01.getDouble("TISCART"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXART"));
                    objRtn.THDFA = (rs01.getDouble("THDFART"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPART"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSDRT"));
                    objRtn.TISCD = (rs01.getDouble("TISCDRT"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXDRT"));
                    objRtn.THDFD = (rs01.getDouble("THDFDRT"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPDRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
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

    public List<SFI022Filter> loadPX185SSQP787(SFI030Filter filter) throws SQLException, Exception {
        List<SFI022Filter> lstRtn = new ArrayList<SFI022Filter>(0);
        SFI022Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00787(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PERNUM);
            cstmt01.setString(3, filter.BDAIR);
            cstmt01.setString(4, filter.BDATE);
            cstmt01.setString(5, filter.SOURCOD);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                totTGROSS += rs01.getDouble("TGROSSRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATPRT");
                totTNET += rs01.getDouble("NETRT");
                totTVAT += rs01.getDouble("TOHCOMRT");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI022Filter();
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BCMNUM = rs01.getString("BCMNUM").trim();
                    objRtn.REFNUM = rs01.getString("REFNUM").trim();
                    objRtn.FIMNUM = rs01.getString("FIMNUM").trim();
                    objRtn.FIMCPNUM = rs01.getString("FIMCPNUM").trim();
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.REASCOD = rs01.getString("REASCOD");

                    objRtn.TGROSS = (rs01.getDouble("TGROSSRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAX = (rs01.getDouble("TTAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.NET = (rs01.getDouble("NETRT"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOMRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
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

    public List<SFI030Filter> loadPX185S03SFI030(SFI030Filter filter) throws SQLException, Exception {
        List<SFI030Filter> lstRtn = new ArrayList<SFI030Filter>(0);
        SFI030Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, totTAXI = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S03SFI030_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);
            cstmt01.setString(8, filter.BDATE);

            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += (rs01.getDouble("TGROSS") * -1);
                } else {
                    totTGROSS += rs01.getDouble("TGROSS");
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += (rs01.getDouble("TISC") * -1);
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += (rs01.getDouble("TTAX") * - 1);
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += (rs01.getDouble("HFEEAM") * -1);
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += (rs01.getDouble("TUATP") * -1);
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += (rs01.getDouble("TNET") * -1);
                } else {
                    totTNET += rs01.getDouble("TNET");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTVAT += (rs01.getDouble("TOHCOM") * -1);
                } else {
                    totTVAT += rs01.getDouble("TOHCOM");
                }
                if (rs01.getString("TVATSG").trim().equals("M")) {
                    totTAXI += (rs01.getDouble("TVAT") * -1);
                } else {
                    totTAXI += rs01.getDouble("TVAT");
                }

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI030Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.IN_FECHA_FROM = rs01.getString("DES_SOURCOD");

                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.TNET = (rs01.getDouble("TNET"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));
                    objRtn.TVAT = (rs01.getDouble("TVAT"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.totTAXI = totTAXI;

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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

    public List<SFI020Filter> loadPX185S03SFI020(SFI030Filter filter) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double peruatp = 0, perisc = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI020_3(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BDAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
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

                if (rs01.getString("GROSSSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("GROSS") * -1;
                } else {
                    totTGROSS += rs01.getDouble("GROSS");
                }
                if (rs01.getString("ISCAMTSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("ISCAMT") * -1;
                } else {
                    totTISC += rs01.getDouble("ISCAMT");
                }
                if (rs01.getString("TAXSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TAX") * -1;
                } else {
                    totTTAX += rs01.getDouble("TAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("HFEEAM") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("UATPAMTSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("UATPAMT") * -1;
                } else {
                    totTUATP += rs01.getDouble("UATPAMT");
                }
                if (rs01.getString("CPNTAMSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("CPNTAM") * -1;
                } else {
                    totTNET += rs01.getDouble("CPNTAM");
                }
                if (rs01.getString("OTHCOMASG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("OTHCOMAM") * -1;
                } else {
                    totTVAT += rs01.getDouble("OTHCOMAM");
                }
                if (rs01.getString("UATPPERSG").trim().equals("M")) {
                    peruatp += rs01.getDouble("UATPPER") * -1;
                } else {
                    peruatp += rs01.getDouble("UATPPER");
                }
                if (rs01.getString("ISCCHSG").trim().equals("M")) {
                    perisc += rs01.getDouble("ISCCH") * -1;
                } else {
                    perisc += rs01.getDouble("ISCCH");
                }
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.FLIGHTN = rs01.getString("FLIGHTN");
                    objRtn.ACURREN = rs01.getString("ACURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.ETKTIND = rs01.getString("ETKTIND");
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.ORIGPMI = rs01.getString("ORIGPMI");
                    objRtn.VALDPMI = rs01.getString("VALDPMI");
                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);

                    objRtn.GROSS = (rs01.getDouble("GROSS"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMT"));
                    objRtn.TAX = (rs01.getDouble("TAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAM"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAM"));
                    objRtn.OTHCOMPER = (rs01.getDouble("OTHCOMPER"));
                    objRtn.UATPPER = (rs01.getDouble("UATPPER"));
                    objRtn.ISCCH = (rs01.getDouble("ISCCH"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;

                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.AccountingDate = Functions.getMonthConvert(rs01.getString("A1964FCONT"));
                    objRtn.AccountingID = rs01.getString("A1964IDCON");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
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

    public List<SFI041> loadPX185S01SFI041(SFI020Filter filter) throws SQLException, Exception {

        List<SFI041> lstRtn = new ArrayList<SFI041>(0);
        SFI041 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI041(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt01.setString(2, filter.TTRAN.trim());
            cstmt01.setString(3, filter.CPNNUM.trim());
            cstmt01.setString(4, filter.AIRNUM.trim());
            cstmt01.setString(5, filter.TKTNUM.trim());
            //cstmt01.setString(6, filter.BDAIR.trim());
            cstmt01.setString(6, filter.BDATE.trim());
            cstmt01.setString(7, filter.PERNUM.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SFI041();
                objRtn.TAXCODE1 = rs01.getString("TAXCODE1").trim();
                objRtn.TAXBILED1 = rs01.getDouble("TAXBILED1");
                objRtn.TAXCODE2 = rs01.getString("TAXCODE2").trim();
                objRtn.TAXBILED2 = rs01.getDouble("TAXBILED2");
                objRtn.TAXCODE3 = rs01.getString("TAXCODE3").trim();
                objRtn.TAXBILED3 = rs01.getDouble("TAXBILED3");
                objRtn.TAXCODE4 = rs01.getString("TAXCODE4").trim();
                objRtn.TAXBILED4 = rs01.getDouble("TAXBILED4");
                objRtn.TAXCODE5 = rs01.getString("TAXCODE5").trim();
                objRtn.TAXBILED5 = rs01.getDouble("TAXBILED5");
                objRtn.CPNNUM = rs01.getString("CPNNUM").trim();
                objRtn.AIRNUM = rs01.getString("AIRNUM").trim();
                objRtn.TKTNUM = rs01.getString("TKTNUM").trim();
                objRtn.BDATE = Functions.getMonthConvert2(filter.BDATE);
                objRtn.PERNUM = filter.PERNUM;
                objRtn.TKT = filter.AIRNUM + " " + filter.TKTNUM + " " + filter.CPNNUM;
                lstRtn.add(objRtn);
            }
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

    public List<SFI021Filter> loadPX185S03SFI021(SFI030Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<SFI021Filter>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0, totTNETA = 0, totTVATA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTNETD = 0, totTVATD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        // String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI021_1(?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI021_1(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BDAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
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

                if (rs01.getString("TGROSSBSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("TGROSSB") * -1;
                } else {
                    totTGROSS += rs01.getDouble("TGROSSB");
                }
                if (rs01.getString("TISCALSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("TISCAL") * -1;
                } else {
                    totTISC += rs01.getDouble("TISCAL");
                }
                if (rs01.getString("TTAXBSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TTAXB") * -1;
                } else {
                    totTTAX += rs01.getDouble("TTAXB");
                }
                if (rs01.getString("THDFALSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("THDFAL") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("THDFAL");
                }
                if (rs01.getString("TUATPALSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("TUATPAL") * -1;
                } else {
                    totTUATP += rs01.getDouble("TUATPAL");
                }
                if (rs01.getString("TNETRSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("TNETR") * -1;
                } else {
                    totTNET += rs01.getDouble("TNETR");
                }
                if (rs01.getString("TVATBSG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("TVATB") * -1;
                } else {
                    totTVAT += rs01.getDouble("TVATB");
                }

                if (rs01.getString("TGROSSASG").trim().equals("M")) {
                    totTGROSSA += rs01.getDouble("TGROSSA") * -1;
                } else {
                    totTGROSSA += rs01.getDouble("TGROSSA");
                }
                if (rs01.getString("TISCASG").trim().equals("M")) {
                    totTISCA += rs01.getDouble("TISCA") * -1;
                } else {
                    totTISCA += rs01.getDouble("TISCA");
                }
                if (rs01.getString("TTAXASG").trim().equals("M")) {
                    totTTAXA += rs01.getDouble("TTAXA") * -1;
                } else {
                    totTTAXA += rs01.getDouble("TTAXA");
                }
                if (rs01.getString("THDFASG").trim().equals("M")) {
                    totHFEEAMA += rs01.getDouble("THDFA") * -1;
                } else {
                    totHFEEAMA += rs01.getDouble("THDFA");
                }
                if (rs01.getString("TUATPASG").trim().equals("M")) {
                    totTUATPA += rs01.getDouble("TUATPA") * -1;
                } else {
                    totTUATPA += rs01.getDouble("TUATPA");
                }
                // totTNETA = rs01.getDouble("TNETR")
                if (rs01.getString("TVATASG").trim().equals("M")) {;
                    totTVATA += rs01.getDouble("TVATA") * -1;
                } else {
                    totTVATA += rs01.getDouble("TVATA");
                }

                if (rs01.getString("TGROSSDSG").trim().equals("M")) {
                    totTGROSSD += rs01.getDouble("TGROSSD") * -1;
                } else {
                    totTGROSSD += rs01.getDouble("TGROSSD");
                }
                if (rs01.getString("TISCDSG").trim().equals("M")) {
                    totTISCD += rs01.getDouble("TISCD") * -1;
                } else {
                    totTISCD += rs01.getDouble("TISCD");
                }
                if (rs01.getString("TTAXDSG").trim().equals("M")) {
                    totTTAXD += rs01.getDouble("TTAXD") * -1;
                } else {
                    totTTAXD += rs01.getDouble("TTAXD");
                }
                if (rs01.getString("THDFDSG").trim().equals("M")) {
                    totHFEEAMD += rs01.getDouble("THDFD") * -1;
                } else {
                    totHFEEAMD += rs01.getDouble("THDFD");
                }
                if (rs01.getString("TUATPDSG").trim().equals("M")) {
                    totTUATPD += rs01.getDouble("TUATPD") * -1;
                } else {
                    totTUATPD += rs01.getDouble("TUATPD");
                }
                //totTNETD = rs01.getDouble("TNETR");
                if (rs01.getString("TVATDSG").trim().equals("M")) {
                    totTVATD += rs01.getDouble("TVATD") * -1;
                } else {
                    totTVATD += rs01.getDouble("TVATD");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.BDAIR = filter.BDAIR;
                    objRtn.REASCOD = rs01.getString("REASCOD");

                    objRtn.TGROSSB = (rs01.getDouble("TGROSSB"));
                    objRtn.TISCAL = (rs01.getDouble("TISCAL"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXB"));
                    objRtn.THDFAL = (rs01.getDouble("THDFAL"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPAL"));
                    objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TVATB = (rs01.getDouble("TVATB"));

                    objRtn.TGROSSA = (rs01.getDouble("TGROSSA"));
                    objRtn.TISCA = (rs01.getDouble("TISCA"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXA"));
                    objRtn.THDFA = (rs01.getDouble("THDFA"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPA"));
                    objRtn.TVATA = (rs01.getDouble("TVATA"));

                    objRtn.TGROSSD = (rs01.getDouble("TGROSSD"));
                    objRtn.TISCD = (rs01.getDouble("TISCD"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXD"));
                    objRtn.THDFD = (rs01.getDouble("THDFD"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPD"));
                    //objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TVATD = (rs01.getDouble("TVATD"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totTVATA = totTVATA;

                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.totTVATD = totTVATD;

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;

                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
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

    public List<SFI022Filter> loadPX185S03SFI022(SFI030Filter filter) throws SQLException, Exception {
        List<SFI022Filter> lstRtn = new ArrayList<SFI022Filter>(0);
        SFI022Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI022_1(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BDAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
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
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("TGROSS") * -1;
                } else {
                    totTGROSS += rs01.getDouble("TGROSS");
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("TISC") * -1;
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TTAX") * -1;
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("HFEEAM") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("TUATP") * -1;
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("NET") * -1;
                } else {
                    totTNET += rs01.getDouble("NET");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("TOHCOM") * -1;
                } else {
                    totTVAT += rs01.getDouble("TOHCOM");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI022Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BCMNUM = rs01.getString("BCMNUM").trim();
                    objRtn.REFNUM = rs01.getString("REFNUM").trim();
                    objRtn.FIMNUM = rs01.getString("FIMNUM").trim();
                    objRtn.FIMCPNUM = rs01.getString("FIMCPNUM").trim();
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.BDAIR = filter.BDAIR;

                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.NET = (rs01.getDouble("NET"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;

                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
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

    public List<A051> loadUsosA1852(String grupo) throws SQLException, Exception {

        List<A051> lstRtn = new ArrayList<A051>(0);
        A051 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PXS02A1852_USOS(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, grupo);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A051();
                objRtn.A051KEY2 = rs01.getString("A051KEY2");
                objRtn.A051DESCR1 = rs01.getString("A051DESCR1");

                lstRtn.add(objRtn);
            }
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

    public List<SFI020Filter> loadPX185S02SFI020(SFI030Filter filter) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0, TOTHCD = 0;
        double peruatp = 0, perisc = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S02SFI020(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);
            cstmt01.setString(8, filter.BDATE);
            cstmt01.setString(9, filter.SOURCOD);
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

                if (rs01.getString("GROSSSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("GROSS") * -1;
                } else {
                    totTGROSS += rs01.getDouble("GROSS");
                }
                if (rs01.getString("ISCAMTSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("ISCAMT") * -1;
                } else {
                    totTISC += rs01.getDouble("ISCAMT");
                }
                if (rs01.getString("TAXSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TAX") * -1;
                } else {
                    totTTAX += rs01.getDouble("TAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("HFEEAM") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("UATPAMTSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("UATPAMT") * -1;
                } else {
                    totTUATP += rs01.getDouble("UATPAMT");
                }
                if (rs01.getString("CPNTAMSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("CPNTAM") * -1;
                } else {
                    totTNET += rs01.getDouble("CPNTAM");
                }
                if (rs01.getString("OTHCOMASG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("OTHCOMAM") * -1;
                } else {
                    totTVAT += rs01.getDouble("OTHCOMAM");
                }
                if (rs01.getString("UATPPERSG").trim().equals("M")) {
                    peruatp += rs01.getDouble("UATPPER") * -1;
                } else {
                    peruatp += rs01.getDouble("UATPPER");
                }
                if (rs01.getString("ISCCHSG").trim().equals("M")) {
                    perisc += rs01.getDouble("ISCCH") * -1;
                } else {
                    perisc += rs01.getDouble("ISCCH");
                }
                if (rs01.getString("VATAMTSG").trim().equals("M")) {
                    TOTHCD += rs01.getDouble("VATAMT") * -1;
                } else {
                    TOTHCD += rs01.getDouble("VATAMT");
                }

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");

                    objRtn.BDAIR = rs01.getString("BDAIR");
                    objRtn.DES_BDAIR = rs01.getString("DES_BDAIR");
                    objRtn.GROSS = (rs01.getDouble("GROSS"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMT"));
                    objRtn.TAX = (rs01.getDouble("TAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAM"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAM"));
                    objRtn.UATPPER = (rs01.getDouble("UATPPER"));
                    objRtn.ISCCH = (rs01.getDouble("ISCCH"));
                    objRtn.VATAMT = (rs01.getDouble("VATAMT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.TOTHCD = TOTHCD;
                    objRtn.QUANTITY = (rs01.getInt("QUANTITY"));
                    System.out.println(rs01.getInt("QUANTITY"));
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI020Filter> loadPX185S01SFI020(SFI020Filter filter) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double peruatp = 0, perisc = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //ANTES PX185S01SFI020_2
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03152(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BDAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
            cstmt01.setString(7, filter.ORIGPMI);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                if (rs01.getString("GROSSSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("GROSS") * -1;
                } else {
                    totTGROSS += rs01.getDouble("GROSS");
                }
                if (rs01.getString("ISCAMTSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("ISCAMT") * -1;
                } else {
                    totTISC += rs01.getDouble("ISCAMT");
                }
                if (rs01.getString("TAXSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TAX") * -1;
                } else {
                    totTTAX += rs01.getDouble("TAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("HFEEAM") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("UATPAMTSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("UATPAMT") * -1;
                } else {
                    totTUATP += rs01.getDouble("UATPAMT");
                }
                if (rs01.getString("CPNTAMSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("CPNTAM") * -1;
                } else {
                    totTNET += rs01.getDouble("CPNTAM");
                }
                if (rs01.getString("OTHCOMASG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("OTHCOMAM") * -1;
                } else {
                    totTVAT += rs01.getDouble("OTHCOMAM");
                }
                if (rs01.getString("UATPPERSG").trim().equals("M")) {
                    peruatp += rs01.getDouble("UATPPER") * -1;
                } else {
                    peruatp += rs01.getDouble("UATPPER");
                }
                if (rs01.getString("ISCCHSG").trim().equals("M")) {
                    perisc += rs01.getDouble("ISCCH") * -1;
                } else {
                    perisc += rs01.getDouble("ISCCH");
                }
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.ACURREN = rs01.getString("ACURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.FLIGHTN = rs01.getString("FLIGHTN");
                    objRtn.ETKTIND = rs01.getString("ETKTIND");
                    objRtn.ORIGPMI = rs01.getString("ORIGPMI");
                    objRtn.VALDPMI = rs01.getString("VALDPMI");
                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);
                    objRtn.BDAIR = filter.BDAIR;

                    objRtn.GROSS = (rs01.getDouble("GROSS"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMT"));
                    objRtn.TAX = (rs01.getDouble("TAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAM"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAM"));
                    objRtn.UATPPER = (rs01.getDouble("UATPPER"));
                    objRtn.ISCCH = (rs01.getDouble("ISCCH"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.AccountingDate = Functions.getMonthConvert(rs01.getString("A1964FCONT"));
                    objRtn.AccountingID = rs01.getString("A1964IDCON");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
            }
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

    public List<SFI020Filter> loadPX185S09SFI020(SFI020Filter filter) throws SQLException, Exception {

        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S09SFI020(?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt01.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt01.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                totTGROSS += rs01.getDouble("GROSSRT");
                totTISC += rs01.getDouble("ISCAMTRT");
                totTTAX += rs01.getDouble("TAXRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("UATPAMTRT");
                totTNET += rs01.getDouble("CPNTAMRT");
                totTVAT += rs01.getDouble("OTHCOMAMRT");
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI020Filter();
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    if (rs01.getString("DES_FTE") != null) {
                        objRtn.DES_FTE = rs01.getString("DES_FTE");
                    } else {
                        objRtn.DES_FTE = "";
                    }
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.ACURREN = rs01.getString("ACURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.ETKTIND = rs01.getString("ETKTIND");
                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);
                    objRtn.BDAIR = rs01.getString("BDAIR");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.VALDPMI = rs01.getString("VALDPMI");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;
                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);
                    objRtn.GROSS = (rs01.getDouble("GROSSRT"));
                    objRtn.ISCAMT = (rs01.getDouble("ISCAMTRT"));
                    objRtn.TAX = (rs01.getDouble("TAXRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.UATPAMT = (rs01.getDouble("UATPAMTRT"));
                    objRtn.CPNTAM = (rs01.getDouble("CPNTAMRT"));
                    objRtn.OTHCOMAM = (rs01.getDouble("OTHCOMAMRT"));
                    objRtn.OTHCOMPER = (rs01.getDouble("OTHCOMPERRT"));
                    objRtn.UATPPER = (rs01.getDouble("UATPPERRT"));
                    objRtn.ISCCH = (rs01.getDouble("ISCCHRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    lstRtn.add(objRtn);
                }
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

    public List<SFI021Filter> loadPX185S01SFI021(SFI021Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<SFI021Filter>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0, totTNETA = 0, totTVATA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTNETD = 0, totTVATD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI021(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BDAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
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

                if (rs01.getString("TGROSSBSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("TGROSSB") * -1;
                } else {
                    totTGROSS += rs01.getDouble("TGROSSB");
                }
                if (rs01.getString("TISCALSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("TISCAL") * -1;
                } else {
                    totTISC += rs01.getDouble("TISCAL");
                }
                if (rs01.getString("TTAXBSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TTAXB") * -1;
                } else {
                    totTTAX += rs01.getDouble("TTAXB");
                }
                if (rs01.getString("THDFALSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("THDFAL") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("THDFAL");
                }
                if (rs01.getString("TUATPALSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("TUATPAL") * -1;
                } else {
                    totTUATP += rs01.getDouble("TUATPAL");
                }
                if (rs01.getString("TNETRSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("TNETR") * -1;
                } else {
                    totTNET += rs01.getDouble("TNETR");
                }
                if (rs01.getString("TVATBSG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("TVATB") * -1;
                } else {
                    totTVAT += rs01.getDouble("TVATB");
                }

                if (rs01.getString("TGROSSASG").trim().equals("M")) {
                    totTGROSSA += rs01.getDouble("TGROSSA") * -1;
                } else {
                    totTGROSSA += rs01.getDouble("TGROSSA");
                }
                if (rs01.getString("TISCASG").trim().equals("M")) {
                    totTISCA += rs01.getDouble("TISCA") * -1;
                } else {
                    totTISCA += rs01.getDouble("TISCA");
                }
                if (rs01.getString("TTAXASG").trim().equals("M")) {
                    totTTAXA += rs01.getDouble("TTAXA") * -1;
                } else {
                    totTTAXA += rs01.getDouble("TTAXA");
                }
                if (rs01.getString("THDFASG").trim().equals("M")) {
                    totHFEEAMA += rs01.getDouble("THDFA") * -1;
                } else {
                    totHFEEAMA += rs01.getDouble("THDFA");
                }
                if (rs01.getString("TUATPASG").trim().equals("M")) {
                    totTUATPA += rs01.getDouble("TUATPA") * -1;
                } else {
                    totTUATPA += rs01.getDouble("TUATPA");
                }
                // totTNETA = rs01.getDouble("TNETR")
                if (rs01.getString("TVATASG").trim().equals("M")) {;
                    totTVATA += rs01.getDouble("TVATA") * -1;
                } else {
                    totTVATA += rs01.getDouble("TVATA");
                }

                if (rs01.getString("TGROSSDSG").trim().equals("M")) {
                    totTGROSSD += rs01.getDouble("TGROSSD") * -1;
                } else {
                    totTGROSSD += rs01.getDouble("TGROSSD");
                }
                if (rs01.getString("TISCDSG").trim().equals("M")) {
                    totTISCD += rs01.getDouble("TISCD") * -1;
                } else {
                    totTISCD += rs01.getDouble("TISCD");
                }
                if (rs01.getString("TTAXDSG").trim().equals("M")) {
                    totTTAXD += rs01.getDouble("TTAXD") * -1;
                } else {
                    totTTAXD += rs01.getDouble("TTAXD");
                }
                if (rs01.getString("THDFDSG").trim().equals("M")) {
                    totHFEEAMD += rs01.getDouble("THDFD") * -1;
                } else {
                    totHFEEAMD += rs01.getDouble("THDFD");
                }
                if (rs01.getString("TUATPDSG").trim().equals("M")) {
                    totTUATPD += rs01.getDouble("TUATPD") * -1;
                } else {
                    totTUATPD += rs01.getDouble("TUATPD");
                }
                //totTNETD = rs01.getDouble("TNETR");
                if (rs01.getString("TVATDSG").trim().equals("M")) {
                    totTVATD += rs01.getDouble("TVATD") * -1;
                } else {
                    totTVATD += rs01.getDouble("TVATD");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.BDAIR = filter.BDAIR;

                    objRtn.TGROSSB = (rs01.getDouble("TGROSSB"));
                    objRtn.TISCAL = (rs01.getDouble("TISCAL"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXB"));
                    objRtn.THDFAL = (rs01.getDouble("THDFAL"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPAL"));
                    objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TVATB = (rs01.getDouble("TVATB"));

                    objRtn.TGROSSA = (rs01.getDouble("TGROSSA"));
                    objRtn.TISCA = (rs01.getDouble("TISCA"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXA"));
                    objRtn.THDFA = (rs01.getDouble("THDFA"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPA"));
                    objRtn.TVATA = (rs01.getDouble("TVATA"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSD"));
                    objRtn.TISCD = (rs01.getDouble("TISCD"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXD"));
                    objRtn.THDFD = (rs01.getDouble("THDFD"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPD"));
                    objRtn.TVATD = (rs01.getDouble("TVATD"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totTVATA = totTVATA;

                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.totTVATD = totTVATD;

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI021Filter> loadPX185S02SFI021(SFI030Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<SFI021Filter>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0, totTNETA = 0, totTVATA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTNETD = 0, totTVATD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S02SFI021_1(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);
            cstmt01.setString(8, filter.BDATE);
            cstmt01.setString(9, filter.SOURCOD);
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

                if (rs01.getString("TGROSSBSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("TGROSSB") * -1;
                } else {
                    totTGROSS += rs01.getDouble("TGROSSB");
                }
                if (rs01.getString("TISCALSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("TISCAL") * -1;
                } else {
                    totTISC += rs01.getDouble("TISCAL");
                }
                if (rs01.getString("TTAXBSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TTAXB") * -1;
                } else {
                    totTTAX += rs01.getDouble("TTAXB");
                }
                if (rs01.getString("THDFALSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("THDFAL") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("THDFAL");
                }
                if (rs01.getString("TUATPALSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("TUATPAL") * -1;
                } else {
                    totTUATP += rs01.getDouble("TUATPAL");
                }
                if (rs01.getString("TNETRSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("TNETR") * -1;
                } else {
                    totTNET += rs01.getDouble("TNETR");
                }
                if (rs01.getString("TVATBSG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("TVATB") * -1;
                } else {
                    totTVAT += rs01.getDouble("TVATB");
                }

                if (rs01.getString("TGROSSASG").trim().equals("M")) {
                    totTGROSSA += rs01.getDouble("TGROSSA") * -1;
                } else {
                    totTGROSSA += rs01.getDouble("TGROSSA");
                }
                if (rs01.getString("TISCASG").trim().equals("M")) {
                    totTISCA += rs01.getDouble("TISCA") * -1;
                } else {
                    totTISCA += rs01.getDouble("TISCA");
                }
                if (rs01.getString("TTAXASG").trim().equals("M")) {
                    totTTAXA += rs01.getDouble("TTAXA") * -1;
                } else {
                    totTTAXA += rs01.getDouble("TTAXA");
                }
                if (rs01.getString("THDFASG").trim().equals("M")) {
                    totHFEEAMA += rs01.getDouble("THDFA") * -1;
                } else {
                    totHFEEAMA += rs01.getDouble("THDFA");
                }
                if (rs01.getString("TUATPASG").trim().equals("M")) {
                    totTUATPA += rs01.getDouble("TUATPA") * -1;
                } else {
                    totTUATPA += rs01.getDouble("TUATPA");
                }
                // totTNETA = rs01.getDouble("TNETR")
                if (rs01.getString("TVATASG").trim().equals("M")) {;
                    totTVATA += rs01.getDouble("TVATA") * -1;
                } else {
                    totTVATA += rs01.getDouble("TVATA");
                }

                if (rs01.getString("TGROSSDSG").trim().equals("M")) {
                    totTGROSSD += rs01.getDouble("TGROSSD") * -1;
                } else {
                    totTGROSSD += rs01.getDouble("TGROSSD");
                }
                if (rs01.getString("TISCDSG").trim().equals("M")) {
                    totTISCD += rs01.getDouble("TISCD") * -1;
                } else {
                    totTISCD += rs01.getDouble("TISCD");
                }
                if (rs01.getString("TTAXDSG").trim().equals("M")) {
                    totTTAXD += rs01.getDouble("TTAXD") * -1;
                } else {
                    totTTAXD += rs01.getDouble("TTAXD");
                }
                if (rs01.getString("THDFDSG").trim().equals("M")) {
                    totHFEEAMD += rs01.getDouble("THDFD") * -1;
                } else {
                    totHFEEAMD += rs01.getDouble("THDFD");
                }
                if (rs01.getString("TUATPDSG").trim().equals("M")) {
                    totTUATPD += rs01.getDouble("TUATPD") * -1;
                } else {
                    totTUATPD += rs01.getDouble("TUATPD");
                }
                //totTNETD = rs01.getDouble("TNETR");
                if (rs01.getString("TVATDSG").trim().equals("M")) {
                    totTVATD += rs01.getDouble("TVATD") * -1;
                } else {
                    totTVATD += rs01.getDouble("TVATD");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");
                    //objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.BDAIR = rs01.getString("BDAIR");
                    objRtn.DES_BDAIR = rs01.getString("DES_BDAIR");
                    objRtn.TGROSSB = (rs01.getDouble("TGROSSB"));
                    objRtn.TISCAL = (rs01.getDouble("TISCAL"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXB"));
                    objRtn.THDFAL = (rs01.getDouble("THDFAL"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPAL"));
                    objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TVATB = (rs01.getDouble("TVATB"));

                    objRtn.TGROSSA = (rs01.getDouble("TGROSSA"));
                    objRtn.TISCA = (rs01.getDouble("TISCA"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXA"));
                    objRtn.THDFA = (rs01.getDouble("THDFA"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPA"));
                    // objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TVATA = (rs01.getDouble("TVATA"));

                    objRtn.TGROSSD = (rs01.getDouble("TGROSSD"));
                    objRtn.TISCD = (rs01.getDouble("TISCD"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXD"));
                    objRtn.THDFD = (rs01.getDouble("THDFD"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPD"));
                    //objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TVATD = (rs01.getDouble("TVATD"));
                    objRtn.QUANTITY = (rs01.getInt("QUANTITY"));
                    //System.out.println("021:" + rs01.getInt("QUANTITY"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    // objRtn.totTNETA = totTNETA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totTVATA = totTVATA;

                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    //objRtn.totTNETD = totTNETD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.totTVATD = totTVATD;

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;

                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI021Filter> loadPX185S01SFI021_1_1(SFI021Filter filter) throws SQLException, Exception {
        List<SFI021Filter> lstRtn = new ArrayList<SFI021Filter>(0);
        SFI021Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        double totTGROSSA = 0, totTISCA = 0, totTTAXA = 0, totHFEEAMA = 0, totTUATPA = 0, totTNETA = 0, totTVATA = 0;
        double totTGROSSD = 0, totTISCD = 0, totTTAXD = 0, totHFEEAMD = 0, totTUATPD = 0, totTNETD = 0, totTVATD = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI021_1_2(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.REJNUMBER);
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

                if (rs01.getString("TGROSSBSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("TGROSSB") * -1;
                } else {
                    totTGROSS += rs01.getDouble("TGROSSB");
                }
                if (rs01.getString("TISCALSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("TISCAL") * -1;
                } else {
                    totTISC += rs01.getDouble("TISCAL");
                }
                if (rs01.getString("TTAXBSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TTAXB") * -1;
                } else {
                    totTTAX += rs01.getDouble("TTAXB");
                }
                if (rs01.getString("THDFALSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("THDFAL") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("THDFAL");
                }
                if (rs01.getString("TUATPALSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("TUATPAL") * -1;
                } else {
                    totTUATP += rs01.getDouble("TUATPAL");
                }
                if (rs01.getString("TNETRSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("TNETR") * -1;
                } else {
                    totTNET += rs01.getDouble("TNETR");
                }
                if (rs01.getString("TVATBSG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("TVATB") * -1;
                } else {
                    totTVAT += rs01.getDouble("TVATB");
                }

                if (rs01.getString("TGROSSASG").trim().equals("M")) {
                    totTGROSSA += rs01.getDouble("TGROSSA") * -1;
                } else {
                    totTGROSSA += rs01.getDouble("TGROSSA");
                }
                if (rs01.getString("TISCASG").trim().equals("M")) {
                    totTISCA += rs01.getDouble("TISCA") * -1;
                } else {
                    totTISCA += rs01.getDouble("TISCA");
                }
                if (rs01.getString("TTAXASG").trim().equals("M")) {
                    totTTAXA += rs01.getDouble("TTAXA") * -1;
                } else {
                    totTTAXA += rs01.getDouble("TTAXA");
                }
                if (rs01.getString("THDFASG").trim().equals("M")) {
                    totHFEEAMA += rs01.getDouble("THDFA") * -1;
                } else {
                    totHFEEAMA += rs01.getDouble("THDFA");
                }
                if (rs01.getString("TUATPASG").trim().equals("M")) {
                    totTUATPA += rs01.getDouble("TUATPA") * -1;
                } else {
                    totTUATPA += rs01.getDouble("TUATPA");
                }
                // totTNETA = rs01.getDouble("TNETR")
                if (rs01.getString("TVATASG").trim().equals("M")) {;
                    totTVATA += rs01.getDouble("TVATA") * -1;
                } else {
                    totTVATA += rs01.getDouble("TVATA");
                }

                if (rs01.getString("TGROSSDSG").trim().equals("M")) {
                    totTGROSSD += rs01.getDouble("TGROSSD") * -1;
                } else {
                    totTGROSSD += rs01.getDouble("TGROSSD");
                }
                if (rs01.getString("TISCDSG").trim().equals("M")) {
                    totTISCD += rs01.getDouble("TISCD") * -1;
                } else {
                    totTISCD += rs01.getDouble("TISCD");
                }
                if (rs01.getString("TTAXDSG").trim().equals("M")) {
                    totTTAXD += rs01.getDouble("TTAXD") * -1;
                } else {
                    totTTAXD += rs01.getDouble("TTAXD");
                }
                if (rs01.getString("THDFDSG").trim().equals("M")) {
                    totHFEEAMD += rs01.getDouble("THDFD") * -1;
                } else {
                    totHFEEAMD += rs01.getDouble("THDFD");
                }
                if (rs01.getString("TUATPDSG").trim().equals("M")) {
                    totTUATPD += rs01.getDouble("TUATPD") * -1;
                } else {
                    totTUATPD += rs01.getDouble("TUATPD");
                }
                //totTNETD = rs01.getDouble("TNETR");
                if (rs01.getString("TVATDSG").trim().equals("M")) {
                    totTVATD += rs01.getDouble("TVATD") * -1;
                } else {
                    totTVATD += rs01.getDouble("TVATD");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021Filter();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.REJNUM = rs01.getString("REJNUM");
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.BDAIR = filter.BDAIR;

                    objRtn.TGROSSB = (rs01.getDouble("TGROSSB"));
                    objRtn.TISCAL = (rs01.getDouble("TISCAL"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXB"));
                    objRtn.THDFAL = (rs01.getDouble("THDFAL"));
                    objRtn.TUATPAL = (rs01.getDouble("TUATPAL"));
                    objRtn.TNETR = (rs01.getDouble("TNETR"));
                    objRtn.TVATB = (rs01.getDouble("TVATB"));

                    objRtn.TGROSSA = (rs01.getDouble("TGROSSA"));
                    objRtn.TISCA = (rs01.getDouble("TISCA"));
                    objRtn.TTAXA = (rs01.getDouble("TTAXA"));
                    objRtn.THDFA = (rs01.getDouble("THDFA"));
                    objRtn.TUATPA = (rs01.getDouble("TUATPA"));
                    objRtn.TVATA = (rs01.getDouble("TVATA"));
                    objRtn.TGROSSD = (rs01.getDouble("TGROSSD"));
                    objRtn.TISCD = (rs01.getDouble("TISCD"));
                    objRtn.TTAXD = (rs01.getDouble("TTAXD"));
                    objRtn.THDFD = (rs01.getDouble("THDFD"));
                    objRtn.TUATPD = (rs01.getDouble("TUATPD"));
                    objRtn.TVATD = (rs01.getDouble("TVATD"));

                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;

                    objRtn.totHFEEAMA = totHFEEAMA;
                    objRtn.totTGROSSA = totTGROSSA;
                    objRtn.totTISCA = totTISCA;
                    objRtn.totTTAXA = totTTAXA;
                    objRtn.totTUATPA = totTUATPA;
                    objRtn.totTVATA = totTVATA;

                    objRtn.totHFEEAMD = totHFEEAMD;
                    objRtn.totTGROSSD = totTGROSSD;
                    objRtn.totTISCD = totTISCD;
                    objRtn.totTTAXD = totTTAXD;
                    objRtn.totTUATPD = totTUATPD;
                    objRtn.totTVATD = totTVATD;

                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;

    }

    public List<SFI022Filter> loadPX185S02SFI022(SFI030Filter filter) throws SQLException, Exception {
        List<SFI022Filter> lstRtn = new ArrayList<SFI022Filter>(0);
        SFI022Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        filter.yearFrom = Functions.fillZeros(2, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(2, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");

        /*String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S02SFI022_1_1(?,?,?,?,?,?,?,?,?,?,?,?,?)}";*/
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S02SFI022(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.yearFrom.substring(2, 4) + filter.monthFrom + filter.dayFrom);
            cstmt01.setString(3, filter.yearTo.substring(2, 4) + filter.monthTo + filter.dayTo);
            cstmt01.setString(4, Functions.getFechaActual().substring(1, 6));
            cstmt01.setString(5, filter.TTRAN);
            cstmt01.setString(6, filter.PERNUM);
            cstmt01.setString(7, filter.BDAIR);
            cstmt01.setString(8, filter.BDATE);
            cstmt01.setString(9, filter.SOURCOD);
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
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("TGROSS") * -1;
                } else {
                    totTGROSS += rs01.getDouble("TGROSS");
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("TISC") * -1;
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TTAX") * -1;
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("HFEEAM") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("TUATP") * -1;
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("NET") * -1;
                } else {
                    totTNET += rs01.getDouble("NET");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("TOHCOM") * -1;
                } else {
                    totTVAT += rs01.getDouble("TOHCOM");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI022Filter();
                    objRtn.yearFrom = filter.yearFrom;
                    objRtn.monthFrom = filter.monthFrom;
                    objRtn.yearTo = filter.yearTo;
                    objRtn.monthTo = filter.monthTo;
                    objRtn.dayFrom = filter.dayFrom;
                    objRtn.dayTo = filter.dayTo;
                    objRtn.RN = rs01.getLong("RN");

                    objRtn.BDAIR = rs01.getString("BDAIR");
                    objRtn.DES_BDAIR = rs01.getString("DES_BDAIR");

                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.NET = (rs01.getDouble("NET"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.QUANTITY = (rs01.getInt("QUANTITY"));

                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI022Filter> loadPX185S01SFI022(SFI022Filter filter) throws SQLException, Exception {
        List<SFI022Filter> lstRtn = new ArrayList<SFI022Filter>(0);
        SFI022Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI022_1(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BDAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.SOURCOD);
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
                if (rs01.getString("TGROSSG").trim().equals("M")) {
                    totTGROSS += rs01.getDouble("TGROSS") * -1;
                } else {
                    totTGROSS += rs01.getDouble("TGROSS");
                }
                if (rs01.getString("TISCSG").trim().equals("M")) {
                    totTISC += rs01.getDouble("TISC") * -1;
                } else {
                    totTISC += rs01.getDouble("TISC");
                }
                if (rs01.getString("TTAXSG").trim().equals("M")) {
                    totTTAX += rs01.getDouble("TTAX") * -1;
                } else {
                    totTTAX += rs01.getDouble("TTAX");
                }
                if (rs01.getString("HFEEAMSG").trim().equals("M")) {
                    totHFEEAM += rs01.getDouble("HFEEAM") * -1;
                } else {
                    totHFEEAM += rs01.getDouble("HFEEAM");
                }
                if (rs01.getString("TUATPSG").trim().equals("M")) {
                    totTUATP += rs01.getDouble("TUATP") * -1;
                } else {
                    totTUATP += rs01.getDouble("TUATP");
                }
                if (rs01.getString("NETSG").trim().equals("M")) {
                    totTNET += rs01.getDouble("NET") * -1;
                } else {
                    totTNET += rs01.getDouble("NET");
                }
                if (rs01.getString("TOHCOMSG").trim().equals("M")) {
                    totTVAT += rs01.getDouble("TOHCOM") * -1;
                } else {
                    totTVAT += rs01.getDouble("TOHCOM");
                }
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI022Filter();

                    objRtn.RN = rs01.getLong("RN");
                    objRtn.BCMNUM = rs01.getString("BCMNUM").trim();
                    objRtn.REFNUM = rs01.getString("REFNUM").trim();
                    objRtn.FIMNUM = rs01.getString("FIMNUM").trim();
                    objRtn.FIMCPNUM = rs01.getString("FIMCPNUM").trim();
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.REASCOD = rs01.getString("REASCOD");
                    objRtn.BDAIR = filter.BDAIR;
                    //  objRtn.DES_BDAIR =  rs01.getString("DES_BDAIR");

                    objRtn.TGROSS = (rs01.getDouble("TGROSS"));
                    objRtn.TISC = (rs01.getDouble("TISC"));
                    objRtn.TTAX = (rs01.getDouble("TTAX"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAM"));
                    objRtn.TUATP = (rs01.getDouble("TUATP"));
                    objRtn.NET = (rs01.getDouble("NET"));
                    objRtn.TOHCOM = (rs01.getDouble("TOHCOM"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;

                    objRtn.BDATE = filter.BDATE;
                    objRtn.SOURCOD = filter.SOURCOD;
                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
        return lstRtn;
    }

    public List<SFI041> loadPX185S02SFI041(SFI021Filter filter) throws SQLException, Exception {

        List<SFI041> lstRtn = new ArrayList<SFI041>(0);
        SFI041 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S02SFI041(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt01.setString(2, filter.TTRAN.trim());
            cstmt01.setString(3, filter.REJNUM.trim());
            cstmt01.setString(4, filter.BDAIR.trim());
            cstmt01.setString(5, filter.BDATE.trim());
            cstmt01.setString(6, filter.PERNUM.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SFI041();
                objRtn.TAXCODE1 = rs01.getString("TAXCODE1").trim();
                objRtn.TAXBILED1 = rs01.getDouble("TAXBILED1");
                objRtn.TAXCODE2 = rs01.getString("TAXCODE2").trim();
                objRtn.TAXBILED2 = rs01.getDouble("TAXBILED2");
                objRtn.TAXCODE3 = rs01.getString("TAXCODE3").trim();
                objRtn.TAXBILED3 = rs01.getDouble("TAXBILED3");
                objRtn.TAXCODE4 = rs01.getString("TAXCODE4").trim();
                objRtn.TAXBILED4 = rs01.getDouble("TAXBILED4");
                objRtn.TAXCODE5 = rs01.getString("TAXCODE5").trim();
                objRtn.TAXBILED5 = rs01.getDouble("TAXBILED5");
                objRtn.RBCNUM = filter.REJNUM;
                objRtn.BDATE = Functions.getMonthConvert2(filter.BDATE);
                objRtn.PERNUM = filter.PERNUM;
                lstRtn.add(objRtn);
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
        return lstRtn;
    }

    public SFI031 loadPX185S02SFI031(SFI022Filter filter) throws SQLException, Exception {
        SFI031 objRtn = new SFI031();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI031(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt01.setString(2, filter.TTRAN.trim());
            cstmt01.setString(3, filter.BCMNUM.trim());
            cstmt01.setString(4, filter.BDAIR.trim());
            cstmt01.setString(5, filter.BDATE.trim());
            cstmt01.setString(6, filter.PERNUM.trim());
            cstmt01.setString(7, filter.SOURCOD.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.REMARK1 = rs01.getString("REMARK1").trim();
                objRtn.REMARK2 = rs01.getString("REMARK2").trim();
                objRtn.REMARK3 = rs01.getString("REMARK3").trim();
                objRtn.REMARK4 = rs01.getString("REMARK4").trim();
                objRtn.REMARK5 = rs01.getString("REMARK5").trim();
                objRtn.NUMRMK = rs01.getString("NUMRMK").trim();
                objRtn.RBCNUM = filter.BCMNUM;

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

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<SFI033Filter> loadPX185S01SFI033(SFI022Filter filter) throws SQLException, Exception {
        List<SFI033Filter> lstRtn = new ArrayList<SFI033Filter>(0);
        SFI033Filter objRtn;
        double totTGROSS = 0, totTISC = 0, totTTAX = 0, totHFEEAM = 0, totTUATP = 0, totTNET = 0, totTVAT = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI033(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TTRAN);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, filter.BDAIR);
            cstmt01.setString(5, filter.BDATE);
            cstmt01.setString(6, filter.BCMNUM);
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
                totTGROSS += rs01.getDouble("TGROSSBRT");
                totTISC += rs01.getDouble("TISCRT");
                totTTAX += rs01.getDouble("TTAXBRT");
                totHFEEAM += rs01.getDouble("HFEEAMRT");
                totTUATP += rs01.getDouble("TUATABRT");
                totTNET += rs01.getDouble("NETRT");
                totTVAT += rs01.getDouble("TOTHCRT");

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI033Filter();
                    objRtn.RN = rs01.getLong("RN");
                    objRtn.CPNNUM = rs01.getString("CPNNUM");
                    objRtn.TKTNUM = rs01.getString("TKTNUM");
                    objRtn.AIRNUM = rs01.getString("AIRNUM");
                    objRtn.TKT = objRtn.AIRNUM + " " + objRtn.TKTNUM + " " + objRtn.CPNNUM;
                    objRtn.FROMCPN = rs01.getString("FROMCPN");
                    objRtn.TOCPN = rs01.getString("TOCPN");
                    objRtn.ICURREN = rs01.getString("ICURREN");
                    objRtn.ATTINDOR = rs01.getString("ATTINDOR");
                    objRtn.FLIGHTN = rs01.getString("FLIGHTN");
                    objRtn.ETKTIND = rs01.getString("ETKTIND");
                    objRtn.BDAIR = filter.BDAIR;
                    if (rs01.getString("DES_FTE") != null) {
                        objRtn.DES_FTE = rs01.getString("DES_FTE");
                    } else {
                        objRtn.DES_FTE = "";
                    }

                    objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                    objRtn.DES_SOURCOD = Functions.getMonthConvert3(objRtn.FLIGHTD);
                    objRtn.ORIGPMI = rs01.getString("ORIGPMI");
                    objRtn.TGROSSB = (rs01.getDouble("TGROSSBRT"));
                    objRtn.TISC = (rs01.getDouble("TISCRT"));
                    objRtn.TTAXB = (rs01.getDouble("TTAXBRT"));
                    objRtn.HFEEAM = (rs01.getDouble("HFEEAMRT"));
                    objRtn.TUATP = (rs01.getDouble("TUATPRT"));
                    objRtn.NET = (rs01.getDouble("NETRT"));
                    objRtn.TOTHC = (rs01.getDouble("TOTHCRT"));
                    objRtn.TOTHAL = (rs01.getDouble("TOTHALRT"));
                    objRtn.TUATAB = (rs01.getDouble("TUATABRT"));
                    objRtn.TISCAL = (rs01.getDouble("TISCALRT"));
                    objRtn.totHFEEAM = totHFEEAM;
                    objRtn.totTGROSS = totTGROSS;
                    objRtn.totTISC = totTISC;
                    objRtn.totTNET = totTNET;
                    objRtn.totTTAX = totTTAX;
                    objRtn.totTUATP = totTUATP;
                    objRtn.totTVAT = totTVAT;
                    objRtn.FROMTO = objRtn.FROMCPN + "-" + objRtn.TOCPN;
                    objRtn.TTRAN = filter.TTRAN;
                    objRtn.PERNUM = filter.PERNUM;
                    objRtn.BDATE = filter.BDATE;
                    objRtn.BCMNUM = filter.BCMNUM;

                    objRtn.strFormatDate = Functions.getMonthConvert2(objRtn.BDATE);

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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

    public SFI031 loadPX185S01SFI031(SFI021Filter filter) throws SQLException, Exception {
        SFI031 objRtn = new SFI031();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX185S01SFI031(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt01.setString(2, filter.TTRAN.trim());
            cstmt01.setString(3, filter.REJNUM.trim());
            cstmt01.setString(4, filter.BDAIR.trim());
            cstmt01.setString(5, filter.BDATE.trim());
            cstmt01.setString(6, filter.PERNUM.trim());
            cstmt01.setString(7, filter.SOURCOD.trim());
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn.REMARK1 = rs01.getString("REMARK1").trim();
                objRtn.REMARK2 = rs01.getString("REMARK2").trim();
                objRtn.REMARK3 = rs01.getString("REMARK3").trim();
                objRtn.REMARK4 = rs01.getString("REMARK4").trim();
                objRtn.REMARK5 = rs01.getString("REMARK5").trim();
                objRtn.NUMRMK = rs01.getString("NUMRMK").trim();
                objRtn.RBCNUM = filter.REJNUM;

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
    
    // ------------------------------- SFI 22 ------------------------------------------------------
    public List<SFI022> loadPX538_register_22(SFI020Filter filter) throws SQLException, Exception {
        List<SFI022> lstRtn = new ArrayList<SFI022>(0);
        SFI022 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04003_2(?,?,?,?,?,?,?)}";

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
            cstmt01.setString(3, filter.PERNUM);

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

                objRtn = new SFI022();

//                objRtn.NAID = rs01.getLong("NAID");
//                objRtn.STCONS = rs01.getString("STCONS");
//                objRtn.SMI = rs01.getString("SMI");
//                objRtn.RSN = rs01.getString("RSN");
//                objRtn.SFI = rs01.getString("SFI");
//                objRtn.BDAIR = rs01.getString("BDAIR");
//                objRtn.BCODE = rs01.getInt("BCODE");
//                objRtn.BNUMBER = rs01.getString("BNUMBER");
//                objRtn.BATSEQ = rs01.getInt("BATSEQ");
//                objRtn.RECSEQ = rs01.getInt("RECSEQ");
//                objRtn.REASCOD = rs01.getString("REASCOD");
//                objRtn.OURREF = rs01.getString("OURREF");
//                objRtn.REFNUM = rs01.getString("REFNUM");
//                objRtn.FIMNUM = rs01.getString("FIMNUM");
//                objRtn.FIMCPNUM = rs01.getString("FIMCPNUM");
//                objRtn.YBNUMBER = rs01.getString("YBNUMBER");
//                objRtn.YBDATE = rs01.getString("YBDATE");
                
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                objRtn.BCMNUM = rs01.getString("BCMNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.TGROSS = rs01.getDouble("TGROSS");
                objRtn.TISC = rs01.getDouble("TISC");
                objRtn.TOHCOM = rs01.getDouble("TOHCOM");
                objRtn.TUATP = rs01.getDouble("TUATP");
                objRtn.TTAX = rs01.getDouble("TTAX");
                objRtn.HFEEAM = rs01.getDouble("HFEEAM");
                objRtn.TVAT = rs01.getDouble("TVAT");
                objRtn.NET = rs01.getDouble("NET");
                
                objRtn.TGROSSG = rs01.getString("TGROSSG");
                if(objRtn.TGROSSG.trim().equals("M")){
                    objRtn.TGROSS = objRtn.TGROSS * -1;
                }
                
                objRtn.TISCSG = rs01.getString("TISCSG");
                if(objRtn.TISCSG.trim().equals("M")){
                    objRtn.TISC = objRtn.TISC * -1;
                }
                
                objRtn.TOHCOMSG = rs01.getString("TOHCOMSG");
                if(objRtn.TOHCOMSG.trim().equals("M")){
                    objRtn.TOHCOM = objRtn.TOHCOM * -1;
                }
                
                objRtn.TUATPSG = rs01.getString("TUATPSG");
                if(objRtn.TUATPSG.trim().equals("M")){
                    objRtn.TUATP = objRtn.TUATP * -1;
                }
                
                objRtn.TTAXSG = rs01.getString("TTAXSG");
                if(objRtn.TTAXSG.trim().equals("M")){
                    objRtn.TTAX = objRtn.TTAX * -1;
                }
                
                objRtn.HFEEAMSG = rs01.getString("HFEEAMSG");
                if(objRtn.HFEEAMSG.trim().equals("M")){
                    objRtn.HFEEAM = objRtn.HFEEAM * -1;
                }
                
                objRtn.TVATSG = rs01.getString("TVATSG");
                if(objRtn.TVATSG.trim().equals("M")){
                    objRtn.TVAT = objRtn.TVAT * -1;
                }
                
                objRtn.NETSG = rs01.getString("NETSG");
                if(objRtn.NETSG.trim().equals("M")){
                    objRtn.NET = objRtn.NET * -1;
                }

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
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
    
    
    
    // ----------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------
    
    public List<SFI030> loadPX538_register_30(SFI030Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI030> lstRtn = new ArrayList<SFI030>(0);
        SFI030 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04281(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

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

                objRtn = new SFI030();

                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.NUMBILL = rs01.getInt("NUMBILL");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                
                objRtn.TGROSS = rs01.getDouble("TGROSS");
                objRtn.TISC = rs01.getDouble("TISC");
                objRtn.TTAX = rs01.getDouble("TTAX");
                objRtn.TVAT = rs01.getDouble("TVAT");
                objRtn.TOHCOM = rs01.getDouble("TOHCOM");
                objRtn.HFEEAM = rs01.getDouble("HFEEAM");
                objRtn.TUATP = rs01.getDouble("TUATP");
                objRtn.TNET = rs01.getDouble("TNET");
                
                objRtn.TGROSSG = rs01.getString("TGROSSG");
                if(objRtn.TGROSSG.trim().equals("M")){
                    objRtn.TGROSS = objRtn.TGROSS * -1;
                }
                
                objRtn.TISCSG = rs01.getString("TISCSG");
                if(objRtn.TISCSG.trim().equals("M")){
                    objRtn.TISC = objRtn.TISC * -1;
                }
                
                objRtn.TTAXSG = rs01.getString("TTAXSG");
                if(objRtn.TTAXSG.trim().equals("M")){
                    objRtn.TTAX = objRtn.TTAX * -1;
                }
                
                objRtn.TVATSG = rs01.getString("TVATSG");
                if(objRtn.TVATSG.trim().equals("M")){
                    objRtn.TVAT = objRtn.TVAT * -1;
                }
                
                objRtn.TOHCOMSG = rs01.getString("TOHCOMSG");
                if(objRtn.TOHCOMSG.trim().equals("M")){
                    objRtn.TOHCOM = objRtn.TOHCOM * -1;
                }
                
                objRtn.HFEEAMSG = rs01.getString("HFEEAMSG");
                if(objRtn.HFEEAMSG.trim().equals("M")){
                    objRtn.HFEEAM = objRtn.HFEEAM * -1;
                }
                
                objRtn.TUATPSG = rs01.getString("TUATPSG");
                if(objRtn.TUATPSG.trim().equals("M")){
                    objRtn.TUATP = objRtn.TUATP * -1;
                }
                
                objRtn.NETSG = rs01.getString("NETSG");
                if(objRtn.NETSG.trim().equals("M")){
                    objRtn.TNET = objRtn.TNET * -1;
                }
                

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
    
    public List<SFI010> loadPX538_register_10(SFI010Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI010> lstRtn = new ArrayList<SFI010>(0);
        SFI010 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03903_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

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

                objRtn = new SFI010();

                objRtn.SMI = rs01.getString("SMI");
                objRtn.RSN = rs01.getString("RSN");
                objRtn.SFI = rs01.getString("SFI");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.BATSEQ = rs01.getInt("BATSEQ");
                objRtn.RECSEQ = rs01.getInt("RECSEQ");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.LCURREN = rs01.getString("LCURREN");
                objRtn.BCURREN = rs01.getString("BCURREN");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.SETMETH = rs01.getString("SETMETH");
                objRtn.DSFLAG = rs01.getString("DSFLAG");
                objRtn.IDATE = rs01.getString("IDATE");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                objRtn.PBMONTH = rs01.getString("PBMONTH");
                objRtn.NILFORM = rs01.getString("NILFORM");
                objRtn.SINVFLAG = rs01.getString("SINVFLAG");
                objRtn.BAIRLOC1 = rs01.getString("BAIRLOC1");
                objRtn.BAIRLOC2 = rs01.getString("BAIRLOC2");
                objRtn.BTYPE = rs01.getString("BTYPE");

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
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

    public List<SFI020Filter> loadPX538_register20(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI020Filter> lstRtn = new ArrayList<SFI020Filter>(0);
        SFI020Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03899_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

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

                objRtn = new SFI020Filter();

                objRtn.TKTNUM = rs01.getString("TKTNUM");
                objRtn.GROSS = rs01.getDouble("GROSS");
                objRtn.TAX = rs01.getDouble("TAX");
                objRtn.SOURCOD = rs01.getString("SOURCOD");

                objRtn.FLIGHTN = rs01.getString("FLIGHTN");
                objRtn.FLIGHTD = rs01.getString("FLIGHTD");

                objRtn.FROMCPN = rs01.getString("FROMCPN");
                objRtn.TOCPN = rs01.getString("TOCPN");
                
                objRtn.HFEETYPE = rs01.getString("HFEETYPE");
                objRtn.HFEEAM = rs01.getDouble("HFEEAM");
                objRtn.VATAMT = rs01.getDouble("VATAMT");

                objRtn.ISCAMT = rs01.getDouble("ISCAMT");
                objRtn.OTHCOMAM = rs01.getDouble("OTHCOMAM");
                objRtn.CPNTAM = rs01.getDouble("CPNTAM");
                objRtn.PERNUM = rs01.getString("PERNUM");
                
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.BDATE = rs01.getString("BDATE");
                
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.UATPAMT = rs01.getDouble("UATPAMT");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.GROSSSG = rs01.getString("GROSSSG");
                if(objRtn.GROSSSG.trim().equals("M")){
                   objRtn.GROSS = objRtn.GROSS*-1;
                }
                
                objRtn.TAXSG = rs01.getString("TAXSG");
                if(objRtn.TAXSG.trim().equals("M")){
                   objRtn.TAX = objRtn.TAX*-1;
                }
                
                objRtn.HFEEAMSG = rs01.getString("HFEEAMSG");
                if(objRtn.HFEEAMSG.trim().equals("M")){
                   objRtn.HFEEAM = objRtn.HFEEAM*-1;
                }
                
                objRtn.VATAMTSG = rs01.getString("VATAMTSG");
                if(objRtn.VATAMTSG.trim().equals("M")){
                   objRtn.VATAMT = objRtn.VATAMT*-1;
                }
                
                objRtn.ISCAMTSG = rs01.getString("ISCAMTSG");
                if(objRtn.ISCAMTSG.trim().equals("M")){
                   objRtn.ISCAMT = rs01.getDouble("ISCAMT")*-1;
                }
                
                objRtn.OTHCOMASG = rs01.getString("OTHCOMASG");
                if(objRtn.OTHCOMASG.trim().equals("M")){
                   objRtn.OTHCOMAM = rs01.getDouble("OTHCOMAM")*-1;
                }
                
                objRtn.CPNTAMSG = rs01.getString("CPNTAMSG");
                if(objRtn.CPNTAMSG.trim().equals("M")){
                   objRtn.CPNTAM = rs01.getDouble("CPNTAM")*-1;
                }
                
                objRtn.UATPAMTSG = rs01.getString("UATPAMTSG");
                if(objRtn.UATPAMTSG.trim().equals("M")){
                   objRtn.UATPAMT = rs01.getDouble("UATPAMT")*-1;
                }

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
    
    // 21 22 23
    public List<SFI021> loadPX538_register_21(SFI021Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI021> lstRtn = new ArrayList<SFI021>(0);
        SFI021 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03904_M(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SFI021();
                
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                objRtn.REJNUM = rs01.getString("REJNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.TGROSSD = rs01.getDouble("TGROSSD");
                objRtn.TGROSSDSG = rs01.getString("TGROSSDSG");
                if(objRtn.TGROSSDSG.trim().equals("M")){
                    objRtn.TGROSSD = objRtn.TGROSSD * -1;
                }
                
                objRtn.TISCD = rs01.getDouble("TISCD");
                objRtn.TISCDSG = rs01.getString("TISCDSG");
                if(objRtn.TISCDSG.trim().equals("M")){
                    objRtn.TISCD = objRtn.TISCD * -1;
                }
                
                objRtn.TOTHCD = rs01.getDouble("TOTHCD");
                objRtn.TOTHCDSG = rs01.getString("TOTHCDSG");
                if(objRtn.TOTHCDSG.trim().equals("M")){
                    objRtn.TOTHCD = objRtn.TOTHCD * -1;
                }
                
                objRtn.TUATPD = rs01.getDouble("TUATPD");
                objRtn.TUATPDSG = rs01.getString("TUATPDSG");
                if(objRtn.TUATPDSG.trim().equals("M")){
                    objRtn.TUATPD = objRtn.TUATPD * -1;
                }
                
                objRtn.TTAXD = rs01.getDouble("TTAXD");
                objRtn.TTAXDSG = rs01.getString("TTAXDSG");
                if(objRtn.TTAXDSG.trim().equals("M")){
                    objRtn.TTAXD = objRtn.TTAXD * -1;
                }
                
                objRtn.THDFD = rs01.getDouble("THDFD");
                objRtn.THDFDSG = rs01.getString("THDFDSG");
                if(objRtn.THDFDSG.trim().equals("M")){
                    objRtn.THDFD = objRtn.THDFD * -1;
                }
                
                objRtn.TVATD = rs01.getDouble("TVATD");
                objRtn.TVATDSG = rs01.getString("TVATDSG");
                if(objRtn.TVATDSG.trim().equals("M")){
                    objRtn.TVATD = objRtn.TVATD * -1;
                }
                
                objRtn.TNETR = rs01.getDouble("TNETR");
                objRtn.TNETRSG = rs01.getString("TNETRSG");
                if(objRtn.TNETRSG.trim().equals("M")){
                    objRtn.TNETR = objRtn.TNETR * -1;
                }

                lstRtn.add(objRtn);

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            
            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new SFI021();

                    objRtn.BDATE = rs01.getString("BDATE");
                    objRtn.BDATE2 = rs01.getString("BDATE2");
                    objRtn.BAIR = rs01.getString("BAIR");
                    objRtn.BDAIR2 = rs01.getString("BDAIR2");
                    objRtn.BDAIR = rs01.getString("BDAIR");
                    objRtn.PERNUM = rs01.getString("PERNUM");
                    objRtn.SOURCOD = rs01.getString("SOURCOD");
                    objRtn.REJNUM = rs01.getString("BCMNUM");
                    objRtn.LBRATE = rs01.getDouble("LBRATE");

                    objRtn.TGROSSD = rs01.getDouble("TGROSS");
                    objRtn.TISCD = rs01.getDouble("TISC");
                    objRtn.TOTHCD = rs01.getDouble("TOHCOM");
                    objRtn.TUATPD = rs01.getDouble("TUATP");
                    objRtn.TTAXD = rs01.getDouble("TTAX");
                    objRtn.THDFD = rs01.getDouble("HFEEAM");
                    objRtn.TVATD = rs01.getDouble("TVAT");
                    objRtn.TNETR = rs01.getDouble("NET");

                    objRtn.TGROSSDSG = rs01.getString("TGROSSG");
                    if(objRtn.TGROSSDSG.trim().equals("M")){
                        objRtn.TGROSSD = objRtn.TGROSSD * -1;
                    }

                    objRtn.TISCDSG = rs01.getString("TISCSG");
                    if(objRtn.TISCDSG.trim().equals("M")){
                        objRtn.TISCD = objRtn.TISCD * -1;
                    }

                    objRtn.TOTHCDSG = rs01.getString("TOHCOMSG");
                    if(objRtn.TOTHCDSG.trim().equals("M")){
                        objRtn.TOTHCD = objRtn.TOTHCD * -1;
                    }

                    objRtn.TUATPDSG = rs01.getString("TUATPSG");
                    if(objRtn.TUATPDSG.trim().equals("M")){
                        objRtn.TUATPD = objRtn.TUATPD * -1;
                    }

                    objRtn.TTAXDSG = rs01.getString("TTAXSG");
                    if(objRtn.TTAXDSG.trim().equals("M")){
                        objRtn.TTAXD = objRtn.TTAXD * -1;
                    }

                    objRtn.THDFDSG = rs01.getString("HFEEAMSG");
                    if(objRtn.THDFDSG.trim().equals("M")){
                        objRtn.THDFD = objRtn.THDFD * -1;
                    }

                    objRtn.TVATDSG = rs01.getString("TVATSG");
                    if(objRtn.TVATDSG.trim().equals("M")){
                        objRtn.TVATD = objRtn.TVATD * -1;
                    }

                    objRtn.TNETRSG = rs01.getString("NETSG");
                    if(objRtn.TNETRSG.trim().equals("M")){
                        objRtn.TNETR = objRtn.TNETR * -1;
                    }

                    lstRtn.add(objRtn);
                }
                
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }

                if (cstmt01.getMoreResults()) {
                    rs01 = cstmt01.getResultSet();
                    while (rs01.next()) {
                        objRtn = new SFI021();

                        objRtn.BDATE = rs01.getString("BDATE");
                        objRtn.BDATE2 = rs01.getString("BDATE2");
                        objRtn.BAIR = rs01.getString("BAIR");
                        objRtn.BDAIR2 = rs01.getString("BDAIR2");
                        objRtn.BDAIR = rs01.getString("BDAIR");
                        objRtn.PERNUM = rs01.getString("PERNUM");
                        objRtn.SOURCOD = rs01.getString("SOURCOD");
                        objRtn.REJNUM = rs01.getString("BCMNUM");
                        objRtn.LBRATE = rs01.getDouble("LBRATE");

                        objRtn.TGROSSD = rs01.getDouble("TGROSS");
                        objRtn.TISCD = rs01.getDouble("TISC");
                        objRtn.TOTHCD = rs01.getDouble("TOHCOM");
                        objRtn.TUATPD = rs01.getDouble("TUATP");
                        objRtn.TTAXD = rs01.getDouble("TTAX");
                        objRtn.THDFD = rs01.getDouble("HFEEAM");
                        objRtn.TVATD = rs01.getDouble("TVAT");
                        objRtn.TNETR = rs01.getDouble("NET");

                        objRtn.TGROSSDSG = rs01.getString("TGROSSG");
                        if(objRtn.TGROSSDSG.trim().equals("M")){
                            objRtn.TGROSSD = objRtn.TGROSSD * -1;
                        }

                        objRtn.TISCDSG = rs01.getString("TISCSG");
                        if(objRtn.TISCDSG.trim().equals("M")){
                            objRtn.TISCD = objRtn.TISCD * -1;
                        }

                        objRtn.TOTHCDSG = rs01.getString("TOHCOMSG");
                        if(objRtn.TOTHCDSG.trim().equals("M")){
                            objRtn.TOTHCD = objRtn.TOTHCD * -1;
                        }

                        objRtn.TUATPDSG = rs01.getString("TUATPSG");
                        if(objRtn.TUATPDSG.trim().equals("M")){
                            objRtn.TUATPD = objRtn.TUATPD * -1;
                        }

                        objRtn.TTAXDSG = rs01.getString("TTAXSG");
                        if(objRtn.TTAXDSG.trim().equals("M")){
                            objRtn.TTAXD = objRtn.TTAXD * -1;
                        }

                        objRtn.THDFDSG = rs01.getString("HFEEAMSG");
                        if(objRtn.THDFDSG.trim().equals("M")){
                            objRtn.THDFD = objRtn.THDFD * -1;
                        }

                        objRtn.TVATDSG = rs01.getString("TVATSG");
                        if(objRtn.TVATDSG.trim().equals("M")){
                            objRtn.TVATD = objRtn.TVATD * -1;
                        }

                        objRtn.TNETRSG = rs01.getString("NETSG");
                        if(objRtn.TNETRSG.trim().equals("M")){
                            objRtn.TNETR = objRtn.TNETR * -1;
                        }

                        lstRtn.add(objRtn);
                    }
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
    
    public List<SFI031> loadPX538_register_31(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI031> lstRtn = new ArrayList<SFI031>(0);
        SFI031 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03905_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

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

                objRtn = new SFI031();

                objRtn.SMI = rs01.getString("SMI");
                objRtn.RSN = rs01.getInt("RSN");
                objRtn.SFI = rs01.getString("SFI");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.RBCNUM = rs01.getString("RBCNUM");
                objRtn.NUMRMK = rs01.getString("NUMRMK");
                objRtn.REMARK1 = rs01.getString("REMARK1");
                objRtn.REMARK2 = rs01.getString("REMARK2");
                objRtn.REMARK3 = rs01.getString("REMARK3");
                objRtn.REMARK4 = rs01.getString("REMARK4");
                objRtn.REMARK5 = rs01.getString("REMARK5");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.PERNUM = rs01.getString("PERNUM");

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
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
    
    // ------------------------------- SFI 32 ------------------------------------------------------
    public List<SFI032> loadPX538_register_32(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI032> lstRtn = new ArrayList<SFI032>(0);
        SFI032 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03906_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

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

                objRtn = new SFI032();

                objRtn.SMI = rs01.getString("SMI");
                objRtn.RSN = rs01.getInt("RSN");
                objRtn.SFI = rs01.getString("SFI");
                objRtn.BAIR = rs01.getString("BAIR");
                objRtn.BAIR2 = rs01.getString("BAIR2");
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                objRtn.BCODE = rs01.getInt("BCODE");
                objRtn.BNUMBER = rs01.getString("BNUMBER");
                objRtn.REJNUM = rs01.getString("REJNUM");
                objRtn.BKSNUM = rs01.getString("BKSNUM");
                objRtn.AIRNUM = rs01.getString("AIRNUM");
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.TKTNUM = rs01.getString("TKTNUM");
                objRtn.DCHEQ = rs01.getString("DCHEQ");
                objRtn.FROMCPN = rs01.getString("FROMCPN");
                objRtn.TOCPN = rs01.getString("TOCPN");
                objRtn.TGROSSB = rs01.getDouble("TGROSSB");
                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.PERNUM = rs01.getString("PERNUM");
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.GAD = rs01.getDouble("GAD");
                objRtn.IAD = rs01.getDouble("IAD");
                objRtn.TAD = rs01.getDouble("TAD");
                objRtn.OCDA = rs01.getDouble("OCDA");
                objRtn.HFAD = rs01.getDouble("HFAD");
                objRtn.UAD = rs01.getDouble("UAD");
                objRtn.NRA = rs01.getDouble("NRA");
                objRtn.SOURCOD = rs01.getString("SOURCOD");
                
                objRtn.TGROSSBSG = rs01.getString("TGROSSBSG");
                if(objRtn.TGROSSBSG.trim().equals("M")){
                    objRtn.TGROSSB = objRtn.TGROSSB * -1;
                }
                
                objRtn.TGROSSDSG = rs01.getString("TGROSSDSG");
                if(objRtn.TGROSSDSG.trim().equals("M")){
                    objRtn.GAD = objRtn.GAD * -1;
                }
                
                objRtn.TISCDSG = rs01.getString("TISCDSG");
                if(objRtn.TISCDSG.trim().equals("M")){
                    objRtn.IAD = objRtn.IAD * -1;
                }
                
                objRtn.TTAXDSG = rs01.getString("TTAXDSG");
                if(objRtn.TTAXDSG.trim().equals("M")){
                    objRtn.TAD = objRtn.TAD * -1;
                }
                
                objRtn.TOTHCDSG = rs01.getString("TOTHCDSG");
                if(objRtn.TOTHCDSG.trim().equals("M")){
                    objRtn.OCDA = objRtn.OCDA * -1;
                }
                
                objRtn.THDFDSG = rs01.getString("THDFDSG");
                if(objRtn.THDFDSG.trim().equals("M")){
                    objRtn.HFAD = objRtn.HFAD * -1;
                }
                
                objRtn.TUATPDSG = rs01.getString("TUATPDSG");
                if(objRtn.TUATPDSG.trim().equals("M")){
                    objRtn.UAD = objRtn.UAD * -1;
                }
                
                objRtn.TNETRSG = rs01.getString("TNETRSG");
                if(objRtn.TNETRSG.trim().equals("M")){
                    objRtn.NRA = objRtn.NRA * -1;
                }

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
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
    
    // ------------------------------- SFI 41 ------------------------------------------------------
    public List<SFI041> loadPX538_register_41(SFI020Filter filter, String flagMonth) throws SQLException, Exception {
        List<SFI041> lstRtn = new ArrayList<SFI041>(0);
        SFI041 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03900_M(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.BDATE);
            cstmt01.setString(3, filter.PERNUM);
            cstmt01.setString(4, flagMonth);

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

                objRtn = new SFI041();

                objRtn.TKTNUM = rs01.getString("TKTNUM");
                objRtn.TKTNUM2 = rs01.getString("TKTNUM2");
                objRtn.TAXCODE1 = rs01.getString("TAXCODE1");
                objRtn.TAXBILED1 = rs01.getDouble("TAXBILED1");
                objRtn.CPNNUM = rs01.getString("CPNNUM");
                objRtn.CPNNUM2 = rs01.getString("CPNNUM2");
                
                objRtn.FLIGHTD = rs01.getString("FLIGHTD");
                objRtn.FROMCPN = rs01.getString("FROMCPN");
                objRtn.TOCPN = rs01.getString("TOCPN");

                objRtn.BDATE = rs01.getString("BDATE");
                objRtn.BDATE2 = rs01.getString("BDATE2");
                objRtn.PERNUM = rs01.getString("PERNUM");
                
                objRtn.BDAIR = rs01.getString("BDAIR");
                objRtn.BDAIR2 = rs01.getString("BDAIR2");
                
                objRtn.CODE_YQ = rs01.getString("CODE_YQ");
                objRtn.CODE_YR = rs01.getString("CODE_YR");
                objRtn.AMOUNT_YQ = rs01.getDouble("AMOUNT_YQ");
                objRtn.AMOUNT_YR = rs01.getDouble("AMOUNT_YR");
                
                objRtn.LBRATE = rs01.getDouble("LBRATE");
                
                objRtn.SIGN_TAX = rs01.getString("SIGN_TAX");
                if(objRtn.SIGN_TAX.trim().equals("M")){
                    objRtn.TAXBILED1 = objRtn.TAXBILED1 * -1;
                }
                
                objRtn.SIGN_YQ = rs01.getString("SIGN_YQ");
                if(objRtn.SIGN_YQ.trim().equals("M")){
                    objRtn.AMOUNT_YQ = objRtn.AMOUNT_YQ * -1;
                }
                
                objRtn.SIGN_YR = rs01.getString("SIGN_YR");
                if(objRtn.SIGN_YR.trim().equals("M")){
                    objRtn.AMOUNT_YR = objRtn.AMOUNT_YR * -1;
                }
                

//                objRtn.page.PAGNUM = filter.page.PAGNUM;
//                objRtn.page.PAGROW = filter.page.PAGROW;
//                objRtn.page.TOTPAG = filter.page.TOTPAG;
//                objRtn.page.TOTROW = filter.page.TOTROW;
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
