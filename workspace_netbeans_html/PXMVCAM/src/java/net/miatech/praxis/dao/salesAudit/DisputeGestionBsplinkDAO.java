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
import net.miatech.beans.SaleAudit.A3182Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.utils.Functions;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class DisputeGestionBsplinkDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00911Filter> SearchReportADM(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01964(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(21, Types.INTEGER);
            cstmt01.registerOutParameter(22, Types.INTEGER);
            cstmt01.registerOutParameter(23, Types.INTEGER);
            cstmt01.registerOutParameter(24, Types.INTEGER);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(4, filter.NUMBERADM);
            cstmt01.setString(5, filter.DATEFROM);
            cstmt01.setString(6, filter.DATETO);
            cstmt01.setString(7, filter.COUNTRY);
            cstmt01.setString(8, filter.CURRENCY);
            cstmt01.setString(9, filter.CHANNEL);
            cstmt01.setString(10, filter.AUTMAN);
            cstmt01.setString(11, filter.STATUS);
            cstmt01.setString(12, filter.COMBOCHANNEL);
            cstmt01.setString(13, filter.TRNCU);
            cstmt01.setString(14, filter.VP_CNXPA);
            cstmt01.setString(15, filter.VP_IATA);
            cstmt01.setString(16, filter.VP_TUORCODE);
            cstmt01.setString(17, filter.VP_USER);
            cstmt01.setString(18, filter.VP_TYPE);
            cstmt01.setString(19, filter.VP_AREA);
            cstmt01.setString(20, filter.VP_EROOR);
            cstmt01.setInt(21, filter.page.PAGNUM);
            cstmt01.setInt(22, filter.page.PAGROW);
            cstmt01.setInt(23, filter.page.TOTPAG);
            cstmt01.setInt(24, filter.page.TOTROW);
            

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(21);
            filter.page.PAGROW = cstmt01.getInt(22);
            filter.page.TOTPAG = cstmt01.getInt(23);
            filter.page.TOTROW = cstmt01.getInt(24);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548FTE = rs01.getString("A2548FTE");
                objRtn.A2548MDA = rs01.getString("A2548MDA");
                objRtn.A2548TRNCU = rs01.getString("A2548TRNCU");
                objRtn.A2548BASE = rs01.getString("A2548BASE");
                objRtn.A2548NMEMO = rs01.getString("A2548NMEMO");
                objRtn.A2548CNXPA = rs01.getString("A2548CNXPA");
                objRtn.A2548CATNNTD = rs01.getInt("A2548COUNT");
                objRtn.A2548FCONT = rs01.getString("A2548FCONT");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.A2548REGIS = rs01.getString("A2548REGIS");
                objRtn.CODIT = rs01.getString("A3090FBILI");
                objRtn.AGENCY = rs01.getString("AGENCY");
                objRtn.strNombreAgente = rs01.getString("STRNOMBREAGENTE");
                objRtn.strDirecAgente = rs01.getString("STRDIRECAGENTE");
                objRtn.A2548TRNCO = rs01.getString("A2548TRNCO");
                objRtn.A2548FTE = rs01.getString("A2548FTE");
                objRtn.A2548PAIS = rs01.getString("A2548PAIS");
                objRtn.A2548AREA = rs01.getString("A2548AREA");
                objRtn.A2548AREADES = rs01.getString("A2548AREADES");
                objRtn.A2548CANTIDAD= rs01.getInt("RN");

                //AEROLINEA
                objRtn.A2548TARIF = rs01.getDouble("A2548TARIF");
                objRtn.A2548TTAX = rs01.getDouble("A2548TTAX");
                objRtn.A2548SERVI = rs01.getDouble("A2548SERVI");
                objRtn.A2548IVACS = rs01.getDouble("A2548IVACS");
                objRtn.A2548COMIS = rs01.getDouble("A2548COMIS");
                objRtn.A2548SCOM = rs01.getDouble("A2548SCOM");
                objRtn.A2548TAXCM = rs01.getDouble("A2548TAXCM");
                objRtn.A2548PORCO = rs01.getDouble("A2548PORCO");
                objRtn.A2548PENAL = rs01.getDouble("A2548PENAL");
                objRtn.A2548FEE = rs01.getDouble("A2548FEE");
                objRtn.A2548FDISP = rs01.getString("A3090FDISP");
                objRtn.A2548TOTAL = rs01.getDouble("A2548TOTAL");

                //AGENCIA
                objRtn.A2548TARIA = rs01.getDouble("A2548TARIA");
                objRtn.A2548TTAXA = rs01.getDouble("A2548TTAXA");
                objRtn.A2548SERVA = rs01.getDouble("A2548SERVA");
                objRtn.A2548IVACA = rs01.getDouble("A2548IVACA");
                objRtn.A2548COMIA = rs01.getDouble("A2548COMIA");
                objRtn.A2548SCOMA = rs01.getDouble("A2548SCOMA");
                objRtn.A2548TAXCA = rs01.getDouble("A2548TAXCA");
                objRtn.A2548PORCA = rs01.getDouble("A2548PORCA");
                objRtn.A2548PENAA = rs01.getDouble("A2548PENAA");
                objRtn.A2548FEEA = rs01.getDouble("A2548FEEA");
                //objRtnTkt.A2548TASAA = rs03.getString("A2548TASAA");
                objRtn.A2548TOTAA = rs01.getDouble("A2548TOTAA");

                //DIFENRENCIAS
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
                //objRtnTkt.A2548TASAD = rs03.getString("A2548TASAD");
                objRtn.A2548TOTAD = rs01.getDouble("A2548TOTAD");
                objRtn.A2548NETO = rs01.getDouble("A2548NETO");

                objRtn.A2548SEMAFORO = rs01.getString("TRAFFIC_LIGHT");
                objRtn.A2548DIAS = rs01.getString("DIAS");
                objRtn.A2548EMAIL = rs01.getString("A2548EMAIL");

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

    public String insertTracing(A2553 filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL PXSAUDIT.SQP02016(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            //cs.setString("IN_ACTION",strOption);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_TRNCU", filter.A2553TRNCU);
            cs.setString("IN_STAT", filter.A2553STAT);
            cs.setString("IN_NMEMO", filter.A2553NMEMO);
            cs.setString("IN_DESCR", filter.A2553DESCR);
            cs.setString("IN_ARCHV", filter.A2553ARCHV);
            cs.setString("IN_ARCHV2", filter.A2553ARCHV2);
            cs.setString("IN_ARCHV3", filter.A2553ARCHV3);
            cs.setString("IN_PAIS", filter.A2553PAIS);
            cs.setString("IN_FOLIO", filter.A2553FOLIO);
            cs.setString("IN_STATO", filter.A2553STAT2);
             cs.setString("IN_CNXPA", filter.A2553CNXPA);

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

    public List<A3182Filter> SearchRazon(A3182Filter filter) throws SQLException, Exception {
        List<A3182Filter> lstRtn = new ArrayList<A3182Filter>(0);
        A3182Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02072(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PAIS);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3182Filter();
                objRtn.A3182COMRE = rs01.getString("A3182COMRE");
                objRtn.A3182CODRZ = rs01.getString("A3182CODRZ");
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

    public String savecorreo(List<SQP00911Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL PXSAUDIT.SQP02239(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (SQP00911Filter obj : filter) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_A2548NMEMO", obj.A2548NMEMO);
                cs.setString("IN_A2548PAIS", obj.A2548PAIS);
                cs.setString("IN_A2548FTE", obj.A2548FTE);
                cs.setString("IN_A2548IATA", obj.A2548IATA);
                cs.setString("IN_A2548AREA", obj.A2548AREA);
                cs.setDouble("IN_A2548NETO", obj.A2548NETO);
                cs.setString("IN_A2548SEMAFORO", obj.A2548SEMAFORO);
                cs.setString("IN_A2548DIAS", obj.A2548DIAS);
                cs.setString("IN_A2548CNXPA", obj.A2548CNXPA);
                cs.setString("IN_A2548TRNCU", obj.A2548TRNCU);

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
    
    public List<SQP00911Filter> loadDataInit(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03197(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
           
            
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548DESC1 = rs01.getString("A2548DESC1");
                objRtn.A2548CODR1 = rs01.getString("A2548CODR1");

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
