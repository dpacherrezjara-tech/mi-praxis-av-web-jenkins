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
import net.miatech.beans.SaleAudit.A4137Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A1673;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.SaleAudit.A4137;
import net.miatech.praxis.SaleAudit.A4138;
import net.miatech.praxis.SaleAudit.SQP00911;
import net.miatech.utils.Functions;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class DisputemanagementMyarcFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4137Filter> SearchReportMyarc(A4137Filter filter) throws SQLException, Exception {
        List<A4137Filter> lstRtn = new ArrayList<A4137Filter>(0);
        A4137Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP04294(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_NUMBERADM);
            cstmt01.setString(4, filter.IN_DATEFROM);
            cstmt01.setString(5, filter.IN_DATETO);
            cstmt01.setString(6, filter.IN_STATUS);
            cstmt01.setString(7, filter.IN_IATA);
            cstmt01.setString(8, filter.IN_BASE);
            cstmt01.setString(9, filter.IN_USER);
            cstmt01.setString(10, filter.IN_TYPE);
            cstmt01.setString(11, filter.IN_AREA);
            cstmt01.setString(12, filter.IN_ORIGEN);
            cstmt01.setString(13, filter.IN_STATUS2);

            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A4137Filter();
                objRtn.A4137CCUST = rs01.getString("A4137CCUST");
                objRtn.A4137PREME = rs01.getString("A4137PREME");
                objRtn.A4137ANIO = rs01.getString("A4137ANIO");
                objRtn.A4137ORIGE = rs01.getString("A4137ORIGE");
                objRtn.A4137NMEMO = rs01.getString("A4137NMEMO");
                objRtn.A4137CNXPA = rs01.getString("A4137CNXPA");
                objRtn.A4137PAIS = rs01.getString("A4137PAIS");
                objRtn.A4137IATA = rs01.getString("A4137IATA");
                objRtn.A4137AGEN = rs01.getString("A4137AGEN");
                objRtn.A4137TYPE = rs01.getString("A4137TYPE");
                objRtn.A4137PSTAT = rs01.getString("A4137PSTAT");
                objRtn.A4137SSTAT = rs01.getString("A4137SSTAT");
                objRtn.A4137IDATE = rs01.getString("A4137IDATE");
                objRtn.A4137LDATE = rs01.getString("A4137LDATE");
                objRtn.A4137CPROV = rs01.getString("A4137CPROV");
                objRtn.A4137RTYPE = rs01.getString("A4137RTYPE");
                objRtn.A4137DDATE = rs01.getString("A4137DDATE");
                objRtn.A4137CDATE = rs01.getString("A4137CDATE");
                objRtn.A4137FLAG = rs01.getString("A4137FLAG");
                objRtn.A4137STATO = rs01.getString("A4137STATO");
                objRtn.A4137FFILE = rs01.getString("A4137FFILE");
                objRtn.A4137AREA = rs01.getString("A4137AREA");
                objRtn.A4137TYPO = rs01.getString("A4137TYPO");
                objRtn.A4137BASE = rs01.getString("A4137BASE");
                objRtn.A4137USER = rs01.getString("A4137USER");
                objRtn.A4137REGIS = rs01.getString("A4137REGIS");
                objRtn.A4137FREGI = rs01.getString("A4137FREGI");
                objRtn.A4137HREGI = rs01.getString("A4137HREGI");
                objRtn.A4137REVIS = rs01.getString("A4137REVIS");
                objRtn.A4137HREVI = rs01.getString("A4137FREVI");
                objRtn.A4137MDA = rs01.getString("A4137MDA");
                objRtn.A4137FPROC = rs01.getString("A4137FPROC");

                objRtn.A4137SEMAFORO = rs01.getString("TRAFFIC_LIGHT");
                objRtn.A4137DIAS = rs01.getString("DIAS");

                objRtn.A4137NETO = rs01.getDouble("A4137NETO");
                objRtn.A4137AMOUT = rs01.getDouble("A4137AMOUT");
                objRtn.A4137BALAC = rs01.getDouble("A4137BALAC");
                objRtn.A4137DIFE = rs01.getDouble("A4137DIFE");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public A4137Filter SearchDataDetaill(A4137Filter filter) throws SQLException, Exception {
        A4137Filter lstGeneral = null;

        List<SQP00911> lst_dataIni = new ArrayList<SQP00911>(0);
        List<A2553> lst_razones = new ArrayList<A2553>(0);
        List<A4138> lst_disputa = new ArrayList<A4138>(0);

        A4137Filter objRtnGeneral = null;
        SQP00911 objlst_dataIni = null;
        A2553 objlst_razones = null;
        A4138 objlst_disputa = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP04295(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_CNXPA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///VALIDACION DE TARJETAS
            while (rs01.next()) {
                objlst_dataIni = new SQP00911();
                objlst_dataIni.A2548TIKET = rs01.getString("A2548TIKET");
                objlst_dataIni.A2548MDA = rs01.getString("A2548MDA");
                objlst_dataIni.A2548TARID = rs01.getDouble("A2548TARID");
                objlst_dataIni.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objlst_dataIni.A2548COMID = rs01.getDouble("A2548COMID");
                objlst_dataIni.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objlst_dataIni.A2548PENAD = rs01.getDouble("A2548PENAD");
                objlst_dataIni.A2548TCARD = rs01.getDouble("A2548TCARD");
                objlst_dataIni.A2548NETO = rs01.getDouble("A2548NETO");
                lst_dataIni.add(objlst_dataIni);
            }
            //LIST DE RAZONES DEBITOS
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_razones = new A2553();
                    objlst_razones.A2553TYPO = rs02.getString("A2673TYPE");
                    objlst_razones.A2553CODE = rs02.getString("A2673CODE");
                    objlst_razones.A2553DESCR = rs02.getString("A2673ERROR");

                    lst_razones.add(objlst_razones);
                }
            }
            //LIST DE RAZONES MYARC
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_disputa = new A4138();
                    objlst_disputa.A4138CCUST = rs03.getString("A4138CCUST");
                    objlst_disputa.A4138STAT = rs03.getString("A4138STAT");
                    objlst_disputa.A4138DESCR = rs03.getString("A4138DESCR");
                    objlst_disputa.A4138ARCHV = rs03.getString("A4138ARCHV");
                    objlst_disputa.A4138REGIS = rs03.getString("A4138REGIS");
                    objlst_disputa.A4138FREGI = rs03.getString("A4138FREGI");
                    objlst_disputa.A4138HREGI = rs03.getString("A4138HREGI");
                    objlst_disputa.A4138ORIGE = rs03.getString("A4138ORIGE");
                    objlst_disputa.A4138TYPE = rs03.getString("A4138TYPE");
                    objlst_disputa.A4138STAR = rs03.getString("A4138STAR");
                    lst_disputa.add(objlst_disputa);
                }
            }
            // FIN DE LA AGENCIA
            objRtnGeneral = new A4137Filter();
            objRtnGeneral.lst_dataIni = lst_dataIni;
            objRtnGeneral.lst_razones = lst_razones;
            objRtnGeneral.lst_disputa = lst_disputa;

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

    public String insertTracing(A4137Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP04296(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PREME", filter.IN_PREME);
            cs.setString("IN_ANIO", filter.IN_ANIO);
            cs.setString("IN_CNXPA", filter.IN_CNXPA);
            cs.setString("IN_NUMBERADM", filter.IN_NUMBERADM);
            cs.setString("IN_DESCR", filter.IN_DESCR);
            cs.setString("IN_PAIS", filter.IN_PAIS);
            cs.setString("IN_STATUS", filter.IN_STATUS);
            cs.setString("IN_STATUS2", filter.IN_STATUS2);
            cs.setString("IN_ARCHV", filter.IN_ARCHV);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            //cs.setString("IN_OLD", filter.CAMPO);

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

    public String insertFile(A4137Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP04297(?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PREME", filter.IN_PREME);
            cs.setString("IN_ANIO", filter.IN_ANIO);
            cs.setString("IN_CNXPA", filter.IN_CNXPA);
            cs.setString("IN_NUMBERADM", filter.IN_NUMBERADM);
            cs.setString("IN_PAIS", filter.IN_PAIS);

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

}
