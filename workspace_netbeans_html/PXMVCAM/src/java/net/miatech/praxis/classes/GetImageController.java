package net.miatech.praxis.classes;

import com.google.gson.Gson;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.SocketException;
import javax.servlet.http.HttpServletRequest;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.controllers.BaseController;
import com.itextpdf.text.pdf.codec.Base64;
import java.util.HashMap;
import java.io.File;
import java.io.FileNotFoundException;

/**
 *
 * @author lmendoza
 */
public class GetImageController extends BaseController {

    public String getImagen(HttpServletRequest request, IServerSession ss) throws IOException {

        String rutaCorreo = "\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY_2");

        String strOption = "";
        String strTicket = "";
        String strImagen = "";
        String strFVuelo = "";
        String strRuta = "";
        byte[] bytes = new byte[240996];

        if (request.getParameter("strOption") != null && !request.getParameter("strOption").trim().equals("")) {
            strOption = request.getParameter("strOption").trim();
        }

        if (strOption.equals("7H_IMG_RED")) {
            // <editor-fold defaultstate="collapsed" desc="IMAGEN FÍSICA EN RED">
//            try {
//                if (request.getParameter("strImagen") != null && !request.getParameter("strImagen").trim().equals("")) {
//                    strImagen = request.getParameter("strImagen").trim();
//                }
//
//                InputStream input = null;
//
//                int k = 0;
//                int ind = 2;
//                int n = strImagen.indexOf(".");
//                if (n < 0) {
//                    n = 0;
//                }
//                String extension = strImagen.substring(n, strImagen.length());
//                String strImagenX = strImagen.substring(0, n) + "X" + extension;
//
//                if (!strImagen.toUpperCase().startsWith("7H")) {
//                    ind = 0;
//                }
//                if (strImagen.toUpperCase().contains("IXP")) {
//                    try {
//                        input = new FileInputStream(rutaCorreo + "\\7H\\".concat(strImagen.substring(ind)));
//                    } catch (FileNotFoundException x) {
//                        input = new FileInputStream(rutaCorreo + "\\7H\\".concat(strImagenX.substring(ind)));
//                    }
//
//                } else {
//                    try {
//                        input = new FileInputStream(rutaCorreo + "\\7H\\IXP\\".concat(strImagen.substring(ind)));
//                    } catch (FileNotFoundException x) {
//                        input = new FileInputStream(rutaCorreo + "\\7H\\IXP\\".concat(strImagenX.substring(ind)));
//                    }
//                }                
//
//                //ServletOutputStream stream = response.getOutputStream();
//                
//                bytes = new byte[input.available()];
//
//                while (true) {
//                    k = input.read(bytes);
//                    if (k == -1) {
//                        break;
//                    }
//                }
//                if (bytes != null) {
//                    //stream.write(bytes);
//                    input.close();
//                    //stream.flush();
//                    //stream.close();
//                }                
//
//            } catch (SocketException e) {
//                e.printStackTrace();
//            }/* catch (ClientAbortException e) {
//                e.printStackTrace();
//            } */catch (IOException e) {
//                e.printStackTrace();
//            }
            //</editor-fold>
        } else if (strOption.equals("AM_IMG_RED")) {
            // <editor-fold defaultstate="collapsed" desc="IMAGEN FÍSICA EN RED PARA PRORRATEO">
            if (request.getParameter("strImagen") != null && !request.getParameter("strImagen").trim().equals("")) {
                strImagen = request.getParameter("strImagen").trim();
            }

            InputStream input;
            int k;
            int ind = 2;
            int n = strImagen.indexOf(".");
            if (n < 0) {
                n = 0;
            }
            String extension = strImagen.substring(n, strImagen.length());
            String strImagenX = strImagen.substring(0, n) + "X" + extension;
            if (!strImagen.toUpperCase().startsWith("AM")) {
                ind = 0;
            }
            try {

                if (strImagen.toUpperCase().contains("IXP")) {
                    try {
                        input = new FileInputStream(rutaCorreo + "\\AM\\".concat(strImagen.substring(ind)));
                    } catch (FileNotFoundException x) {
                        input = new FileInputStream(rutaCorreo + "\\AM\\".concat(strImagenX.substring(ind)));
                    }

                } else {
                    try {
                        input = new FileInputStream(rutaCorreo + "\\AM\\IXP\\".concat(strImagen.substring(ind)));
                    } catch (FileNotFoundException x) {
                        input = new FileInputStream(rutaCorreo + "\\AM\\IXP\\".concat(strImagenX.substring(ind)));
                    }
                }

                //strRuta = "\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\".concat(strImagen.substring(ind));
                //input = new FileInputStream("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\".concat(strImagen.substring(ind)));
                bytes = new byte[input.available()];
                //rvletOutputStream stream = response.getOutputStream();

                while (true) {
                    k = input.read(bytes);
                    if (k == -1) {
                        break;
                    }
                }
                if (bytes != null) {
                    //stream.write(bytes);
                    input.close();
                    // stream.flush();
                    //stream.close();
                }

            } catch (SocketException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            //</editor-fold>
        } else if (strOption.equals("AM_IMG_LNK")) {
            // <editor-fold defaultstate="collapsed" desc="IMAGEN FÍSICA EN RED PARA LINKEO">
            if (request.getParameter("strImagen") != null && !request.getParameter("strImagen").trim().equals("")) {
                strImagen = request.getParameter("strImagen").trim();
            }
            String fechaScan = "";
            if (request.getParameter("fechaScan") != null && !request.getParameter("fechaScan").trim().equals("")) {
                fechaScan = request.getParameter("fechaScan").trim();
            }

            InputStream input;
            int k;
            int ind = 2;
            int n = strImagen.indexOf(".");
            if (n < 0) {
                n = 0;
            }

            if (!strImagen.toUpperCase().startsWith("AM")) { //CAMBIAR POR AM
                ind = 0;
            }
            try {

                strRuta = "\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\".concat(strImagen.substring(ind));
                input = new FileInputStream("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\".concat(strImagen.substring(ind)));
                bytes = new byte[input.available()];
                //rvletOutputStream stream = response.getOutputStream();

                while (true) {
                    k = input.read(bytes);
                    if (k == -1) {
                        break;
                    }
                }
                if (bytes != null) {
                    //stream.write(bytes);
                    input.close();
                    // stream.flush();
                    //stream.close();
                }

            } catch (SocketException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            //</editor-fold>
        } else {
            // <editor-fold defaultstate="collapsed" desc="IMAGEN OCR">
            if (request.getParameter("strTicket") != null && !request.getParameter("strTicket").trim().equals("")) {
                strTicket = request.getParameter("strTicket").trim();
            }
            if (request.getParameter("strFVuelo") != null && !request.getParameter("strFVuelo").trim().equals("")) {
                strFVuelo = request.getParameter("strFVuelo").trim();
            }
            if (request.getParameter("strRuta") != null && !request.getParameter("strRuta").trim().equals("")) {
                strRuta = request.getParameter("strRuta").trim();
            }

            int k = 0;

            InputStream input;
            try {

                File f;

                if (!strRuta.trim().equals("")) {
                    f = new File("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + strRuta);

                    if (f.exists()) {
                        input = new FileInputStream("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + strRuta);
                    } else {
                        input = new FileInputStream("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\not_picture.png");
                    }
                } else {

                    if (!strTicket.trim().equals("") && !strFVuelo.trim().equals("")) {
                        f = new File("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + strFVuelo + "\\" + File.separatorChar + strTicket + ".jpg");

                        if (f.exists()) {
                            input = new FileInputStream("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + strFVuelo + "\\" + File.separatorChar + strTicket + ".jpg");
                        } else {
                            input = new FileInputStream("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\not_picture.png");
                        }
                    } else {
                        input = new FileInputStream("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\not_picture.png");
                    }
                }

                //stream = response.getOutputStream();
                bytes = new byte[input.available()];

                while (true) {
                    k = input.read(bytes);
                    if (k == -1) {
                        break;
                    }
                }
                if (bytes != null) {
                    //stream.write(bytes);
                    input.close();
                    //stream.flush();
                    //stream.close();
                }

            } catch (SocketException e) {
                e.printStackTrace();
            }/* catch (ClientAbortException ex) {
             ex.printStackTrace();
             }*/ catch (IOException eg) {
                eg.printStackTrace();
            }
            //</editor-fold>
        }

        String base64String = Base64.encodeBytes(bytes);

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", base64String);

        return new Gson().toJson(m);
    }

    public String getImagenProrrateo(IServerSession ss, String strFileName) throws IOException {

        String rutaCorreo = "\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY_2");

        String strOption = "";
        String strTicket = "";
        String strImagen = "";
        String strFVuelo = "";
        String strRuta = "";
        byte[] bytes = new byte[240996];

        // <editor-fold defaultstate="collapsed" desc="IMAGEN FÍSICA EN RED PARA PRORRATEO">
        strImagen = strFileName;

        InputStream input;
        int k;
        int ind = 2;
        int n = strImagen.indexOf(".");
        if (n < 0) {
            n = 0;
        }
        String extension = strImagen.substring(n, strImagen.length());
        String strImagenX = strImagen.substring(0, n) + "X" + extension;
        if (!strImagen.toUpperCase().startsWith("AM")) {
            ind = 0;
        }
        try {

            if (strImagen.toUpperCase().contains("IXP")) {
                try {
                    input = new FileInputStream(rutaCorreo + "\\AM\\".concat(strImagen.substring(ind)));
                } catch (FileNotFoundException x) {
                    input = new FileInputStream(rutaCorreo + "\\AM\\".concat(strImagenX.substring(ind)));
                }

            } else {
                try {
                    input = new FileInputStream(rutaCorreo + "\\AM\\IXP\\".concat(strImagen.substring(ind)));
                } catch (FileNotFoundException x) {
                    input = new FileInputStream(rutaCorreo + "\\AM\\IXP\\".concat(strImagenX.substring(ind)));
                }
            }

            //strRuta = "\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\".concat(strImagen.substring(ind));
            //input = new FileInputStream("\\\\" + (String) ss.getPropertySession().get("RUTA_REPOSITORY") + "\\am\\INSUMOS-FLOWN\\OCRIMGS\\" + fechaScan + "\\".concat(strImagen.substring(ind)));
            bytes = new byte[input.available()];
            //rvletOutputStream stream = response.getOutputStream();

            while (true) {
                k = input.read(bytes);
                if (k == -1) {
                    break;
                }
            }
            if (bytes != null) {
                //stream.write(bytes);
                input.close();
                // stream.flush();
                //stream.close();
            }

        } catch (SocketException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //</editor-fold>
        String base64String = Base64.encodeBytes(bytes);

        HashMap m = new HashMap();
        m.put("success", true);
        m.put("data", base64String);

        return new Gson().toJson(m);
    }
}
