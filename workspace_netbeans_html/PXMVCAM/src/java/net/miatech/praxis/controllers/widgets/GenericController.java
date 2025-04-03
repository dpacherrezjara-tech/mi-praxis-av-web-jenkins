package net.miatech.praxis.controllers.widgets;

import java.util.Map;
import net.miatech.praxis.logic.widgets.GenericLogic;
import net.miatech.praxis.payment.dto.CallStoreFilter;
import net.miatech.praxis.payment.dto.CallStorePaggin;
import net.miatech.praxis.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
    
    @RequestMapping(value = "CallStoreGet",method = RequestMethod.POST)
    public ResponseEntity<?> CallStoreGet(@RequestBody CallStoreFilter params) throws Exception {
        System.out.println("***** Generic - CallStoreGet *****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());
        return ResponseUtils.ok(logic.callStoreProcedure(params));
    }
    
    @RequestMapping(value = "CallStorePost",method = RequestMethod.POST)
    public ResponseEntity<?> CallStorePost(@RequestBody CallStoreFilter params) throws Exception {
        System.out.println("***** Generic - CallStorePost *****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());
        return ResponseUtils.create(logic.callStoreProcedure(params));
    }
    
    @RequestMapping(value = "CallStorePostAsync",method = RequestMethod.POST)
    public ResponseEntity<?> CallStorePostAsync(@RequestBody CallStoreFilter params) throws Exception {
        System.out.println("***** Generic - CallStorePostAsync *****");
        System.out.println("Parameters: " + params.getLibrary() + "." + params.getProcedure());
        logic.callStoreProcedureAsync(params);
        return ResponseUtils.create();
    }
    
    @RequestMapping(value = "CallStorePaggin/{library}/{procedure}")
    public ResponseEntity<?> CallStorePaggin(
            @PathVariable String library,
            @PathVariable String procedure, 
            @RequestParam Map<String,Object> params) throws Exception {
        System.out.println("***** Generic - CallStorePaggin *****");
        CallStorePaggin filter = new CallStorePaggin();
        filter.setLibrary(library);
        filter.setProcedure(procedure);
        filter.setParams(params);
        
        System.out.println("Parameters: " + library + "." + procedure);
        return new ResponseEntity(logic.callStoreProcedurePaggin(filter),HttpStatus.OK) ;
    }
}
