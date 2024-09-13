package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.A2281;
import net.miatech.praxis.payment.entities.A4451;
import net.miatech.praxis.payment.entities.A4451PK;

/**
 *
 * @author dvicente
 */
@Data
public class SPMC001Filter {
    List<A4451PK> PROCESADORES = new ArrayList<>();
    List<A4451PK> CIAS = new ArrayList<>();
    List<A4451PK> PAISES = new ArrayList<>();
    List<A4451PK> MONEDAS = new ArrayList<>();
    List<A4451> CODPRO = new ArrayList<>();
    List<A2281> CODEBANK = new ArrayList<>();
}
