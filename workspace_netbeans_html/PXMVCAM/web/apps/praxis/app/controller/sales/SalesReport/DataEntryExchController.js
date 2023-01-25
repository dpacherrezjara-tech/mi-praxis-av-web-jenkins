/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryExchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryExchController',
    url: CONTEXTPATH + '/SalesReport',
    meDET: '',
    paramsDET: {},
    /**
     * Constructor
     */
    init: function(view) {
        meDET = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */

    afterRender: function() {
        this.getDataInputs();
    },
    getDataInputs: function() {
        var p = this.view.params;
        var bean = p.rec.data;
        var IN_AIRLIN = '139';
        var IN_CIA = p.A720CIAI;
        var IN_FORMA = p.A720FORMAI;
        var IN_SERIE = p.A720SERIEI;
        var IN_SEQ = p.A720SEQ;
        var IN_CIAEXCH = bean.A730CIA;
        var IN_FORMAEXCH = bean.DOCUMENTO.substr(0, 4);
        var IN_SERIEEXCH = bean.DOCUMENTO.substr(4, 6);
        paramsDET = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            IN_SEQ: IN_SEQ,
            IN_CIAEXCH: IN_CIAEXCH,
            IN_FORMAEXCH: IN_FORMAEXCH,
            IN_SERIEEXCH: IN_SERIEEXCH
        };
        Ext.Ajax.request({
            url: prototype.url + '/loadExchDataEntry',
            method: 'POST',
            timeout: 60000000,
            params: paramsDET,
            //beforerequest: Ext.getCmp(prototype.id + '-dataEntryExch').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstExch = res.lstExch;
                var lstExchGrilla = res.lstExchGrilla;
                meDET.setValues(lstExch, lstExchGrilla);
                // Ext.getCmp(prototype.id + '-dataEntryTkt').unmask('Loading...', '');
            }
        });
    },
    setValues: function(lstExch, lstEXCHGrilla) {
        var file;
        var fileGrilla;
        if (lstExch.length > 0) {
            file = lstExch[0];
            Ext.getCmp(prototype.id + '-det-lblCiaEXCH').setValue(file.A730CIAI);
            Ext.getCmp(prototype.id + '-det-lblDocumentoEXCH').setValue(file.A730FORMAI + file.A730SERIEI);
            Ext.getCmp(prototype.id + '-det-lblDigitoEXCH').setValue(file.A730DCHEQ);
            Ext.getCmp(prototype.id + '-det-lblTransactionEXCH').setValue(file.A730TRNCU);
            Ext.getCmp(prototype.id + '-det-lblDocTypeEXCH').setValue(file.A730TDOC);
            Ext.getCmp(prototype.id + '-det-lblConjuctionEXCH').setValue(file.A730FLAG);
            Ext.getCmp(prototype.id + '-det-lblBoletoEXCH').setValue(Ext.util.Format.number(file.A730NSEQ, '0,000'));
            Ext.getCmp(prototype.id + '-det-lblTotBoletoEXCH').setValue(Ext.util.Format.number(file.A730CTKTC, '0,000'));
            Ext.getCmp(prototype.id + '-det-lblIataEXCH').setValue(file.A730AGENTE);
            Ext.getCmp(prototype.id + '-det-lblTourCodeEXCH').setValue(file.A730CODIT);
            Ext.getCmp(prototype.id + '-det-lblFareCurEXCH').setValue(file.A730MONEDA);
            Ext.getCmp(prototype.id + '-det-lblEQVCurEXCH').setValue(file.A730MDAPAG);
            Ext.getCmp(prototype.id + '-det-lblDiscountCurEXCH').setValue("");//file.A730MDDS
            Ext.getCmp(prototype.id + '-det-lblQCurEXCH').setValue("");//file.A730MDATQ
            Ext.getCmp(prototype.id + '-det-lblCommCurEXCH').setValue(file.A730MDACOM);
            Ext.getCmp(prototype.id + '-det-lblOCommCurEXCH').setValue(file.A730MDACM);
            Ext.getCmp(prototype.id + '-det-lblYQCurEXCH').setValue(file.A730MDAYQ);
            Ext.getCmp(prototype.id + '-det-lblIVACurEXCH').setValue(file.A730MDAIV);
            Ext.getCmp(prototype.id + '-det-lblGroupEXCH').setValue(file.A730GRUPO);
            Ext.getCmp(prototype.id + '-det-lblFareEXCH').setValue(Ext.util.Format.number(file.A730TARIFA, '0,000.00'));
            Ext.getCmp(prototype.id + '-det-lblEQVEXCH').setValue(Ext.util.Format.number(file.A730TRFPAG, '0,000.00'));
            Ext.getCmp(prototype.id + '-det-lblDiscountEXCH').setValue(Ext.util.Format.number(0, '0,000.00'));//file.A730VDSCT
            Ext.getCmp(prototype.id + '-det-lblQEXCH').setValue(Ext.util.Format.number(0, '0,000.00'));//file.A730TQ
            Ext.getCmp(prototype.id + '-det-lblCommEXCH').setValue(Ext.util.Format.number(file.A730COMMIS, '0,000.00'));
            Ext.getCmp(prototype.id + '-det-lblOCommEXCH').setValue(Ext.util.Format.number(file.A730TSCM, '0,000.00'));
            Ext.getCmp(prototype.id + '-det-lblYQEXCH').setValue(Ext.util.Format.number(file.A730TYQ, '0,000.00'));
            Ext.getCmp(prototype.id + '-det-lblIVAEXCH').setValue(Ext.util.Format.number(file.A730TIV, '0,000.00'));
            if (file.A730ORIG === 'A')
                file.A730ORIG = 'ARC';
            if (file.A730ORIG === 'B')
                file.A730ORIG = 'BSP';
            if (file.A730ORIG === 'S')
                file.A730ORIG = 'ASR';
            Ext.getCmp(prototype.id + '-det-lblSourceEXCH').setValue(file.A730ORIG + '-' + file.A730PAIS);
            Ext.getCmp(prototype.id + '-det-lblIssueDateEXCH').setValue(file.A730FECVTA);
            Ext.getCmp(prototype.id + '-det-lblRficEXCH').setValue(file.A730RFIC);
            Ext.getCmp(prototype.id + '-det-lblRfisEXCH').setValue(file.A730RFIS);
            Ext.getCmp(prototype.id + '-det-lblFare2CurEXCH').setValue(file.A730MDAFA);
            Ext.getCmp(prototype.id + '-det-lblFare2EXCH').setValue(Ext.util.Format.number(file.A730FARE, '0,000.00'));
            Ext.getCmp(prototype.id + '-det-lblFareRvCurEXCH').setValue(file.A730MDARV);
            Ext.getCmp(prototype.id + '-det-lblFareRvEXCH').setValue(Ext.util.Format.number(file.A730FARERV, '0,000.00'));
            Ext.getCmp(prototype.id + '-det-lblTicket1').getEl().update(file.A730CIAI + file.A730FORMAI + file.A730SERIEI);
            Ext.getCmp(prototype.id + '-det-lblCpn1_1').setValue(file.A730CUPON1);
            Ext.getCmp(prototype.id + '-det-lblCpn2_1').setValue(file.A730CUPON2);
            Ext.getCmp(prototype.id + '-det-lblCpn3_1').setValue(file.A730CUPON3);
            Ext.getCmp(prototype.id + '-det-lblCpn4_1').setValue(file.A730CUPON4);
            if (lstEXCHGrilla.length > 0) {
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstEXCHGrilla,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-det-gridDetCpnEXCH').bindStore(storeData);

                fileGrilla = lstEXCHGrilla[0];
                Ext.getCmp(prototype.id + '-det-lblTotalCpnCurEXCH').setValue(fileGrilla.A730MONREG);
                Ext.getCmp(prototype.id + '-det-lblTotalQCurEXCH').setValue(fileGrilla.A730MONREG);

                var totalCpn = 0.00;
                var totalQ = 0.00;
                var totalComm = 0.00;
                var totalOComm = 0.00;
                var totalYQ = 0.00;
                var totalIVA = 0.00;
                var ticket = fileGrilla.TICKET;
                for (var i = 0; i < lstEXCHGrilla.length; i++) {
                    totalCpn = totalCpn + lstEXCHGrilla[i].CPN;
                    totalQ = totalQ + lstEXCHGrilla[i].Q;
                    totalComm =  totalComm + lstEXCHGrilla[i].COMM;
                    totalOComm =  totalOComm + lstEXCHGrilla[i].OCOMM;
                    totalYQ =  totalYQ + lstEXCHGrilla[i].YQ;
                    totalIVA =  totalIVA + lstEXCHGrilla[i].IVA;
                    if(lstEXCHGrilla[i].TICKET !== ticket){
                        ticket = lstEXCHGrilla[i].TICKET;
                        Ext.getCmp(prototype.id + '-det-lblTicket2').show();
                        Ext.getCmp(prototype.id + '-det-lblCpn1_2').show();
                        Ext.getCmp(prototype.id + '-det-lblCpn2_2').show();
                        Ext.getCmp(prototype.id + '-det-lblCpn3_2').show();
                        Ext.getCmp(prototype.id + '-det-lblCpn4_2').show();
                        Ext.getCmp(prototype.id + '-det-lblTicket2').getEl().update(ticket);
                        Ext.getCmp(prototype.id + '-det-lblCpn1_2').setValue(lstEXCHGrilla[i].A730CUPON1);
                        Ext.getCmp(prototype.id + '-det-lblCpn2_2').setValue(lstEXCHGrilla[i].A730CUPON2);
                        Ext.getCmp(prototype.id + '-det-lblCpn3_2').setValue(lstEXCHGrilla[i].A730CUPON3);
                        Ext.getCmp(prototype.id + '-det-lblCpn4_2').setValue(lstEXCHGrilla[i].A730CUPON4);
                    }
                }
                Ext.getCmp(prototype.id + '-det-lblTotalCpnEXCH').setValue(Ext.util.Format.number(totalCpn, '0,000.00'));
                Ext.getCmp(prototype.id + '-det-lblTotalQEXCH').setValue(Ext.util.Format.number(totalQ, '0,000.00'));
                Ext.getCmp(prototype.id + '-det-lblTotalCOMEXCH').setValue(Ext.util.Format.number(totalComm, '0,000.00'));
                Ext.getCmp(prototype.id + '-det-lblTotalOVERCOMEXCH').setValue(Ext.util.Format.number(totalOComm, '0,000.00'));
                Ext.getCmp(prototype.id + '-det-lblTotalYQEXCH').setValue(Ext.util.Format.number(totalYQ, '0,000.00'));
                Ext.getCmp(prototype.id + '-det-lblTotalIVAEXCH').setValue(Ext.util.Format.number(totalIVA, '0,000.00'));

            }
            Ext.getCmp(prototype.id + '-dataEntryExch').unmask('Loading...', '');
        }
    }
});


