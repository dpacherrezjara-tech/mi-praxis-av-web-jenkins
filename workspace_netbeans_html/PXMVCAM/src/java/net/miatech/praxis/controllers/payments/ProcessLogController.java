package net.miatech.praxis.controllers.payments;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.HashMap;
import java.util.Map;
import net.miatech.praxis.logic.payments.ProcessLogLogic;
import net.miatech.praxis.payment.dto.MPS023Filter;
import net.miatech.praxis.payment.dto.SPPL001Filter;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.praxis.utils.SpringWS;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.PropertyNamingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author dvicente
 */
@Controller
@RequestMapping("/ProcessLog")
@Scope("request")
public class ProcessLogController {
    
    @Autowired
    private ProcessLogLogic logic;
    
    @Autowired
    private SpringWS ws;
    
    @RequestMapping(value = "search")
    public ResponseEntity<?> search(@ModelAttribute SPPL001Filter params) throws Exception{
        System.out.println("***** ProcessLog - search *****");
        SPPL001Filter filter = logic.loadSPPL001Filter(params);
        System.out.println("Total: " + filter.getResponse().size());
        return ResponseUtils.ok(filter);
    }
    
    @RequestMapping(value = "process",method = RequestMethod.POST)
    public ResponseEntity<?> process(@RequestBody MPS023Filter params) throws Exception{
        System.out.println("***** ProcessLog - process *****");

        Gson gson = new Gson();
        Map<String,Object> map = new HashMap();
        
        String body = gson.toJson(params);
        boolean res = ws.postAsync(body, "ProcessLog/process");
        
        map.put("success", res);
        
        return ResponseUtils.ok(map);
    }
}
