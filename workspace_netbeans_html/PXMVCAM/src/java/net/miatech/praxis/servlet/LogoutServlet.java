package net.miatech.praxis.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LogoutServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        HttpSession session = request.getSession(false);
        
        if (session != null) {
            String adUser = (String) session.getAttribute("adUser");
            System.out.println("========================================");
            System.out.println(" Cerrando sesión");
            System.out.println("   Usuario AD: " + adUser);
            session.invalidate();
            System.out.println(" Sesión cerrada correctamente");
            System.out.println("========================================");
        }
        
        // Redirigir a la raíz (Spring manejará mostrar loginAD)
        response.sendRedirect(request.getContextPath() + "/");
    }
}