package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A1155Filter;
import net.miatech.beans.SaleAudit.A1179Filter;
import net.miatech.beans.SaleAudit.BEANSCONSOLE;
import net.miatech.beans.SaleAudit.CONSOLE_PARANT;
import net.miatech.beans.SaleAudit.SQP01597Filter;
import net.miatech.beans.SaleAudit.SQP01723Filter;
import net.miatech.praxis.A051;
import net.miatech.praxis.SaleAudit.PSA00004;
import net.miatech.praxis.SaleAudit.SQP01090;
import net.miatech.praxis.SaleAudit.SQP01265;
import net.miatech.praxis.SaleAudit.SQP01723;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InputSchemeUpfrontDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>
    private int XXCN = 0;
    private Boolean XXSC = false;

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1155Filter> getListAgreement(A1155Filter filter) throws SQLException, Exception {
        List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        A1155Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01131(?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            
            cstmt01.setString(1, filter.A1155AIRLI);
            cstmt01.setString(2, filter.A1155CODAC);
            cstmt01.setString(3, filter.A1155INDAC);
            cstmt01.setString(4, filter.A1155VRSAC);
            cstmt01.setString(5, filter.A1155FESTA);
            cstmt01.setString(6, filter.A1155FINI);
            cstmt01.setString(7, filter.A1155FINGR);
            
            cstmt01.setString(8, filter.TITLE.trim());
            
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1155Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.TITLE = rs01.getString("A3051TITLE");
                objRtn.A1155AIRLI = rs01.getString("A1155AIRLI");
                objRtn.A1155CIA1 = rs01.getString("A1155CIA1").trim();
                objRtn.A1155CIA2 = rs01.getString("A1155CIA2").trim();
                objRtn.A1155VLINI = rs01.getString("A1155VLINI").trim();
                objRtn.A1155VLFIN = rs01.getString("A1155VLFIN").trim();
                objRtn.A1155CNUM = rs01.getString("A1155CNUM").trim();
                objRtn.A1155FNUM = rs01.getString("A1155FNUM").trim();
                objRtn.A1155CODAC = rs01.getString("A1155CODAC").trim();
                objRtn.A1155INDAC = rs01.getString("A1155INDAC").trim();
                objRtn.A1155VRSAC = rs01.getString("A1155VRSAC").trim();
                objRtn.A1155FLGAD = rs01.getString("A1155FLGAD").trim();
                objRtn.A1155FINI = Functions.getMonthConvertDate(rs01.getString("A1155FINI").trim());
                objRtn.A1155FFIN = Functions.getMonthConvertDate(rs01.getString("A1155FFIN").trim());
                objRtn.A1155FLGFE = rs01.getString("A1155FLGFE").trim();
                objRtn.A1155FLGAU = rs01.getString("A1155FLGAU").trim();//Functions.getMonthConvertDate(rst.getString("A1736FREVI"));
                objRtn.A1155FESTA = rs01.getString("A1155FESTA").trim();
                objRtn.A1155INDIC = rs01.getString("A1155INDIC").trim();
                objRtn.A1155MPA = rs01.getString("A1155MPA").trim();
                objRtn.A1155SRP = rs01.getString("A1155SRP").trim();//Functions.ConvertedTime(rst.getString("A1736HREVI"));
                objRtn.A1155PRO = rs01.getString("A1155PRO").trim();
                objRtn.A1155TRAMO = rs01.getString("A1155TRAMO").trim();
                objRtn.A1155DEFAU = rs01.getString("A1155DEFAU").trim();
                objRtn.A1155PDEFA = rs01.getString("A1155PDEFA").trim();
                objRtn.A1155IDSCO = rs01.getString("A1155IDSCO").trim();
                objRtn.A1155PISC = rs01.getString("A1155PISC").trim();//Functions.getMonthConvertDate(rst.getString("A1736FREGI"));
                objRtn.A1155FRECE = Functions.getMonthConvertDate(rs01.getString("A1155FRECE").trim());//Functions.ConvertedTime(rst.getString("A1736HREGI"));
                objRtn.A1155CIAFM = rs01.getString("A1155CIAFM").trim();//Functions.getMonthConvertDate(rst.getString("A1736FINI"));
                objRtn.A1155FNAME = rs01.getString("A1155FNAME").trim();//Functions.getMonthConvertDate(rst.getString("A1736FFIN"));
                
                objRtn.A1155CODSP = rs01.getString("A1155CODSP").trim();
                objRtn.A1155CORRE = rs01.getString("A1155CORRE").trim();
                objRtn.A1155ESTAD = rs01.getString("A1155ESTAD").trim();
                objRtn.A1155UINGR = rs01.getString("A1155UINGR").trim();
                objRtn.A1155FINGR = Functions.getMonthConvertDate(rs01.getString("A1155FINGR").trim());
                objRtn.A1155HINGR = Functions.ConvertedTime(rs01.getString("A1155HINGR").trim());
                objRtn.A1155UMODI = rs01.getString("A1155UMODI").trim();
                objRtn.A1155FMODI = Functions.getMonthConvertDate(rs01.getString("A1155FMODI").trim());
                objRtn.A1155HMODI = Functions.ConvertedTime(rs01.getString("A1155HMODI").trim());
     
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
    
    public List<SQP01090> getSQP01096() throws SQLException, Exception {
        List<SQP01090> lstRtn = new ArrayList<SQP01090>(0);
        SQP01090 objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01096()}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01090(); 
                objRtn.A1172EQUIV = rs01.getString("A006PAIS").trim();
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
    
    public List<CONSOLE_PARANT> getFunctions(CONSOLE_PARANT filter) throws SQLException, Exception {
        List<CONSOLE_PARANT> lstRtn = new ArrayList<CONSOLE_PARANT>(0);
        CONSOLE_PARANT objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        //String SQLCLL01 = "{CALL PXCOMM.PSA00008(?,?)}";//" + session.getMainLibrary() + "
        String SQLCLL01 = "{CALL PXCOMM.SQP01142(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.VP_TYPE);
            cstmt01.setString(2, filter.VP_POSITION);
            cstmt01.setString(3, filter.VP_STATUS);
            cstmt01.setString(4, filter.VP_INDAC);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new CONSOLE_PARANT();
                objRtn.CODIGO = rs01.getString("CODIGO").trim();
                objRtn.NOMBRE = rs01.getString("NOMBRE");
                objRtn.NOMBREREAL = rs01.getString("NOMBREREAL").trim();
                objRtn.TYPE = rs01.getString("TYPE").trim();
                objRtn.FUNCTION = rs01.getString("FUNCTION");
                objRtn.NPARAMT = rs01.getString("NPARAMT");
                objRtn.TVALID = rs01.getString("TVALID");
                objRtn.DRINKID = rs01.getString("DRINKID");
                objRtn.DRINKKEY = rs01.getString("DRINKKEY");
                objRtn.PARA1 = rs01.getString("PARA1").trim();
                objRtn.PARA2 = rs01.getString("PARA2").trim();
                objRtn.LIMITLIST1 = rs01.getString("LIMITLIST1").trim();
                objRtn.LIMITLIST2 = rs01.getString("LIMITLIST2").trim();
                objRtn.DESCRIP = rs01.getString("DESCRIP").trim();
                objRtn.CODIGOPADRE = rs01.getString("CODIGOPADRE").trim();
                objRtn.NOMBREPADRE = rs01.getString("NOMBREPADRE").trim();

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
    
    public List<CONSOLE_PARANT> getFunctionsParamsA(CONSOLE_PARANT filter) throws SQLException, Exception {
        List<CONSOLE_PARANT> lstRtn = new ArrayList<CONSOLE_PARANT>(0);
        CONSOLE_PARANT objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        //String SQLCLL01 = "{CALL PXCOMM.PSA00008(?,?)}";//" + session.getMainLibrary() + "
        String SQLCLL01 = "{CALL PXCOMM.SQP01144(?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.VP_CODIGO);
            cstmt01.setString(2, filter.VP_TYPE);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new CONSOLE_PARANT();
                objRtn.CODIGO = rs01.getString("CODIGO").trim();
                objRtn.NOMBRE = rs01.getString("NOMBRE");
                objRtn.TYPE = rs01.getString("TYPE");
                objRtn.PARA1 = rs01.getString("PARA1").trim();
                objRtn.PARA2 = rs01.getString("PARA2").trim();
                objRtn.LIMITLIST1 = rs01.getString("LIMITLIST1").trim();
                objRtn.LIMITLIST2 = rs01.getString("LIMITLIST2").trim();
                objRtn.DESCRIP = rs01.getString("DESCRIP").trim();
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
    
    public List<CONSOLE_PARANT> getFunctionsParamsA2(CONSOLE_PARANT filter) throws SQLException, Exception {
        List<CONSOLE_PARANT> lstRtn = new ArrayList<CONSOLE_PARANT>(0);
        CONSOLE_PARANT objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01143(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.VP_CODIGO);
            cstmt01.setString(2, filter.VP_POSITION);
            cstmt01.setString(3, filter.VP_STATUS);
            cstmt01.setString(4, filter.VP_INDAC);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new CONSOLE_PARANT();
                objRtn.CODIGO = rs01.getString("CODIGO").trim();
                objRtn.NOMBRE = rs01.getString("NOMBRE");
                objRtn.TYPE = rs01.getString("TYPE");
                
                objRtn.FUNCTION = rs01.getString("FUNCTION");
                objRtn.NPARAMT = rs01.getString("NPARAMT");
                objRtn.TVALID = rs01.getString("TVALID");
                objRtn.DRINKID = rs01.getString("DRINKID");
                objRtn.DRINKKEY = rs01.getString("DRINKKEY");
                
                objRtn.PARA1 = rs01.getString("PARA1").trim();
                objRtn.PARA2 = rs01.getString("PARA2").trim();
                objRtn.LIMITLIST1 = rs01.getString("LIMITLIST1").trim();
                objRtn.LIMITLIST2 = rs01.getString("LIMITLIST2").trim();
                objRtn.DESCRIP = rs01.getString("DESCRIP").trim();
                objRtn.CODIGOPADRE = rs01.getString("CODIGOPADRE").trim();
                objRtn.NOMBREPADRE = rs01.getString("NOMBREPADRE").trim();
                objRtn.NOMBREPADRE = rs01.getString("NOMBREPADRE").trim();
                objRtn.POSITION = rs01.getString("POSITION").trim();
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
    
    public List<SQP01265> getListLabel(SQP01265 filter) throws SQLException, Exception {
        List<SQP01265> lstRtn = new ArrayList<SQP01265>(0);
        SQP01265 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01470(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_AIRLINE);
            cstmt01.setString(2, filter.VP_CODE);
            cstmt01.setString(3, filter.VP_INDAC);
            cstmt01.setString(4, filter.VP_IATA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01265();
                objRtn.A2862EFFST = Functions.getMonthConvertDate(rs01.getString("A2862EFFST").trim());
                objRtn.A2862EFFEN = Functions.getMonthConvertDate(rs01.getString("A2862EFFEN").trim());
                objRtn.A2862LABEN = rs01.getString("A2862LABEN").trim();
                objRtn.A2862PERCE = rs01.getString("A2862PERCE").trim();
                objRtn.A2862CRITE = rs01.getString("A2862CRITE").trim();
                
                objRtn.A2862LABED = rs01.getString("A2862LABED").trim();
                objRtn.A2862LABET = rs01.getString("A2862LABET").trim();
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01265> getListIATAGROUP(SQP01265 filter) throws SQLException, Exception {
        List<SQP01265> lstRtn = new ArrayList<SQP01265>(0);
        SQP01265 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01265(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_AIRLINE);
            cstmt01.setString(2, filter.VP_IATA);
            cstmt01.setString(3, filter.VP_INDAC);
            cstmt01.setString(4, filter.VP_CODE);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01265();
                objRtn.IATA = rs01.getString("IATA").trim();
                objRtn.NAME = rs01.getString("NAME").trim();
                objRtn.A2649TIPO = rs01.getString("A2649TIPO").trim();
                objRtn.A2649CANAL = rs01.getString("A2649CANAL").trim();
                objRtn.COUNTRY = rs01.getString("COUNTRY").trim();
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
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
    
    public List<A1155Filter>  setMantenimientoLabel( A1155Filter filter ,String VP_ACTION) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        String SQLCLL01 = "{CALL PXCOMM.SQP01469(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(20, Types.VARCHAR);
            cstmt01.registerOutParameter(21, Types.VARCHAR);
            
            
            cstmt01.setString(1, VP_ACTION );
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A1155AIRLI );
            cstmt01.setString(3, filter.A1155CODAC);
            cstmt01.setString(4, filter.A1155INDAC);
            cstmt01.setString(5, filter.A1155VRSAC);
            cstmt01.setString(6, filter.A1155FINI);
            cstmt01.setString(7, filter.A1155FFIN);
            cstmt01.setString(8, filter.A1155FMODI);
            cstmt01.setString(9, filter.A1155CIAFM);
            cstmt01.setString(10, filter.A1155FNAME);
            cstmt01.setDouble(11, Double.parseDouble(filter.A1155PORCENT));
            cstmt01.setString(12, filter.A1155CORRE);
            cstmt01.setString(13, filter.A1155FLGFE);
            cstmt01.setString(14, session.getUserView().getCustomerInfo().USR);
            cstmt01.setString(15, filter.A1155FINGR);
            cstmt01.setString(16, filter.A1155HINGR);
            cstmt01.setString(17, session.getUserView().getCustomerInfo().USR);
            cstmt01.setString(18, filter.A1155HINGR);
            cstmt01.setString(19, filter.A1155HMODI);
            
            
            cstmt01.execute();
            filter.OU_SQLCODE = cstmt01.getString(20);
            filter.OU_MESSAGE = cstmt01.getString(21);
            
            A1155Filter objRtn;
            objRtn = new A1155Filter();
            objRtn.OU_SQLCODE = filter.OU_SQLCODE;
            objRtn.OU_MESSAGE = filter.OU_MESSAGE;
            lstRtn.add(objRtn);
            
        } finally {
            if (cstmt01 != null) {                
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<A1179Filter> getTableTmp(A1179Filter filter) throws SQLException, Exception {
        List<A1179Filter> lstRtn = new ArrayList<A1179Filter>(0);
        A1179Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01145(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.A1179AIRLI);
            cstmt01.setString(2, filter.A1179CODAC);
            cstmt01.setString(3, filter.A1179INDAC);
            cstmt01.setString(4, filter.A1179VRSAC);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1179Filter();
                objRtn.A1179INDIC = rs01.getString("TYPE").trim();
                objRtn.A1179FUNC = rs01.getString("NAME").trim();
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<A1179Filter> getTableREF(A1179Filter filter) throws SQLException, Exception {
        List<A1179Filter> lstRtn = new ArrayList<A1179Filter>(0);
        A1179Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01109(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.A1179AIRLI);
            cstmt01.setString(2, filter.A1179CODAC);
            cstmt01.setString(3, filter.A1179INDAC);
            cstmt01.setString(4, filter.A1179VRSAC);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1179Filter();
                objRtn.A1179FUNC = rs01.getString("NOMBRE").trim();
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<BEANSCONSOLE> getListViewCCodeGlobal(SQP01090 filter) throws SQLException, Exception {
        List<BEANSCONSOLE> lstRtn = new ArrayList<BEANSCONSOLE>(0);
        BEANSCONSOLE objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01295(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.A1172AIRLI);
            cstmt01.setString(2, filter.A1172CODAC);
            cstmt01.setString(3, filter.A1172INDAC);
            cstmt01.setString(4, filter.A1172VRSAC);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new BEANSCONSOLE();
                objRtn.FUNC = rs01.getString("FUNCTION").trim();
                objRtn.PRMA1 = rs01.getString("DATO").trim();
                objRtn.PRMA2 = rs01.getString("OPERADOR").trim();
                objRtn.AAFIR = rs01.getString("VALUE").trim();
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<BEANSCONSOLE> getListViewCCodeSector(SQP01090 filter) throws SQLException, Exception {
        List<BEANSCONSOLE> lstRtn = new ArrayList<BEANSCONSOLE>(0);
        BEANSCONSOLE objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01296(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.A1172AIRLI);
            cstmt01.setString(2, filter.A1172CODAC);
            cstmt01.setString(3, filter.A1172INDAC);
            cstmt01.setString(4, filter.A1172VRSAC);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new BEANSCONSOLE();
                objRtn.STEP = rs01.getString("PORCENTAJE").trim();
                objRtn.INDIC = rs01.getString("A1171INDIC").trim();
                objRtn.FUNC = rs01.getString("FUNCTION").trim();
                objRtn.PRMA1 = rs01.getString("DATO").trim();
                objRtn.AAFIR = rs01.getString("VALUE").trim();
                objRtn.REFER = rs01.getString("A1171REFER").trim();
                objRtn.SELEC = this.getStep(Integer.parseInt(objRtn.INDIC));
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01265>  setGROUPCODE( SQP01265 filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<SQP01265> lstRtn = new ArrayList<SQP01265>(0);
        SQP01265 objRtn;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01216(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cnx.getMetaData();
            Functions.msjConsola("PRAXIS", cnx.getMetaData().getProcedureTerm().toString(), "PROCEDURE : SQP01216");
            cstmt01.registerOutParameter(7, Types.VARCHAR);
            cstmt01.registerOutParameter(8, Types.VARCHAR);
            
            cstmt01.setString(1, filter.VP_ACTION);
            cstmt01.setString(2, "139");
            cstmt01.setString(3, filter.VP_IATA);
            cstmt01.setString(4, filter.VP_INDAC);
            cstmt01.setString(5, filter.VP_CODE);
            cstmt01.setString(6, session.getUserView().getCustomerInfo().USR);
            
            cstmt01.execute();
            filter.OU_SQLCODE = cstmt01.getString(7);
            filter.OU_MESSAGE = cstmt01.getString(8);
            
            objRtn = new SQP01265();
            objRtn.OU_SQLCODE = filter.OU_SQLCODE;
            objRtn.OU_MESSAGE = filter.OU_MESSAGE;
            lstRtn.add(objRtn);
            
        } finally {
            if (cstmt01 != null) {                
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<PSA00004> getGROUPIATA(PSA00004 filter) throws SQLException, Exception {
        List<PSA00004> lstRtn = new ArrayList<PSA00004>(0);
        PSA00004 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01134(?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.A2649IATA);
            cstmt01.setString(3, filter.A2649INDAC);
            cstmt01.setString(4, filter.A003KEY3);
            cstmt01.setString(5, filter.A2649KGRUP);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new PSA00004();
                objRtn.A2649KGRUP = rs01.getString("A2649KGRUP").trim();
                objRtn.A2649IATA = rs01.getString("A2649IATA").trim();
                objRtn.A003KEY3 = rs01.getString("A003KEY3").trim();
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01090> getSQP01090(SQP01090 filter) throws SQLException, Exception {//TABLA AUXILIAR
        List<SQP01090> lstRtn = new ArrayList<SQP01090>(0);
        SQP01090 objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01090(?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.A1172AIRLI);
            cstmt01.setString(2, filter.A1172CODAC);
            cstmt01.setString(3, filter.A1172INDAC);
            cstmt01.setString(4, filter.A1172VRSAC);
            cstmt01.setString(5, filter.A1172FAMIL);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01090();
                objRtn.A1172AIRLI = rs01.getString("A1172AIRLI");
                objRtn.A1172CODAC = rs01.getString("A1172CODAC").trim();
                objRtn.A1172INDAC = rs01.getString("A1172INDAC").trim();
                objRtn.A1172VRSAC = rs01.getString("A1172VRSAC").trim();
                objRtn.A1172FAMIL = rs01.getString("A1172FAMIL").trim();
                objRtn.A1172TDATA = rs01.getString("A1172TDATA").trim();
                objRtn.A1172DATA = rs01.getString("A1172DATA").trim();
                objRtn.A1172VALOR = rs01.getString("A1172VALOR").trim();
                objRtn.A1172INDIC = rs01.getString("A1172INDIC").trim();
                objRtn.A1172PORCE = rs01.getString("A1172PORCE").trim();
                objRtn.A1172MONED = rs01.getString("A1172MONED").trim();
                objRtn.A1172METOD = rs01.getString("A1172METOD").trim();
                objRtn.A1172EQUIV = rs01.getString("A1172EQUIV").trim();
                objRtn.A1172UINGR = rs01.getString("A1172UINGR").trim();
                objRtn.A1172FINGR = Functions.getMonthConvertDate(rs01.getString("A1172FINGR").trim());
                objRtn.A1172HINGR = Functions.ConvertedTime(rs01.getString("A1172HINGR").trim());
                objRtn.A1172UMODI = rs01.getString("A1172UMODI").trim();
                objRtn.A1172FMODI = Functions.getMonthConvertDate(rs01.getString("A1172FMODI").trim());
                objRtn.A1172HMODI = Functions.ConvertedTime(rs01.getString("A1172HMODI").trim());
                objRtn.DESCRIPT = rs01.getString("DESCRIPT").trim();
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01090> getSQP01093(SQP01090 filter) throws SQLException, Exception {
        List<SQP01090> lstRtn = new ArrayList<SQP01090>(0);
        SQP01090 objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01093(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.A1172AIRLI);
            cstmt01.setString(2, filter.A1172CODAC);
            cstmt01.setString(3, filter.A1172INDAC);
            cstmt01.setString(4, filter.A1172VRSAC);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01090();
                objRtn.A1172FAMIL = rs01.getString("A1172FAMIL").trim();
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01090> getSQP01094(SQP01090 filter) throws SQLException, Exception {
        List<SQP01090> lstRtn = new ArrayList<SQP01090>(0);
        SQP01090 objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01094(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.A1172AIRLI);
            cstmt01.setString(2, filter.A1172CODAC);
            cstmt01.setString(3, filter.A1172INDAC);
            cstmt01.setString(4, filter.A1172VRSAC);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01090();
                objRtn.A1172TDATA = rs01.getString("A1172TDATA").trim();
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01090> getSQP01095(SQP01090 filter) throws SQLException, Exception {
        List<SQP01090> lstRtn = new ArrayList<SQP01090>(0);
        SQP01090 objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01095(?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(1, filter.A1172AIRLI);
            cstmt01.setString(2, filter.A1172CODAC);
            cstmt01.setString(3, filter.A1172INDAC);
            cstmt01.setString(4, filter.A1172VRSAC);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01090();
                objRtn.A1172METOD = rs01.getString("A1172METOD").trim();
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01090>  setSQP01090( SQP01090 filter ,String VP_ACTION) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<SQP01090> lstRtn = new ArrayList<SQP01090>(0);
        SQP01090 objRtn;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01091(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cnx.getMetaData();
            Functions.msjConsola("PRAXIS", cnx.getMetaData().getProcedureTerm().toString(), "PROCEDURE : setSQP01090");
            cstmt01.registerOutParameter(21, Types.VARCHAR);
            cstmt01.registerOutParameter(22, Types.VARCHAR);
            
            cstmt01.setString(1, VP_ACTION );
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A1172AIRLI );
            cstmt01.setString(3, filter.A1172CODAC);
            cstmt01.setString(4, filter.A1172INDAC);
            cstmt01.setString(5, filter.A1172VRSAC);
            cstmt01.setString(6, filter.A1172FAMIL);
            cstmt01.setString(7, filter.A1172TDATA);
            cstmt01.setString(8, filter.A1172DATA);
            cstmt01.setDouble(9, Double.parseDouble(filter.A1172VALOR));
            cstmt01.setString(10, filter.A1172INDIC);
            cstmt01.setDouble(11, Double.parseDouble(filter.A1172PORCE));
            cstmt01.setString(12, filter.A1172MONED);
            cstmt01.setString(13, filter.A1172METOD);
            cstmt01.setString(14, filter.A1172EQUIV);
            cstmt01.setString(15, session.getUserView().getCustomerInfo().USR);
            cstmt01.setString(16, "");//filter.A1172FINGR
            cstmt01.setString(17, "");//filter.A1172HINGR
            cstmt01.setString(18, session.getUserView().getCustomerInfo().USR);
            cstmt01.setString(19, "");//filter.A1172FMODI
            cstmt01.setString(20, "");//filter.A1172HMODI
            
            /*cstmt01.setString(39, filter.OU_SQLCODE);
            cstmt01.setString(40, filter.OU_MESSAGE);*/

            cstmt01.execute();
            filter.OU_SQLCODE = cstmt01.getString(21);
            filter.OU_MESSAGE = cstmt01.getString(22);
            
            objRtn = new SQP01090();
            objRtn.OU_SQLCODE = filter.OU_SQLCODE;
            objRtn.OU_MESSAGE = filter.OU_MESSAGE;
            lstRtn.add(objRtn);
            
        } finally {
            if (cstmt01 != null) {                
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<A051> getListCountry() throws SQLException, Exception {
        List<A051> lstRtn = new ArrayList<A051>(0);
        A051 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.PX128S01A051()}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A051();
                objRtn.A051KEY2 = rs01.getString("A051KEY2").trim();
                objRtn.A051DESCR1 = rs01.getString("A051DESCR1").trim();

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01597Filter> getCheckList(SQP01597Filter filter) throws SQLException, Exception {
        List<SQP01597Filter> lstRtn = new ArrayList<SQP01597Filter>(0);
        SQP01597Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01688(?,?,?,?,?,?,?,?,?,?,?)}";//SQP01363
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_AIRLI);
            cstmt01.setString(2, filter.VP_CODAC);
            cstmt01.setString(3, filter.VP_INDAC);
            cstmt01.setString(4, filter.VP_VRSAC);
            cstmt01.setInt(5, filter.VP_YEAR);
            cstmt01.setString(6, filter.VP_TPERI);
            cstmt01.setInt(7, filter.VP_PERIO);
            
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);
            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01597Filter();
                objRtn.RN = rs01.getInt("RN");
                 
                objRtn.A3012VAR = rs01.getString("A2984COD").trim();    
                objRtn.A3012NAME = rs01.getString("A2884DESCT").trim();
                objRtn.A3012SOURC = rs01.getString("A2884VALID").trim();
                objRtn.A3012SOURCN = rs01.getString("A2984MANDA").trim(); 
                objRtn.A3012DESCR= Functions.getMonthConvertDate(rs01.getString("A2884FECHA").trim());
                objRtn.A3012DESCI= Functions.ConvertedTime(rs01.getString("A2884HORA").trim());
                objRtn.A3012ELIGI= rs01.getString("A2884USER").trim();
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01723> getStatusList(SQP01723Filter filter) throws SQLException, Exception {
        List<SQP01723> lstRtn = new ArrayList<SQP01723>(0);
        SQP01723Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01723(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP01363
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.registerOutParameter(18, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_AIRLI);
            cstmt01.setString(2, filter.VP_CODAC);
            cstmt01.setString(3, filter.VP_INDAC);
            cstmt01.setString(4, filter.VP_VRSAC);
            cstmt01.setString(5, filter.VP_ENV);
            cstmt01.setString(6, filter.VP_TPC);
            cstmt01.setString(7, filter.VP_FOR);
            cstmt01.setString(8, filter.VP_COD);
            cstmt01.setInt(9, filter.VP_CDESQ);
            cstmt01.setInt(10, filter.VP_YEAR);
            cstmt01.setString(11, filter.VP_TPERI);
            cstmt01.setInt(12, filter.VP_PERIO);
            
            cstmt01.setString(13, filter.VP_COUNTRY);
            cstmt01.setString(14, filter.VP_SOURCE);
            
            cstmt01.setInt(15, filter.page.PAGNUM);
            cstmt01.setInt(16, filter.page.PAGROW);
            cstmt01.setInt(17, filter.page.TOTPAG);
            cstmt01.setInt(18, filter.page.TOTROW);
            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(15);
            filter.page.PAGROW = cstmt01.getInt(16);
            filter.page.TOTPAG = cstmt01.getInt(17);
            filter.page.TOTROW = cstmt01.getInt(18);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01723Filter();
                objRtn.RN = rs01.getInt("RN");
                
                objRtn.A3061CODE  = rs01.getString("A3061CODE").trim();    
                objRtn.A3061AIRLI  = rs01.getString("A3061AIRLI").trim();    
                objRtn.A3061CODAC  = rs01.getString("A3061CODAC").trim();    
                objRtn.A3061INDAC  = rs01.getString("A3061INDAC").trim();    
                objRtn.A3061VRSAC  = rs01.getString("A3061VRSAC").trim();    
                objRtn.A3061ENVIR  = rs01.getString("A3061ENVIR").trim();    
                objRtn.A3061TPROC  = rs01.getString("A3061TPROC").trim();    
                objRtn.A3061TINPU  = rs01.getString("A3061TINPU").trim();    
                objRtn.A3061INPUT  = rs01.getString("A3061INPUT").trim();    
                objRtn.A3061CDESQ  = rs01.getInt("A3061CDESQ");    
                objRtn.A3061YEAR   = rs01.getInt("A3061YEAR");
                objRtn.A3061TPERI  = rs01.getString("A3061TPERI").trim();    
                objRtn.A3061PERIO  = rs01.getInt("A3061PERIO");
                objRtn.A3061COUNT  = rs01.getString("A3061COUNT").trim();    
                objRtn.A3061SOURC  = rs01.getString("A3061SOURC").trim();    
                objRtn.A3061USER   = rs01.getString("A3061USER").trim();    
                objRtn.A3061IFECH   = Functions.getMonthConvertDate(rs01.getString("A3061IFECH").trim());
                objRtn.A3061IHOUR  = Functions.ConvertedTime(rs01.getString("A3061IHOUR").trim());
                objRtn.A3061FFECH  = Functions.getMonthConvertDate(rs01.getString("A3061FFECH").trim());
                objRtn.A3061FHOUR  = Functions.ConvertedTime(rs01.getString("A3061FHOUR").trim());
                objRtn.A3061TIME   = Functions.ConvertedTime(rs01.getString("A3061TIME").trim());
                objRtn.A3061STAT   = rs01.getString("A3061STAT").trim();    
                objRtn.A3061MSN    = rs01.getString("A3061MSN").trim();    
                objRtn.A3061UINGR  = rs01.getString("A3061UINGR").trim();    
                objRtn.A3061FINGR  = Functions.getMonthConvertDate(rs01.getString("A3061FINGR").trim());
                objRtn.A3061HINGR  = Functions.ConvertedTime(rs01.getString("A3061HINGR").trim());
                objRtn.A3061UMODI  = rs01.getString("A3061UMODI").trim();    
                objRtn.A3061FMODI  = Functions.getMonthConvertDate(rs01.getString("A3061FMODI").trim());
                objRtn.A3061HMODI  = Functions.ConvertedTime(rs01.getString("A3061HMODI").trim());
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    public List<SQP01597Filter>  setProccessAsync( SQP01597Filter filter) throws SQLException, Exception {
        SQP01597Filter objRtn;
        objRtn = new SQP01597Filter();
        List<SQP01597Filter> lstRtn = new ArrayList<SQP01597Filter>(0);
        try {
            BwrBackEndCommissionAsyncDAO db = new BwrBackEndCommissionAsyncDAO (filter);
            db.setSession((net.miatech.beans.implement.IServerSession) session);
            try{
                new Thread(db).start();
            }catch (IllegalThreadStateException e){
            //add code
            }
            catch (Exception e){
            //add code
            }
            
            
        } finally {
            objRtn.OU_SQLCODE = "0";
            objRtn.OU_MESSAGE = "PROCESS RUNNING, EXPECT RESULTS.";
            lstRtn.add(objRtn);
        }
        return lstRtn;
    }
    
    public List<A1155Filter>  setA1155( A1155Filter filter ,String VP_ACTION) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        String SQLCLL01 = "{CALL PXCOMM.SQP01132(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(40, Types.VARCHAR);
            cstmt01.registerOutParameter(41, Types.VARCHAR);
            
            cstmt01.registerOutParameter(42, Types.VARCHAR);
            cstmt01.registerOutParameter(43, Types.VARCHAR);
            
            
            cstmt01.setString(1, VP_ACTION );
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.TITLE );
            cstmt01.setString(3, filter.A1155AIRLI );
            cstmt01.setString(4, filter.A1155CIA1);
            cstmt01.setString(5, filter.A1155CIA2);
            cstmt01.setString(6, filter.A1155VLINI);            
            cstmt01.setString(7, filter.A1155VLFIN);
            cstmt01.setString(8, filter.A1155CNUM);
            cstmt01.setString(9, filter.A1155FNUM);
            
            cstmt01.setString(10, filter.A1155CODAC);
            cstmt01.setString(11, filter.A1155INDAC);
            cstmt01.setString(12, filter.A1155VRSAC);
            cstmt01.setString(13, filter.A1155FLGAD);
            cstmt01.setString(14, filter.A1155FINI);
            cstmt01.setString(15, filter.A1155FFIN);
            cstmt01.setString(16, filter.A1155FLGFE);
            cstmt01.setString(17, filter.A1155FLGAU);
            cstmt01.setString(18, filter.A1155FESTA);
            cstmt01.setString(19, filter.A1155INDIC);
            cstmt01.setString(20, filter.A1155MPA);
            cstmt01.setString(21, filter.A1155SRP);
            cstmt01.setString(22, filter.A1155PRO);
            cstmt01.setString(23, filter.A1155TRAMO);
            cstmt01.setString(24, filter.A1155DEFAU);
            cstmt01.setDouble(25, Double.parseDouble(filter.A1155PDEFA));
            cstmt01.setString(26, filter.A1155IDSCO);
            cstmt01.setString(27, filter.A1155PISC);
            cstmt01.setString(28, filter.A1155FRECE);
            cstmt01.setString(29, filter.A1155CIAFM);
            cstmt01.setString(30, filter.A1155FNAME);
            cstmt01.setString(31, filter.A1155CODSP);
            cstmt01.setString(32, filter.A1155CORRE);
            cstmt01.setString(33, filter.A1155ESTAD);
            
            cstmt01.setString(34, session.getUserView().getCustomerInfo().USR);
            cstmt01.setString(35, filter.A1155FINGR);
            cstmt01.setString(36, filter.A1155HINGR);
            cstmt01.setString(37, session.getUserView().getCustomerInfo().USR);
            cstmt01.setString(38, filter.A1155FMODI);
            cstmt01.setString(39, filter.A1155HMODI);
            
            /*cstmt01.setString(39, filter.OU_SQLCODE);
            cstmt01.setString(40, filter.OU_MESSAGE);*/

            /*cstmt01.execute();
            filter.OU_SQLCODE = cstmt01.getString(39);
            filter.OU_MESSAGE = cstmt01.getString(40);*/
            
            cstmt01.execute();
            filter.OU_SQLCODE = cstmt01.getString(40);
            filter.OU_MESSAGE = cstmt01.getString(41);
            
            filter.IN_SELET_CODE = cstmt01.getString(42);
            filter.IN_SELET_SERIE = cstmt01.getString(43);
            
            A1155Filter objRtn;
            objRtn = new A1155Filter();
            objRtn.OU_SQLCODE = filter.OU_SQLCODE;
            objRtn.OU_MESSAGE = filter.OU_MESSAGE;
            
            objRtn.IN_SELET_CODE = filter.IN_SELET_CODE;
            objRtn.IN_SELET_SERIE = filter.IN_SELET_SERIE;
            
            lstRtn.add(objRtn);
            
        } finally {
            if (cstmt01 != null) {                
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public Boolean getStep(int INDIC){
        if(this.XXCN != INDIC){
                this.XXSC=!this.XXSC;
                this.XXCN = INDIC;
         }
         this.XXCN=this.XXCN+10;
        return this.XXSC;
    } 
    
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}