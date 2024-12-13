package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.miatech.praxis.logic.payments.ReverseAccountingLogic;

import net.miatech.praxis.payment.dto.SPRAC001Filter;
import net.miatech.praxis.payment.dto.SPRAC002Filter;
import net.miatech.praxis.payment.dto.SPRAC003Filter;
import net.miatech.praxis.utils.ExportUtils;

import net.miatech.praxis.utils.ResponseUtils;

import net.miatech.utils.CustomExcelCell;
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
@RequestMapping("/ReverseAccounting")
@Scope("request")
public class ReverseAccountingController {
    
    @Autowired
    private ReverseAccountingLogic logic;
    
    @Autowired
    private ExportUtils exportUtils;
    
    //<editor-fold defaultstate="collapsed" desc="Reverse Accounting">
    // ready
    @RequestMapping(value = "loadMain")
    public ResponseEntity<?> loadMain(SPRAC001Filter params) throws Exception {
        System.out.println("***** ReverseAccounting - loadMain tst *****");
        SPRAC001Filter filter = logic.loadSPRAC001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    // I dont't review
    @RequestMapping(value = "reverseAccBandoc")
    public ResponseEntity<?> reverseAccBandoc(@RequestBody SPRAC002Filter params) throws Exception {
        System.out.println("***** ReverseAccounting - reverseAccBandoc *****");
        logic.loadSPRAC002Filter(params);
        return ResponseUtils.create();
    }
    
    // ready
    @RequestMapping(value = "loadDetail")
    public ResponseEntity<?> loadDetail(SPRAC003Filter params) throws Exception {
        System.out.println("***** ReverseAccounting - loadBandocs *****");
        SPRAC003Filter filter = logic.loadSPRAC003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Excel">
    @RequestMapping(value = "downloadExcelReverseMainInfo", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelMainGrid(@RequestBody SPRAC001Filter params) throws Exception {
        
        System.out.println("***** ReverseAccounting - downloadExcelReverseMainInfo *****");
        
        params.setExcel(true);
        
        SPRAC001Filter filter = logic.loadSPRAC001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
         String title = "ReverseAccounting - RA_"
                 + params.getIN_CCUST() + "_" 
                 + params.getIN_V_FROM() + "_" 
                 + params.getIN_V_TO() ;
         
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Type"));
        header.add(new CustomExcelCell("Accounting ID"));
        header.add(new CustomExcelCell("Bank Doc"));
        header.add(new CustomExcelCell("Value Date"));
        header.add(new CustomExcelCell("BPO Message"));
        header.add(new CustomExcelCell("Reverse\nOrigin"));
        header.add(new CustomExcelCell("User"));
        header.add(new CustomExcelCell("Datetime"));
        
        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            
            Map<String, String> mapTipoCon = new HashMap<String, String>();
            mapTipoCon.put("REG", "Regular");
            mapTipoCon.put("DEB", "Debit");
            mapTipoCon.put("ADJ", "Adjustment");
            row.add(new CustomExcelCell(mapTipoCon.get(obj.getTIPOCON())));
            
//            switch (obj.getTIPOCON()) {
//                case "REG":
//                    row.add(new CustomExcelCell("Regular"));
//                    break;
//                case "DEB":
//                    row.add(new CustomExcelCell("Debit"));
//                    break;
//                case "ADJ":
//                    row.add(new CustomExcelCell("Adjustment"));
//                    break;
//            }
            row.add(new CustomExcelCell(obj.getIDCONT()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getVALDATE()));
            row.add(new CustomExcelCell(obj.getBPOMSG()));
            
            
            Map<String, String> mapREVORI = new HashMap<String, String>();
            mapREVORI.put("X", "Excel");
            mapREVORI.put("C", "Accounting");
            mapREVORI.put("B", "Bandoc");
            mapREVORI.put("S", "Stand By");
            mapREVORI.put("L", "Stand By Rev");
            
            row.add(new CustomExcelCell(mapREVORI.get(obj.getREVORI())));
                        
            row.add(new CustomExcelCell(obj.getUSRV()));
            row.add(new CustomExcelCell(obj.getTSRV().toString()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);        
    }
    
    @RequestMapping(value = "downloadExcelReverseDeatilInfo", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelDetailGrid(@RequestBody SPRAC003Filter params) throws Exception {
        System.out.println("***** ReverseAccounting - downloadExcelReverseDeatilInfo *****");
        
        params.setExcel(true);
        
        SPRAC003Filter filter = logic.loadSPRAC003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
         String title = "ReverseDetail - RD_"
                 + params.getIN_A4545USER() + "_" 
                 + params.getIN_A4545DOCBA() + "_" 
                 + params.getIN_A4545DATCI() + "_" 
                 + params.getIN_A4545TRACI();
        
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Society"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Bank Doc."));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Record\nType"));
        header.add(new CustomExcelCell("Profit"));
        header.add(new CustomExcelCell("Primary\nKey"));
        
        header.add(new CustomExcelCell("Account"));
        header.add(new CustomExcelCell("Currency"));
        header.add(new CustomExcelCell("Value"));
        header.add(new CustomExcelCell("Balance"));
        header.add(new CustomExcelCell("Item"));
        header.add(new CustomExcelCell("Large Text"));
        header.add(new CustomExcelCell("Reference"));
        header.add(new CustomExcelCell("Bank\nCode"));
        header.add(new CustomExcelCell("Bank Name"));
        header.add(new CustomExcelCell("Country"));
        header.add(new CustomExcelCell("Place"));
        header.add(new CustomExcelCell("Agent"));
        header.add(new CustomExcelCell("Cost Center"));
        header.add(new CustomExcelCell("Key 1"));
        header.add(new CustomExcelCell("Key 2"));
        header.add(new CustomExcelCell("Payment"));
        header.add(new CustomExcelCell("Acc. Number"));
        header.add(new CustomExcelCell("Accounting\nDate"));
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Usuario"));
        header.add(new CustomExcelCell("Registro\nDate"));
        
        
        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getA4545CCUST()));
            row.add(new CustomExcelCell(obj.getA4545COMPC()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getA4545DOCBA()));
            row.add(new CustomExcelCell(obj.getA4545DOCD()));
            row.add(new CustomExcelCell(obj.getA4545HREGI()));
            row.add(new CustomExcelCell(obj.getA4545PROFI()));
            row.add(new CustomExcelCell(obj.getA4545PKEY()));
            row.add(new CustomExcelCell(obj.getA4545CUENT()));
            row.add(new CustomExcelCell(obj.getA4545CUR()));
            row.add(new CustomExcelCell(obj.getA4545ACTIV()));
            row.add(new CustomExcelCell(obj.getA4545PASIV()));
            row.add(new CustomExcelCell(obj.getA4545ITEM()));
            row.add(new CustomExcelCell(obj.getA4545TEXTD()));
            row.add(new CustomExcelCell(obj.getA4545REFD()));
            row.add(new CustomExcelCell(obj.getA4545BANCO()));
            row.add(new CustomExcelCell(obj.getA4545REFB()));
            row.add(new CustomExcelCell(obj.getA4545PAIS()));
            row.add(new CustomExcelCell(obj.getA4545PLACE()));
            row.add(new CustomExcelCell(obj.getA4545AGENT()));
            row.add(new CustomExcelCell(obj.getA4545CCOST()));
            row.add(new CustomExcelCell(obj.getA4545REFK()));
            row.add(new CustomExcelCell(obj.getA4545REFK2()));
            row.add(new CustomExcelCell(obj.getA4545MPAGO()));
            row.add(new CustomExcelCell(obj.getA4545ANUMB()));
            row.add(new CustomExcelCell(obj.getA4545PSTGD()));
            row.add(new CustomExcelCell(obj.getA4545USER()));
            row.add(new CustomExcelCell(obj.getUSCR()));
            row.add(new CustomExcelCell(obj.getTSCR()));
//            
//            row.add(new CustomExcelCell(obj.getHCONT()));
//            row.add(new CustomExcelCell(obj.getTIPOCON()));
//            row.add(new CustomExcelCell(obj.getIDCONT()));
//            row.add(new CustomExcelCell(obj.getTOTRECS()));
//
//            switch (params.getIN_TIPOCON()) {
//                case "REG":
//                    row.add(new CustomExcelCell(obj.getTOTREG()));
//                    break;
//                case "DEB":
//                    row.add(new CustomExcelCell(obj.getTOTDEB()));
//                    break;
//                case "ADJ":
//                    row.add(new CustomExcelCell(obj.getTOTADJ()));
//                    break;
//            }
//
//            row.add(new CustomExcelCell(obj.getPRDAF()));
//            row.add(new CustomExcelCell(obj.getPRDAT()));
//            row.add(new CustomExcelCell(obj.getQTYROWS()));
//            row.add(new CustomExcelCell(obj.getQTYERRS()));
//            row.add(new CustomExcelCell(obj.getFILENAM()));
//            row.add(new CustomExcelCell(obj.getQTYFILE()));
//            row.add(new CustomExcelCell(obj.getSTCONT()));
//            row.add(new CustomExcelCell(obj.getUSCR()));
//            row.add(new CustomExcelCell(obj.getTSCR().toString()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }
    
    
    //</editor-fold>
    
    
}
