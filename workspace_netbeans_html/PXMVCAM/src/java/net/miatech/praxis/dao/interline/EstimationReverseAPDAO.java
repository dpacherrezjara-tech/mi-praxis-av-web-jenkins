package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A2111Filter;
import net.miatech.beans.A2112Filter;
import net.miatech.beans.A2134Filter;
import net.miatech.beans.A2135Filter;
import net.miatech.beans.A2136Filter;
import net.miatech.beans.A2137Filter;
import net.miatech.praxis.A2112;
import net.miatech.praxis.A2135;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class EstimationReverseAPDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2134Filter> loadPX260S01A2134(A2134Filter filter) throws SQLException, Exception {
        List<A2134Filter> lstRtn = new ArrayList<A2134Filter>(0);
        A2134Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX260S01A2134(?,?,?,?,?,?,?,?,?)}";                

        Connection cnx = null;         
        try {
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
          
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setString("IN_A2134CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_A2134FUENT", filter.IN_A2134FUENT);
            cstmt01.setString("IN_A2134FPROC", filter.IN_A2134FPROC);
            cstmt01.setString("IN_A2134SFUEN", filter.IN_A2134SFUEN);
            cstmt01.setString("IN_A2134PSVTA", filter.IN_A2134PSVTA);

            cstmt01.setInt("IO_PAGNUM", PAGINIT);
            cstmt01.setInt("IO_PAGROW", totRowsPag);     
            cstmt01.setInt("IO_TOTPAG", totRows);     
            cstmt01.setInt("IO_TOTROW", filter.page.TOTROW); 

            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt("IO_PAGNUM");
            filter.page.PAGROW = cstmt01.getInt("IO_PAGROW");
            filter.page.TOTPAG = cstmt01.getInt("IO_TOTPAG");
            filter.page.TOTROW = cstmt01.getInt("IO_TOTROW");
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt("IO_PAGROW")) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cstmt01.getInt("IO_TOTROW");
                   int total =  (int)(totRows / totRowsPag);                                                                    
                   int resto =  (totRows % totRowsPag);                    

                   if(resto>0)
                       totPAGS = total + 1;
                   else
                       totPAGS = total;

               } catch (Exception e) {
                   totPAGS = totRows / totRowsPag;
               }
            }        
             
            filter.page.TOTPAG = totPAGS;
            
            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A2134Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A2134CCUST = rs01.getString("A2134CCUST").trim();
                objRtn.A2134PSVTA = rs01.getString("A2134PSVTA").trim();
                objRtn.A2134GRUPO = rs01.getString("A2134GRUPO").trim();
                objRtn.A2134FUENT = rs01.getString("A2134FUENT").trim();
                objRtn.A2134SFUEN = rs01.getString("A2134SFUEN").trim();
                objRtn.A2134FCONT = Functions.getMonthConvertDate(rs01.getString("A2134FCONT").trim());
                objRtn.A2134IDCON = rs01.getString("A2134IDCON").trim();
                objRtn.A2134FPROC = Functions.getMonthConvertDate(rs01.getString("A2134FPROC").trim());
                objRtn.A2134CLEAR = objRtn.A2134FPROC.substring(0, 7);
                objRtn.A2134PERIO = objRtn.A2134FPROC.substring(8, 10);
                objRtn.A2134IDFIL = rs01.getString("A2134IDFIL").trim();
                objRtn.A2134STPRO = rs01.getString("A2134STPRO").trim();
                objRtn.A2134MDA = rs01.getString("A2134MDA").trim();
                objRtn.A2134MODO = rs01.getString("A2134MODO").trim();
                objRtn.A2134USRIN = rs01.getString("A2134USRIN").trim();
                objRtn.A2134FECIN = rs01.getString("A2134FECIN").trim();
                objRtn.A2134HORIN = rs01.getString("A2134HORIN").trim();
                objRtn.A2134USRAC = rs01.getString("A2134USRAC").trim();
                objRtn.A2134FECAC = rs01.getString("A2134FECAC").trim();
                objRtn.A2134HORAC = rs01.getString("A2134HORAC").trim();
                objRtn.REVERSION =  (rs01.getString("A2134SPROC").equals("C") && rs01.getString("A2134STS0").equals("Y") && rs01.getString("A2134STPRO").equals("0") ? true : false);
                objRtn.A2134ESTADO = rs01.getString("A2134ESTADO").trim();
                objRtn.A2134SPROC = rs01.getString("A2134SPROC");
                objRtn.A2134STATU = rs01.getString("A2134STATU").trim();
                objRtn.A2134STS0 = rs01.getString("A2134STS0");
                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }        
         }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
         
         return lstRtn; 
    }
    
    //Lista NRO GRUPO 
    public List<A2134Filter> loadPX260S03A2134() throws SQLException, Exception {
        List<A2134Filter> objRtn = new ArrayList<A2134Filter>(0);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX260S03A2134}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                A2134Filter obj = new A2134Filter();
                obj.A2134GRUPO = rs01.getString("A2134GRUPO");
                               
                objRtn.add(obj);

            }
        } catch (Exception ex) {
            String msj = ex.getMessage();
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return objRtn;
    }
    
    //Lista CUENTAS
    public  List<A1740Filter> loadCuentas() throws SQLException, Exception {
         List<A1740Filter> lstRtn = new ArrayList<A1740Filter>(0);
         A1740Filter objRtn;
         
         CallableStatement cstmt01 = null;
         ResultSet rs01 = null;

         String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX260S01A1740}";         
         
          Connection cnx = null;         
         try {
             cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);      
             cstmt01.execute();
                                      
             rs01 = cstmt01.getResultSet();
             while (rs01.next()) {
                 objRtn = new A1740Filter();
                 objRtn.A1740TITU = rs01.getString("A1740TITU").trim();
                 objRtn.A1740TITRA = rs01.getString("A1740TITRA").trim();
                 objRtn.A1740TIPO = rs01.getString("A1740TIPO").trim();
                 objRtn.A1740SUBTI = rs01.getString("A1740SUBTI").trim();
                 objRtn.A1740CATEG = rs01.getString("A1740CATEG").trim();
                 objRtn.A1740CIA = rs01.getString("A1740CIA").trim();
                 objRtn.A1740UNIDA = rs01.getString("A1740UNIDA").trim();
                 objRtn.A1740CECOS = rs01.getString("A1740CECOS").trim();
                 objRtn.A1740UBICA = rs01.getString("A1740UBICA").trim();
                 objRtn.A1740CTA = rs01.getString("A1740CTA").trim();
                 objRtn.A1740SCTA = rs01.getString("A1740SCTA").trim();
                 objRtn.A1740EQUI = rs01.getString("A1740EQUI").trim();
                 objRtn.A1740ICIA = rs01.getString("A1740ICIA").trim();
                 objRtn.A1740CLIE = rs01.getString("A1740CLIE").trim();
                 
                 lstRtn.add(objRtn);
             }
             
         }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }              
         return lstRtn;
    }
    
    //Lista Cuenta
    public List<A2135> loadPX260S01A2135(A2134Filter filter) throws SQLException, Exception {
        List<A2135> objRtn = new ArrayList<A2135>(0);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX260S01A2135(?)}";
        
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_A2135GRUPO", filter.A2134GRUPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                A2135Filter obj = new A2135Filter();

                obj.A2135CCUST = rs01.getString("A2135CCUST");
                obj.A2135GRUPO = rs01.getString("A2135GRUPO");
                obj.A2135FUENT = rs01.getString("A2135FUENT");
                obj.A2135SUBFU = rs01.getString("A2135SUBFU");
                obj.A2135CUR = rs01.getString("A2135CUR");
                obj.A2135PAIS = rs01.getString("A2135PAIS");
                obj.A2135FP = rs01.getString("A2135FP");
                obj.A2135MODO = rs01.getString("A2135MODO");
                obj.A2135FPRO = rs01.getString("A2135FPRO");
                obj.A2135FCONT = rs01.getString("A2135FCONT");
                obj.A2135CIAF = rs01.getString("A2135CIAF").trim();
                obj.A2135UNID = rs01.getString("A2135UNID").trim();
                obj.A2135CECO = rs01.getString("A2135CECO").trim();
                obj.A2135UBICA = rs01.getString("A2135UBICA").trim();
                obj.A2135CUENT = rs01.getString("A2135CUENT").trim();
                obj.A2135SUBCU = rs01.getString("A2135SUBCU").trim();
                obj.A2135EQUI = rs01.getString("A2135EQUI").trim();
                obj.A2135ICIA = rs01.getString("A2135ICIA").trim();
                obj.A2135TITU = rs01.getString("A2135TITU").trim();
                obj.A2135ACTIV = rs01.getDouble("A2135ACTIV");
                obj.A2135PASIV = rs01.getDouble("A2135PASIV");
                obj.A2135CUENTA = rs01.getString("A2135CUENTA").trim();
                obj.A2135TITRA = rs01.getString("A2135TITRA").trim();
                obj.A2135TIPO = rs01.getString("A2135TIPO").trim();
                obj.A2135SUBTI = rs01.getString("A2135SUBTI").trim();
                obj.A2135CATEG = rs01.getString("A2135CATEG").trim();
                objRtn.add(obj);
                

            }
        } catch (Exception ex) {
            String msj = ex.getMessage();
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return objRtn;
    }
    
    //CRUD
    public String CRUDPX260S02A2134(A2134Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX260S02A2134(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";                   
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            cs.setString("IN_ACTION", strOption);
            cs.setString("IN_A2134CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A2134GRUPO", filter.IN_A2134GRUPO);
            cs.setString("IN_A2134FPROC", filter.IN_A2134FPROC);
            cs.setString("IN_A2134FUENT", filter.IN_A2134FUENT);
            cs.setString("IN_A2134SFUEN", filter.IN_A2134SFUEN);
            cs.setString("IN_A2134PSVTA", filter.IN_A2134PSVTA);
            cs.setString("IN_A2134MDA", filter.IN_A2134MDA);
            cs.setString("IN_A2134STPRO", filter.IN_A2134STPRO);
            cs.setString("IN_A2134FCONT", filter.IN_A2134FCONT);
            cs.setString("IN_A2134MODO", filter.IN_A2134MODO);
            cs.setString("IN_A2134SPROC", filter.IN_A2134SPROC);
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());
            cs.setString("IN_A2134GRUPO_OLD", filter.IN_A2134GRUPO_OLD);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }

            //Si insertó la cabecera, insertar CUENTAS
            if (STR_RESULT.equals("RECORD INSERTED") || STR_RESULT.equals("RECORD UPDATED")) {

                String STR_RESULT_CUEN = "";

                for (int i = 0; i < filter.ESTIMADOS.size(); i++) {
                    A2135 obj = filter.ESTIMADOS.get(i);
                    obj.A2135GRUPO = filter.IN_A2134GRUPO;

                    STR_RESULT_CUEN = CRUDPX260S02A2135(obj, "I");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }
    
    //CRUD Cuentas
    public String CRUDPX260S02A2135(A2135 filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String codigo="";

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX260S02A2135(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            cs.setString("IN_ACTION", strOption);
            cs.setString("IN_A2135CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A2135GRUPO", filter.A2135GRUPO);
            cs.setString("IN_A2135PAIS", filter.A2135PAIS);
            cs.setString("IN_A2135FUENT", filter.A2135FUENT);
            cs.setString("IN_A2135SUBFU", filter.A2135SUBFU);
            cs.setString("IN_A2135CUR", filter.A2135CUR);
            cs.setString("IN_A2135FP", filter.A2135FP);
            cs.setString("IN_A2135MODO", filter.A2135MODO);
            cs.setString("IN_A2135FPRO", filter.A2135FPRO);
            cs.setString("IN_A2135FCONT", filter.A2135FCONT);
            cs.setString("IN_A2135CIAF", filter.A2135CIAF);
            cs.setString("IN_A2135UNID", filter.A2135UNID);
            cs.setString("IN_A2135CECO", filter.A2135CECO);
            cs.setString("IN_A2135UBICA", filter.A2135UBICA);
            cs.setString("IN_A2135CUENT", filter.A2135CUENT);
            cs.setString("IN_A2135SUBCU", filter.A2135SUBCU);
            cs.setString("IN_A2135EQUI", filter.A2135EQUI);
            cs.setString("IN_A2135ICIA", filter.A2135ICIA);
            cs.setString("IN_A2135TITU", filter.A2135TITU);
            cs.setDouble("IN_A2135ACTIV", filter.A2135ACTIV);
            cs.setDouble("IN_A2135PASIV", filter.A2135PASIV);
            cs.setString("IN_A2135TITRA", filter.A2135TITRA);
            cs.setString("IN_A2135TIPO", filter.A2135TIPO);
            cs.setString("IN_A2135SUBTI", filter.A2135SUBTI);
            cs.setString("IN_A2135CATEG", filter.A2135CATEG);
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
                codigo = rst.getString("VSQLCODE");
            }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        
        return STR_RESULT;
    }
    
    public String Estimados(List<A2134Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        Connection cnx = null;
        try {
                                    
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            
            deletePoliza("A2124","E"); //Elimina data anterior
            
            for(A2134Filter obj : filter)
            {
                strSQL = "{CALL " + session.getMainLibrary() + ".PX260S05A2134(?,?,?,?,?,?,?)}";   

                cs = cnx.prepareCall(strSQL);
                
                cs.setString("IN_A2134CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_A2134FCONT", obj.A2134FCONT.replaceAll("/", ""));
                cs.setString("IN_A2134GRUPO", obj.A2134GRUPO);
                cs.setString("IN_A2134FPROC", obj.A2134FPROC.replaceAll("/", ""));
                cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FEC", Functions.getFechaActual());
                cs.setString("IN_HOR", Functions.getHoraActual());
                cs.execute();

                rst = cs.getResultSet();
                while (rst.next()) {
                    STR_RESULT = rst.getString("VMESSAGE");
                }            
            }                         
            
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }       

        } catch (Exception e) {
            //if(cnx != null) cnx.rollback();
            STR_RESULT = "AN ERROR OCURRED WHEN TRYING TO SAVE THE RECORD.";
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }
    
    public void deletePoliza(String filter,String modo) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX260S01A2124(?,?)}";
        
        Connection cnx = null; 
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter);
            cstmt01.setString(2, modo);
            cstmt01.execute();           
            
         } catch (SQLException ex) {
            String data = ex.getMessage();          
        } catch (Exception e) {
            String data = e.getMessage();     
         }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
    }
    
    public List<A2137Filter> loadResultadoDownload(String filter) throws SQLException, Exception {
        List<A2137Filter> lstRtn = new ArrayList<A2137Filter>(0);
        A2137Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX260S01A2137(?)}";

        Connection cnx = null; 
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter);

            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            
            while (rs01.next()) {
                objRtn = new A2137Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.FPROC = rs01.getString("FPROC").trim();
                objRtn.FCONT = rs01.getString("FCONT").trim();
                objRtn.MDALOC = rs01.getString("MDALOC").trim();
                objRtn.CLEAR = objRtn.FPROC.substring(0, 6);
                objRtn.PERIO = objRtn.FPROC.substring(6, 8);
                lstRtn.add(objRtn);
            }
          } catch (SQLException ex) {
            String data = ex.getMessage();          
        } catch (Exception e) {
            String data = e.getMessage();     
         }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
         
         return lstRtn; 
    }
    
    public String Reversa(List<A2134Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null;
        try {
                                    
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            
            deletePoliza("A2124","X"); //Elimina data anterior
            
            for(A2134Filter obj : filter)
            {
                strSQL = "{CALL " + session.getMainLibrary() + ".PX260S04A2134(?,?,?,?,?,?,?)}";                                 

                cs = cnx.prepareCall(strSQL);
                
                cs.setString("IN_A2134CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_A2134GRUPO", obj.IN_A2134GRUPO);
                cs.setString("IN_A2134FCONT", obj.IN_A2134FCONT.replaceAll("/", ""));     
                cs.setString("IN_A2134FPROC", obj.IN_A2134FPROC.replaceAll("/", ""));
                cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FEC", Functions.getFechaActual());
                cs.setString("IN_HOR", Functions.getHoraActual());
                cs.execute();

                rst = cs.getResultSet();
                while (rst.next()) {
                    STR_RESULT = rst.getString("VMESSAGE");
                }            
            }                         
            
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }   

        } catch (Exception e) {
            //if(cnx != null) cnx.rollback();
            STR_RESULT = "AN ERROR OCURRED WHEN TRYING TO SAVE THE RECORD.";
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
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
