package net.miatech.praxis.controllers.payments;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR005Filter;
import net.miatech.praxis.payment.dto.SPACR006Filter;
import net.miatech.praxis.payment.dto.SPACR007Filter;
import net.miatech.praxis.payment.dto.SPACR008Filter;
import net.miatech.praxis.payment.dto.SPACR011Filter;
import net.miatech.praxis.payment.dto.SPACR012Filter;
import net.miatech.praxis.payment.dto.SPACR013Filter;
import net.miatech.praxis.payment.entities.A4545;
import net.miatech.praxis.payment.filter.SQP05233Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
    

    @RequestMapping(value = "downloadAccounting",method = RequestMethod.POST)
    public ResponseEntity<?> downloadAccounting(@RequestBody SQP05233Filter filter, HttpServletResponse response) throws Exception {
        System.out.println("***** AccountingReport - downloadAccounting *****");
        
        List<String> fileNames = new ArrayList<>();
        List<String> file = new ArrayList<>();
        List<List<String>> files = new ArrayList<>();
        
        String idCont = filter.getIN_IDCONT().trim();
        String fileName;
        String zipName = "TC_" + idCont ;
        
        String A4545SEQ = "";
        String A4545MODO = "";
        String fileHeader = "SEQUENCE\tHEADER_TXT\tCOMP_CODE\tDOC_DATE\tPSTNG_DATE\tTRANS_DATE\tDOC_TYPE\tREF_DOC_NO\tZZ_AUTH_CODE\tPOSTING_KEY\tITEMNO_ACC\t" +
            "GL_ACCOUNT\tITEM_TEXT\tREF_KEY_1\tREF_KEY_2\tREF_KEY_3\tBUS_AREA\tCOSTCENTER\tPROFIT_CTR\tCUSTOMER\tNAME\tCITY\tCOUNTRY\tCURRENCY\t" +
            "AMT_DOCCUR\tAMT_BASE\tTAX_AMT\tZZ_LEGAL_INV\tZZ_LEGACY_INV\tZZ_ACM_ADM_NO\tPYMT_METH\tWTH_TYPE1\tWTH_CODE1\tWTH_BASE1\tWTH_AMT1\t" +
            "WTH_TYPE2\tWTH_CODE2\tWTH_BASE2\tWTH_AMT2\tWTH_TYPE3\tWTH_CODE3\tWTH_BASE3\tWTH_AMT3\tWTH_TYPE4\tWTH_CODE4\tWTH_BASE4\tWTH_AMT4\t" + 
            "WTH_TYPE5\tWTH_CODE5\tWTH_BASE5\tWTH_AMT5\tWTH_TYPE6\tWTH_CODE6\tWTH_BASE6\tWTH_AMT6\tPAYMT_REF\tALLOC_NMBR\tBUS_PLACE";
        
        try {
        
            filter = logic.loadSQP05233Filter(filter);
            List<A4545> result = filter.getResponse();
            
            file.add(fileHeader);
            
            int k = 0;
            for (int i=0,j=0; i<result.size(); i++,j++) {
                StringBuilder sb = new StringBuilder();
                sb.append(result.get(i).getA4545SEQ()).append("\t") ;                   // SEQUENCE
                sb.append(result.get(i).getA4545HEADE()).append("\t") ;                 // HEADER_TXT
                sb.append(result.get(i).getA4545COMPC()).append("\t") ;                 // COMP_CODE
                sb.append(result.get(i).getA4545DOCD()).append("\t") ;                  // DOC_DATE
                sb.append(result.get(i).getA4545PSTGD()).append("\t") ;                 // PSTNG_DATE
                sb.append(result.get(i).getA4545TRASD()).append("\t") ;                 // TRANS_DATE
                sb.append(result.get(i).getA4545DOCT()).append("\t") ;                  // DOC_TYPE
                sb.append(result.get(i).getA4545REFD()).append("\t") ;                  // REF_DOC_NO
                sb.append("").append("\t") ;                                            // ZZ_AUTH_CODE
                sb.append(result.get(i).getA4545PKEY()).append("\t") ;                  // POSTING_KEY
                sb.append(result.get(i).getA4545ITEM().toString()).append("\t") ;       // ITEMNO_ACC
                sb.append(result.get(i).getA4545CUENT()).append("\t") ;                 // GL_ACCOUNT
                sb.append(result.get(i).getA4545TEXTD()).append("\t") ;                 // ITEM_TEXT
                sb.append(result.get(i).getA4545REFK()).append("\t") ;                  // REF_KEY_1
                sb.append(result.get(i).getA4545REFK2()).append("\t") ;                 // REF_KEY_2
                sb.append(result.get(i).getA4545REFB()).append("\t") ;                  // REF_KEY_3
                sb.append("").append("\t") ;                                            // BUS_AREA
                sb.append(result.get(i).getA4545CCOST()).append("\t") ;                 // COSTCENTER
                sb.append(result.get(i).getA4545PROFI()).append("\t") ;                 // PROFIT_CTR
                sb.append(result.get(i).getA4545CUSTO()).append("\t") ;                 // CUSTOMER
                sb.append("").append("\t") ;                                            // NAME
                sb.append("").append("\t") ;                                            // CITY
                sb.append("").append("\t") ;                                            // COUNTRY
                sb.append(result.get(i).getA4545CUR()).append("\t") ;                   // CURRENCY
                
                if (result.get(i).getA4545CUR().equals("COP")) {
                    Integer AMT_DOCCUR = result.get(i).getA4545ACTIV().intValue();
                    sb.append(AMT_DOCCUR.toString()).append("\t");                      // AMT_DOCCUR
                }
                else 
                    sb.append(result.get(i).getA4545ACTIV().toString()).append("\t");   // AMT_DOCCUR
                
                sb.append("").append("\t") ;                                            // AMT_BASE
                sb.append("").append("\t") ;                                            // TAX_AMT
                sb.append("").append("\t") ;                                            // ZZ_LEGAL_INV
                sb.append("").append("\t") ;                                            // ZZ_LEGACY_INV
                sb.append("").append("\t") ;                                            // ZZ_ACM_ADM_NO
                sb.append(result.get(i).getA4545MPAGO()).append("\t") ;                 // PYMT_METH
                
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
                
                sb.append(result.get(i).getA4545REPAG()).append("\t") ;                 // PAYMT_REF
                sb.append(result.get(i).getA4545ANUMB()).append("\t") ;                 // ALLOC_NMBR
                sb.append(result.get(i).getA4545PLACE()) ;                              // BUS_PLACE
                
                if ( j > 0 &&                                                           // No el primer registro
                    !result.get(i).getA4545SEQ().toString().equals(A4545SEQ) &&         // Debe haber cambiado secuencia
                    (j >= 9000 || !result.get(i).getA4545MODO().equals(A4545MODO))){    // Debe tener mas de 9000 lineas o cambio de modo
                    
                    fileName = idCont + " " + getModoDesc(A4545MODO) + "_" + (k+1);
                    
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
            
            fileName = idCont + " " + getModoDesc(A4545MODO) + "_" + (k+1);
            
            fileNames.add(fileName);
            files.add(file) ;
            
               
        } catch (Exception e) {
            System.out.println("" + e.getMessage());
            throw new SpringException(e);
        }
        
        return exportUtils.createZip(files, fileNames, zipName);
    }
    
    String getModoDesc(String codModo) {
        
        String descModo = "";
        
        switch (codModo) {
            case "P":
               descModo = "Pasaje Colombia";
                break;
            case "A":
                descModo = "Carga Colombia";
                break;
            case "C":
                descModo = "Correo Colombia";
                break;
            case "E":
                descModo = "Pasaje Exterior";
                break;
            case "G":
                descModo = "Carga Exterior";
                break;
            case "D":
                descModo = "Debitos Colombia";
                break;
            case "B":
                descModo = "Debitos Exterior";
                break;
            case "J":
                descModo = "Ajustes Colombia";
                break;
            case "K":
                descModo = "Ajustes Exterior";
                break;
        }
        
        return descModo ;
    }

     @RequestMapping(value = "reverseAccounting",method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody SPACR005Filter params) throws Exception {
        System.out.println("***** AccountingReport - reverseAccounting *****");
        logic.loadSPACR005Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "processAccounting",method = RequestMethod.POST)
    public ResponseEntity<?> processAccounting(@RequestBody SPACR001Filter params) throws Exception {
        System.out.println("***** AccountingReport - processAccounting *****");
        logic.loadSPACR001Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "reverseSingleBandoc",method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody SPACR008Filter params) throws Exception {
        System.out.println("***** AccountingReport - reverseSingleBandoc *****");
        logic.loadSPACR008Filter(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "reverseMassiveBandoc",method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody List<SPACR008Filter> lst) throws Exception {
        System.out.println("***** AccountingReport - reverseMassiveBandoc *****");
        logic.loadSPACR008FilterMasive(lst);
        return ResponseUtils.create();
    }
}
