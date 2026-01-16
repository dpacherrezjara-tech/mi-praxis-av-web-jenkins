package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.payment.MPF060Filter;
import net.miatech.praxis.payment.MPF060;
import net.miatech.praxis.payment.MPF083;
import net.miatech.praxis.payment.MPF083Filter;
import net.miatech.praxis.payment.MPF091;
import net.miatech.praxis.payment.MPF091Filter;
import net.miatech.praxis.payment.MPF100C;
import net.miatech.praxis.payment.MPF100Filter;
import net.miatech.praxis.payment.MPF102;
import net.miatech.praxis.payment.MPF102Filter;
import net.miatech.praxis.payment.dto.ConciliationTemplate;
import static net.miatech.praxis.utils.CommonUtils.trimOrEmpty;
import org.apache.log4j.Logger;

public class TemplateReconciliaCreditDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public TemplateReconciliaCreditDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public TemplateReconciliaCreditDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

//    BANDOC
    public List<MPF102> loadMPS111(MPF102Filter filter) throws SQLException, Exception {

        List<MPF102> lstTkts = new ArrayList<MPF102>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        MPF102 record = null;
        double TOTAL_NETO = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS111(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_BANDOC);
            cstmt.setString(5, filter.IN_CODPRO);

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

            if (rst.next()) {
                TOTAL_NETO = rst.getDouble("SUM_NETO");
            }

            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {

                    record = new MPF102();
                    record.RN = rst.getLong("RN");
                    record.CCUST = rst.getString("CCUST");
                    record.BANDOC = rst.getString("BANDOC");
                    record.DATECI = rst.getString("DATECI");
                    record.TRANCI = rst.getString("TRANCI");
                    record.VALDATE = rst.getString("VALDATE");
                    record.ADATE = rst.getString("ADATE");
                    record.NETO = rst.getDouble("NETO");
                    record.ACCOUNT = rst.getString("ACCOUNT");
                    record.SOCIETY = rst.getString("SOCIETY");
                    record.CODEBANK_EC = rst.getString("CODEBANK");
                    record.SCURRENCY = rst.getString("SCURRENCY");
                    record.STVAL = rst.getString("STVAL");
                    record.SCOUNTRY = rst.getString("SCOUNTRY");
                    record.USUP = rst.getString("USUP");
                    record.checkActive = true;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_NETO = TOTAL_NETO;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

    public List<MPF060> loadMPS113(MPF060Filter filter) throws SQLException, Exception {

        List<MPF060> lstTkts = new ArrayList<>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;

        double TOTAL_LIQ = 0;
        double TOTAL_COMISION = 0;
        double TOTAL_COMISTOTA = 0;
        double TOTAL_NETO = 0;
        double TOTAL_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS113(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.IN_FECHA_TO);
            cstmt.setString(4, filter.IN_PROCESSOR);
            cstmt.setString(5, filter.IN_MERCHAND);
            cstmt.setString(6, filter.IN_LIQUIDACIO);

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

            if (rst != null && rst.next()) {
                TOTAL_LIQ = rst.getDouble("SUM_TOTAL");
                TOTAL_COMISION = rst.getDouble("SUM_COMISION");
                TOTAL_COMISTOTA = rst.getDouble("SUM_COMISTOTA");
                TOTAL_NETO = rst.getDouble("SUM_NETO");
                TOTAL_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2 != null && rst2.next()) {
                    MPF060 r = new MPF060();

                    r.RN = rst2.getLong("RN");
                    r.SDATE = rst2.getString("SDATE");
                    r.CCUST = rst2.getString("CCUST");
                    r.SCOUNTRY = rst2.getString("SCOUNTRY");
                    r.TDOC = rst2.getString("TDOC");
                    r.CODEBANK = rst2.getString("CODEBANK");
                    r.SCARCOD = rst2.getString("SCARCOD");
                    r.SCARDN = rst2.getString("SCARDN");
                    r.SAUTHOC = rst2.getString("SAUTHOC");
                    r.SEQ = rst2.getString("SEQ");
                    r.SVFOP = rst2.getDouble("SVFOP");
                    r.TOTAL = rst2.getDouble("TOTAL");
                    r.NETO = rst2.getDouble("NETO");
                    r.CODPRO = rst2.getString("CODPRO");
                    r.CCUSTPRO = rst2.getString("CCUSTPRO");
                    r.PRDA = rst2.getString("PRDA");
                    r.ADATE = rst2.getString("ADATE");
                    r.MERCHAND = rst2.getString("MERCHAND");
                    r.MONEDAPAGO = rst2.getString("MONEDAPAGO");

                    r.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    r.SCURRENCY = rst2.getString("SCURRENCY");
                    r.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");
                    r.COMISION = rst2.getDouble("COMISION");
                    r.COMISTOTA = rst2.getDouble("COMISTOTA");
                    r.STVAL = rst2.getString("STVAL");

                    r.page.PAGNUM = filter.page.PAGNUM;
                    r.page.PAGROW = filter.page.PAGROW;
                    r.page.TOTPAG = filter.page.TOTPAG;
                    r.page.TOTROW = filter.page.TOTROW;

                    r.TOTAL_LIQ = TOTAL_LIQ;
                    r.TOTAL_COMISION = TOTAL_COMISION;
                    r.TOTAL_COMISTOTA = TOTAL_COMISTOTA;
                    r.TOTAL_NETO = TOTAL_NETO;
                    r.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;

                    lstTkts.add(r);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (Exception ignored) {
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (Exception ignored) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (Exception ignored) {
            }

            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public List<MPF091> loadMPS112(MPF091Filter filter) throws SQLException, Exception {

        List<MPF091> lstTkts = new ArrayList<>();
        List<MPF091> thirdList = new ArrayList<>();
        List<MPF091> combinedList = new ArrayList<>();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        ResultSet rst3 = null;
        MPF091 record = null;

        double TOTAL_IMPORTE = 0;
        double TOTAL_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS112(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_CODPRO);
            cstmt.setString(5, filter.merchandIn);
            cstmt.setString(6, filter.liquidationIn);
            cstmt.setString(7, filter.IN_MERCHAND);
            cstmt.setString(8, filter.IN_LIQUIDACIO);

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
            if (rst.next()) {
                TOTAL_IMPORTE = rst.getDouble("SUM_IMPORTE");
                TOTAL_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new MPF091();
                    record.RN = rst2.getLong("RN");
                    record.CCUST = rst2.getString("CCUST");
                    record.CODPRO = rst2.getString("CODPRO");
                    record.FLIQUIDACI = rst2.getString("FLIQUIDACI");
                    record.MONEDA = rst2.getString("MONEDA");
                    record.CCUSTPRO = rst2.getString("CCUSTPRO");
                    record.PRDA = rst2.getString("PRDA");
                    record.ADATE = rst2.getString("ADATE");
                    record.CODIGO = rst2.getString("CODIGO");
                    record.CORRL = rst2.getString("CORRL");
                    record.MERCHAND = rst2.getString("MERCHAND");
                    record.MONEDAPAGO = rst2.getString("MONEDAPAGO");
                    record.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    record.IMPORTECeba = rst2.getDouble("IMPORTE");
                    record.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");
                    record.checkActive = false;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_IMPORTE = TOTAL_IMPORTE;
                    record.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;

                    lstTkts.add(record);
                }
            }

            // Tercera lista
            if (cstmt.getMoreResults()) {
                rst3 = cstmt.getResultSet();
                while (rst3.next()) {
                    MPF091 thirdRecord = new MPF091();
                    thirdRecord.RN = rst3.getLong("RN");
                    thirdRecord.CCUST = rst3.getString("CCUST");
                    thirdRecord.CODPRO = rst3.getString("CODPRO");
                    thirdRecord.FLIQUIDACI = rst3.getString("FLIQUIDACI");
                    thirdRecord.MONEDA = rst3.getString("MONEDA");
                    thirdRecord.CCUSTPRO = rst3.getString("CCUSTPRO");
                    thirdRecord.PRDA = rst3.getString("PRDA");
                    thirdRecord.ADATE = rst3.getString("ADATE");
                    thirdRecord.MERCHAND = rst3.getString("MERCHAND");
                    thirdRecord.MONEDAPAGO = rst3.getString("MONEDAPAGO");
                    thirdRecord.LIQUIDACIO = rst3.getString("LIQUIDACIO");
                    thirdRecord.IMPORTECeba = rst3.getDouble("IMPORTE");
                    thirdRecord.IMPORTEPAG = rst3.getDouble("IMPORTEPAG");
                    thirdRecord.checkActive = false;

                    thirdRecord.TOTAL_IMPORTE = TOTAL_IMPORTE;
                    thirdRecord.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;
                    thirdList.add(thirdRecord);
                }
            }

            // Crear claves únicas del tercer resultset
            Set<String> thirdKeySet = new HashSet<>();
            for (MPF091 f : thirdList) {
                String key = f.CODPRO.trim() + "|" + f.MERCHAND.trim() + "|" + f.LIQUIDACIO.trim() + "|" + f.CCUST.trim() + f.PRDA.trim()
                        + f.CCUSTPRO.trim() + f.FLIQUIDACI.trim() + f.MONEDA.trim();
                thirdKeySet.add(key);
            }

            // Crear lista combinada sin asignar RN aún
            for (MPF091 item : lstTkts) {
                String key = item.CODPRO.trim() + "|" + item.MERCHAND.trim() + "|" + item.LIQUIDACIO.trim() + "|" + item.CCUST.trim() + item.PRDA.trim()
                        + item.CCUSTPRO.trim() + item.FLIQUIDACI.trim() + item.MONEDA.trim();
                boolean existsInThird = thirdKeySet.contains(key);
                item.checkActive = existsInThird;
                item.blockChange = existsInThird;
                combinedList.add(item);
            }

            // Ordenar: primero los checkActive = true
            combinedList.sort((a, b) -> Boolean.compare(!a.checkActive, !b.checkActive));

            // Reasignar RN y calcular totales solo para los activos
            TOTAL_IMPORTE = 0;
            TOTAL_IMPORTEPAG = 0;
            int countRn = 1;
            for (MPF091 item : combinedList) {
                item.RN = countRn++;
                if (item.checkActive) {
                    TOTAL_IMPORTE += item.IMPORTECeba;
                    TOTAL_IMPORTEPAG += item.IMPORTEPAG;
                }
            }

            if (!combinedList.isEmpty()) {
                combinedList.get(0).TOTAL_IMPORTE = TOTAL_IMPORTE;
                combinedList.get(0).TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst3 != null) try {
                rst3.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return combinedList;
    }

    public List<MPF100C> loadMPS107(MPF100Filter filter) throws SQLException, Exception {

        List<MPF100C> lstTkts = new ArrayList<MPF100C>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        MPF100C record = null;
        double TOTAL_SVFOP = 0;
        double TOTAL_SVFOP_CONVERTED = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS107(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_SAGENT);
            cstmt.setString(5, filter.IN_PROCESSOR);
            cstmt.setString(6, filter.IN_COUNTRY);

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

            if (rst.next()) {
                TOTAL_SVFOP = rst.getDouble("SUM_SVFOP");
                TOTAL_SVFOP_CONVERTED = rst.getDouble("SUM_SVFOP");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    record = new MPF100C();
                    record.RN = rst.getLong("RN");
                    record.CCUST = rst.getString("CCUST");
                    record.DATEC = rst.getString("DATEC");
                    record.TRANC = rst.getString("TRANC");
                    record.CCIA = rst.getString("CCIA");
                    record.FORMA = rst.getString("FORMA");
                    record.SERIE = rst.getString("SERIE");
                    record.TDOC = rst.getString("TDOC");
                    record.SCARDNCOR = rst.getString("SCARDNCOR");
                    record.SAUTHOC = rst.getString("SAUTHOC");
                    record.SEQ = rst.getString("SEQ");
                    record.CORRL = rst.getString("CORRL");
                    record.TKT = rst.getString("TKT");
                    record.SAGENT = rst.getString("SAGENT");
                    record.SVFOP = rst.getDouble("SVFOP");
                    record.TOTAL = rst.getDouble("TOTAL");
                    record.SVFOPCON = rst.getDouble("SVFOPCON");
                    record.SCURREVENCONVERT = rst.getString("SCURREVENCONVERT");
                    record.SDATE = rst.getString("SDATE");

                    record.SCOUNTRY = rst.getString("SCOUNTRY");
                    record.SAUTHOC = rst.getString("SAUTHOC");
                    record.SCARDN = rst.getString("SCARDN");
                    record.SCURREVEN = rst.getString("SCURREVEN");
                    record.checkActive = false;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_SVFOP = 0;
                    record.TOTAL_SVFOP_CONVERTED = 0;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

    public List<MPF091> loadMPS484(MPF091Filter filter) throws SQLException, Exception {

        List<MPF091> lstTkts = new ArrayList<>();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        MPF091 record = null;

        double TOTAL_IMPORTE = 0;
        double TOTAL_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS484(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_PROCESSOR);
            cstmt.setString(3, filter.IN_DATECI);
            cstmt.setString(4, filter.IN_TRANCI);
            cstmt.setString(5, filter.IN_MERCHAND);
            cstmt.setString(6, filter.IN_LIQUIDACIO);

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
            if (rst.next()) {
                TOTAL_IMPORTE = rst.getDouble("SUM_IMPORTE");
                TOTAL_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new MPF091();
                    record.RN = rst2.getLong("RN");
                    record.CCUST = rst2.getString("CCUST");
                    record.CODPRO = rst2.getString("CODPRO");
                    record.FLIQUIDACI = rst2.getString("FLIQUIDACI");
                    record.MONEDA = rst2.getString("MONEDA");
                    record.CCUSTPRO = rst2.getString("CCUSTPRO");
                    record.PRDA = rst2.getString("PRDA");
                    record.CORRL = rst2.getString("CORRL");
                    record.CODIGO = rst2.getString("CODIGO");
                    record.ADATE = rst2.getString("ADATE");
                    record.MERCHAND = rst2.getString("MERCHAND");
                    record.MONEDAPAGO = rst2.getString("MONEDAPAGO");
                    record.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    record.IMPORTECeba = rst2.getDouble("IMPORTE");
                    record.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");

                    record.USCR = rst2.getString("USCR");
                    record.FECR = rst2.getString("FECR");
                    record.HOCR = rst2.getString("HOCR");
                    record.USUP = rst2.getString("USUP");
                    record.FEUP = rst2.getString("FEUP");
                    record.HOUP = rst2.getString("HOUP");

                    record.checkActive = false;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_IMPORTE = TOTAL_IMPORTE;
                    record.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public List<MPF083> loadMPS485(MPF083Filter filter) throws SQLException, Exception {

        List<MPF083> lstTkts = new ArrayList<>();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        MPF083 record = null;

        double SUM_TOTAL = 0;
        double SUM_COMISION = 0;
        double SUM_NETO = 0;
        double SUM_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS485(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_PROCESSOR);
            cstmt.setString(3, filter.IN_DATEFROM);
            cstmt.setString(4, filter.IN_DATETO);

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
            if (rst.next()) {
                SUM_TOTAL = rst.getDouble("SUM_TOTAL");
                SUM_COMISION = rst.getDouble("SUM_COMISION");
                SUM_NETO = rst.getDouble("SUM_NETO");
                SUM_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new MPF083();
                    record.RN = rst2.getLong("RN");
                    record.CCUST = rst2.getString("CCUST");
                    record.PRDA = rst2.getString("PRDA");
                    record.CODPRO = rst2.getString("CODPRO");
                    record.CCUSTPRO = rst2.getString("CCUSTPRO");
                    record.FLIQUIDACI = rst2.getString("FLIQUIDACI");
                    record.MERCHAND = rst2.getString("MERCHAND");
                    record.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    record.MONEDA = rst2.getString("MONEDA");
                    record.MONEDAPAGO = rst2.getString("MONEDAPAGO");
                    record.MONEDALIQ = rst2.getString("MONEDALIQ");
                    record.PAISLIQ = rst2.getString("PAISLIQ");
                    record.SDATE = rst2.getString("SDATE");

                    record.TOTAL = rst2.getDouble("TOTAL");
                    record.COMISION = rst2.getDouble("COMISION");
                    record.NETO = rst2.getDouble("NETO");
                    record.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");
                    record.checkActive = false;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.SUM_TOTAL = SUM_TOTAL;
                    record.SUM_COMISION = SUM_COMISION;
                    record.SUM_NETO = SUM_NETO;
                    record.SUM_IMPORTEPAG = SUM_IMPORTEPAG;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public String loadMPS100(List<ConciliationTemplate> lstLIQ) throws SQLException, Exception {

        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL " + session.getMainLibrary() + "MP.MPS100(?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < lstLIQ.size(); i++) {

                ConciliationTemplate obj = lstLIQ.get(i);
                cstmt.registerOutParameter(5, Types.VARCHAR);

                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, session.getUserView().getCustomerInfo().USR);
                cstmt.setString(3, obj.liq.trim());
                cstmt.setString(4, obj.ec.trim());
                cstmt.setString(5, "");

                cstmt.execute();

                strMsj = strMsj + "**" + cstmt.getString(5);

            }

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

        return strMsj;
    }

    public String loadMPS106(List<ConciliationTemplate> lstLIQ) throws SQLException, Exception {

        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL PRAXISMP.MPS106(?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < lstLIQ.size(); i++) {

                ConciliationTemplate obj = lstLIQ.get(i);

                cstmt.registerOutParameter(6, Types.VARCHAR);

                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, obj.processR.trim());
                cstmt.setString(3, session.getUserView().getCustomerInfo().USR);
                cstmt.setString(4, obj.liq.trim());
                cstmt.setString(5, obj.ec.trim());
                cstmt.setString(6, "");

                cstmt.execute();

                strMsj = strMsj + "**" + cstmt.getString(6);

            }

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

        return strMsj;
    }

    public String loadMPS486(List<MPF102> lstBandoc, MPF102Filter filter) throws SQLException, Exception {

        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL PRAXISMP.MPS486(?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < lstBandoc.size(); i++) {

                MPF102 obj = lstBandoc.get(i);

                cstmt.registerOutParameter(11, Types.VARCHAR);

                cstmt.setString(1, obj.CCUST);
                cstmt.setString(2, obj.ADATE);
                cstmt.setString(3, obj.SOCIETY);
                cstmt.setString(4, obj.CODEBANK);
                cstmt.setString(5, obj.BANDOC);
                cstmt.setString(6, obj.TFILE);
                cstmt.setString(7, obj.CODUNI);
                cstmt.setString(8, session.getUserView().getCustomerInfo().USR);
                cstmt.setString(9, filter.IN_FECR);
                cstmt.setString(10, filter.IN_HOCR);

                cstmt.execute();

                strMsj = strMsj + "**" + cstmt.getString(11);

            }

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

        return strMsj;
    }

    public String loadMPS487(List<MPF060> lstSettlements, MPF102Filter filter) throws SQLException, Exception {

        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL PRAXISMP.MPS487(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < lstSettlements.size(); i++) {

                MPF060 obj = lstSettlements.get(i);

                cstmt.registerOutParameter(16, Types.VARCHAR);

                cstmt.setString(1, obj.CCUST);
                cstmt.setString(2, obj.SDATE);
                cstmt.setString(3, obj.SCOUNTRY);
                cstmt.setString(4, obj.TDOC);
                cstmt.setString(5, obj.CODEBANK);
                cstmt.setString(6, obj.SCARCOD);
                cstmt.setString(7, obj.SCARDN);
                cstmt.setString(8, obj.SAUTHOC);
                cstmt.setString(9, obj.SEQ);
                cstmt.setDouble(10, obj.SVFOP);
                cstmt.setString(11, obj.TFILE);
                cstmt.setString(12, obj.CODUNI);
                cstmt.setString(13, session.getUserView().getCustomerInfo().USR);
                cstmt.setString(14, filter.IN_FECR);
                cstmt.setString(15, filter.IN_HOCR);

                cstmt.execute();

                strMsj = strMsj + "**" + cstmt.getString(16);

            }

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

        return strMsj;
    }

    public String loadMPS488(List<MPF091> lstDiscount, MPF102Filter filter) throws SQLException, Exception {

        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL PRAXISMP.MPS488(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < lstDiscount.size(); i++) {

                MPF091 obj = lstDiscount.get(i);

                cstmt.registerOutParameter(16, Types.VARCHAR);

                cstmt.setString(1, obj.CCUST);
                cstmt.setString(2, obj.PRDA);
                cstmt.setString(3, obj.CODPRO);
                cstmt.setString(4, obj.CCUSTPRO);
                cstmt.setString(5, obj.FLIQUIDACI);
                cstmt.setString(6, obj.LIQUIDACIO);
                cstmt.setString(7, obj.MERCHAND);
                cstmt.setString(8, obj.MONEDA);
                cstmt.setString(9, obj.CODIGO);
                cstmt.setString(10, obj.CORRL);
                cstmt.setString(11, obj.TFILE);
                cstmt.setString(12, obj.CODUNI);
                cstmt.setString(13, session.getUserView().getCustomerInfo().USR);
                cstmt.setString(14, filter.IN_FECR);
                cstmt.setString(15, filter.IN_HOCR);

                cstmt.execute();

                strMsj = strMsj + "**" + cstmt.getString(16);

            }

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

        return strMsj;
    }

    public String loadMPS489(List<MPF083> lstHeader, MPF102Filter filter) throws SQLException, Exception {

        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL PRAXISMP.MPS489(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            for (int i = 0; i < lstHeader.size(); i++) {

                MPF083 obj = lstHeader.get(i);

                cstmt.registerOutParameter(17, Types.VARCHAR);

                cstmt.setString(1, obj.MONEDALIQ);
                cstmt.setString(2, obj.PAISLIQ);
                cstmt.setString(3, obj.SDATE);
                cstmt.setString(4, obj.TFILE);
                cstmt.setString(5, obj.CODUNI);
                cstmt.setString(6, session.getUserView().getCustomerInfo().USR);
                cstmt.setString(7, filter.IN_FECR);
                cstmt.setString(8, filter.IN_HOCR);
                cstmt.setString(9, obj.CCUST);
                cstmt.setString(10, obj.PRDA);
                cstmt.setString(11, obj.CODPRO);
                cstmt.setString(12, obj.CCUSTPRO);
                cstmt.setString(13, obj.FLIQUIDACI);
                cstmt.setString(14, obj.LIQUIDACIO);
                cstmt.setString(15, obj.MERCHAND);
                cstmt.setString(16, obj.MONEDA);

                cstmt.execute();

                strMsj = strMsj + "**" + cstmt.getString(17);

            }

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

        return strMsj;
    }

    public String loadMPS109(MPF102Filter filter) throws SQLException, Exception {

        String strMsj = "Execute...";
        CallableStatement cstmt = null;
        Connection cnx = null;

        try {

            String SQLCLL02 = "{CALL PRAXISMP.MPS109(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL02);

            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_CODPRO);
            cstmt.setString(3, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(4, filter.IN_FECR);
            cstmt.setString(5, filter.IN_HOCR);
            cstmt.setString(6, filter.IN_CODUNI);
            cstmt.setString(7, "");

            cstmt.execute();

            strMsj = strMsj + "**" + cstmt.getString(7);

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

        return strMsj;
    }

//    REVIEW BANDOC
    public List<MPF102> loadMPS419(MPF102Filter filter) throws SQLException, Exception {

        List<MPF102> lstTkts = new ArrayList<>(0);
        CallableStatement cstmt = null;
        ResultSet rst = null;
        double TOTAL_NETO = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS419(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_DATEFROM);
            cstmt.setString(3, filter.IN_DATETO);
            cstmt.setString(4, filter.IN_BANDOC);
            cstmt.setString(5, filter.IN_CODPRO);

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
                MPF102 record = new MPF102();
                record.CCUST = rst.getString("CCUST");
                record.BANDOC = rst.getString("BANDOC");
                record.DATECI = rst.getString("DATECI");
                record.TRANCI = rst.getString("TRANCI");
                record.VALDATE = rst.getString("VALDATE");
                record.ADATE = rst.getString("ADATE");
                record.NETO = rst.getDouble("NETO");
                record.ACCOUNT = rst.getString("ACCOUNT");
                record.SOCIETY = rst.getString("SOCIETY");
                record.CODEBANK_EC = rst.getString("CODEBANK");
                record.SCURRENCY = rst.getString("SCURRENCY");
                record.STVAL = rst.getString("STVAL");
                record.SCOUNTRY = rst.getString("SCOUNTRY");
                record.USUP = rst.getString("USUP");
                record.checkActive = false;

                record.page.PAGNUM = filter.page.PAGNUM;
                record.page.PAGROW = filter.page.PAGROW;
                record.page.TOTPAG = filter.page.TOTPAG;
                record.page.TOTROW = filter.page.TOTROW;

                record.TOTAL_NETO = TOTAL_NETO;

                lstTkts.add(record);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException ignore) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ignore) {
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public List<MPF060> loadMPS480(MPF060Filter filter) throws SQLException, Exception {

        List<MPF060> lstTkts = new ArrayList<>(0);

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;

        double TOTAL_LIQ = 0;
        double TOTAL_COMISION = 0;
        double TOTAL_COMISTOTA = 0;
        double TOTAL_NETO = 0;
        double TOTAL_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS480(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_BANDOC);
            cstmt.setString(3, filter.IN_PROCESSOR);
            cstmt.setString(4, filter.IN_DATECI);
            cstmt.setString(5, filter.IN_TRANCI);

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

            if (rst != null && rst.next()) {
                TOTAL_LIQ = rst.getDouble("SUM_TOTAL");
                TOTAL_COMISION = rst.getDouble("SUM_COMISION");
                TOTAL_COMISTOTA = rst.getDouble("SUM_COMISTOTA");
                TOTAL_NETO = rst.getDouble("SUM_NETO");
                TOTAL_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2 != null && rst2.next()) {
                    MPF060 r = new MPF060();

                    r.RN = rst2.getLong("RN");
                    r.SDATE = rst2.getString("SDATE");
                    r.SCOUNTRY = rst2.getString("SCOUNTRY");
                    r.TDOC = rst2.getString("TDOC");
                    r.CODEBANK = rst2.getString("CODEBANK");
                    r.SCARCOD = rst2.getString("SCARCOD");
                    r.SCARDN = rst2.getString("SCARDN");
                    r.SAUTHOC = rst2.getString("SAUTHOC");
                    r.SEQ = rst2.getString("SEQ");
                    r.SVFOP = rst2.getDouble("SVFOP");
                    r.TOTAL = rst2.getDouble("TOTAL");
                    r.NETO = rst2.getDouble("NETO");
                    r.CODPRO = rst2.getString("CODPRO");
                    r.CCUSTPRO = rst2.getString("CCUSTPRO");
                    r.PRDA = rst2.getString("PRDA");
                    r.ADATE = rst2.getString("ADATE");
                    r.MERCHAND = rst2.getString("MERCHAND");

                    r.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    r.SCURRENCY = rst2.getString("SCURRENCY");
                    r.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");
                    r.COMISION = rst2.getDouble("COMISION");
                    r.COMISTOTA = rst2.getDouble("COMISTOTA");
                    r.STVAL = rst2.getString("STVAL");

                    r.page.PAGNUM = filter.page.PAGNUM;
                    r.page.PAGROW = filter.page.PAGROW;
                    r.page.TOTPAG = filter.page.TOTPAG;
                    r.page.TOTROW = filter.page.TOTROW;

                    r.TOTAL_LIQ = TOTAL_LIQ;
                    r.TOTAL_COMISION = TOTAL_COMISION;
                    r.TOTAL_COMISTOTA = TOTAL_COMISTOTA;
                    r.TOTAL_NETO = TOTAL_NETO;
                    r.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;

                    lstTkts.add(r);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (Exception ignored) {
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (Exception ignored) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (Exception ignored) {
            }

            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public List<MPF091> loadMPS481(MPF091Filter filter) throws SQLException, Exception {

        List<MPF091> lstTkts = new ArrayList<>();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        MPF091 record = null;

        double TOTAL_IMPORTE = 0;
        double TOTAL_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS481(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_BANDOC);
            cstmt.setString(3, filter.IN_PROCESSOR);
            cstmt.setString(4, filter.IN_DATECI);
            cstmt.setString(5, filter.IN_TRANCI);

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
            if (rst.next()) {
                TOTAL_IMPORTE = rst.getDouble("SUM_IMPORTE");
                TOTAL_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new MPF091();
                    record.RN = rst2.getLong("RN");
                    record.CCUST = rst2.getString("CCUST");
                    record.CODPRO = rst2.getString("CODPRO");
                    record.FLIQUIDACI = rst2.getString("FLIQUIDACI");
                    record.MONEDA = rst2.getString("MONEDA");
                    record.CCUSTPRO = rst2.getString("CCUSTPRO");
                    record.PRDA = rst2.getString("PRDA");
                    record.CORRL = rst2.getString("CORRL");
                    record.CODIGO = rst2.getString("CODIGO");
                    record.ADATE = rst2.getString("ADATE");
                    record.MERCHAND = rst2.getString("MERCHAND");
                    record.MONEDAPAGO = rst2.getString("MONEDAPAGO");
                    record.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    record.IMPORTECeba = rst2.getDouble("IMPORTE");
                    record.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");

                    record.USCR = rst2.getString("USCR");
                    record.FECR = rst2.getString("FECR");
                    record.HOCR = rst2.getString("HOCR");
                    record.USUP = rst2.getString("USUP");
                    record.FEUP = rst2.getString("FEUP");
                    record.HOUP = rst2.getString("HOUP");

                    record.checkActive = true;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_IMPORTE = TOTAL_IMPORTE;
                    record.TOTAL_IMPORTEPAG = TOTAL_IMPORTEPAG;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public List<MPF083> loadMPS482(MPF083Filter filter) throws SQLException, Exception {

        List<MPF083> lstTkts = new ArrayList<>();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        MPF083 record = null;

        double SUM_TOTAL = 0;
        double SUM_COMISION = 0;
        double SUM_NETO = 0;
        double SUM_IMPORTEPAG = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS482(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_BANDOC);
            cstmt.setString(3, filter.IN_PROCESSOR);
            cstmt.setString(4, filter.IN_DATECI);
            cstmt.setString(5, filter.IN_TRANCI);

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
            if (rst.next()) {
                SUM_TOTAL = rst.getDouble("SUM_TOTAL");
                SUM_COMISION = rst.getDouble("SUM_COMISION");
                SUM_NETO = rst.getDouble("SUM_NETO");
                SUM_IMPORTEPAG = rst.getDouble("SUM_IMPORTEPAG");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new MPF083();
                    record.RN = rst2.getLong("RN");
                    record.FLIQUIDACI = rst2.getString("FLIQUIDACI");
                    record.MERCHAND = rst2.getString("MERCHAND");
                    record.LIQUIDACIO = rst2.getString("LIQUIDACIO");
                    record.MONEDA = rst2.getString("MONEDA");
                    record.MONEDAPAGO = rst2.getString("MONEDAPAGO");

                    record.TOTAL = rst2.getDouble("TOTAL");
                    record.COMISION = rst2.getDouble("COMISION");
                    record.NETO = rst2.getDouble("NETO");
                    record.IMPORTEPAG = rst2.getDouble("IMPORTEPAG");
                    record.checkActive = true;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.SUM_TOTAL = SUM_TOTAL;
                    record.SUM_COMISION = SUM_COMISION;
                    record.SUM_NETO = SUM_NETO;
                    record.SUM_IMPORTEPAG = SUM_IMPORTEPAG;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public List<MPF100C> loadMPS483(MPF100Filter filter) throws SQLException, Exception {

        List<MPF100C> lstTkts = new ArrayList<>();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        MPF100C record = null;

        double TOTAL_SVFOP = 0;
        double TOTAL_SVFOP_CONVERTED = 0;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS483(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, filter.IN_CCUST);
            cstmt.setString(2, filter.IN_BANDOC);
            cstmt.setString(3, filter.IN_PROCESSOR);
            cstmt.setString(4, filter.IN_DATECI);
            cstmt.setString(5, filter.IN_TRANCI);

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
            if (rst.next()) {
                TOTAL_SVFOP = rst.getDouble("SUM_SVFOP");
                TOTAL_SVFOP_CONVERTED = rst.getDouble("SUM_SVFOPCON");
            }

            // Segunda lista
            if (cstmt.getMoreResults()) {
                rst2 = cstmt.getResultSet();
                while (rst2.next()) {
                    record = new MPF100C();
                    record.RN = rst2.getLong("RN");
                    record.CCUST = rst2.getString("CCUST");
                    record.DATEC = rst2.getString("DATEC");
                    record.TRANC = rst2.getString("TRANC");
                    record.CCIA = rst2.getString("CCIA");
                    record.FORMA = rst2.getString("FORMA");
                    record.SERIE = rst2.getString("SERIE");
                    record.TDOC = rst2.getString("TDOC");
                    record.SCARDNCOR = rst2.getString("SCARDNCOR");
                    record.SAUTHOC = rst2.getString("SAUTHOC");
                    record.SEQ = rst2.getString("SEQ");
                    record.CORRL = rst2.getString("CORRL");
                    record.TKT = rst2.getString("TKT");
                    record.SAGENT = rst2.getString("SAGENT");
                    record.SVFOP = rst2.getDouble("SVFOP");
                    record.TOTAL = rst2.getDouble("TOTAL");
                    record.SVFOPCON = rst2.getDouble("SVFOPCON");
                    record.SCURREVENCONVERT = rst2.getString("SCURREVENCONVERT");
                    record.SDATE = rst2.getString("SDATE");

                    record.SCOUNTRY = rst2.getString("SCOUNTRY");
                    record.SAUTHOC = rst2.getString("SAUTHOC");
                    record.SCARDN = rst2.getString("SCARDN");
                    record.SCURREVEN = rst2.getString("SCURREVEN");
                    record.checkActive = true;

                    record.page.PAGNUM = filter.page.PAGNUM;
                    record.page.PAGROW = filter.page.PAGROW;
                    record.page.TOTPAG = filter.page.TOTPAG;
                    record.page.TOTROW = filter.page.TOTROW;

                    record.TOTAL_SVFOP = TOTAL_SVFOP;
                    record.TOTAL_SVFOP_CONVERTED = TOTAL_SVFOP_CONVERTED;

                    lstTkts.add(record);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (rst2 != null) try {
                rst2.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstTkts;
    }

    public String loadMPS420(MPF091Filter bean) throws SQLException, Exception {

        CallableStatement cstmt = null;
        Connection cnx = null;
        String outMensaje = "";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS420(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1, trimOrEmpty(bean.IN_CCUST));
            cstmt.setString(2, trimOrEmpty(bean.IN_PRDA));
            cstmt.setString(3, trimOrEmpty(bean.IN_CODPRO));
            cstmt.setString(4, trimOrEmpty(bean.IN_CCUSTPRO));
            cstmt.setString(5, trimOrEmpty(bean.IN_FLIQUIDACI));
            cstmt.setString(6, trimOrEmpty(bean.IN_LIQUIDACIO));
            cstmt.setString(7, trimOrEmpty(bean.IN_MERCHAND));
            cstmt.setString(8, trimOrEmpty(bean.IN_MONEDA));
            cstmt.setString(9, trimOrEmpty(bean.IN_CORRL));
            cstmt.setString(10, trimOrEmpty(bean.IN_CODIGO));
            cstmt.setDouble(11, bean.IN_IMPORTE);
            cstmt.setDouble(12, bean.IN_IMPORTEPAGO);

            cstmt.registerOutParameter(13, java.sql.Types.VARCHAR);

            cstmt.execute();

            outMensaje = cstmt.getString(13);

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        } finally {
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException e) {
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return outMensaje;
    }

    public String loadMPS426(MPF091Filter bean) throws SQLException, Exception {

        CallableStatement cstmt = null;
        Connection cnx = null;
        String outMensaje = "";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            String SQL = "{CALL " + session.getMainLibrary() + "MP.MPS426(?,?,?,?,?)}";
            cstmt = cnx.prepareCall(SQL);

            cstmt.setString(1, bean.IN_CCUST);
            cstmt.setString(2, bean.IN_BANDOC);
            cstmt.setString(3, bean.IN_DATECI);
            cstmt.setString(4, bean.IN_TRANCI);

            cstmt.registerOutParameter(5, java.sql.Types.VARCHAR);

            cstmt.execute();

            outMensaje = cstmt.getString(5);

        } catch (Exception e) {
            e.printStackTrace();
            throw new SpringException(e);
        } finally {
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ex) {
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return outMensaje;
    }

}
