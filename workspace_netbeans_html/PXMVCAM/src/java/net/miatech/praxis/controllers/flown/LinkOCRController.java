/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.flown;

import com.google.gson.Gson;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.A1692Filter;
import net.miatech.praxis.classes.GetImageController;
import net.miatech.praxis.controllers.BaseController;
import net.miatech.praxis.logic.flown.LinkOCRLogic;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author lmendoza
 */
@Controller
@Scope("request")
@RequestMapping("/LinkOCR")
public class LinkOCRController extends BaseController {

    private static final Logger logError = Logger.getLogger("errorLog");
    private LinkOCRLogic logic;

    @RequestMapping(method = RequestMethod.POST)
    public String index(ModelMap map) {
        map.put("vp_serverDate", Functions.getFechaActual());
        map.put("vp_serverTime", Functions.getHoraActual());
        return "flown/LinkOCR/form_index";
    }

    @RequestMapping(value = "searchImage")
    public @ResponseBody
    String searchImage(ModelMap map, HttpServletRequest request) {
        System.out.println("-------------- LinkOCR : Controller-------------");
        map.put("success", true);

        String[] lista;
        List<String> lstImgs = new ArrayList<>();

        String strFechaScan = request.getParameter("strFechaScan");
        String strFrom = request.getParameter("strFrom");
        String strTo = request.getParameter("strTo");

        FilenameFilter fnfJPG = new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return (name.toLowerCase().endsWith(".jpg") && name.length() == 10);
            }
        };

        try {

            String strImgTodas = "";

            //String pathImgs = "\\\\CORREO\\AM\\IXC\\".concat(strFechaScan);
            String pathImgs = "\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\".concat(strFechaScan);
            File archivo = new File(pathImgs);
            lista = archivo.list(fnfJPG);

            if (lista != null && lista.length > 0) {
                for (String lista1 : lista) {
                    if (!strFrom.trim().equals("") && !strTo.trim().equals("")) {
                        if (Integer.parseInt(lista1.toString().trim().replace(".jpg", "")) >= Integer.parseInt(strFrom.trim()) && Integer.parseInt(lista1.toString().trim().replace(".jpg", "")) <= Integer.parseInt(strTo.trim())) {
                            lstImgs.add(lista1.toString().trim());
                        }
                    } else {
                        lstImgs.add(lista1.toString().trim());
                    }
                }
                strImgTodas = "Found : " + lista[0].toString().trim().replace(".jpg", "") + " - " + lista[lista.length - 1].toString().trim().replace(".jpg", "");
            }
            map.put("lstImagenes", lstImgs);
            map.put("listaOK", lista);
            map.put("archivo", archivo);
            map.put("fnfJPG", fnfJPG);
            map.put("ruta", pathImgs + '\\');
            map.put("fechaScan", strFechaScan);
            map.put("strImgTodas", strImgTodas);

        } catch (NumberFormatException e) {
            logError.error(e.getMessage());
            //map.put("error", e.getMessage());
            
        }
        return new Gson().toJson(map);

    }

    @RequestMapping(value = "getImagen")
    public @ResponseBody
    String getImagen(HttpServletRequest request) {
        try {
            return new GetImageController().getImagen(request, this.serverSession.getServerSession());
        } catch (IOException ex) {
            System.out.println("--> " + ex.getMessage());
        }
        return "";
    }

    @RequestMapping(value = "saveImg")
    public @ResponseBody
    String saveImg(ModelMap map, HttpServletRequest request) {
        logic = new LinkOCRLogic();

        String msj;
        String fechaScan;
        String rutaOrig;

        try {

            logic.setSession(this.serverSession.getServerSession());
            A1692Filter bean = new A1692Filter();

            bean.strTicket = request.getParameter("strTicket");
            bean.CDEPART = request.getParameter("CDEPART");
            bean.CARRIVA = request.getParameter("CARRIVA");
            bean.NFLIGHT = request.getParameter("NFLIGHT");
            bean.DFLIGHT = request.getParameter("DFLIGHT");
            bean.TDOC = request.getParameter("TDOC");
            bean.QTYPAX = Integer.parseInt(request.getParameter("QTYPAX"));
            bean.FBASE = request.getParameter("FBASE");
            bean.CLAS = request.getParameter("CLAS");
            bean.CABI = request.getParameter("CABI");
            bean.CARR = request.getParameter("CARR");
            bean.FOPERZUL = request.getParameter("FOPERZUL");
            bean.RECODE = request.getParameter("RECODE");
            bean.RFIC = request.getParameter("RFIC");
            bean.TKTASO = request.getParameter("TKTASO");
            fechaScan = request.getParameter("fechaScaneo");
            rutaOrig = request.getParameter("source");

            //Validando que las ciudades de Origen y Destino existan ===========
            if (bean.TDOC.trim().equals("E") || bean.TDOC.trim().equals("M")) {
                msj = logic.loadPX095SQP00155(bean, "O");//'O' para que valide el vuelo sin itinerario y sin leg
            } else {
                msj = logic.loadPX095S08VALID(bean, "O");//'O' para que valide el vuelo sin itinerario y sin leg
            }

            if (msj.equals("")) {

                String strTicket = bean.strTicket;

                String nomImg = strTicket.substring(1, 4) + "-" + strTicket.substring(4, 14) + "-0" + strTicket.substring(0, 1);//006-2149431127-01.jpg
                bean.CCIA = strTicket.substring(1, 4);
                bean.FORMA = strTicket.substring(4, 8);
                bean.SERIE = strTicket.substring(8, 14);
                bean.CUPON = strTicket.substring(0, 1);
                bean.FCONT = Functions.getFechaActual();//A pedido de ENS 20150428

                if (bean.TDOC.trim().equals("E") || bean.TDOC.trim().equals("M")) {
                    //EMD - MCO (M)
                    //INGRESA INFORMACION EN EL A1690
                    msj = logic.loadPX187_SQP00118(bean, fechaScan, nomImg);
                    if (msj.contains("correctly")) {
                        bean.TDOC = "";
                        bean.FLOAD = "2";
                        msj = logic.loadPX083SQP0069(bean, "I");
                        //Actualiza los campos en el A1817 luego de hacer ciertos cálculos.
                        msj = logic.loadPX083SQP0070(bean);
                    }
                } else {
                    //OCR (O) - FIM (F)
                    //INGRESA INFORMACION EN EL A1690
                    msj = logic.loadPX187_SQP00118(bean, fechaScan, nomImg);
                    if (msj.contains("correctly")) {
                        if (bean.TDOC.trim().equals("F")) {
                            bean.FLOAD = "4";
                        } else {
                            bean.FLOAD = "2";
                            bean.TDOC = "";
                        }
                        bean.SEQ = "00";  
                        
                        
                        //Ingresa registro en el A1692
                        msj = logic.loadPX095SQP0071(bean);
                        //Actualiza los campos en el A1691 luego de hacer ciertos cálculos.
                        msj = logic.loadPX095S12QCAL(bean, "");
                    }
                }

                if (msj.contains("correctly") || msj.contains("success")) {

                    String imgOr = rutaOrig;
                    File imgNew = new File("\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\" + nomImg + ".jpg");
                    if (imgNew.exists()) {
                        Functions.deleteFile("\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\" + nomImg + ".jpg");
                    }
                    //Functions.renameFile("\\\\CORREO\\AM\\IXC\\" + fechaScan + "\\" + imgOr, "\\\\CORREO\\AM\\IXC\\" + fechaScan + "\\" + strTicket + ".jpg");
                    Functions.renameFile("\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\" + imgOr, "\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\" + nomImg + ".jpg");
                }
            }

        } catch (SQLException e) {
            msj = "Error: " + e.getMessage();
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = "Error: " + e.getMessage();
            logError.error(e.getMessage());
        }

        map.put("success", true);
        map.put("msjRes", msj);

        return new Gson().toJson(map);

    }

    @RequestMapping(value = "saveDupli")
    public @ResponseBody
    String saveDupli(ModelMap map, HttpServletRequest request) {
        logic = new LinkOCRLogic();

        String msj;
        String fechaScan;
        String rutaOrig;

        try {

            logic.setSession(this.serverSession.getServerSession());
            A1692Filter bean = new A1692Filter();

            bean.strTicket = request.getParameter("strTicket");
            bean.CDEPART = request.getParameter("CDEPART");
            bean.CARRIVA = request.getParameter("CARRIVA");
            bean.NFLIGHT = request.getParameter("NFLIGHT");
            bean.DFLIGHT = request.getParameter("DFLIGHT");
            bean.TDOC = request.getParameter("TDOC");
            bean.QTYPAX = Integer.parseInt(request.getParameter("QTYPAX"));
            bean.FBASE = request.getParameter("FBASE");
            bean.CLAS = request.getParameter("CLAS");
            bean.CABI = request.getParameter("CABI");
            bean.CARR = request.getParameter("CARR");
            bean.FOPERZUL = request.getParameter("FOPERZUL");
            bean.RECODE = request.getParameter("RECODE");
            bean.RFIC = request.getParameter("RFIC");
            bean.TKTASO = request.getParameter("TKTASO");
            fechaScan = request.getParameter("fechaScaneo");
            rutaOrig = request.getParameter("source");

            msj = logic.loadPX095S08VALID(bean, "O");//'O' para que valide el vuelo sin itinerario y sin leg

            if (msj.equals("")) {

                String strTicket = bean.strTicket;

                String nomImg = strTicket.substring(1, 4) + "-" + strTicket.substring(4, 14) + "-0" + strTicket.substring(0, 1);//006-2149431127-01.jpg
                bean.CCIA = strTicket.substring(1, 4);
                bean.FORMA = strTicket.substring(4, 8);
                bean.SERIE = strTicket.substring(8, 14);
                bean.CUPON = strTicket.substring(0, 1);
                bean.FCONT = Functions.getFechaActual();//A pedido de ENS 20150428

                //OCR (O) - FIM (F) - SOLO VOLADO
                //INGRESA INFORMACION EN EL A1690
                msj = logic.loadPX187_SQP02435(bean, fechaScan, nomImg);
                if (msj.contains("correctly")) {
                    if (bean.TDOC.trim().equals("F")) {
                        bean.FLOAD = "4";
                    } else {
                        bean.FLOAD = "2";
                        bean.TDOC = "";
                    }
                    bean.SEQ = "99";

                    //Ingresa registro en el A1692
                    msj = logic.loadPX095SQP0071(bean);
                    //Actualiza los campos en el A1691 luego de hacer ciertos cálculos.
                    msj = logic.loadPX095S12QCAL(bean, "");

                }

                if (msj.contains("correctly") || msj.contains("success")) {

                    String imgOr = rutaOrig.substring(rutaOrig.length() - 10);
                    File imgNew = new File("\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\" + nomImg + ".jpg");
                    if (imgNew.exists()) {
                        Functions.deleteFile("\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\" + nomImg + ".jpg");
                    }
                    //Functions.renameFile("\\\\CORREO\\AM\\IXC\\" + fechaScan + "\\" + imgOr, "\\\\CORREO\\AM\\IXC\\" + fechaScan + "\\" + strTicket + ".jpg");
                    Functions.renameFile("\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\" + imgOr, "\\\\" + serverSession.propertySession.get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\" + nomImg + ".jpg");
                }
            }

        } catch (SQLException e) {
            msj = "Error: " + e.getMessage();
            logError.error(e.getMessage());
        } catch (Exception e) {
            msj = "Error: " + e.getMessage();
            logError.error(e.getMessage());
        }

        map.put("success", true);
        map.put("msjRes", msj);

        return new Gson().toJson(map);

    }
}
