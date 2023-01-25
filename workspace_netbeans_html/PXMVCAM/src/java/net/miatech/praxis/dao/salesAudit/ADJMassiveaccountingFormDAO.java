/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A3344Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class ADJMassiveaccountingFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public ADJMassiveaccountingFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ADJMassiveaccountingFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3344Filter> search(A3344Filter filter) throws SQLException, Exception {
        List<A3344Filter> lstRtn = new ArrayList<A3344Filter>(0);
        A3344Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02408 (?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

             cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VL_DATEFROM);
            cstmt01.setString(3, filter.VL_DATETO);
            cstmt01.setString(4, filter.VP_TKT);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_USER);
            cstmt01.setString(7, filter.VP_FUENT);
            cstmt01.setString(8, filter.VP_STAS);
            cstmt01.setString(9, filter.VP_TYPE);
            cstmt01.setString(10, filter.VP_SEQ);

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
                objRtn = new A3344Filter();
                objRtn.A3344CCUST = rs01.getString("A3344CCUST");
                objRtn.A3344CIA = rs01.getString("A3344CIA");
                objRtn.A3344FORMA = rs01.getString("A3344FORMA");
                objRtn.A3344SERIE = rs01.getString("A3344SERIE");
                objRtn.A3344SEQ = rs01.getString("A3344SEQ");
                objRtn.A3344CPN = rs01.getString("A3344CPN");
                objRtn.A3344TKT = rs01.getString("A3344FORMA") + "" + rs01.getString("A3344SERIE") + "" + rs01.getString("A3344SEQ");
                objRtn.A3344TNC = rs01.getString("A3344TNC");
                objRtn.A3344MDA = rs01.getString("A3344MDA");
                objRtn.A3344CRRL = rs01.getString("A3344CRRL");
                objRtn.A3344PAIS = rs01.getString("A3344PAIS");
                objRtn.A3344FUENT = rs01.getString("A3344FUENT");
                objRtn.A3344TRNCU = rs01.getString("A3344TRNCU");
                objRtn.A3344MDA = rs01.getString("A3344MDA");

                objRtn.A3344DBLOC = rs01.getDouble("A3344DBLOC");
                objRtn.A3344CRLOC = rs01.getDouble("A3344CRLOC");
                objRtn.A3344DBREV = rs01.getDouble("A3344DBREV");
                objRtn.A3344CRREV = rs01.getDouble("A3344CRREV");
                objRtn.SQUARELOC = rs01.getDouble("SUMLOC");
                objRtn.SQUAREREV = rs01.getDouble("SUMREV");
                objRtn.A3344VLTAX = rs01.getDouble("A3344VLTAX");
                objRtn.A3344VLTAR = rs01.getDouble("A3344VLTAR");
                objRtn.A3344FLAG = rs01.getString("A3344FLAG");
                if (objRtn.SQUARELOC != 0 || objRtn.SQUAREREV != 0) {
                    objRtn.A3344FLAG = "ERROR";
                }
                objRtn.A3344TKTAS = rs01.getString("A3344TKTAS");
                objRtn.A3344ASSEQ = rs01.getString("A3344ASSEQ");
                objRtn.A3344IATAU = rs01.getString("A3344IATAU");
                objRtn.A3344DESCR = rs01.getString("A3344DESCR");
                objRtn.A3344NARCH = rs01.getString("A3344NARCH");
                objRtn.A3344USRIN = rs01.getString("A3344USRIN");
                objRtn.A3344FECIN = rs01.getString("A3344FECIN");
                objRtn.A3344TKTVO = rs01.getString("A3344TKTVO");
                objRtn.A3344ESTTR = rs01.getString("A3344ESTTR");

                // A2548EMISION
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

    public List<A3344Filter> ListAdjmassive(A3344Filter filter) throws SQLException, Exception {
        List<A3344Filter> lstRtn = new ArrayList<A3344Filter>(0);
        A3344Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02410 (?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A3344CIA);
            cstmt01.setString(3, filter.A3344FORMA);
            cstmt01.setString(4, filter.A3344SERIE);
            cstmt01.setString(5, filter.A3344SEQ);
            cstmt01.setString(6, filter.A3344CPN);
            cstmt01.setString(7, filter.A3344TNC);
            cstmt01.setString(8, filter.A3344CRRL);
            cstmt01.setString(9, filter.A3344NARCH);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3344Filter();

                objRtn.A3344CCUST = rs01.getString("A3344CCUST");
                objRtn.A3344CIA = rs01.getString("A3344CIA");
                objRtn.A3344FORMA = rs01.getString("A3344FORMA");
                objRtn.A3344SERIE = rs01.getString("A3344SERIE");
                objRtn.A3344SEQ = rs01.getString("A3344SEQ");
                objRtn.A3344CPN = rs01.getString("A3344CPN");
                objRtn.A3344TKT = rs01.getString("A3344CIA") + "" + rs01.getString("A3344FORMA") + "" + rs01.getString("A3344SERIE") + "" + rs01.getString("A3344SEQ");

                objRtn.A3344TNC = rs01.getString("A3344TNC");
                objRtn.A3344CRRL = rs01.getString("A3344CRRL");
                objRtn.A3344PAIS = rs01.getString("A3344PAIS");
                objRtn.A3344FUENT = rs01.getString("A3344FUENT");
                objRtn.A3344SUBFU = rs01.getString("A3344SUBFU");
                objRtn.A3344CONP1 = rs01.getString("A3344CONP1");
                objRtn.A3344CONP2 = rs01.getString("A3344CONP2");
                objRtn.A3344CONP3 = rs01.getString("A3344CONP3");
                objRtn.A3344TRNCU = rs01.getString("A3344TRNCU");
                objRtn.A3344TDOC = rs01.getString("A3344TDOC");
                objRtn.A3344CTAC = rs01.getString("A3344CTAC");
                objRtn.A3344TITUC = rs01.getString("A3344TITUC");
                objRtn.A3344MDA = rs01.getString("A3344MDA");

                objRtn.A3344DBLOC = rs01.getDouble("A3344DBLOC");
                objRtn.A3344CRLOC = rs01.getDouble("A3344CRLOC");
                objRtn.A3344DBREV = rs01.getDouble("A3344DBREV");
                objRtn.A3344CRREV = rs01.getDouble("A3344CRREV");

                objRtn.A3344FILE = rs01.getString("A3344FILE");
                objRtn.A3344CLIEN = rs01.getString("A3344CLIEN");
                objRtn.A3344DIREC = rs01.getString("A3344DIREC");
                objRtn.A3344ORAC = rs01.getString("A3344ORAC");
                objRtn.A3344PROVE = rs01.getString("A3344PROVE");
                objRtn.A3344MARCA = rs01.getString("A3344MARCA");
                objRtn.A3344FLAG = rs01.getString("A3344FLAG");
                objRtn.A3344TKTAS = rs01.getString("A3344TKTAS");
                objRtn.A3344ASSEQ = rs01.getString("A3344ASSEQ");

                objRtn.A3344VLTAX = rs01.getDouble("A3344VLTAX");
                objRtn.A3344VLTAR = rs01.getDouble("A3344VLTAR");
                objRtn.A3344ESTTR = rs01.getString("A3344ESTTR");
                objRtn.A3344TKTVO = rs01.getString("A3344TKTVO");
                objRtn.A3344IATAU = rs01.getString("A3344IATAU");
                objRtn.A3344DESCR = rs01.getString("A3344DESCR");
                objRtn.A3344NARCH = rs01.getString("A3344NARCH");

                objRtn.A3344TTARJ = rs01.getString("A3344NTARJ");
                objRtn.A3344USRIN = rs01.getString("A3344USRIN");
                objRtn.A3344FECIN = rs01.getString("A3344FECIN");

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

    public String insertTKT(ArrayList<A3344Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PRAXIS.SQP02436 (?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A3344Filter obj : filter) {

                cs.setInt(1, 1);
                cs.setString(2, obj.A3344CIA);
                cs.setString(3, obj.A3344FORMA);
                cs.setString(4, obj.A3344SERIE);
                cs.setString(5, obj.A3344SEQ);
                cs.setString(6, obj.A3344CPN);
                cs.setString(7, obj.A3344TNC);
                cs.setString(8, obj.A3344CRRL);
                cs.execute();
            }
            cs.execute();

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

    public A3344Filter lstdelete(A3344Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A3344Filter result = new A3344Filter();

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PRAXIS.SQP02436 (?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.setInt(1, 2);
            cs.setString(2, filter.A3344CIA);
            cs.setString(3, filter.A3344FORMA);
            cs.setString(4, filter.A3344SERIE);
            cs.setString(5, filter.A3344SEQ);
            cs.setString(6, filter.A3344CPN);
            cs.setString(7, filter.A3344TNC);
            cs.setString(8, filter.A3344CRRL);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                result.dbException.MESSAGE = rst.getString("VMESSAGE");
                result.dbException.SQLCODE = rst.getString("VSQLCODE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            result.dbException.MESSAGE = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            result.dbException.MESSAGE = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return result;
    }

    public String subirExcel(ArrayList<A3344Filter> filter, String strOption, String nameFile) throws SQLException, Exception {
        String mensaje = "";
        String mensaje2 = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP02409(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL02 = "{CALL PRAXIS.SQP03162(?,?,?)}";
        Connection cnx = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        String valida = "Y";
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();

        try {
            cstmt01 = cnx.prepareCall(SQLCLL01);
            for (A3344Filter obj : filter) {
                cstmt01.registerOutParameter(43, Types.VARCHAR);
                cstmt01.registerOutParameter(44, Types.VARCHAR);
                cstmt01.setString(1, obj.A3344CCUST.trim());
                cstmt01.setString(2, obj.VP_TYPE.trim());
                cstmt01.setString(3, obj.A3344TKT.trim());
                cstmt01.setString(4, obj.A3344SEQ.trim());
                cstmt01.setString(5, obj.A3344CPN.trim());
                cstmt01.setString(6, obj.A3344TRNCU.trim());
                cstmt01.setString(7, obj.A3344PAIS.trim());
                cstmt01.setString(8, obj.A3344FUENT.trim());
                cstmt01.setString(9, obj.A3344SUBFU.trim());
                cstmt01.setString(10, obj.A3344CARRIR.trim());
                cstmt01.setString(11, obj.A3344CONP1.trim());
                cstmt01.setString(12, obj.A3344CONP2.trim());
                cstmt01.setString(13, obj.A3344CONP3.trim());
                cstmt01.setString(14, obj.A3344TDOC.trim());
                cstmt01.setString(15, obj.A3344CTAC.trim());
                cstmt01.setString(16, obj.A3344TITUC.trim());
                cstmt01.setString(17, obj.A3344FILE.trim());
                cstmt01.setString(18, obj.A3344MARCA.trim());
                cstmt01.setString(19, obj.A3344CLIEN.trim());
                cstmt01.setString(20, obj.A3344PROVE.trim());
                cstmt01.setString(21, obj.A3344DIREC.trim());
                cstmt01.setString(22, obj.A3344ORAC.trim());
                cstmt01.setString(23, obj.A3344MDA.trim());
                cstmt01.setDouble(24, obj.A3344DBLOC);
                cstmt01.setDouble(25, obj.A3344CRLOC);
                cstmt01.setDouble(26, obj.A3344DBREV);
                cstmt01.setDouble(27, obj.A3344CRREV);
                cstmt01.setString(28, obj.A3344TKTAS.trim());
                cstmt01.setString(29, obj.A3344ASSEQ.trim());
                cstmt01.setString(30, obj.A3344ESTTR.trim());
                cstmt01.setString(31, obj.A3344TKTVO.trim());
                cstmt01.setDouble(32, obj.A3344VLTAX);
                cstmt01.setDouble(33, obj.A3344VLTAR);
                cstmt01.setString(34, obj.A3344IATAU.trim());
                cstmt01.setString(35, obj.A3344DESCR.trim());
                cstmt01.setString(36, obj.A3344TTARJ.trim());
                cstmt01.setString(37, obj.A3344NTARJ.trim());
                cstmt01.setString(38, obj.A3344AGENT.trim());
                cstmt01.setDouble(39, obj.A3344TCAMB);
                cstmt01.setString(40, obj.A3344FPROC.trim()); //
                cstmt01.setString(41, nameFile);
                cstmt01.setString(42, valida);

                cstmt01.execute();
                valida = "N";
                obj.dbException.SQLCODE = cstmt01.getString(43);
                obj.dbException.MESSAGE = cstmt01.getString(44);
                mensaje=cstmt01.getString(44);
                if (!obj.dbException.SQLCODE.equals("0")) {
                    mensaje = obj.dbException.MESSAGE;
                    break;
                }

            }
            if (valida.equals("N")) {
                cstmt01 = cnx.prepareCall(SQLCLL02);
                cstmt01.registerOutParameter(3, Types.VARCHAR);
                cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(2, nameFile);
                cstmt01.execute();
                mensaje2 = cstmt01.getString(3);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            mensaje = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            mensaje = e.getMessage();
        } finally {
            cnx.rollback();
            session.getCNXIBMDB2().close();
        }

        return mensaje;
    }

}
