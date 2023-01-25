/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import com.google.gson.JsonArray;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.PX036S01A1531Filter;
import net.miatech.beans.PX036S01A1532Filter;
import net.miatech.beans.PX036S01A1533Filter;
import net.miatech.beans.PX036S01A1534Filter;
import net.miatech.beans.PX036S01A1720Filter;
import net.miatech.beans.PX036S01A1721Filter;
import net.miatech.beans.PX036S01A1731Filter;
import net.miatech.beans.PX036S01A1732Filter;
import net.miatech.beans.PX036S01A1733Filter;
import net.miatech.beans.PX036S01A1734Filter;
import net.miatech.beans.PX036S01A1735Filter;
import net.miatech.beans.PX038S01A1724Filter;
import net.miatech.beans.PX038S02A713Filter;
import net.miatech.beans.PX038S02A714Filter;
import net.miatech.beans.PX038S02A720Filter;
import net.miatech.beans.S0001A1530Filter;
import net.miatech.beans.S0001A1730Filter;
import net.miatech.beans.S0001A713Filter;
import net.miatech.beans.S0001A714Filter;
import net.miatech.beans.S0002A1530Filter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.S0007A730Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.A003;
import net.miatech.praxis.A005;
import net.miatech.praxis.A1772;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author jmeiggs
 */
