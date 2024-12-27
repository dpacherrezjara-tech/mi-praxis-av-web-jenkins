package net.miatech.praxis.controllers.payments;

import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;
import net.miatech.praxis.logic.payments.ProcessLogLogic;
import net.miatech.praxis.payment.dto.MPS023Filter;
import net.miatech.praxis.payment.dto.SPPL001Filter;
import net.miatech.praxis.payment.dto.SPPL002Filter;
import net.miatech.praxis.utils.ResponseUtils;
import net.miatech.praxis.utils.SpringWS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
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

        SPPL002Filter log = SPPL002Filter.builder().VP_CCUST(params.getVP_CCUST()).build();
        log = logic.loadSPPL002Filter(log);
        Map<String,Object> map = new HashMap();
        map.put("code", log.getResponse());
        if(log.getResponse() == 0){
            Gson gson = new Gson();
            String body = gson.toJson(params);
            boolean res = ws.postAsync(body, "ProcessLog/process");
            if(res){
                map.put("msg", "In progress");
                return ResponseUtils.ok(map);
            }else{
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }else{
            map.put("msg", "Another Process Running");
            return ResponseUtils.ok(map);
        }
    }
}
