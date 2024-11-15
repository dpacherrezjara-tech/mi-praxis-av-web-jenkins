package net.miatech.praxis.controllers.payments;

import com.monitorjbl.xlsx.StreamingReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.ExcelBandocDto;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR005Filter;
import net.miatech.praxis.payment.dto.SPACR006Filter;
import net.miatech.praxis.payment.dto.SPACR007Filter;
import net.miatech.praxis.payment.dto.SPACR008Filter;
import net.miatech.praxis.payment.dto.SPACR011Filter;
import net.miatech.praxis.payment.dto.SPACR012Filter;
import net.miatech.praxis.payment.dto.SPACR013Filter;
import net.miatech.praxis.payment.dto.SPACR014Filter;
import net.miatech.praxis.payment.dto.SPACR015Filter;
import net.miatech.praxis.payment.dto.SPACR016Filter;
import net.miatech.praxis.payment.dto.SPACR017Filter;
import net.miatech.praxis.payment.entities.A4545;
import net.miatech.praxis.payment.filter.SQP05233Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.utils.CustomExcelCell;
import net.miatech.utils.Functions;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/AccountingReport")
@Scope("request")
public class AccountingReportController extends BaseController {
    
    @Autowired
    private AccountingReportLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;
    
    //<editor-fold defaultstate="collapsed" desc="Master Process">
    @RequestMapping(value = "loadMain")
    public ResponseEntity<?> loadMain(SPACR002Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadMain *****");
        SPACR002Filter filter = logic.loadSPACR002Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadSettlements")
    public ResponseEntity<?> loadSettlements(SPACR011Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadSettlements *****");
        SPACR011Filter filter = logic.loadSPACR011Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadBandocsSap")
    public ResponseEntity<?> loadBandocsSap(SPACR012Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadBandocsSap *****");
        SPACR012Filter filter = logic.loadSPACR012Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadAccountingInfo")
    public ResponseEntity<?> loadAccountingInfo(SPACR013Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadAccountingInfo *****");
        SPACR013Filter filter = logic.loadSPACR013Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadErrors")
    public ResponseEntity<?> loadErrors(SPACR006Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadErrors *****");
        SPACR006Filter filter = logic.loadSPACR006Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadLogCont")
    public ResponseEntity<?> loadLogCont(SPACR007Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadLogCont *****");
        SPACR007Filter filter = logic.loadSPACR007Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "downloadAccounting", method = RequestMethod.POST)
    public ResponseEntity<?> downloadAccounting(@RequestBody SQP05233Filter filter, HttpServletResponse response) throws Exception {
        System.out.println("***** AccountingReport - downloadAccounting *****");
        
        List<String> fileNames = new ArrayList<>();
        List<String> file = new ArrayList<>();
        List<List<String>> files = new ArrayList<>();
        
        String fileNameTemp = "CARGUE_TC_" + filter.getIN_FCONT() + "_" + filter.getIN_CCUST()+ "_";
        String fileName;
        //String zipName = "TC_" + idCont ;
        String zipName = "";
        
        String A4545SEQ = "";
        String CODPRO = filter.getIN_CODPRO().trim();
        String A4545MODO = "";
        String fileHeader = "SEQUENCE\tHEADER_TXT\tCOMP_CODE\tDOC_DATE\tPSTNG_DATE\tTRANS_DATE\tDOC_TYPE\tREF_DOC_NO\tZZ_AUTH_CODE\tPOSTING_KEY\tITEMNO_ACC\t" +
            "GL_ACCOUNT\tITEM_TEXT\tREF_KEY_1\tREF_KEY_2\tREF_KEY_3\tBUS_AREA\tCOSTCENTER\tPROFIT_CTR\tCUSTOMER\tNAME\tCITY\tCOUNTRY\tCURRENCY\t" +
            "AMT_DOCCUR\tAMT_BASE\tTAX_AMT\tZZ_LEGAL_INV\tZZ_LEGACY_INV\tZZ_ACM_ADM_NO\tPYMT_METH\tWTH_TYPE1\tWTH_CODE1\tWTH_BASE1\tWTH_AMT1\t" +
            "WTH_TYPE2\tWTH_CODE2\tWTH_BASE2\tWTH_AMT2\tWTH_TYPE3\tWTH_CODE3\tWTH_BASE3\tWTH_AMT3\tWTH_TYPE4\tWTH_CODE4\tWTH_BASE4\tWTH_AMT4\t" + 
            "WTH_TYPE5\tWTH_CODE5\tWTH_BASE5\tWTH_AMT5\tWTH_TYPE6\tWTH_CODE6\tWTH_BASE6\tWTH_AMT6\tPAYMT_REF\tALLOC_NMBR\tBUS_PLACE";
        
        try {
        
            filter = logic.loadSQP05233Filter(filter);
            List<A4545> result = filter.getResponse();
            zipName = filter.OU_FILENAM.trim();
            
            file.add(fileHeader);
            
            int k = 0;
            for (int i=0,j=0; i<result.size(); i++,j++) {
                StringBuilder sb = new StringBuilder();
                sb.append(result.get(i).getA4545SEQ()).append("\t") ;                   // SEQUENCE
                sb.append(result.get(i).getA4545HEADE().trim()).append("\t") ;          // HEADER_TXT
                sb.append(result.get(i).getA4545COMPC().trim()).append("\t") ;          // COMP_CODE
                sb.append(result.get(i).getA4545DOCD().trim()).append("\t") ;           // DOC_DATE
                sb.append(result.get(i).getA4545PSTGD().trim()).append("\t") ;          // PSTNG_DATE
                sb.append(result.get(i).getA4545TRASD().trim()).append("\t") ;          // TRANS_DATE
                sb.append(result.get(i).getA4545DOCT().trim()).append("\t") ;           // DOC_TYPE
                sb.append(result.get(i).getA4545REFD().trim()).append("\t") ;           // REF_DOC_NO
                sb.append("").append("\t") ;                                            // ZZ_AUTH_CODE
                sb.append(result.get(i).getA4545PKEY().trim()).append("\t") ;           // POSTING_KEY
                sb.append(result.get(i).getA4545ITEM()).append("\t") ;                  // ITEMNO_ACC
                sb.append(result.get(i).getA4545CUENT().trim()).append("\t") ;          // GL_ACCOUNT
                sb.append(result.get(i).getA4545TEXTD().trim()).append("\t") ;          // ITEM_TEXT
                sb.append(result.get(i).getA4545REFK().trim()).append("\t") ;           // REF_KEY_1
                sb.append(result.get(i).getA4545REFK2().trim()).append("\t") ;          // REF_KEY_2
                sb.append(result.get(i).getA4545REFB().trim()).append("\t") ;           // REF_KEY_3
                sb.append("").append("\t") ;                                            // BUS_AREA
                sb.append(result.get(i).getA4545CCOST().trim()).append("\t") ;          // COSTCENTER
                sb.append(result.get(i).getA4545PROFI().trim()).append("\t") ;          // PROFIT_CTR
                sb.append(result.get(i).getA4545CUSTO().trim()).append("\t") ;          // CUSTOMER
                sb.append("").append("\t") ;                                            // NAME
                sb.append("").append("\t") ;                                            // CITY
                sb.append("").append("\t") ;                                            // COUNTRY
                sb.append(result.get(i).getA4545CUR().trim()).append("\t") ;            // CURRENCY
                
                if (result.get(i).getA4545CUR().equals("COP")) {
                    Long AMT_DOCCUR = result.get(i).getA4545ACTIV().longValue();
                    sb.append(AMT_DOCCUR).append("\t");                                 // AMT_DOCCUR
                }
                else 
                    sb.append(result.get(i).getA4545ACTIV()).append("\t");              // AMT_DOCCUR
                
                sb.append("").append("\t") ;                                            // AMT_BASE
                sb.append("").append("\t") ;                                            // TAX_AMT
                sb.append("").append("\t") ;                                            // ZZ_LEGAL_INV
                sb.append("").append("\t") ;                                            // ZZ_LEGACY_INV
                sb.append("").append("\t") ;                                            // ZZ_ACM_ADM_NO
                sb.append(result.get(i).getA4545MPAGO().trim()).append("\t") ;          // PYMT_METH
                
                sb.append("").append("\t") ;                                            // WTH_TYPE1
                sb.append("").append("\t") ;                                            // WTH_CODE1
                sb.append("").append("\t") ;                                            // WTH_BASE1
                sb.append("").append("\t") ;                                            // WTH_AMT1
                
                sb.append("").append("\t") ;                                            // WTH_TYPE2
                sb.append("").append("\t") ;                                            // WTH_CODE2
                sb.append("").append("\t") ;                                            // WTH_BASE2
                sb.append("").append("\t") ;                                            // WTH_AMT2
                
                sb.append("").append("\t") ;                                            // WTH_TYPE3
                sb.append("").append("\t") ;                                            // WTH_CODE3
                sb.append("").append("\t") ;                                            // WTH_BASE3
                sb.append("").append("\t") ;                                            // WTH_AMT3
                
                sb.append("").append("\t") ;                                            // WTH_TYPE4
                sb.append("").append("\t") ;                                            // WTH_CODE4
                sb.append("").append("\t") ;                                            // WTH_BASE4
                sb.append("").append("\t") ;                                            // WTH_AMT4
                
                sb.append("").append("\t") ;                                            // WTH_TYPE5
                sb.append("").append("\t") ;                                            // WTH_CODE5
                sb.append("").append("\t") ;                                            // WTH_BASE5
                sb.append("").append("\t") ;                                            // WTH_AMT5
                
                sb.append("").append("\t") ;                                            // WTH_TYPE6
                sb.append("").append("\t") ;                                            // WTH_CODE6
                sb.append("").append("\t") ;                                            // WTH_BASE6
                sb.append("").append("\t") ;                                            // WTH_AMT6
                
                sb.append(result.get(i).getA4545REPAG().trim()).append("\t") ;          // PAYMT_REF
                sb.append(result.get(i).getA4545ANUMB().trim()).append("\t") ;          // ALLOC_NMBR
                sb.append(result.get(i).getA4545PLACE().trim()) ;                       // BUS_PLACE
                
                if ( j > 0 &&                                                           // No el primer registro
                    !result.get(i).getA4545SEQ().toString().equals(A4545SEQ) &&         // Debe haber cambiado secuencia
                    (j >= 9000 || !result.get(i).getA4545MODO().equals(A4545MODO))){    // Debe tener mas de 9000 lineas o cambio de modo
                    
                    fileName = fileNameTemp + getModoDesc(A4545MODO) + "_" + CODPRO + "_" + (k+1);
                    
                    fileNames.add( fileName );                   
                    files.add(file) ;
                    
                    file = new ArrayList<>();
                    file.add(fileHeader);
                    
                    j = 0;
                    k = !result.get(i).getA4545MODO().equals(A4545MODO)? 0 : (k+1);
                }
                
                file.add(sb.toString());
                
                A4545SEQ = result.get(i).getA4545SEQ().toString();
                A4545MODO = result.get(i).getA4545MODO();
            }
            
            //fileName = idCont + " " + getModoDesc(A4545MODO) + "_" + (k+1);
            fileName = fileNameTemp + getModoDesc(A4545MODO) + "_" + CODPRO + "_" + (k+1);
            
            fileNames.add(fileName);
            files.add(file) ;
            
               
        } catch (Exception e) {
            System.out.println("" + e.getMessage());
            throw new SpringException(e);
        }
        
        return exportUtils.createZip(files, fileNames, zipName);
    }

     @RequestMapping(value = "reverseAccounting", method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody SPACR005Filter params) throws Exception {
        System.out.println("***** AccountingReport - reverseAccounting *****");
        logic.loadSPACR005Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "processAccounting", method = RequestMethod.POST)
    public ResponseEntity<?> processAccounting(@RequestBody SPACR001Filter params) throws Exception {
        System.out.println("***** AccountingReport - processAccounting *****");
        logic.loadSPACR001Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "reverseSingleBandoc", method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody SPACR008Filter params) throws Exception {
        System.out.println("***** AccountingReport - reverseSingleBandoc *****");
        logic.loadSPACR008Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "reverseMassiveBandoc", method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody List<SPACR008Filter> lst) throws Exception {
        System.out.println("***** AccountingReport - reverseMassiveBandoc *****");
        logic.loadSPACR008FilterMasive(lst);
        return ResponseUtils.create();
    }
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Exceles">
    @RequestMapping(value = "downloadExcelMain", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelMain(@RequestBody SPACR002Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadExcelMain *****");
        params.setExcel(true);
        SPACR002Filter filter = logic.loadSPACR002Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
        
        String title = "AccountingMasterProcess - TC_" 
            + params.getIN_FCONTF()+ "_" + params.getIN_FCONTT() + "_" + params.getIN_TIPOCON()
            + "_" + params.getIN_CODPRO();
        
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Date"));
        header.add(new CustomExcelCell("Hour"));
        header.add(new CustomExcelCell("Type"));
        header.add(new CustomExcelCell("ID"));
        header.add(new CustomExcelCell("Bandocs"));
        header.add(new CustomExcelCell("Settl."));
        header.add(new CustomExcelCell("Initial\nDate"));
        header.add(new CustomExcelCell("Final\nDate"));
        header.add(new CustomExcelCell("Pre Acc.\nErrors"));
        header.add(new CustomExcelCell("Post Acc.\nErrors"));
        header.add(new CustomExcelCell("File Name"));
        header.add(new CustomExcelCell("Status"));
        header.add(new CustomExcelCell("User"));
        header.add(new CustomExcelCell("Datetime"));
        data.add(header);
        filter.getResponse().forEach(obj->{
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getFCONT()));
            row.add(new CustomExcelCell(obj.getHCONT()));
            row.add(new CustomExcelCell(obj.getTIPOCON()));
            row.add(new CustomExcelCell(obj.getIDCONT()));
            row.add(new CustomExcelCell(obj.getTOTRECS()));
            
            switch(params.getIN_TIPOCON()){
                case "REG":
                    row.add(new CustomExcelCell(obj.getTOTREG()));
                    break;
                case "DEB":
                    row.add(new CustomExcelCell(obj.getTOTDEB()));
                    break;
                case "ADJ":
                    row.add(new CustomExcelCell(obj.getTOTADJ()));
                    break;
            }
            
            row.add(new CustomExcelCell(obj.getPRDAF()));
            row.add(new CustomExcelCell(obj.getPRDAT()));
            row.add(new CustomExcelCell(obj.getQTYROWS()));
            row.add(new CustomExcelCell(obj.getQTYERRS()));
            row.add(new CustomExcelCell(obj.getFILENAM()));
            row.add(new CustomExcelCell(obj.getSTCONT()));
            row.add(new CustomExcelCell(obj.getUSCR()));
            row.add(new CustomExcelCell(obj.getTSCR().toString()));
            data.add(row);
        });
        
        return exportUtils.createCustomExcel(data, title);
    }
    
    @RequestMapping(value = "downloadBandocsBrowser", method = RequestMethod.POST)
    public ResponseEntity<?> downloadBandocsBrowser(@RequestBody SPACR014Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadBandocsBrowser *****");
        params.setExcel(true);
        SPACR014Filter filter = logic.loadSPACR014Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
        
        String title = "AccountingReport-" 
            + params.getIN_CCUST()+ "_" + params.getIN_VALDATEF()+ "-" + params.getIN_VALDATET()
            + "_" + UUID.randomUUID().toString().substring(0,6);
        
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Doc. Type"));
        header.add(new CustomExcelCell("Bank Doc"));
        header.add(new CustomExcelCell("Country"));
        header.add(new CustomExcelCell("Core"));
        header.add(new CustomExcelCell("Status\nPhase 1"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Payment\nDate"));
        header.add(new CustomExcelCell("Account"));
        header.add(new CustomExcelCell("Profit"));
        header.add(new CustomExcelCell("Company"));
        header.add(new CustomExcelCell("Society"));
        header.add(new CustomExcelCell("Commercial"));
        header.add(new CustomExcelCell("Reference"));
        header.add(new CustomExcelCell("Key 1"));
        header.add(new CustomExcelCell("Key 3"));
        header.add(new CustomExcelCell("Text"));
        header.add(new CustomExcelCell("Currency"));
        header.add(new CustomExcelCell("Bank Amount"));
        header.add(new CustomExcelCell("Reconciled\nAmount"));
        header.add(new CustomExcelCell("Rev\nCurrency"));
        header.add(new CustomExcelCell("Rev\nAmount"));
        header.add(new CustomExcelCell("Qty\nSettl. F1"));
        header.add(new CustomExcelCell("Qty\nSettl. F2"));
        header.add(new CustomExcelCell("Qty\nTax"));
        header.add(new CustomExcelCell("Accounting\nDate"));
        header.add(new CustomExcelCell("Accounting\nType"));
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("SAP Date"));
        header.add(new CustomExcelCell("SAP Status"));
        data.add(header);
        filter.getResponse().forEach(obj->{
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getVALDATE()));
            row.add(new CustomExcelCell(obj.getTDOC()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getSCOUNTRY()));
            row.add(new CustomExcelCell(obj.getCOREP()));
            row.add(new CustomExcelCell(formatStval(obj.getSTVAL())));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getADATE()));
            row.add(new CustomExcelCell(obj.getACCOUNT()));
            row.add(new CustomExcelCell(obj.getBENCENC()));
            row.add(new CustomExcelCell(obj.getACCCOMP()));
            row.add(new CustomExcelCell(obj.getSOCIETY()));
            row.add(new CustomExcelCell(obj.getCIACOME()));
            row.add(new CustomExcelCell(obj.getREFER()));
            row.add(new CustomExcelCell(obj.getCLAVE1()));
            row.add(new CustomExcelCell(obj.getCLAVE3()));
            row.add(new CustomExcelCell(obj.getTEXTO()));
            row.add(new CustomExcelCell(obj.getSCURRENCY()));
            row.add(new CustomExcelCell(obj.getNETO()));
            row.add(new CustomExcelCell(obj.getNETOC()));
            row.add(new CustomExcelCell(obj.getLOCRENCY2()));
            row.add(new CustomExcelCell(obj.getLOCAMOUNT2()));
            row.add(new CustomExcelCell(obj.getQTYLIQ1()));
            row.add(new CustomExcelCell(obj.getQTYLIQ2()));
            row.add(new CustomExcelCell(obj.getQTYGAS()));
            row.add(new CustomExcelCell(obj.getFECACC()));
            row.add(new CustomExcelCell(obj.getTIPOCON()));
            row.add(new CustomExcelCell(obj.getIDACC()));
            row.add(new CustomExcelCell(obj.getFECSAP()));
            row.add(new CustomExcelCell(formatStsap(obj.getSTSAP())));
            data.add(row);
        });
        
        return exportUtils.createCustomExcel(data, title);
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Accounting Report">
    @RequestMapping(value = "loadBandocsBrowser")
    public ResponseEntity<?> loadBandocsBrowser(SPACR014Filter params) throws Exception{
        System.out.println("***** AccountingReport - loadBandocsBrowser *****");
        SPACR014Filter filter = logic.loadSPACR014Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadSettlBrowser")
    public ResponseEntity<?> loadSettlBrowser(SPACR015Filter params) throws Exception{
        System.out.println("***** AccountingReport - loadSettlBrowser *****");
        SPACR015Filter filter = logic.loadSPACR015Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadTaxesBrowser")
    public ResponseEntity<?> loadTaxesBrowser(SPACR016Filter params) throws Exception{
        System.out.println("***** AccountingReport - loadTaxesBrowser *****");
        SPACR016Filter filter = logic.loadSPACR016Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
//</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Data Bindings">
    String getModoDesc(String codModo) {
        
        String descModo = "";
        
        switch (codModo) {
            case "P":
               descModo = "Pasaje_Colombia";
                break;
            case "A":
                descModo = "Carga_Colombia";
                break;
            case "C":
                descModo = "Correo_Colombia";
                break;
            case "E":
                descModo = "Pasaje_Exterior";
                break;
            case "G":
                descModo = "Carga_Exterior";
                break;
            case "D":
                descModo = "Debitos_Colombia";
                break;
            case "B":
                descModo = "Debitos_Exterior";
                break;
            case "J":
                descModo = "Ajustes_Colombia";
                break;
            case "K":
                descModo = "Ajustes_Exterior";
                break;
        }
        
        return descModo ;
    }
    
    String formatStval(String stval){
        String res = "";
        switch (stval) {
            case "1":
               res = "Match";
                break;
            case "3":
                res = "Bank w/o Settl.";
                break;
            case "4":
                res = "Match Diff.";
                break;
            case "5":
                res = "Match Manual";
                break;
        }
        
        return res ;
    }
    
    String formatStsap(String stsap){
        String res = "";
        switch (stsap) {
            case "P":
               res = "Pending";
                break;
            case "L":
                res = "Loaded";
                break;
        }
        return res ;
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="SAP mark and Revert">
    @RequestMapping(value = "uploadBandocsExcel",method = RequestMethod.POST)
    public ResponseEntity<?> uploadBandocsExcel(
            @RequestParam String IN_CCUST,
            @RequestParam String IN_IDCONT,
            @RequestParam MultipartFile file) throws Exception{
        
        String filename = "BandocExcel" + UUID.randomUUID().toString();
        String proceso = UUID.randomUUID().toString().replace("-", "");
        String fechap = Functions.getFechaActual();
        
        SPACR017Filter params = SPACR017Filter.builder()
                .IN_CCUST(IN_CCUST)
                .IN_IDCONT(IN_IDCONT)
                .IN_CUUID(proceso)
                .IN_FUUID(fechap)
                .build();
        File tempFile = File.createTempFile(filename, ".xlsx");
        file.transferTo(tempFile);
        List<ExcelBandocDto> revertList = new ArrayList<>();
        try (InputStream is = new FileInputStream(tempFile);
             Workbook workbook = StreamingReader.builder()
                     .rowCacheSize(100) // Número de filas en el caché
                     .bufferSize(4096)  // Tamaño del buffer
                     .open(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            
            sheet.forEach(x ->{
                if (x.getRowNum() != 0) {
                    ExcelBandocDto dto = ExcelBandocDto.builder()
                            .BANDOC(x.getCell(0)!=null?x.getCell(0).getStringCellValue():null)
                            .VALDATE(x.getCell(1)!=null?x.getCell(1).getStringCellValue():null)
                            .REFER(x.getCell(2)!=null?x.getCell(2).getStringCellValue():null)
                            .CUUID(proceso)
                            .FUUID(fechap)
                            .build();
                    System.out.println(dto);
                    revertList.add(dto);
                }
            });
        } catch (Exception e) {
            System.out.println("Error excel: " + e.getMessage());
        }
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("data", params);
        return ResponseUtils.ok(map);
    }
//</editor-fold>
}
