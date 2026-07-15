package net.miatech.praxis.payment;

/**
 * Payload for MPS735 (CargoGuide Data Entry — manual reconciliation MPF295 vs MPF287).
 * A dedicated class instead of reusing MPF295Filter: several field names here
 * (e.g. IN_ADATE) refer to the MPF287 side and would collide in meaning with
 * the same field name already used for MPF295 searches in MPF295Filter.
 */
public class MPF295ReconcilePayload {

    // MPF295 (pago) — llave suficiente para ubicar el registro exacto
    public String IN_SFILE    = "";
    public String IN_SCOUNTRY = "";
    public String IN_NPAGE    = "";
    public String IN_SEQ      = "";
    public double IN_MONTO    = 0;

    // MPF287 (extracto) — llave suficiente para ubicar el movimiento exacto
    public String IN_BANDOC = "";
    public String IN_ADATE  = "";
    public String IN_TEXTO  = "";
    public double IN_NETO   = 0;

    public String IN_CCUST = ""; // se fija del lado servidor desde la sesion, no lo envia el cliente
}
