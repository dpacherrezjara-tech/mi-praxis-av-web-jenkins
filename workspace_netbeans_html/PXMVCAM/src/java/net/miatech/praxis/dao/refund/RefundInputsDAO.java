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
import org.apache.log4j.Logger;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.time.LocalTime;


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

                record.STVAL = rst.getString("STVAL");
//                record.TKTC = rst.getString("TKTC");
                record.RFNI = rst.getString("RFNI");

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
     
     ///
     /// PARA LA CARGA
     
      public String verificarCrearRegistros() {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String message = "";

        try {
            conn = session.getCNXIBMDB2().getIBMDB2Connection();

            String fechaActual = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            String user = "USRWEBAV";

            ps = conn.prepareStatement(
                "SELECT COUNT(*) FROM PRAXISAV.A2359 WHERE PROCDATE = ? AND OUTNAME = 'AVE'"
            );
            ps.setString(1, fechaActual);
            rs = ps.executeQuery();
            boolean existeRegistro = false;
            if (rs.next()) {
                existeRegistro = rs.getInt(1) > 0;
            }
            rs.close();
            ps.close();

            if (!existeRegistro) {
               
                ps = conn.prepareStatement(
                    "SELECT CCUST, DENV, INPNAME, INPTYPE, LIBNAME, OUTNAME " +
                    "FROM PRAXISAV.A2358 WHERE CCUST = '134' AND OUTNAME = 'AVE'"
                );
                rs = ps.executeQuery();

                if (rs.next()) {
                    String ccust = rs.getString("CCUST");
                    String denv = rs.getString("DENV");
                    String inpname = rs.getString("INPNAME");
                    String inptype = rs.getString("INPTYPE");
                    String libname = rs.getString("LIBNAME");
                    String outname = rs.getString("OUTNAME");
                    rs.close();
                    ps.close();

                    SimpleDateFormat sdfFecha = new SimpleDateFormat("yyyyMMdd");
                    SimpleDateFormat sdfHora = new SimpleDateFormat("HHmmss");
                    Date fechaBase = sdfFecha.parse(fechaActual);

                    int registrosCreados = 0;
                    Calendar cal = Calendar.getInstance();

                    for (int i = 0; i < 60 && registrosCreados < 30; i++) {
                        cal.setTime(fechaBase);
                        cal.add(Calendar.DAY_OF_MONTH, i);

                        int diaSemana = cal.get(Calendar.DAY_OF_WEEK);
                        
                        if (diaSemana == Calendar.SATURDAY || diaSemana == Calendar.SUNDAY) {
                            continue;
                        }

                        String fechaStr = sdfFecha.format(cal.getTime());

                       
                        ps = conn.prepareStatement(
                            "SELECT COUNT(*) FROM PRAXISAV.A2359 WHERE PROCDATE = ? AND OUTNAME = ?"
                        );
                        ps.setString(1, fechaStr);
                        ps.setString(2, outname);
                        rs = ps.executeQuery();
                        boolean yaExiste = false;
                        if (rs.next()) {
                            yaExiste = rs.getInt(1) > 0;
                        }
                        rs.close();
                        ps.close();

                        if (!yaExiste) {
                            ps = conn.prepareStatement(
                                "INSERT INTO PRAXISAV.A2359 " +
                                "(CCUST, SEQNUM, DENV, INPNAME, INPTYPE, LIBNAME, OUTNAME, PROCDATE, TRFSTAT, USCR, FECR, HOCR) " +
                                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'N', ?, ?, ?)"
                            );
                            ps.setString(1, ccust);
                            ps.setString(2, String.format("%02d", registrosCreados + 1));
                            ps.setString(3, denv);
                            ps.setString(4, inpname);
                            ps.setString(5, inptype);
                            ps.setString(6, libname);
                            ps.setString(7, outname);
                            ps.setString(8, fechaStr);
                            ps.setString(9, user);
                            ps.setString(10, fechaStr);
                            ps.setString(11, sdfHora.format(new Date()));
                            ps.executeUpdate();
                            ps.close();

                            registrosCreados++;
                        }
                    }

                    message = "Se crearon " + registrosCreados + " registros nuevos en la tabla de control";
                } else {
                    message = "No se encontró configuración en A2358 para CCUST=134 y OUTNAME=AVE";
                }
            } else {
                message = "Ya existe registro para la fecha actual en la tabla de control";
            }

        } catch (Exception e) {
            message = "Error al verificar/crear registros: " + e.getMessage();
        } finally {
            try { if (rs != null) rs.close(); } catch (Exception ignored) {}
            try { if (ps != null) ps.close(); } catch (Exception ignored) {}
            try { if (conn != null) conn.close(); } catch (Exception ignored) {}
        }

        return message;
    }
      
      
         public String verificarArchivoYaCargado(String fecha, String fileName) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String message = "";

        try {
            conn = session.getCNXIBMDB2().getIBMDB2Connection();

            ps = conn.prepareStatement(
                "SELECT 1 FROM PRAXISAV.A5003 WHERE  FILENAME = ? LIMIT 1"
            );
            ps.setString(1, fileName);

            rs = ps.executeQuery();

            if (rs.next()) {
                
                message = "El archivo '" + fileName + "' ya fue cargado para la fecha " + fecha + ".";
            } else {
                
                message = "OK";
            }

        } catch (Exception e) {
            message = "Error al verificar archivo cargado: " + e.getMessage();
        } finally {
            try { if (rs != null) rs.close(); } catch (Exception ignored) {}
            try { if (ps != null) ps.close(); } catch (Exception ignored) {}
            try { if (conn != null) conn.close(); } catch (Exception ignored) {}
        }

        return message;
    }
         
         
         
          public String obtenerSiguienteSecuencia(String fecr) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String nextSeq = "00"; // Valor inicial por defecto

        try {
            conn = session.getCNXIBMDB2().getIBMDB2Connection();

            // Consulta la última secuencia usada para esa fecha de carga (FECR)
            String sql = 
                "SELECT MAX(A5003SEQ) AS MAXSEQ " +
                "FROM PRAXISAV.A5003 " +
                "WHERE FECR = ?";

            ps = conn.prepareStatement(sql);
            ps.setString(1, fecr);

            rs = ps.executeQuery();

            if (rs.next() && rs.getString("MAXSEQ") != null) {
                try {
                    int current = Integer.parseInt(rs.getString("MAXSEQ"));
                    nextSeq = String.format("%02d", current + 1); // Incrementa y formatea a 2 dígitos
                } catch (NumberFormatException e) {
                    // Si algún registro viejo tiene algo raro en la secuencia, reinicia
                    nextSeq = "00";
                }
            }

        } catch (Exception e) {
            System.err.println("Error al obtener secuencia: " + e.getMessage());
        } finally {
            try { if (rs != null) rs.close(); } catch (Exception ignored) {}
            try { if (ps != null) ps.close(); } catch (Exception ignored) {}
            try { if (conn != null) conn.close(); } catch (Exception ignored) {}
        }

        return nextSeq;
    }
          
          
          
          public String insertA5003(A2745 input, String siguienteSecuencia, String fechaFilename) {
    Connection conn = null;
    PreparedStatement ps = null;
    String message = "";

    try {
        conn = session.getCNXIBMDB2().getIBMDB2Connection();

        String sql = "INSERT INTO PRAXISAV.A5003 (" +
                "A5003CCUST, A5003CCIA, A5003FORMA, A5003SERIE, A5003STVAL, " +
                "A5003TKTF, A5003RDBS, A5003PNRI, A5003CHNI, A5003RFNI, " +
                "USCR, FECR, HOCR, PGMCR, FILENAME,A5003SEQ, FILEFCAR" +
                ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";

        ps = conn.prepareStatement(sql);
        ps.setString(1, input.IN_A5003CCUST);
        ps.setString(2, input.IN_A5003CCIA);
        ps.setString(3, input.IN_A5003FORMA);
        ps.setString(4, input.IN_A5003SERIE);
        ps.setString(5, input.IN_A5003STVAL);
        ps.setString(6, input.IN_A5003TKTF);
        ps.setString(7, input.IN_A5003RDBS);
        ps.setString(8, input.IN_A5003PNRI);
        ps.setString(9, input.IN_A5003CHNI);
        ps.setString(10, input.IN_A5003RFNI);
        ps.setString(11, input.USCR);
        ps.setString(12, input.FECR);
        ps.setString(13, input.HOCR);
        ps.setString(14, input.PGMCR);
        ps.setString(15, input.FILENAME);
        ps.setString(16, siguienteSecuencia);
        ps.setString(17, fechaFilename);

        int rows = ps.executeUpdate();
        if (rows > 0) {
            message = "Registro insertado correctamente en A5003.";
        } else {
            message = "No se insertó ningún registro en A5003.";
        }

    } catch (Exception e) {
        message = "Error al insertar en A5003: " + e.getMessage();
    } finally {
        try { if (ps != null) ps.close(); } catch (Exception ignored) {}
        try { if (conn != null) conn.close(); } catch (Exception ignored) {}
    }

    return message;
}
          
          
          
          
            public String insertGoodA5003(A2745 input, String siguienteSecuencia, String fechaFilename) {
        Connection conn1 = null;
        PreparedStatement ps = null;
        String message = "";

        try {
            conn1 = session.getCNXIBMDB2().getIBMDB2Connection();

            String sql = "INSERT INTO PRAXISAV.A5003 (" +
                    "A5003CCUST, A5003CCIA, A5003FORMA, A5003SERIE, A5003STVAL, " +
                    "A5003TKTF, A5003RDBS, A5003PNRI, A5003CHNI, A5003RFNI, " +
                    "A5003TKT,A5003FEMI,A5003TKTC,A5003TKTP,A5003PNR,A5003SAGEN,A5003PAXN,A5003COPER,A5003COAMO,A5003RFISC,A5003TKTNU,A5003EMAIL,A5003CHANE, " +
                    "A5003SUBCH,A5003ACRES,A5003FNAME,A5003MNAME,A5003LNAME,A5003SNAME,A5003SPLIT,A5003PNEW, " +
                    "A5003CPNDN,A5003CPNDA,A5003FFNUM,A5003SCOUN,A5003IDX1,A5003CCD1,A5003IDX2,A5003CCD2,A5003IDX3,A5003CCD3,A5003IDX4,A5003CCD4,A5003IDX5,A5003CCD5,A5003IDX6,A5003CCD6, " +
                    "A5003IDX7,A5003CCD7, " +
                    "A5003IDX8,A5003CCD8,A5003IDX9,A5003CCD9,A5003IDX10,A5003CCD10,A5003ISORS,A5003FOP,A5003FRANC,A5003CNUMB,A5003EXPDA,A5003APCOD,A5003STATR,A5003REASF,A5003REJEF, " +
                    "A5003AREMA,A5003FEEMD," +
                    "A5003FEIND,A5003FEAMO,A5003FECUR,A5003FEPDA,A5003FEFOP,A5003EXTPA,A5003BFAMO,A5003BFCUR,A5003FRAMO,A5003FRCUR,A5003TAAMO,A5003TACUR,A5003TARMO,A5003TARCU,A5003CAAMO," +
                    "A5003CACUR," +
                    "A5003TOTRE,A5003TOTCU," +
                    "A5003ID1,A5003IX1,A5003SEG1,A5003ISO1,A5003STA1,A5003CON1,A5003ORI1,A5003DES1,A5003DEP1,A5003CLA1,A5003BRC1,A5003BAS1,A5003MKT1,A5003FLI1," +
                    "A5003ID2,A5003IX2,A5003SEG2,A5003ISO2,A5003STA2,A5003CON2,A5003ORI2,A5003DES2,A5003DEP2,A5003CLA2,A5003BRC2,A5003BAS2,A5003MKT2,A5003FLI2," +
                    "A5003ID3,A5003IX3,A5003SEG3,A5003ISO3,A5003STA3,A5003CON3,A5003ORI3,A5003DES3,A5003DEP3,A5003CLA3,A5003BRC3,A5003BAS3,A5003MKT3,A5003FLI3," +
                    "A5003ID4,A5003IX4,A5003SEG4,A5003ISO4,A5003STA4,A5003CON4,A5003ORI4,A5003DES4,A5003DEP4,A5003CLA4,A5003BRC4,A5003BAS4,A5003MKT4,A5003FLI4," +
                    "A5003ID5,A5003IX5,A5003SEG5,A5003ISO5,A5003STA5,A5003CON5,A5003ORI5,A5003DES5,A5003DEP5,A5003CLA5,A5003BRC5,A5003BAS5,A5003MKT5,A5003FLI5," +
                    "A5003ID6,A5003IX6,A5003SEG6,A5003ISO6,A5003STA6,A5003CON6,A5003ORI6,A5003DES6,A5003DEP6,A5003CLA6,A5003BRC6,A5003BAS6,A5003MKT6,A5003FLI6," +
                    "A5003ID7,A5003IX7,A5003SEG7,A5003ISO7,A5003STA7,A5003CON7,A5003ORI7,A5003DES7,A5003DEP7,A5003CLA7,A5003BRC7,A5003BAS7,A5003MKT7,A5003FLI7," +
                    "A5003ID8,A5003IX8,A5003SEG8,A5003ISO8,A5003STA8,A5003CON8,A5003ORI8,A5003DES8,A5003DEP8,A5003CLA8,A5003BRC8,A5003BAS8,A5003MKT8,A5003FLI8," +
                    "A5003ID9,A5003IX9,A5003SEG9,A5003ISO9,A5003STA9,A5003CON9,A5003ORI9,A5003DES9,A5003DEP9,A5003CLA9,A5003BRC9,A5003BAS9,A5003MKT9,A5003FLI9," +
                    "A5003ID10,A5003IX10,A5003SEG10,A5003ISO10,A5003STA10,A5003CON10,A5003ORI10,A5003DES10,A5003DEP10,A5003CLA10,A5003BRC10,A5003BAS10,A5003MKT10,A5003FLI10," +
                    "A5003KEY1,A5003LEF1,A5003TCO1,A5003TMO1,A5003TCU1,A5003SFA1,A5003SFC1,A5003ISP1," +
                    "A5003KEY2,A5003LEF2,A5003TCO2,A5003TMO2,A5003TCU2,A5003SFA2,A5003SFC2,A5003ISP2," +
                    "A5003KEY3,A5003LEF3,A5003TCO3,A5003TMO3,A5003TCU3,A5003SFA3,A5003SFC3,A5003ISP3," +
                    "A5003KEY4,A5003LEF4,A5003TCO4,A5003TMO4,A5003TCU4,A5003SFA4,A5003SFC4,A5003ISP4," +
                    "A5003KEY5,A5003LEF5,A5003TCO5,A5003TMO5,A5003TCU5,A5003SFA5,A5003SFC5,A5003ISP5," +
                    "A5003KEY6,A5003LEF6,A5003TCO6,A5003TMO6,A5003TCU6,A5003SFA6,A5003SFC6,A5003ISP6," +
                    "A5003KEY7,A5003LEF7,A5003TCO7,A5003TMO7,A5003TCU7,A5003SFA7,A5003SFC7,A5003ISP7," +
                    "A5003KEY8,A5003LEF8,A5003TCO8,A5003TMO8,A5003TCU8,A5003SFA8,A5003SFC8,A5003ISP8," +
                    "A5003KEY9,A5003LEF9,A5003TCO9,A5003TMO9,A5003TCU9,A5003SFA9,A5003SFC9,A5003ISP9," +
                    "A5003KEY10,A5003LEF10,A5003TCO10,A5003TMO10,A5003TCU10,A5003SFA10,A5003SFC10,A5003ISP10," +
                    "A5003KEY11,A5003LEF11,A5003TCO11,A5003TMO11,A5003TCU11,A5003SFA11,A5003SFC11,A5003ISP11," +
                    "A5003KEY12,A5003LEF12,A5003TCO12,A5003TMO12,A5003TCU12,A5003SFA12,A5003SFC12,A5003ISP12," +
                    "A5003KEY13,A5003LEF13,A5003TCO13,A5003TMO13,A5003TCU13,A5003SFA13,A5003SFC13,A5003ISP13," +
                    "A5003KEY14,A5003LEF14,A5003TCO14,A5003TMO14,A5003TCU14,A5003SFA14,A5003SFC14,A5003ISP14," +
                    "A5003KEY15,A5003LEF15,A5003TCO15,A5003TMO15,A5003TCU15,A5003SFA15,A5003SFC15,A5003ISP15," +
                    "A5003KEY16,A5003LEF16,A5003TCO16,A5003TMO16,A5003TCU16,A5003SFA16,A5003SFC16,A5003ISP16," +
                    "A5003KEY17,A5003LEF17,A5003TCO17,A5003TMO17,A5003TCU17,A5003SFA17,A5003SFC17,A5003ISP17," +
                    "A5003KEY18,A5003LEF18,A5003TCO18,A5003TMO18,A5003TCU18,A5003SFA18,A5003SFC18,A5003ISP18," +
                    "A5003KEY19,A5003LEF19,A5003TCO19,A5003TMO19,A5003TCU19,A5003SFA19,A5003SFC19,A5003ISP19," +
                    "A5003KEY20,A5003LEF20,A5003TCO20,A5003TMO20,A5003TCU20,A5003SFA20,A5003SFC20,A5003ISP20," +
                    "A5003COD1,A5003ISR1," +
                    "A5003COD2,A5003ISR2," +
                    "A5003COD3,A5003ISR3," +
                    "A5003COD4,A5003ISR4," +
                    "A5003COD5,A5003ISR5," +
                    "A5003COD6,A5003ISR6," +
                    "A5003COD7,A5003ISR7," +
                    "A5003COD8,A5003ISR8," +
                    "A5003COD9,A5003ISR9," +
                    "A5003COD10,A5003ISR10," +
                    "A5003COD11,A5003ISR11," +
                    "A5003COD12,A5003ISR12," +
                    "A5003COD13,A5003ISR13," +
                    "A5003COD14,A5003ISR14," +
                    "A5003COD15,A5003ISR15," +
                    "A5003COD16,A5003ISR16," +
                    "A5003COD17,A5003ISR17," +
                    "A5003COD18,A5003ISR18," +
                    "A5003COD19,A5003ISR19," +
                    "A5003COD20,A5003ISR20," +
                    "USCR, FECR, HOCR, PGMCR, FILENAME, A5003SEQ, FILEFCAR" +
                    ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
                    "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
                    "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
                    "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
                    "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?" +
                    "" + ")";

            ps = conn1.prepareStatement(sql);
            ps.setString(1, input.IN_A5003CCUST);
            ps.setString(2, input.IN_A5003CCIA);
            ps.setString(3, input.IN_A5003FORMA);
            ps.setString(4, input.IN_A5003SERIE);
            ps.setString(5, input.IN_A5003STVAL);
            ps.setString(6, input.IN_A5003TKTF);
            ps.setString(7, input.IN_A5003RDBS);
            ps.setString(8, input.IN_A5003PNRI);
            ps.setString(9, input.IN_A5003CHNI);
            ps.setString(10, input.IN_A5003RFNI);
            
            
            ps.setString(11, input.IN_A5003TKT);
            ps.setString(12, input.IN_A5003FEMI);
            ps.setString(13, input.IN_A5003TKTC);
            ps.setString(14, input.IN_A5003TKTP);
            ps.setString(15, input.IN_A5003PNR);
            ps.setString(16, input.IN_A5003SAGEN);
            ps.setString(17, input.IN_A5003PAXN);
            ps.setDouble(18, input.IN_A5003COPER);
            ps.setDouble(19, input.IN_A5003COAMO);
            ps.setString(20, input.IN_A5003RFISC);
            ps.setString(21, input.IN_A5003TKTNU);
            ps.setString(22, input.IN_A5003EMAIL);
            
            ps.setString(23, input.IN_A5003CHANE);
            ps.setString(24, input.IN_A5003SUBCH);
            ps.setString(25, input.IN_A5003ACRES);
            ps.setString(26, input.IN_A5003FNAME);
            ps.setString(27, input.IN_A5003MNAME);
            ps.setString(28, input.IN_A5003LNAME);
            ps.setString(29, input.IN_A5003SNAME);
            ps.setString(30, input.IN_A5003SPLIT);
            ps.setString(31, input.IN_A5003PNEW);
            ps.setString(32, input.IN_A5003CPNDN);
            ps.setString(33, input.IN_A5003CPNDA);
            ps.setString(34, input.IN_A5003FFNUM);
            ps.setString(35, input.IN_A5003SCOUN);
            
            ps.setString(36, input.IN_A5003IDX1);
            ps.setString(37, input.IN_A5003CCD1);
            ps.setString(38, input.IN_A5003IDX2);
            ps.setString(39, input.IN_A5003CCD2);
            ps.setString(40, input.IN_A5003IDX3);
            ps.setString(41, input.IN_A5003CCD3);
            ps.setString(42, input.IN_A5003IDX4);
            ps.setString(43, input.IN_A5003CCD4);
            ps.setString(44, input.IN_A5003IDX5);
            ps.setString(45, input.IN_A5003CCD5);
            ps.setString(46, input.IN_A5003IDX6);
            ps.setString(47, input.IN_A5003CCD6);
            ps.setString(48, input.IN_A5003IDX7);
            ps.setString(49, input.IN_A5003CCD7);
            ps.setString(50, input.IN_A5003IDX8);
            ps.setString(51, input.IN_A5003CCD8);
            ps.setString(52, input.IN_A5003IDX9);
            ps.setString(53, input.IN_A5003CCD9);
            ps.setString(54, input.IN_A5003IDX10);
            ps.setString(55, input.IN_A5003CCD10);
            
            ps.setString(56, input.IN_A5003ISORS);
            ps.setString(57, input.IN_A5003FOP);
            ps.setString(58, input.IN_A5003FRANC);
            ps.setString(59, input.IN_A5003CNUMB);
            ps.setString(60, input.IN_A5003EXPDA);
            ps.setString(61, input.IN_A5003APCOD);
            ps.setString(62, input.IN_A5003STATR);
            ps.setString(63, input.IN_A5003REASF);
            ps.setString(64, input.IN_A5003REJEF);
            ps.setString(65, input.IN_A5003AREMA);
            ps.setString(66, input.IN_A5003FEEMD);
            ps.setString(67, input.IN_A5003FEIND);
            ps.setDouble(68, input.IN_A5003FEAMO);
            ps.setString(69, input.IN_A5003FECUR);
            ps.setString(70, input.IN_A5003FEPDA);
            ps.setString(71, input.IN_A5003FEFOP);
            ps.setString(72, input.IN_A5003EXTPA);
            ps.setDouble(73, input.IN_A5003BFAMO);
            ps.setString(74, input.IN_A5003BFCUR);
            ps.setDouble(75, input.IN_A5003FRAMO);
            ps.setString(76, input.IN_A5003FRCUR);
            ps.setDouble(77, input.IN_A5003TAAMO);
            ps.setString(78, input.IN_A5003TACUR);
            ps.setDouble(79, input.IN_A5003TARMO);
            ps.setString(80, input.IN_A5003TARCU);
            ps.setDouble(81, input.IN_A5003CAAMO);
            ps.setString(82, input.IN_A5003CACUR);
            ps.setDouble(83, input.IN_A5003TOTRE);
            ps.setString(84, input.IN_A5003TOTCU);
            
            ps.setString(85, input.IN_A5003ID1);
            ps.setString(86, input.IN_A5003IX1);
            ps.setString(87, input.IN_A5003SEG1);
            ps.setString(88, input.IN_A5003ISO1);
            ps.setString(89, input.IN_A5003STA1);
            ps.setString(90, input.IN_A5003CON1);
            ps.setString(91, input.IN_A5003ORI1);
            ps.setString(92, input.IN_A5003DES1);
            ps.setString(93, input.IN_A5003DEP1);
            ps.setString(94, input.IN_A5003CLA1);
            ps.setString(95, input.IN_A5003BRC1);
            ps.setString(96, input.IN_A5003BAS1);
            ps.setString(97, input.IN_A5003MKT1);
            ps.setString(98, input.IN_A5003FLI1);
            
            ps.setString(99, input.IN_A5003ID2);
            ps.setString(100, input.IN_A5003IX2);
            ps.setString(101, input.IN_A5003SEG2);
            ps.setString(102, input.IN_A5003ISO2);
            ps.setString(103, input.IN_A5003STA2);
            ps.setString(104, input.IN_A5003CON2);
            ps.setString(105, input.IN_A5003ORI2);
            ps.setString(106, input.IN_A5003DES2);
            ps.setString(107, input.IN_A5003DEP2);
            ps.setString(108, input.IN_A5003CLA2);
            ps.setString(109, input.IN_A5003BRC2);
            ps.setString(110, input.IN_A5003BAS2);
            ps.setString(111, input.IN_A5003MKT2);
            ps.setString(112, input.IN_A5003FLI2);
            
            ps.setString(113, input.IN_A5003ID3);
            ps.setString(114, input.IN_A5003IX3);
            ps.setString(115, input.IN_A5003SEG3);
            ps.setString(116, input.IN_A5003ISO3);
            ps.setString(117, input.IN_A5003STA3);
            ps.setString(118, input.IN_A5003CON3);
            ps.setString(119, input.IN_A5003ORI3);
            ps.setString(120, input.IN_A5003DES3);
            ps.setString(121, input.IN_A5003DEP3);
            ps.setString(122, input.IN_A5003CLA3);
            ps.setString(123, input.IN_A5003BRC3);
            ps.setString(124, input.IN_A5003BAS3);
            ps.setString(125, input.IN_A5003MKT3);
            ps.setString(126, input.IN_A5003FLI3);
            
            ps.setString(127, input.IN_A5003ID4);
            ps.setString(128, input.IN_A5003IX4);
            ps.setString(129, input.IN_A5003SEG4);
            ps.setString(130, input.IN_A5003ISO4);
            ps.setString(131, input.IN_A5003STA4);
            ps.setString(132, input.IN_A5003CON4);
            ps.setString(133, input.IN_A5003ORI4);
            ps.setString(134, input.IN_A5003DES4);
            ps.setString(135, input.IN_A5003DEP4);
            ps.setString(136, input.IN_A5003CLA4);
            ps.setString(137, input.IN_A5003BRC4);
            ps.setString(138, input.IN_A5003BAS4);
            ps.setString(139, input.IN_A5003MKT4);
            ps.setString(140, input.IN_A5003FLI4);

            ps.setString(141, input.IN_A5003ID5);
            ps.setString(142, input.IN_A5003IX5);
            ps.setString(143, input.IN_A5003SEG5);
            ps.setString(144, input.IN_A5003ISO5);
            ps.setString(145, input.IN_A5003STA5);
            ps.setString(146, input.IN_A5003CON5);
            ps.setString(147, input.IN_A5003ORI5);
            ps.setString(148, input.IN_A5003DES5);
            ps.setString(149, input.IN_A5003DEP5);
            ps.setString(150, input.IN_A5003CLA5);
            ps.setString(151, input.IN_A5003BRC5);
            ps.setString(152, input.IN_A5003BAS5);
            ps.setString(153, input.IN_A5003MKT5);
            ps.setString(154, input.IN_A5003FLI5);

            ps.setString(155, input.IN_A5003ID6);
            ps.setString(156, input.IN_A5003IX6);
            ps.setString(157, input.IN_A5003SEG6);
            ps.setString(158, input.IN_A5003ISO6);
            ps.setString(159, input.IN_A5003STA6);
            ps.setString(160, input.IN_A5003CON6);
            ps.setString(161, input.IN_A5003ORI6);
            ps.setString(162, input.IN_A5003DES6);
            ps.setString(163, input.IN_A5003DEP6);
            ps.setString(164, input.IN_A5003CLA6);
            ps.setString(165, input.IN_A5003BRC6);
            ps.setString(166, input.IN_A5003BAS6);
            ps.setString(167, input.IN_A5003MKT6);
            ps.setString(168, input.IN_A5003FLI6);

            ps.setString(169, input.IN_A5003ID7);
            ps.setString(170, input.IN_A5003IX7);
            ps.setString(171, input.IN_A5003SEG7);
            ps.setString(172, input.IN_A5003ISO7);
            ps.setString(173, input.IN_A5003STA7);
            ps.setString(174, input.IN_A5003CON7);
            ps.setString(175, input.IN_A5003ORI7);
            ps.setString(176, input.IN_A5003DES7);
            ps.setString(177, input.IN_A5003DEP7);
            ps.setString(178, input.IN_A5003CLA7);
            ps.setString(179, input.IN_A5003BRC7);
            ps.setString(180, input.IN_A5003BAS7);
            ps.setString(181, input.IN_A5003MKT7);
            ps.setString(182, input.IN_A5003FLI7);

            ps.setString(183, input.IN_A5003ID8);
            ps.setString(184, input.IN_A5003IX8);
            ps.setString(185, input.IN_A5003SEG8);
            ps.setString(186, input.IN_A5003ISO8);
            ps.setString(187, input.IN_A5003STA8);
            ps.setString(188, input.IN_A5003CON8);
            ps.setString(189, input.IN_A5003ORI8);
            ps.setString(190, input.IN_A5003DES8);
            ps.setString(191, input.IN_A5003DEP8);
            ps.setString(192, input.IN_A5003CLA8);
            ps.setString(193, input.IN_A5003BRC8);
            ps.setString(194, input.IN_A5003BAS8);
            ps.setString(195, input.IN_A5003MKT8);
            ps.setString(196, input.IN_A5003FLI8);

            ps.setString(197, input.IN_A5003ID9);
            ps.setString(198, input.IN_A5003IX9);
            ps.setString(199, input.IN_A5003SEG9);
            ps.setString(200, input.IN_A5003ISO9);
            ps.setString(201, input.IN_A5003STA9);
            ps.setString(202, input.IN_A5003CON9);
            ps.setString(203, input.IN_A5003ORI9);
            ps.setString(204, input.IN_A5003DES9);
            ps.setString(205, input.IN_A5003DEP9);
            ps.setString(206, input.IN_A5003CLA9);
            ps.setString(207, input.IN_A5003BRC9);
            ps.setString(208, input.IN_A5003BAS9);
            ps.setString(209, input.IN_A5003MKT9);
            ps.setString(210, input.IN_A5003FLI9);

            ps.setString(211, input.IN_A5003ID10);
            ps.setString(212, input.IN_A5003IX10);
            ps.setString(213, input.IN_A5003SEG10);
            ps.setString(214, input.IN_A5003ISO10);
            ps.setString(215, input.IN_A5003STA10);
            ps.setString(216, input.IN_A5003CON10);
            ps.setString(217, input.IN_A5003ORI10);
            ps.setString(218, input.IN_A5003DES10);
            ps.setString(219, input.IN_A5003DEP10);
            ps.setString(220, input.IN_A5003CLA10);
            ps.setString(221, input.IN_A5003BRC10);
            ps.setString(222, input.IN_A5003BAS10);  
            ps.setString(223, input.IN_A5003MKT10);
            ps.setString(224, input.IN_A5003FLI10);
            
            ps.setString(225, input.IN_A5003KEY1);
            ps.setString(226, input.IN_A5003LEF1);
            ps.setString(227, input.IN_A5003TCO1);
            ps.setDouble(228, input.IN_A5003TMO1);
            ps.setString(229, input.IN_A5003TCU1);
            ps.setDouble(230, input.IN_A5003SFA1);
            ps.setString(231, input.IN_A5003SFC1);
            ps.setString(232, input.IN_A5003ISP1);
            
            ps.setString(233, input.IN_A5003KEY2);
            ps.setString(234, input.IN_A5003LEF2);
            ps.setString(235, input.IN_A5003TCO2);
            ps.setDouble(236, input.IN_A5003TMO2);
            ps.setString(237, input.IN_A5003TCU2);
            ps.setDouble(238, input.IN_A5003SFA2);
            ps.setString(239, input.IN_A5003SFC2);
            ps.setString(240, input.IN_A5003ISP2);

            ps.setString(241, input.IN_A5003KEY3);
            ps.setString(242, input.IN_A5003LEF3);
            ps.setString(243, input.IN_A5003TCO3);
            ps.setDouble(244, input.IN_A5003TMO3);
            ps.setString(245, input.IN_A5003TCU3);
            ps.setDouble(246, input.IN_A5003SFA3);
            ps.setString(247, input.IN_A5003SFC3);
            ps.setString(248, input.IN_A5003ISP3);

            ps.setString(249, input.IN_A5003KEY4);
            ps.setString(250, input.IN_A5003LEF4);
            ps.setString(251, input.IN_A5003TCO4);
            ps.setDouble(252, input.IN_A5003TMO4);
            ps.setString(253, input.IN_A5003TCU4);
            ps.setDouble(254, input.IN_A5003SFA4);
            ps.setString(255, input.IN_A5003SFC4);
            ps.setString(256, input.IN_A5003ISP4);

            ps.setString(257, input.IN_A5003KEY5);
            ps.setString(258, input.IN_A5003LEF5);
            ps.setString(259, input.IN_A5003TCO5);
            ps.setDouble(260, input.IN_A5003TMO5);
            ps.setString(261, input.IN_A5003TCU5);
            ps.setDouble(262, input.IN_A5003SFA5);
            ps.setString(263, input.IN_A5003SFC5);
            ps.setString(264, input.IN_A5003ISP5);

            ps.setString(265, input.IN_A5003KEY6);
            ps.setString(266, input.IN_A5003LEF6);
            ps.setString(267, input.IN_A5003TCO6);
            ps.setDouble(268, input.IN_A5003TMO6);
            ps.setString(269, input.IN_A5003TCU6);
            ps.setDouble(270, input.IN_A5003SFA6);
            ps.setString(271, input.IN_A5003SFC6);
            ps.setString(272, input.IN_A5003ISP6);

            ps.setString(273, input.IN_A5003KEY7);
            ps.setString(274, input.IN_A5003LEF7);
            ps.setString(275, input.IN_A5003TCO7);
            ps.setDouble(276, input.IN_A5003TMO7);
            ps.setString(277, input.IN_A5003TCU7);
            ps.setDouble(278, input.IN_A5003SFA7);
            ps.setString(279, input.IN_A5003SFC7);
            ps.setString(280, input.IN_A5003ISP7);

            ps.setString(281, input.IN_A5003KEY8);
            ps.setString(282, input.IN_A5003LEF8);
            ps.setString(283, input.IN_A5003TCO8);
            ps.setDouble(284, input.IN_A5003TMO8);
            ps.setString(285, input.IN_A5003TCU8);
            ps.setDouble(286, input.IN_A5003SFA8);
            ps.setString(287, input.IN_A5003SFC8);
            ps.setString(288, input.IN_A5003ISP8);

            ps.setString(289, input.IN_A5003KEY9);
            ps.setString(290, input.IN_A5003LEF9);
            ps.setString(291, input.IN_A5003TCO9);
            ps.setDouble(292, input.IN_A5003TMO9);
            ps.setString(293, input.IN_A5003TCU9);
            ps.setDouble(294, input.IN_A5003SFA9);
            ps.setString(295, input.IN_A5003SFC9);
            ps.setString(296, input.IN_A5003ISP9);

            ps.setString(297, input.IN_A5003KEY10);
            ps.setString(298, input.IN_A5003LEF10);
            ps.setString(299, input.IN_A5003TCO10);
            ps.setDouble(300, input.IN_A5003TMO10);
            ps.setString(301, input.IN_A5003TCU10);
            ps.setDouble(302, input.IN_A5003SFA10);
            ps.setString(303, input.IN_A5003SFC10);
            ps.setString(304, input.IN_A5003ISP10);

            ps.setString(305, input.IN_A5003KEY11);
            ps.setString(306, input.IN_A5003LEF11);
            ps.setString(307, input.IN_A5003TCO11);
            ps.setDouble(308, input.IN_A5003TMO11);
            ps.setString(309, input.IN_A5003TCU11);
            ps.setDouble(310, input.IN_A5003SFA11);
            ps.setString(311, input.IN_A5003SFC11);
            ps.setString(312, input.IN_A5003ISP11);

            ps.setString(313, input.IN_A5003KEY12);
            ps.setString(314, input.IN_A5003LEF12);
            ps.setString(315, input.IN_A5003TCO12);
            ps.setDouble(316, input.IN_A5003TMO12);
            ps.setString(317, input.IN_A5003TCU12);
            ps.setDouble(318, input.IN_A5003SFA12);
            ps.setString(319, input.IN_A5003SFC12);
            ps.setString(320, input.IN_A5003ISP12);

            ps.setString(321, input.IN_A5003KEY13);
            ps.setString(322, input.IN_A5003LEF13);
            ps.setString(323, input.IN_A5003TCO13);
            ps.setDouble(324, input.IN_A5003TMO13);
            ps.setString(325, input.IN_A5003TCU13);
            ps.setDouble(326, input.IN_A5003SFA13);
            ps.setString(327, input.IN_A5003SFC13);
            ps.setString(328, input.IN_A5003ISP13);

            ps.setString(329, input.IN_A5003KEY14);
            ps.setString(330, input.IN_A5003LEF14);
            ps.setString(331, input.IN_A5003TCO14);
            ps.setDouble(332, input.IN_A5003TMO14);
            ps.setString(333, input.IN_A5003TCU14);
            ps.setDouble(334, input.IN_A5003SFA14);
            ps.setString(335, input.IN_A5003SFC14);
            ps.setString(336, input.IN_A5003ISP14);

            ps.setString(337, input.IN_A5003KEY15);
            ps.setString(338, input.IN_A5003LEF15);
            ps.setString(339, input.IN_A5003TCO15);
            ps.setDouble(340, input.IN_A5003TMO15);
            ps.setString(341, input.IN_A5003TCU15);
            ps.setDouble(342, input.IN_A5003SFA15);
            ps.setString(343, input.IN_A5003SFC15);
            ps.setString(344, input.IN_A5003ISP15);

            ps.setString(345, input.IN_A5003KEY16);
            ps.setString(346, input.IN_A5003LEF16);
            ps.setString(347, input.IN_A5003TCO16);
            ps.setDouble(348, input.IN_A5003TMO16);
            ps.setString(349, input.IN_A5003TCU16);
            ps.setDouble(350, input.IN_A5003SFA16);
            ps.setString(351, input.IN_A5003SFC16);
            ps.setString(352, input.IN_A5003ISP16);

            ps.setString(353, input.IN_A5003KEY17);
            ps.setString(354, input.IN_A5003LEF17);
            ps.setString(355, input.IN_A5003TCO17);
            ps.setDouble(356, input.IN_A5003TMO17);
            ps.setString(357, input.IN_A5003TCU17);
            ps.setDouble(358, input.IN_A5003SFA17);
            ps.setString(359, input.IN_A5003SFC17);
            ps.setString(360, input.IN_A5003ISP17);

            ps.setString(361, input.IN_A5003KEY18);
            ps.setString(362, input.IN_A5003LEF18);
            ps.setString(363, input.IN_A5003TCO18);
            ps.setDouble(364, input.IN_A5003TMO18);
            ps.setString(365, input.IN_A5003TCU18);
            ps.setDouble(366, input.IN_A5003SFA18);
            ps.setString(367, input.IN_A5003SFC18);
            ps.setString(368, input.IN_A5003ISP18);

            ps.setString(369, input.IN_A5003KEY19);
            ps.setString(370, input.IN_A5003LEF19);
            ps.setString(371, input.IN_A5003TCO19);
            ps.setDouble(372, input.IN_A5003TMO19);
            ps.setString(373, input.IN_A5003TCU19);
            ps.setDouble(374, input.IN_A5003SFA19);
            ps.setString(375, input.IN_A5003SFC19);
            ps.setString(376, input.IN_A5003ISP19);

            ps.setString(377, input.IN_A5003KEY20);
            ps.setString(378, input.IN_A5003LEF20);
            ps.setString(379, input.IN_A5003TCO20);
            ps.setDouble(380, input.IN_A5003TMO20);
            ps.setString(381, input.IN_A5003TCU20);
            ps.setDouble(382, input.IN_A5003SFA20);
            ps.setString(383, input.IN_A5003SFC20);
            ps.setString(384, input.IN_A5003ISP20);
            
            ps.setString(385, input.IN_A5003COD1);
            ps.setString(386, input.IN_A5003ISR1);

            ps.setString(387, input.IN_A5003COD2);
            ps.setString(388, input.IN_A5003ISR2);

            ps.setString(389, input.IN_A5003COD3);
            ps.setString(390, input.IN_A5003ISR3);

            ps.setString(391, input.IN_A5003COD4);
            ps.setString(392, input.IN_A5003ISR4);

            ps.setString(393, input.IN_A5003COD5);
            ps.setString(394, input.IN_A5003ISR5);

            ps.setString(395, input.IN_A5003COD6);
            ps.setString(396, input.IN_A5003ISR6);

            ps.setString(397, input.IN_A5003COD7);
            ps.setString(398, input.IN_A5003ISR7);

            ps.setString(399, input.IN_A5003COD8);
            ps.setString(400, input.IN_A5003ISR8);

            ps.setString(401, input.IN_A5003COD9);
            ps.setString(402, input.IN_A5003ISR9);

            ps.setString(403, input.IN_A5003COD10);
            ps.setString(404, input.IN_A5003ISR10);

            ps.setString(405, input.IN_A5003COD11);
            ps.setString(406, input.IN_A5003ISR11);

            ps.setString(407, input.IN_A5003COD12);
            ps.setString(408, input.IN_A5003ISR12);

            ps.setString(409, input.IN_A5003COD13);
            ps.setString(410, input.IN_A5003ISR13);

            ps.setString(411, input.IN_A5003COD14);
            ps.setString(412, input.IN_A5003ISR14);

            ps.setString(413, input.IN_A5003COD15);
            ps.setString(414, input.IN_A5003ISR15);

            ps.setString(415, input.IN_A5003COD16);
            ps.setString(416, input.IN_A5003ISR16);

            ps.setString(417, input.IN_A5003COD17);
            ps.setString(418, input.IN_A5003ISR17);

            ps.setString(419, input.IN_A5003COD18);
            ps.setString(420, input.IN_A5003ISR18);

            ps.setString(421, input.IN_A5003COD19);
            ps.setString(422, input.IN_A5003ISR19);

            ps.setString(423, input.IN_A5003COD20);
            ps.setString(424, input.IN_A5003ISR20);
            
            ps.setString(425, input.USCR);
            ps.setString(426, input.FECR);
            ps.setString(427, input.HOCR);
            ps.setString(428, input.PGMCR);
            ps.setString(429, input.FILENAME);
            ps.setString(430, siguienteSecuencia);
            ps.setString(431, fechaFilename);

            int rows = ps.executeUpdate();
            if (rows > 0) {
                message = "Registro insertado correctamente en A5003.";
            } else {
                message = "No se insertó ningún registro en A5003.";
            }

        } catch (Exception e) {
            message = "Error al insertar en A5003: " + e.getMessage();
        } finally {
            try { if (ps != null) ps.close(); } catch (Exception ignored) {}
            try { if (conn1 != null) conn1.close(); } catch (Exception ignored) {}
        }

        return message;
    }
            
            
            
            
            
            public String insertAndUpdateA2270_A2359(
            int totalLeidos,
            int totalEscritos,
            int totalErrores,
            String fechaSimulada,
            String usuario,
            String hora
    ) {
        Connection conn = null;
        PreparedStatement psInsert = null;
        PreparedStatement psUpdate = null;
        String message = "";
        String horaFinal = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));

        try {
            conn = session.getCNXIBMDB2().getIBMDB2Connection();

            String mensaje = (totalErrores == 0) ? "Carga exitosa" : "Carga con errores";

            
            String sqlInsert = "INSERT INTO PRAXISAV.A2270 (" +
                    "CCUST, STATP, CPROGRAM, PPROGRAM, TENVI, FUENTE, MENSA, " +
                    "QTYREAD, QTYWRITE, QTYDELET, QTYERROR, QTYRECEI, DESCRIP, " +
                    "FECRFILE, USCR, FECR, HOCR, HOFIN" +
                    ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            psInsert = conn.prepareStatement(sqlInsert);
            psInsert.setString(1, "134");
            psInsert.setString(2, ""); // STATP vacío
            psInsert.setString(3, "BSPLINK");
            psInsert.setString(4, ""); // PPROGRAM vacío
            psInsert.setInt(5, 6); // TENVI
            psInsert.setString(6, "INPUT BSP");
            psInsert.setString(7, mensaje);
            psInsert.setInt(8, totalLeidos);
            psInsert.setInt(9, totalEscritos);
            psInsert.setInt(10, 0); // QTYDELET
            psInsert.setInt(11, totalErrores);
            psInsert.setInt(12, totalLeidos);
            psInsert.setString(13, ""); // DESCRIP vacío
            psInsert.setString(14, fechaSimulada);
            psInsert.setString(15, usuario);
            psInsert.setString(16, fechaSimulada);
            psInsert.setString(17, hora);
            psInsert.setString(18, horaFinal); // HOFIN vacío

            int rowsInsert = psInsert.executeUpdate();

            // FLAG dinámico
            String flag = (totalErrores == 0) ? "L" : "E";

            // UPDATE en A2359
            String sqlUpdate = "UPDATE PRAXISAV.A2359 " +
                    "SET TRFSTAT = ?, " +
                    "LOADDATE = ?, " +
                    "USUP = ?, " +
                    "FEUP = ?, " +
                    "HOUP = ? " +
                    "WHERE PROCDATE = ? AND OUTNAME = 'AVE'";

            psUpdate = conn.prepareStatement(sqlUpdate);
            psUpdate.setString(1, flag);
            psUpdate.setString(2, fechaSimulada);
            psUpdate.setString(3, usuario);
            psUpdate.setString(4, fechaSimulada);
            psUpdate.setString(5, hora);
            psUpdate.setString(6, fechaSimulada);

            int rowsUpdate = psUpdate.executeUpdate();

            message = String.format(
                "Carga Terminada - Total leídos: %d, escritos: %d, errores: %d. " +
                "Insertados en A2270: %d, actualizados en A2359: %d",
                totalLeidos, totalEscritos, totalErrores, rowsInsert, rowsUpdate
            );

        } catch (Exception e) {
            message = "Error en insert/update: " + e.getMessage();
        } finally {
            try { if (psInsert != null) psInsert.close(); } catch (Exception ignored) {}
            try { if (psUpdate != null) psUpdate.close(); } catch (Exception ignored) {}
            try { if (conn != null) conn.close(); } catch (Exception ignored) {}
        }

        return message;
    }
            
            
            
            
            public String SQP05572(String fecha) {
        String msg = null;
        try {
              String SQLCLL01 = "{CALL PRAXISAV.SQP05572(?,?)}";
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP05572(?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, "134");
            cs.setString(2, fecha);
            cs.execute();

            try (ResultSet rs = cs.getResultSet()) {
                if (rs != null && rs.next()) {
                    msg = rs.getString("VL_MESSAGE");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            msg = "Error: " + e.getMessage();
        } finally {
            setClose();
        }
        return msg;
    }
    

      
      
      
      
      
      
     

}
