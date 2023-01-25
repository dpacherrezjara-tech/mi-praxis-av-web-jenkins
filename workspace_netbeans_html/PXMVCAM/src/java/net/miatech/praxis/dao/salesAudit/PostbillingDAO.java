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
import net.miatech.beans.SaleAudit.A2548Filter;
import net.miatech.beans.SaleAudit.A3537Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.utils.Functions;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;
import net.miatech.praxis.SaleAudit.A3537;

/**
 *
 * @author zperez
 */
public class PostbillingDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3537Filter> SearchReportPostbilling(A3537Filter filter) throws SQLException, Exception {
        List<A3537Filter> lstRtn = new ArrayList<A3537Filter>(0);
        A3537Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP03015(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CIA);
            cstmt01.setString(4, filter.IN_DOCUMET);
            cstmt01.setString(5, filter.IN_DATEFROM);
            cstmt01.setString(6, filter.IN_DATETO);
            cstmt01.setString(7, filter.IN_COUNTRY);
            cstmt01.setString(8, filter.IN_STATUS);
            cstmt01.setString(9, filter.IN_USER);
            cstmt01.setString(10, filter.IN_IATA);
            cstmt01.setString(11, filter.IN_TRNCU);

            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3537Filter();
                objRtn.A3537CCUST = rs01.getString("A3537CCUST");

                objRtn.A3537PREME = rs01.getString("A3537PREME");
                objRtn.A3537STAT2 = rs01.getString("A3537STAT2");
                objRtn.A3537TRNCU = rs01.getString("A3537TRNCU");
                objRtn.A3537PAIS = rs01.getString("A3537PAIS");
                objRtn.A3537PC = rs01.getInt("A3537PC");
                objRtn.A3537MODO = rs01.getString("A3537MODO");
                objRtn.A3537IATA = rs01.getString("A3537IATA");
                objRtn.A3537NOMAGENCY = rs01.getString("A3537NOMAGENCY");
                objRtn.A3537CNXPA = rs01.getString("A3537CNXPA");
                objRtn.A3537FLAG = rs01.getString("A3537FLAG");
                objRtn.A3537AREA = rs01.getString("A3537AREA");
                objRtn.A3537BASE = rs01.getString("A3537BASE");
                objRtn.A3537NMEMO = rs01.getString("A3537NMEMO");
                objRtn.A3537FBILI = rs01.getString("A3537FBILI");
                objRtn.A3537TYPE = rs01.getString("A3537TYPE");
                objRtn.A3537RAUDI = rs01.getString("A3537RAUDI");
                objRtn.A3537FFILE = rs01.getString("A3537FFILE");
                objRtn.A3537NUMCONX = rs01.getString("A3537NUMCONX");
                objRtn.A3537NCONX = rs01.getString("A3537NCONX");
                objRtn.A3537TCONX = rs01.getString("A3537TCONX");
                objRtn.A3537FCONX = rs01.getString("A3537FCONX");
                objRtn.A3537FDIAS = rs01.getString("A3537FDIAS");
                objRtn.A3537MDA = rs01.getString("A3537MDA");
                objRtn.A3537FPBD = rs01.getString("A3537FPBD");
                objRtn.A3537RDSTE = rs01.getString("A3537RDSTE");
                objRtn.A3537RREPT = rs01.getString("A3537RREPT");
                objRtn.A3537FREPT = rs01.getString("A3537FREPT");
                objRtn.A3537HRESP = rs01.getString("A3537HRESP");
                objRtn.A3537PRECR = rs01.getString("A3537PRECR");
                objRtn.A3537FSPCR = rs01.getString("A3537FSPCR");
                objRtn.A3537PREDR = rs01.getString("A3537PREDR");
                objRtn.A3537FSPDR = rs01.getString("A3537FSPDR");
                objRtn.A3537REGIS = rs01.getString("A3537REGIS");
                objRtn.A3537FREGI = rs01.getString("A3537FREGI");
                objRtn.A3537HREGI = rs01.getString("A3537HREGI");
                objRtn.A3537REVIS = rs01.getString("A3537REVIS");
                objRtn.A3537FREVI = rs01.getString("A3537FREVI");
                objRtn.A3537HREVI = rs01.getString("A3537HREVI");
                objRtn.A3537EMAIL = rs01.getString("A3537EMAIL");
                objRtn.A3537SEMAF = rs01.getString("TRAFFIC_LIGHT");
                objRtn.A3537DIAS = rs01.getString("DIAS");
                objRtn.A3537FTE = rs01.getString("A3537FTE"); 
                objRtn.A3537FVTA = rs01.getString("A3537FVTA");
                objRtn.A3537STAT4 = rs01.getString("A3537STAT4");

