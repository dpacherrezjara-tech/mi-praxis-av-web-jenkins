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
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class BsplinkReportsStatisticsDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3389Filter> SearchReportGeneral(A3389Filter filter) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02827(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_COUNTRY);
            cstmt01.setString(6, filter.IN_DOCUMET);
            cstmt01.setString(7, filter.IN_USER);
            cstmt01.setString(8, filter.IN_IATA);
            cstmt01.setString(9, filter.IN_STATUS);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                objRtn.A3389FAPPI = rs01.getString("A3389FAPPI");
                //totales
                objRtn.A3389PENQTY = rs01.getDouble("PEDIENQTY");
                objRtn.A3389PENPJE = rs01.getDouble("PEDIENPORC");
                objRtn.A3389APROVQTY = rs01.getDouble("APROVQTY");
                objRtn.A3389APROVPJE = rs01.getDouble("APROVPORC");
                objRtn.A3389RCHAQTY = rs01.getDouble("RECHAQTY");
                objRtn.A3389RCHAPJE = rs01.getDouble("RECHAPORC");
                objRtn.A3389TOTALQTY = rs01.getDouble("TOTALQTY");
                //sumas
                objRtn.A3389PENSUM = rs01.getDouble("PEDIENSUM");
                objRtn.A3389PENPJESUM = rs01.getDouble("PEDIENSUMPORC");
                objRtn.A3389APROVSUM = rs01.getDouble("APROVSUM");
                objRtn.A3389APROVPJESUM = rs01.getDouble("APROVSUMPORC");
                objRtn.A3389RCHASUM = rs01.getDouble("RECHASUM");
                objRtn.A3389RCHAPJESUM = rs01.getDouble("RECHASUMPORC");
                objRtn.A3389TOTALSUM = rs01.getDouble("TOTALSUM");
                //DATOS GENERALS
                objRtn.A3389PAIS = rs01.getString("A3389PAIS");
                objRtn.A3389MDA = rs01.getString("A3389MDA");
                objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                objRtn.A3389IATA = rs01.getString("A3389IATA");
                objRtn.A3389AGENT = rs01.getString("A3389AGENT");
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

    public List<A3389Filter> SearchReportDetail(A3389Filter filter) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02842(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_A3389FAPPI);
            cstmt01.setString(4, filter.IN_A3389FAUTHORISE);
            cstmt01.setString(5, filter.IN_A3389REJECT);
            cstmt01.setString(6, filter.IN_A3389PENDING);
            cstmt01.setString(7, filter.IN_A3389MDA);
            cstmt01.setString(8, filter.IN_A3389PAIS);
            cstmt01.setString(9, filter.IN_A3389IATA);
            cstmt01.setString(10, filter.IN_A3389REGAS);
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
                objRtn = new A3389Filter();
                objRtn.A3389FAPPI = rs01.getString("A3389FAPPI");
                objRtn.A3389FAUTO = rs01.getString("A3389FAUTO");
                objRtn.A3389NUMER = rs01.getString("A3389NUMER");
                objRtn.A3389PAIS = rs01.getString("A3389PAIS");
                objRtn.A3389MDA = rs01.getString("A3389MDA");
                objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                objRtn.A3389FLAG = rs01.getString("A3389FLAG");
                objRtn.A3389IATA = rs01.getString("A3389IATA");
                objRtn.A3389NOMAGENCY = rs01.getString("A3389NOMAGENCY");
                objRtn.A3389DIAS = rs01.getString("DIAS");
                objRtn.A3389CANT = rs01.getInt("RN");
                objRtn.A3389TCODE = rs01.getString("PAYMETRFND");
                //AEROLINEA
                objRtn.A3389TARIF = rs01.getDouble("A3389TARIF");
                objRtn.A3389TTAX = rs01.getDouble("A3389TTAX");
                objRtn.A3389PENAL = rs01.getDouble("A3389PENAL");
                objRtn.A3389PORPE = rs01.getDouble("A3389PORPE");
                objRtn.A3389TOTAL = rs01.getDouble("A3389TOTAL");

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
    
    public List<A3389Filter> SearchReportGrafico(A3389Filter filter) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03199(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_COUNTRY);
            cstmt01.setString(6, filter.IN_DOCUMET);
            cstmt01.setString(7, filter.IN_USER);
            cstmt01.setString(8, filter.IN_IATA);
            cstmt01.setString(9, filter.IN_STATUS);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                objRtn.A3389RAUD = rs01.getString("A3389RAUD");
                objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                objRtn.A3389PAIS = rs01.getString("PAIS");
                //sumas
                objRtn.A3389CANT = rs01.getDouble("CANTI");
                objRtn.A3389TOTAL = rs01.getDouble("TOTAL");
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
