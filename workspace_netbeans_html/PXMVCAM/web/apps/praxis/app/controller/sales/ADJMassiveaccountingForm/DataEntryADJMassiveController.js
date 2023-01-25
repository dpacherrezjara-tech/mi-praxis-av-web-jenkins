/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ADJMassiveaccountingForm.DataEntryADJMassiveController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryADJMassiveController',
    paramsDE: {},
    urlWin01:  CONTEXTPATH + '/ADJMassiveaccountingForm',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;

        me.setStores();
        me.onLoadDataQuery();
        me.onLoadDataLE();

    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idDataEntryADJMassive + '-de-gridDataDetail');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDataEntryADJMassive + '-store-grid01'
        });
        grid01.setStore(store01);
    },
    onLoadDataQuery: function () {
        var CmbTtraxedt = Ext.getCmp(prototype.idDataEntryADJMassive + '-CmbTtrax');

        CmbTtraxedt.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": ""},
                {"code": "SALE", "name": "SALE"},
                {"code": "EXCH", "name": "EXCH"},
                {"code": "RFND", "name": "RFND"},
                {"code": "FLWN", "name": "FLWN"},
                {"code": "EXCP", "name": "EXCP"},
                {"code": "RFCP", "name": "RFCP"},
                {"code": "IXP", "name": "IXP"},
                {"code": "DISC", "name": "DISC"},
                {"code": "IXC", "name": "IXC OAL"},
                {"code": "EMFN", "name": "EMD-FLOWN"}
            ]
        }));


    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    onLoadDataLE: function () {
        var me = this;
        var CmbTtrax = '';
        rec = me.view.params.rec;
           me.paramsDE.A3344CIA= rec.data.A3344CIA;
                 me.paramsDE.A3344FORMA= rec.data.A3344FORMA;
                 me.paramsDE.A3344SERIE= rec.data.A3344SERIE;
                 me.paramsDE.A3344SEQ= rec.data.A3344SEQ;
                 me.paramsDE.A3344CPN= rec.data.A3344CPN;
                 me.paramsDE.A3344TNC =rec.data.A3344TNC;
                 me.paramsDE.A3344CRRL= rec.data.A3344CRRL;
                 me.paramsDE.A3344NARCH= rec.data.A3344NARCH;
        Ext.getCmp(prototype.idDataEntryADJMassive + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/ListAdjmassive/',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(me.paramsDE)
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idDataEntryADJMassive + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idDataEntryADJMassive + '-de-gridDataDetail').getStore().removeAll();
                Ext.getCmp(prototype.idDataEntryADJMassive + '-de-gridDataDetail').getStore().loadData(res.data);
                if (res.data.length > 0) {

                    //
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-CmbTtrax').setValue(Ext.String.trim(res.data[0].A3344TNC));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-txtCia').setValue(Ext.String.trim(res.data[0].A3344CIA));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-txtFrmaSerie').setValue(Ext.String.trim(rec.data.A3344TKT));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-txtSeq').setValue(Ext.String.trim(rec.data.A3344SEQ));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-txtCpnx').setValue(Ext.String.trim(rec.data.A3344CPN));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-txtAffectation').setValue(Ext.String.trim(rec.data.A3344IATAU));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-txtCrtBy').setValue(Ext.String.trim(rec.data.A3344USRIN));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-de-cmbTYPEUSE').setValue(Ext.String.trim(rec.data.A3344ESTTR));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-de-cmbTYUSEASS').setValue(Ext.String.trim(rec.data.A3344TKTVO));
                    //
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-de-lblTtarjeta').setValue(Ext.String.trim(res.data[0].A2024TTARJ));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-de-lblNtarjeta').setValue(Ext.String.trim(res.data[0].A2024NTARJ));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-de-lblFsale').setValue(Ext.String.trim(res.data[0].A2024RFIC));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-de-lblIATA').setValue(Ext.String.trim(res.data[0].A2024RFIS));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-co-TKTREFE').setValue(Ext.String.trim(res.data[0].A3344TKTAS));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-co-TKTSEQ').setValue(Ext.String.trim(res.data[0].A3344ASSEQ));
                    //
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-de-label-lblAmount').setValue(Ext.util.Format.number(res.data[0].A3344VLTAX, '0,000.00'));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-de-label-lblCurrency').setValue(Ext.String.trim(res.data[0].A3344MDA));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-co-label-lblAmount').setValue(Ext.util.Format.number(res.data[0].A3344VLTAR, '0,000.00'));
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-co-label-lblCurrency').setValue('USD');
                    Ext.getCmp(prototype.idDataEntryADJMassive + '-txaReference1').setValue(Ext.String.trim(res.data[0].A3344DESCR));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.idDataEntryADJMassive + '-txaReference1',
                        html: '' + Ext.String.trim(res.data[0].A3344DESCR)
                    });

                } else {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                }



            }
        });

    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },

    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER || e.getKey() === e.TAB) {

        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }





});

