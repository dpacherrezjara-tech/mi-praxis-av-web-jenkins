
import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author lzambrano
 */
public class test {
    
    public static void main(String[] args) {
        // TODO code application logic here
        
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw); 
        
        try{
        String FileTXT = "RptComisionesFOB.txt";
        File fileTmp02;
        fileTmp02 = File.createTempFile("tmp", FileTXT);
        PrintStream out = new PrintStream(new FileOutputStream(fileTmp02));
        out.println("IATA;Ticket;Trans;cpn;cjn;Issue Date;Carr.;Fare Basis;Class;Origen;Dest;IT Tour Cod.;FOP;Station IATA;CPN Fare;Comm.;Agr. Code;%;Ancillaries Amount;Ancillaries Comm.;Agr. Code;Ancillaries %;Charge Amount;Charge Comm.;Charge Agr. Code;Charge %;Lote");
        out.flush();
        out.close();
        System.out.println("Results: Total -> ");

        }
        
        catch(Exception e){
            e.printStackTrace(pw);
            sw.toString();
            System.out.println("Exception -> User: LZAMBRANO Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        
    }
    
    /*public static void maineMAIL(String[] args) {
        // TODO code application logic here
        
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw); 
        
        try{
            
        boolean iboolean;

        ProMail proMail = new ProMail();
        List<String> receptores = new ArrayList<>();

        receptores.add("lzambrano@miatech.net");
        
        // Emails CC
        List<String> Ccp = new ArrayList<>();
        String strMails = "";

        //temporal borrar
        //strMails = "asifuentes@miatech.net;oldman_100_6@hotmail.com";
        String[] parts = strMails.split(";");
        for (int i = 0; i < parts.length; i++) {
            Ccp.add(parts[i]);
        }
        String emisor = "notificaciones@miatech.net";
        String asunto = "Demo FOB";
        String mensaje = "Mensaje Demo FOB";
        List<String> archivos = new ArrayList<>();
        envia_html(emisor, asunto, receptores, Ccp, mensaje, archivos, "amcontrolventasfranquicias@aeromexico.com");
        System.out.println("Results: Total -> ");

        }
        
        catch(Exception e){
            e.printStackTrace(pw);
            sw.toString();
            System.out.println("Exception -> User: LZAMBRANO Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        }
        
    }*/
    
    /*static private class SMTPAuthenticator extends Authenticator {

        private String dEmail;
        private String dPassword;

        public SMTPAuthenticator(String email, String password) {
            dEmail = email;
            dPassword = password;
        }

        public PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(dEmail, dPassword);
        }
    }*/
    
    /*static public boolean envia_html(String emisor, 
            String asunto, 
            List<String> receptores, 
            List<String> Ccpy, 
            String mensaje, 
            List<String> adjuntos, 
            String correoMask) {
        boolean envioExitoso = true;

        try {
            String usuario =  "amcontrolventasfranquicias@aeromexico.com";//correoMask; //Correo con el que saldra el email enviado ("from")            
            //emisor = "notificaciones@miatech.net"; 
            Properties props = System.getProperties();            
            //Se define el servidor de correos
            props.put("mail.smtp.host", "216.32.180.74");
            props.put("mail.smtp.port", "25"); 
            Authenticator auth = new SMTPAuthenticator(usuario, "Aeromexico01"); // Tener Clave del quien Envia                            
//            props.put("mail.smtp.host", serverSession.getPropertySession().get("APP_SERVER_MAIL_HOST").toString());
//            props.put("mail.smtp.port", serverSession.getPropertySession().get("APP_SERVER_MAIL_PORT").toString());
//            props.put("mail.smtp.starttls.enable", "true");            
//            props.setProperty("mail.smtp.user", usuario);
//            props.setProperty("mail.smtp.auth", "true");                         
//            Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", serverSession.getPropertySession().get("APP_SERVER_MAIL_PASSWORD").toString());            
            Session session = Session.getInstance(props, auth);            
            //Se obtiene sesi&amp;oacute;n desde el servidor de correos               
            session.setDebug(true);
            MimeMessage message = new MimeMessage(session);
            InternetAddress[] dest = new InternetAddress[receptores.size()];
            for (int i = 0; i < dest.length; i++) {
                dest[i] = new InternetAddress(receptores.get(i));
            }
            // Correo con copy To

            InternetAddress[] Ccp = new InternetAddress[Ccpy.size()];
            for (int i = 0; i < Ccp.length; i++) {
                Ccp[i] = new InternetAddress(Ccpy.get(i));
            }

            //Se define qui&amp;eacute;n es el emisor del e-mail
            message.setFrom(new InternetAddress(usuario));
            InternetAddress[] replyTo = new InternetAddress[1];
            replyTo[0] = new InternetAddress(usuario);
            message.setReplyTo(replyTo);
            //Se definen el o los destinatarios
            message.addRecipients(Message.RecipientType.TO, dest);
            message.addRecipients(Message.RecipientType.BCC, Ccp);
            //message.addRecipients(Message.RecipientType.BCC, dest);
            //Se defina el asunto del e-mail
            message.setSubject(asunto);

            //Se seteo el mensaje del e-mail
            MimeBodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(mensaje, "text/html");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);

            //Se adjuntan los archivos al correo
            if (adjuntos != null && adjuntos.size() > 0) {
                for (String rutaAdjunto : adjuntos) {
                    messageBodyPart = new MimeBodyPart();
                    File f = new File(rutaAdjunto);
                    if (f.exists()) {
                        DataSource source = new FileDataSource(rutaAdjunto);
                        messageBodyPart.setDataHandler(new DataHandler(source));
                        messageBodyPart.setFileName(f.getName().substring(22));
                        multipart.addBodyPart(messageBodyPart);
                    }
                }
            }

            //Se junta el mensaje y los archivos adjuntos
            message.setContent(multipart);

            //Se env&amp;iacute;a el e-mail
            Transport.send(message);
        } catch (Exception e) {
            e.getMessage();
            e.toString();
            envioExitoso = false;
        } finally {
            //Se eliminan del servidor los archivos adjuntos
            if (adjuntos != null && adjuntos.size() > 0) {
                for (String rutaAdjunto : adjuntos) {
                    try {
                        File arch = new File(rutaAdjunto);
                        arch.delete();
                    } catch (Exception e) {
                    }
                }
            }
        }
        return envioExitoso;
    }
    
    static public boolean enviaFOB(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos) {
        boolean envioExitoso = true;

        ServerSession serverSession = new ServerSession();

        try {
            Properties props = System.getProperties();

            String usuario = "amcontrolventasfranquicias@aeromexico.com"; //Correo con el que saldra el email enviado ("from")

            //Se define el servidor de correos
            props.put("mail.smtp.host", serverSession.getProperty("smtp.office365.com"));
            props.put("mail.smtp.port", serverSession.getProperty("587"));
            props.put("mail.smtp.starttls.enable", "true");
            props.setProperty("mail.smtp.user", usuario);
            props.setProperty("mail.smtp.auth", "true");
            Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", serverSession.getProperty("Notific@ciones"));
            //Authenticator auth = new SMTPAuthenticator(emisor, "rmDataCOM1"); // Tener Clave del quien Envia
            Session session = Session.getInstance(props, auth);
            //Se obtiene sesi&amp;oacute;n desde el servidor de correos               
            session.setDebug(true);
            MimeMessage message = new MimeMessage(session);
            InternetAddress[] dest = new InternetAddress[receptores.size()];
            for (int i = 0; i < dest.length; i++) {
                dest[i] = new InternetAddress(receptores.get(i).trim());
            }
            // Correo con copy To
            InternetAddress[] Ccp = new InternetAddress[Ccpy.size()];
            for (int i = 0; i < Ccp.length; i++) {
                Ccp[i] = new InternetAddress(Ccpy.get(i).trim());
            }

            //Se define qui&amp;eacute;n es el emisor del e-mail
            message.setFrom(new InternetAddress(emisor));
            InternetAddress[] replyTo = new InternetAddress[1];
            replyTo[0] = new InternetAddress(emisor);
            message.setReplyTo(replyTo);
            //Se definen el o los destinatarios
            message.addRecipients(Message.RecipientType.TO, dest);
            message.addRecipients(Message.RecipientType.CC, Ccp);
            //message.addRecipients(Message.RecipientType.BCC, dest);
            //Se defina el asunto del e-mail
            message.setSubject(asunto);

            //Se seteo el mensaje del e-mail
            MimeBodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(mensaje, "text/html");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);

            //Se adjuntan los archivos al correo
            if (adjuntos != null && adjuntos.size() > 0) {
                for (String rutaAdjunto : adjuntos) {
                    messageBodyPart = new MimeBodyPart();
                    File f = new File(rutaAdjunto);
                    if (f.exists()) {
                        DataSource source = new FileDataSource(rutaAdjunto);
                        messageBodyPart.setDataHandler(new DataHandler(source));
                        messageBodyPart.setFileName(f.getName().substring(22));
                        multipart.addBodyPart(messageBodyPart);
                    }
                }
            }

            //Se junta el mensaje y los archivos adjuntos
            message.setContent(multipart);

            //Se env&amp;iacute;a el e-mail
            Transport.send(message);
        } catch (Exception e) {
            e.getMessage();
            e.toString();
            envioExitoso = false;
        } finally {
            //Se eliminan del servidor los archivos adjuntos
            if (adjuntos != null && adjuntos.size() > 0) {
                for (String rutaAdjunto : adjuntos) {
                    try {
                        File arch = new File(rutaAdjunto);
                        arch.delete();
                    } catch (Exception e) {
                    }
                }
            }
        }
        return envioExitoso;
    }*/
}