                objRtn.A3537CANTANGE = rs01.getInt("CANTANGE");
                objRtn.A3537CANTAERO = rs01.getInt("CANTAERO");
                objRtn.A3537NETD = rs01.getDouble("A3537NETD");

                objRtn.A3537NETO = rs01.getDouble("A3537NETO");
                objRtn.A3537NMAX = rs01.getDouble("A3537NMAX");
                objRtn.A3537PBDNE = rs01.getDouble("A3537PBDNE");
                objRtn.A3537STAT3 = rs01.getString("A3537STAT3");

                // A2548EMISION
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

    public String savecorreo(List<A3537Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP03016(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A3537Filter obj : filter) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_A3537NMEMO", obj.A3537NMEMO);
                cs.setString("IN_A3537PAIS", obj.A3537PAIS);
                cs.setString("IN_A3537FTE", obj.A3537FTE);
                cs.setString("IN_A3537IATA", obj.A3537IATA);
                cs.setString("IN_A3537AREA", obj.A3537AREA);
                cs.setDouble("IN_A3537PBDNE", obj.A3537PBDNE);
                cs.setString("IN_A3537SEMAF", obj.A3537SEMAF);
                cs.setString("IN_A3537DIAS", obj.A3537DIAS);
                cs.setString("IN_A3537PREME", obj.A3537PREME);
                cs.setString("IN_A3537TRNCU", obj.A3537TRNCU);
                cs.setString("IN_A3537RAUDI", obj.A3537RAUDI);

                cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FREGI", Functions.getFechaActual());
                cs.setString("IN_HREGI", Functions.getHoraActual());
                //cs.setString("IN_OLD", filter.CAMPO);

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

    public A3537Filter SearchPostbillingDetail(A3537Filter filter) throws SQLException, Exception {
        A3537Filter lstGeneral = null;
        List<A2553> lst_RAZON = new ArrayList<A2553>(0);
        List<SQP00911Filter> lst_DOCUMENTS = new ArrayList<SQP00911Filter>(0);
        List<A3537> lst_DispuRazon = new ArrayList<A3537>(0);

        A3537Filter objRtnGeneral = null;
        A2553 objlst_RAZON = null;
        SQP00911Filter objlst_DOCUMENTS = null;
        A3537 objlst_DispuRazon = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03017(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_PREME);
            cstmt01.setString(4, filter.IN_CNXPA);
            cstmt01.setString(5, filter.IN_SEQ);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///VALIDACION DE TARJETAS
            while (rs01.next()) {
                objlst_DispuRazon = new A3537();
                objlst_DispuRazon.A3537NCONX = rs01.getString("A3538DESCR");
                objlst_DispuRazon.A3537FFILE = rs01.getString("A3538ARCHV");
                objlst_DispuRazon.A3537TYPE = rs01.getString("A3538TYPE");
                objlst_DispuRazon.A3537FLAG = rs01.getString("A3538STAT");
                objlst_DispuRazon.A3537FREGI = rs01.getString("A3538FREGI");
                lst_DispuRazon.add(objlst_DispuRazon);
            }
            ////LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_DOCUMENTS = new SQP00911Filter();
                    objlst_DOCUMENTS.A2548TIKET = rs02.getString("A2548CIA") + "" + rs02.getString("A2548FORMA") + "" + rs02.getString("A2548SERIE");
                    objlst_DOCUMENTS.A2548TRNCO = rs02.getString("A2548TRNCO");
                    objlst_DOCUMENTS.A2548NETO = rs02.getDouble("A2548NETO");
                    objlst_DOCUMENTS.A2548PREME = rs02.getString("A2548PREME");
                    objlst_DOCUMENTS.A2548CNXPA = rs02.getString("A2548CNXPA");
                    objlst_DOCUMENTS.A2548MDA = rs02.getString("A2548MDA");
                    objlst_DOCUMENTS.A2548NMEMO = rs02.getString("A2548NMEMO");

                    objlst_DOCUMENTS.A2548TARID = rs02.getDouble("A2548TARID");
                    objlst_DOCUMENTS.A2548TTAXD = rs02.getDouble("A2548TTAXD");
                    objlst_DOCUMENTS.A2548SERVD = rs02.getDouble("A2548SERVD");
                    objlst_DOCUMENTS.A2548IVACD = rs02.getDouble("A2548IVACD");
                    objlst_DOCUMENTS.A2548COMID = rs02.getDouble("A2548COMID");
                    objlst_DOCUMENTS.A2548SCOMD = rs02.getDouble("A2548SCOMD");
                    objlst_DOCUMENTS.A2548TAXCD = rs02.getDouble("A2548TAXCD");
                    objlst_DOCUMENTS.A2548PORCD = rs02.getDouble("A2548PORCD");
                    objlst_DOCUMENTS.A2548PENAD = rs02.getDouble("A2548PENAD");
                    objlst_DOCUMENTS.A2548FEED = rs02.getDouble("A2548FEED");
                    objlst_DOCUMENTS.A2548TTACD = rs02.getDouble("A2548TTACD");
                    objlst_DOCUMENTS.A2548TTAMD = rs02.getDouble("A2548TTAMD");
                    objlst_DOCUMENTS.A2548TCARD = rs02.getDouble("A2548TCARD");
                    objlst_DOCUMENTS.A2548TOTAD = rs02.getDouble("A2548TOTAD");
                    lst_DOCUMENTS.add(objlst_DOCUMENTS);
                }
            }
            //Card Type
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_RAZON = new A2553();
                    objlst_RAZON.A2553REGIS = rs03.getString("A2553REGIS");
                    objlst_RAZON.A2553FREGI = rs03.getString("A2553FREGI");
                    objlst_RAZON.A2553HREGI = rs03.getString("A2553HREGI");
                    objlst_RAZON.A2553TYPO = rs03.getString("A2553TYPO");
                    objlst_RAZON.A2553DESCR = rs03.getString("A2553DESCR");
                    objlst_RAZON.A2553ARCHV = rs03.getString("A2553ARCHV");
                    objlst_RAZON.A2553ARCHV2 = rs03.getString("A2553ARHV2");
                    objlst_RAZON.A2553ARCHV3 = rs03.getString("A2553ARHV3");
                    objlst_RAZON.A2553STAT = rs03.getString("A2553STAT");
                    objlst_RAZON.ESTADO = rs03.getString("ESTADO");
                    objlst_RAZON.A2553FOLIO = rs03.getString("A2553FOLIO");
                    objlst_RAZON.A2553PAIS = rs03.getString("A2553PAIS");
                    lst_RAZON.add(objlst_RAZON);
                }
            }
            // FIN DE LA AGENCIA
            objRtnGeneral = new A3537Filter();
            objRtnGeneral.lst_DOCUMENTS = lst_DOCUMENTS;
            objRtnGeneral.lst_DispuRazon = lst_DispuRazon;
            objRtnGeneral.lst_RAZON = lst_RAZON;

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

    /*public List<A3537Filter> SearchDispuRazon(A3537Filter filter) throws SQLException, Exception {
        List<A3537Filter> lstRtn = new ArrayList<A3537Filter>(0);
        A3537Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03017(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A3537Filter();
                objRtn.A3537NCONX = rs01.getString("A3538DESCR");
                objRtn.A3537FFILE = rs01.getString("A3538ARCHV");
                objRtn.A3537TYPE = rs01.getString("A3538TYPE");
                objRtn.A3537FLAG = rs01.getString("A3538STAT");
                objRtn.A3537FREGI = rs01.getString("A3538FREGI");
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
    }*/
    public List<SQP00911Filter> lstTKTS(A3537Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02175(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_CNXPA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548TIKET = rs01.getString("A2548CIA") + "" + rs01.getString("A2548FORMA") + "" + rs01.getString("A2548SERIE");
                objRtn.A2548TRNCO = rs01.getString("A2548TRNCO");
                objRtn.A2548NETO = rs01.getDouble("A2548NETO");
                objRtn.A2548PREME = rs01.getString("A2548PREME");
                objRtn.A2548CNXPA = rs01.getString("A2548CNXPA");
                objRtn.A2548MDA = rs01.getString("A2548MDA");

                objRtn.A2548TARID = rs01.getDouble("A2548TARID");
                objRtn.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objRtn.A2548SERVD = rs01.getDouble("A2548SERVD");
                objRtn.A2548IVACD = rs01.getDouble("A2548IVACD");
                objRtn.A2548COMID = rs01.getDouble("A2548COMID");
                objRtn.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objRtn.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objRtn.A2548PORCD = rs01.getDouble("A2548PORCD");
                objRtn.A2548PENAD = rs01.getDouble("A2548PENAD");
                objRtn.A2548FEED = rs01.getDouble("A2548FEED");
                objRtn.A2548TTACD = rs01.getDouble("A2548TTACD");
                objRtn.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                objRtn.A2548TCARD = rs01.getDouble("A2548TCARD");
                objRtn.A2548TOTAD = rs01.getDouble("A2548TOTAD");
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

    public List<A2553> loadTracing(A3537Filter filter) throws SQLException, Exception {
        List<A2553> lstRtn = new ArrayList<A2553>(0);
        A2553 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03195(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_CNXPA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2553();
                //objRtn.RN = rs01.getInt("RN");
                objRtn.A2553REGIS = rs01.getString("A2553REGIS");
                objRtn.A2553FREGI = rs01.getString("A2553FREGI");
                objRtn.A2553HREGI = rs01.getString("A2553HREGI");
                objRtn.A2553TYPO = rs01.getString("A2553TYPO");
                objRtn.A2553DESCR = rs01.getString("A2553DESCR");
                objRtn.A2553ARCHV = rs01.getString("A2553ARCHV");
                objRtn.A2553ARCHV2 = rs01.getString("A2553ARHV2");
                objRtn.A2553ARCHV3 = rs01.getString("A2553ARHV3");
                objRtn.A2553STAT = rs01.getString("A2553STAT");
                objRtn.ESTADO = rs01.getString("ESTADO");
                objRtn.A2553FOLIO = rs01.getString("A2553FOLIO");
                objRtn.A2553PAIS = rs01.getString("A2553PAIS");
                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception ex) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
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

    public String insertTracing(A3537Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        //filter.IN_DESCRI
        String STR_STRING = new String(filter.IN_DESCRI.getBytes("ISO-8859-1"), "UTF-8");

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL PXSAUDIT.SQP03018(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);

            cs.setString("IN_CNXPA", filter.IN_CNXPA);
            cs.setString("IN_PREME", filter.IN_PREME);
            cs.setString("IN_DESCRI", STR_STRING);
            cs.setString("IN_COUNTRY", filter.IN_COUNTRY);
            cs.setString("IN_STATUS", filter.IN_STATUS);
            cs.setString("IN_TRNCU", filter.IN_TRNCU);
            cs.setString("IN_ARCHV", filter.A3537ARCHV);
            cs.setString("IN_ARCHV2", filter.A3537ARCHV2);
            cs.setString("IN_ARCHV3", filter.A3537ARCHV3);

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

    public List<A3537Filter> SearchQueryPostbilling(A3537Filter filter) throws SQLException, Exception {
        List<A3537Filter> lstRtn = new ArrayList<A3537Filter>(0);
        A3537Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP03014(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CIA);
            cstmt01.setString(4, filter.IN_DOCUMET);
            cstmt01.setString(5, filter.IN_DATEFROM);
            cstmt01.setString(6, filter.IN_DATETO);
            cstmt01.setString(7, filter.IN_COUNTRY);
            cstmt01.setString(8, filter.IN_STATUS);
            cstmt01.setString(9, filter.IN_USER);
            cstmt01.setString(10, filter.IN_IATA);
            cstmt01.setString(11, filter.IN_TRNCU);
            cstmt01.setString(12, filter.IN_STATO);

            cstmt01.setInt(13, filter.page.PAGNUM);
            cstmt01.setInt(14, filter.page.PAGROW);
            cstmt01.setInt(15, filter.page.TOTPAG);
            cstmt01.setInt(16, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(13);
            filter.page.PAGROW = cstmt01.getInt(14);
            filter.page.TOTPAG = cstmt01.getInt(15);
            filter.page.TOTROW = cstmt01.getInt(16);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3537Filter();
                objRtn.A3537CCUST = rs01.getString("A3537CCUST");

                objRtn.A3537PREME = rs01.getString("A3537PREME");
                objRtn.A3537STAT2 = rs01.getString("A3537STAT2");
                objRtn.A3537TRNCU = rs01.getString("A3537TRNCU");
                objRtn.A3537PAIS = rs01.getString("A3537PAIS");
                objRtn.A3537PC = rs01.getInt("A3537PC");
                objRtn.A3537MODO = rs01.getString("A3537MODO");
                objRtn.A3537IATA = rs01.getString("A3537IATA");
                objRtn.A3537NOMAGENCY = rs01.getString("A3537NOMAGENCY");
                objRtn.A3537CNXPA = rs01.getString("A3537CNXPA");
                objRtn.A3537FLAG = rs01.getString("A3537FLAG");
                objRtn.A3537AREA = rs01.getString("A3537AREA");
                objRtn.A3537BASE = rs01.getString("A3537BASE");
                objRtn.A3537NMEMO = rs01.getString("A3537NMEMO");
                objRtn.A3537FBILI = rs01.getString("A3537FBILI");
                objRtn.A3537TYPE = rs01.getString("A3537TYPE");
                objRtn.A3537RAUDI = rs01.getString("A3537RAUDI");
                objRtn.A3537FFILE = rs01.getString("A3537FFILE");
                objRtn.A3537NCONX = rs01.getString("A3537NCONX");
                objRtn.A3537TCONX = rs01.getString("A3537TCONX");
                objRtn.A3537FCONX = rs01.getString("A3537FCONX");
                objRtn.A3537FDIAS = rs01.getString("A3537FDIAS");
                objRtn.A3537MDA = rs01.getString("A3537MDA");
                objRtn.A3537FPBD = rs01.getString("A3537FPBD");
                objRtn.A3537RDSTE = rs01.getString("A3537RDSTE");
                objRtn.A3537RREPT = rs01.getString("A3537RREPT");
                objRtn.A3537FREPT = rs01.getString("A3537FREPT");
                objRtn.A3537HRESP = rs01.getString("A3537HRESP");
                objRtn.A3537PRECR = rs01.getString("A3537PRECR");
                objRtn.A3537FSPCR = rs01.getString("A3537FSPCR");
                objRtn.A3537PREDR = rs01.getString("A3537PREDR");
                objRtn.A3537FSPDR = rs01.getString("A3537FSPDR");
                objRtn.A3537REGIS = rs01.getString("A3537REGIS");
                objRtn.A3537FREGI = rs01.getString("A3537FREGI");
                objRtn.A3537HREGI = rs01.getString("A3537HREGI");
                objRtn.A3537REVIS = rs01.getString("A3537REVIS");
                objRtn.A3537FREVI = rs01.getString("A3537FREVI");
                objRtn.A3537HREVI = rs01.getString("A3537HREVI");
                objRtn.A3537SEMAF = rs01.getString("TRAFFIC_LIGHT");
                objRtn.A3537DIAS = rs01.getString("DIAS");
                objRtn.A3537FTE = rs01.getString("A3537FTE");
                objRtn.A3537CANTANGE = rs01.getInt("CANTANGE");
                objRtn.A3537CANTAERO = rs01.getInt("CANTAERO");
                objRtn.A3537NUMCONX = rs01.getString("A3537NUMCONX");
                objRtn.A3537FVTA = rs01.getString("A3537FVTA");
                objRtn.A3537STAT4 = rs01.getString("A3537STAT4");

                objRtn.A3537NETO = rs01.getDouble("A3537NETO");
                objRtn.A3537NMAX = rs01.getDouble("A3537NMAX");
                objRtn.A3537PBDNE = rs01.getDouble("A3537PBDNE");
                objRtn.A3537NETD = rs01.getDouble("A3537NETD");
                objRtn.A3537STAT3 = rs01.getString("A3537STAT3");
                objRtn.A3537CNREL = rs01.getString("A3537CNREL");

                // A2548EMISION
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

    public List<SQP00911Filter> SearchListDocument(A3537Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02923(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DOCUMET);
            cstmt01.setString(4, filter.IN_COUNTRY);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548CCUST = rs01.getString("A2548CCUST");

                objRtn.A2548PREME = rs01.getString("A2548PREME");
                objRtn.A2548NMEMO = rs01.getString("A2548NMEMO");
                objRtn.A2548FEMI = rs01.getString("A2548FEMI");
                objRtn.A2548BASE = rs01.getString("A2548BASE");
                objRtn.A2548TO = rs01.getString("A2548TO");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.A2548EMPLE = rs01.getString("A2548EMPLE");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548STAT = rs01.getString("A2548STAT");
                objRtn.A2548TRNCU = rs01.getString("A2548TRNCU");
                objRtn.A2548CNXPA = rs01.getString("A2548CNXPA");
                objRtn.A2548NFACT = rs01.getString("A2548NFACT");
                objRtn.A2548TIKET = rs01.getString("A2548CIA") + "" + rs01.getString("A2548FORMA") + "" + rs01.getString("A2548SERIE");
                objRtn.A2548CIA = rs01.getString("A2548CIA");
                objRtn.A2548FORMA = rs01.getString("A2548FORMA");
                objRtn.A2548SERIE = rs01.getString("A2548SERIE");
                objRtn.A2548CDGT = rs01.getString("A2548CDGT");
                objRtn.A2548TRNCO = rs01.getString("A2548TRNCO");
                objRtn.A2548CNJ = rs01.getString("A2548CNJ");
                objRtn.A2548PAIS = rs01.getString("A2548PAIS");
                objRtn.A2548TVTA = rs01.getString("A2548TVTA");
                objRtn.A2548FTE = rs01.getString("A2548FTE");
                objRtn.A2548CANAL = rs01.getString("A2548CANAL");
                objRtn.A2548FVTA = rs01.getString("A2548FVTA");
                objRtn.A2548TPAX = rs01.getString("A2548TPAX");
                objRtn.A2548PAX = rs01.getString("A2548PAX");
                objRtn.A2548CODIT = rs01.getString("A2548CODIT");
                objRtn.A2548CPN = rs01.getString("A2548CPN");
                objRtn.A2548USOS = rs01.getString("A2548USOS");
                objRtn.A2548DESC1 = rs01.getString("A2548DESC1");
                objRtn.A2548CATNDOCUM = rs01.getInt("VL_CANTDOC");
                objRtn.AGENCY = rs01.getString("AGENCY");
                objRtn.DIRAGENCY = rs01.getString("DIRAGENCY");
                objRtn.A2548NMERF = rs01.getString("A2548NMERF");
                objRtn.A2548EMITI = rs01.getString("A2548EMITI");
                objRtn.A2548FEMIT = rs01.getString("A2548FEMIT");
                objRtn.A2548ENVIA = rs01.getString("A2548ENVIA");
                objRtn.A2548FENVI = rs01.getString("A2548FENVI");
                objRtn.A2548DISPU = rs01.getString("A2548DISPU");
                objRtn.A2548FDISP = rs01.getString("A2548FDISP");
                objRtn.A2548SEQ = rs01.getString("A2548SEQ");
                objRtn.A2548OBSER = rs01.getString("A2548OBSER");
                objRtn.A2548CIUD = rs01.getString("A2548CIUD");
                objRtn.A2548TYPE = rs01.getString("A2548TYPE");
                objRtn.A2548AREA = rs01.getString("A2548AREA");
                objRtn.A2548CTAC = rs01.getString("A2548CTAC");
                objRtn.A2548TASAD = rs01.getString("A2548TASAD");
                objRtn.A2548REGIS = rs01.getString("A2548REGIS");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.A2548FCONT = rs01.getString("A2548FCONT");
                objRtn.A2548FPROC = rs01.getString("A2548FPROC");
                objRtn.A2548FFILE = rs01.getString("A2548FFILE");

                objRtn.A2548IVACD = rs01.getDouble("A2548IVACD") + rs01.getDouble("A2548TTAMD");
                objRtn.A2548TCAMB = rs01.getDouble("A2548TCAMB");
                objRtn.A2548MDA = rs01.getString("A2548MDA");
                objRtn.A2548TARIF = rs01.getDouble("A2548TARIF");
                objRtn.A2548TTAX = rs01.getDouble("A2548TTAX");
                objRtn.A2548SERVI = rs01.getDouble("A2548SERVI");
                objRtn.A2548COMIS = rs01.getDouble("A2548COMIS");
                objRtn.A2548SCOM = rs01.getDouble("A2548SCOM");
                objRtn.A2548TAXCM = rs01.getDouble("A2548TAXCM");
                objRtn.A2548PORCO = rs01.getDouble("A2548PORCO");
                objRtn.A2548PENAL = rs01.getDouble("A2548PENAL");
                objRtn.A2548FEE = rs01.getDouble("A2548FEE");
                objRtn.A2548TASAC = rs01.getString("A2548TASAC");
                objRtn.A2548TOTAL = rs01.getDouble("A2548TOTAL");
                objRtn.A2548TARIA = rs01.getDouble("A2548TARIA");
                objRtn.A2548TTAXA = rs01.getDouble("A2548TTAXA");
                objRtn.A2548SERVA = rs01.getDouble("A2548SERVA");
                objRtn.A2548COMIA = rs01.getDouble("A2548COMIA");
                objRtn.A2548SCOMA = rs01.getDouble("A2548SCOMA");
                objRtn.A2548TAXCA = rs01.getDouble("A2548TAXCA");
                objRtn.A2548PORCA = rs01.getDouble("A2548PORCA");
                objRtn.A2548PENAA = rs01.getDouble("A2548PENAA");
                objRtn.A2548FEEA = rs01.getDouble("A2548FEEA");
                objRtn.A2548TASAA = rs01.getString("A2548TASAA");
                objRtn.A2548IVACS = rs01.getDouble("A2548IVACS");
                objRtn.A2548TARID = rs01.getDouble("A2548TARID");
                objRtn.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objRtn.A2548SERVD = rs01.getDouble("A2548SERVD") + rs01.getDouble("A2548TCARD");
                objRtn.A2548COMID = rs01.getDouble("A2548COMID");
                objRtn.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objRtn.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objRtn.A2548PORCD = rs01.getDouble("A2548PORCD");
                objRtn.A2548PENAD = rs01.getDouble("A2548PENAD");
                objRtn.A2548FEED = rs01.getDouble("A2548FEED");
                objRtn.A2548TTACD = rs01.getDouble("A2548TTACD");
                objRtn.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                objRtn.A2548TCARD = rs01.getDouble("A2548TCARD");
                objRtn.A2548IVACA = rs01.getDouble("A2548IVACA");
                objRtn.A2548NETO = rs01.getDouble("A2548NETO");

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
}
