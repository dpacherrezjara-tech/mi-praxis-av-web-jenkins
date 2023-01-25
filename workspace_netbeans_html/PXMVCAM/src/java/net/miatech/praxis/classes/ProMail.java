/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import net.miatech.beans.ServerSession;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class ProMail {
    
    private static final Logger logError = Logger.getLogger("errorLog");
    
    private class SMTPAuthenticator extends Authenticator {

        private String dEmail;
        private String dPassword;

        public SMTPAuthenticator(String email, String password) {
            dEmail = email;
            dPassword = password;
        }

        public PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(dEmail, dPassword);
        }
    }

    /**
     *
     * @param emisor Correo de qui&amp;eacute;n emite el correo
     * @param asunto Asunto del e-mail
     * @param receptores Correos de los receptores del e-mail
     * @param mensaje Mensaje del e-mail
     * @param adjuntos Ruta de archivos adjuntos en el e-mail
     * @return TRUE si el mail fue enviado con &amp;eacute;xito, FALSE en caso
     * contrario
     */
    public boolean envia(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos, String correoMask) {
        boolean envioExitoso = true;

//        ServerSession serverSession = new ServerSession();

        try {
            String usuario = correoMask; //Correo con el que saldra el email enviado ("from")            
           
            Properties props = System.getProperties();
            //props.put("mail.smtp.host", "216.32.180.74");
            /*
                props.put("mail.smtp.host", "216.32.180.74");
                props.put("mail.smtp.port", "25");
            */
            props.put("mail.smtp.host","smtp.office365.com" );
            props.put("mail.smtp.port", "587");
            
            props.put("mail.smtp.starttls.enable","true");
            //props.setProperty("mail.smtp.user", emisor);
            props.setProperty("mail.smtp.user", usuario);
            props.setProperty("mail.smtp.auth", "true");
            
            Authenticator auth = new SMTPAuthenticator(usuario, "Am@claraciones"); // Tener Clave del quien Envia
            
//            Authenticator auth = new SMTPAuthenticator(usuario, "Notific@tions"); // Tener Clave del quien Envia                
            
            //Se define el servidor de correos
//            props.put("mail.smtp.host", serverSession.getProperty("APP_SERVER_MAIL_HOST"));
//            props.put("mail.smtp.port", serverSession.getProperty("APP_SERVER_MAIL_PORT"));
//            props.put("mail.smtp.starttls.enable", "true");
//            //props.setProperty("mail.smtp.user", emisor);
//            props.setProperty("mail.smtp.user", usuario);
//            props.setProperty("mail.smtp.auth", "true");            
//            Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", "Notific@ciones");
            
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

    public boolean envia_html(String emisor, 
            String asunto, 
            List<String> receptores, 
            List<String> Ccpy, 
            String mensaje, 
            List<String> adjuntos, 
            String correoMask, 
            IServerSession ss) {
        boolean envioExitoso = true;

        //ServerSession serverSession = new ServerSession();
        IServerSession serverSession = ss;
        try {
            String usuario = correoMask; //Correo con el que saldra el email enviado ("from")            
            //emisor = "rmayta@miatech.net"; 
            Properties props = System.getProperties();            
            //Se define el servidor de correos
            props.put("mail.smtp.host", "smtp.office365.com");
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable","true");
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");
            Authenticator auth = new SMTPAuthenticator(usuario, "Notific@tions"); // Tener Clave del quien Envia                            
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

    public boolean enviaFOB(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos) {
        boolean envioExitoso = true;

        //ServerSession serverSession = new ServerSession();

        try {
            Properties props = System.getProperties();

            String usuario = "notifications@miatech.net"; //Correo con el que saldra el email enviado ("from")
            emisor = usuario;
            //Se define el servidor de correos
            props.put("mail.smtp.host","smtp.office365.com" );
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable","true");
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");
            Authenticator auth = new SMTPAuthenticator(usuario, "Notific@tions"); // Tener Clave del quien Envia
            
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
    }

    public boolean enviaCONS(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos) {
        boolean envioExitoso = true;

        //ServerSession serverSession = new ServerSession();

        try {
            //TEMPORAL
            //emisor = "rmayta@miatech.net"; 
            Properties props = System.getProperties();
            //Se define el servidor de correos
            props.put("mail.smtp.host","smtp.office365.com" );
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.starttls.enable", "true");
            props.setProperty("mail.smtp.user", emisor);
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");
            Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", "Notific@ciones");
            //Authenticator auth = new SMTPAuthenticator(emisor, "rmDataCOM1"); // Tener Clave del quien Envia
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
            message.setFrom(new InternetAddress(emisor));
            InternetAddress[] replyTo = new InternetAddress[1];
            replyTo[0] = new InternetAddress(emisor);
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

    public boolean enviaCONS_HTML(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos,IServerSession ss) {
        boolean envioExitoso = true;

        //ServerSession serverSession = new ServerSession();
        //IServerSession serverSession = ss;
        try {
            Properties props = System.getProperties();
  
            String usuario = "notifications@miatech.net"; //Correo con el que saldra el email enviado ("from")
            emisor = usuario;
            //Se define el servidor de correos de Aeromexico
            
            props.put("mail.smtp.host","smtp.office365.com" );
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable","true");
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");
            Authenticator auth = new SMTPAuthenticator(usuario, "Notific@tions"); // Tener Clave del quien Envia
            //Authenticator auth = new SMTPAuthenticator(emisor, "rmDataCOM1"); // Tener Clave del quien Envia
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
            message.setFrom(new InternetAddress(emisor));
            InternetAddress[] replyTo = new InternetAddress[1];
            replyTo[0] = new InternetAddress(emisor);
            message.setReplyTo(replyTo);
            //Se definen el o los destinatarios
            message.addRecipients(Message.RecipientType.TO, dest);
            message.addRecipients(Message.RecipientType.BCC, Ccp );
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

    public boolean enviaMDP(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos, String correoMask) {
        
        //Para medios de Pago
        boolean envioExitoso = true;
        
//        ServerSession serverSession = new ServerSession();
        
        try {
            String usuario = correoMask; //Correo con el que saldra el email enviado ("from")
            //TEMPORAL
            //emisor = "rmayta@miatech.net"; 
            Properties props = System.getProperties();
            //Se define el servidor de correos
            /*props.put("mail.smtp.host", serverSession.getProperty("APP_SERVER_MAIL_HOST"));
            props.put("mail.smtp.port", serverSession.getProperty("APP_SERVER_MAIL_PORT"));
            props.put("mail.smtp.starttls.enable","true");*/
            props.put("mail.smtp.host","smtp.office365.com" );
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.starttls.enable","true");
            //props.setProperty("mail.smtp.user", emisor);
            props.setProperty("mail.smtp.user", usuario);
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");
            //Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", "notificaciones123"); // Tener Clave del quien Envia 
            Authenticator auth;
            if(emisor.contains("amcscaclaracioncontracargousaeur")){
                auth = new SMTPAuthenticator("amcscaclaracioncontracargousaeur@miatech.net", "Amcargo365");
            }else{
                auth = new SMTPAuthenticator("amaclaracionescontracargos@miatech.net", "Am@claraciones");
            }
            
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
            message.addRecipients(Message.RecipientType.BCC, Ccp );
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
                        messageBodyPart.setFileName(f.getName());
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
            logError.error("Data Request By Bank (proMail.enviaMDP) - Message: " + e.getMessage() + " Stacktrace: " + e.getMessage() + "**" + e.getStackTrace().toString());
            envioExitoso = false;
        }/* finally {
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
        }*/
        return envioExitoso;
    }
    
    public boolean sendEmailMDP(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos, String correoMask) throws IOException {
        
        //Para medios de Pago
        boolean envioExitoso = true;
        
//        ServerSession serverSession = new ServerSession();
        
        try {
            String usuario = correoMask; //Correo con el que saldra el email enviado ("from")
            //TEMPORAL
            //emisor = "rmayta@miatech.net"; 
            Properties props = System.getProperties();
            //Se define el servidor de correos
            /*props.put("mail.smtp.host", serverSession.getProperty("APP_SERVER_MAIL_HOST"));
            props.put("mail.smtp.port", serverSession.getProperty("APP_SERVER_MAIL_PORT"));
            props.put("mail.smtp.starttls.enable","true");*/
            props.put("mail.smtp.host","smtp.office365.com" );
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.starttls.enable","true");
            
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");
            
            //props.setProperty("mail.smtp.user", emisor);
            props.setProperty("mail.smtp.user", usuario);
            props.setProperty("mail.smtp.auth", "true");
            //Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", "notificaciones123"); // Tener Clave del quien Envia 
            Authenticator auth;
            if(emisor.contains("amcscaclaracioncontracargousaeur")){
                auth = new SMTPAuthenticator("amcscaclaracioncontracargousaeur@miatech.net", "Amcargo365");
            }else{
                auth = new SMTPAuthenticator("amaclaracionescontracargos@miatech.net", "Am@claraciones");
            }
            
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
            message.addRecipients(Message.RecipientType.BCC, Ccp );
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
                        messageBodyPart.setFileName(f.getName());
                        multipart.addBodyPart(messageBodyPart);
                    }
                }
            }

            //Se junta el mensaje y los archivos adjuntos
            message.setContent(multipart);

            boolean oK = this.transportSend(message);
            while (!oK) {                
                oK = this.transportSend(message);
            }
       
        } catch (Exception e) {
            e.getMessage();
            e.toString();
            logError.error("Data Request By Bank (proMail.enviaMDP) - Message: " + e.getMessage() + " Stacktrace: " + e.getMessage() + "**" + e.getStackTrace().toString());
            envioExitoso = false;
        }
        
        return envioExitoso;
    }
    
    public boolean transportSend(MimeMessage message){
        
        boolean ennvioOk = false;
        try {
            //Se env&amp;iacute;a el e-mail
            Transport.send(message);
            ennvioOk = true;
        } catch (Exception e) {
            e.getMessage();
            ennvioOk = false;
        }

        return ennvioOk;
    
    }
    
    public boolean enviaMDP_2(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, List<String> adjuntos, String correoMask) {
        
        //Para medios de Pago
        boolean envioExitoso = true;
        
//        ServerSession serverSession = new ServerSession();
        
        try {
            String usuario = correoMask; //Correo con el que saldra el email enviado ("from")
            //TEMPORAL
            //emisor = "rmayta@miatech.net"; 
            Properties props = System.getProperties();
            //Se define el servidor de correos
            /*props.put("mail.smtp.host", serverSession.getProperty("APP_SERVER_MAIL_HOST"));
            props.put("mail.smtp.port", serverSession.getProperty("APP_SERVER_MAIL_PORT"));
            props.put("mail.smtp.starttls.enable","true");*/
            props.put("mail.smtp.host","smtp.office365.com" );
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.starttls.enable","true");
            //props.setProperty("mail.smtp.user", emisor);
            props.setProperty("mail.smtp.user", usuario);
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");
            //Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", "notificaciones123"); // Tener Clave del quien Envia 
            Authenticator auth;
            if(emisor.contains("amcscaclaracioncontracargousaeur")){
                auth = new SMTPAuthenticator("amcscaclaracioncontracargousaeur@miatech.net", "Amcargo365");
            }else{
                auth = new SMTPAuthenticator("amaclaracionescontracargos@miatech.net", "Am@claraciones");
            }
            
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
            message.addRecipients(Message.RecipientType.BCC, Ccp );
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
                        messageBodyPart.setFileName(f.getName());
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
        }/* finally {
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
        }*/
        return envioExitoso;
    }
    
    public boolean sendEmailAMEX(String asunto, List<String> receptores, List<String> Ccpy, String mensaje, String correoMask, List<String> adjuntos) throws IOException {

        //Para medios de Pago
        boolean envioExitoso = true;

//        ServerSession serverSession = new ServerSession();
        try {
            String usuario = correoMask; //Correo con el que saldra el email enviado ("from")
            //TEMPORAL
            //emisor = "rmayta@miatech.net"; 
            Properties props = System.getProperties();
            //Se define el servidor de correos
            /*props.put("mail.smtp.host", serverSession.getProperty("APP_SERVER_MAIL_HOST"));
             props.put("mail.smtp.port", serverSession.getProperty("APP_SERVER_MAIL_PORT"));
             props.put("mail.smtp.starttls.enable","true");*/
            props.put("mail.smtp.host", "m.outlook.com");
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.starttls.enable", "true");

            props.put("mail.smtp.ssl.protocols", "TLSv1.2");

            //props.setProperty("mail.smtp.user", emisor);
            props.setProperty("mail.smtp.user", usuario);
            props.setProperty("mail.smtp.auth", "true");
            //Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", "notificaciones123"); // Tener Clave del quien Envia 
            Authenticator auth;

            auth = new SMTPAuthenticator("amaclaracionescontracargos@miatech.net", "Am@claraciones");

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
            message.addRecipients(Message.RecipientType.CC, Ccp);
            //message.addRecipients(Message.RecipientType.BCC, dest);
            //Se defina el asunto del e-mail
            message.setSubject(asunto);

            //Se seteo el mensaje del e-mail
            MimeBodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(mensaje, "text/html");

            Multipart multipart = new MimeMultipart("related");
            multipart.addBodyPart(messageBodyPart);

            File f_logo = new File("C:/Dumps/CSC.jpg");
            if (f_logo.exists()) {
                String cid = "logo";
                MimeBodyPart imagePart = new MimeBodyPart();
                imagePart.attachFile("C:/Dumps/CSC.jpg");
                imagePart.setContentID("<" + cid + ">");
                imagePart.setDisposition(MimeBodyPart.INLINE);
                multipart.addBodyPart(imagePart);
            }

            //Se adjuntan los archivos al correo
            if (adjuntos != null && adjuntos.size() > 0) {
                for (String rutaAdjunto : adjuntos) {
                    messageBodyPart = new MimeBodyPart();
                    File f = new File(rutaAdjunto);
                    if (f.exists()) {
                        DataSource source = new FileDataSource(rutaAdjunto);
                        messageBodyPart.setDataHandler(new DataHandler(source));
                        messageBodyPart.setFileName(f.getName());
                        multipart.addBodyPart(messageBodyPart);
                    }
                }
            }

            //Se junta el mensaje y los archivos adjuntos
            message.setContent(multipart);

            boolean oK = this.transportSend(message);
            while (!oK) {
                oK = this.transportSend(message);
            }

        } catch (Exception e) {
            e.getMessage();
            e.toString();
            logError.error("Sales Reconciliation By AMEX (proMail.sendEmailAMEX) - Message: " + e.getMessage() + " Stacktrace: " + e.getMessage() + "**" + e.getStackTrace().toString());
            envioExitoso = false;
        }

        return envioExitoso;
    }
    
    public boolean enviaSalesAudit(String emisor, String asunto, List<String> receptores, List<String> Ccpy, String mensaje, String correoMask,IServerSession ss) {

        //Para medios de Pago
        boolean envioExitoso = true;

        IServerSession serverSession = ss;

        try {
            String usuario = correoMask; //Correo con el que saldra el email enviado ("from")
            //TEMPORAL
            //emisor = "rmayta@miatech.net"; 
            Properties props = System.getProperties();
            //Se define el servidor de correos
            props.put("mail.smtp.host", serverSession.getPropertySession().get("APP_SERVER_MAIL_HOST").toString());
            props.put("mail.smtp.port", serverSession.getPropertySession().get("APP_SERVER_MAIL_PASSWORD").toString());
            props.put("mail.smtp.starttls.enable", "true");
            //props.setProperty("mail.smtp.user", emisor);
            props.setProperty("mail.smtp.user", usuario);
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");

            //Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", "notificaciones123"); // Tener Clave del quien Envia    
            Authenticator auth = new SMTPAuthenticator("notificaciones@miatech.net", serverSession.getPropertySession().get("APP_SERVER_MAIL_PASSWORD").toString());
            //Authenticator auth = new SMTPAuthenticator(emisor, "rmDataCOM1"); // Tener Clave del quien Envia
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

            //Se junta el mensaje y los archivos adjuntos
            message.setContent(multipart);

            //Se env&amp;iacute;a el e-mail
            Transport.send(message);
        } catch (Exception e) {
            e.getMessage();
            e.toString();
            envioExitoso = false;
        }/* finally {
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
         }*/

        return envioExitoso;
    }

    public static void main(String[] args) {
        List<String> receptores = new ArrayList<String>(1);
        receptores.add("mayta2006@gmail.com");

        ProMail pm = new ProMail();
        pm.envia("vhidalgo@miatech.net", "IBM AS400 Test E-Mail", receptores, new ArrayList<String>(), "Este es un mensaje enviado desde IBM AS400 Server.", new ArrayList<String>(), "");
    }
}
