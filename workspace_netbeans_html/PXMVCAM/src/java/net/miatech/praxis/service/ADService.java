package net.miatech.praxis.service;

import javax.naming.*;
import javax.naming.directory.*;
import java.util.Hashtable;

public class ADService {
    
    private String ldapURL;
    private String dominio;
    
    // Constructor
    public ADService(String ldapURL, String dominio) {
        this.ldapURL = ldapURL;
        this.dominio = dominio;
    }
    
    // Método para autenticar usuario contra AD
    public boolean autenticar(String usuario, String password) {
        if (usuario == null || password == null || usuario.trim().isEmpty()) {
            return false;
        }
        
        usuario = usuario.trim();
        String principal = usuario + "@" + dominio;  // usuario@miatech.net
        
        Hashtable<String, String> env = new Hashtable<>();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, ldapURL);
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        env.put(Context.SECURITY_PRINCIPAL, principal);
        env.put(Context.SECURITY_CREDENTIALS, password);
        env.put("com.sun.jndi.ldap.connect.timeout", "5000");
        
        try {
            DirContext ctx = new InitialDirContext(env);
            System.out.println(" AD Autenticación CTX: " + ctx);  //SI FALLA ACÁ, SALTÁ AL CATCH/ ES DEPURACION 
            ctx.close();
            
            //System.out.println(" AD Autenticación exitosa: " + principal);//SOLO SI ÉXITO
            return true;
        } catch (AuthenticationException e) {
            System.out.println(" AD Error de credenciales: " + e);//CUANDO FALLA
            return false;
        } catch (NamingException e) {
            System.out.println(" AD Error de conexión: " + e);
            return false;
        }
    }
    //public String getUserInfo(String usuario, String password) {
    
    //return "Información del usuario: " + usuario + " (Autenticado vía Active Directory)";
//}
}
