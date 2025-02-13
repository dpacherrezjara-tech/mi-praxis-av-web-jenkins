package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF137;

/**
 *
 * @author dvicente
 */
@Data
public class SPACR003Filter {
    private String IN_BANDOC,IN_DATECI,IN_TRANCI,IN_TIPOCON;
    List<MPF137> response = new ArrayList<>();
}
