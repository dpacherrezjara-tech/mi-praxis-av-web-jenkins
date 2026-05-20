/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.dao.refund;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.refund.A2745;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author ftorres
 */
public class RefundInputsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private CallableStatement cstmt = null;
    private PreparedStatement pstmt = null;
    private ResultSet rst = null;
    private ResultSet rs01 = null;
    private Connection cnx = null;
    private Statement stmt = null;

    private static final Logger logError = Logger.getLogger("errorLog");

    public RefundInputsDAO() {
    }

    private void setClose() {
        if (rs01 != null) {
            try {
                rs01.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (cstmt != null) {
            try {
                cstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //===============
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RefundInputsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    // incia consulta
    
    
     public List<A2745> obtenerLstControlV1(A2745 filter) throws Exception {

        stmt = null;
        rst = null;
        cnx = null;
        A2745 record = null;
        List<A2745> lista = new ArrayList<A2745>();

        // Variables para acumular totales
        int totalQty = 0;
        int totalPending = 0;
        int totalAccepted = 0;
        int totalError = 0;
        int totalErrorValidation = 0;

        
        String SQLCLL01 = "{CALL PRAXISAV.RFS0003(?,?)}";


        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_YEAR);

            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                record = new A2745();
                record.FCARG = rst.getString("FECR_ANNOMES");
                record.QTY_TOTAL = rst.getInt("QTY_TOTAL");
                record.QTY_PENDING = rst.getInt("QTY_PENDING");
                record.QTY_ACCEPTED = rst.getInt("QTY_ACCEPTED");
                record.QTY_ERROR = rst.getInt("QTY_ERROR");
                record.QTY_ERROR_VALIDACION = rst.getInt("QTY_ERROR_VALIDACION");

                // Acumular los valores
                totalQty += record.QTY_TOTAL;
                totalPending += record.QTY_PENDING;
                totalAccepted += record.QTY_ACCEPTED;
                totalError += record.QTY_ERROR;
                totalErrorValidation += record.QTY_ERROR_VALIDACION;
                
                record.totalQty = totalQty;
                record.totalPending = totalPending;
                record.totalAccepted = totalAccepted;
                record.totalError = totalError;
                record.totalErrorValidation = totalErrorValidation;

                lista.add(record);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;
    }

     
     // DETALLE.
     
     
     public List<A2745> getListTktDetail(A2745 filter) throws Exception {

        stmt = null;
        rst = null;
        cnx = null;
        A2745 record;
        List<A2745> lista = new ArrayList<>();

       int totalQty = 0;
        int totalPending = 0;
        int totalAccepted = 0;
        int totalError = 0;
        int totalErrorValidation = 0;
        
        
        String SQLCLL01 = "{CALL PRAXISAV.RFS0004(?,?, ?, ?, ?, ?)}";

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_YEAR);
            
            cs.setInt(3, filter.page.PAGNUM);
            cs.setInt(4, filter.page.PAGROW);
            cs.setInt(5, filter.page.TOTPAG);
            cs.setInt(6, filter.page.TOTROW);

            cs.execute();
            
            filter.page.PAGNUM = cs.getInt(3);
            filter.page.PAGROW = cs.getInt(4);
            filter.page.TOTPAG = cs.getInt(5);
            filter.page.TOTROW = cs.getInt(6);

            rst = cs.getResultSet();

            while (rst.next()) {
                record = new A2745();
                record.FCARG = rst.getString("FECR_ANNOMES");
                record.A5003SEQ = rst.getString("A5003SEQ");
                record.FILEFCAR = rst.getString("FILEFCAR");
                record.QTY_TOTAL = rst.getInt("QTY_TOTAL");
                record.QTY_PENDING = rst.getInt("QTY_PENDING");
                record.QTY_ACCEPTED = rst.getInt("QTY_ACCEPTED");
                record.QTY_ERROR = rst.getInt("QTY_ERROR");
                record.QTY_ERROR_VALIDACION = rst.getInt("QTY_ERROR_VALIDACION");

                // Acumular los valores
                totalQty += record.QTY_TOTAL;
                totalPending += record.QTY_PENDING;
                totalAccepted += record.QTY_ACCEPTED;
                totalError += record.QTY_ERROR;
                totalErrorValidation += record.QTY_ERROR_VALIDACION;
                
                record.totalQty = totalQty;
                record.totalPending = totalPending;
                record.totalAccepted = totalAccepted;
                record.totalError = totalError;
                record.totalErrorValidation = totalErrorValidation;

                lista.add(record);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }
     
     
     public List<A2745> getListTktDetailAll(A2745 filter) throws Exception {
        stmt = null;
        rst = null;
        cnx = null;
        A2745 record;
        List<A2745> lista = new ArrayList<>();

        
        String SQLCLL01 = "{CALL PRAXISAV.RFS0005(?,?,?,?,?,?,?,?,?)}";
      
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FCARGA);
            cs.setString(3, filter.IN_TICKET);
            cs.setString(4, filter.IN_STATUS);
            cs.setString(5, filter.IN_SEQ);

            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();

            while (rst.next()) {
                record = new A2745();
                record.FECR = rst.getString("FECR");
                record.CCIA = rst.getString("PLATE");
                record.TICKET = rst.getString("TICKET");
                record.A5003SEQ = rst.getString("A5003SEQ");
                record.FSELEC  = rst.getString("FSELEC");
//                record.SAGENT = rst.getString("SAGENT");
//                record.PNAME = rst.getString("PNAME");
                record.STVAL = rst.getString("STVAL");
//                record.TKTC = rst.getString("TKTC");
                record.RFNI = rst.getString("RFNI");
//                record.RDBS = rst.getString("RDBS"); ///issue date
//                record.IDX1 = rst.getString("IDX1");
//                record.IDX2 = rst.getString("IDX2");
//                record.IDX3 = rst.getString("IDX3");
//                record.IDX4 = rst.getString("IDX4");
//                record.IDX5 = rst.getString("IDX5");
//                record.IDX6 = rst.getString("IDX6");
//                record.IDX7 = rst.getString("IDX7");
//                record.IDX8 = rst.getString("IDX8");
//                record.IDX9 = rst.getString("IDX9");
//                record.IDX10 = rst.getString("IDX10");
                record.TOTRE = rst.getDouble("TOTRE");
                record.TOTCU = rst.getString("TOTCU");
                
                
                //INPUT
                record.TKTF = rst.getString("A5003TKTF");
                record.RDBS = rst.getString("RDBS");
                record.PNRI = rst.getString("A5003PNRI");
                record.CHANI = rst.getString("A5003CHNI");
                record.RFNI = rst.getString("RFNI");
                
                
                //TICKET SUMMARY
                
                record.TKT = rst.getString("A5003TKT");
                record.FEMI = rst.getString("A5003FEMI");
                record.TKTC = rst.getString("TKTC");
                record.TKTP = rst.getString("TKTP");
                record.PNR = rst.getString("PNR");
                record.SAGENT = rst.getString("SAGENT");
                record.PNAME = rst.getString("PNAME");
                record.COPER = rst.getString("COPER");
                record.COAMO = rst.getString("COAMO");
                record.RFISC = rst.getString("RFISC");
                
                
                //CLIENT DATA
                               
                record.TKTNU = rst.getString("A5003TKTNU");
                record.EMAIL = rst.getString("A5003EMAIL");
                record.CHANE = rst.getString("A5003CHANE");
                record.SUBCH = rst.getString("A5003SUBCH");
                record.ACRES= rst.getString("A5003ACRES");
                record.FNAME= rst.getString("A5003FNAME");
                record.MNAME= rst.getString("A5003MNAME");
                record.LNAME= rst.getString("A5003LNAME");
                record.SNAME= rst.getString("A5003SNAME");
                record.SPLIT= rst.getString("A5003SPLIT");
                record.PNEW= rst.getString("A5003PNEW");
                record.CPNDN= rst.getString("A5003CPNDN");
                record.CPNDA= rst.getString("A5003CPNDA");
                record.FFNUM= rst.getString("A5003FFNUM");
                record.SCOUN= rst.getString("A5003SCOUN");
                
                //COUPPONS INFORMATION
                
                record.IDX1 = rst.getString("IDX1");
                record.CCD1 = rst.getString("A5003CCD1");
                record.IDX2 = rst.getString("IDX2");
                record.CCD2 = rst.getString("A5003CCD2");
                record.IDX3 = rst.getString("IDX3");
                record.CCD3 = rst.getString("A5003CCD3");
                record.IDX4 = rst.getString("IDX4");
                record.CCD4 = rst.getString("A5003CCD4");
                record.IDX5 = rst.getString("IDX5");
                record.CCD5 = rst.getString("A5003CCD5");
                record.IDX6 = rst.getString("IDX6");
                record.CCD6 = rst.getString("A5003CCD6");
                record.IDX7 = rst.getString("IDX7");
                record.CCD7 = rst.getString("A5003CCD7");
                record.IDX8 = rst.getString("IDX8");
                record.CCD8 = rst.getString("A5003CCD8");
                record.IDX9 = rst.getString("IDX9");
                record.CCD9 = rst.getString("A5003CCD9");              
                record.IDX10 = rst.getString("IDX10");
                record.CCD10 = rst.getString("A5003CCD10");
                
                
                
                //FORM OF PAYMENT
                
                record.ISORS = rst.getString("A5003ISORS");
                record.FOP = rst.getString("A5003FOP");
                record.FRANC = rst.getString("A5003FRANC");
                record.CNUMB = rst.getString("A5003CNUMB");
                record.EXPDA = rst.getString("A5003EXPDA");
                record.APCOD = rst.getString("A5003APCOD");
                record.STATR = rst.getString("A5003STATR");
                record.REASF = rst.getString("A5003REASF");
                
                
                //REFUND CANDIDATE SUMARY
                
                
                record.BFAMO = rst.getString("A5003BFAMO");
                record.BFCUR = rst.getString("A5003BFCUR");
                record.FRAMO = rst.getString("A5003FRAMO");
                record.FRCUR = rst.getString("A5003FRCUR");
                record.TAAMO = rst.getString("A5003TAAMO");
                record.TACUR = rst.getString("A5003TACUR");
                record.TARMO = rst.getString("A5003TARMO");

                
                //COUPONS DETAILS 
                
                record.ID1 = rst.getString("A5003ID1");
                record.IX1 = rst.getString("A5003IX1");
                record.SEG1 = rst.getString("A5003SEG1");
                record.ISO1 = rst.getString("A5003ISO1");
                record.STA1 = rst.getString("A5003STA1");
                record.CON1 = rst.getString("A5003CON1");
                record.ORI1 = rst.getString("A5003ORI1");
                record.DES1 = rst.getString("A5003DES1");
                record.DEP1 = rst.getString("A5003DEP1");
                
                // AQUI SE AGREGAN LOS DEMAS CAMPOS CUANDO SE NECESITE
                
                
                record.A5003STATR = rst.getString("A5003STATR");
                record.A5003REASF = rst.getString("A5003REASF");
                record.SCOUNTRY = rst.getString("SCOUNTRY");
                
                
               
          
                // usuarios
                
                record.USUP = rst.getString("USUP");
                record.FEUP = rst.getString("FEUP");
                record.HOUP = rst.getString("HOUP");
                record.USCR = rst.getString("USCR");
                record.FECR = rst.getString("FECR");
                record.HOCR = rst.getString("HOCR");
                
                

                StringBuilder idxConcat = new StringBuilder();

                if (record.IDX1 != null && !record.IDX1.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX2 != null && !record.IDX2.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX3 != null && !record.IDX3.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX4 != null && !record.IDX4.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX5 != null && !record.IDX5.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX6 != null && !record.IDX6.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX7 != null && !record.IDX7.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX8 != null && !record.IDX8.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX9 != null && !record.IDX9.trim().isEmpty()) idxConcat.append("R ");
                if (record.IDX10 != null && !record.IDX10.trim().isEmpty()) idxConcat.append("R ");

                String resultIDXs = idxConcat.toString().trim();
                record.IDXRESULT = resultIDXs;

                record.page.PAGNUM = filter.page.PAGNUM;
                record.page.PAGROW = filter.page.PAGROW;
                record.page.TOTPAG = filter.page.TOTPAG;
                record.page.TOTROW = filter.page.TOTROW;

                lista.add(record);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }
     

}
