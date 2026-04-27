/*package net.miatech.praxis.servlet;

import net.miatech.praxis.service.ADService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginServlet extends HttpServlet {
    
    private ADService adService;
    
    @Override
    public void init() throws ServletException {
        String ldapURL = "ldap://10.0.0.1:389";
        String dominio = "miatech.net";
        adService = new ADService(ldapURL, dominio);
        System.out.println("LoginServlet iniciado - AD: " + ldapURL);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        System.out.println("Validando AD para: " + username);
        
        if (username == null || password == null || username.trim().isEmpty()) {
            request.setAttribute("error", "Usuario y contraseña son obligatorios");
            request.getRequestDispatcher("/loginAD.jsp").forward(request, response);
            return;
        }
        
        boolean autenticado = adService.autenticar(username.trim(), password);
        
        if (autenticado) {
            HttpSession session = request.getSession();
            session.setAttribute("adValidated", true);
            session.setAttribute("adUser", username);
            System.out.println("AD validado correctamente: " + username);
            response.sendRedirect(request.getContextPath() + "/");
        } else {
            request.setAttribute("error", "Usuario o contraseña de Active Directory incorrectos");
            request.getRequestDispatcher("/loginAD.jsp").forward(request, response);
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.sendRedirect(request.getContextPath() + "/loginAD.jsp");
    }
   
}*/
