/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.logic.refund;


import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.refund.RefundInputsDAO;
import net.miatech.praxis.refund.A2745;

/**
 *
 * @author ftorres
 */
public class RefundInputsLogic {

    private final RefundInputsDAO rfndInput = new RefundInputsDAO();

    public void setSession(IServerSession ss) {
        rfndInput.setSession(ss);
    }

    public List<A2745> obtenerLstControlV1(A2745 filter) throws Exception {
        return this.rfndInput.obtenerLstControlV1(filter);
    }

    public List<A2745> getListTktDetail(A2745 filter) throws Exception {
        return this.rfndInput.getListTktDetail(filter);
    }

    public List<A2745> getListTktDetailAll(A2745 filter) throws Exception {
        return this.rfndInput.getListTktDetailAll(filter);
    }

    //CARGA
    public String verificarCrearRegistros() {
        return this.rfndInput.verificarCrearRegistros();
    }

    public String verificarArchivoYaCargado(String fechaActual, String filename) {
        return this.rfndInput.verificarArchivoYaCargado(fechaActual, filename);
    }

    public String obtenerSiguienteSecuencia(String fechaActual) {
        return this.rfndInput.obtenerSiguienteSecuencia(fechaActual);
    }

    public String insertA5003(A2745 input, String siguienteSecuencia, String fechaFilename) {
        return this.rfndInput.insertA5003(input, siguienteSecuencia, fechaFilename);
    }

    public String insertGoodA5003(A2745 input, String siguienteSecuencia, String fechaFilename) {
        return this.rfndInput.insertGoodA5003(input, siguienteSecuencia, fechaFilename);
    }

    public String insertAndUpdateA2270_A2359(
            int totalLeidos,
            int totalEscritos,
            int totalErrores,
            String fechaSimulada,
            String usuario,
            String hora
    ) {
        return this.rfndInput.insertAndUpdateA2270_A2359(
                totalLeidos, totalEscritos, totalErrores, fechaSimulada, usuario, hora
        );
    }

    public String SQP05572(String fechaActual) {
        return this.rfndInput.SQP05572(fechaActual);
    }

}
