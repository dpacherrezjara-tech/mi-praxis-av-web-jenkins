package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SPHRP004Filter {
    private String IN_PRDAF,IN_PRDAT;
    List<HeadersReport> response = new ArrayList<>();
}
