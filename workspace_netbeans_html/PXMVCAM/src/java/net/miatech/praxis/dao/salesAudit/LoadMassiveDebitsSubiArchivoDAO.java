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
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2552Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class LoadMassiveDebitsSubiArchivoDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public LoadMassiveDebitsSubiArchivoDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LoadMassiveDebitsSubiArchivoDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2552Filter> loadSQP01903(A2552Filter filter) throws SQLException, Exception {
        List<A2552Filter> lstRtn = new ArrayList<A2552Filter>(0);
        A2552Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01903(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FCVTA);
            cstmt01.setString(3, filter.IN_FHASTA);
            cstmt01.setString(4, filter.IN_IATA);
            cstmt01.setString(5, filter.IN_ESTADO);
            cstmt01.setString(6, filter.IN_AREA);
            cstmt01.setString(7, filter.IN_TYPE);
            cstmt01.setString(8, filter.A2552FUENT);
            cstmt01.setString(9, filter.IN_USER);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2552Filter();

                objRtn.RN = rs01.getLong("RN");
                objRtn.A2552CCUST = rs01.getString("A3135CCUST");
                objRtn.A2552SEQD = rs01.getInt("A3135SEQD");
                objRtn.A2552BASE = rs01.getString("A3135BASE");
                objRtn.A2552IATA = rs01.getString("A3135IATA");
                objRtn.A2552AGEN = rs01.getString("A3135AGEN");
                objRtn.A2552PAX = rs01.getString("A3135PAX");
                objRtn.A2552TPAX = rs01.getString("A3135TPAX");
                objRtn.A2552PROC = rs01.getString("A3135PROC");
                objRtn.A2552STAT = rs01.getString("A3135STAT");
                objRtn.A2552FCVTA = rs01.getString("A3135FCVTA");
                objRtn.A2552TRNCU = rs01.getString("A3135TRNCU");
                objRtn.A2552PAVTA = rs01.getString("A3135PAVTA");
                objRtn.A2552CLSE1 = rs01.getString("A3135CLSE1");
                objRtn.A2552CLSE2 = rs01.getString("A3135CLSE2");
                objRtn.A2552CLSE3 = rs01.getString("A3135CLSE3");
                objRtn.A2552CLSE4 = rs01.getString("A3135CLSE4");
                objRtn.A2552FBRI1 = rs01.getString("A3135FBRI1");
                objRtn.A2552FBRI2 = rs01.getString("A3135FBRI2");
                objRtn.A2552FBRI3 = rs01.getString("A3135FBRI3");
                objRtn.A2552FBRI4 = rs01.getString("A3135FBRI4");
                objRtn.A2552ITINE = rs01.getString("A3135ITINE");
                objRtn.A2552PNR = rs01.getString("A3135PNR");
                objRtn.A2552ARPI = rs01.getString("A3135ARPI");
                objRtn.A2552CFOP = rs01.getString("A3135CFOP");
                objRtn.A2552TFOP = rs01.getString("A3135TFOP");
                objRtn.A2552TTARJ = rs01.getString("A3135TTARJ");
                objRtn.A2552NREF = rs01.getString("A3135NREF");
                objRtn.A2552TVNTA = rs01.getString("A3135TVNTA");
                objRtn.A2552CDIT = rs01.getString("A3135CDIT");
                objRtn.A2552FLAG = rs01.getString("A3135FLAG");
                objRtn.A2552DCHQ = rs01.getString("A3135DCHQ");
                objRtn.A2552COMI = rs01.getDouble("A3135COMI");
                objRtn.A2552MDCOM = rs01.getString("A3135MDCOM");
                objRtn.A2552SCOMI = rs01.getDouble("A3135SCOMI");
                objRtn.A2552MDSCM = rs01.getString("A3135MDSCM");
                objRtn.A2552TARIF = rs01.getDouble("A3135TARIF");
                objRtn.A2552TAXCM = rs01.getDouble("A3135TAXCM");
                objRtn.A2552PROVI = rs01.getDouble("A3135PROV");
                objRtn.A2552CIA = rs01.getString("A3135CIA");
                objRtn.A2552FORMA = rs01.getString("A3135FORMA");
                objRtn.A2552SERIE = rs01.getString("A3135SERIE");
                objRtn.A2552CPN = rs01.getString("A3135CPN");
                objRtn.A2552CIAI = rs01.getString("A3135CIAI");
                objRtn.A2552FRMAI = rs01.getString("A3135FRMAI");
                objRtn.A2552SRIEI = rs01.getString("A3135SRIEI");
                objRtn.A2552ITIN2 = rs01.getString("A3135ITIN2");
                objRtn.A2552FCVT2 = rs01.getString("A3135FCVT2");
                objRtn.A2552COMII = rs01.getDouble("A3135COMII");
                objRtn.A2552MDCOI = rs01.getString("A3135MDCOI");
                objRtn.A2552SCMII = rs01.getDouble("A3135SCMII");
                objRtn.A2552MSCMI = rs01.getString("A3135MSCMI");
                objRtn.A2552TXCMI = rs01.getDouble("A3135TXCMI");
                objRtn.A2552CARGO = rs01.getDouble("A3135CARGO");
                objRtn.A2552IVA = rs01.getDouble("A3135IVA");
                objRtn.A2552NETO = rs01.getDouble("A3135NETO");
                objRtn.A2552TAX = rs01.getDouble("A3135TAX");
                objRtn.A2552FUENT = rs01.getString("A3135FUENT");
                objRtn.A2552TARI2 = rs01.getDouble("A3135TARI2");
                objRtn.A2552TKT = objRtn.A2552CIA + objRtn.A2552FORMA + objRtn.A2552SERIE;
                objRtn.A2552PAVTA = rs01.getString("A3135PAVTA");
                objRtn.ESTADO = rs01.getString("ESTADO");
                objRtn.A2552TKTORI = objRtn.A2552CIAI + objRtn.A2552FRMAI + objRtn.A2552SRIEI;
                objRtn.A2552AREA = rs01.getString("A3135AREA");
                objRtn.A2552FREGI = rs01.getString("A3135FREGI");
                objRtn.A2552REGIS = rs01.getString("A3135REGIS");
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

    /*public String subirExcel(ArrayList<A2552Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String valida = "Y";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP01904(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A2552Filter obj : filter) {

                cs.registerOutParameter(81, Types.VARCHAR);
                cs.registerOutParameter(82, Types.VARCHAR);

                cs.setString(1, obj.A2552CCUST);
                cs.setString(2, obj.A2552BASE);
                cs.setString(3, obj.A2552AREA);
                cs.setString(4, obj.A2552TRNCU);
                cs.setString(5, obj.A2552TRNCO);
                cs.setString(6, obj.A2552NMEMO);
                cs.setString(7, obj.A2552FUENT);
                cs.setString(8, obj.A2552SFUEN);
                cs.setString(9, obj.A2552IATA);
                cs.setString(10, obj.A2552TKT);
                cs.setString(11, obj.A2552CPN);
                cs.setString(12, obj.A2552ITINE);
                cs.setString(13, obj.A2552FBRI1);
                cs.setString(14, obj.A2552CODIT);
                cs.setString(15, obj.A2552PAX);
                cs.setString(16, obj.A2552TPAX);
                cs.setString(17, obj.A2552CTA);
                cs.setString(18, obj.A2552TITU);
                cs.setString(19, obj.A2552UBICA);
                cs.setString(20, obj.A2552CODRAZON);
                cs.setString(21, obj.A2552PERIODO);
                cs.setString(22, obj.A2552RAZONLIB);
                cs.setString(23, obj.A2552PAVTA);
                cs.setString(24, obj.A2552FCVTA);
                cs.setString(25, obj.A2552CUR);
                cs.setDouble(26, obj.A2552TARIF);
                cs.setDouble(27, obj.A2552TAX);
                cs.setDouble(28, obj.A2552COMI);
                cs.setDouble(29, obj.A2552SCMII);
                cs.setDouble(30, obj.A2552TAXCM);
                cs.setDouble(31, obj.A2552IVA);

                cs.setString(32, obj.A2552CODTAX1);
                cs.setDouble(33, obj.A2552TAX1);
                cs.setString(34, obj.A2552CODTAX2);
                cs.setDouble(35, obj.A2552TAX2);
                cs.setString(36, obj.A2552CODTAX3);
                cs.setDouble(37, obj.A2552TAX3);
                cs.setString(38, obj.A2552CODTAX4);
                cs.setDouble(39, obj.A2552TAX4);
                cs.setString(40, obj.A2552CODTAX5);
                cs.setDouble(41, obj.A2552TAX5);
                cs.setString(42, obj.A2552CODTAX6);
                cs.setDouble(43, obj.A2552TAX6);
                cs.setString(44, obj.A2552CODTAX7);
                cs.setDouble(45, obj.A2552TAX7);
                cs.setString(46, obj.A2552CODTAX8);
                cs.setDouble(47, obj.A2552TAX8);
                cs.setString(48, obj.A2552CODTAX9);
                cs.setDouble(49, obj.A2552TAX9);
                cs.setString(50, obj.A2552CODTAX10);
                cs.setDouble(51, obj.A2552TAX10);
                cs.setString(52, obj.A2552CODTAX11);
                cs.setDouble(53, obj.A2552TAX11);
                cs.setString(54, obj.A2552CODTAX12);
                cs.setDouble(55, obj.A2552TAX12);
                cs.setString(56, obj.A2552CODTAX13);
                cs.setDouble(57, obj.A2552TAX13);
                cs.setString(58, obj.A2552CODTAX14);
                cs.setDouble(59, obj.A2552TAX14);
                cs.setString(60, obj.A2552CODTAX15);
                cs.setDouble(61, obj.A2552TAX15);
                cs.setString(62, obj.A2552CODTAX16);
                cs.setDouble(63, obj.A2552TAX16);
                cs.setString(64, obj.A2552CODTAX17);
                cs.setDouble(65, obj.A2552TAX17);
                cs.setString(66, obj.A2552CODTAX18);
                cs.setDouble(67, obj.A2552TAX18);
                cs.setString(68, obj.A2552CODTAX19);
                cs.setDouble(69, obj.A2552TAX19);
                cs.setString(70, obj.A2552CODTAX20);
                cs.setDouble(71, obj.A2552TAX20);
                cs.setDouble(72, obj.A2552PROVI);
                cs.setString(73, obj.A2552PROVIDES);
                cs.setDouble(74, obj.A2552PROVI2);
                cs.setString(75, obj.A2552PROVIDES2);
                cs.setDouble(76, obj.A2552PROVI3);
                cs.setString(77, obj.A2552PROVIDES3);
                cs.setString(78, obj.A2552TTARJ);
                cs.setString(79, obj.A2552NREF);
                cs.setString(80, valida);

                cs.execute();
                valida = "N";
                obj.dbException.SQLCODE = cs.getString(81);
                obj.dbException.MESSAGE = cs.getString(82);

                if (!obj.dbException.SQLCODE.equals("0")) {
                    STR_RESULT = obj.dbException.MESSAGE;
                    break;
                }
            }
            cs.close();
        } catch (SQLException e) {
            STR_RESULT = "ERROR DE INSERCION";
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            STR_RESULT = "ERROR DE INSERCION";
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            //STR_RESULT = "ERROR DE INSERCION";
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }*/
    public String subirExcel(ArrayList<A2552Filter> filter) throws SQLException, ClassNotFoundException, Exception {

        String mensaje = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01904(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        ResultSet rst = null;
        String valida = "Y";
        session.getCNXIBMDB2().open();
        //cnx = session.getCNXIBMDB2().getIBMDB2Connection();

        try {
            //cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A2552Filter obj : filter) {
                //INSERTAR DATOS A LA TABLA
                cstmt01.registerOutParameter(102, Types.VARCHAR);
                cstmt01.registerOutParameter(103, Types.VARCHAR);

                cstmt01.setString(1, obj.A2552CCUST);
                cstmt01.setString(2, obj.A2552BASE);
                cstmt01.setString(3, obj.A2552AREA);
                cstmt01.setString(4, obj.A2552TRNCU);
                cstmt01.setString(5, obj.A2552TRNCO);
                cstmt01.setString(6, obj.A2552NMEMO);
                cstmt01.setString(7, obj.A2552FUENT);
                cstmt01.setString(8, obj.A2552SFUEN);
                cstmt01.setString(9, obj.A2552IATA);
                cstmt01.setString(10, obj.A2552TKT);
                cstmt01.setString(11, obj.A2552CPN);
                cstmt01.setString(12, obj.A2552ITINE);
                cstmt01.setString(13, obj.A2552FBRI1);
                cstmt01.setString(14, obj.A2552CODIT);
                cstmt01.setString(15, obj.A2552PAX);
                cstmt01.setString(16, obj.A2552TPAX);
                cstmt01.setString(17, obj.A2552CTA);
                cstmt01.setString(18, obj.A2552TITU);
                cstmt01.setString(19, obj.A2552UBICA);
                cstmt01.setString(20, obj.A2552CODRAZON);
                cstmt01.setString(21, obj.A2552PERIODO);
                cstmt01.setString(22, obj.A2552RAZONLIB);
                cstmt01.setString(23, obj.A2552PAVTA);
                cstmt01.setString(24, obj.A2552FCVTA);
                cstmt01.setString(25, obj.A2552CUR);
                cstmt01.setDouble(26, obj.A2552TARIF);
                cstmt01.setDouble(27, obj.A2552TAX);
                cstmt01.setDouble(28, obj.A2552COMI);
                cstmt01.setDouble(29, obj.A2552SCMII);
                cstmt01.setDouble(30, obj.A2552TAXCM);
                cstmt01.setDouble(31, obj.A2552IVA);

                cstmt01.setString(32, obj.A2552CODTAX1);
                cstmt01.setDouble(33, obj.A2552TAX1);
                cstmt01.setString(34, obj.A2552CODTAX2);
                cstmt01.setDouble(35, obj.A2552TAX2);
                cstmt01.setString(36, obj.A2552CODTAX3);
                cstmt01.setDouble(37, obj.A2552TAX3);
                cstmt01.setString(38, obj.A2552CODTAX4);
                cstmt01.setDouble(39, obj.A2552TAX4);
                cstmt01.setString(40, obj.A2552CODTAX5);
                cstmt01.setDouble(41, obj.A2552TAX5);
                cstmt01.setString(42, obj.A2552CODTAX6);
                cstmt01.setDouble(43, obj.A2552TAX6);
                cstmt01.setString(44, obj.A2552CODTAX7);
                cstmt01.setDouble(45, obj.A2552TAX7);
                cstmt01.setString(46, obj.A2552CODTAX8);
                cstmt01.setDouble(47, obj.A2552TAX8);
                cstmt01.setString(48, obj.A2552CODTAX9);
                cstmt01.setDouble(49, obj.A2552TAX9);
                cstmt01.setString(50, obj.A2552CODTAX10);
                cstmt01.setDouble(51, obj.A2552TAX10);
                cstmt01.setString(52, obj.A2552CODTAX11);
                cstmt01.setDouble(53, obj.A2552TAX11);
                cstmt01.setString(54, obj.A2552CODTAX12);
                cstmt01.setDouble(55, obj.A2552TAX12);
                cstmt01.setString(56, obj.A2552CODTAX13);
                cstmt01.setDouble(57, obj.A2552TAX13);
                cstmt01.setString(58, obj.A2552CODTAX14);
                cstmt01.setDouble(59, obj.A2552TAX14);
                cstmt01.setString(60, obj.A2552CODTAX15);
                cstmt01.setDouble(61, obj.A2552TAX15);
                cstmt01.setString(62, obj.A2552CODTAX16);
                cstmt01.setDouble(63, obj.A2552TAX16);
                cstmt01.setString(64, obj.A2552CODTAX17);
                cstmt01.setDouble(65, obj.A2552TAX17);
                cstmt01.setString(66, obj.A2552CODTAX18);
                cstmt01.setDouble(67, obj.A2552TAX18);
                cstmt01.setString(68, obj.A2552CODTAX19);
                cstmt01.setDouble(69, obj.A2552TAX19);
                cstmt01.setString(70, obj.A2552CODTAX20);
                cstmt01.setDouble(71, obj.A2552TAX20);

                cstmt01.setDouble(72, obj.A2552PROVI);
                cstmt01.setString(73, obj.A2552PROVIDES);
                cstmt01.setDouble(74, obj.A2552PROVI2);
                cstmt01.setString(75, obj.A2552PROVIDES2);
                cstmt01.setDouble(76, obj.A2552PROVI3);
                cstmt01.setString(77, obj.A2552PROVIDES3);
                cstmt01.setString(78, obj.A2552TTARJ);
                cstmt01.setString(79, obj.A2552NREF);

                cstmt01.setString(80, obj.A2552CDATO1);
                cstmt01.setString(81, obj.A2552CDATO2);
                cstmt01.setString(82, obj.A2552CDATO3);
                cstmt01.setString(83, obj.A2552CDATO4);
                cstmt01.setString(84, obj.A2552CDATO5);
                cstmt01.setString(85, obj.A2552CDATO6);
                cstmt01.setString(86, obj.A2552CDATO7);
                cstmt01.setString(87, obj.A2552CDATO8);
                cstmt01.setString(88, obj.A2552CDATO9);
                cstmt01.setString(89, obj.A2552CDATO10);
                cstmt01.setString(90, obj.A2552CDATO11);
                cstmt01.setString(91, obj.A2552CDATO12);
                cstmt01.setString(92, obj.A2552CDATO13);
                cstmt01.setString(93, obj.A2552CDATO14);
                cstmt01.setString(94, obj.A2552CDATO15);
                cstmt01.setString(95, obj.A2552CDATO16);
                cstmt01.setString(96, obj.A2552CDATO17);
                cstmt01.setString(97, obj.A2552CDATO18);
                cstmt01.setString(98, obj.A2552CDATO19);
                cstmt01.setString(99, obj.A2552CDATO20);
                cstmt01.setDouble(100, obj.A2552PROVI4);
                cstmt01.setString(101, valida);

                cstmt01.execute();
                valida = "N";
                obj.dbException.SQLCODE = cstmt01.getString(102);
                obj.dbException.MESSAGE = cstmt01.getString(103);
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

    public List<A2552Filter> loadSQP01962(A2552Filter filter) throws SQLException, Exception {
        List<A2552Filter> lstRtn = new ArrayList<A2552Filter>(0);
        A2552Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01962(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_AREA);
            cstmt01.setString(3, filter.IN_TYPE);
            cstmt01.setString(4, filter.IN_FTE);
            cstmt01.setString(5, filter.IN_USER);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2552Filter();

                objRtn.A2552CCUST = rs01.getString("A3135CCUST");
                objRtn.A2552SEQDD = rs01.getString("A3135SEQD");
                objRtn.A2552SEQ = rs01.getString("A3135SEQ");
                objRtn.A2552BASE = rs01.getString("A3135BSE");
                objRtn.A2552AREA = rs01.getString("A3135ARA");
                objRtn.A2552ETCU3 = rs01.getString("A3135AREA");
                objRtn.A2552ETCU4 = rs01.getString("A3135BASE");
                objRtn.A2552IATA = rs01.getString("A3135IATA");
                objRtn.A2552AGEN = rs01.getString("A3135AGEN");
                objRtn.A2552PAX = rs01.getString("A3135PAX");
                objRtn.A2552PROC = rs01.getString("A3135PROC");
                objRtn.A2552FCVTA = rs01.getString("A3135FCVTA");
                objRtn.A2552TRNCU = rs01.getString("A3135TRNCU");
                objRtn.A2552FBRI1 = rs01.getString("A3135FBRI1");
                objRtn.A2552FBRI2 = rs01.getString("A3135FBRI2");
                objRtn.A2552FBRI3 = rs01.getString("A3135FBRI3");
                objRtn.A2552FBRI4 = rs01.getString("A3135FBRI4");
                objRtn.A2552PNR = rs01.getString("A3135FBRI4");
                objRtn.A2552FLAG = rs01.getString("A3135FLAG");
                objRtn.A2552DCHQ = rs01.getString("A3135DCHQ");
                objRtn.A2552CUR = rs01.getString("A3135CUR");
                objRtn.A2552FUENT = rs01.getString("A3135FUENT");
                objRtn.A2552SFUEN = rs01.getString("A3135SFUEN");
                objRtn.A2552TDOC = rs01.getString("A3135TDOC");
                objRtn.A2552CIA = rs01.getString("A3135CIA");
                objRtn.A2552FORMA = rs01.getString("A3135FORMA");
                objRtn.A2552SERIE = rs01.getString("A3135SERIE");
                objRtn.A2552CPN = rs01.getString("A3135CPN");

                objRtn.A2552COMI = rs01.getDouble("A3135COMI");
                objRtn.A2552TARIF = rs01.getDouble("A3135TARIF");
                objRtn.A2552TAX = rs01.getDouble("A3135TAX");

                objRtn.A2552CARGO = rs01.getDouble("A3135CARGO");
                objRtn.A2552IVA = rs01.getDouble("A3135IVA");
                objRtn.A2552NETO = rs01.getDouble("A3135NETO");
                objRtn.A2552TVNTA = rs01.getString("A3135TVNTA");
                objRtn.A2552TAXCM = rs01.getDouble("A3135TAXCM");
                objRtn.A2552SCOMI = rs01.getDouble("A3135SCOMI");
                objRtn.MES = rs01.getString("MES");
                objRtn.GROUPED = rs01.getString("GRUPO");
                objRtn.A2552SEQ = rs01.getString("A3135SEQ");
                objRtn.A2552PAVTA = rs01.getString("A3135PAVTA");
                objRtn.A2552DCHQ = rs01.getString("A3135DCHQ");
                objRtn.MONTO = rs01.getDouble("MONTO");
                objRtn.A2552TKT = objRtn.A2552CIA + objRtn.A2552FORMA + objRtn.A2552SERIE;
                objRtn.A2552ETCU2 = rs01.getString("A3135DECMO");
                objRtn.A2552TFOP = rs01.getString("A3135TFOP");
                objRtn.A2552CFOP2 = rs01.getString("A3135CFOP2");
                objRtn.A2552TTARJ = rs01.getString("A3135TTARJ");
                objRtn.A2552NREF = rs01.getString("A3135NREF");
                objRtn.A2552CDIT = rs01.getString("A3135CAUDT");
                objRtn.A2552PROVI = rs01.getDouble("A3135PROV");

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

    public String insertTKT(ArrayList<A2552Filter> filter, String strSesion) throws SQLException, Exception {
        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String valida = "Y";
        String strUsuario, strFecha, strHora;
        session.getCNXIBMDB2().open();
        try {
            strUsuario = session.getUserView().getUserInfo().USR;
            strFecha = Functions.getFechaActual();
            strHora = Functions.getHoraActual();
            String SQLCLL01 = "{CALL PXSAUDIT.SQP02497(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL02 = "{CALL PXSAUDIT.SQP01963(?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A2552Filter obj : filter) {

                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, obj.A2552CIA);
                cs.setString(3, obj.A2552FORMA);
                cs.setString(4, obj.A2552SERIE);
                cs.setString(5, obj.A2552IATA);
                cs.setString(6, obj.A2552TRNCU);
                cs.setString(7, obj.A2552PAVTA);
                cs.setString(8, obj.A2552ETCU3);//AREA
                cs.setString(9, obj.A2552ETCU4);//BASE
                cs.setString(10, obj.A2552FUENT);
                cs.setString(11, obj.A2552SEQDD);
                cs.setString(12, obj.A2552SEQ);
                cs.setString(13, obj.A2552CPN);

                cs.setString(14, obj.GROUPED);
                cs.setString(15, strSesion);
                cs.setString(16, valida);
                cs.setString(17, strUsuario);
                cs.setString(18, strFecha);
                cs.setString(19, strHora);
                cs.execute();
                valida = "P";

            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
            //cnx.commit();
            //INSERTAR DATOS A LA TABLA A2548
            if (STR_RESULT.equals("RECORD INSERTED")) {
                cs2 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL02);
                cs2.registerOutParameter(6, Types.VARCHAR);
                cs2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs2.setString(2, strSesion);
                cs2.setString(3, strUsuario);
                cs2.setString(4, strFecha);
                cs2.setString(5, strHora);

                cs2.execute();
                STR_RESULT = cs2.getString(6);
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

    public String UpdateTKT(ArrayList<A2552Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP02849(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A2552Filter obj : filter) {

                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, "");
                cs.setString(3, obj.A2552CIA);
                cs.setString(4, obj.A2552FORMA);
                cs.setString(5, obj.A2552SERIE);
                cs.setString(6, obj.A2552CPN.trim());
                cs.setString(7, obj.A2552SEQ);

                cs.setInt(8, obj.A2552SEQD);
                cs.setString(9, obj.A2552TRNCU);
                cs.setString(10, obj.A2552IATA);
                cs.setString(11, obj.A2552FUENT);

                cs.execute();
            }
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

}
