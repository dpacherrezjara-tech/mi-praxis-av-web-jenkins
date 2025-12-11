/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.miatech.praxis.payment.response;

import java.util.ArrayList;
import java.util.List;
import net.miatech.praxis.payment.MPF091DTO;
import net.miatech.praxis.payment.MPF102DTO;

/**
 *
 * @author singa
 */
public class MPS419Response {

    public List<MPF102DTO> deposits = new ArrayList<>();
    public List<MPF091DTO> invoices = new ArrayList<>();
}
