/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryAdmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryAdmController',
    url: CONTEXTPATH + '/SalesReport',
    meDET: '',
    seq: '',
    exch: '',
    locCurr: '',
    paramsDET: {},
    /**
     * Constructor
     */
    init: function(view) {
        meDET = this;
        prototype.ProrrateoNew = {
            id: 'ScrProrrateoNewForm',
            url: CONTEXTPATH+'/ScrProrrateoNew'
        };
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
        var IN_CIA = bean.A714CIA;
        var IN_FORMA = bean.DOCUMENTO.substr(0, 4);
        var IN_SERIE = bean.DOCUMENTO.substr(4, 6);
        var A714SEQ = bean.A714SEQ;
        meDET.exch = p.exchrate;//Ext.getCmp(prototype.id + '-de-lblExchangeRate').getValue();
        meDET.locCurr = p.locCurr;//Ext.getCmp(prototype.id + '-de-lblCurrency').getValue();
        seq = A714SEQ;
        paramsDET = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A714SEQ: A714SEQ
        };
        Ext.Ajax.request({
            url: prototype.url + '/loadTicketDataEntryAdm',
            //url: prototype.url + '/loadTicketDataEntryRfnd',
            method: 'POST',
            timeout: 60000000,
            params: paramsDET,
            beforerequest: Ext.getCmp(prototype.idAdm + '-dataEntryAdm').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstMEMO = res.lstMEMO;
                var file;
                if (lstMEMO.length > 0) {
                    file = lstMEMO[0];
                    Ext.getCmp(prototype.idAdm + '-det-lblCia').setValue(file.A714CIA);
                    Ext.getCmp(prototype.idAdm + '-det-lblDocumento').setValue(file.A714FORMA + file.A714SERIE);
                    Ext.getCmp(prototype.idAdm + '-det-lblDigito').setValue(file.A714DCHEQ);
                    Ext.getCmp(prototype.idAdm + '-det-lblTransaction').setValue(file.A714TRNCU);
                    Ext.getCmp(prototype.idAdm + '-det-lblDocType').setValue(file.A714TDOC);
                    Ext.getCmp(prototype.idAdm + '-det-lblExchangeRate').setValue(meDET.exch);
                    Ext.getCmp(prototype.idAdm + '-det-lblLocalCur').setValue(meDET.locCurr);
                    Ext.getCmp(prototype.idAdm + '-det-lblGroup').setValue(file.A714GRUPO);
                    if (file.ERRORDESC !== '' && file.A714STAT !== '1' && file.A714STAT !== '4') {
                        Ext.getCmp(prototype.idAdm + '-det-lblError').setText(file.ERRORDESC);
                    } else {
                        Ext.getCmp(prototype.idAdm + '-det-lblError').setText('');
                    }
                    if (file.A714ORIG === 'A')
                        file.A714ORIG = 'ARC';
                    if (file.A714ORIG === 'B')
                        file.A714ORIG = 'BSP';
                    if (file.A714ORIG === 'S')
                        file.A714ORIG = 'ASR';
                    if (file.A714ORIG === 'M')
                        file.A714ORIG = 'MAN';
                    Ext.getCmp(prototype.idAdm + '-det-lblSource').setValue(file.A714ORIG + '-' + file.A714PAIS);
                    Ext.getCmp(prototype.idAdm + '-det-lblFileId').setValue(file.A714IDFIL);
                    Ext.getCmp(prototype.idAdm + '-det-lblIssueDate').setValue(file.A714FECVTA);
                    Ext.getCmp(prototype.idAdm + '-det-lblIata').setValue(file.A714AGENTE);
                    Ext.getCmp(prototype.idAdm + '-det-lblSaleCity').setValue(file.A714CIUVTA);
                    Ext.getCmp(prototype.idAdm + '-det-lblSalePais').setValue(file.A714PAIVTA);
                    Ext.getCmp(prototype.idAdm + '-det-lblFOPCode').setValue(file.A714CFOP);
                    Ext.getCmp(prototype.idAdm + '-det-lblFOPCur').setValue(file.A714MDAFP);
                    Ext.getCmp(prototype.idAdm + '-det-lblFOP').setValue(Ext.util.Format.number(file.A714VFOP, '0,000.00'));
                    Ext.getCmp(prototype.idAdm + '-det-lblRemmittanceCur').setValue(file.A714MNETR);
                    Ext.getCmp(prototype.idAdm + '-det-lblRemmittance').setValue(Ext.util.Format.number(file.A714VNETR, '0,000.00'));
                    Ext.getCmp(prototype.idAdm + '-det-lblFareCur').setValue(file.A714MDAFA);
                    Ext.getCmp(prototype.idAdm + '-det-lblFare').setValue(Ext.util.Format.number(file.A714FARE, '0,000.00'));
                    Ext.getCmp(prototype.idAdm + '-det-lblTAXCode').setValue(file.A714CTAX);
                    Ext.getCmp(prototype.idAdm + '-det-lblTAXCur').setValue(file.A714MDATX);
                    Ext.getCmp(prototype.idAdm + '-det-lblTAX').setValue(Ext.util.Format.number(file.A714TTAX, '0,000.00'));
                    Ext.getCmp(prototype.idAdm + '-det-lblCOMMISIONCur1').setValue(file.A714MDACOM);
                    Ext.getCmp(prototype.idAdm + '-det-lblCOMMISION1').setValue(Ext.util.Format.number(file.A714COMMIS, '0,000.00'));
                    Ext.getCmp(prototype.idAdm + '-det-lblCOMMISIONCur2').setValue(file.A714MDACM);
                    Ext.getCmp(prototype.idAdm + '-det-lblCOMMISION2').setValue(Ext.util.Format.number(file.A714TSCM, '0,000.00'));
                    Ext.getCmp(prototype.idAdm + '-det-lblTAXCOMMISSIONCur').setValue(file.A714MDATC);
                    Ext.getCmp(prototype.idAdm + '-det-lblTAXCOMMISSION').setValue(Ext.util.Format.number(file.A714TTXC, '0,000.00'));
                }
                Ext.getCmp(prototype.idAdm + '-dataEntryAdm').unmask('Loading...', '');
            }
        });
    },
    onDelivery: function () {
        var bean = {};
	bean.TDNR = Ext.getCmp(prototype.idAdm + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idAdm + '-det-lblDocumento').getValue().trim();
	bean.FUENTE = Ext.getCmp(prototype.idAdm + '-det-lblSource').getValue().trim().substr(0,3);
	if(bean.TDNR !== '' && bean.FUENTE !== ''){
            bean.A720TKVOID = '';//this.gloA720TKVOID;
            this.searchDelivery(bean);
	}
    },
    searchDelivery: function (bean) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDeliveryMEMO',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var texto = res.strTextoBSP;
                    if(texto !== ''){
                        Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                            id: 'CtrlDeliveryOrigForm',
                            params: {
                                strTexto: texto,
                                strVoid: ''//me1.gloA720TKVOID
                            }
                        }).show();
                    }
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
});