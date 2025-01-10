package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.payments.AccountingReportLogic;
import net.miatech.praxis.payment.dto.AccountingInterface;
import net.miatech.praxis.payment.dto.EVALBANDOCFilter;
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
import net.miatech.praxis.payment.dto.SPACR018Filter;
import net.miatech.praxis.payment.dto.SPACR019Filter;
import net.miatech.praxis.payment.dto.SPACR021Filter;
import net.miatech.praxis.payment.dto.SPACR024Filter;
import net.miatech.praxis.payment.dto.SPMC007Filter;
import net.miatech.praxis.payment.entities.A4545;
import net.miatech.praxis.payment.entities.X3184;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.praxis.utils.SpringWS;
import net.miatech.utils.CustomExcelCell;
import net.miatech.utils.Functions;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
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
public class AccountingReportController extends BaseController {

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
        List<AccountingInterface> accountingInterfaces = formatInterfases(filter);
        return exportUtils.createZip(accountingInterfaces, zipName);
    }

    @RequestMapping(value = "uploadAccounting", method = RequestMethod.POST)
    public ResponseEntity<?> uploadAccounting(@RequestBody SPACR021Filter filter) throws Exception {
        System.out.println("***** AccountingMaster - uploadAccounting *****");
        Gson gson = new Gson();
        List<AccountingInterface> lstResponse = formatInterfases(filter);
        Map<String, Object> map = new HashMap();
        map.put("userName", cs.getServerSession().getUserView().getCustomerInfo().USR.trim());
        map.put("idCont", filter.getIN_IDCONT().trim());
        map.put("dto", lstResponse);
        String body = gson.toJson(map);
        boolean res = ws.postAsync(body, "Accounting/sendInterfaseToSFTP");
        map.put("success", res);
        return ResponseUtils.ok(map);
    }

    List<AccountingInterface> formatInterfases(SPACR021Filter filter) throws Exception {
        filter = logic.loadSPACR021Filter(filter);
        String fechaEnvio = Functions.getFechaActual("yyMMdd");
        String horaEnvio = Functions.getHoraActualHHMM().replace(":", "");

        List<AccountingInterface> lst = new ArrayList<>();
        if (filter.getResponse() != null) {
            String corrlAV = filter.getResponse().get(0).getA4545HEADE();
            String fechaContable = filter.getResponse().get(0).getA4545PSTGD().substring(2, 6);
            String fileNameTemp = "TC_" + fechaContable + "_" + fechaEnvio + "_" + horaEnvio;
            String procesador = filter.getIN_CODPRO().trim();
            final String cliente = filter.getIN_CCUST();

            List<A4545> result = filter.getResponse();
            Map<String, List<A4545>> gb = this.groupByModo(result);

            String fileHeader = "SEQUENCE\tHEADER_TXT\tCOMP_CODE\tDOC_DATE\tPSTNG_DATE\tTRANS_DATE\tDOC_TYPE\tREF_DOC_NO\tZZ_AUTH_CODE\tPOSTING_KEY\tITEMNO_ACC\t"
                    + "GL_ACCOUNT\tITEM_TEXT\tREF_KEY_1\tREF_KEY_2\tREF_KEY_3\tBUS_AREA\tCOSTCENTER\tPROFIT_CTR\tCUSTOMER\tNAME\tCITY\tCOUNTRY\tCURRENCY\t"
                    + "AMT_DOCCUR\tAMT_BASE\tTAX_AMT\tZZ_LEGAL_INV\tZZ_LEGACY_INV\tZZ_ACM_ADM_NO\tPYMT_METH\tWTH_TYPE1\tWTH_CODE1\tWTH_BASE1\tWTH_AMT1\t"
                    + "WTH_TYPE2\tWTH_CODE2\tWTH_BASE2\tWTH_AMT2\tWTH_TYPE3\tWTH_CODE3\tWTH_BASE3\tWTH_AMT3\tWTH_TYPE4\tWTH_CODE4\tWTH_BASE4\tWTH_AMT4\t"
                    + "WTH_TYPE5\tWTH_CODE5\tWTH_BASE5\tWTH_AMT5\tWTH_TYPE6\tWTH_CODE6\tWTH_BASE6\tWTH_AMT6\tPAYMT_REF\tALLOC_NMBR\tBUS_PLACE";
            gb.forEach((obj, row) -> {
                String modo = getModoDesc(obj);
                final List<String> interfase = new ArrayList<>();
                interfase.add(fileHeader);

                int[] fileNumber = {0};
                int[] secuencia = {0};
                int[] lineCount = {0};
                row.forEach((data) -> {
                    lineCount[0]++;

                    long countSeq = row.stream()
                            .filter(person -> Objects.equals(person.getA4545SEQ(), data.getA4545SEQ())) // Condición
                            .count();

                    if ((countSeq + lineCount[0]) > 9000 && secuencia[0] != data.getA4545SEQ()) {
                        fileNumber[0]++;
                        AccountingInterface dto = new AccountingInterface();
                        dto.setFechaContable(fechaContable);
                        dto.setFechaEnvio(fechaEnvio);
                        dto.setHoraEnvio(horaEnvio);
                        dto.setCliente(cliente);
                        dto.setProceso(modo);
                        dto.setCodigoProcesador(procesador);
                        dto.setCorrlAV(corrlAV);
                        dto.setFileNumber(fileNumber[0]);
                        String fileName = fileNameTemp + "_" + cliente + "_"
                                + modo + "_" + procesador + "_" + fileNumber[0];
                        dto.setFileName(fileName);
                        List<String> dtoInterfase = new ArrayList<>(interfase);
                        dto.setInterfase(dtoInterfase);
                        lst.add(dto);
                        interfase.clear();
                        interfase.add(fileHeader);
                        lineCount[0] = 0;
                    }

                    StringBuilder sb = new StringBuilder();
                    sb.append(data.getA4545SEQ()).append("\t");                   // SEQUENCE
                    sb.append(data.getA4545HEADE().trim()).append("\t");          // HEADER_TXT
                    sb.append(data.getA4545COMPC().trim()).append("\t");          // COMP_CODE
                    sb.append(data.getA4545DOCD().trim()).append("\t");           // DOC_DATE
                    sb.append(data.getA4545PSTGD().trim()).append("\t");          // PSTNG_DATE
                    sb.append(data.getA4545TRASD().trim()).append("\t");          // TRANS_DATE
                    sb.append(data.getA4545DOCT().trim()).append("\t");           // DOC_TYPE
                    sb.append(data.getA4545REFD().trim()).append("\t");           // REF_DOC_NO
                    sb.append("").append("\t");                                            // ZZ_AUTH_CODE
                    sb.append(data.getA4545PKEY().trim()).append("\t");           // POSTING_KEY
                    sb.append(data.getA4545ITEM()).append("\t");                  // ITEMNO_ACC
                    sb.append(data.getA4545CUENT().trim()).append("\t");          // GL_ACCOUNT
                    sb.append(data.getA4545TEXTD().trim()).append("\t");          // ITEM_TEXT
                    sb.append(data.getA4545REFK().trim()).append("\t");           // REF_KEY_1
                    sb.append(data.getA4545REFK2().trim()).append("\t");          // REF_KEY_2
                    sb.append(data.getA4545REFB().trim()).append("\t");           // REF_KEY_3
                    sb.append("").append("\t");                                            // BUS_AREA
                    sb.append(data.getA4545CCOST().trim()).append("\t");          // COSTCENTER
                    sb.append(data.getA4545PROFI().trim()).append("\t");          // PROFIT_CTR
                    sb.append(data.getA4545CUSTO().trim()).append("\t");          // CUSTOMER
                    sb.append("").append("\t");                                            // NAME
                    sb.append("").append("\t");                                            // CITY
                    sb.append("").append("\t");                                            // COUNTRY
                    sb.append(data.getA4545CUR().trim()).append("\t");            // CURRENCY

                    if (data.getA4545CUR().equals("COP")) {
                        Long AMT_DOCCUR = data.getA4545ACTIV().longValue();
                        sb.append(AMT_DOCCUR).append("\t");                                 // AMT_DOCCUR
                    } else {
                        sb.append(data.getA4545ACTIV()).append("\t");              // AMT_DOCCUR
                    }
                    sb.append("").append("\t");                                            // AMT_BASE
                    sb.append("").append("\t");                                            // TAX_AMT
                    sb.append("").append("\t");                                            // ZZ_LEGAL_INV
                    sb.append("").append("\t");                                            // ZZ_LEGACY_INV
                    sb.append("").append("\t");                                            // ZZ_ACM_ADM_NO
                    sb.append(data.getA4545MPAGO().trim()).append("\t");          // PYMT_METH

                    sb.append("").append("\t");                                            // WTH_TYPE1
                    sb.append("").append("\t");                                            // WTH_CODE1
                    sb.append("").append("\t");                                            // WTH_BASE1
                    sb.append("").append("\t");                                            // WTH_AMT1

                    sb.append("").append("\t");                                            // WTH_TYPE2
                    sb.append("").append("\t");                                            // WTH_CODE2
                    sb.append("").append("\t");                                            // WTH_BASE2
                    sb.append("").append("\t");                                            // WTH_AMT2

                    sb.append("").append("\t");                                            // WTH_TYPE3
                    sb.append("").append("\t");                                            // WTH_CODE3
                    sb.append("").append("\t");                                            // WTH_BASE3
                    sb.append("").append("\t");                                            // WTH_AMT3

                    sb.append("").append("\t");                                            // WTH_TYPE4
                    sb.append("").append("\t");                                            // WTH_CODE4
                    sb.append("").append("\t");                                            // WTH_BASE4
                    sb.append("").append("\t");                                            // WTH_AMT4

                    sb.append("").append("\t");                                            // WTH_TYPE5
                    sb.append("").append("\t");                                            // WTH_CODE5
                    sb.append("").append("\t");                                            // WTH_BASE5
                    sb.append("").append("\t");                                            // WTH_AMT5

                    sb.append("").append("\t");                                            // WTH_TYPE6
                    sb.append("").append("\t");                                            // WTH_CODE6
                    sb.append("").append("\t");                                            // WTH_BASE6
                    sb.append("").append("\t");                                            // WTH_AMT6

                    sb.append(data.getA4545REPAG().trim()).append("\t");          // PAYMT_REF
                    sb.append(data.getA4545ANUMB().trim()).append("\t");          // ALLOC_NMBR
                    sb.append(data.getA4545PLACE().trim());                         // BUS_PLACE

                    interfase.add(sb.toString());

                    secuencia[0] = data.getA4545SEQ();

                });

                if (interfase.size() > 1) {
                    fileNumber[0]++;
                    AccountingInterface dto = new AccountingInterface();
                    dto.setFechaContable(fechaContable);
                    dto.setFechaEnvio(fechaEnvio);
                    dto.setHoraEnvio(horaEnvio);
                    dto.setCliente(cliente);
                    dto.setProceso(modo);
                    dto.setCodigoProcesador(procesador);
                    dto.setCorrlAV(corrlAV);
                    dto.setFileNumber(fileNumber[0]);
                    String fileName = fileNameTemp + "_" + cliente + "_"
                            + modo + "_" + procesador + "_" + fileNumber[0];
                    dto.setFileName(fileName);
                    dto.setInterfase(interfase);
                    lst.add(dto);
                }
            });
        }
        return lst;
    }

    private Map< String, List<A4545>> groupByModo(List<A4545> lst) {
        Map<String, List<A4545>> gb = lst.stream()
                .collect(Collectors.groupingBy(
                        fila -> fila.getA4545MODO() // Extraer el valor de la columna "MODO"
                ));
        return gb;
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
        SPMC007Filter filter = SPMC007Filter.builder()
                .IN_KEY3("CONTABLEAV")
                .IN_CORRL(params.getIN_TIPOCON())
                .build();
        filter = logic.loadSPMC007Filter(filter);
        Map<String, Object> map = new HashMap<>();
        if (filter.getSTAT().equals("X")) {
            map.put("STATUS", false);
            map.put("MSG", "Another process is Running.");
        } else {
            //logic.loadSPACR001Filter(params);
            ws.postAsync(new Gson().toJson(params), "Accounting/processAccounting");
            map.put("STATUS", true);
            map.put("MSG", "Process Running.");
        }
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
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Bank Doc"));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Reference"));
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
            row.add(new CustomExcelCell(obj.getIDCONT()));
            row.add(new CustomExcelCell(obj.getBANDOC()));
            row.add(new CustomExcelCell(obj.getVALDATE()));
            row.add(new CustomExcelCell(obj.getREFER()));
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
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Sap\nDate"));
        header.add(new CustomExcelCell("Sap\nStatus"));
        header.add(new CustomExcelCell("Sap\nCorrl AV"));
        header.add(new CustomExcelCell("Sap\nFile Name"));
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
            row.add(new CustomExcelCell(obj.getIDACC()));
            row.add(new CustomExcelCell(obj.getFECSAP()));
            row.add(new CustomExcelCell(obj.getHEADER()));
            row.add(new CustomExcelCell(obj.getFILENAM()));
            row.add(new CustomExcelCell(formatStsap(obj.getSTSAP())));
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
                + params.getIN_CCUST() + "_" + params.getIN_IDCONT().trim() + params.getIN_BANDOC()
                + "_" + UUID.randomUUID().toString().substring(0, 6);

        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Society"));
        header.add(new CustomExcelCell("Processor"));
        header.add(new CustomExcelCell("Bank Doc"));
        header.add(new CustomExcelCell("Value\nDate"));
        header.add(new CustomExcelCell("Record\nType"));
        header.add(new CustomExcelCell("Profit"));
        header.add(new CustomExcelCell("Primary Key"));
        header.add(new CustomExcelCell("Account"));
        header.add(new CustomExcelCell("Currency"));
        header.add(new CustomExcelCell("Value"));
        header.add(new CustomExcelCell("Balance"));
        header.add(new CustomExcelCell("Item"));
        header.add(new CustomExcelCell("Large Text"));
        header.add(new CustomExcelCell("Reference"));
        header.add(new CustomExcelCell("Bank\nCode"));
        header.add(new CustomExcelCell("Bank\nName"));
        header.add(new CustomExcelCell("Country"));
        header.add(new CustomExcelCell("Place"));
        header.add(new CustomExcelCell("Agent"));
        header.add(new CustomExcelCell("Cost\nCenter"));
        header.add(new CustomExcelCell("Key 1"));
        header.add(new CustomExcelCell("Key 2"));
        header.add(new CustomExcelCell("Payment"));
        header.add(new CustomExcelCell("Acc. Number"));
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
            row.add(new CustomExcelCell(obj.getA4545HREGI()));
            row.add(new CustomExcelCell(obj.getA4545PROFI()));
            row.add(new CustomExcelCell(obj.getA4545PKEY()));
            row.add(new CustomExcelCell(obj.getA4545CUENT()));
            row.add(new CustomExcelCell(obj.getA4545CUR()));
            row.add(new CustomExcelCell(obj.getA4545ACTIV()));
            row.add(new CustomExcelCell(obj.getA4545PASIV()));
            row.add(new CustomExcelCell(obj.getA4545ITEM()));
            row.add(new CustomExcelCell(obj.getA4545TEXTD()));
            row.add(new CustomExcelCell(obj.getA4545REPAG()));
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
        header.add(new CustomExcelCell("Accounting\nID"));
        header.add(new CustomExcelCell("Sap\nDate"));
        header.add(new CustomExcelCell("Sap\nStatus"));
        header.add(new CustomExcelCell("Sap\nCorrl AV"));
        header.add(new CustomExcelCell("Sap\nFile Name"));
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
            row.add(new CustomExcelCell(obj.getIDACC()));
            row.add(new CustomExcelCell(obj.getFECSAP()));
            row.add(new CustomExcelCell(formatStsap(obj.getSTSAP())));
            row.add(new CustomExcelCell(obj.getHEADER()));
            row.add(new CustomExcelCell(obj.getFILENAM()));

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
            case "P":
                res = "Pending";
                break;
            case "L":
                res = "Loaded";
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
        body.put("sucess", true);
        body.put("response", res);
        return ResponseUtils.ok(body);
    }
//</editor-fold>
}
