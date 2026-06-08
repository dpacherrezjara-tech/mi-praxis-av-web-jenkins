package net.miatech.praxis.controllers.widgets;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import javax.servlet.http.HttpServletResponse;
import net.miatech.praxis.generics.RecordsFilter;
import net.miatech.praxis.logic.widgets.GenericLogic;
import net.miatech.praxis.payment.dto.CallStoreFilter;
import net.miatech.praxis.payment.dto.CallStorePaggin;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.praxis.utils.SpringWS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/Generic")
@Scope("request")
public class GenericController {

    @Autowired
    private GenericLogic logic;

    @Autowired
    private SpringWS ws;

    @RequestMapping(value = "CallStoreGet", method = RequestMethod.POST)
    public void CallStoreGet(@RequestBody CallStoreFilter params, HttpServletResponse response) throws Exception {
        System.out.println("***** Generic - CallStoreGet *****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());

        response.setContentType("application/json;charset=UTF-8");
        final OutputStreamWriter writer = new OutputStreamWriter(response.getOutputStream(), StandardCharsets.UTF_8);
        final Gson gson = new Gson();
        final AtomicBoolean firstRow = new AtomicBoolean(true);

        logic.callStoreProcedureStream(params,
            outVals -> {
                try {
                    writer.write("{\"lstVals\":");
                    writer.write(gson.toJson(outVals));
                    writer.write(",\"lstRs\":[[");
                    writer.flush();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            },
            row -> {
                try {
                    if (!firstRow.getAndSet(false)) {
                        writer.write(",");
                    }
                    writer.write(gson.toJson(row));
                    writer.flush();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        );
        writer.write("]]}");
        writer.flush();
    }

    @RequestMapping(value = "CallStorePost", method = RequestMethod.POST)
    public ResponseEntity<?> CallStorePost(@RequestBody CallStoreFilter params) throws Exception {
        System.out.println("***** Generic - CallStorePost *****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());
        return ResponseUtils.create(logic.callStoreProcedure(params));
    }

    @RequestMapping(value = "CallStorePostAsync", method = RequestMethod.POST)
    public ResponseEntity<?> CallStorePostAsync(@RequestBody CallStoreFilter params) throws Exception {
        System.out.println("***** Generic - CallStorePostAsync *****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());
        logic.callStoreProcedureAsync(params);
        return ResponseUtils.create();
    }

    @RequestMapping(value = "loadRecordsOnTable/{library}/{table}", method = RequestMethod.POST)
    public ResponseEntity<?> loadRecordsOnTable(
            @PathVariable String library,
            @PathVariable String table,
            @RequestBody List<RecordsFilter> lst) throws Exception {
        System.out.println("***** Generic - loadRecordsOnTable *****");
        System.out.println("Parameters: " + library + "." + table);
        System.out.println("Total Records on load: " + lst.size());
        logic.loadRecordsOnTable(library, table, lst);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "CallStorePaggin/{library}/{procedure}")
    public ResponseEntity<?> CallStorePaggin(
            @PathVariable String library,
            @PathVariable String procedure,
            @RequestParam Map<String, Object> params) throws Exception {
        System.out.println("***** Generic - CallStorePaggin *****");
        CallStorePaggin filter = new CallStorePaggin();
        filter.setLibrary(library);
        filter.setProcedure(procedure);
        filter.setParams(params);

        System.out.println("Parameters: " + library + "." + procedure);
        return new ResponseEntity(logic.callStoreProcedurePaggin(filter), HttpStatus.OK);
    }

    @RequestMapping(value = "CallAPIPost/{service}/{path}", method = RequestMethod.POST)
    public ResponseEntity<?> CallAPIPost(
            @PathVariable String service,
            @PathVariable String path,
            @RequestBody Map<String, Object> params) {
        System.out.println("***** Generic - CallAPIPost *****");
        
        String url = service + "/" + path;
        Gson gson = new Gson();
        String apiParams = gson.toJson(params);
        try {
            ws.postAsync(apiParams, url);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }
}
