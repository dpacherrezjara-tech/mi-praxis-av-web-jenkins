/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryFareCalcRfndController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryFareCalcRfndController',
    urlWin01: CONTEXTPATH + '/SalesReport',
    FareCalc: {},
    vl_A1735CORRL: '',
    init: function (view) {
        var me = this;
        //console.log(this.view.params.vl_mda); 
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.getDataInputs();
    },
    getDataInputs: function () {
        var me = this;

        var gridFareCalcSave = Ext.getCmp(prototype.idRfndFareCalc + '-gridFareCalcSave');
        switch (String(me.view.params.action)) {
            case 'CLOSED':
                gridFareCalcSave.hide();
                break;
            case 'OPEN':

                gridFareCalcSave.show();
                break;

        }
        var p =  me.view.params.params;
        var IN_AIRLIN = p.IN_AIRLIN;
        var IN_CIA = p.IN_CIA;
        var IN_FORMA = p.IN_FORMA;
        var IN_SERIE = p.IN_SERIE;
        var A713SEQ = p.A713SEQ;
        FareCalc = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1735SEQ: A713SEQ
        };
        console.log(FareCalc);
        Ext.Ajax.request({
            url: me.urlWin01 + '/loadTicket_FareCalcRfnd',
            method: 'POST',
            timeout: 60000000,
            params: FareCalc,
            beforerequest: Ext.getCmp(prototype.idRfndFareCalc + '-winDataEntryFareCalcRfnd').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTKT_FC = res.lstTKT_FC;
                var file;
                if (lstTKT_FC.length > 0) {
                    var strFC = '';
                    for (var i = 0; i < lstTKT_FC.length; i++) {
                        file = lstTKT_FC[i];
                        strFC += file.A1735FRCA;
                    }
                    Ext.getCmp(prototype.idRfndFareCalc + '-det-TktFareCalc').setValue(strFC);
                    me.vl_A1735CORRL=lstTKT_FC[0].A1735CORRL;
                }
                Ext.getCmp(prototype.idRfndFareCalc + '-winDataEntryFareCalcRfnd').unmask('Loading...', '');
            }
        });
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onAmountRenderer: function (field, newValue, oldValue) {
        field.setValue(Ext.util.Format.number(newValue, '0,000.00'));
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    onSaveFareCalcClick: function (btn) {
        var me = this;
        var paramsGuardarFareCalcRfnd = {};
        var p = me.view.params.params;
        if (me.validaRequiredFields()) {

            paramsGuardarFareCalcRfnd.IN_CIA = p.IN_CIA;
            paramsGuardarFareCalcRfnd.A1735FORMA = p.IN_FORMA;
            paramsGuardarFareCalcRfnd.A1735SERIE = p.IN_SERIE;
            paramsGuardarFareCalcRfnd.A1735SEQ = p.A713SEQ;
            paramsGuardarFareCalcRfnd.A1735GRUPO = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblGroup').getValue());
            paramsGuardarFareCalcRfnd.A1735IDFIL = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFileId').getValue());
            paramsGuardarFareCalcRfnd.A1735FRCA = Ext.String.trim(Ext.getCmp(prototype.idRfndFareCalc + '-det-TktFareCalc').getValue());
           paramsGuardarFareCalcRfnd.A1735CORRL = me.vl_A1735CORRL;

            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRfndFareCalc + '-winDataEntryFareCalcRfnd'), {
                msg: 'Please Wait....'
            });
            mask.show();
            Ext.Ajax.request({
                url: me.urlWin01 + '/ProcesaInsertFareCalcRfnd/',
                timeout: 60000000,
                method: 'POST',
                params: {beanString: JSON.stringify(paramsGuardarFareCalcRfnd)
                },
                success: function (response, options) {
                    mask.hide();
                    var res = Ext.JSON.decode(response.responseText);
                    var vp_icon = 0;
                    if (res.data === 'RECORD INSERTED') {
                        vp_icon = 1;
                    }
                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                            if (vp_icon === 1) {
                                me.getDataInputs();
                                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').getController().cargarTotales();
                            }


                        }});
                }
            });


        }
    },
    validaRequiredFields: function () {
        var bvalida = true;
        
        if (Ext.String.trim(Ext.getCmp(prototype.idRfndFareCalc + '-det-TktFareCalc').getValue()) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must enter FareCalc');
            bvalida = false;
            return;
        }
       /* if (Ext.String.trim(Ext.getCmp(prototype.idRfndFareCalc + '-det-TktFareCalc').getValue()).length > 87) {
            Ext.Msg.alert('.: PRAXIS :.', 'The FareCalc must have 87 characters');
            bvalida = false;
            return;
        }*/



        return bvalida;
    }


});

