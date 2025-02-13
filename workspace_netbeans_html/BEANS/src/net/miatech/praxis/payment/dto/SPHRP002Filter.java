package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import net.miatech.praxis.payment.entities.MPF134;
import net.miatech.praxis.payment.entities.MPF137;
import net.miatech.praxis.payment.entities.MPF140;
import net.miatech.praxis.payment.entities.MPF141;

/**
 *
 * @author dvicente
 */
@Data
public class SPHRP002Filter {
    private String IN_IDCONT;
    List<MPF134> header = new ArrayList<>();
    List<MPF141> files = new ArrayList<>();
    List<MPF140> bandocs = new ArrayList<>();
    List<MPF137> rejections = new ArrayList<>();
}
