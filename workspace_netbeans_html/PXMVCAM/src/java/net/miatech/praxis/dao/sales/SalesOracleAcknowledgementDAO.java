/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import net.miatech.praxisbi.A1955Filter;
import net.miatech.praxisbi.A1956;
import net.miatech.praxisbi.A2160;
import java.util.List;
import java.util.ArrayList;
import net.miatech.utils.Functions;
import net.miatech.beans.spring.implement.IServerSession;


/**
 *
 * @author asifuentes
 */
public class SalesOracleAcknowledgementDAO {
    private IServerSession session;
    
    public SalesOracleAcknowledgementDAO(){
        
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
        
    public SalesOracleAcknowledgementDAO(IServerSession ss) {
        session = ss;
    }
    
    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1955Filter> loadPX247S01A1955(A1955Filter filter) throws SQLException, Exception
    {
        List<A1955Filter> lstRtn = new ArrayList(0);
        A1955Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null, cstmt02 = null;
        ResultSet rs01 = null, rs02 = null;

        String SQLCLL01 = "{CALL PRAXIS.PX247S01A1955(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_MODULO", filter.IN_MODULO);
            cstmt01.setString("IN_ENVIO", filter.IN_ENVIO);
            cstmt01.setString("IN_FEC_INI", filter.IN_FECHA_PROCESO);
            cstmt01.setString("IN_FEC_FIN", filter.IN_FECHA_ACUSE);
            cstmt01.setString("IN_FUENTE", filter.A1955FUENT);
            cstmt01.setString("IN_PAIS", filter.A1955KEY2);
            cstmt01.setString("IN_CANAL", filter.A1955KEY3);
            cstmt01.setString("IN_ESTADO", filter.A1955STATU);
            cstmt01.setString("IN_ACCION", filter.A1955ACTIO);
            
            
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
                objRtn = new A1955Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1955CCUST = rs01.getString("A1955CCUST").trim();
                objRtn.A1955MODUL = rs01.getString("A1955MODUL").trim();
                objRtn.A1955ENVIO = rs01.getString("A1955ENVIO").trim();
                objRtn.A1955FPROC = rs01.getString("A1955FPROC").trim();
                objRtn.A1955ACTIO = rs01.getString("A1955ACTIO").trim();
                objRtn.ACCION = rs01.getString("ACCION").trim();
                objRtn.MODULE = rs01.getString("MODULE").trim();
                
                objRtn.A1955FUENT = rs01.getString("A1955FUENT").trim();
                objRtn.A1955KEY2 = rs01.getString("A1955KEY2").trim();
                objRtn.A1955KEY3 = rs01.getString("A1955KEY3").trim();
                
                objRtn.A1955STATU = rs01.getString("A1955STATU").trim();
                objRtn.ESTADO = rs01.getString("ESTADO").trim();
                objRtn.A1955FCONT = rs01.getString("A1955FCONT").trim();
                objRtn.A1955HCONT = rs01.getString("A1955HCONT").trim();
                objRtn.A1955FECRC = rs01.getString("A1955FECRC").trim();
                objRtn.A1955HORRC = rs01.getString("A1955HORRC").trim();
                objRtn.A1955QCPNF = rs01.getInt("A1955QCPNF");
                objRtn.A1955QCPNR = rs01.getInt("A1955QCPNR");
                objRtn.A1955COMRC = rs01.getString("A1955COMRC").trim();
                
                objRtn.A1955STREC = rs01.getString("A1955STREC").trim();
                objRtn.A1955ORACL = rs01.getString("A1955ORACL").trim();
                objRtn.A1955ERRLG = rs01.getString("A1955ERRLG").trim();
                
                objRtn.page.PAGNUM = filter.page.PAGNUM/filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }        
         }catch(Exception ex){
             String str = ex.getMessage();
             str = "";
         }finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
         
         return lstRtn; 
    }
    
    public String loadPX247S02A1955(A1955Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;

        try {    
            strSQL = "{CALL PRAXIS.PX247S02A1955(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cnx.setAutoCommit(false); //Transaccion
            
            cs = cnx.prepareCall(strSQL);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_ENVIO",filter.A1955ENVIO);
            cs.setString("IN_MODULO",filter.A1955MODUL);
            cs.setString("IN_FCONT",filter.A1955FCONT);
            cs.setString("IN_FECRC",filter.A1955FECRC);
            cs.setString("IN_HORRC",filter.A1955HORRC);
            cs.setInt("IN_CANT_ARCH",filter.A1955QCPNF);
            cs.setInt("IN_CANT_REG",filter.A1955QCPNR);
            cs.setString("IN_COMENT",filter.A1955COMRC);
            
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());
            
            cs.setString("IN_ID_ORACLE",filter.A1955ORACL);
            cs.setString("IN_ESTADO",filter.A1955STREC);
            cs.setString("IN_LOG_ERROR", filter.A1955ERRLG);            
            
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            
            if(STR_RESULT.equals("RECORD UPDATED") && filter.A1955STREC.equals("1")){
                //Actualizar
                int i;
                int n = filter.A1956DETALLE.size();
                
                for(i=0;i<n;i++){
                    strSQL = "{CALL PRAXIS.PX247S02A1956(?,?,?,?,?)}";

                    A1956 obj = (A1956)filter.A1956DETALLE.get(i);
                    
                    cs = cnx.prepareCall(strSQL);
                    cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                    cs.setString("IN_ENVIO",obj.A1956ENVIO);
                    cs.setString("IN_MODULO",obj.A1956MODUL);
                    cs.setString("IN_SECUENCIA",obj.A1956SEQ);
                    cs.setString("IN_ID_ORACLE",obj.A1956ORACL);
                    
                    cs.execute();
                    
                    rst = cs.getResultSet();
                    while (rst.next()) {
                        STR_RESULT = rst.getString("VMESSAGE");
                    }
                }
            }
            
            cs.close();
            
            cnx.commit();
        } catch (Exception e) {
            if(cnx != null) cnx.rollback();
            STR_RESULT = "AN ERROR OCURRED WHEN TRYING TO SAVE THE RECORD.";
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }

    public List<A1956> loadPX247S01A1956(A1955Filter filter) throws SQLException, Exception
    {
        List<A1956> lstRtn = new ArrayList(0);
        A1956 objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null;
        
        String SQLCLL01 = "{CALL PRAXIS.PX247S01A1956(?,?,?,?)}";

        try{
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            cstmt01 = cnx.prepareCall(SQLCLL01); 

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_MODULO", filter.A1955MODUL);
            cstmt01.setString("IN_ENVIO", filter.A1955ENVIO);
            cstmt01.setString("IN_ACTIO", filter.A1955ACTIO);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                A1956 objDet = new A1956();
                objDet.RN = rs01.getInt("RN");
                objDet.A1956CCUST = rs01.getString("A1956CCUST").trim();
                objDet.A1956ENVIO = rs01.getString("A1956ENVIO").trim();
                objDet.A1956MODUL = rs01.getString("A1956MODUL").trim();
                objDet.A1956SEQ = rs01.getString("A1956SEQ").trim();
                objDet.A1956ARCH = rs01.getString("A1956ARCH").trim();
                objDet.A1956LOTE  = rs01.getString("A1956LOTE").trim();
                objDet.A1956POLIZ = rs01.getString("A1956POLIZ").trim();
                objDet.A1956SUBTP = rs01.getString("A1956SUBTP").trim();
                
                if(objDet.A1956ARCH.length()>0){
                    String[] partesArchivo;
                    String archivo =objDet.A1956ARCH;
                    partesArchivo = archivo.split("\\|");
                    objDet.A1956ARCH = partesArchivo[partesArchivo.length -1];
                }

                objDet.A1956TRCAR = rs01.getInt("A1956TRCAR");
                objDet.A1956STAT = rs01.getString("A1956STAT");
                objDet.A1956ORACL = rs01.getString("A1956ORACL").trim();
                objDet.A1956NMSJS = rs01.getInt("A1956NMSJS");
                lstRtn.add(objDet);
            }
        }
        catch(Exception ex){
             String str = ex.getMessage();
             str = "";
        }
        finally
        {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
         
         return lstRtn; 
    }

    public List<A2160> loadPX247S01A2160(A1956 filter) throws SQLException, Exception
    {
        List<A2160> lstRtn = new ArrayList(0);
        A1956 objRtn;
        //int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        Connection cnx = null;
        
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX247S01A2160(?,?,?)}";

        try{
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            cstmt01 = cnx.prepareCall(SQLCLL01); 

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_ARCHIVO", filter.A1956ARCH);
            cstmt01.setString("IN_ORACL", filter.A1956ORACL);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                A2160 objDet = new A2160();
                objDet.RN = rs01.getInt("RN");
                objDet.A2160CCUST = rs01.getString("A2160CCUST").trim();
                objDet.A2160ORACL = rs01.getString("A2160ORACL").trim();
                objDet.A2160SUBTP = rs01.getString("A2160SUBTP").trim();
                objDet.A2160MENSJ = rs01.getString("A2160MENSJ").trim();
                
                String[] cols = objDet.A2160MENSJ.split("\\|");
                
                if(cols.length>0){
                    objDet.A2160C1 = cols[0];
                    objDet.A2160C2 = cols[1];
                    objDet.A2160C3 = cols[2];
                    objDet.A2160C4 = cols[3];
                    objDet.A2160C5 = cols[4];
                    objDet.A2160C6 = cols[5];
                    objDet.A2160C7 = cols[6];
                    objDet.A2160C8 = cols[7];
                    objDet.A2160C9 = cols[8];
                    objDet.A2160C10= cols[9];
                    objDet.A2160C11= cols[10];
                    objDet.A2160C12= cols[11];
                }
                
                lstRtn.add(objDet);
            }
        
        }
        catch(Exception ex){
             String str = ex.getMessage();
             str = "";
        }
        finally
        {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
         
         return lstRtn; 
    }
        
    public String insPX247S03A1955(A1955Filter filter) throws SQLException, Exception{
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        Connection cnx = null;

        try {    
            strSQL = "{CALL PRAXIS.PX247S03A1955(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            
            cs = cnx.prepareCall(strSQL);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_ENVIO",filter.A1955ENVIO);
            cs.setString("IN_MODULO",filter.A1955MODUL);
            cs.setString("IN_ACCION",filter.ACCION);
            cs.setString("IN_ACC_ORIGEN",filter.IN_ACC_ORIGEN);

            
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());  
            
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            
            cs.close();
            
            cnx.commit();
        } catch (Exception e) {
            if(cnx != null) cnx.rollback();
            STR_RESULT = "AN ERROR OCURRED WHEN TRYING TO SAVE THE RECORD.";
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }
    
    public List<A1955Filter> SQP01206(A1955Filter filter) throws SQLException, Exception
    {
        List<A1955Filter> lstRtn = new ArrayList(0);
        A1955Filter objRtn;
        int totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP01206(?,?,?)}";

        Connection cnx = null;
        
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_MODULO", filter.A1955MODUL);
            cstmt01.setString("IN_ACTIO", filter.A1955ACTIO);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            int pos = 0;
            
            while (rs01.next()) {
                pos++;
                objRtn = new A1955Filter();
                objRtn.A1955FPROC = rs01.getString("A1955FPROC").trim();
                objRtn.A1955ENVIO = rs01.getString("A1955ENVIO").trim();
                objRtn.A1955ORACL = rs01.getString("A1955ORACL").trim();
                objRtn.A1955FUENT = rs01.getString("A1955FUENT").trim();
                objRtn.A1955STATU = rs01.getString("A1955STATU").trim();
                objRtn.A1955MODUL = rs01.getString("A1955MODUL").trim();

                lstRtn.add(objRtn);
            }        
         }catch(Exception ex){
             String str = ex.getMessage();
             str = "";
         }finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
         
        return lstRtn; 
    }    

    public List<A1955Filter> SQP01252(A1955Filter filter) throws SQLException, Exception{
        List<A1955Filter> lstRtn = new ArrayList(0);
        A1955Filter objRtn;
        int totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP01252(?,?,?)}";

        Connection cnx = null;
        
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_STATU", filter.A1955STATU);
            cstmt01.setString("IN_MODUL", filter.A1955MODUL);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            int pos = 0;
            
            while (rs01.next()) {
                pos++;
                objRtn = new A1955Filter();
                objRtn.A1955MODUL = rs01.getString("A1955MODUL").trim();
                objRtn.A1955FPROC = rs01.getString("A1955FPROC").trim();
                objRtn.A1955FUENT = rs01.getString("A1955FUENT").trim();
                objRtn.A1955TIPO = rs01.getString("A1955TIPO").trim();
                objRtn.A1955STATU = rs01.getString("A1955STATU").trim();
                objRtn.ESTADO = rs01.getString("ESTADO").trim();
                objRtn.A1955KEY4 = String.valueOf(rs01.getInt("A1955KEY4"));

                lstRtn.add(objRtn);
            }        
         }catch(Exception ex){
             String str = ex.getMessage();
             str = "";
         }finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                cstmt01.close();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
         
         return lstRtn; 
    }
    
}

