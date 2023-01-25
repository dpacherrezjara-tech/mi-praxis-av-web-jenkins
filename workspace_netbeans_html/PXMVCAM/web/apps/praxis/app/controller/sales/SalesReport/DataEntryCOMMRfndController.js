/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryCOMMRfndController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCOMMRfndController',
    urlWin01: CONTEXTPATH + '/SalesReport',
    paramsCOMM: {},
    init: function (view) {
        var me = this;
        //console.log(this.view.params.vl_mda); 
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresGrids();
        this.getDataInputs();
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idRfndCOMM + '-det-gridDataRfndCOMM');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRfndFOP + '-store-gridRfndCOMM'
        });

        grid01.setStore(store01);
    },
    getDataInputs: function () {
        var me = this;
        var gridRfndCOMM = Ext.getCmp(prototype.idRfndCOMM + '-det-gridDataRfndCOMM');
        var gridaddRfndCOMM = Ext.getCmp(prototype.idRfndCOMM + '-gridaddRfndCOMM');
        var gridFopSave = Ext.getCmp( prototype.idRfndCOMM + '-gridRfndCOMMSave');
        switch (String(me.view.params.action)) {
            case 'CLOSED':
                gridFopSave.hide();
                gridaddRfndCOMM.hide();
                gridRfndCOMM.columns[5].setVisible(false);
                break;
            case 'OPEN':

                gridFopSave.show();
                gridaddRfndCOMM.show();
                gridRfndCOMM.columns[5].setVisible(true);
                break;

        }
        
        var p = me.view.params.params;
        var IN_AIRLIN = p.IN_AIRLIN;
        var IN_CIA = p.IN_CIA;
        var IN_FORMA = p.IN_FORMA;
        var IN_SERIE = p.IN_SERIE;
        var A713SEQ = p.A713SEQ;

        paramsCOMM = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1733SEQ: A713SEQ
        };
        Ext.Ajax.request({
            url: me.urlWin01 + '/loadTicket_COMMRfnd',
            method: 'POST',
            timeout: 60000000,
            params: paramsCOMM,
            beforerequest: Ext.getCmp(prototype.idRfndCOMM + '-winDataEntryRfndCOMM').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idRfndCOMM + '-det-gridDataRfndCOMM').getStore().loadData(res.lstTKT_COMM);
                Ext.getCmp(prototype.idRfndCOMM + '-winDataEntryRfndCOMM').unmask('Loading...', '');
            }
        });
    },
    OnRfndCOMMRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var p = me.view.params.params;
        var paramsGuardarCOMM = {};
        var rec = grid.getStore().getAt(rowIndex);
        global.Msg({
            msg: 'DELETE FOP?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {


                    if (rec.data.A1731CORRL !== '') {
                        paramsGuardarCOMM.IN_OPTION = "3";
                        paramsGuardarCOMM.IN_CIA = p.IN_CIA;
                        paramsGuardarCOMM.A1731FORMA = p.IN_FORMA;
                        paramsGuardarCOMM.A1731SERIE = p.IN_SERIE;
                        paramsGuardarCOMM.A1731SEQ = p.A713SEQ;
                        paramsGuardarCOMM.A1731CORRL = rec.data.A1733CORRL;
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRfndCOMM + '-det-gridDataRfndCOMM'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaDeleteEntryRfndCompleManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarCOMM)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DELETED') {
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
                    } else {
                        grid.getStore().removeAt(rowIndex);
                    }

                    //
                }
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
    onAddRfndCOMMClick: function (rec) {
        var paramsAddCOMM = {};
        paramsAddCOMM.A1733CCOM = "";
        paramsAddCOMM.A1733TIPO = "";
        paramsAddCOMM.A1733RATE = 0;
        paramsAddCOMM.A1733MCOM = Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue();
        paramsAddCOMM.A1733VCOM = 0;
        paramsAddCOMM.A1733CORRL = "";

        var grid01 = Ext.getCmp(prototype.idRfndCOMM + '-det-gridDataRfndCOMM');
        grid01.getStore().add(paramsAddCOMM);
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
    onSaveRfndCOMMClick: function (btn) {
        var me = this;
        var lstCOMMPrinci = {};
        var paramsGuardarCOMM = {};
        var p = me.view.params.params;
        if (me.validaRequiredFields()) {
            var lstCOMM = new Array();
            for (var i = 0; i < Ext.getCmp(prototype.idRfndCOMM + '-det-gridDataRfndCOMM').getStore().data.length; i++) {
                var bean = Ext.getCmp(prototype.idRfndCOMM + '-det-gridDataRfndCOMM').getStore().data.items[i].data;
                var BeanCOMM = {};
                BeanCOMM.A1733CCOM = Ext.String.trim(bean.A1733CCOM);
                BeanCOMM.A1733TIPO = Ext.String.trim(bean.A1733TIPO);
                BeanCOMM.A1733RATE = bean.A1733RATE;
                BeanCOMM.A1733MCOM = Ext.String.trim(bean.A1733MCOM);
                BeanCOMM.A1733VCOM = bean.A1733VCOM;
                BeanCOMM.A1733CORRL = Ext.String.trim(bean.A1733CORRL);
                lstCOMM.push(BeanCOMM);
            }
            lstCOMMPrinci.A1733 = lstCOMM;
            paramsGuardarCOMM.IN_CIA = p.IN_CIA;
            paramsGuardarCOMM.A1733FORMA = p.IN_FORMA;
            paramsGuardarCOMM.A1733SERIE = p.IN_SERIE;
            paramsGuardarCOMM.A1733SEQ = p.A713SEQ;
            paramsGuardarCOMM.A1733GRUPO = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblGroup').getValue());
            paramsGuardarCOMM.A1733IDFIL = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFileId').getValue());
            paramsGuardarCOMM.A1733TCAMB = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').getValue());

            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRfndCOMM + '-winDataEntryRfndCOMM'), {
                msg: 'Please Wait....'
            });
            mask.show();
            Ext.Ajax.request({
                url: me.urlWin01 + '/ProcesaInsertCommiManual/',
                timeout: 60000000,
                method: 'POST',
                params: {beanString: JSON.stringify(paramsGuardarCOMM),
                    beanlstCommi: JSON.stringify(lstCOMMPrinci)
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
        var grid03 = Ext.getCmp(prototype.idRfndCOMM + '-det-gridDataRfndCOMM');
        var regs = grid03.getStore().getCount();
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Commission');
            bvalida = false;
            return;
        } else {
            for (var o = 0; o < regs; o++) {
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1733TIPO')) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter type Commission');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1733TIPO')) !== 'CS' && Ext.String.trim(grid03.getStore().getAt(o).get('A1733TIPO')) !== 'CO') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The commission type must be CS OR CO');
                    bvalida = false;
                    return;
                }
                if (parseFloat(grid03.getStore().getAt(o).get('A1733RATE')) === 0 || isNaN(parseFloat(grid03.getStore().getAt(o).get('A1733RATE'))) === true) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter the exchange rate');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1733MCOM')) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter the currency');
                    bvalida = false;
                    return;

                }
                if (parseFloat(grid03.getStore().getAt(o).get('A1733VCOM')) === 0 || isNaN(parseFloat(grid03.getStore().getAt(o).get('A1733VCOM'))) === true) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter the Amount');
                    bvalida = false;
                    return;
                }
                
            }
        }
        return bvalida;
    }


});

