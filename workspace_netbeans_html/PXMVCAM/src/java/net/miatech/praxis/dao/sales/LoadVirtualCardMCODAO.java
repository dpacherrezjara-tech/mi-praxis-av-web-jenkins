package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import static com.ibm.as400.data.PcmlMessageLog.logError;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.miatech.beans.SaleAudit.SQP01356Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class LoadVirtualCardMCODAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>
    private List<SQP01356Filter> dataExcel = new ArrayList<>(0);

    public LoadVirtualCardMCODAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<SQP01356Filter> getListVirtualCard(SQP01356Filter filter) {
        List<SQP01356Filter> lstRtn = new ArrayList<>(0);
        SQP01356Filter objRtn;
        try {
            strSQL = "{CALL PXCOMM.SQP01356(?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            //cs.registerOutParameter(5, Types.INTEGER);
            //cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            
            cs.setString(1, filter.A2860APLYB);
            cs.setString(2, filter.A2860INDAC);
            cs.setString(3, filter.A2860VCARD);
            cs.setString(4, filter.A2860VCARX);
            
            cs.setInt(5, filter.page.PAGNUM);
            cs.setInt(6, filter.page.PAGROW);
            cs.setInt(7, filter.page.TOTPAG);
            cs.setInt(8, filter.page.TOTROW);
            cs.execute();
            
            filter.page.PAGNUM = cs.getInt(5);
            filter.page.PAGROW = cs.getInt(6);
            filter.page.TOTPAG = cs.getInt(7);
            filter.page.TOTROW = cs.getInt(8);

            rst = cs.getResultSet();

            while (rst.next()) {
                objRtn = new SQP01356Filter();
                objRtn.RN = rst.getInt("RN");
                objRtn.A2860ID = rst.getString("A2860ID");
                objRtn.A2860INDAC = rst.getString("A2860INDAC").trim();
                objRtn.A2860VCARD = rst.getString("A2860VCARD").trim();
                objRtn.A2860VCARX = rst.getString("A2860VCARX").trim();
                objRtn.A2860EFFST = Functions.getMonthConvertDate(rst.getString("A2860EFFST").trim());
                objRtn.A2860EFFEN = Functions.getMonthConvertDate(rst.getString("A2860EFFEN").trim());
                objRtn.A2860APLYU = rst.getString("A2860APLYU").trim();
                objRtn.A2860APLYB = rst.getString("A2860APLYB").trim();
                objRtn.A2860PRODU = rst.getString("A2860PRODU").trim();
                objRtn.A2860COMNM = rst.getString("A2860COMNM").trim();
                objRtn.A2860PIATA = rst.getString("A2860PIATA").trim();
                objRtn.A2860IATS1 = rst.getString("A2860IATS1").trim();
                objRtn.A2860IATS2 = rst.getString("A2860IATS2").trim();
                
                objRtn.A2860IATS3 = rst.getString("A2860IATS3").trim();
                objRtn.A2860IATS4 = rst.getString("A2860IATS4").trim();//Functions.getMonthConvertDate(rst.getString("A1736FREVI"));
                
                objRtn.A2860UINGR = rst.getString("A2860UINGR").trim();
                objRtn.A2860FINGR = Functions.getMonthConvertDate(rst.getString("A2860FINGR").trim());
                objRtn.A2860HINGR = Functions.getMonthConvertDate(rst.getString("A2860HINGR").trim());
                if(filter.A2860APLYB.equals('S')){
                    objRtn.A2860UMODI = Functions.ConvertedTime(rst.getString("A2860UMODI").trim());
                    objRtn.A2860FMODI = Functions.getMonthConvertDate(rst.getString("A2860FMODI").trim());
                    objRtn.A2860HMODI = Functions.ConvertedTime(rst.getString("A2860HMODI").trim());
                }
                objRtn.A2860ERROR = rst.getString("A2860ERROR").trim();
                objRtn.OU_SQLCODE = rst.getString("ERROR");
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            ex.getMessage();
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public List<SQP01356Filter>  setMantenimientoCARDMCO( SQP01356Filter filter ,String VP_ACTION) {
        List<SQP01356Filter> lstRtn = new ArrayList<>(0);
        String SQLCLL01 = "{CALL PXCOMM.SQP01479(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(17, Types.VARCHAR);
            cs.registerOutParameter(18, Types.VARCHAR);
            
            cs.setString(1, VP_ACTION );
            //cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.A2860INDAC );
            cs.setString(3, filter.A2860VCARX );
            cs.setString(4, filter.A2860VCARD);
            cs.setString(5, filter.A2860EFFST);
            cs.setString(6, filter.A2860EFFEN);
            cs.setString(7, filter.A2860APLYU);
            cs.setString(8, filter.A2860APLYB);
            cs.setString(9, filter.A2860PRODU);
            cs.setString(10, filter.A2860COMNM);
            cs.setString(11, session.getUserView().getCustomerInfo().USR);
            cs.setString(12, Functions.getFechaActual());
            cs.setString(13, Functions.getHoraActual());
            cs.setString(14, session.getUserView().getCustomerInfo().USR);
            cs.setString(15, Functions.getFechaActual());
            cs.setString(16, Functions.getHoraActual());
            
            cs.execute();
            filter.OU_SQLCODE = cs.getString(17);
            filter.OU_MESSAGE = cs.getString(18);
            
            SQP01356Filter objRtn;
            objRtn = new SQP01356Filter();
            objRtn.OU_SQLCODE = filter.OU_SQLCODE;
            objRtn.OU_MESSAGE = filter.OU_MESSAGE;
            lstRtn.add(objRtn);
            
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public String setLoadExcel(SQP01356Filter parameter,String strRutaArchivo,String nameFile) throws SQLException, ClassNotFoundException, Exception{
        String hojaExcel=nameFile;
        String mensaje = "";
        if(nameFile.length()>31){
            hojaExcel = nameFile.substring(0, 31);
        }
        try {
//            Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
//            Connection conn = DriverManager.getConnection("jdbc:odbc:Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};Dbq=" + strRutaArchivo + ";");
//            /*Statement stmt = conn.createStatement();
//            ResultSet rs = stmt.executeQuery("select * from [Hoja1$]");*/
//            
//            PreparedStatement s = conn.prepareStatement("SELECT * FROM [Hoja1$]");
//            s.execute();
//            
//            ResultSet rs = s.getResultSet();
            
            HSSFWorkbook workbook;
            ArrayList<String[]> data = new ArrayList<>();
            try (FileInputStream file = new FileInputStream(new File(strRutaArchivo))) {
                workbook = new HSSFWorkbook(file);
                HSSFSheet sheet = workbook.getSheetAt(0);
                Iterator rowIterator = sheet.iterator();
                int cont = 0;
                int numColums = 7;
                while (rowIterator.hasNext()) {
                    HSSFRow row = (HSSFRow) rowIterator.next();
                    cont++;
                    // Iterador de celdas
                    Iterator cellIterator = row.cellIterator();
                    // contador para el array donde guardamos los datos de cada fila
                    int contador = 0;
                    // Array para guardar los datos de cada fila
                    // y añadirlo al ArrayList
                    String[] fila = new String[numColums];
                    // iteramos las celdas de la fila
                    while (cellIterator.hasNext()) {
                        HSSFCell cell = (HSSFCell) cellIterator.next();

                        // Guardamos los datos de la celda segun su tipo
                        switch (cell.getCellType()) {
                            //si es numerico
                            case HSSFCell.CELL_TYPE_NUMERIC:
                                fila[contador] = (int) cell.getNumericCellValue() + "";
                                break;
                            // si es cadena de texto
                            case HSSFCell.CELL_TYPE_STRING:
                                fila[contador] = cell.getStringCellValue() + "";
                                break;
                        }
                        // Si hemos terminado con la ultima celda de la fila
                        if ((contador + 1) % numColums == 0) {
                            // Añadimos la fila al ArrayList con todos los datos
                            data.add(fila);
                        }
//                        // Incrementamos el contador
//                        // con cada fila terminada al redeclarar arriba el contador,
//                        // no obtenemos excepciones de ArrayIndexOfBounds
                        contador++;

                    }
                }
            }
            //workbook.close();
            
            if (data.size() > 0) {
                //SQP01356Filter filterx = new SQP01356Filter();
                setMantenimientoCARDMCO(parameter ,"C");
                setFillData(parameter,data);
                mensaje = "Check data loaded";
                /*if(setFillData(parameter,rs)){    
                    for (SQP01356Filter filter : dataExcel){
                        setMantenimientoCARDMCO(filter ,"M");
                    }
                    mensaje = "Record not found";
                }else{
                    mensaje = "Record not found";
                }*/
            }else{
                mensaje = "Data not found";
            }
            
//            s.close();
//            conn.close();

//        } catch( ClassNotFoundException e) {
//            mensaje = "";
//            logError.error("ClassNotFoundException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e);
        } finally {
            
        }
        return mensaje;
    }
    
    public Boolean setFillData(SQP01356Filter bean,ArrayList<String[]> lst) throws Exception{
        /*************************/
        List<SQP01356Filter> lstRtn = new ArrayList<>(0);
        String SQLCLL01 = "{CALL PXCOMM.SQP01479(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        /*************************/
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(17, Types.VARCHAR);
            cs.registerOutParameter(18, Types.VARCHAR);
        
            int c=0;
            dataExcel.clear();
            String tmp="";
            for (String[] row : lst) {
               c++;
               //if(c >= 2){
                    SQP01356Filter data = new SQP01356Filter();
                    tmp=row[0];
                    if(tmp==null)tmp ="";
                    tmp = String.valueOf(tmp);
                    if(!tmp.equals("")){
                        int i = tmp.length();
                        if(tmp.length()>20){
                            tmp = tmp.trim();
                            data.A2860VCARD=tmp.substring(0, 19);
                            data.A2860VCARX=tmp.substring(0, 19);
                        }else{
                            data.A2860VCARD=tmp;
                            data.A2860VCARX=tmp;
                        }
                        tmp=row[1];
                        if(tmp==null)tmp ="";
                        tmp = String.valueOf(tmp);
                        if(!tmp.equals("")){
                            if(tmp.length()>8){
                                tmp = tmp.trim();
                                data.A2860EFFST= tmp.substring(0, 7);
                            }else{
                                data.A2860EFFST= tmp;
                            }
                        }else{
                            data.A2860EFFST= tmp;
                        }

                        tmp=row[2];
                        if(tmp==null)tmp ="";
                        tmp = String.valueOf(tmp);
                        int x = tmp.length();
                        if(tmp.length()>8){
                            tmp = tmp.trim();
                            data.A2860EFFEN= tmp.substring(0, 7);
                        }else{
                            data.A2860EFFEN= tmp;
                        }

                        tmp=row[3];
                        if(tmp==null)tmp ="";
                        tmp = String.valueOf(tmp);
                        if(tmp.equals(""))tmp ="NO";
                        if(tmp.length()>2){
                            tmp = tmp.trim().replace(" ","");
                            data.A2860APLYU= tmp.substring(0, 1);
                        }else{
                            data.A2860APLYU= tmp;
                        }

                        tmp=row[4];
                        if(tmp==null)tmp ="";
                        tmp = String.valueOf(tmp);
                        if(tmp.equals(""))tmp ="NO";
                        if(tmp.length()>2){
                            tmp = tmp.trim().replace(" ","");
                            data.A2860APLYB= tmp.substring(0, 1);
                        }else{
                            data.A2860APLYB= tmp;
                        }

                        tmp=row[5];
                        if(tmp==null)tmp ="";
                        tmp = String.valueOf(tmp);
                        if(tmp.length()>40){
                            tmp = tmp.trim().replace(" ","");
                            data.A2860PRODU= tmp.substring(0, 39);
                        }else{
                            data.A2860PRODU= tmp;
                        }

                        tmp=row[6];
                        if(tmp==null)tmp ="";
                        tmp = String.valueOf(tmp);
                        if(tmp.length()>150){
                            tmp = tmp.trim().replace(" ","");
                            data.A2860COMNM= tmp.substring(0, 149);
                        }else{
                            data.A2860COMNM= tmp;
                        }
                        //dataExcel.add(data);
                        /**********************/
                        cs.setString(1, "M");
                        cs.setString(2, bean.A2860INDAC );
                        //cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
                        cs.setString(3, data.A2860VCARX );
                        cs.setString(4, data.A2860VCARD);
                        cs.setString(5, data.A2860EFFST);
                        cs.setString(6, data.A2860EFFEN);
                        cs.setString(7, data.A2860APLYU);
                        cs.setString(8, data.A2860APLYB);
                        cs.setString(9, data.A2860PRODU);
                        cs.setString(10, data.A2860COMNM);

                        cs.setString(11, session.getUserView().getCustomerInfo().USR);
                        cs.setString(12, data.A2860FINGR);
                        cs.setString(13, data.A2860HINGR);
                        cs.setString(14, session.getUserView().getCustomerInfo().USR);
                        cs.setString(15, data.A2860FMODI);
                        cs.setString(16, data.A2860HMODI);


                        cs.execute();
                        data.OU_SQLCODE = cs.getString(17);
                        data.OU_MESSAGE = cs.getString(18);

                        SQP01356Filter objRtn;
                        objRtn = new SQP01356Filter();
                        objRtn.OU_SQLCODE = data.OU_SQLCODE;
                        objRtn.OU_MESSAGE = data.OU_MESSAGE;
                        lstRtn.add(objRtn);
                        /**********************/
                    }else{
                        return true;
                    }
               //}
            }
            return true;
        } catch (SQLException ex) {
            setClose();
//            if (cs != null) {                
//                try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
            return false;
        }
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
