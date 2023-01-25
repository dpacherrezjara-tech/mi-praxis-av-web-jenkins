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
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP02299Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.SQP02255Filter;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class SpainInvoiceFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public SpainInvoiceFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SpainInvoiceFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP02255Filter> search(SQP02255Filter filter) throws SQLException, Exception {
        List<SQP02255Filter> lstRtn = new ArrayList<SQP02255Filter>(0);
        SQP02255Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02255(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FROM);
            cstmt01.setString(3, filter.VP_TO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP02255Filter();
                objRtn.FECHA_EXPEDICION = rs01.getString("FECHA_EXPEDICION").trim();
                objRtn.NOMBRE_PASAJERO = rs01.getString("NOMBRE_PASAJERO").trim();
                objRtn.NUMERO_BOLETO = rs01.getString("NUMERO_BOLETO").trim();
                objRtn.FUENTE = rs01.getString("FUENTE").trim();
                objRtn.TRX = rs01.getString("TRX").trim();
                objRtn.TDOC = rs01.getString("TDOC").trim();
                objRtn.MONEDA = rs01.getString("MONEDA").trim();
                objRtn.PAIS_VENTA = rs01.getString("PAIS_VENTA").trim();
                objRtn.IATA = rs01.getString("IATA").trim();
                objRtn.NOMBRE_AGENCIA = rs01.getString("NOMBRE_AGENCIA").trim();
                objRtn.FORMA_PAGO1 = rs01.getString("FORMA_PAGO1").trim();
                objRtn.FORMA_PAGO2 = rs01.getString("FORMA_PAGO2").trim();
                objRtn.FORMA_PAGO3 = rs01.getString("FORMA_PAGO3").trim();
                objRtn.FORMA_PAGO4 = rs01.getString("FORMA_PAGO4").trim();
                objRtn.DESCRIPCION = rs01.getString("DESCRIPCION").trim();
                objRtn.TARIFA = rs01.getDouble("TARIFA");
                objRtn.FEE = rs01.getDouble("FEE");
                objRtn.IMPORTE_TOTAL = rs01.getDouble("IMPORTE_TOTAL");
                objRtn.CODIGO_IMPUESTO1 = rs01.getString("CODIGO_IMPUESTO1").trim();
                objRtn.IMPORTE1 = rs01.getDouble("IMPORTE1");
                objRtn.CODIGO_IMPUESTO2 = rs01.getString("CODIGO_IMPUESTO2").trim();
                objRtn.IMPORTE2 = rs01.getDouble("IMPORTE2");
                objRtn.CODIGO_IMPUESTO3 = rs01.getString("CODIGO_IMPUESTO3").trim();
                objRtn.IMPORTE3 = rs01.getDouble("IMPORTE3");
                objRtn.CODIGO_IMPUESTO4 = rs01.getString("CODIGO_IMPUESTO4").trim();
                objRtn.IMPORTE4 = rs01.getDouble("IMPORTE4");
                objRtn.CODIGO_IMPUESTO5 = rs01.getString("CODIGO_IMPUESTO5").trim();
                objRtn.IMPORTE5 = rs01.getDouble("IMPORTE5");
                objRtn.CODIGO_IMPUESTO6 = rs01.getString("CODIGO_IMPUESTO6").trim();
                objRtn.IMPORTE6 = rs01.getDouble("IMPORTE6");
                objRtn.CODIGO_IMPUESTO7 = rs01.getString("CODIGO_IMPUESTO7").trim();
                objRtn.IMPORTE7 = rs01.getDouble("IMPORTE7");
                objRtn.CODIGO_IMPUESTO8 = rs01.getString("CODIGO_IMPUESTO8").trim();
                objRtn.IMPORTE8 = rs01.getDouble("IMPORTE8");
                objRtn.CODIGO_IMPUESTO9 = rs01.getString("CODIGO_IMPUESTO9").trim();
                objRtn.IMPORTE9 = rs01.getDouble("IMPORTE9");
                objRtn.CODIGO_IMPUESTO10 = rs01.getString("CODIGO_IMPUESTO10").trim();
                objRtn.IMPORTE10 = rs01.getDouble("IMPORTE10");

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public List<SQP02299Filter> searchMaster(SQP02299Filter filter) throws SQLException, Exception {
        List<SQP02299Filter> lstRtn = new ArrayList<SQP02299Filter>(0);
        SQP02299Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02299(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_CUENTA);
            cstmt01.setString(3, filter.VP_SUBCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP02299Filter();
                objRtn.CUENTA = rs01.getString("CUENTA").trim();
                objRtn.RECORD = rs01.getString("RECORD").trim();
                objRtn.IVA = rs01.getString("IVA").trim();
                objRtn.TCTA = rs01.getString("TCTA").trim();
                objRtn.OAL = rs01.getString("OAL").trim();
                objRtn.FACT = rs01.getString("FACT").trim();
                objRtn.DRFIC = rs01.getString("DRFIC").trim();
                objRtn.NVTA = rs01.getString("NVTA").trim();
                objRtn.INDAGRUP = rs01.getString("INDAGRUP").trim();
                objRtn.DESCAGRUP = rs01.getString("DESCAGRUP").trim();
                objRtn.DESCU = rs01.getString("DESCU").trim();
                objRtn.CUENT = rs01.getString("CUENT").trim();
                objRtn.SUBCU = rs01.getString("SUBCU").trim();

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public List<SQP02299Filter> searchMasterFG(SQP02299Filter filter) throws SQLException, Exception {
        List<SQP02299Filter> lstRtn = new ArrayList<SQP02299Filter>(0);
        SQP02299Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02299(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_CUENTA);
            cstmt01.setString(3, filter.VP_SUBCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP02299Filter();
                objRtn.INDAGRUP = rs01.getString("A3335ID").trim();
                objRtn.DESCAGRUP = rs01.getString("A3335AGRUP").trim();

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public SQP02299Filter setMasterInvoice(SQP02299Filter filter) throws SQLException, Exception {
        SQP02299Filter lstRtn = new SQP02299Filter();
        SQP02299Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02306(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.CUENT);
            cstmt01.setString(3, filter.SUBCU);
            cstmt01.setString(4, filter.RECORD);
            cstmt01.setString(5, filter.IVA);
            cstmt01.setString(6, filter.TCTA);
            cstmt01.setString(7, filter.OAL);
            cstmt01.setString(8, filter.FACT);
            cstmt01.setString(9, filter.DRFIC);
            cstmt01.setString(10, filter.NVTA);
            cstmt01.setString(11, filter.INDAGRUP);
            cstmt01.setString(12, filter.DESCAGRUP);
            cstmt01.setString(13, filter.DESCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP02299Filter();
                objRtn.CUENTA = rs01.getString("RESULTADO").trim();
            }
            rs01.close();
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

    public SQP02299Filter setMasterInvoiceFG(SQP02299Filter filter) throws SQLException, Exception {
        SQP02299Filter lstRtn = new SQP02299Filter();
        SQP02299Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02406(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.DESCU);
            cstmt01.setString(3, filter.DESCAGRUP);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP02299Filter();
                objRtn.CUENTA = rs01.getString("RESULTADO").trim();
            }
            rs01.close();
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
