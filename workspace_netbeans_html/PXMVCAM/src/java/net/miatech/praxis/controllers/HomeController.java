package net.miatech.praxis.controllers;

import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpSession;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import net.miatech.praxis.classes.CurrentSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
@Scope("request")
@RequestMapping("/Home")
public class HomeController extends BaseController {

    @Autowired
    private CurrentSession currentSession;

    @RequestMapping(method = RequestMethod.GET)
    public String index(ModelMap map, HttpSession session) {
        try {

            System.out.println("HomeController : index");
            return "";
        } catch (Exception e) {
            //throw new SpringException(e);
        }
        return null;
    }

    public int anio_actual() {
        System.out.println("HomeController : anio_actual");
        Date fecha = new Date();
        Calendar calendario = Calendar.getInstance();
        calendario.setTime(fecha);
        int anio = calendario.get(Calendar.YEAR);

        return anio;
    }
}