public class SalesReportDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesReportDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesReportDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<S0001A1530Filter> loadS0001A1530(S0001A1530Filter filter) throws SQLException, Exception {
        List<S0001A1530Filter> lstRtn = new ArrayList<>(0);
        S0001A1530Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL S0001A1530(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        if (filter.FLAG.equals("6")) {
            SQLCLL01 = "{CALL SQP00171(?,?,?,?)}";
        }

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            if (filter.FLAG.equals("6")) {
                cstmt01.setString(1, "139");
                cstmt01.setString(2, filter.TKT.substring(0, 3));
                cstmt01.setString(3, filter.TKT.substring(3, 7));
                cstmt01.setString(4, filter.TKT.substring(7, 13));

                cstmt01.execute();

                filter.page.PAGNUM = 1;
                filter.page.PAGROW = 20;
                filter.page.TOTPAG = 1;
                filter.page.TOTROW = 1;
            } else {
                cstmt01.registerOutParameter(12, Types.INTEGER);
                cstmt01.registerOutParameter(13, Types.INTEGER);
                cstmt01.registerOutParameter(14, Types.INTEGER);
                cstmt01.registerOutParameter(15, Types.INTEGER);

                cstmt01.setString(1, filter.AIRLINE);
                cstmt01.setString(2, filter.FECHARPT);
                cstmt01.setString(3, filter.FUENTE);
                cstmt01.setString(4, filter.PAIS);
                cstmt01.setString(5, filter.CIUVT);
                cstmt01.setString(6, filter.BANCO);
                cstmt01.setString(7, filter.STPRO);
                cstmt01.setString(8, filter.MONEDA);
                cstmt01.setString(9, filter.FLAG);
                cstmt01.setString(10, filter.GRUPO);
                cstmt01.setString(11, filter.IATA);
                cstmt01.setInt(12, filter.page.PAGNUM);
                cstmt01.setInt(13, filter.page.PAGROW);
                cstmt01.setInt(14, filter.page.TOTPAG);
                cstmt01.setInt(15, filter.page.TOTROW);

                cstmt01.execute();

                filter.page.PAGNUM = cstmt01.getInt(12);
                filter.page.PAGROW = cstmt01.getInt(13);
                filter.page.TOTPAG = cstmt01.getInt(14);
                filter.page.TOTROW = cstmt01.getInt(15);
            }
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0001A1530Filter();
                //objRtn.RN = rs01.getLong("RN");
                objRtn.A1530GRUPO = rs01.getString("A1530GRUPO");
                objRtn.A1530FUENT = rs01.getString("A1530FUENT");
                objRtn.A1530SFUEN = rs01.getString("A1530SFUEN");
                objRtn.A1530PSVTA = rs01.getString("A1530PSVTA");//Pais
                objRtn.A1530CIUVT = rs01.getString("A1530CIUVT");//Descripcion
                objRtn.A1530BANCO = rs01.getString("A1530BANCO");//Codigo
                objRtn.A1530FPROC = rs01.getString("A1530FPROC");//Processing Date
                objRtn.A1530FHAST = rs01.getString("A1530FHAST");//Ending
                objRtn.A1530AGENT = rs01.getString("A1530AGENT");
                objRtn.A1530FCONT = rs01.getString("A1530FCONT");
                objRtn.A1530POLGL = rs01.getString("A1530POLGL");
                objRtn.A1530POLAP = rs01.getString("A1530POLAP");
                objRtn.A1530POLAR = rs01.getString("A1530POLAR");
                objRtn.A1530STPRO = rs01.getString("A1530STPRO");
                objRtn.A1530MDA = rs01.getString("A1530MDA");
                objRtn.A1530TICAP = rs01.getString("A1530TICAP");
                objRtn.A1530FDESD = rs01.getString("A1530FDESD");
                objRtn.A1530SPROC = rs01.getString("A1530SPROC");
                objRtn.A1530CPROC = rs01.getString("A1530CPROC");
                objRtn.A1530CSABR = rs01.getString("A1530CSABR");
                objRtn.A1530USRIN = rs01.getString("A1530USRIN");
                objRtn.A1530FECIN = rs01.getString("A1530FECIN");
                objRtn.A1530USRAC = rs01.getString("A1530USRAC");
                objRtn.A1530FECAC = rs01.getString("A1530FECAC");
                objRtn.A1530TVENT = rs01.getString("A1530TVENT");
                objRtn.A1530CCUST = rs01.getString("A1530CCUST");
                objRtn.A1530IDCON = rs01.getString("A1530IDCON");
                objRtn.A1530IDFIL = rs01.getString("A1530IDFIL");
                objRtn.A1530TCAMB = rs01.getDouble("A1530TCAMB");
                if ((rs01.getString("A003KEY3")) == null) {
                    objRtn.A003KEY3 = "";
                } else {
                    objRtn.A003KEY3 = rs01.getString("A003KEY3");
                }
                //objRtn.A1530FARE = rs01.getString("A1530FARE");
                //objRtn.A1530TAX = rs01.getString("A1530TAX");
                //objRtn.A1530COMISION = rs01.getString("A1530COMISION");
                //objRtn.A1530TAXONCOMISION = rs01.getString("A1530TAXONCOMISION");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            //session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public A006 loadPX038S01A006(A006 filter) throws SQLException, Exception {
        A006 objRtn = new A006();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX038S01A006(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(2, Types.INTEGER);

            cstmt01.setString(1, filter.A006KEY);
            cstmt01.setInt(2, filter.A006RES);

            cstmt01.execute();

            objRtn.A006RES = cstmt01.getInt(2);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return objRtn;
    }

    public List<A003> loadPX038S01A003(A003 filter) throws SQLException, Exception {
        List<A003> lstRtn = new ArrayList<>(0);
        A003 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX038S01A003(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.A003KEY);
            cstmt01.setString(2, filter.A003PSALF);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A003();
                //objRtn.RN = rs01.getLong("RN");
                objRtn.A003KEY = rs01.getString("A003KEY");
                objRtn.A003TIPO = rs01.getString("A003TIPO");
                objRtn.A003PSALF = rs01.getString("A003PSALF");
                objRtn.A003CIUDAD = rs01.getString("A003CIUDAD");
                objRtn.A003CANAL = rs01.getString("A003CANAL");
                objRtn.A003SABCTY = rs01.getString("A003SABCTY");
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public A1007 loadPX038S01A1007(A1007 filter) throws SQLException, Exception {
        A1007 objRtn = new A1007();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX038S01A1007(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(2, Types.INTEGER);

            cstmt01.setString(1, filter.A1007CTATO);
            cstmt01.setInt(2, filter.A1007RES);

            cstmt01.execute();

            objRtn.A1007RES = cstmt01.getInt(2);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return objRtn;
    }

    public A1772 loadA1772(A1772 filter) throws SQLException, Exception {
        A1772 objRtn = new A1772();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP03468(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.VARCHAR);

            cstmt01.setString(1, filter.A1772RFIC);
            cstmt01.setString(2, filter.A1772SUBCD);
            cstmt01.setString(3, filter.A1772EMD);

            cstmt01.execute();

            objRtn.A1772EMD = cstmt01.getString(3);
            if(objRtn.A1772EMD == null){
                objRtn.A1772EMD = "";
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return objRtn;
    }
    
    public A005 loadA005(A005 filter) throws SQLException, Exception {
        A005 objRtn = new A005();

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP03457(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(2, Types.INTEGER);

            cstmt01.setString(1, filter.A005KEY1);
            cstmt01.setInt(2, filter.A005RES);

            cstmt01.execute();

            objRtn.A005RES = cstmt01.getInt(2);
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return objRtn;
    }

    public S0002A1530Filter setS0002A1530(S0002A1530Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL S0002A1530(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(39, Types.VARCHAR);
            cstmt.registerOutParameter(40, Types.VARCHAR);
            cstmt.setString(1, filter.IN_ACTION);
            cstmt.setString(2, filter.A1530CCUST);
            cstmt.setString(3, filter.A1530PSVTA);
            cstmt.setString(4, filter.A1530GRUPO);
            cstmt.setString(5, filter.A1530CIUVT);
            cstmt.setString(6, filter.A1530BANCO);
            cstmt.setString(7, filter.A1530CSABR);
            cstmt.setString(8, filter.A1530AGENT);
            cstmt.setString(9, filter.A1530TVENT);
            cstmt.setString(10, filter.A1530FUENT);
            cstmt.setString(11, filter.A1530SFUEN);
            cstmt.setString(12, filter.A1530TICAP);
            cstmt.setString(13, filter.A1530STVOI);
            cstmt.setString(14, filter.A1530FCONT);
            cstmt.setString(15, filter.A1530IDCON);
            cstmt.setString(16, filter.A1530POLGL);
            cstmt.setString(17, filter.A1530POLAR);
            cstmt.setString(18, filter.A1530POLAP);
            cstmt.setString(19, filter.A1530FCADE);
            cstmt.setString(20, filter.A1530FCAHA);
            cstmt.setString(21, filter.A1530FDESD);
            cstmt.setString(22, filter.A1530FHAST);
            cstmt.setString(23, filter.A1530DYRI);
            cstmt.setString(24, filter.A1530FSQN);
            cstmt.setString(25, filter.A1530FPROG);
            cstmt.setString(26, filter.A1530FPROC);
            cstmt.setString(27, filter.A1530MPROC);
            cstmt.setString(28, filter.A1530SPROC);
            cstmt.setString(29, filter.A1530CPROC);
            cstmt.setString(30, filter.A1530MDA);
            cstmt.setString(31, filter.A1530IDFIL);
            cstmt.setString(32, filter.A1530STPRO);
            cstmt.setString(33, filter.A1530STERR);
            cstmt.setString(34, filter.A1530STS0);
            cstmt.setString(35, filter.A1530STS1);
            cstmt.setString(36, filter.A1530STS2);
            cstmt.setString(37, filter.A1530STS3);
            cstmt.setString(38, "");//PARA ROBOT; POR ESO EN BLANCO
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(39);
            filter.dbException.MESSAGE = cstmt.getString(40);
        } finally {
            if (cstmt != null) {
                //try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public List<PX038S02A713Filter> loadPX038S02A713(PX038S02A713Filter filter) throws SQLException, Exception {
        List<PX038S02A713Filter> lstRtn = new ArrayList<>(0);
        PX038S02A713Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX038S02A713(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_AIRLIN);
            cstmt01.setString(3, filter.IN_GRUPO);
            cstmt01.setString(4, filter.IN_TKT);
            cstmt01.setString(5, filter.IN_IATA);
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
                objRtn = new PX038S02A713Filter();
                //objRtn.RN = rs01.getLong("RN");
                objRtn.A713AIRLIN = rs01.getString("A713AIRLIN");
                objRtn.A713CIA = rs01.getString("A713CIA");
                objRtn.DOCUMENTO = rs01.getString("DOCUMENTO");
                objRtn.A713SEQ = rs01.getString("A713SEQ");
                objRtn.A713FECVTA = rs01.getString("A713FECVTA");
                objRtn.A713TRNCU = rs01.getString("A713TRNCU");
                objRtn.CNJ = rs01.getString("CNJ");
                objRtn.A713AGENTE = rs01.getString("A713AGENTE");
                objRtn.A713TDOC = rs01.getString("A713TDOC");
                objRtn.A713MONEDA = rs01.getString("A713MONEDA");
                objRtn.A713TARIFA = rs01.getDouble("A713TARIFA");
                objRtn.A713MDAPAG = rs01.getString("A713MDAPAG");
                objRtn.A713TRFPAG = rs01.getDouble("A713TRFPAG");
                objRtn.CURADC = rs01.getString("CURADC");
                objRtn.ADC = rs01.getDouble("ADC");
                objRtn.A713MIAERR = rs01.getString("A713MIAERR");
                objRtn.A713GRUPO = rs01.getString("A713GRUPO");
                objRtn.A713UFORMA = rs01.getString("A713UFORMA");
                objRtn.CUPON = rs01.getString("A713CUPON1") + rs01.getString("A713CUPON2") + rs01.getString("A713CUPON3") + rs01.getString("A713CUPON4");
                objRtn.QTY_ERROR = rs01.getInt("QTY_ERROR");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<PX038S02A720Filter> loadPX038S02A720(PX038S02A720Filter filter) throws SQLException, Exception {
        List<PX038S02A720Filter> lstRtn = new ArrayList<>(0);
        PX038S02A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX038S02A720(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_AIRLIN);
            cstmt01.setString(3, filter.IN_GRUPO);
            cstmt01.setString(4, filter.IN_TKT);
            cstmt01.setString(5, filter.IN_IATA);
            cstmt01.setString(6, filter.IN_TRANSACTION);
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
                objRtn = new PX038S02A720Filter();
                //objRtn.RN = rs01.getLong("RN");
                objRtn.A720AIRLIN = rs01.getString("A720AIRLIN");
                objRtn.A720CIA = rs01.getString("A720CIA");
                objRtn.DOCUMENTO = rs01.getString("DOCUMENTO");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                objRtn.CNJ = rs01.getString("CNJ");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                objRtn.A720TRNCU = rs01.getString("A720TRNCU");
                objRtn.A720MDAAD = rs01.getString("A720MDAAD");
                objRtn.A720ADC = rs01.getDouble("A720ADC");
                objRtn.A720UFORMA = rs01.getString("A720UFORMA");
                objRtn.A720TDOC = rs01.getString("A720TDOC");
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MDAPAG = rs01.getString("A720MDAPAG");
                objRtn.A720TRFPAG = rs01.getDouble("A720TRFPAG");
                objRtn.A720MIAERR = rs01.getString("A720MIAERR");
                objRtn.A720GRUPO = rs01.getString("A720GRUPO");
                objRtn.QTY_ERROR = rs01.getInt("QTY_ERROR");
                if (rs01.getString("A720TKVOID").equals("V")) {
                    objRtn.A720UFORMA = "VOID";
                    objRtn.A720MIAERR = "";
                }
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<PX038S02A714Filter> loadPX038S02A714(PX038S02A714Filter filter) throws SQLException, Exception {
        List<PX038S02A714Filter> lstRtn = new ArrayList<>(0);
        PX038S02A714Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX038S02A714(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_AIRLIN);
            cstmt01.setString(3, filter.IN_GRUPO);
            cstmt01.setString(4, filter.IN_TKT);
            cstmt01.setString(5, filter.IN_TRANSACTION);
            cstmt01.setString(6, filter.IN_IATA);
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
                objRtn = new PX038S02A714Filter();
                //objRtn.RN = rs01.getLong("RN");
                objRtn.A714AIRLIN = rs01.getString("A714AIRLIN");
                objRtn.A714CIA = rs01.getString("A714CIA");
                objRtn.DOCUMENTO = rs01.getString("DOCUMENTO");
                objRtn.A714FECVTA = rs01.getString("A714FECVTA");
                objRtn.CNJ = rs01.getString("CNJ");
                objRtn.A714AGENTE = rs01.getString("A714AGENTE");
                objRtn.A714TRNCU = rs01.getString("A714TRNCU");
                objRtn.A714TDOC = rs01.getString("A714TDOC");
                objRtn.A714MDAFA = rs01.getString("A714MDAFA");
                objRtn.A714FARE = rs01.getDouble("A714FARE");
                objRtn.A714MDAPAG = rs01.getString("A714MDAPAG");
                objRtn.A714TRFPAG = rs01.getDouble("A714TRFPAG");
                objRtn.A714MDAFP = rs01.getString("A714MDAFP");
                objRtn.A714VFOP = rs01.getDouble("A714VFOP");
                objRtn.A714MIAERR = rs01.getString("A714MIAERR");
                objRtn.A714GRUPO = rs01.getString("A714GRUPO");
                objRtn.A714SEQ = rs01.getString("A714SEQ");
                objRtn.QTY_ERROR = rs01.getInt("QTY_ERROR");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<PX036S01A1720Filter> loadPX036S01A1720(PX036S01A1720Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List listado = new ArrayList();

        String SQLCLL01 = "{CALL PX036S01A1720(?,?)}";

        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);                      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_A1720CCUST);
            cstmt01.setString(2, filter.IN_A1720GRUPO);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                HashMap hm = new HashMap();
                hm.put("A1720GRUPO", rs01.getString("A1720GRUPO"));
                hm.put("A1720NATUR", rs01.getString("A1720NATUR"));
                hm.put("A1720TIPO", rs01.getString("A1720TIPO"));
                hm.put("A1720STIPO", rs01.getString("A1720STIPO"));
                hm.put("A1720DESCR", rs01.getString("A1720DESCR"));
                hm.put("A1720QDOSA", rs01.getInt("A1720QDOSA"));
                hm.put("A1720QTRSA", rs01.getInt("A1720QTRSA"));

                hm.put("A1720QDORF", rs01.getInt("A1720QDORF"));
                hm.put("A1720QTRRF", rs01.getInt("A1720QTRRF"));
                hm.put("A1720VSALC", rs01.getString("A1720VSALC"));
                hm.put("A1720VRFLC", rs01.getString("A1720VRFLC"));
                hm.put("A1720VNTLC", rs01.getString("A1720VNTLC"));

                hm.put("A1720MDARV", rs01.getString("A1720MDARV"));
                hm.put("A1720VSARV", rs01.getString("A1720VSARV"));
                hm.put("A1720VRFRV", rs01.getString("A1720VRFRV"));
                hm.put("A1720VNTRV", rs01.getString("A1720VNTRV"));
                hm.put("A1720NATUR_00", rs01.getString("A1720NATUR_00"));
                hm.put("A1720TIPO_00", rs01.getString("A1720TIPO_00"));
                hm.put("LINK_DETAIL", rs01.getString("LINK_DETAIL"));
                listado.add(hm);
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
            //session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return listado;
    }

    public List<PX038S01A1724Filter> loadPX038S01A1724(PX038S01A1724Filter filter) throws SQLException, Exception {
        List<PX038S01A1724Filter> lstRtn = new ArrayList<PX038S01A1724Filter>(0);
        PX038S01A1724Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.PX038S01A1724(?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1724GRUPO);
            cstmt01.setString(3, filter.IN_A1724FUENT);
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
                objRtn = new PX038S01A1724Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1724CCUST = rs01.getString("A1724CCUST");
                objRtn.A1724GRUPO = rs01.getString("A1724GRUPO");
                objRtn.A1724TRANS = rs01.getString("A1724TRANS");
                //objRtn.A1724CIA = rs01.getString("A1724CIA");
                //objRtn.A1724FORMA = rs01.getString("A1724FORMA");
                //objRtn.A1724SERIE = rs01.getString("A1724SERIE");
                //objRtn.A1724SEQ = rs01.getString("A1724SEQ");
                objRtn.A1272COD = rs01.getString("A1272COD");
                objRtn.A1272DES = rs01.getString("A1272DES").trim();
                objRtn.A1724QTY = rs01.getInt("A1724QTY");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<S0007A730Filter> loadS0007A730EXCH(S0007A730Filter filter) throws SQLException, Exception {
        List<S0007A730Filter> lstRtn = new ArrayList<>(0);
        S0007A730Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0008A730(?,?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.IN_SEQ);
            cstmt01.setString(6, filter.IN_CIAEXCH);
            cstmt01.setString(7, filter.IN_FORMAEXCH);
            cstmt01.setString(8, filter.IN_SERIEEXCH);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0007A730Filter();
                objRtn.A730CIA = rs01.getString("A730CIA");
                objRtn.A730FORMA = rs01.getString("A730FORMA");
                objRtn.A730SERIE = rs01.getString("A730SERIE");
                objRtn.A730DCHEQ = rs01.getString("A730DCHEQ");
                objRtn.A730FLAG = rs01.getString("A730FLAG");
                objRtn.A730NSEQ = rs01.getInt("A730NSEQ");
                objRtn.A730CTKTC = rs01.getInt("A730CTKTC");
                objRtn.A730AGENTE = rs01.getString("A730AGENTE");
                objRtn.A730CODIT = rs01.getString("A730CODIT").trim();
                objRtn.A730TARIFA = rs01.getDouble("A730TARIFA");
                objRtn.A730MONEDA = rs01.getString("A730MONEDA");
                objRtn.A730TRFPAG = rs01.getDouble("A730TRFPAG");
                objRtn.A730MDAPAG = rs01.getString("A730MDAPAG");
                objRtn.A730GRUPO = rs01.getString("A730GRUPO");
                objRtn.A730FECVTA = rs01.getString("A730FECVTA");
                objRtn.A730MONREG = rs01.getString("A730MONREG");
                objRtn.A730CIAI = rs01.getString("A730CIAI");
                objRtn.A730FORMAI = rs01.getString("A730FORMAI");
                objRtn.A730SERIEI = rs01.getString("A730SERIEI");
                objRtn.A730ORIG = rs01.getString("A730ORIG");
                objRtn.A730PAIS = rs01.getString("A730PAIS");
                objRtn.TICKET = rs01.getString("A730CIA") + rs01.getString("A730FORMA") + rs01.getString("A730SERIE");
                objRtn.A730CUPON1 = rs01.getString("A730CUPON1");
                objRtn.A730CUPON2 = rs01.getString("A730CUPON2");
                objRtn.A730CUPON3 = rs01.getString("A730CUPON3");
                objRtn.A730CUPON4 = rs01.getString("A730CUPON4");
                objRtn.A730STAT = rs01.getString("A730STAT");
                objRtn.A730MDACOM = rs01.getString("A730MDACOM");
                objRtn.A730MDACM = rs01.getString("A730MDACM");
                objRtn.A730MDAYQ = rs01.getString("A730MDAYQ");
                objRtn.A730MDAIV = rs01.getString("A730MDAIV");
                objRtn.A730COMMIS = rs01.getDouble("A730COMMIS");
                objRtn.A730TSCM = rs01.getDouble("A730TSCM");
                objRtn.A730TYQ = rs01.getDouble("A730TYQ");
                objRtn.A730TIV = rs01.getDouble("A730TIV");
                objRtn.A730MDAFA = rs01.getString("A730MDAFA");
                objRtn.A730MDARV = rs01.getString("A730MDARV");
                objRtn.A730FARE = rs01.getDouble("A730FARE");
                objRtn.A730FARERV = rs01.getDouble("A730FARERV");
                objRtn.A730TRNCU = rs01.getString("A730TRNCU");
                objRtn.A730TDOC = rs01.getString("A730TDOC");
                objRtn.A730RFIC = rs01.getString("A730RFIC");
                objRtn.A730RFIS = rs01.getString("A730RFIS");
                objRtn.ERRORDESC = rs01.getString("ERRORDESC").trim();

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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0007A730Filter> loadS0007A730EXCHGrilla(S0007A730Filter filter) throws SQLException, Exception {
        List<S0007A730Filter> lstRtn = new ArrayList<>(0);
        S0007A730Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0008A730(?,?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.IN_SEQ);
            cstmt01.setString(6, filter.IN_CIAEXCH);
            cstmt01.setString(7, filter.IN_FORMAEXCH);
            cstmt01.setString(8, filter.IN_SERIEEXCH);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                for (int i = 1; i <= 4; i++) {
                    objRtn = new S0007A730Filter();
                    objRtn.A730MONREG = rs01.getString("A730MONREG");
                    objRtn.TICKET = rs01.getString("A730CIA") + rs01.getString("A730FORMA") + rs01.getString("A730SERIE");
                    objRtn.CUPON = i + "";
                    objRtn.CONEX = rs01.getString("A730CONEX" + i);
                    int op = i - 1;
                    objRtn.ORIGEN = rs01.getString("A730RUTA" + op);
                    objRtn.DESTINO = rs01.getString("A730RUTA" + i);
                    objRtn.CARRIER = rs01.getString("A730CARRA" + i);
                    objRtn.CLASE = rs01.getString("A730CLASE" + i);
                    objRtn.FLIGHT = rs01.getString("A730NVLO" + i);
                    objRtn.DFLIGHT = rs01.getString("A730FVLO" + i);
                    objRtn.FAREBASIS = rs01.getString("A730FBUSO" + i).trim();
                    objRtn.CPNCUR = rs01.getString("A730MONREG");
                    objRtn.CPN = rs01.getDouble("A730VALOR" + i);
                    objRtn.QCUR = rs01.getString("A730MONREG");
                    objRtn.Q = rs01.getDouble("A730Q" + i);
                    objRtn.YQ = rs01.getDouble("A730YQ" + i);
                    objRtn.COMM = rs01.getDouble("A730PRRCM" + i);
                    objRtn.OCOMM = rs01.getDouble("A730PRSCM" + i);
                    objRtn.IVA = rs01.getDouble("A730IV" + i);
                    objRtn.A730CUPON1 = rs01.getString("A730CUPON1");
                    objRtn.A730CUPON2 = rs01.getString("A730CUPON2");
                    objRtn.A730CUPON3 = rs01.getString("A730CUPON3");
                    objRtn.A730CUPON4 = rs01.getString("A730CUPON4");

                    if (objRtn.DESTINO.trim().length() == 0) {
                        objRtn.TICKET = "";
                        objRtn.CPUI = "";
                        objRtn.CONEX = "";
                        objRtn.ORIGEN = "";
                        objRtn.DESTINO = "";
                        objRtn.CARRIER = "";
                        objRtn.CLASE = "";
                        objRtn.FLIGHT = "";
                        objRtn.DFLIGHT = "";
                        objRtn.FAREBASIS = "";
                        objRtn.CPNCUR = "";
                        objRtn.QCUR = "";
                    }
                    if (objRtn.DESTINO.trim().length() > 0) {
                        lstRtn.add(objRtn);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0007A720Filter> loadS0007A720(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A720Filter> lstRtn = new ArrayList<>(0);
        S0007A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0007A720(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A720SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0007A720Filter();
                objRtn.A720CIA = rs01.getString("A720CIA");
                objRtn.A720FORMA = rs01.getString("A720FORMA");
                objRtn.A720SERIE = rs01.getString("A720SERIE");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
                objRtn.A720DCHEQ = rs01.getString("A720DCHEQ");
                objRtn.A720FLAG = rs01.getString("A720FLAG");
                objRtn.A720NSEQ = rs01.getInt("A720NSEQ");
                objRtn.A720CTKTC = rs01.getInt("A720CTKTC");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                objRtn.A720CODIT = rs01.getString("A720CODIT").trim();
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720TRFPAG = rs01.getDouble("A720TRFPAG");
                objRtn.A720MDAPAG = rs01.getString("A720MDAPAG");
                objRtn.A720GRUPO = rs01.getString("A720GRUPO");
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                objRtn.A720MONREG = rs01.getString("A720MONREG");
                objRtn.A720CIAI = rs01.getString("A720CIAI");
                objRtn.A720FORMAI = rs01.getString("A720FORMAI");
                objRtn.A720SERIEI = rs01.getString("A720SERIEI");
                objRtn.A720ORIG = rs01.getString("A720ORIG");
                objRtn.A720PAIS = rs01.getString("A720PAIS");
                objRtn.TICKET = rs01.getString("A720CIA") + rs01.getString("A720FORMA") + rs01.getString("A720SERIE");

                objRtn.A720TRNN = rs01.getString("A720TRNN");
                objRtn.A720TRNSQ = rs01.getString("A720TRNSQ");
                objRtn.A720TRNCU = rs01.getString("A720TRNCU");
                objRtn.A720TDOC = rs01.getString("A720TDOC");
                objRtn.A720PAX = rs01.getString("A720PAX");
                objRtn.A720TPAX = rs01.getString("A720TPAX");
                objRtn.A720RFIC = rs01.getString("A720RFIC");

                objRtn.A720FARE = rs01.getDouble("A720FARE");
                objRtn.A720ADC = rs01.getDouble("A720ADC");
                objRtn.A720ORIGEX = rs01.getDouble("A720ORIGEX");
                objRtn.A720ORCMEX = rs01.getDouble("A720ORCMEX");
                objRtn.A720ORSCEX = rs01.getDouble("A720ORSCEX");
                objRtn.A720VDSCT = rs01.getDouble("A720VDSCT");
                objRtn.A720TQ = rs01.getDouble("A720TQ");
                objRtn.A720TYQ = rs01.getDouble("A720TYQ");
                objRtn.A720ORYQEX = rs01.getDouble("A720ORYQEX");
                objRtn.A720ORIVEX = rs01.getDouble("A720ORIVEX");
                objRtn.A720MDATQ = rs01.getString("A720MDATQ");
                objRtn.A720MDAYQ = rs01.getString("A720MDAYQ");
                objRtn.A720MDADF = rs01.getString("A720MDADF");
                objRtn.A720DIFPX = rs01.getDouble("A720DIFPX");
                objRtn.A720MDAOI = rs01.getString("A720MDAOI");
                objRtn.A720OING = rs01.getDouble("A720OING");

                objRtn.A720MDAFP = rs01.getString("A720MDAFP");
                objRtn.A720TFOP = rs01.getDouble("A720TFOP");
                objRtn.A720MDATX = rs01.getString("A720MDATX");
                objRtn.A720TTAX = rs01.getDouble("A720TTAX");
                objRtn.A720MDACM = rs01.getString("A720MDACM");
                objRtn.A720TCOM = rs01.getDouble("A720TCOM");
                objRtn.A720MDATC = rs01.getString("A720MDATC");
                objRtn.A720TTXC = rs01.getDouble("A720TTXC");

                objRtn.A720MDAFA = rs01.getString("A720MDAFA");
                objRtn.A720MDAAD = rs01.getString("A720MDAAD");
                objRtn.A720MDAOR = rs01.getString("A720MDAOR");
                objRtn.A720MDDS = rs01.getString("A720MDDS");
                objRtn.A720MDATQ = rs01.getString("A720MDATQ");
                objRtn.A720MDAYQ = rs01.getString("A720MDAYQ");
                objRtn.A720STAT = rs01.getString("A720STAT");

                objRtn.ERRORDESC = rs01.getString("ERRORDESC").trim();
                objRtn.A720TKVOID = rs01.getString("A720TKVOID");
                objRtn.A720IDFIL = rs01.getString("A720IDFIL");
                objRtn.A720VRIC = rs01.getString("A720VRIC");
                objRtn.A720FLAGTN = rs01.getString("A720FLAGTN");
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0007A720Filter> loadS0007A720Grilla(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A720Filter> lstRtn = new ArrayList<>(0);
        S0007A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0007A720(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A720SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                for (int i = 1; i <= 4; i++) {
                    objRtn = new S0007A720Filter();
                    objRtn.A720MONREG = rs01.getString("A720MONREG");
                    objRtn.A720MDARV = rs01.getString("A720MDARV");
                    objRtn.TICKET = rs01.getString("A720CIA") + rs01.getString("A720FORMA") + rs01.getString("A720SERIE");
                    objRtn.CPUI = "";
                    objRtn.CUPON = i+"";
                    objRtn.CONEX = rs01.getString("A720CONEX" + i);
                    int op = i - 1;
                    objRtn.ORIGEN = rs01.getString("A720RUTA" + op);
                    objRtn.DESTINO = rs01.getString("A720RUTA" + i);
                    objRtn.CARRIER = rs01.getString("A720CARRA" + i);
                    objRtn.CLASE = rs01.getString("A720CLASE" + i);
                    objRtn.FLIGHT = rs01.getString("A720NVLO" + i);
                    objRtn.DFLIGHT = rs01.getString("A720FVLO" + i);
                    objRtn.FAREBASIS = rs01.getString("A720FBUSO" + i).trim();
                    objRtn.CPNCUR = rs01.getString("A720MONREG");
                    objRtn.CPN = rs01.getDouble("A720VALOR" + i);
                    objRtn.QCUR = rs01.getString("A720MONREG");
                    objRtn.Q = rs01.getDouble("A720Q" + i);
                    objRtn.YQCUR = rs01.getString("A720MONREG");
                    objRtn.YQ = rs01.getDouble("A720YQ" + i);
                    objRtn.A720TYQRV = rs01.getDouble("A720TYQRV");
                    objRtn.A720TTCMRV = rs01.getDouble("A720TTCMRV");
                    objRtn.A720TTSCRV = rs01.getDouble("A720TTSCRV");
                    objRtn.COMM_G = rs01.getDouble("A720PRRCM" + i);
                    objRtn.SCOMM = rs01.getDouble("A720PRSCM" + i);
                    objRtn.IVA = rs01.getDouble("A720IV" + i);
                    //objRtn.CPNLOC = rs01.getDouble("A720CPVL" + i);
                    objRtn.CPNLOC = rs01.getDouble("A720FARE" + i);
                    objRtn.A720TTIVRV = rs01.getDouble("A720TTIVRV");
                    objRtn.CARRIEROPE = rs01.getString("A720CARRO" + i);
                    objRtn.FLIGHTOPE = rs01.getString("A720NVLOO" + i);

                    if (objRtn.DESTINO.trim().length() == 0) {
                        objRtn.TICKET = "";
                        objRtn.CPUI = "";
                        objRtn.CONEX = "";
                        objRtn.ORIGEN = "";
                        objRtn.DESTINO = "";
                        objRtn.CARRIER = "";
                        objRtn.CLASE = "";
                        objRtn.FLIGHT = "";
                        objRtn.DFLIGHT = "";
                        objRtn.FAREBASIS = "";
                        objRtn.CPNCUR = "";
                        objRtn.QCUR = "";
                        objRtn.YQCUR = "";
                    }
                    if (objRtn.DESTINO.trim().length() > 0 || objRtn.CARRIER.trim().length() > 0) {
                        lstRtn.add(objRtn);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0001A713Filter> loadS0001A713(S0001A713Filter filter) throws SQLException, Exception {
        List<S0001A713Filter> lstRtn = new ArrayList<>(0);
        S0001A713Filter objRtn;
        int corrl = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL S0001A713(?,?,?,?,?)}";
        String SQLCLL01 = "{CALL SQP03459(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_AIRLINE);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FORMA);
            cstmt01.setString(4, filter.VP_SERIE);
            cstmt01.setString(5, filter.A713SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                corrl = corrl + 1;
                objRtn = new S0001A713Filter();
                objRtn.A713AIRLIN = rs01.getString("A713AIRLIN");
                objRtn.A713CIA = rs01.getString("A713CIA");
                objRtn.A713FORMA = rs01.getString("A713FORMA");
                objRtn.A713SERIE = rs01.getString("A713SERIE");
                objRtn.A713SEQ = rs01.getString("A713SEQ");
                objRtn.A713DCHEQ = rs01.getString("A713DCHEQ");
                objRtn.A713FLAG = rs01.getString("A713FLAG");
                objRtn.A713NSEQ = rs01.getInt("A713NSEQ");
                objRtn.A713CTKTC = rs01.getInt("A713CTKTC");
                objRtn.A713AGENTE = rs01.getString("A713AGENTE");
                objRtn.A713CODIT = rs01.getString("A713CODIT");
                objRtn.A713TARIFA = rs01.getDouble("A713TARIFA");
                objRtn.A713MONEDA = rs01.getString("A713MONEDA");
                objRtn.A713TRFPAG = rs01.getDouble("A713TRFPAG");
                objRtn.A713MDAPAG = rs01.getString("A713MDAPAG");
                objRtn.A713GRUPO = rs01.getString("A713GRUPO");
                objRtn.A713FECVTA = rs01.getString("A713FECVTA");
                objRtn.A713IDFIL = rs01.getString("A713IDFIL");
                objRtn.A713CUPON1 = rs01.getString("A713CUPON1").trim();
                objRtn.A713CUPON2 = rs01.getString("A713CUPON2").trim();
                objRtn.A713CUPON3 = rs01.getString("A713CUPON3").trim();
                objRtn.A713CUPON4 = rs01.getString("A713CUPON4").trim();
                objRtn.A713FARE = rs01.getDouble("A713FARE");
                objRtn.A713MDAFA = rs01.getString("A713MDAFA");
                objRtn.A713TDOC = rs01.getString("A713TDOC");
                objRtn.A713MONREG = rs01.getString("A713MONREG");
                objRtn.A713MDARV = rs01.getString("A713MDARV");
                objRtn.A713CIAI = rs01.getString("A713CIAI");
                objRtn.A713FORMAI = rs01.getString("A713FORMAI");
                objRtn.A713SERIEI = rs01.getString("A713SERIEI");
                objRtn.A713ORIG = rs01.getString("A713ORIG");
                objRtn.A713PAIS = rs01.getString("A713PAIS");
                objRtn.TICKET = rs01.getString("A713CIA") + rs01.getString("A713FORMA") + rs01.getString("A713SERIE");
                objRtn.A713CIAS = rs01.getString("A713CIAS");
                objRtn.A713FORMAS = rs01.getString("A713FORMAS");
                objRtn.A713SERIES = rs01.getString("A713SERIES");
                objRtn.TICKETAUTH = rs01.getString("A713CIAS").trim() + rs01.getString("A713FORMAS").trim() + rs01.getString("A713SERIES").trim();
                objRtn.A713MDDS = rs01.getString("A713MDDS");
                objRtn.A713VDSCT = rs01.getDouble("A713VDSCT");
                objRtn.A713TRNCU = rs01.getString("A713TRNCU");
                objRtn.A713TRNN = rs01.getString("A713TRNN");
                objRtn.A713TRNSQ = rs01.getString("A713TRNSQ");
                objRtn.A713VRIC = rs01.getString("A713VRIC");
                objRtn.A713STAT = rs01.getString("A713STAT");
                objRtn.A713MIAERR = rs01.getString("A713MIAERR");
                objRtn.ERRORDESC = objRtn.A713MIAERR.trim() + "-" + rs01.getString("ERRORDESC").trim();
                objRtn.A713REGIST = rs01.getString("A713REGIST");
                objRtn.A713FREGIS = rs01.getString("A713FREGIS");
                objRtn.A713REVISA = rs01.getString("A713REVISA");
                objRtn.A713FREVIS = rs01.getString("A713FREVIS");
                objRtn.A713TVENTA = rs01.getString("A713TVENTA");
                objRtn.A713PAIVTA = rs01.getString("A713PAIVTA");
                objRtn.A713UFORMA = rs01.getString("A713UFORMA");
                objRtn.A713TICAP = rs01.getString("A713TICAP");
                objRtn.A713TCAPAG = rs01.getDouble("A713TCAPAG");
                objRtn.A713FLAGTN = rs01.getString("A713FLAGTN");
                objRtn.A713TCAMB = rs01.getDouble("A713TCAMB");
                //Grilla
                objRtn.CUPON = corrl;//rs01.getInt("A713CUPON");
                objRtn.CONEX = rs01.getString("A713CONEX").trim();
                objRtn.CPUI = rs01.getString("A713CPUI").trim();
                objRtn.ORIGEN = rs01.getString("A713ORIGEN").trim();
                objRtn.DESTINO = rs01.getString("A713DESTINO").trim();
                objRtn.CARRIER = rs01.getString("A713CARRA").trim();
                objRtn.CLASE = rs01.getString("A713CLASE").trim();
                objRtn.FLIGHT = rs01.getString("A713NVLO").trim();
                objRtn.DFLIGHT = rs01.getString("A713FVLO").trim();
                objRtn.FAREBASIS = rs01.getString("A713FBUSO").trim();
                objRtn.CPNCUR = rs01.getString("A713MDARV").trim();
                objRtn.CPN = rs01.getDouble("A713VALOR");
                objRtn.CPNLOC = rs01.getDouble("A713CORTE");//rs01.getDouble("A713VALOL");
                objRtn.QCUR = rs01.getString("A713MDARV").trim();
                //objRtn.Q = rs01.getDouble("A713Q" + i);
                objRtn.YQCUR = rs01.getString("A713MDARV").trim();
                objRtn.YQ = rs01.getDouble("A713YQ");
                objRtn.A713TYQRV = rs01.getDouble("A713TYQRV");
                objRtn.IVA = rs01.getDouble("A713IV");
                objRtn.A713TIVRV = rs01.getDouble("A713TIVRV");
                objRtn.A713TCOMRV = rs01.getDouble("A713TCOMRV");
                objRtn.A713TSCMRV = rs01.getDouble("A713TSCMRV");
                objRtn.COMM_G = rs01.getDouble("A713PRRCM");
                objRtn.SCOMM = rs01.getDouble("A713PRSCM");
                objRtn.CARRIEROPE = rs01.getString("A713CARRA").trim();
                objRtn.FLIGHTOPE = rs01.getString("A713NVLO").trim();
                objRtn.USED = "";
                if (rs01.getInt("A713CUPON") > 0) {
                    objRtn.USED = "R";
                }
                String[] parts = rs01.getString("USOS").split("-");
                String part1 = parts[0];
                String part2 = parts[1];
                String part3 = parts[2];
                String part4 = parts[3];
                if (rs01.getInt("A713CUPON") == 1 && !(part1.equals(" "))) {
                    objRtn.USED = part1;
                }
                if (rs01.getInt("A713CUPON") == 2 && !(part2.equals(" "))) {
                    objRtn.USED = part2;
                }
                if (rs01.getInt("A713CUPON") == 3 && !(part3.equals(" "))) {
                    objRtn.USED = part3;
                }
                if (rs01.getInt("A713CUPON") == 4 && !(part4.equals(" "))) {
                    objRtn.USED = part4;
                }
                if (objRtn.CARRIER.trim().length() == 0 && rs01.getInt("A713CUPON") == 0) {
                    objRtn.TICKET = "";
                    objRtn.CPUI = "";
                    objRtn.CONEX = "";
                    objRtn.ORIGEN = "";
                    objRtn.DESTINO = "";
                    objRtn.CARRIER = "";
                    objRtn.CLASE = "";
                    objRtn.FLIGHT = "";
                    objRtn.DFLIGHT = "";
                    objRtn.FAREBASIS = "";
                    objRtn.CPNCUR = "";
                    objRtn.QCUR = "";
                    objRtn.YQCUR = "";
                    objRtn.USED = "";
                }
                /*if (objRtnlst.CARRIER.trim().length() > 0 || rs01.getString("A713CUPON" + i).trim().equals(i + "")) {
                    lstRtngrilla.add(objRtnlst);
                }*/
                //Totales
                objRtn.FOP = rs01.getDouble("A713TFOP");
                objRtn.FOPRV = rs01.getDouble("A713TFOPRV");
                objRtn.FOPBAL = rs01.getDouble("A713TFOP");
                objRtn.TAX = rs01.getDouble("A713TTAX");
                objRtn.TAXRV = rs01.getDouble("A713TTAXRV");
                objRtn.COMM = rs01.getDouble("A713TTCOM");
                objRtn.COMMRV = rs01.getDouble("A713TTCOMRV");
                objRtn.TAXCOMM = rs01.getDouble("A713TTXC");
                objRtn.TAXCOMMRV = rs01.getDouble("A713TTXCRV");
                objRtn.FOPCUR = rs01.getString("A1530MDA");
                objRtn.TAXCUR = rs01.getString("A1530MDA");
                objRtn.COMMCUR = rs01.getString("A1530MDA");
                objRtn.TAXCOMMCUR = rs01.getString("A1530MDA");
                lstRtn.add(objRtn);
                /*
                Campos que aun no se usan:
                A713TYQ A713TIV A713COMMIS A713TSCM A713RFIC A713FARERV A713HVLO A713FACT A713VALOL A713IV A713LYQ A713LIV A713LRRCM A713LRSC
                 */
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0001A713Filter> loadS0001A713Grilla(S0001A713Filter filter) throws SQLException, Exception {
        List<S0001A713Filter> lstRtn = new ArrayList<>(0);
        S0001A713Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0001A713(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_AIRLINE);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FORMA);
            cstmt01.setString(4, filter.VP_SERIE);
            cstmt01.setString(5, filter.A713SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                for (int i = 1; i <= 4; i++) {
                    objRtn = new S0001A713Filter();
                    objRtn.A713MONREG = rs01.getString("A713MONREG").trim();
                    objRtn.TICKET = rs01.getString("A713CIA").trim() + rs01.getString("A713FORMA").trim() + rs01.getString("A713SERIE").trim();
                    objRtn.CUPON1 = rs01.getString("A713CUPON1").trim();
                    objRtn.CUPON2 = rs01.getString("A713CUPON2").trim();
                    objRtn.CUPON3 = rs01.getString("A713CUPON3").trim();
                    objRtn.CUPON4 = rs01.getString("A713CUPON4").trim();
                    objRtn.CUPON = i;
                    objRtn.CONEX = rs01.getString("A713CONEX" + i).trim();
                    int op = i - 1;
                    objRtn.CPUI = rs01.getString("A713CPUI").substring(op, i).trim();
                    objRtn.ORIGEN = rs01.getString("A713RUTA" + op).trim();
                    objRtn.DESTINO = rs01.getString("A713RUTA" + i).trim();
                    objRtn.CARRIER = rs01.getString("A713CARRA" + i).trim();
                    objRtn.CLASE = rs01.getString("A713CLASE" + i).trim();
                    objRtn.FLIGHT = rs01.getString("A713NVLO" + i).trim();
                    objRtn.DFLIGHT = rs01.getString("A713FVLO" + i).trim();
                    objRtn.FAREBASIS = rs01.getString("A713FBUSO" + i).trim();
                    objRtn.CPNCUR = rs01.getString("A713MONREG").trim();
                    objRtn.CPN = rs01.getDouble("A713VALOR" + i);
                    objRtn.CPNLOC = rs01.getDouble("A713FARE" + i);//rs01.getDouble("A713VALOL" + i);
                    objRtn.QCUR = rs01.getString("A713MONREG").trim();
                    objRtn.Q = rs01.getDouble("A713Q" + i);
                    objRtn.YQCUR = rs01.getString("A713MONREG").trim();
                    objRtn.YQ = rs01.getDouble("A713YQ" + i);
                    objRtn.A713TYQRV = rs01.getDouble("A713TYQRV");
                    objRtn.IVA = rs01.getDouble("A713IV" + i);
                    objRtn.A713TIVRV = rs01.getDouble("A713TIVRV");
                    objRtn.A713TCOMRV = rs01.getDouble("A713TCOMRV");
                    objRtn.A713TSCMRV = rs01.getDouble("A713TSCMRV");
                    objRtn.COMM_G = rs01.getDouble("A713PRRCM" + i);
                    objRtn.SCOMM = rs01.getDouble("A713PRSCM" + i);
                    objRtn.CARRIEROPE = rs01.getString("A713CARRA" + i).trim();
                    objRtn.FLIGHTOPE = rs01.getString("A713NVLO" + i).trim();
                    objRtn.USED = "";
                    if (rs01.getString("A713CUPON" + i).trim().equals(i + "")) {
                        objRtn.USED = "R";
                    }
                    String[] parts = rs01.getString("USOS").split("-");
                    String part1 = parts[0];
                    String part2 = parts[1];
                    String part3 = parts[2];
                    String part4 = parts[3];
                    if (i == 1 && !(part1.equals(" "))) {
                        objRtn.USED = part1;
                    }
                    if (i == 2 && !(part2.equals(" "))) {
                        objRtn.USED = part2;
                    }
                    if (i == 3 && !(part3.equals(" "))) {
                        objRtn.USED = part3;
                    }
                    if (i == 4 && !(part4.equals(" "))) {
                        objRtn.USED = part4;
                    }
                    if (objRtn.CARRIER.trim().length() == 0 && !(rs01.getString("A713CUPON" + i).trim().equals(i + ""))) {
                        objRtn.TICKET = "";
                        objRtn.CPUI = "";
                        objRtn.CONEX = "";
                        objRtn.ORIGEN = "";
                        objRtn.DESTINO = "";
                        objRtn.CARRIER = "";
                        objRtn.CLASE = "";
                        objRtn.FLIGHT = "";
                        objRtn.DFLIGHT = "";
                        objRtn.FAREBASIS = "";
                        objRtn.CPNCUR = "";
                        objRtn.QCUR = "";
                        objRtn.YQCUR = "";
                        objRtn.USED = "";
                    }
                    if (objRtn.CARRIER.trim().length() > 0 || rs01.getString("A713CUPON" + i).trim().equals(i + "")) {
                        lstRtn.add(objRtn);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0007A720Filter> loadS0007A720Tot(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A720Filter> lstRtn = new ArrayList<>(0);
        S0007A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0007A720TOT(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.A720CIAI);
            cstmt01.setString(3, filter.A720FORMAI);
            cstmt01.setString(4, filter.A720SERIEI);
            cstmt01.setString(5, filter.A720SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0007A720Filter();
                objRtn.FOP = rs01.getDouble("FOP");
                objRtn.FOPRV = rs01.getDouble("FOPRV");
                objRtn.FOPBAL = rs01.getDouble("FOPBAL");
                objRtn.TAX = rs01.getDouble("TAX");
                objRtn.TAXRV = rs01.getDouble("TAXRV");
                objRtn.COMM = rs01.getDouble("COMM");
                objRtn.COMMRV = rs01.getDouble("COMMRV");
                objRtn.TAXCOMM = rs01.getDouble("TAXCOMM");
                objRtn.TAXCOMMRV = rs01.getDouble("TAXCOMMRV");
                objRtn.FOPCUR = rs01.getString("FOPCUR");
                objRtn.TAXCUR = rs01.getString("TAXCUR");
                objRtn.COMMCUR = rs01.getString("COMMCUR");
                objRtn.TAXCOMMCUR = rs01.getString("TAXCOMMCUR");
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0001A713Filter> S0001A713TOT(S0001A713Filter filter) throws SQLException, Exception {
        List<S0001A713Filter> lstRtn = new ArrayList<>(0);
        S0001A713Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0001A713TOT(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FORMA);
            cstmt01.setString(4, filter.VP_SERIE);
            cstmt01.setString(5, filter.A713SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0001A713Filter();
                objRtn.FOP = rs01.getDouble("FOP");
                objRtn.FOPRV = rs01.getDouble("FOPRV");
                objRtn.FOPBAL = rs01.getDouble("FOPBAL");
                objRtn.TAX = rs01.getDouble("TAX");
                objRtn.TAXRV = rs01.getDouble("TAXRV");
                objRtn.COMM = rs01.getDouble("COMM");
                objRtn.COMMRV = rs01.getDouble("COMMRV");
                objRtn.TAXCOMM = rs01.getDouble("TAXCOMM");
                objRtn.TAXCOMMRV = rs01.getDouble("TAXCOMMRV");
                objRtn.FOPCUR = rs01.getString("FOPCUR");
                objRtn.TAXCUR = rs01.getString("TAXCUR");
                objRtn.COMMCUR = rs01.getString("COMMCUR");
                objRtn.TAXCOMMCUR = rs01.getString("TAXCOMMCUR");
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<PX036S01A1531Filter> loadPX036S01A1531(PX036S01A1531Filter filter) throws SQLException, Exception {
        List<PX036S01A1531Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1531Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1531(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1531SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1531Filter();
                objRtn.A1531CCUST = rs01.getString("A1531CCUST");
                objRtn.A1531CIA = rs01.getString("A1531CIA");
                objRtn.A1531FORMA = rs01.getString("A1531FORMA");
                objRtn.A1531SERIE = rs01.getString("A1531SERIE");
                objRtn.A1531SEQ = rs01.getString("A1531SEQ");
                objRtn.A1531CORRL = rs01.getString("A1531CORRL");
                objRtn.A1531CFOP = rs01.getString("A1531CFOP");
                objRtn.A1531TFOP = rs01.getString("A1531TFOP");
                objRtn.A1531TTARJ = rs01.getString("A1531TTARJ");
                objRtn.A1531TCNTR = rs01.getString("A1531TCNTR");
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A1531MFOP = rs01.getString("A1531MFOP");
                objRtn.A1531VFOPR = rs01.getDouble("A1531VFOPR");
                objRtn.A1531MFOPR = rs01.getString("A1531MFOPR");
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                objRtn.A1531FEXP = rs01.getString("A1531FEXP");
                objRtn.A1531CAPL = rs01.getString("A1531CAPL");
                objRtn.A1531NFAC = rs01.getString("A1531NFAC");
                objRtn.A1531FFAC = rs01.getString("A1531FFAC");
                objRtn.A1531VFAC = rs01.getDouble("A1531VFAC");
                objRtn.A1531ECCB = rs01.getString("A1531ECCB");
                objRtn.A1531EXPC = rs01.getString("A1531EXPC");
                objRtn.A1531REFN = rs01.getString("A1531REFN");
                objRtn.A1531TACN = rs01.getString("A1531TACN");
                objRtn.A1531RISN = rs01.getString("A1531RISN");
                objRtn.A1531CCSQ = rs01.getString("A1531CCSQ");
                objRtn.A1531TRNC = rs01.getString("A1531TRNC");
                objRtn.A1531GRUPO = rs01.getString("A1531GRUPO");
                objRtn.A1531IDFIL = rs01.getString("A1531IDFIL");
                objRtn.A1531ST720 = rs01.getString("A1531ST720");
                objRtn.A1531ST730 = rs01.getString("A1531ST730");
                objRtn.A1531USRIN = rs01.getString("A1531USRIN");
                objRtn.A1531FECIN = rs01.getString("A1531FECIN");
                objRtn.A1531HORIN = rs01.getString("A1531HORIN");
                objRtn.A1531USRAC = rs01.getString("A1531USRAC");
                objRtn.A1531FECAC = rs01.getString("A1531FECAC");
                objRtn.A1531HORAC = rs01.getString("A1531HORAC");
                objRtn.A1531MNETR = rs01.getString("A1531MNETR");
                objRtn.A1531VNETR = rs01.getDouble("A1531VNETR");
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

    public List<PX036S01A1532Filter> loadPX036S01A1532(PX036S01A1532Filter filter) throws SQLException, Exception {
        List<PX036S01A1532Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1532Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1532(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1532SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1532Filter();
                objRtn.A1532CCUST = rs01.getString("A1532CCUST");
                objRtn.A1532CIA = rs01.getString("A1532CIA");
                objRtn.A1532FORMA = rs01.getString("A1532FORMA");
                objRtn.A1532SERIE = rs01.getString("A1532SERIE");
                objRtn.A1532SEQ = rs01.getString("A1532SEQ");
                objRtn.A1532CORRL = rs01.getString("A1532CORRL");
                objRtn.A1532CTAX = rs01.getString("A1532CTAX");
                objRtn.A1532PSTAX = rs01.getString("A1532PSTAX");
                objRtn.A1532TIPO = rs01.getString("A1532TIPO");
                objRtn.A1532TCTR = rs01.getString("A1532TCTR");
                objRtn.A1532RATE = rs01.getDouble("A1532RATE");
                objRtn.A1532VTAX = rs01.getDouble("A1532VTAX");
                objRtn.A1532MTAX = rs01.getString("A1532MTAX");
                objRtn.A1532VTAXR = rs01.getDouble("A1532VTAXR");
                objRtn.A1532MTAXR = rs01.getString("A1532MTAXR");
                objRtn.A1532CPFC = rs01.getString("A1532CPFC");
                objRtn.A1532APFC = rs01.getString("A1532APFC");
                objRtn.A1532MCF = rs01.getString("A1532MCF");
                objRtn.A1532NCMCF = rs01.getString("A1532NCMCF");
                objRtn.A1532NRFCF = rs01.getString("A1532NRFCF");
                objRtn.A1532GRUPO = rs01.getString("A1532GRUPO");
                objRtn.A1532IDFIL = rs01.getString("A1532IDFIL");
                objRtn.A1532USRIN = rs01.getString("A1532USRIN");
                objRtn.A1532FECIN = rs01.getString("A1532FECIN");
                objRtn.A1532HORIN = rs01.getString("A1532HORIN");
                objRtn.A1532USRAC = rs01.getString("A1532USRAC");
                objRtn.A1532FECAC = rs01.getString("A1532FECAC");
                objRtn.A1532HORAC = rs01.getString("A1532HORAC");
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

    public List<PX036S01A1533Filter> loadPX036S01A1533(PX036S01A1533Filter filter) throws SQLException, Exception {
        List<PX036S01A1533Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1533Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1533(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1533SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1533Filter();
                objRtn.A1533CCUST = rs01.getString("A1533CCUST");
                objRtn.A1533CIA = rs01.getString("A1533CIA");
                objRtn.A1533FORMA = rs01.getString("A1533FORMA");
                objRtn.A1533SERIE = rs01.getString("A1533SERIE");
                objRtn.A1533SEQ = rs01.getString("A1533SEQ");
                objRtn.A1533CORRL = rs01.getString("A1533CORRL");
                objRtn.A1533CCOM = rs01.getString("A1533CCOM");
                objRtn.A1533TIPO = rs01.getString("A1533TIPO");
                objRtn.A1533RATE = rs01.getDouble("A1533RATE");
                objRtn.A1533VCOM = rs01.getDouble("A1533VCOM");
                objRtn.A1533MCOM = rs01.getString("A1533MCOM");
                objRtn.A1533VCOMR = rs01.getDouble("A1533VCOMR");
                objRtn.A1533MCOMR = rs01.getString("A1533MCOMR");
                objRtn.A1533GRUPO = rs01.getString("A1533GRUPO");
                objRtn.A1533IDFIL = rs01.getString("A1533IDFIL");
                objRtn.A1533USRIN = rs01.getString("A1533USRIN");
                objRtn.A1533FECIN = rs01.getString("A1533FECIN");
                objRtn.A1533HORIN = rs01.getString("A1533HORIN");
                objRtn.A1533USRAC = rs01.getString("A1533USRAC");
                objRtn.A1533FECAC = rs01.getString("A1533FECAC");
                objRtn.A1533HORAC = rs01.getString("A1533HORAC");
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

    public List<PX036S01A1534Filter> loadPX036S01A1534(PX036S01A1534Filter filter) throws SQLException, Exception {
        List<PX036S01A1534Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1534Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1534(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1534SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1534Filter();
                objRtn.A1534CCUST = rs01.getString("A1534CCUST");
                objRtn.A1534CIA = rs01.getString("A1534CIA");
                objRtn.A1534FORMA = rs01.getString("A1534FORMA");
                objRtn.A1534SERIE = rs01.getString("A1534SERIE");
                objRtn.A1534SEQ = rs01.getString("A1534SEQ");
                objRtn.A1534CORRL = rs01.getString("A1534CORRL");
                objRtn.A1534CTCOM = rs01.getString("A1534CTCOM");
                objRtn.A1534TIPO = rs01.getString("A1534TIPO");
                objRtn.A1534RATE = rs01.getDouble("A1534RATE");
                objRtn.A1534VTXC = rs01.getDouble("A1534VTXC");
                objRtn.A1534MTXC = rs01.getString("A1534MTXC");
                objRtn.A1534VTXCR = rs01.getDouble("A1534VTXCR");
                objRtn.A1534MTXCR = rs01.getString("A1534MTXCR");
                objRtn.A1534GRUPO = rs01.getString("A1534GRUPO");
                objRtn.A1534IDFIL = rs01.getString("A1534IDFIL");
                objRtn.A1534USRIN = rs01.getString("A1534USRIN");
                objRtn.A1534FECIN = rs01.getString("A1534FECIN");
                objRtn.A1534HORIN = rs01.getString("A1534HORIN");
                objRtn.A1534USRAC = rs01.getString("A1534USRAC");
                objRtn.A1534FECAC = rs01.getString("A1534FECAC");
                objRtn.A1534HORAC = rs01.getString("A1534HORAC");
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

    public List<PX036S01A1721Filter> loadPX036S01A1721(PX036S01A1721Filter filter) throws SQLException, Exception {
        List<PX036S01A1721Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1721Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1721(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1721SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1721Filter();
                objRtn.A1721CCUST = rs01.getString("A1721CCUST");
                objRtn.A1721CIA = rs01.getString("A1721CIA");
                objRtn.A1721FORMA = rs01.getString("A1721FORMA");
                objRtn.A1721SERIE = rs01.getString("A1721SERIE");
                objRtn.A1721SEQ = rs01.getString("A1721SEQ");
                objRtn.A1721TIPO = rs01.getString("A1721TIPO");
                objRtn.A1721CORRL = rs01.getString("A1721CORRL");
                objRtn.A1721FRCA = rs01.getString("A1721FRCA");
                objRtn.A1721GRUPO = rs01.getString("A1721GRUPO");
                objRtn.A1721IDFIL = rs01.getString("A1721IDFIL");
                objRtn.A1721USRIN = rs01.getString("A1721USRIN");
                objRtn.A1721FECIN = rs01.getString("A1721FECIN");
                objRtn.A1721HORIN = rs01.getString("A1721HORIN");
                objRtn.A1721USRAC = rs01.getString("A1721USRAC");
                objRtn.A1721FECAC = rs01.getString("A1721FECAC");
                objRtn.A1721HORAC = rs01.getString("A1721HORAC");
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

    public List<S0001A1730Filter> loadBalance(S0001A1730Filter filter) throws SQLException, Exception {
        List<S0001A1730Filter> lstRtn = new ArrayList<>(0);
        S0001A1730Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL NEWOLDA1730(?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            //cstmt01.setString(5, filter.A1730SQ720);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0001A1730Filter();
                objRtn.A1730CCUST = rs01.getString("A1730CCUST");
                objRtn.A1730CI720 = rs01.getString("A1730CI720");
                objRtn.A1730FO720 = rs01.getString("A1730FO720");
                objRtn.A1730SE720 = rs01.getString("A1730SE720");
                objRtn.A1730SQ720 = rs01.getString("A1730SQ720");
                objRtn.A1730FLAG = rs01.getString("A1730FLAG");
                objRtn.A1730CIA = rs01.getString("A1730CIA");
                objRtn.A1730FORMA = rs01.getString("A1730FORMA");
                objRtn.A1730SERIE = rs01.getString("A1730SERIE");
                objRtn.A1730MDAOR = rs01.getString("A1730MDAOR");
                objRtn.A1730CORRL = rs01.getString("A1730CORRL");
                objRtn.A1730FCAMB = rs01.getString("A1730FCAMB");
                objRtn.A1730TCAMB = rs01.getDouble("A1730TCAMB");
                objRtn.A1730MDALC = rs01.getString("A1730MDALC");
                objRtn.A1730MDARV = rs01.getString("A1730MDARV");
                objRtn.A1730VFAR = rs01.getDouble("A1730VFAR");
                objRtn.A1730VFARR = rs01.getDouble("A1730VFARR");
                objRtn.A1730VCOM = rs01.getDouble("A1730VCOM");
                objRtn.A1730VCOMR = rs01.getDouble("A1730VCOMR");
                objRtn.A1730VSCM = rs01.getDouble("A1730VSCM");
                objRtn.A1730VSCMR = rs01.getDouble("A1730VSCMR");
                objRtn.A1730VTXC = rs01.getDouble("A1730VTXC");
                objRtn.A1730VTXCR = rs01.getDouble("A1730VTXCR");
                objRtn.A1730CTX1 = rs01.getString("A1730CTX1");
                objRtn.A1730ATX1 = rs01.getString("A1730ATX1");
                objRtn.A1730VTX1 = rs01.getDouble("A1730VTX1");
                objRtn.A1730RTX1 = rs01.getDouble("A1730RTX1");
                objRtn.A1730VTR1 = rs01.getDouble("A1730VTR1");
                objRtn.A1730CTX2 = rs01.getString("A1730CTX2");
                objRtn.A1730ATX2 = rs01.getString("A1730ATX2");
                objRtn.A1730VTX2 = rs01.getDouble("A1730VTX2");
                objRtn.A1730RTX2 = rs01.getDouble("A1730RTX2");
                objRtn.A1730VTR2 = rs01.getDouble("A1730VTR2");
                objRtn.A1730CTX3 = rs01.getString("A1730CTX3");
                objRtn.A1730ATX3 = rs01.getString("A1730ATX3");
                objRtn.A1730VTX3 = rs01.getDouble("A1730VTX3");
                objRtn.A1730RTX3 = rs01.getDouble("A1730RTX3");
                objRtn.A1730VTR3 = rs01.getDouble("A1730VTR3");
                objRtn.A1730CTX4 = rs01.getString("A1730CTX4");
                objRtn.A1730ATX4 = rs01.getString("A1730ATX4");
                objRtn.A1730VTX4 = rs01.getDouble("A1730VTX4");
                objRtn.A1730RTX4 = rs01.getDouble("A1730RTX4");
                objRtn.A1730VTR4 = rs01.getDouble("A1730VTR4");
                objRtn.A1730CTX5 = rs01.getString("A1730CTX5");
                objRtn.A1730ATX5 = rs01.getString("A1730ATX5");
                objRtn.A1730VTX5 = rs01.getDouble("A1730VTX5");
                objRtn.A1730RTX5 = rs01.getDouble("A1730RTX5");
                objRtn.A1730VTR5 = rs01.getDouble("A1730VTR5");
                objRtn.A1730CTX6 = rs01.getString("A1730CTX6");
                objRtn.A1730ATX6 = rs01.getString("A1730ATX6");
                objRtn.A1730VTX6 = rs01.getDouble("A1730VTX6");
                objRtn.A1730RTX6 = rs01.getDouble("A1730RTX6");
                objRtn.A1730VTR6 = rs01.getDouble("A1730VTR6");
                objRtn.A1730CTX7 = rs01.getString("A1730CTX7");
                objRtn.A1730ATX7 = rs01.getString("A1730ATX7");
                objRtn.A1730VTX7 = rs01.getDouble("A1730VTX7");
                objRtn.A1730RTX7 = rs01.getDouble("A1730RTX7");
                objRtn.A1730VTR7 = rs01.getDouble("A1730VTR7");
                objRtn.A1730CTX8 = rs01.getString("A1730CTX8");
                objRtn.A1730ATX8 = rs01.getString("A1730ATX8");
                objRtn.A1730VTX8 = rs01.getDouble("A1730VTX8");
                objRtn.A1730RTX8 = rs01.getDouble("A1730RTX8");
                objRtn.A1730VTR8 = rs01.getDouble("A1730VTR8");
                objRtn.A1730CTX9 = rs01.getString("A1730CTX9");
                objRtn.A1730ATX9 = rs01.getString("A1730ATX9");
                objRtn.A1730VTX9 = rs01.getDouble("A1730VTX9");
                objRtn.A1730RTX9 = rs01.getDouble("A1730RTX9");
                objRtn.A1730VTR9 = rs01.getDouble("A1730VTR9");
                objRtn.A1730CTX10 = rs01.getString("A1730CTX10");
                objRtn.A1730ATX10 = rs01.getString("A1730ATX10");
                objRtn.A1730VTX10 = rs01.getDouble("A1730VTX10");
                objRtn.A1730RTX10 = rs01.getDouble("A1730RTX10");
                objRtn.A1730VTR10 = rs01.getDouble("A1730VTR10");
                objRtn.A1730CTX11 = rs01.getString("A1730CTX11");
                objRtn.A1730ATX11 = rs01.getString("A1730ATX11");
                objRtn.A1730VTX11 = rs01.getDouble("A1730VTX11");
                objRtn.A1730RTX11 = rs01.getDouble("A1730RTX11");
                objRtn.A1730VTR11 = rs01.getDouble("A1730VTR11");
                objRtn.A1730CTX12 = rs01.getString("A1730CTX12");
                objRtn.A1730ATX12 = rs01.getString("A1730ATX12");
                objRtn.A1730VTX12 = rs01.getDouble("A1730VTX12");
                objRtn.A1730RTX12 = rs01.getDouble("A1730RTX12");
                objRtn.A1730VTR12 = rs01.getDouble("A1730VTR12");
                objRtn.A1730CTX13 = rs01.getString("A1730CTX13");
                objRtn.A1730ATX13 = rs01.getString("A1730ATX13");
                objRtn.A1730VTX13 = rs01.getDouble("A1730VTX13");
                objRtn.A1730RTX13 = rs01.getDouble("A1730RTX13");
                objRtn.A1730VTR13 = rs01.getDouble("A1730VTR13");
                objRtn.A1730CTX14 = rs01.getString("A1730CTX14");
                objRtn.A1730ATX14 = rs01.getString("A1730ATX14");
                objRtn.A1730VTX14 = rs01.getDouble("A1730VTX14");
                objRtn.A1730RTX14 = rs01.getDouble("A1730RTX14");
                objRtn.A1730VTR14 = rs01.getDouble("A1730VTR14");
                objRtn.A1730CTX15 = rs01.getString("A1730CTX15");
                objRtn.A1730ATX15 = rs01.getString("A1730ATX15");
                objRtn.A1730VTX15 = rs01.getDouble("A1730VTX15");
                objRtn.A1730RTX15 = rs01.getDouble("A1730RTX15");
                objRtn.A1730VTR15 = rs01.getDouble("A1730VTR15");
                objRtn.A1730CTX16 = rs01.getString("A1730CTX16");
                objRtn.A1730ATX16 = rs01.getString("A1730ATX16");
                objRtn.A1730VTX16 = rs01.getDouble("A1730VTX16");
                objRtn.A1730RTX16 = rs01.getDouble("A1730RTX16");
                objRtn.A1730VTR16 = rs01.getDouble("A1730VTR16");
                objRtn.A1730IND = rs01.getString("A1730IND");
                objRtn.A1730GRUPO = rs01.getString("A1730GRUPO");
                objRtn.A1730IDFIL = rs01.getString("A1730IDFIL");
                objRtn.CANTIDAD = rs01.getInt("CANT");
                objRtn.A1730FLAG = rs01.getString("A1730FLAG");
                switch (objRtn.A1730FLAG) {
                    case "O":
                        objRtn.A1730FLAG = "OLD";
                        objRtn.TKT = objRtn.A1730CIA + objRtn.A1730FORMA + objRtn.A1730SERIE;
                        break;
                    case "X":
                        objRtn.A1730FLAG = "DIF";
                        objRtn.TKT = objRtn.A1730CI720 + objRtn.A1730FO720 + objRtn.A1730SE720;
                        break;
                    default:
                        objRtn.A1730FLAG = "NEW";
                        objRtn.TKT = objRtn.A1730CI720 + objRtn.A1730FO720 + objRtn.A1730SE720;
                        break;
                }
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

    public List<PX036S01A1721Filter> loadReference(PX036S01A1721Filter filter) throws SQLException, Exception {
        List<PX036S01A1721Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1721Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S02A1721(?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1721SEQ);
            cstmt01.setString(6, filter.IN_TIPO);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1721Filter();
                objRtn.A1721FRCA = rs01.getString("A1721FRCA");
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

    public List<PX036S01A1731Filter> loadPX036S01A1731(PX036S01A1731Filter filter) throws SQLException, Exception {
        List<PX036S01A1731Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1731Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1731(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1731SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1731Filter();
                objRtn.A1731CCUST = rs01.getString("A1731CCUST");
                objRtn.A1731CIA = rs01.getString("A1731CIA");
                objRtn.A1731FORMA = rs01.getString("A1731FORMA");
                objRtn.A1731SERIE = rs01.getString("A1731SERIE");
                objRtn.A1731SEQ = rs01.getString("A1731SEQ");
                objRtn.A1731CORRL = rs01.getString("A1731CORRL");
                objRtn.A1731CFOP = rs01.getString("A1731CFOP");
                objRtn.A1731TFOP = rs01.getString("A1731TFOP");
                objRtn.A1731TTARJ = rs01.getString("A1731TTARJ");
                objRtn.A1731TCNTR = rs01.getString("A1731TCNTR");
                objRtn.A1731VFOP = rs01.getDouble("A1731VFOP");
                objRtn.A1731MFOP = rs01.getString("A1731MFOP");
                objRtn.A1731VFOPR = rs01.getDouble("A1731VFOPR");
                objRtn.A1731MFOPR = rs01.getString("A1731MFOPR");
                objRtn.A1731NREF = rs01.getString("A1731NREF");
                objRtn.A1731FEXP = rs01.getString("A1731FEXP");
                objRtn.A1731CAPL = rs01.getString("A1731CAPL");
                objRtn.A1731NFAC = rs01.getString("A1731NFAC");
                objRtn.A1731FFAC = rs01.getString("A1731FFAC");
                objRtn.A1731VFAC = rs01.getDouble("A1731VFAC");
                objRtn.A1731ECCB = rs01.getString("A1731ECCB");
                objRtn.A1731EXPC = rs01.getString("A1731EXPC");
                objRtn.A1731REFN = rs01.getString("A1731REFN");
                objRtn.A1731TACN = rs01.getString("A1731TACN");
                objRtn.A1731RISN = rs01.getString("A1731RISN");
                objRtn.A1731CCSQ = rs01.getString("A1731CCSQ");
                objRtn.A1731TRNC = rs01.getString("A1731TRNC");
                objRtn.A1731GRUPO = rs01.getString("A1731GRUPO");
                objRtn.A1731IDFIL = rs01.getString("A1731IDFIL");
                objRtn.A1731ST720 = rs01.getString("A1731ST720");
                objRtn.A1731ST730 = rs01.getString("A1731ST730");
                objRtn.A1731USRIN = rs01.getString("A1731USRIN");
                objRtn.A1731FECIN = rs01.getString("A1731FECIN");
                objRtn.A1731HORIN = rs01.getString("A1731HORIN");
                objRtn.A1731USRAC = rs01.getString("A1731USRAC");
                objRtn.A1731FECAC = rs01.getString("A1731FECAC");
                objRtn.A1731HORAC = rs01.getString("A1731HORAC");
                objRtn.A1731MNETR = rs01.getString("A1731MNETR");
                objRtn.A1731VNETR = rs01.getDouble("A1731VNETR");
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

    public List<PX036S01A1732Filter> loadPX036S01A1732(PX036S01A1732Filter filter) throws SQLException, Exception {
        List<PX036S01A1732Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1732Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1732(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1732SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1732Filter();
                objRtn.A1732CCUST = rs01.getString("A1732CCUST");
                objRtn.A1732CIA = rs01.getString("A1732CIA");
                objRtn.A1732FORMA = rs01.getString("A1732FORMA");
                objRtn.A1732SERIE = rs01.getString("A1732SERIE");
                objRtn.A1732SEQ = rs01.getString("A1732SEQ");
                objRtn.A1732CORRL = rs01.getString("A1732CORRL");
                objRtn.A1732CTAX = rs01.getString("A1732CTAX");
                objRtn.A1732PSTAX = rs01.getString("A1732PSTAX");
                objRtn.A1732TIPO = rs01.getString("A1732TIPO");
                objRtn.A1732TCTR = rs01.getString("A1732TCTR");
                objRtn.A1732RATE = rs01.getDouble("A1732RATE");
                objRtn.A1732VTAX = rs01.getDouble("A1732VTAX");
                objRtn.A1732MTAX = rs01.getString("A1732MTAX");
                objRtn.A1732VTAXR = rs01.getDouble("A1732VTAXR");
                objRtn.A1732MTAXR = rs01.getString("A1732MTAXR");
                objRtn.A1732CPFC = rs01.getString("A1732CPFC");
                objRtn.A1732APFC = rs01.getString("A1732APFC");
                objRtn.A1732MCF = rs01.getString("A1732MCF");
                objRtn.A1732NCMCF = rs01.getString("A1732NCMCF");
                objRtn.A1732NRFCF = rs01.getString("A1732NRFCF");
                objRtn.A1732GRUPO = rs01.getString("A1732GRUPO");
                objRtn.A1732IDFIL = rs01.getString("A1732IDFIL");
                objRtn.A1732USRIN = rs01.getString("A1732USRIN");
                objRtn.A1732FECIN = rs01.getString("A1732FECIN");
                objRtn.A1732HORIN = rs01.getString("A1732HORIN");
                objRtn.A1732USRAC = rs01.getString("A1732USRAC");
                objRtn.A1732FECAC = rs01.getString("A1732FECAC");
                objRtn.A1732HORAC = rs01.getString("A1732HORAC");
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

    public List<PX036S01A1733Filter> loadPX036S01A1733(PX036S01A1733Filter filter) throws SQLException, Exception {
        List<PX036S01A1733Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1733Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1733(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1733SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1733Filter();
                objRtn.A1733CCUST = rs01.getString("A1733CCUST");
                objRtn.A1733CIA = rs01.getString("A1733CIA");
                objRtn.A1733FORMA = rs01.getString("A1733FORMA");
                objRtn.A1733SERIE = rs01.getString("A1733SERIE");
                objRtn.A1733SEQ = rs01.getString("A1733SEQ");
                objRtn.A1733CORRL = rs01.getString("A1733CORRL");
                objRtn.A1733CCOM = rs01.getString("A1733CCOM");
                objRtn.A1733TIPO = rs01.getString("A1733TIPO");
                objRtn.A1733RATE = rs01.getDouble("A1733RATE");
                objRtn.A1733VCOM = rs01.getDouble("A1733VCOM");
                objRtn.A1733MCOM = rs01.getString("A1733MCOM");
                objRtn.A1733VCOMR = rs01.getDouble("A1733VCOMR");
                objRtn.A1733MCOMR = rs01.getString("A1733MCOMR");
                objRtn.A1733GRUPO = rs01.getString("A1733GRUPO");
                objRtn.A1733IDFIL = rs01.getString("A1733IDFIL");
                objRtn.A1733USRIN = rs01.getString("A1733USRIN");
                objRtn.A1733FECIN = rs01.getString("A1733FECIN");
                objRtn.A1733HORIN = rs01.getString("A1733HORIN");
                objRtn.A1733USRAC = rs01.getString("A1733USRAC");
                objRtn.A1733FECAC = rs01.getString("A1733FECAC");
                objRtn.A1733HORAC = rs01.getString("A1733HORAC");
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

    public List<PX036S01A1734Filter> loadPX036S01A1734(PX036S01A1734Filter filter) throws SQLException, Exception {
        List<PX036S01A1734Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1734Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1734(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1734SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1734Filter();
                objRtn.A1734CCUST = rs01.getString("A1734CCUST");
                objRtn.A1734CIA = rs01.getString("A1734CIA");
                objRtn.A1734FORMA = rs01.getString("A1734FORMA");
                objRtn.A1734SERIE = rs01.getString("A1734SERIE");
                objRtn.A1734SEQ = rs01.getString("A1734SEQ");
                objRtn.A1734CORRL = rs01.getString("A1734CORRL");
                objRtn.A1734CTCOM = rs01.getString("A1734CTCOM");
                objRtn.A1734TIPO = rs01.getString("A1734TIPO");
                objRtn.A1734RATE = rs01.getDouble("A1734RATE");
                objRtn.A1734VTXC = rs01.getDouble("A1734VTXC");
                objRtn.A1734MTXC = rs01.getString("A1734MTXC");
                objRtn.A1734VTXCR = rs01.getDouble("A1734VTXCR");
                objRtn.A1734MTXCR = rs01.getString("A1734MTXCR");
                objRtn.A1734GRUPO = rs01.getString("A1734GRUPO");
                objRtn.A1734IDFIL = rs01.getString("A1734IDFIL");
                objRtn.A1734USRIN = rs01.getString("A1734USRIN");
                objRtn.A1734FECIN = rs01.getString("A1734FECIN");
                objRtn.A1734HORIN = rs01.getString("A1734HORIN");
                objRtn.A1734USRAC = rs01.getString("A1734USRAC");
                objRtn.A1734FECAC = rs01.getString("A1734FECAC");
                objRtn.A1734HORAC = rs01.getString("A1734HORAC");
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

    public List<PX036S01A1735Filter> loadPX036S01A1735(PX036S01A1735Filter filter) throws SQLException, Exception {
        List<PX036S01A1735Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1735Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.PX036S01A1735(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1735SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1735Filter();
                objRtn.A1735CCUST = rs01.getString("A1735CCUST");
                objRtn.A1735CIA = rs01.getString("A1735CIA");
                objRtn.A1735FORMA = rs01.getString("A1735FORMA");
                objRtn.A1735SERIE = rs01.getString("A1735SERIE");
                objRtn.A1735SEQ = rs01.getString("A1735SEQ");
                objRtn.A1735TIPO = rs01.getString("A1735TIPO");
                objRtn.A1735CORRL = rs01.getString("A1735CORRL");
                objRtn.A1735FRCA = rs01.getString("A1735FRCA").trim();
                objRtn.A1735GRUPO = rs01.getString("A1735GRUPO");
                objRtn.A1735IDFIL = rs01.getString("A1735IDFIL");
                objRtn.A1735USRIN = rs01.getString("A1735USRIN");
                objRtn.A1735FECIN = rs01.getString("A1735FECIN");
                objRtn.A1735HORIN = rs01.getString("A1735HORIN");
                objRtn.A1735USRAC = rs01.getString("A1735USRAC");
                objRtn.A1735FECAC = rs01.getString("A1735FECAC");
                objRtn.A1735HORAC = rs01.getString("A1735HORAC");
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

    public List<PX036S01A1735Filter> loadReferenceRfnd(PX036S01A1735Filter filter) throws SQLException, Exception {
        List<PX036S01A1735Filter> lstRtn = new ArrayList<>(0);
        PX036S01A1735Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S02A1735(?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1735SEQ);
            cstmt01.setString(6, filter.IN_TIPO);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1735Filter();
                objRtn.A1735FRCA = rs01.getString("A1735FRCA");
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

    public List<S0007A720Filter> loadEMD(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A720Filter> lstRtn = new ArrayList<>(0);
        S0007A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0008A720(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.A720CIAI);
            cstmt01.setString(3, filter.A720FORMAI);
            cstmt01.setString(4, filter.A720SERIEI);
            cstmt01.setString(5, filter.A720SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                for (int i = 1; i <= 4; i++) {
                    objRtn = new S0007A720Filter();
                    objRtn.TKTEMD = rs01.getString("A720CIA") + rs01.getString("A720FORMA") + rs01.getString("A720SERIE");
                    objRtn.CUPONEMD = i;
                    objRtn.RFIC = rs01.getString("A720RFIC");
                    objRtn.RFIS = rs01.getString("A720RFIS" + i);
                    objRtn.COST = rs01.getDouble("A720CPVL" + i);
                    objRtn.TAXVALUE = rs01.getDouble("A720TAXEM" + i);
                    objRtn.TAXCURR = rs01.getString("A720TAXMD" + i);
                    objRtn.TKTCNX = rs01.getString("A720CIACX" + i) + rs01.getString("A720FORCX" + i) + rs01.getString("A720SERCX" + i);
                    objRtn.CUPONCNX = rs01.getString("A720CPNCX" + i);
                    if (objRtn.RFIS.trim().length() == 0) {
                        objRtn.TKTEMD = "";
                        objRtn.RFIC = "";
                        objRtn.RFIS = "";
                        objRtn.TAXCURR = "";
                        objRtn.TKTCNX = "";
                    } else {
                        lstRtn.add(objRtn);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0001A713Filter> loadEMDRfnd(S0001A713Filter filter) throws SQLException, Exception {
        List<S0001A713Filter> lstRtn = new ArrayList<>(0);
        S0001A713Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0008A713(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FORMA);
            cstmt01.setString(4, filter.VP_SERIE);
            cstmt01.setString(5, filter.A713SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                for (int i = 1; i <= 1; i++) { //Por el momento RFND solo tiene 1 Cupon EMD
                    objRtn = new S0001A713Filter();
                    objRtn.TKTEMD = rs01.getString("A713CIA") + rs01.getString("A713FORMA") + rs01.getString("A713SERIE");
                    objRtn.CUPONEMD = i;
                    objRtn.RFIC = rs01.getString("A713RFIC");
                    objRtn.RFIS = rs01.getString("A713RFIS");
                    if (objRtn.RFIS.trim().length() == 0) {
                        objRtn.TKTEMD = "";
                        objRtn.RFIC = "";
                        objRtn.RFIS = "";
                        objRtn.TKTCNX = "";
                    } else {
                        lstRtn.add(objRtn);
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<S0007A730Filter> loadExchange(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A730Filter> lstRtn = new ArrayList<>(0);
        S0007A730Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0007A730(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.A720CIAI);
            cstmt01.setString(3, filter.A720FORMAI);
            cstmt01.setString(4, filter.A720SERIEI);
            cstmt01.setString(5, filter.A720SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0007A730Filter();
                objRtn.A730CIA = rs01.getString("A730CIA");
                objRtn.DOCUMENTO = rs01.getString("A730FORMA") + rs01.getString("A730SERIE");
                objRtn.CUPON = rs01.getString("A730CUPON1") + rs01.getString("A730CUPON2") + rs01.getString("A730CUPON3") + rs01.getString("A730CUPON4");
                objRtn.CNJ = rs01.getString("A730FLAG") + rs01.getString("A730NSEQ");
                objRtn.A730MONREG = rs01.getString("A730MONREG");
                objRtn.VALUE = 0.00;
                if (!rs01.getString("A730CUPON1").trim().isEmpty()) {
                    switch (Integer.parseInt(rs01.getString("A730CUPON1"))) {
                        case 1:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR1");
                            break;
                        case 2:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR2");
                            break;
                        case 3:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR3");
                            break;
                        case 4:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR4");
                            break;
                    }
                }
                if (!rs01.getString("A730CUPON2").trim().isEmpty()) {
                    switch (Integer.parseInt(rs01.getString("A730CUPON2"))) {
                        case 1:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR1");
                            break;
                        case 2:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR2");
                            break;
                        case 3:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR3");
                            break;
                        case 4:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR4");
                            break;
                    }
                }
                if (!rs01.getString("A730CUPON3").trim().isEmpty()) {
                    switch (Integer.parseInt(rs01.getString("A730CUPON3"))) {
                        case 1:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR1");
                            break;
                        case 2:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR2");
                            break;
                        case 3:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR3");
                            break;
                        case 4:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR4");
                            break;
                    }
                }
                if (!rs01.getString("A730CUPON4").trim().isEmpty()) {
                    switch (Integer.parseInt(rs01.getString("A730CUPON4"))) {
                        case 1:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR1");
                            break;
                        case 2:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR2");
                            break;
                        case 3:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR3");
                            break;
                        case 4:
                            objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR4");
                            break;
                    }
                }
                objRtn.DOCUMENTOFAT = rs01.getString("A730FORMAI") + rs01.getString("A730SERIEI");
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<S0001A714Filter> loadS0001A714(S0001A714Filter filter) throws SQLException, Exception {
        List<S0001A714Filter> lstRtn = new ArrayList<>(0);
        S0001A714Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0001A714(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_AIRLINE);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FORMA);
            cstmt01.setString(4, filter.VP_SERIE);
            cstmt01.setString(5, filter.A714SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                for (int i = 1; i <= 1; i++) {
                    objRtn = new S0001A714Filter();
                    objRtn.A714CIA = rs01.getString("A714CIA");
                    objRtn.A714FORMA = rs01.getString("A714FORMA");
                    objRtn.A714SERIE = rs01.getString("A714SERIE");
                    objRtn.A714DCHEQ = rs01.getString("A714DCHEQ");
                    objRtn.A714GRUPO = rs01.getString("A714GRUPO");
                    objRtn.A714IDFIL = rs01.getString("A714IDFIL");
                    objRtn.A714ORIG = rs01.getString("A714ORIG");
                    objRtn.A714PAIS = rs01.getString("A714PAIS");
                    objRtn.A714TRNCU = rs01.getString("A714TRNCU");
                    objRtn.A714TRNCO = rs01.getString("A714TRNCO");
                    objRtn.A714TDOC = rs01.getString("A714TDOC");
                    objRtn.A714FECVTA = rs01.getString("A714FECVTA");
                    objRtn.A714PAIVTA = rs01.getString("A714PAIVTA");
                    objRtn.A714CIUVTA = rs01.getString("A714CIUVTA");
                    objRtn.A714AGENTE = rs01.getString("A714AGENTE");
                    objRtn.A714STAT = rs01.getString("A714STAT");
                    objRtn.A714MIAERR = rs01.getString("A714MIAERR");
                    objRtn.ERRORDESC = rs01.getString("ERRORDESC");
                    objRtn.A714CFOP = rs01.getString("A714CFOP");
                    objRtn.A714MDAFP = rs01.getString("A714MDAFP");
                    objRtn.A714VFOP = rs01.getDouble("A714VFOP");
                    objRtn.A714MNETR = rs01.getString("A714MNETR");
                    objRtn.A714VNETR = rs01.getDouble("A714VNETR");
                    objRtn.A714MDAFA = rs01.getString("A714MDAFA");
                    objRtn.A714FARE = rs01.getDouble("A714FARE");
                    objRtn.A714CTAX = rs01.getString("A714CTAX");
                    objRtn.A714MDATX = rs01.getString("A714MDATX");
                    objRtn.A714TTAX = rs01.getDouble("A714TTAX");
                    objRtn.A714MDACOM = rs01.getString("A714MDACOM");
                    objRtn.A714COMMIS = rs01.getDouble("A714COMMIS");
                    objRtn.A714MDACM = rs01.getString("A714MDACM");
                    objRtn.A714TSCM = rs01.getDouble("A714TSCM");
                    objRtn.A714MDATC = rs01.getString("A714MDATC");
                    objRtn.A714TTXC = rs01.getDouble("A714TTXC");
                    objRtn.A714VNTRR = rs01.getDouble("A714VNTRR");
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public S0001A1530Filter setS0003A1530(S0001A1530Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PRAXIS.S0003A1530(?,?,?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(6, Types.VARCHAR);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A1530GRUPO);
            cstmt.setString(3, filter.A1530TICAP);
            cstmt.setString(4, filter.A1530IDFIL);
            cstmt.setString(5, session.getUserView().getUserInfo().USR);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(6);
            filter.dbException.MESSAGE = cstmt.getString(7);
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public List<PX038S02A720Filter> getdetailloadErrorTKT(PX038S02A720Filter filter) throws SQLException, Exception {
        List<PX038S02A720Filter> lstRtn = new ArrayList<PX038S02A720Filter>(0);
        PX038S02A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.PX038S03A720(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_GRUPO);
            cstmt01.setString(4, filter.IN_TRANSACTION);
            cstmt01.setString(5, filter.IN_ERROR);
            cstmt01.setString(6, filter.DOCUMENTO);

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
                objRtn = new PX038S02A720Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A720CIA = rs01.getString("A720CIA");
                objRtn.DOCUMENTO = rs01.getString("DOCUMENTO");
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                objRtn.CNJ = rs01.getString("CNJ");
                objRtn.A720TDOC = rs01.getString("A720TDOC");
                objRtn.A720UFORMA = rs01.getString("A720UFORMA");
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MDAPAG = rs01.getString("A720MDAPAG");
                objRtn.A720TRFPAG = rs01.getDouble("A720TRFPAG");
                objRtn.A720MIAERR = rs01.getString("A720MIAERR");
                objRtn.A720AIRLIN = rs01.getString("A720AIRLIN");
                objRtn.A720GRUPO = rs01.getString("A720GRUPO");
                objRtn.A720STAT = rs01.getString("A720STAT");
                objRtn.A720TRNCU = rs01.getString("A720TRNCU");
                objRtn.A720MDAAD = rs01.getString("A720MDAAD");
                objRtn.A720ADC = rs01.getDouble("A720ADC");
                objRtn.A720SEQ = rs01.getString("A720SEQ");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<PX038S02A720Filter> getdetailloadErrorRFND(PX038S02A720Filter filter) throws SQLException, Exception {
        List<PX038S02A720Filter> lstRtn = new ArrayList<PX038S02A720Filter>(0);
        PX038S02A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.PX038S03A713(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_GRUPO);
            cstmt01.setString(4, filter.IN_TRANSACTION);
            cstmt01.setString(5, filter.IN_ERROR);
            cstmt01.setString(6, filter.DOCUMENTO);

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
                objRtn = new PX038S02A720Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A720CIA = rs01.getString("A713CIA");
                objRtn.DOCUMENTO = rs01.getString("DOCUMENTO");
                objRtn.A720FECVTA = rs01.getString("A713FECVTA");
                objRtn.CNJ = rs01.getString("CNJ");
                objRtn.A720TDOC = rs01.getString("A713TDOC");
                // objRtn.A720UFORMA = rs01.getString("A720UFORMA");
                objRtn.A720MONEDA = rs01.getString("A713MONEDA");
                objRtn.A720TARIFA = rs01.getDouble("A713TARIFA");
                objRtn.A720MDAPAG = rs01.getString("A713MDAPAG");
                objRtn.A720TRFPAG = rs01.getDouble("A713TRFPAG");
                objRtn.A720MIAERR = rs01.getString("A713MIAERR");
                objRtn.A720AIRLIN = rs01.getString("A713AIRLIN");
                objRtn.A720GRUPO = rs01.getString("A713GRUPO");
                objRtn.A720STAT = rs01.getString("A713STAT");
                objRtn.A720TRNCU = rs01.getString("A713TRNCU");

                objRtn.A720MDAAD = rs01.getString("CURADC");
                objRtn.A720ADC = rs01.getDouble("ADC");
                objRtn.A720SEQ = rs01.getString("A713SEQ");
                objRtn.A720CUPON1 = rs01.getString("A713CUPON1");
                objRtn.A720CUPON2 = rs01.getString("A713CUPON2");
                objRtn.A720CUPON3 = rs01.getString("A713CUPON3");
                objRtn.A720CUPON4 = rs01.getString("A713CUPON4");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public List<PX038S02A720Filter> getdetailloadErrorADMACM(PX038S02A720Filter filter) throws SQLException, Exception {
        List<PX038S02A720Filter> lstRtn = new ArrayList<PX038S02A720Filter>(0);
        PX038S02A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.PX038S03A714(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_GRUPO);
            cstmt01.setString(4, filter.IN_TRANSACTION);
            cstmt01.setString(5, filter.IN_ERROR);
            cstmt01.setString(6, filter.DOCUMENTO);

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
                objRtn = new PX038S02A720Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A720CIA = rs01.getString("A714CIA");
                objRtn.DOCUMENTO = rs01.getString("DOCUMENTO");
                objRtn.A720FECVTA = rs01.getString("A714FECVTA");
                objRtn.CNJ = rs01.getString("CNJ");
                objRtn.A720TDOC = rs01.getString("A714TDOC");
                // objRtn.A720UFORMA = rs01.getString("A720UFORMA");
                objRtn.A720MONEDA = rs01.getString("A714MDAFA");
                objRtn.A720TARIFA = rs01.getDouble("A714FARE");
                objRtn.A720MDAPAG = rs01.getString("A714MDAPAG");
                objRtn.A720TRFPAG = rs01.getDouble("A714TRFPAG");
                objRtn.A720MIAERR = rs01.getString("A714MIAERR");
                objRtn.A720AIRLIN = rs01.getString("A714AIRLIN");
                objRtn.A720GRUPO = rs01.getString("A714GRUPO");
                objRtn.A720STAT = rs01.getString("A714STAT");
                objRtn.A720TRNCU = rs01.getString("A714TRNCU");

                objRtn.A720MDAAD = rs01.getString("A714MDAFP");
                objRtn.A720VFOP = rs01.getDouble("A714VFOP");
                objRtn.A720SEQ = rs01.getString("A714SEQ");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public S0001A1530Filter refreshGroup(S0001A1530Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP00886(?,?,?,?,?)}";
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.registerOutParameter(5, Types.VARCHAR);

            cstmt.setString(1, filter.A1530TICAP);
            cstmt.setString(2, filter.A1530IDFIL);
            cstmt.setString(3, filter.A1530GRUPO);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(4);
            filter.dbException.MESSAGE = cstmt.getString(5);
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
             filter.dbException.MESSAGE=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            filter.dbException.MESSAGE=e.getMessage();
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public String ProcesaInsertFopManual(PX036S01A1731Filter filter, String ListFop) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03451(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_A1731CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1731CIA", filter.IN_CIA);
            cs.setString("IN_A1731FORMA", filter.A1731FORMA);
            cs.setString("IN_A1731SERIE", filter.A1731SERIE);
            cs.setString("IN_A1731SEQ", filter.A1731SEQ);
            cs.setString("IN_A1731GRUPO", filter.A1731GRUPO);
            cs.setString("IN_A1731IDFIL", filter.A1731IDFIL);
            cs.setDouble("IN_A720TCAMB", filter.A1731TCAMB);
            cs.setString("IN_LSTAFOP", ListFop);

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
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String ProcesaDeleteEntryRfndCompleManual(PX036S01A1731Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03452(?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_A1731CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1731OPTION", filter.IN_OPTION);
            cs.setString("IN_A1731CIA", filter.IN_CIA);
            cs.setString("IN_A1731FORMA", filter.A1731FORMA);
            cs.setString("IN_A1731SERIE", filter.A1731SERIE);
            cs.setString("IN_A1731SEQ", filter.A1731SEQ);
            cs.setString("IN_A1731CORRL", filter.A1731CORRL);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String ProcesaInsertTAXManual(PX036S01A1732Filter filter, String ListTAX) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03456(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP03451
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_A1732CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1732CIA", filter.IN_CIA);
            cs.setString("IN_A1732FORMA", filter.A1732FORMA);
            cs.setString("IN_A17321SERIE", filter.A1732SERIE);
            cs.setString("IN_A1732SEQ", filter.A1732SEQ);
            cs.setString("IN_A1732GRUPO", filter.A1732GRUPO);
            cs.setString("IN_A1732IDFIL", filter.A1732IDFIL);
            cs.setDouble("IN_A1732TCAMB", filter.A1732RATE);
            cs.setDouble("IN_A1732TOTALYQ", filter.A1732TOTALYQ);
            cs.setDouble("IN_A1732FARE", filter.A1732FARE);
            cs.setString("IN_TDOC", filter.A1732TIDOC);
            cs.setString("IN_LSTATAX", ListTAX);
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
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String ProcesaInsertCommiManual(PX036S01A1733Filter filter, String ListCommi) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03467(?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP03451
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_A1733CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1733CIA", filter.IN_CIA);
            cs.setString("IN_A1733FORMA", filter.A1733FORMA);
            cs.setString("IN_A1733SERIE", filter.A1733SERIE);
            cs.setString("IN_A1733SEQ", filter.A1733SEQ);
            cs.setString("IN_A1733GRUPO", filter.A1733GRUPO);
            cs.setString("IN_A1733IDFIL", filter.A1733IDFIL);
            cs.setDouble("IN_A1733TCAMB", filter.A1733RATE);
            cs.setString("IN_ListCommi", ListCommi);
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
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
    
    public String ProcesaInsertTAXCOMMManual(PX036S01A1731Filter filter, String lstTaxComm) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03469(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_A1731CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1731CIA", filter.IN_CIA);
            cs.setString("IN_A1731FORMA", filter.A1731FORMA);
            cs.setString("IN_A1731SERIE", filter.A1731SERIE);
            cs.setString("IN_A1731SEQ", filter.A1731SEQ);
            cs.setString("IN_A1731GRUPO", filter.A1731GRUPO);
            cs.setString("IN_A1731IDFIL", filter.A1731IDFIL);
            cs.setDouble("IN_A1731TCAMB", filter.A1731TCAMB);
            cs.setString("IN_ListTaxComm", lstTaxComm);
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
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }
    
    public String ProcesaInsertFareCalcRfnd(PX036S01A1735Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03488(?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP03469
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_A1735CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A1735CIA", filter.IN_CIA);
            cs.setString("IN_A1735FORMA", filter.A1735FORMA);
            cs.setString("IN_A1735SERIE", filter.A1735SERIE);
            cs.setString("IN_A1735SEQ", filter.A1735SEQ);
            cs.setString("IN_A1735CORRL", filter.A1735CORRL);
            cs.setString("IN_A1735GRUPO", filter.A1735GRUPO);
            cs.setString("IN_A1735IDFIL", filter.A1735IDFIL);
            cs.setString("IN_A1735FRCA", filter.A1735FRCA);
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
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

}
