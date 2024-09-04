package net.miatech.praxis.controllers.payments;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.logic.payments.InputsPhase2Logic;
import net.miatech.praxis.payment.dto.CalendarPhase2;
import net.miatech.praxis.payment.dto.DeliveryDto;
import net.miatech.praxis.payment.dto.SPIL001Filter;
import net.miatech.praxis.payment.dto.SPIL002Filter;
import net.miatech.praxis.payment.dto.SPIL003Filter;
import net.miatech.praxis.payment.dto.SPIL004Filter;
import net.miatech.praxis.payment.dto.SPIL005Filter;
import net.miatech.praxis.payment.dto.SPIL006Filter;
import net.miatech.praxis.payment.dto.SPIL007Filter;
import net.miatech.praxis.payment.dto.SPMC002Filter;
import net.miatech.praxis.payment.entities.MPF126;
import net.miatech.praxis.utils.ExportUtils;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.utils.CustomExcelCell;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/InputsPhase2")
@Scope("request")
public class InputsPhase2Controller {

    @Autowired
    private InputsPhase2Logic logic;

    @Autowired
    private ExportUtils exportUtils;

    @RequestMapping(value = "loadFilters")
    public ResponseEntity<?> loadFilters() throws Exception {
        System.out.println("***** InputsPhase2 - loadFilters *****");
        SPMC002Filter filter = logic.loadSPMC002Filter();
        System.out.println("Procesadores: " + filter.getProcesadores().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "search")
    public ResponseEntity<?> search(@ModelAttribute SPIL001Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - search *****");
        SPIL001Filter filter = logic.loadSPIL001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "searchCalendar")
    public ResponseEntity<?> searchCalendar(@ModelAttribute SPIL002Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - searchCalendar *****");
        List<CalendarPhase2> filter = logic.loadSPIL002Filter(params);
        System.out.println("Total: " + filter.size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "searchCalendarDateInfo")
    public ResponseEntity<?> searchCalendarDateInfo(@ModelAttribute SPIL007Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - searchCalendarDateInfo *****");
        SPIL007Filter filter = logic.loadSPIL007Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "searchLoaded")
    public ResponseEntity<?> searchLoaded(@ModelAttribute SPIL003Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - searchLoaded *****");
        SPIL003Filter filter = logic.loadSPIL003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "searchExonerated")
    public ResponseEntity<?> searchExonerated(@ModelAttribute SPIL004Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - searchExonerated *****");
        SPIL004Filter filter = logic.loadSPIL004Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "searchFilesReceived")
    public ResponseEntity<?> searchFilesReceived(@ModelAttribute SPIL005Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - searchFilesReceived *****");
        SPIL005Filter filter = logic.loadSPIL005Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    @RequestMapping(value = "searchFileDelivery")
    public ResponseEntity<?> searchFileDelivery(@ModelAttribute SPIL006Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - searchFileDelivery *****");
        SPIL006Filter filter = logic.loadSPIL006Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }

    //<editor-fold defaultstate="collapsed" desc="Descargas Excel">
    @RequestMapping(value = "downloadSearch")
    public ResponseEntity<?> downloadSearch(@ModelAttribute SPIL001Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - downloadSearch *****");
        params.setExcel(true);
        SPIL001Filter filter = logic.loadSPIL001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());

        String title = params.getIN_CCUST() + "-" + params.getIN_PRDAF() + "_" + params.getIN_PRDAT();
        if (!"".equals(params.getIN_CODPRO().trim())) {
            title = title + "-" + filter.getResponse().get(0).getDESC_PRO().trim();
        }
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Load\nDate"));
        header.add(new CustomExcelCell("Source"));
        header.add(new CustomExcelCell("Received"));
        header.add(new CustomExcelCell("Loaded"));
        header.add(new CustomExcelCell("Exonerated"));
        header.add(new CustomExcelCell("Difference"));
        data.add(header);
        filter.getResponse().forEach((MPF126 obj) -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getFECR()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getTLINEA()));
            row.add(new CustomExcelCell(obj.getTTRNDB()));
            row.add(new CustomExcelCell(obj.getTTRNEX()));
            Integer diff = obj.getTLINEA() - (obj.getTTRNDB() + obj.getTTRNEX());
            row.add(new CustomExcelCell(diff));
            data.add(row);
        });
        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadLoaded")
    public ResponseEntity<?> downloadLoaded(@ModelAttribute SPIL003Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - downloadLoaded *****");
        params.setExcel(true);
        SPIL003Filter filter = logic.loadSPIL003Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        String title = params.getIN_CCUST() + "-" + params.getIN_PRDA();
        if (!"".equals(params.getIN_CODPRO().trim())) {
            title = title + "-" + filter.getResponse().get(0).getDESC_PRO().trim();
        }
        title = title + "-Loaded";
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Load\nDate"));
        header.add(new CustomExcelCell("Source"));
        header.add(new CustomExcelCell("Fecha Venta"));
        header.add(new CustomExcelCell("Liquidacion"));
        header.add(new CustomExcelCell("Merchant"));
        header.add(new CustomExcelCell("Nombre Merchant"));
        header.add(new CustomExcelCell("Transaction"));
        header.add(new CustomExcelCell("Card Code"));
        header.add(new CustomExcelCell("Terminal"));
        header.add(new CustomExcelCell("Tarjeta"));
        header.add(new CustomExcelCell("Cod.\nAutorizacion"));
        header.add(new CustomExcelCell("Pais"));
        header.add(new CustomExcelCell("Moneda"));
        header.add(new CustomExcelCell("Importe"));
        header.add(new CustomExcelCell("Comision"));
        header.add(new CustomExcelCell("PNR"));
        header.add(new CustomExcelCell("IATA"));
        header.add(new CustomExcelCell("Ticket"));
        header.add(new CustomExcelCell("Nombre Archivo"));
        data.add(header);
        filter.getResponse().forEach((obj) -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getFECR()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getFECVTA()));
            row.add(new CustomExcelCell(obj.getLIQUIDACIO()));
            row.add(new CustomExcelCell(obj.getMERCHAND()));
            row.add(new CustomExcelCell(obj.getNMERCHAND()));
            row.add(new CustomExcelCell(obj.getTRANSTYPE()));
            row.add(new CustomExcelCell(obj.getSCARCOD()));
            row.add(new CustomExcelCell(obj.getTERMINAL()));
            row.add(new CustomExcelCell(obj.getSCARDN()));
            row.add(new CustomExcelCell(obj.getSAUTHOC()));
            row.add(new CustomExcelCell(obj.getPAIS()));
            row.add(new CustomExcelCell(obj.getMONEDA()));
            row.add(new CustomExcelCell(obj.getIMPORTE()));
            row.add(new CustomExcelCell(obj.getCOMISION()));
            row.add(new CustomExcelCell(obj.getPNR()));
            row.add(new CustomExcelCell(obj.getIATA()));
            row.add(new CustomExcelCell(obj.getTICKET()));
            row.add(new CustomExcelCell(obj.getNARCHIVO()));
            data.add(row);
        });
        return exportUtils.createCustomExcel(data, title);
    }

    @RequestMapping(value = "downloadExonerated")
    public ResponseEntity<?> downloadExonerated(@ModelAttribute SPIL004Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - downloadExonerated *****");
        params.setExcel(true);
        SPIL004Filter filter = logic.loadSPIL004Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        String title = params.getIN_CCUST() + "-" + params.getIN_PRDA();
        if (!"".equals(params.getIN_CODPRO().trim())) {
            title = title + "-" + filter.getResponse().get(0).getDESC_PRO().trim();
        }
        title = title + "-Exonerated";
        List<List<CustomExcelCell>> data = new ArrayList<>();
        List<CustomExcelCell> header = new ArrayList<>();
        header.add(new CustomExcelCell("Client\nCode"));
        header.add(new CustomExcelCell("Processing\nDate"));
        header.add(new CustomExcelCell("Load\nDate"));
        header.add(new CustomExcelCell("Source"));
        header.add(new CustomExcelCell("Fecha Venta"));
        header.add(new CustomExcelCell("Liquidacion"));
        header.add(new CustomExcelCell("Merchant"));
        header.add(new CustomExcelCell("Nombre Merchant"));
        header.add(new CustomExcelCell("Transaction"));
        header.add(new CustomExcelCell("Card Code"));
        header.add(new CustomExcelCell("Terminal"));
        header.add(new CustomExcelCell("Tarjeta"));
        header.add(new CustomExcelCell("Cod.\nAutorizacion"));
        header.add(new CustomExcelCell("Pais"));
        header.add(new CustomExcelCell("Moneda"));
        header.add(new CustomExcelCell("Importe"));
        header.add(new CustomExcelCell("Comision"));
        header.add(new CustomExcelCell("PNR"));
        header.add(new CustomExcelCell("IATA"));
        header.add(new CustomExcelCell("Ticket"));
        header.add(new CustomExcelCell("Nombre Archivo"));
        data.add(header);
        filter.getResponse().forEach((obj) -> {
            List<CustomExcelCell> row = new ArrayList<>();
            row.add(new CustomExcelCell(obj.getCCUST()));
            row.add(new CustomExcelCell(obj.getPRDA()));
            row.add(new CustomExcelCell(obj.getFECR()));
            row.add(new CustomExcelCell(obj.getDESC_PRO()));
            row.add(new CustomExcelCell(obj.getFECVTA()));
            row.add(new CustomExcelCell(obj.getLIQUIDACIO()));
            row.add(new CustomExcelCell(obj.getMERCHAND()));
            row.add(new CustomExcelCell(obj.getNMERCHAND()));
            row.add(new CustomExcelCell(obj.getTRANSTYPE()));
            row.add(new CustomExcelCell(obj.getSCARCOD()));
            row.add(new CustomExcelCell(obj.getTERMINAL()));
            row.add(new CustomExcelCell(obj.getSCARDN()));
            row.add(new CustomExcelCell(obj.getSAUTHOC()));
            row.add(new CustomExcelCell(obj.getPAIS()));
            row.add(new CustomExcelCell(obj.getMONEDA()));
            row.add(new CustomExcelCell(obj.getIMPORTE()));
            row.add(new CustomExcelCell(obj.getCOMISION()));
            row.add(new CustomExcelCell(obj.getPNR()));
            row.add(new CustomExcelCell(obj.getIATA()));
            row.add(new CustomExcelCell(obj.getTICKET()));
            row.add(new CustomExcelCell(obj.getNARCHIVO()));
            data.add(row);
        });
        return exportUtils.createCustomExcel(data, title);
    }
    
    @RequestMapping(value = "downloadFileDelivery")
    public ResponseEntity<?> downloadFileDelivery(@ModelAttribute SPIL006Filter params) throws Exception {
        System.out.println("***** InputsPhase2 - downloadFileDelivery *****");
        params.setExcel(true);
        SPIL006Filter filter = logic.loadSPIL006Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        String registro = filter.getResponse().get(0).getREG().trim();
        String title = params.getIN_CCUST() + "-" + params.getIN_PRDA()+"-"+params.getIN_TYPE()+registro+ "-Delivery";
        List<String> data = filter.getResponse().stream()
                .map(DeliveryDto::getMAXLONG).collect(Collectors.toList());
        return exportUtils.createCsv(data, title);
    }
    //</editor-fold>
}
