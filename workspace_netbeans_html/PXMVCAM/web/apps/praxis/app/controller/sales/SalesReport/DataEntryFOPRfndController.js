/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryFOPRfndController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryFOPController',
    urlWin01: CONTEXTPATH + '/SalesReport',
    paramsFOP: {},
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
        var grid01 = Ext.getCmp(prototype.idRfndFOP + '-det-gridDataTktFOP');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRfndFOP + '-store-gridTktFOP'
        });

        grid01.setStore(store01);
    },
    getDataInputs: function () {
        var me = this;
        var gridDataTktFOP = Ext.getCmp(prototype.idRfndFOP + '-det-gridDataTktFOP');
        var gridFopSave = Ext.getCmp(prototype.idRfndFOP + '-gridFopSave');
        var gridFopADD = Ext.getCmp(prototype.idRfndFOP + '-gridFopADD');
        switch (String(me.view.params.action)) {
            case 'CLOSED':
                gridFopSave.hide();
                gridFopADD.hide();
                gridDataTktFOP.columns[7].setVisible(false);
                break;
            case 'OPEN':

                gridFopSave.show();
                gridFopADD.show();
                gridDataTktFOP.columns[7].setVisible(true);
                break;

        }
        
        
        var p = me.view.params.params;
        var IN_AIRLIN = p.IN_AIRLIN;
        var IN_CIA = p.IN_CIA;
        var IN_FORMA = p.IN_FORMA;
        var IN_SERIE = p.IN_SERIE;
        var A720SEQ = p.A713SEQ;


        paramsFOP = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1731SEQ: A720SEQ
        };
        Ext.Ajax.request({
            url: me.urlWin01 + '/loadTicket_FOPRfnd',
            method: 'POST',
            timeout: 60000000,
            params: paramsFOP,
            beforerequest: Ext.getCmp(prototype.idRfndFOP + '-winDataEntryFOPRfnd').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idRfndFOP + '-det-gridDataTktFOP').getStore().loadData(res.lstTKT_FOP);
                Ext.getCmp(prototype.idRfndFOP + '-winDataEntryFOPRfnd').unmask('Loading...', '');
            }
        });
    },
    OnFopRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var p = me.view.params.params;
        var paramsGuardarFOP = {};
        var rec = grid.getStore().getAt(rowIndex);
        global.Msg({
            msg: 'DELETE FOP?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {


                    if (rec.data.A1731CORRL !== '') {
                        paramsGuardarFOP.IN_OPTION = "1";
                        paramsGuardarFOP.IN_CIA = p.IN_CIA;
                        paramsGuardarFOP.A1731FORMA = p.IN_FORMA;
                        paramsGuardarFOP.A1731SERIE = p.IN_SERIE;
                        paramsGuardarFOP.A1731SEQ = p.A713SEQ;
                        paramsGuardarFOP.A1731CORRL = rec.data.A1731CORRL;
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRfndFOP + '-winDataEntryFOPRfnd'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaDeleteEntryRfndCompleManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarFOP)},
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
    onAddFopClick: function (rec) {
        //var paramsFOP: {},
        var paramsAddFOP = {};
        paramsAddFOP.A1731CFOP = "";
        //paramsAddFOP.A1731TFOP = "";
        paramsAddFOP.A1731TTARJ = "";
        //paramsAddFOP.A1731TCNTR = ""; eliminado por jmmg
        paramsAddFOP.A1731VFOP = 0;
        paramsAddFOP.A1731MFOP = Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue();
        //paramsAddFOP.A1731VFOPR = 0; eliminado por jmmg
        //paramsAddFOP.A1731MFOPR = ""; eliminado por jmmg
        paramsAddFOP.A1731NREF = "";
        paramsAddFOP.A1731FEXP = "";
        paramsAddFOP.A1731CAPL = ""; 
       // paramsAddFOP.A1731NFAC = "";eliminado por jmmg
        //paramsAddFOP.A1731FFAC = ""; eliminado por jmmg
        //paramsAddFOP.A1731VFAC = 0; eliminado por jmmg
        //paramsAddFOP.A1731ECCB = ""; eliminado por jmmg
        paramsAddFOP.A1731EXPC = "";
        paramsAddFOP.A1731REFN = "";
        paramsAddFOP.A1731CORRL = "";

        //paramsAddFOP.A1731MNETR = "";
        //paramsAddFOP.A1731VNETR = 0;

        var grid01 = Ext.getCmp(prototype.idRfndFOP + '-det-gridDataTktFOP');
        grid01.getStore().add(paramsAddFOP);
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
    onSaveFopClick: function (btn) {
        var me = this;
        var lstFopPrinci =  {};
        var paramsGuardarFOP = {};
        var p = me.view.params.params;
        if (me.validaRequiredFields()) {
            var lstFop = new Array();
            for (var i = 0; i < Ext.getCmp(prototype.idRfndFOP + '-det-gridDataTktFOP').getStore().data.length; i++) {
                var bean = Ext.getCmp(prototype.idRfndFOP + '-det-gridDataTktFOP').getStore().data.items[i].data;
                var BeanFOP = {};
                BeanFOP.A1731CFOP = bean.A1731CFOP;
                BeanFOP.A1731TTARJ = bean.A1731TTARJ;
                //BeanFOP.A1731TCNTR = bean.A1731TCNTR;
                BeanFOP.A1731VFOP = bean.A1731VFOP;
                BeanFOP.A1731MFOP = bean.A1731MFOP;
                //BeanFOP.A1731VFOPR = bean.A1731VFOPR;
                //BeanFOP.A1731MFOPR = bean.A1731MFOPR;
                BeanFOP.A1731NREF = bean.A1731NREF;
                BeanFOP.A1731FEXP = bean.A1731FEXP;
                BeanFOP.A1731CAPL = bean.A1731CAPL;
                //BeanFOP.A1731NFAC = bean.A1731NFAC;
                //BeanFOP.A1731FFAC = bean.A1731FFAC;
                //BeanFOP.A1731VFAC = bean.A1731VFAC;
                //BeanFOP.A1731ECCB = bean.A1731ECCB;
                BeanFOP.A1731EXPC = bean.A1731EXPC;
                BeanFOP.A1731REFN = bean.A1731REFN;
                BeanFOP.A1731CORRL = bean.A1731CORRL;
                lstFop.push(BeanFOP);
            }
           
            
            lstFopPrinci.A1731 = lstFop;
            paramsGuardarFOP.IN_CIA = p.IN_CIA;
            paramsGuardarFOP.A1731FORMA = p.IN_FORMA;
            paramsGuardarFOP.A1731SERIE = p.IN_SERIE;
            paramsGuardarFOP.A1731SEQ = p.A713SEQ;
            paramsGuardarFOP.A1731GRUPO = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblGroup').getValue());
            paramsGuardarFOP.A1731IDFIL = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFileId').getValue());
            paramsGuardarFOP.A1731TCAMB = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').getValue());

            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRfndFOP + '-winDataEntryFOPRfnd'), {
                msg: 'Please Wait....'
            });
            mask.show();
            console.log(JSON.stringify(lstFopPrinci));
            Ext.Ajax.request({
                url: me.urlWin01 + '/ProcesaInsertFopManual/',
                timeout: 60000000,
                method: 'POST',
                params: {beanString: JSON.stringify(paramsGuardarFOP),
                    beanlstFop: JSON.stringify(lstFopPrinci)
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
        var grid03 = Ext.getCmp(prototype.idRfndFOP + '-det-gridDataTktFOP');
        var regs = grid03.getStore().getCount();
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter payment method');
            bvalida = false;
            return;
        } else {
            for (var o = 0; o < regs; o++) {
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731CFOP')) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter payment method');
                    bvalida = false;
                    return;
                }
                /*if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731VNETR')) !== 0 && Ext.String.trim(grid03.getStore().getAt(o).get('A1731CFOP')) !== 'CA') {
                 Ext.Msg.alert('.: PRAXIS :.', 'You must enter when the payment is cash');
                 bvalida = false;
                 return;
                 }*/
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731CFOP')) === 'CA') {
                    if (grid03.getStore().getAt(o).get('A1731TTARJ') !== '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card type');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731NREF')) !== '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card number');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731FEXP')) !== '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, younot  must enter the expiration date');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731CAPL')) !== '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter Approval Card');
                        bvalida = false;
                        return;
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731CFOP')) === 'CC') {
                    if (grid03.getStore().getAt(o).get('A1731TTARJ') === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card you must enter the card type');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731NREF')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731NREF')).length < 15) {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731FEXP')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the expiration date');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('A1731CAPL')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter Approval Card');
                        bvalida = false;
                        return;
                    }
                }
            }
        }
        return bvalida;
    }


});

