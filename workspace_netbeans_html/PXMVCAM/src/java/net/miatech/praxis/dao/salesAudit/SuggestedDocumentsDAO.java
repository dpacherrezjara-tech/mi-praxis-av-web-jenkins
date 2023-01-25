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
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class SuggestedDocumentsDAO {
    
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1672Filter> SearchReportGeneral(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<A1672Filter>(0);
        A1672Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02864(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPTION);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_COUNTRY);
            cstmt01.setString(6, filter.VP_DOCUMET);
            cstmt01.setString(7, filter.VP_USER);
            cstmt01.setString(8, filter.VP_IATA);
            cstmt01.setString(9, filter.VP_SOURCE);
            cstmt01.setString(10, filter.VP_CUR);
            cstmt01.setString(11, filter.VP_STATUS);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1672Filter();
                objRtn.A1672FPROC = rs01.getString("A3329FPROC");
                objRtn.A1672FUENT = rs01.getString("A3329FUETE");
                objRtn.A1672PAIVT = rs01.getString("A3329PAIS");
                objRtn.A1672REVIS = rs01.getString("A3329REGIS");
                objRtn.A1672AGENT = rs01.getString("A3329IATA");
                objRtn.A1672NAGENCY = rs01.getString("A3389AGENT");
                objRtn.A1672CURRENCY = rs01.getString("A3329CUR");
                            
                //totales
                 objRtn.REJETQTY = rs01.getDouble("REJETQTY"); 
                 objRtn.REJETPORC = rs01.getDouble("REJETPORC"); 
                 objRtn.REAUTQTY = rs01.getDouble("REAUTQTY"); 
                 objRtn.REAUTPORC = rs01.getDouble("REAUTPORC"); 
                 objRtn.JUSTIQTY = rs01.getDouble("JUSTIQTY");
                 objRtn.JUSTIPORC = rs01.getDouble("JUSTIPORC");
                 objRtn.AUTHOQTY = rs01.getDouble("AUTHOQTY");
                 objRtn.AUTHOPORC = rs01.getDouble("AUTHOPORC");
                 objRtn.SUGGESTQTY = rs01.getDouble("SUGGESTQTY");
                 objRtn.SUGGESTPORC = rs01.getDouble("SUGGESTPORC");
                 objRtn.ACCEPTQTY = rs01.getDouble("ACCEPTQTY");
                 objRtn.ACCEPTPORC = rs01.getDouble("ACCEPTPORC");
                 objRtn.TOTAL = rs01.getDouble("TOTAL");
                //sumas
                //DATOS GENERALS
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
    
    public List<A1672Filter> SearchReportDetail(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<A1672Filter>(0);
        A1672Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02869(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            
            
            
            cstmt01.setString(1, filter.VP_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_FLAG);
            cstmt01.setString(5, filter.VP_CUR);
            cstmt01.setString(6, filter.VP_PAIS);
            cstmt01.setString(7, filter.VP_IATA);
            cstmt01.setString(8, filter.VP_USER);
            cstmt01.setString(9, filter.VP_SOURCE);
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
                objRtn = new A1672Filter();
                objRtn.A1672CCUST = rs01.getString("A3329CCUST");
                objRtn.A1672CIA = rs01.getString("A3329CIA");
                objRtn.A1672FORMA = rs01.getString("A3329FORMA");
                objRtn.A1672SERIE = rs01.getString("A3329SERIE");
                objRtn.A1672SEQ = rs01.getString("A3329SEQ");
                objRtn.A1672TRNCU = rs01.getString("A3329TRNCU");
                objRtn.A1672PAIVT = rs01.getString("A3329PAIS");
                objRtn.A1672FUENT = rs01.getString("A3329FUETE");
                objRtn.A1672CPNS = rs01.getString("A3329CPN");
                objRtn.A1672ITIN = rs01.getString("A3329ITINE");
                objRtn.A1672FPROC = rs01.getString("A3329FPROC");
                objRtn.A1672FREGI = rs01.getString("A3329FREGI");
                objRtn.A1672TKCNX= rs01.getString("A3329CIA") +""+rs01.getString("A3329FORMA")+""+rs01.getString("A3329SERIE");
                
                objRtn.A1672COMIA = rs01.getString("A3329BEFOR");
                objRtn.A1672COMEN = rs01.getString("A3329COMEN"); 
                objRtn.A1672MONET = rs01.getString("A3329CUR"); 
                objRtn.A1672CNX1 = rs01.getString("A3329CNXPA"); 
                objRtn.A1672REVIS = rs01.getString("A3329REGIS"); 
                objRtn.A1672FLADM = rs01.getString("A3329STATU"); 
                objRtn.A1672AGENT = rs01.getString("A3329IATA");
                objRtn.A1672NAGENCY = rs01.getString("A3329NOMAGENCY");
                
                objRtn.A1672YQORI = rs01.getDouble("A3329NETO");
                objRtn.A1672TARAI = rs01.getDouble("A3329NETRV");  

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
    
     public List<A1672Filter> SearchReportGeneral2(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<A1672Filter>(0);
        A1672Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02877(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPTION);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_COUNTRY);
            cstmt01.setString(6, filter.VP_DOCUMET);
            cstmt01.setString(7, filter.VP_USER);
            cstmt01.setString(8, filter.VP_IATA);
            cstmt01.setString(9, filter.VP_SOURCE);
            cstmt01.setString(10, filter.VP_CUR);
            cstmt01.setString(11, filter.VP_STATUS);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1672Filter();
                objRtn.A1672FPROC = rs01.getString("A1672FPROC");
                objRtn.A1672FUENT = rs01.getString("A1672FUENT");
                objRtn.A1672PAIVT = rs01.getString("A1672PAIVT");
                objRtn.A1672REVIS = rs01.getString("A1672REVIS");
                objRtn.A1672AGENT = rs01.getString("A1672AGENT");
                objRtn.A1672NAGENCY = rs01.getString("A1672AGENTNOM");
                objRtn.A1672CURRENCY = rs01.getString("A1672CUR");
                            
                //totales
                objRtn.SUGGESTQTY = rs01.getDouble("SUGERIDO");
                objRtn.SUGGESTPORC = rs01.getDouble("SUGERIDOPORC");
                objRtn.REJETQTY = rs01.getDouble("RECHAZADO"); 
                objRtn.REJETPORC = rs01.getDouble("RECHAZADOPORC"); 
                objRtn.REAUTQTY = rs01.getDouble("REAUDITED"); 
                objRtn.REAUTPORC = rs01.getDouble("REAUDITEDPORC");
                objRtn.JUSTIQTY = rs01.getDouble("JUSTIFIED");
                objRtn.JUSTIPORC = rs01.getDouble("JUSTIFIEDPORC");
                objRtn.AUTHOQTY = rs01.getDouble("AUTHORIZED");
                objRtn.AUTHOPORC = rs01.getDouble("AUTHORIZEDPORC"); 
                objRtn.ACCEPTQTY = rs01.getDouble("APROBADO");
                objRtn.ACCEPTPORC = rs01.getDouble("APROBADOPORC"); 
                objRtn.CLIENTEQTY = rs01.getDouble("CLIENTE");
                objRtn.CLIENTEPORC = rs01.getDouble("CLIENTEPORC");
                objRtn.DESHABIQTY = rs01.getDouble("DESHABI");
                objRtn.DESHABIPORC = rs01.getDouble("DESHABIPORC");
                objRtn.PEDIENTEQTY = rs01.getDouble("PEDIENTE");
                objRtn.PEDIENTEPORC = rs01.getDouble("PEDIENTEPORC");
                
                objRtn.CANTADMGDS = rs01.getInt("CANTADMGDS");
                objRtn.CANTBILLEDPORC = rs01.getDouble("CANTADMGDSPORC");
                 
                 objRtn.TOTAL = rs01.getDouble("TOTALQTY");
                 
                 
                                 
                //sumas
                //DATOS GENERALS
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
