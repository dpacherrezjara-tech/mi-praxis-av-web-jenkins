/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A4076Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A4077;
import net.miatech.praxis.SaleAudit.A4078;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class MassiveRefunduatpFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public MassiveRefunduatpFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public MassiveRefunduatpFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4076Filter> search(A4076Filter filter) throws SQLException, Exception {
        List<A4076Filter> lstRtn = new ArrayList<A4076Filter>(0);
        A4076Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP04180(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_TICKET);
            cstmt01.setString(6, filter.IN_COUNTRY);
            cstmt01.setString(7, filter.IN_IATA);
            cstmt01.setString(8, filter.IN_STATUSBPO);
            cstmt01.setString(9, filter.IN_STATUS);
            cstmt01.setString(10, filter.IN_USER);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4076Filter();

                objRtn.RN = rs01.getLong("RN");
                objRtn.A4076CCUST = rs01.getString("A4076CCUST");
                objRtn.A4076PREME = rs01.getString("LOTE");

                objRtn.CANTOK = rs01.getInt("CANTOK");
                objRtn.CANTKO = rs01.getInt("CANTKO");
                objRtn.TOTALCANT = rs01.getInt("CANTKO") + rs01.getInt("CANTOK");
                objRtn.CANTPEN = rs01.getInt("CANTPEN");
                objRtn.SUMAOK = rs01.getDouble("SUMAOK");
                objRtn.SUMAKO = rs01.getDouble("SUMAKO");
                objRtn.TOTALSUMA = rs01.getDouble("SUMAOK") + rs01.getDouble("SUMAKO");

                objRtn.BPOOK = rs01.getInt("BPOOK");
                objRtn.BPOKO = rs01.getInt("BPOKO");
                objRtn.TOTALBPO = rs01.getInt("BPOOK") + rs01.getInt("BPOKO");

                objRtn.A4076BASE = rs01.getString("A4076BASE");
                objRtn.A4076TYPE = rs01.getString("A4076TYPE");
                objRtn.A4076FREGI = rs01.getString("A4076FREGI");
                objRtn.A4076REGIS = rs01.getString("A4076REGIS");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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

    public String subirExcel(ArrayList<A4076Filter> filter) throws SQLException, ClassNotFoundException, Exception {

        String mensaje = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP04177(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        //SQP01904
        Connection cnx = null;
        ResultSet rst = null;
        String valida = "Y";
        int Cant = 0;
        String PREME = "";
        session.getCNXIBMDB2().open();
        //cnx = session.getCNXIBMDB2().getIBMDB2Connection();

        try {
            //cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A4076Filter obj : filter) {
                //INSERTAR DATOS A LA TABLA
                cstmt01.registerOutParameter(86, Types.VARCHAR);
                cstmt01.registerOutParameter(87, Types.VARCHAR);
                cstmt01.registerOutParameter(88, Types.VARCHAR);

                cstmt01.setString(1, obj.A4076CCUST);
                cstmt01.setString(2, obj.A4076TYPE);
                cstmt01.setString(3, obj.A4076TICKET);
                cstmt01.setString(4, obj.A4076REFE);
                cstmt01.setString(5, obj.A4076AGEN);
                cstmt01.setString(6, obj.A4076MDA);
                cstmt01.setString(7, obj.A4076TRNCO);
                cstmt01.setString(8, obj.A4076TDOC);
                cstmt01.setString(9, obj.A4076FVTA);
                cstmt01.setString(10, obj.A4076CPN);
                cstmt01.setString(11, obj.A4076FP1);
                cstmt01.setString(12, obj.A4076TCARD1);
                cstmt01.setString(13, obj.A4076CARD1);
                cstmt01.setDouble(14, obj.A4076MONTCARD1);
                cstmt01.setString(15, obj.A4076FP2);
                cstmt01.setString(16, obj.A4076TCARD2);
                cstmt01.setString(17, obj.A4076CARD2);
                cstmt01.setDouble(18, obj.A4076MONTCARD2);
                cstmt01.setString(19, obj.A4076MONTT);
                cstmt01.setDouble(20, obj.A4076TARTK);
                cstmt01.setString(21, obj.A4076MONET);
                cstmt01.setDouble(22, obj.A4076EQVTK);
                cstmt01.setString(23, obj.A4076TAX1);
                cstmt01.setString(24, obj.A4076ATO1);
                cstmt01.setDouble(25, obj.A4076MONTAX1);
                cstmt01.setString(26, obj.A4076TAX2);
                cstmt01.setString(27, obj.A4076ATO2);
                cstmt01.setDouble(28, obj.A4076MONTAX2);
                cstmt01.setString(29, obj.A4076TAX3);
                cstmt01.setString(30, obj.A4076ATO3);
                cstmt01.setDouble(31, obj.A4076MONTAX3);
                cstmt01.setString(32, obj.A4076TAX4);
                cstmt01.setString(33, obj.A4076ATO4);
                cstmt01.setDouble(34, obj.A4076MONTAX4);
                cstmt01.setString(35, obj.A4076TAX5);
                cstmt01.setString(36, obj.A4076ATO5);
                cstmt01.setDouble(37, obj.A4076MONTAX5);
                cstmt01.setString(38, obj.A4076TAX6);
                cstmt01.setString(39, obj.A4076ATO6);
                cstmt01.setDouble(40, obj.A4076MONTAX6);
                cstmt01.setString(41, obj.A4076TAX7);
                cstmt01.setString(42, obj.A4076ATO7);
                cstmt01.setDouble(43, obj.A4076MONTAX7);
                cstmt01.setString(44, obj.A4076TAX8);
                cstmt01.setString(45, obj.A4076ATO8);
                cstmt01.setDouble(46, obj.A4076MONTAX8);
                cstmt01.setString(47, obj.A4076TAX9);
                cstmt01.setString(48, obj.A4076ATO9);
                cstmt01.setDouble(49, obj.A4076MONTAX9);
                cstmt01.setString(50, obj.A4076TAX10);
                cstmt01.setString(51, obj.A4076ATO10);
                cstmt01.setDouble(52, obj.A4076MONTAX10);
                cstmt01.setString(53, obj.A4076TAX11);
                cstmt01.setString(54, obj.A4076ATO11);
                cstmt01.setDouble(55, obj.A4076MONTAX11);
                cstmt01.setString(56, obj.A4076TAX12);
                cstmt01.setString(57, obj.A4076ATO12);
                cstmt01.setDouble(58, obj.A4076MONTAX12);
                cstmt01.setString(59, obj.A4076TAX13);
                cstmt01.setString(60, obj.A4076ATO13);
                cstmt01.setDouble(61, obj.A4076MONTAX13);
                cstmt01.setString(62, obj.A4076TAX14);
                cstmt01.setString(63, obj.A4076ATO14);
                cstmt01.setDouble(64, obj.A4076MONTAX14);
                cstmt01.setString(65, obj.A4076TAX15);
                cstmt01.setString(66, obj.A4076ATO15);
                cstmt01.setDouble(67, obj.A4076MONTAX15);
                cstmt01.setString(68, obj.A4076TAX16);
                cstmt01.setString(69, obj.A4076ATO16);
                cstmt01.setDouble(70, obj.A4076MONTAX16);
                cstmt01.setString(71, obj.A4076TAX17);
                cstmt01.setString(72, obj.A4076ATO17);
                cstmt01.setDouble(73, obj.A4076MONTAX17);

                cstmt01.setString(74, obj.A4076TAX18);
                cstmt01.setString(75, obj.A4076ATO18);
                cstmt01.setDouble(76, obj.A4076MONTAX18);
                cstmt01.setDouble(77, obj.A4076NETO);
                cstmt01.setDouble(78, obj.A4076TCMBC);
                cstmt01.setDouble(79, obj.A4076COMI);
                cstmt01.setDouble(80, obj.A4076TCMBT);
                cstmt01.setDouble(81, obj.A4076TAXCO);
                cstmt01.setString(82, obj.A4076BASE);

                cstmt01.setInt(83, Cant);
                cstmt01.setString(84, valida);
                cstmt01.setString(85, PREME);

                cstmt01.execute();
                Cant++;
                valida = "N";
                obj.dbException.SQLCODE = cstmt01.getString(86);
                obj.dbException.MESSAGE = cstmt01.getString(87);
                PREME = cstmt01.getString(88);
                mensaje = obj.dbException.MESSAGE;

                if (!obj.dbException.SQLCODE.equals("0")) {
                    mensaje = obj.dbException.MESSAGE;
                    break;
                }
            }
            cstmt01.close();

        } catch (SQLException e) {
            if (cnx != null) {
                cnx.rollback();
            }
            mensaje = "ERROR DE INSERCION";
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            mensaje = "ERROR DE INSERCION";
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }

        return mensaje;

    }

    public A4076Filter SearchUATPRFNDetail(A4076Filter filter) throws SQLException, Exception {
        A4076Filter lstGeneral = null;
        List<A4077> lst_CardType = new ArrayList<A4077>(0);
        List<A4078> lst_TAXES = new ArrayList<A4078>(0);

        A4076Filter objRtnGeneral = null;
        A4078 objlst_TAXES = null;
        A4077 objlst_CardType = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP04191(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_CORR);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///LISTA FOP
            while (rs01.next()) {
                objlst_CardType = new A4077();
                objlst_CardType.A4077CCUST = rs01.getString("A4077CCUST");
                objlst_CardType.A4077PREME = rs01.getString("A4077PREME");
                objlst_CardType.A4077ANIO = rs01.getString("A4077ANIO");
                objlst_CardType.A4077CORRL = rs01.getString("A4077CORRL");
                objlst_CardType.A4077SEQ = rs01.getString("A4077SEQ");
                objlst_CardType.A4077CFOP = rs01.getString("A4077CFOP");
                objlst_CardType.A4077TYCAR = rs01.getString("A4077TYCAR");
                objlst_CardType.A4077CUR = rs01.getString("A4077CUR");
                objlst_CardType.A4077NTARJ = rs01.getString("A4077NTARJ");
                objlst_CardType.A4077FEXP = rs01.getString("A4077FEXP");
                objlst_CardType.A4077CAPL = rs01.getString("A4077CAPL");
                objlst_CardType.A4077MONTO = rs01.getDouble("A4077MONTO");
                objlst_CardType.A4077MONTE = rs01.getDouble("A4077MONTE");
                objlst_CardType.A4077TOTAL = rs01.getDouble("A4077TOTAL");
                objlst_CardType.A4077FLAG = rs01.getString("A4077FLAG");
                lst_CardType.add(objlst_CardType);
            }
            ////LIST TAXES
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_TAXES = new A4078();
                    objlst_TAXES.A4078CCUST = rs02.getString("A4078CCUST");
                    objlst_TAXES.A4078PREME = rs02.getString("A4078PREME");
                    objlst_TAXES.A4078ANIO = rs02.getString("A4078ANIO");
                    objlst_TAXES.A4078CORRL = rs02.getString("A4078CORRL");
                    objlst_TAXES.A4078SEQ = rs02.getString("A4078SEQ");
                    objlst_TAXES.A4078CDTAX = rs02.getString("A4078CDTAX");
                    objlst_TAXES.A4078CDATO = rs02.getString("A4078CDATO");
                    objlst_TAXES.A4078MONED = rs02.getString("A4078MONED");
                    objlst_TAXES.A4078TXMIA = rs02.getDouble("A4078TXMIA");
                    objlst_TAXES.A4078MORIG = rs02.getString("A4078MORIG");
                    objlst_TAXES.A4078TXORI = rs02.getDouble("A4078TXORI");
                    objlst_TAXES.A4078TXDIF = rs02.getDouble("A4078TXDIF");
                    objlst_TAXES.A4078TXDAF = rs02.getDouble("A4078TXDAF");
                    objlst_TAXES.A4078STAT = rs02.getString("A4078STAT");
                    objlst_TAXES.A4078SBSTA = rs02.getString("A4078SBSTA");
                    lst_TAXES.add(objlst_TAXES);

                }
            }
            // FIN DE LA AGENCIA
            objRtnGeneral = new A4076Filter();
            objRtnGeneral.lst_TAXES = lst_TAXES;
            objRtnGeneral.lst_CardType = lst_CardType;

            lstGeneral = objRtnGeneral;
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
        return lstGeneral;

    }

    public String ProcesaMantenimiento(ArrayList<A4076Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP04192(?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A4076Filter obj : filter) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_OPTION", obj.IN_OPTION);
                cs.setString("IN_PREME", obj.A4076PREME);
                cs.setString("IN_ANIO", obj.A4076ANIO);
                cs.setString("IN_CORR", obj.A4076CORR);
                cs.setString("IN_BASE", obj.A4076BASE);
                cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FREGI", Functions.getFechaActual());
                cs.setString("IN_HREGI", Functions.getHoraActual());

                cs.execute();
            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public List<A4076Filter> searchDetail(A4076Filter filter) throws SQLException, Exception {
        List<A4076Filter> lstRtn = new ArrayList<A4076Filter>(0);
        A4076Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP04193(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_USER);
            cstmt01.setString(5, filter.IN_TICKET);
            cstmt01.setString(6, filter.IN_IATA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4076Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.A4076CCUST = rs01.getString("A4076CCUST");
                objRtn.A4076PREME = rs01.getString("A4076PREME");
                objRtn.A4076ANIO = rs01.getString("A4076ANIO");
                objRtn.A4076CORR = rs01.getString("A4076CORR");
                objRtn.A4076BASE = rs01.getString("A4076BASE");
                objRtn.A4076TYPE = rs01.getString("A4076TYPE");
                objRtn.A4076CIA = rs01.getString("A4076CIA");
                objRtn.A4076FORMA = rs01.getString("A4076FORMA");
                objRtn.A4076SERIE = rs01.getString("A4076SERIE");
                objRtn.A4076SEQ = rs01.getString("A4076SEQ");
                objRtn.A4076TICKET = rs01.getString("A4076CIA") + "" + rs01.getString("A4076FORMA") + "" + rs01.getString("A4076SERIE") + "" + rs01.getString("A4076SEQ");
                objRtn.A4076FVTA = rs01.getString("A4076FVTA");
                objRtn.A4076IATA = rs01.getString("A4076IATA");
                objRtn.A4076TRNCO = rs01.getString("A4076TRNCO");
                objRtn.A4076TDOC = rs01.getString("A4076TDOC");
                objRtn.A4076CPN = rs01.getString("A4076CPN");
                objRtn.A4076PAIS = rs01.getString("A4076PAIS");
                objRtn.A4076MDA = rs01.getString("A4076MDA");
                objRtn.A4076TARTK = rs01.getDouble("A4076TARTK");
                objRtn.A4076MONTT = rs01.getString("A4076MONTT");
                objRtn.A4076EQVTK = rs01.getDouble("A4076EQVTK");
                objRtn.A4076MONET = rs01.getString("A4076MONET");
                objRtn.A4076NETO = rs01.getDouble("A4076NETO");
                objRtn.A4076TCMBC = rs01.getDouble("A4076TCMBC");
                objRtn.A4076COMI = rs01.getDouble("A4076COMI");
                objRtn.A4076TCMBT = rs01.getDouble("A4076TCMBT");
                objRtn.A4076TAXCO = rs01.getDouble("A4076TAXCO");
                objRtn.A4076REFE = rs01.getString("A4076REFE");
                objRtn.A4076STAT = rs01.getString("A4076STAT");
                objRtn.A4076FLAG = rs01.getString("A4076FLAG");
                objRtn.A4076REGIS = rs01.getString("A4076REGIS");
                objRtn.A4076FREGI = rs01.getString("A4076FREGI");
                objRtn.A4076HREGI = rs01.getString("A4076HREGI");
                objRtn.A4076REVIS = rs01.getString("A4076REVIS");
                objRtn.A4076FREVI = rs01.getString("A4076FREVI");
                objRtn.A4076HREVI = rs01.getString("A4076HREVI");
                objRtn.A4076TARIFA = rs01.getDouble("A4076TARIFA");
                objRtn.A4076TTAX = rs01.getDouble("A4076TTAX");
                objRtn.A4076AGENCY = rs01.getString("AGENCY");
                objRtn.A4076ESTADO = rs01.getString("A4076ESTADO");
                objRtn.A4076AGEN = rs01.getString("A4076AGEN");
                objRtn.A4076TRNCU = rs01.getString("A4076TRNCU");
                objRtn.A4076GRUPO = rs01.getString("A4076GRUPO");

                objRtn.A4076CPN1 = rs01.getString("A4076CPN1");
                objRtn.A4076CPN2 = rs01.getString("A4076CPN2");
                objRtn.A4076CPN3 = rs01.getString("A4076CPN3");
                objRtn.A4076CPN4 = rs01.getString("A4076CPN4");
                objRtn.A4076USO = rs01.getString("A4076USO");
                objRtn.A4076USO1 = rs01.getString("A4076USO1");
                objRtn.A4076USO2 = rs01.getString("A4076USO2");
                objRtn.A4076USO3 = rs01.getString("A4076USO3");
                objRtn.A4076USO4 = rs01.getString("A4076USO4");
                objRtn.A4076DESC = rs01.getString("A4076DESC");
                objRtn.A4076NETK = rs01.getDouble("A4076NETK");

                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

    public String ProcesaManualUATP(A4076Filter filter, String lstaTaxes, String lstafop) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        DecimalFormat df = new DecimalFormat("#.00");

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP04194(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP02515
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PREME", filter.A4076PREME);
            cs.setString("IN_ANIO", filter.A4076ANIO);
            cs.setString("IN_CORRL", filter.A4076CORR);
            cs.setString("IN_TICKET", filter.IN_TICKET);
            cs.setString("IN_REFE", filter.A4076REFE);
            cs.setString("IN_FVTA", filter.A4076FVTA);
            cs.setString("IN_TDOC", filter.A4076TDOC);
            cs.setString("IN_MDA", filter.A4076MDA);
            cs.setDouble("IN_TARTK", filter.A4076TARTK);
            cs.setString("IN_MONTT", filter.A4076MONTT);
            cs.setDouble("IN_EQVTK", filter.A4076EQVTK);
            cs.setDouble("IN_TTAX", filter.A4076TTAX);
            cs.setDouble("IN_NETO", filter.A4076NETO);
            cs.setDouble("IN_COMI", filter.A4076COMI);
            cs.setDouble("IN_TAXCO", filter.A4076TAXCO);
            //cs.setDouble("IN_NETK", filter.A4076NETK);
            cs.setString("IN_STATUS", filter.IN_STATUS);
            cs.setString("IN_DESC", filter.A4076DESC);
            cs.setString("IN_LSTATaxes", lstaTaxes);
            cs.setString("IN_LSTAfop", lstafop);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String ProcesaDelete(A4076Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP04241(?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_OPTION", filter.IN_OPTION);
            cs.setString("IN_PREME", filter.IN_PREME);
            cs.setString("IN_ANIO", filter.IN_ANIO);
            cs.setString("IN_CORRL", filter.IN_CORR);
            cs.setString("IN_SEQ", filter.IN_SEQ);

            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public List<A4076Filter> SearchDetailError(A4076Filter filter) throws SQLException, Exception {
        List<A4076Filter> lstRtn = new ArrayList<A4076Filter>(0);
        A4076Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP04244(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_CORR);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4076Filter();

                objRtn.A4076CCUST = rs01.getString("A4128CCUST");
                objRtn.A4076FLAG = rs01.getString("A4128FLAG");
                objRtn.A4076DESC = rs01.getString("A4128DESC");
                objRtn.A4076REGIS = rs01.getString("A4128REGIS");
                objRtn.A4076FREGI = rs01.getString("A4128FREGI");
                objRtn.A4076HREGI = rs01.getString("A4128HREGI");

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
}
