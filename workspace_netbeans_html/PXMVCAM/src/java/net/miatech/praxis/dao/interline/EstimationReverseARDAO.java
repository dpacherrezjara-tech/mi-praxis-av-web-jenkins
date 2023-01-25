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
import net.miatech.beans.A2136Filter;
import net.miatech.praxis.A2112;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class EstimationReverseARDAO {

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
    
    public List<A2111Filter> loadPX257S01A2111(A2111Filter filter) throws SQLException, Exception {
        List<A2111Filter> lstRtn = new ArrayList<A2111Filter>(0);
        A2111Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX257S01A2111(?,?,?,?,?,?,?,?,?)}";                
        //String SQLCLL01 = "{CALL LIBSAP14.PX257S01A2111(?,?,?,?,?,?,?,?,?)}";                

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

            cstmt01.setString("IN_A2111CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_A2111FUENT", filter.IN_A2111FUENT);
            cstmt01.setString("IN_A2111FPROC", filter.IN_A2111FPROC);
            cstmt01.setString("IN_A2111SFUEN", filter.IN_A2111SFUEN);
            cstmt01.setString("IN_A2111PSVTA", filter.IN_A2111PSVTA);

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
                objRtn = new A2111Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A2111CCUST = rs01.getString("A2111CCUST").trim();
                objRtn.A2111PSVTA = rs01.getString("A2111PSVTA").trim();
                objRtn.A2111GRUPO = rs01.getString("A2111GRUPO").trim();
                objRtn.A2111FUENT = rs01.getString("A2111FUENT").trim();
                objRtn.A2111SFUEN = rs01.getString("A2111SFUEN").trim();
                objRtn.A2111FCONT = Functions.getMonthConvertDate(rs01.getString("A2111FCONT").trim());
                objRtn.A2111IDCON = rs01.getString("A2111IDCON").trim();
                objRtn.A2111FPROC = Functions.getMonthConvertDate(rs01.getString("A2111FPROC").trim());
                objRtn.A2111CLEAR = objRtn.A2111FPROC.substring(0, 7);
                objRtn.A2111PERIO = objRtn.A2111FPROC.substring(8, 10);
                objRtn.A2111IDFIL = rs01.getString("A2111IDFIL").trim();
                objRtn.A2111STPRO = rs01.getString("A2111STPRO").trim();
                objRtn.A2111MDA = rs01.getString("A2111MDA").trim();
                objRtn.A2111MODO = rs01.getString("A2111MODO").trim();
                objRtn.A2111USRIN = rs01.getString("A2111USRIN").trim();
                objRtn.A2111FECIN = rs01.getString("A2111FECIN").trim();
                objRtn.A2111HORIN = rs01.getString("A2111HORIN").trim();
                objRtn.A2111USRAC = rs01.getString("A2111USRAC").trim();
                objRtn.A2111FECAC = rs01.getString("A2111FECAC").trim();
                objRtn.A2111HORAC = rs01.getString("A2111HORAC").trim();
                objRtn.REVERSION =  (rs01.getString("A2111SPROC").equals("C") && rs01.getString("A2111STS0").equals("Y") && rs01.getString("A2111STPRO").equals("0") ? true : false);
                objRtn.A2111ESTADO = rs01.getString("A2111ESTADO").trim();
                objRtn.A2111SPROC = rs01.getString("A2111SPROC");
                objRtn.A2111STATU = rs01.getString("A2111STATU").trim();
                objRtn.A2111STS0 = rs01.getString("A2111STS0");
                
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
    public List<A2111Filter> loadPX257S03A2111() throws SQLException, Exception {
        List<A2111Filter> objRtn = new ArrayList<A2111Filter>(0);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX257S03A2111}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                A2111Filter obj = new A2111Filter();;
                obj.A2111GRUPO = rs01.getString("A2111GRUPO");
                               
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

         String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX257S01A1740}";         
         
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
    public List<A2112> loadPX257S01A2112(A2111Filter filter) throws SQLException, Exception {
        List<A2112> objRtn = new ArrayList<A2112>(0);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX257S01A2112(?)}";
        
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_A2112GRUPO", filter.A2111GRUPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                A2112Filter obj = new A2112Filter();

                obj.A2112CCUST = rs01.getString("A2112CCUST");
                obj.A2112GRUPO = rs01.getString("A2112GRUPO");
                obj.A2112FUENT = rs01.getString("A2112FUENT");
                obj.A2112SUBFU = rs01.getString("A2112SUBFU");
                obj.A2112CUR = rs01.getString("A2112CUR");
                obj.A2112PAIS = rs01.getString("A2112PAIS");
                obj.A2112FP = rs01.getString("A2112FP");
                obj.A2112MODO = rs01.getString("A2112MODO");
                obj.A2112FPRO = rs01.getString("A2112FPRO");
                obj.A2112FCONT = rs01.getString("A2112FCONT");
                obj.A2112CIAF = rs01.getString("A2112CIAF").trim();
                obj.A2112UNID = rs01.getString("A2112UNID").trim();
                obj.A2112CECO = rs01.getString("A2112CECO").trim();
                obj.A2112UBICA = rs01.getString("A2112UBICA").trim();
                obj.A2112CUENT = rs01.getString("A2112CUENT").trim();
                obj.A2112SUBCU = rs01.getString("A2112SUBCU").trim();
                obj.A2112EQUI = rs01.getString("A2112EQUI").trim();
                obj.A2112ICIA = rs01.getString("A2112ICIA").trim();
                obj.A2112TITU = rs01.getString("A2112TITU").trim();
                obj.A2112ACTIV = rs01.getDouble("A2112ACTIV");
                obj.A2112PASIV = rs01.getDouble("A2112PASIV");
                obj.A2112CUENTA = rs01.getString("A2112CUENTA").trim();
                obj.A2112TITRA = rs01.getString("A2112TITRA").trim();
                obj.A2112TIPO = rs01.getString("A2112TIPO").trim();
                obj.A2112SUBTI = rs01.getString("A2112SUBTI").trim();
                obj.A2112CATEG = rs01.getString("A2112CATEG").trim();
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
    public String CRUDPX257S02A2111(A2111Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX257S02A2111(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";                   
            //strSQL = "{CALL LIBSAP14.PX257S02A2111(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";                   
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            cs.setString("IN_ACTION", strOption);
            cs.setString("IN_A2111CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A2111GRUPO", filter.IN_A2111GRUPO);
            cs.setString("IN_A2111FPROC", filter.IN_A2111FPROC);
            cs.setString("IN_A2111FUENT", filter.IN_A2111FUENT);
            cs.setString("IN_A2111SFUEN", filter.IN_A2111SFUEN);
            cs.setString("IN_A2111PSVTA", filter.IN_A2111PSVTA);
            cs.setString("IN_A2111MDA", filter.IN_A2111MDA);
            cs.setString("IN_A2111STPRO", filter.IN_A2111STPRO);
            cs.setString("IN_A2111FCONT", filter.IN_A2111FCONT);
            cs.setString("IN_A2111MODO", filter.IN_A2111MODO);
            cs.setString("IN_A2111SPROC", filter.IN_A2111SPROC);
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());
            cs.setString("IN_A2111GRUPO_OLD", filter.IN_A2111GRUPO_OLD);
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
                    A2112 obj = filter.ESTIMADOS.get(i);
                    obj.A2112GRUPO = filter.IN_A2111GRUPO;

                    STR_RESULT_CUEN = CRUDPX257S02A2112(obj, "I");
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
    public String CRUDPX257S02A2112(A2112 filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String codigo="";

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX257S02A2112(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            cs.setString("IN_ACTION", strOption);
            cs.setString("IN_A2112CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A2112GRUPO", filter.A2112GRUPO);
            cs.setString("IN_A2112PAIS", filter.A2112PAIS);
            cs.setString("IN_A2112FUENT", filter.A2112FUENT);
            cs.setString("IN_A2112SUBFU", filter.A2112SUBFU);
            cs.setString("IN_A2112CUR", filter.A2112CUR);
            cs.setString("IN_A2112FP", filter.A2112FP);
            cs.setString("IN_A2112MODO", filter.A2112MODO);
            cs.setString("IN_A2112FPRO", filter.A2112FPRO);
            cs.setString("IN_A2112FCONT", filter.A2112FCONT);
            cs.setString("IN_A2112CIAF", filter.A2112CIAF);
            cs.setString("IN_A2112UNID", filter.A2112UNID);
            cs.setString("IN_A2112CECO", filter.A2112CECO);
            cs.setString("IN_A2112UBICA", filter.A2112UBICA);
            cs.setString("IN_A2112CUENT", filter.A2112CUENT);
            cs.setString("IN_A2112SUBCU", filter.A2112SUBCU);
            cs.setString("IN_A2112EQUI", filter.A2112EQUI);
            cs.setString("IN_A2112ICIA", filter.A2112ICIA);
            cs.setString("IN_A2112TITU", filter.A2112TITU);
            cs.setDouble("IN_A2112ACTIV", filter.A2112ACTIV);
            cs.setDouble("IN_A2112PASIV", filter.A2112PASIV);
            cs.setString("IN_A2112TITRA", filter.A2112TITRA);
            cs.setString("IN_A2112TIPO", filter.A2112TIPO);
            cs.setString("IN_A2112SUBTI", filter.A2112SUBTI);
            cs.setString("IN_A2112CATEG", filter.A2112CATEG);
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
    
    public String Estimados(List<A2111Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        Connection cnx = null;
        try {
                                    
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            
            deletePoliza("A2122","E"); //Elimina data anterior
            
            for(A2111Filter obj : filter)
            {
                strSQL = "{CALL " + session.getMainLibrary() + ".PX257S05A2111(?,?,?,?,?,?,?)}";
                //strSQL = "{CALL LIBSAP14.PX257S05A2111(?,?,?,?,?,?,?)}";            

                cs = cnx.prepareCall(strSQL);
                
                cs.setString("IN_A2111CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_A2111FCONT", obj.A2111FCONT.replaceAll("/", ""));
                cs.setString("IN_A2111GRUPO", obj.A2111GRUPO);
                cs.setString("IN_A2111FPROC", obj.A2111FPROC.replaceAll("/", ""));
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX257S01A2122(?,?)}";
        //String SQLCLL01 = "{CALL LIBSAP14.PX257S01A2122(?,?)}";
        
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
    
    public List<A2136Filter> loadResultadoDownload(String filter) throws SQLException, Exception {
        List<A2136Filter> lstRtn = new ArrayList<A2136Filter>(0);
        A2136Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX257S01A2136(?)}";
        //String SQLCLL01 = "{CALL LIBSAP14.PX257S01A2136(?)}";

        Connection cnx = null; 
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter);

            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            
            while (rs01.next()) {
                objRtn = new A2136Filter();
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
    
    public String Reversa(List<A2111Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null;
        try {
                                    
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            
            deletePoliza("A2122","X"); //Elimina data anterior
            
            for(A2111Filter obj : filter)
            {
                strSQL = "{CALL " + session.getMainLibrary() + ".PX257S04A2111(?,?,?,?,?,?,?)}";                                 
                //strSQL = "{CALL LIBSAP14.PX257S04A2111(?,?,?,?,?,?,?)}";

                cs = cnx.prepareCall(strSQL);
                
                cs.setString("IN_A2111CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_A2111GRUPO", obj.IN_A2111GRUPO);
                cs.setString("IN_A2111FCONT", obj.IN_A2111FCONT.replaceAll("/", ""));  
                cs.setString("IN_A2111FPROC", obj.IN_A2111FPROC.replaceAll("/", ""));
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
