package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.logic.payments.HeadersReportLogic;
import net.miatech.praxis.payment.dto.AccountingInterface;
import net.miatech.praxis.payment.dto.SPACR021Filter;
import net.miatech.praxis.payment.dto.SPHRP001Filter;
import net.miatech.praxis.payment.dto.SPHRP002Filter;
import net.miatech.praxis.payment.dto.SPHRP003Filter;
import net.miatech.praxis.payment.dto.SPHRP004Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.praxis.utils.SpringWS;
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
@RequestMapping("/HeadersReport")
@Scope("request")
public class HeadersReportController {

    @Autowired
    private HeadersReportLogic logic;
    @Autowired
    private ExportUtils exportUtils;
    
    @Autowired
    private SpringWS ws;
    @Autowired
    private CurrentSession cs;
    
    @Autowired
    private AccountingReportController arc;

    @RequestMapping(value = "loadHeaders")
    public ResponseEntity<?> loadHeaders(SPHRP001Filter params) throws Exception {
        System.out.println("***** HeadersReport - loadHeaders *****");
        SPHRP001Filter filter = logic.loadSPHRP001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadHeaderInfo")
    public ResponseEntity<?> loadHeaderInfo(SPHRP002Filter params) throws Exception {
        System.out.println("***** HeadersReport - loadHeaderInfo *****");
        SPHRP002Filter filter = logic.loadSPHRP002Filter(params);
        System.out.println("Header: " + filter.getIN_IDCONT());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "maintenanceHeader",method = RequestMethod.POST)
    public ResponseEntity<?> maintenanceHeader(@RequestBody SPHRP003Filter params) throws Exception {
        System.out.println("***** HeadersReport - maintenanceHeader *****");
        logic.loadSPHRP003Filter(params);
        
        SPACR021Filter filter = new SPACR021Filter();
        filter.setIN_CCUST(params.getIN_IDCONT().substring(0,3));
        filter.setIN_IDCONT(params.getIN_IDCONT());
        filter.setIN_CODPRO(params.getIN_CODPRO());
        
        Gson gson = new Gson();
        List<AccountingInterface> lstResponse = arc.formatInterfases(filter);
        Map<String, Object> map = new HashMap();
        map.put("userName", cs.getServerSession().getUserView().getCustomerInfo().USR.trim());
        map.put("idCont", params.getIN_IDCONT().trim());
        map.put("dto", lstResponse);
        String body = gson.toJson(map);
        ws.postAsync(body, "Accounting/sendInterfaseToSFTP");
        
        return ResponseUtils.create();
    }
    
    //<editor-fold defaultstate="collapsed" desc="Exceles">
    @RequestMapping(value = "downloadHeaders")
    public ResponseEntity<?> downloadHeaders(SPHRP001Filter params) throws Exception {
        System.out.println("***** HeadersReport - downloadHeaders *****");
        params.setExcel(true);
        SPHRP001Filter filter = logic.loadSPHRP001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
        
        String title = "HeadersReport-"+ UUID.randomUUID().toString().substring(0, 6);

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Type"));
        header.add(new CustomExcelCell("Header ID"));
        header.add(new CustomExcelCell("Period"));
        header.add(new CustomExcelCell("Date"));
        header.add(new CustomExcelCell("Praxis ID"));
        header.add(new CustomExcelCell("Status"));
        header.add(new CustomExcelCell("Qty\nBussiness"));
        header.add(new CustomExcelCell("Qty\nDocuments"));

        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getTIPOCON()));
            row.add(new CustomExcelCell(obj.getHEADER()));
            row.add(new CustomExcelCell(obj.getPERIOD()));
            row.add(new CustomExcelCell(obj.getFCONT()));
            row.add(new CustomExcelCell(obj.getIDCONT()));
            row.add(new CustomExcelCell(formatStsap(obj.getSTSAP())));
            row.add(new CustomExcelCell(obj.getNEGOCIOS()));
            row.add(new CustomExcelCell(obj.getTRNX()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }
    
    @RequestMapping(value = "downloadHeadersReport")
    public ResponseEntity<?> downloadHeadersReport(SPHRP004Filter params) throws Exception {
        System.out.println("***** HeadersReport - downloadHeaders *****");
        SPHRP004Filter filter = logic.loadSPHRP004Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        
        
        String title = "HeadersReport_AV-"+ UUID.randomUUID().toString().substring(0, 6);

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("ACC_TYPE"));
        header.add(new CustomExcelCell("PERIOD"));
        header.add(new CustomExcelCell("POSTING_DATE"));
        header.add(new CustomExcelCell("HEADER"));
        header.add(new CustomExcelCell("GEN_DATE"));
        header.add(new CustomExcelCell("CODE_PROCESSOR"));
        header.add(new CustomExcelCell("FILE_NAME"));

        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getACC_TYPE()));
            row.add(new CustomExcelCell(obj.getPERIOD()));
            row.add(new CustomExcelCell(obj.getPOSTING_DATE()));
            row.add(new CustomExcelCell(obj.getHEADER()));
            row.add(new CustomExcelCell(obj.getGEN_DATE()));
            row.add(new CustomExcelCell(obj.getCODE_PROCESSOR()));
            row.add(new CustomExcelCell(obj.getFILE_NAME()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }
//</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Data Bindings">
    String formatStsap(String stsap){
        String res = "";
        switch (stsap) {
            case "S":
                res = "Sended to AV";
                break;
            case "L":
                res = "Loaded to SAP";
                break;
            default:
                res="";
        }
        return res;
    }
//</editor-fold>
}
