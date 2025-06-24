package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.EVALBANDOCFilter;
import net.miatech.praxis.payment.dto.SPACR001Filter;
import net.miatech.praxis.payment.dto.SPACR002Filter;
import net.miatech.praxis.payment.dto.SPACR003Filter;
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
import net.miatech.praxis.payment.dto.SPACR018Filter;
import net.miatech.praxis.payment.dto.SPACR019Filter;
import net.miatech.praxis.payment.dto.SPACR021Filter;
import net.miatech.praxis.payment.dto.SPACR024Filter;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.praxis.utils.SpringWS;
import net.miatech.utils.CustomExcelCell;
import net.miatech.utils.Functions;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
public class AccountingReportController{

    @Autowired
    private AccountingReportLogic logic;

    @Autowired
    private ExportUtils exportUtils;

    @Autowired
    private SpringWS ws;

    @Autowired
    private CurrentSession cs;

    //<editor-fold defaultstate="collapsed" desc="Master Process">
    @RequestMapping(value = "loadMain")
    public ResponseEntity<?> loadMain(SPACR002Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadMain *****");
        SPACR002Filter filter = logic.loadSPACR002Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadSettlements")
    public ResponseEntity<?> loadSettlements(SPACR011Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadSettlements *****");
        SPACR011Filter filter = logic.loadSPACR011Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadBandocsSap")
    public ResponseEntity<?> loadBandocsSap(SPACR012Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadBandocsSap *****");
        SPACR012Filter filter = logic.loadSPACR012Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadAccountingInfo")
    public ResponseEntity<?> loadAccountingInfo(SPACR013Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadAccountingInfo *****");
        SPACR013Filter filter = logic.loadSPACR013Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadErrors")
    public ResponseEntity<?> loadErrors(SPACR006Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadErrors *****");
        SPACR006Filter filter = logic.loadSPACR006Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadLogCont")
    public ResponseEntity<?> loadLogCont(SPACR007Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadLogCont *****");
        SPACR007Filter filter = logic.loadSPACR007Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadDownloadFiles")
    public ResponseEntity<?> loadDownloadFiles(SPACR024Filter params) throws Exception {
        System.out.println("***** AccountingMaster - loadDownloadFiles *****");
        SPACR024Filter filter = logic.loadSPACR024Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "downloadAccounting", method = RequestMethod.POST)
    public ResponseEntity<?> downloadAccounting(@RequestBody SPACR021Filter filter) throws Exception {
        System.out.println("***** AccountingMaster - downloadAccounting *****");
        String zipName = "AccountingMaster_" + Functions.getFechaActual() + Functions.getHoraActual();
        Gson gson = new Gson();
        Map<String, Object> map = new HashMap();
        map.put("IN_CCUST", filter.getIN_CCUST());
        map.put("IN_USER", cs.getServerSession().getUserView().getCustomerInfo().USR.trim());
        map.put("IN_IDCONT", filter.getIN_IDCONT().trim());
        byte[] file = ws.getFile(gson.toJson(map), "Accounting/downloadInterfase");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", zipName + ".zip");
        return new ResponseEntity<>(file, headers, HttpStatus.OK);
        
    }

    @RequestMapping(value = "uploadAccounting", method = RequestMethod.POST)
    public ResponseEntity<?> uploadAccounting(@RequestBody SPACR021Filter filter) throws Exception {
        System.out.println("***** AccountingMaster - uploadAccounting *****");
        Gson gson = new Gson();
        Map<String, Object> map = new HashMap();
        map.put("IN_CCUST", filter.getIN_CCUST());
        map.put("IN_USER", cs.getServerSession().getUserView().getCustomerInfo().USR.trim());
        map.put("IN_IDCONT", filter.getIN_IDCONT().trim());
        String body = gson.toJson(map);
        boolean res = ws.postAsync(body, "Accounting/sendInterfaseToSFTP");
        map.put("success", res);
        return ResponseUtils.ok(map);
    }

    @RequestMapping(value = "reverseAccounting", method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody SPACR005Filter params) throws Exception {
        System.out.println("***** AccountingMaster - reverseAccounting *****");
        logic.loadSPACR005Filter(params);
        return ResponseUtils.create();
    }

    @RequestMapping(value = "processAccounting", method = RequestMethod.POST)
    public ResponseEntity<?> processAccounting(@RequestBody SPACR001Filter params) throws Exception {
        System.out.println("***** AccountingMaster - processAccounting *****");
        Map<String, Object> map = new HashMap<>();
        boolean res = ws.postAsync(new Gson().toJson(params), "Accounting/processAccounting");
        map.put("STATUS", res);
        map.put("MSG",res? "Process Running.": "Error on process.");
        return ResponseUtils.ok(map);
    }

    @RequestMapping(value = "reverseSingleBandoc", method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody SPACR008Filter params) throws Exception {
        System.out.println("***** AccountingMaster - reverseSingleBandoc *****");
        logic.loadSPACR008Filter(params);
        return ResponseUtils.create();
    }

    @RequestMapping(value = "reverseMassiveBandoc", method = RequestMethod.POST)
    public ResponseEntity<?> reverseAccounting(@RequestBody List<SPACR008Filter> lst) throws Exception {
        System.out.println("***** AccountingMaster - reverseMassiveBandoc *****");
        List<SPACR008Filter> filtroDuplicados = lst.stream().collect(
                Collectors.toMap(
                        obj -> Arrays.asList(obj.getIN_BANDOC(), obj.getIN_DATECI(), obj.getIN_TRANCI()),
                        Function.identity(),
                        (p1, p2) -> p1))
                .values()
                .stream()
                .collect(Collectors.toList());
        logic.loadSPACR008FilterMasive(filtroDuplicados);
        return ResponseUtils.create();
    }

    @RequestMapping(value = "evaluateBandoc")
    public ResponseEntity<?> evaluateBandoc(EVALBANDOCFilter params) throws Exception {
        System.out.println("***** AccountingMaster - evaluateBandoc *****");
        EVALBANDOCFilter res = logic.loadEVALBANDOCFilter(params);
        return ResponseUtils.ok(res);
    }
    
    @RequestMapping(value = "processProvision",method = RequestMethod.POST)
    public ResponseEntity<?> processProvision(@RequestParam MultipartFile file){
        System.out.println("***** AccountingMaster - processProvision *****");
        Gson gson = new Gson();
        try {
            Map<String, Object> map = new HashMap();
            map.put("USERNAME", cs.getServerSession().getUserView().getCustomerInfo().USR.trim());
            String body = gson.toJson(map);
            String res = ws.postFileAsync(file, body, "Accounting/loadProvision");
            Map formRes = new HashMap();
            formRes.put("success", true);
            formRes.put("data", res);
            return new ResponseEntity(formRes,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Excel">
    @RequestMapping(value = "downloadExcelMain", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelMain(@RequestBody SPACR002Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadExcelMain *****");
        params.setExcel(true);
        SPACR002Filter filter = logic.loadSPACR002Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = "AccountingMasterProcess - TC_"
                + params.getIN_FCONTF() + "_" + params.getIN_FCONTT() + "_" + params.getIN_TIPOCON()
                + "_" + params.getIN_CODPRO();

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Acc. Date"));
        header.add(new CustomExcelCell("Gen. Date"));
        header.add(new CustomExcelCell("Gen. Hour"));
        header.add(new CustomExcelCell("Type"));
        header.add(new CustomExcelCell("ID"));
        header.add(new CustomExcelCell("Bandocs"));
        header.add(new CustomExcelCell("Settl."));
        header.add(new CustomExcelCell("Initial\nDate"));
        header.add(new CustomExcelCell("Final\nDate"));
        header.add(new CustomExcelCell("Pre Acc.\nErrors"));
        header.add(new CustomExcelCell("Post Acc.\nErrors"));
        header.add(new CustomExcelCell("Corrl AV"));
        header.add(new CustomExcelCell("Qty File"));
        header.add(new CustomExcelCell("Status"));
        header.add(new CustomExcelCell("User"));
        header.add(new CustomExcelCell("Datetime"));
        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getFCONT()));
            row.add(new CustomExcelCell(obj.getFSEND()));
            row.add(new CustomExcelCell(obj.getHCONT()));
            row.add(new CustomExcelCell(obj.getTIPOCON()));
            row.add(new CustomExcelCell(obj.getIDCONT()));
            row.add(new CustomExcelCell(obj.getTOTRECS()));

            switch (params.getIN_TIPOCON()) {
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
            row.add(new CustomExcelCell(obj.getQTYFILE()));
            row.add(new CustomExcelCell(obj.getSTCONT()));
            row.add(new CustomExcelCell(obj.getUSCR()));
            row.add(new CustomExcelCell(obj.getTSCR().toString()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadExcelBandocsSAP", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelBandocsSAP(@RequestBody SPACR012Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadBandocsSAP *****");
        params.setExcel(true);
        SPACR012Filter filter = logic.loadSPACR012Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = "AccountingReport-BandocsSAP-"
                + params.getIN_CCUST() + "_" + params.getIN_FCONT() + "-" + params.getIN_IDCONT().trim()
                + "_" + UUID.randomUUID().toString().substring(0, 6);

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Type"));
        header.add(new CustomExcelCell("Sub-Type"));
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Bank Doc"));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Reference"));
        header.add(new CustomExcelCell("Corrl SAP"));
        header.add(new CustomExcelCell("SAP Date"));
        header.add(new CustomExcelCell("SAP Status"));
        header.add(new CustomExcelCell("User\nCreate"));
        header.add(new CustomExcelCell("Datetime\nCreate"));
        header.add(new CustomExcelCell("User\nUpdate"));
        header.add(new CustomExcelCell("Datetime\nUpdate"));

        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getCODPRO()));
            row.add(new CustomExcelCell(obj.getFCONT()));
            row.add(new CustomExcelCell(obj.getTIPOCON()));
            row.add(new CustomExcelCell(obj.getSTCON()));
            row.add(new CustomExcelCell(obj.getIDCONT()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getVALDATE()));
            row.add(new CustomExcelCell(obj.getREFER()));
            row.add(new CustomExcelCell(obj.getHEADER()));
            row.add(new CustomExcelCell(obj.getFECSAP()));
            row.add(new CustomExcelCell(formatStsap(obj.getSTSAP())));
            row.add(new CustomExcelCell(obj.getUSCR()));
            row.add(new CustomExcelCell(obj.getTSCR()));
            row.add(new CustomExcelCell(obj.getUSUP()));
            row.add(new CustomExcelCell(obj.getTSUP()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadExcelBandocsBrowser", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelBandocsBrowser(@RequestBody SPACR014Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadBandocsBrowser *****");
        params.setExcel(true);
        SPACR014Filter filter = logic.loadSPACR014Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = "AccountingReport-"
                + params.getIN_CCUST() + "_" + params.getIN_VALDATEF() + "-" + params.getIN_VALDATET()
                + "_" + UUID.randomUUID().toString().substring(0, 6);

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
        header.add(new CustomExcelCell("Accounting\nSubType"));
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Sap\nDate"));
        header.add(new CustomExcelCell("Sap\nStatus"));
        header.add(new CustomExcelCell("Sap\nCorrl AV"));
        header.add(new CustomExcelCell("Qty\nRejections"));
        data.add(header);
        filter.getResponse().forEach(obj -> {
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
            row.add(new CustomExcelCell(getModoDesc(obj.getSTACC())));
            row.add(new CustomExcelCell(obj.getIDACC()));
            row.add(new CustomExcelCell(obj.getFECSAP()));
            row.add(new CustomExcelCell(formatStsap(obj.getSTSAP())));
            row.add(new CustomExcelCell(obj.getHEADER()));
            row.add(new CustomExcelCell(obj.getQTYREJ()));
            
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadExcelErrors", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelErrors(@RequestBody SPACR006Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadBandocsSAP *****");
        params.setExcel(true);
        SPACR006Filter filter = logic.loadSPACR006Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = "AccountingMasterProcess-Errors-"
                + params.getIN_IDCONT().trim()
                + "_" + UUID.randomUUID().toString().substring(0, 6);

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Bank Doc"));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Reference"));
        header.add(new CustomExcelCell("Date Bank"));
        header.add(new CustomExcelCell("Trans. Bank"));
        header.add(new CustomExcelCell("Error\nCode"));
        header.add(new CustomExcelCell("Error\nDescription"));
        header.add(new CustomExcelCell("Error\nRecords"));
        header.add(new CustomExcelCell("User"));
        header.add(new CustomExcelCell("Datetime"));
        header.add(new CustomExcelCell("Type"));

        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getIDCONT()));
            row.add(new CustomExcelCell(obj.getCODPRO()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getVALDATE()));
            row.add(new CustomExcelCell(obj.getREFER()));
            row.add(new CustomExcelCell(obj.getDATECI()));
            row.add(new CustomExcelCell(obj.getTRANCI()));
            row.add(new CustomExcelCell(obj.getCERROR()));
            row.add(new CustomExcelCell(obj.getDESCERR()));
            row.add(new CustomExcelCell(obj.getQTYERR()));
            row.add(new CustomExcelCell(obj.getUSUP()));
            row.add(new CustomExcelCell(obj.getTSUP()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadExcelSettlements", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelSettlements(@RequestBody SPACR011Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadBandocsSAP *****");
        params.setExcel(true);
        SPACR011Filter filter = logic.loadSPACR011Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = "AccountingMasterProcess-Settlements-"
                + params.getIN_CCUST() + "_" + params.getIN_FCONT() + "-" + params.getIN_IDCONT().trim()
                + "_" + UUID.randomUUID().toString().substring(0, 6);

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Doc\nType"));
        header.add(new CustomExcelCell("Doc\nOrigin"));
        header.add(new CustomExcelCell("Debit\nType"));
        header.add(new CustomExcelCell("Country"));
        header.add(new CustomExcelCell("Merchant"));
        header.add(new CustomExcelCell("Sub-Merchant"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Trans. Nbr"));
        header.add(new CustomExcelCell("Society"));
        header.add(new CustomExcelCell("Bank Code"));
        header.add(new CustomExcelCell("Rule"));
        header.add(new CustomExcelCell("Settlement ID"));
        header.add(new CustomExcelCell("Sale\nDate"));
        header.add(new CustomExcelCell("Payment\nDate"));
        header.add(new CustomExcelCell("Agent"));
        header.add(new CustomExcelCell("Credit Card"));
        header.add(new CustomExcelCell("Auth Code"));
        header.add(new CustomExcelCell("PNR"));
        header.add(new CustomExcelCell("Currency"));
        header.add(new CustomExcelCell("Sale\nAmount"));
        header.add(new CustomExcelCell("Comm."));
        header.add(new CustomExcelCell("Qty. Tkt"));
        header.add(new CustomExcelCell("Sale Reconciled"));
        header.add(new CustomExcelCell("Acc. Number"));
        header.add(new CustomExcelCell("Bank Doc."));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("DATECI"));
        header.add(new CustomExcelCell("TRANCI"));
        header.add(new CustomExcelCell("Qty"));
        header.add(new CustomExcelCell("Sum"));
        header.add(new CustomExcelCell("DATEC"));
        header.add(new CustomExcelCell("TRANC"));
        header.add(new CustomExcelCell("Acc. Status"));
        header.add(new CustomExcelCell("Acc. Date"));
        header.add(new CustomExcelCell("Regular ID"));
        header.add(new CustomExcelCell("Debit Date"));
        header.add(new CustomExcelCell("Debit ID"));
        header.add(new CustomExcelCell("Adjustment Date"));
        header.add(new CustomExcelCell("Adjustment ID"));

        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getTDOC()));
            row.add(new CustomExcelCell(obj.getTDOCORG()));
            row.add(new CustomExcelCell(obj.getDEBTYPE()));
            row.add(new CustomExcelCell(obj.getSCOUNTRY()));
            row.add(new CustomExcelCell(obj.getMERCHNC()));
            row.add(new CustomExcelCell(obj.getSUCMERCH()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getTRAN()));
            row.add(new CustomExcelCell(obj.getSOCIETY()));
            row.add(new CustomExcelCell(obj.getCODEBANK()));
            row.add(new CustomExcelCell(obj.getFREGLA()));
            row.add(new CustomExcelCell(obj.getLIQUIDACIO()));
            row.add(new CustomExcelCell(obj.getSDATE()));
            row.add(new CustomExcelCell(obj.getPAYDATE()));
            row.add(new CustomExcelCell(obj.getSAGENT()));
            row.add(new CustomExcelCell(obj.getSCARDN()));
            row.add(new CustomExcelCell(obj.getSAUTHOC()));
            row.add(new CustomExcelCell(obj.getSPNR()));
            row.add(new CustomExcelCell(obj.getSCURRENCY()));
            row.add(new CustomExcelCell(obj.getSVFOP()));
            row.add(new CustomExcelCell(obj.getCOMISION()));
            row.add(new CustomExcelCell(obj.getQTYTKT()));
            row.add(new CustomExcelCell(obj.getSVFOPC()));
            row.add(new CustomExcelCell(obj.getACCNUMBER()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getVALDATE()));
            row.add(new CustomExcelCell(obj.getDATECI()));
            row.add(new CustomExcelCell(obj.getTRANCI()));
            row.add(new CustomExcelCell(obj.getQTYSALE()));
            row.add(new CustomExcelCell(obj.getQTYSUM()));
            row.add(new CustomExcelCell(obj.getDATEC()));
            row.add(new CustomExcelCell(obj.getTRANC()));
            row.add(new CustomExcelCell(obj.getSTCON()));
            row.add(new CustomExcelCell(obj.getFCONT()));
            row.add(new CustomExcelCell(obj.getIDCONT()));
            row.add(new CustomExcelCell(obj.getFDEBIT()));
            row.add(new CustomExcelCell(obj.getIDCDEB()));
            row.add(new CustomExcelCell(obj.getFAJUST()));
            row.add(new CustomExcelCell(obj.getIDCADJ()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadExcelAccountingInfo", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelAccountingGrid(@RequestBody SPACR013Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadAccountingInfo *****");
        params.setExcel(true);
        SPACR013Filter filter = logic.loadSPACR013Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = "AccountingMasterProcess-AccountingInfo-"
                + params.getIN_IDCONT().trim() + params.getIN_BANDOC()
                + "_" + UUID.randomUUID().toString().substring(0, 6);

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Society"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Bank Doc"));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Reference"));
        header.add(new CustomExcelCell("Record\nType"));
        header.add(new CustomExcelCell("SEQ"));
        header.add(new CustomExcelCell("Item"));
        header.add(new CustomExcelCell("Profit"));
        header.add(new CustomExcelCell("Cost\nCenter"));
        header.add(new CustomExcelCell("Primary Key"));
        header.add(new CustomExcelCell("Account"));
        header.add(new CustomExcelCell("Currency"));
        header.add(new CustomExcelCell("Value"));
        header.add(new CustomExcelCell("Balance"));
        header.add(new CustomExcelCell("Large Text"));
        header.add(new CustomExcelCell("Place"));
        header.add(new CustomExcelCell("Bank\nCode"));
        header.add(new CustomExcelCell("Bank\nName"));
        header.add(new CustomExcelCell("Country"));
        header.add(new CustomExcelCell("Merchant"));
        header.add(new CustomExcelCell("Agent"));
        header.add(new CustomExcelCell("Key 1"));
        header.add(new CustomExcelCell("Key 2"));
        header.add(new CustomExcelCell("Payment"));
        header.add(new CustomExcelCell("Acc. Number"));
        header.add(new CustomExcelCell("Sub-Type"));
        header.add(new CustomExcelCell("A. Date"));
        header.add(new CustomExcelCell("Date Bank"));
        header.add(new CustomExcelCell("Trans. Bank"));
        header.add(new CustomExcelCell("Date Settl"));
        header.add(new CustomExcelCell("Trans. Settl"));
        header.add(new CustomExcelCell("Accounting\nDate"));
        header.add(new CustomExcelCell("Accounting\nID"));

        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();

            row.add(new CustomExcelCell(obj.getA4545CCUST()));
            row.add(new CustomExcelCell(obj.getA4545COMPC()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getA4545DOCBA()));
            row.add(new CustomExcelCell(obj.getA4545DOCD()));
            row.add(new CustomExcelCell(obj.getA4545REFD()));
            row.add(new CustomExcelCell(obj.getA4545HREGI()));
            row.add(new CustomExcelCell(obj.getA4545SEQ()));
            row.add(new CustomExcelCell(obj.getA4545ITEM()));
            row.add(new CustomExcelCell(obj.getA4545PROFI()));
            row.add(new CustomExcelCell(obj.getA4545CCOST()));
            row.add(new CustomExcelCell(obj.getA4545PKEY()));
            row.add(new CustomExcelCell(obj.getA4545CUENT()));
            row.add(new CustomExcelCell(obj.getA4545CUR()));
            row.add(new CustomExcelCell(obj.getA4545ACTIV()));
            row.add(new CustomExcelCell(obj.getA4545PASIV()));
            row.add(new CustomExcelCell(obj.getA4545TEXTD()));
            row.add(new CustomExcelCell(obj.getA4545PLACE()));
            row.add(new CustomExcelCell(obj.getA4545BANCO()));
            row.add(new CustomExcelCell(obj.getA4545REFB()));
            row.add(new CustomExcelCell(obj.getA4545PAIS()));
            row.add(new CustomExcelCell(obj.getA4545MERCH()));
            row.add(new CustomExcelCell(obj.getA4545AGENT()));
            row.add(new CustomExcelCell(obj.getA4545REFK()));
            row.add(new CustomExcelCell(obj.getA4545REFK2()));
            row.add(new CustomExcelCell(obj.getA4545MPAGO()));
            row.add(new CustomExcelCell(obj.getA4545ANUMB()));
            String modo = getModoDesc(obj.getA4545MODO());
            row.add(new CustomExcelCell(modo));
            row.add(new CustomExcelCell(obj.getA4545ADATE()));
            row.add(new CustomExcelCell(obj.getA4545DATCI()));
            row.add(new CustomExcelCell(obj.getA4545TRACI()));
            row.add(new CustomExcelCell(obj.getA4545DATEC()));
            row.add(new CustomExcelCell(obj.getA4545TRANC()));
            row.add(new CustomExcelCell(obj.getA4545PSTGD()));
            row.add(new CustomExcelCell(obj.getA4545USER()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadSummaryDetail", method = RequestMethod.POST)
    public ResponseEntity<?> downloadSummaryDetail(@RequestBody SPACR019Filter params) throws Exception {
        System.out.println("***** AccountingMasterProcess - downloadSummaryDetail *****");
        params.setExcel(true);
        SPACR019Filter filter = logic.loadSPACR019Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = "Accounting Report Summary Detail_"
                + UUID.randomUUID().toString().substring(0, 8);

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client"));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Doc.\nType"));
        header.add(new CustomExcelCell("Bank Doc."));
        header.add(new CustomExcelCell("Country"));
        header.add(new CustomExcelCell("Core"));
        header.add(new CustomExcelCell("Status\nPhase 1"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Payment\nDate"));
        header.add(new CustomExcelCell("Account"));
        header.add(new CustomExcelCell("Profit\nCenter"));
        header.add(new CustomExcelCell("Company"));
        header.add(new CustomExcelCell("Society"));
        header.add(new CustomExcelCell("Commercial"));
        header.add(new CustomExcelCell("Reference"));
        header.add(new CustomExcelCell("Key 1"));
        header.add(new CustomExcelCell("Key 3"));
        header.add(new CustomExcelCell("Large Text"));
        header.add(new CustomExcelCell("Currency"));
        header.add(new CustomExcelCell("Bank\nAmount"));
        header.add(new CustomExcelCell("Reconciled\nAmount"));
        header.add(new CustomExcelCell("Rev\nCurrency"));
        header.add(new CustomExcelCell("Rev\nAmount"));
        header.add(new CustomExcelCell("Qty\nSettl. F1"));
        header.add(new CustomExcelCell("Qty\nSettl. F2"));
        header.add(new CustomExcelCell("Qty\nTax"));
        header.add(new CustomExcelCell("Accounting\nDate"));
        header.add(new CustomExcelCell("Accounting\nType"));
        header.add(new CustomExcelCell("Accounting\nSub-Type"));
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Sap\nDate"));
        header.add(new CustomExcelCell("Sap\nStatus"));
        header.add(new CustomExcelCell("Sap\nCorrl AV"));
        data.add(header);
        filter.getResponse().forEach(obj -> {
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
            row.add(new CustomExcelCell(obj.getTEXTOLAR()));
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
            row.add(new CustomExcelCell(getModoDesc(obj.getSTACC())));
            row.add(new CustomExcelCell(obj.getIDACC()));
            row.add(new CustomExcelCell(obj.getFECSAP()));
            row.add(new CustomExcelCell(formatStsap(obj.getSTSAP())));
            row.add(new CustomExcelCell(obj.getHEADER()));
            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadExcelDownloadFilesInfo", method = RequestMethod.POST)
    public ResponseEntity<?> downloadExcelDownloadFilesInfo(@RequestBody SPACR024Filter params) throws Exception {

        System.out.println("***** AccountingMasterProcess - downloadExcelDownloadFilesInfo *****");

        params.setExcel(true);

        SPACR024Filter filter = logic.loadSPACR024Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = "AccountingMasterProcess - DF_"
                + params.getIN_IDCONT();

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();

        header.add(new CustomExcelCell("Number"));
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Accounting\nPeriod"));
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Date\nGenerate"));
        header.add(new CustomExcelCell("Hour\nGenerate"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Correlative"));
        header.add(new CustomExcelCell("Correlative\nName"));
        header.add(new CustomExcelCell("User\nGenerate"));
        header.add(new CustomExcelCell("File Name"));
        header.add(new CustomExcelCell("User\nProcessor"));
        header.add(new CustomExcelCell("Register\nDate"));

        data.add(header);
        filter.getResponse().forEach(obj -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getRN()));
            row.add(new CustomExcelCell(obj.getIDCONT()));

            row.add(new CustomExcelCell(obj.getFCONT()));
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getFSEND()));
            row.add(new CustomExcelCell(obj.getHSEND()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getCORRL()));
            row.add(new CustomExcelCell(obj.getCORRLAV()));
            row.add(new CustomExcelCell(obj.getUSENV()));
            row.add(new CustomExcelCell(obj.getFILENAM()));
            row.add(new CustomExcelCell(obj.getUSCR()));
            row.add(new CustomExcelCell(obj.getTSCR()));

            data.add(row);
        });

        return exportUtils.createCustomExcel(data, title);
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Accounting Report">
    @RequestMapping(value = "loadBandocsBrowser")
    public ResponseEntity<?> loadBandocsBrowser(SPACR014Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadBandocsBrowser *****");
        SPACR014Filter filter = logic.loadSPACR014Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadSettlBrowser")
    public ResponseEntity<?> loadSettlBrowser(SPACR015Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadSettlBrowser *****");
        SPACR015Filter filter = logic.loadSPACR015Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadTaxesBrowser")
    public ResponseEntity<?> loadTaxesBrowser(SPACR016Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadTaxesBrowser *****");
        SPACR016Filter filter = logic.loadSPACR016Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "loadRejectionsBrowser")
    public ResponseEntity<?> loadRejectionsBrowser(SPACR003Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadRejectionsBrowser *****");
        SPACR003Filter filter = logic.loadSPACR003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadSummaryAccounting")
    public ResponseEntity<?> loadSummaryAccounting(SPACR018Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadSummaryAccounting *****");
        SPACR018Filter filter = logic.loadSPACR018Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "loadSummaryDetail")
    public ResponseEntity<?> loadSummaryDetail(SPACR019Filter params) throws Exception {
        System.out.println("***** AccountingReport - loadSummaryDetail *****");
        SPACR019Filter filter = logic.loadSPACR019Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Data Bindings">
    String getModoDesc(String codModo) {
        String descModo = "";

        switch (codModo) {
            case "P":
            case "E":
                descModo = "PAX";
                break;
            case "A":
            case "G":
                descModo = "CGO";
                break;
            case "C":
                descModo = "COR";
                break;
            case "D":
            case "B":
                descModo = "DEB";
                break;
            case "J":
            case "K":
                descModo = "ADJ";
                break;
            case "M":
                descModo = "ADM";
                break;
            case "T":
                descModo = "GAS";
                break;
            default:
                descModo = "";
        }

        return descModo;
    }

    String formatStval(String stval) {
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

        return res;
    }

    String formatStsap(String stsap) {
        String res = "";
        switch (stsap) {
            case "N":
                res = "Pending Accounting";
                break;
            case "P":
                res = "Pending to Send";
                break;
            case "L":
                res = "Loaded to SAP";
                break;
            case "S":
                res = "Sended to AV";
                break;
        }
        return res;
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="SAP mark and Revert">
    @RequestMapping(value = "uploadBandocsExcel", method = RequestMethod.POST)
    public ResponseEntity<?> uploadBandocsExcel(
            @RequestParam String IN_CCUST,
            @RequestParam String IN_IDCONT,
            @RequestParam String IN_TIPOCON,
            @RequestParam MultipartFile file) throws Exception {
        Map map = new HashMap();
        map.put("IN_CCUST", IN_CCUST);
        map.put("IN_IDCONT", IN_IDCONT);
        map.put("IN_TIPOCON", IN_TIPOCON);
        ObjectMapper mapper = new ObjectMapper();
        String jsonBody = mapper.writeValueAsString(map);
        String res = ws.postFileAsync(file, jsonBody, "Accounting/postAvInformation");
        //List<X3184> response = mapper.readValue(res, new TypeReference<List<X3184>>() {});
        Map<String,Object> body = new HashMap<>();
        body.put("success", true);
        body.put("response", res);
        return ResponseUtils.ok(body);
    }
//</editor-fold>
}
