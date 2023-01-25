/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplinkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailDisputeGestionBsplinkController',
    beanINI: {},
    beanIniTem: {},
    beanTMP: {},
    init: function (view) {
        var me = this;
        this.setStoresFilters();
        this.CleanFields();
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.initial();
        me.setStores();
        me.cargaDatos();

    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.id1 + '-gridTKT');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid02'
        });

        grid01.setStore(store01);

    },
    cargaDatos: function () {


        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id1 + '-PrincipalContenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();

        /* cargar data*/
        Ext.Ajax.request({
            url: prototype.url + '/loadTracing/',
            params: {beanString: JSON.stringify(this.beanIniTem)},
            success: function (response, options) {
                mask.hide();
                var res = Ext.decode(response.responseText);
                Ext.getCmp(prototype.id1 + '-gridRazon').setStore(res.lstRazones);
                //Ext.getCmp(prototype.id1 + '-gridTKT').setStore(res.lstTKTS);
                Ext.getCmp(prototype.id1 + '-gridTKT').getStore().loadData(res.lstTKTS);
                Ext.getCmp(prototype.id1 + '-gridDispuRazon').setStore(res.lstData);
                // Ext.getCmp(prototype.id1 + '-gridTKT').getView().refresh(); 
                //res.data.dbException.MESSAGE
            }
        });
        /*finde la carga*/
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    initial: function () {
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.id1 + '-nmemo').setValue(rec.data.A2548NMEMO);
        Ext.getCmp(prototype.id1 + '-Service').setValue(rec.data.A2548REGIS);
        Ext.getCmp(prototype.id1 + '-country').setValue(rec.data.A2548PAIS);
        Ext.getCmp(prototype.id1 + '-iata').setValue(rec.data.A2548IATA);
        //Ext.getCmp(prototype.id1 + '-DisputeDate').setValue(data.A2548FDISP); 
        Ext.getCmp(prototype.id1 + '-BillingPeriod').setValue(rec.data.CODIT);
        // 

        me.beanINI.A2553NMEMO = rec.data.A2548CNXPA;
        me.beanINI.NUMERO_ADM = rec.data.A2548CNXPA;
        me.beanINI.PAIS_ADM = rec.data.A2548PAIS;
        me.beanINI.USER = '';//lblUser.text;
        me.beanINI.ADM = rec.data.A2548NMEMO;
        me.beanINI.FUENTE = rec.data.A2548FTE;
        me.beanINI.CNXPA = rec.data.A2548CNXPA;
        me.beanINI.FLAG = rec.data.A2548FLAG;
        me.beanIniTem = me.beanINI;

    },
    setStoresFilters: function () {
        var cmbStatus = Ext.getCmp(prototype.id1 + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.id1 + '-ComboStatus2');

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "DE", "name": "REJECTED DISPUTE"},
                {"code": "WA", "name": "ACCEPTED DISPUTE"}
            ]
        }));

        cmbStatus2.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "ZE", "name": "AUTHORIZED"},
                {"code": "CO", "name": "CONDONED"},
                {"code": "CU", "name": "CLEARED UP"},
                {"code": "JU", "name": "JUSTIFIED"},
                {"code": "RE", "name": "REJECTED"}
            ]
        }));


    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var me = this;
        rec = me.view.params.rec;
        var cmbStatus2 = Ext.getCmp(prototype.id1 + '-ComboStatus2');
        if (obj.getValue() === "WA") {
            if (rec.data.A2548AREA === 'VI') {
                cmbStatus2.show();
            }
        } else {
            cmbStatus2.hide();
        }
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    CleanFields: function () {
        Ext.getCmp(prototype.id1 + '-gridRazon').getStore().removeAll();
        Ext.getCmp(prototype.id1 + '-gridTKT').getStore().removeAll();
        Ext.getCmp(prototype.id1 + '-gridDispuRazon').getStore().removeAll();
        Ext.getCmp(prototype.id1 + '-nmemo').setValue('');
        Ext.getCmp(prototype.id1 + '-ComboStatus').setValue('');
        Ext.getCmp(prototype.id1 + '-Service').setValue('');
        Ext.getCmp(prototype.id1 + '-Disputa').setValue('');
        Ext.getCmp(prototype.id1 + '-Argument').setValue('');
        Ext.getCmp(prototype.id1 + '-File').setValue('');
        Ext.getCmp(prototype.id1 + '-File2').setValue('');
        Ext.getCmp(prototype.id1 + '-File3').setValue('');
    },
    metadata_detalle: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.id1 + '-Disputa').setValue(data.A2553DESCR);
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onClickSave: function (btn) {
        var me = this;
        rec = me.view.params.rec;
        var status = '';
        if (Ext.getCmp(prototype.id1 + '-ComboStatus').getValue() === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Status", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id1 + '-ComboStatus').focus();", 100);
            });
            return;
        }
        if (Ext.getCmp(prototype.id1 + '-Argument').getValue() === '') {
            Ext.MessageBox.alert('PRAXIS', "The Argument must not exceed 500 characters", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id1 + '-Argument').focus();", 100);
            });
            return;
        }
        if (rec.data.A2548AREA === 'VI') {
            if (Ext.getCmp(prototype.id1 + '-ComboStatus').getValue() === 'WA') {
                if (Ext.getCmp(prototype.id1 + '-ComboStatus2').getValue() === '') {
                    Ext.MessageBox.alert('PRAXIS', "You must select the debit status", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id1 + '-ComboStatus2').focus();", 100);
                    });
                    return;
                } else {
                    status = Ext.getCmp(prototype.id1 + '-ComboStatus2').getValue();
                }
            } else {
                status = Ext.getCmp(prototype.id1 + '-ComboStatus').getValue();
            }
        } else {

            status = Ext.getCmp(prototype.id1 + '-ComboStatus').getValue();
        }


        me.beanTMP.A2553NMEMO = rec.data.A2548NMEMO;
        me.beanTMP.A2553DESCR = Ext.getCmp(prototype.id1 + '-Argument').getValue();
        me.beanTMP.A2553PAIS = rec.data.A2548PAIS;
        me.beanTMP.A2553STAT = Ext.getCmp(prototype.id1 + '-ComboStatus').getValue();
        me.beanTMP.A2553STAT2 = status;
        me.beanTMP.A2553CNXPA = rec.data.A2548CNXPA;
        me.beanTMP.A2553TRNCU = "ADM";
        me.beanTMP.A2553FOLIO = "";//Ext.getCmp(prototype.id1 + '-Folio').getValue();

        if (Ext.getCmp(prototype.id1 + '-File').getValue() !== '' || Ext.getCmp(prototype.id1 + '-File2').getValue() !== '' || Ext.getCmp(prototype.id1 + '-File3').getValue() !== '') {
            var form = Ext.getCmp(prototype.id1 + '-form-01').getForm();
            form.submit({
                url: prototype.url + '/insertTracingFile/',
                waitMsg: 'Uploading your sure to upload the file...',
                params: {beanString: JSON.stringify(me.beanTMP)},
                success: function (fp, o) {
                    var res = Ext.decode(o.response.responseText);
                    Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.result + '" has been uploaded.');
                    var vp_icon = 0;
                    if (res.result === 'The record was saved successfully.') {
                        vp_icon = 1;
                    }
                    global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                            if (vp_icon === 1) {
                                Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler(false);
                                //Ext.getCmp('DetailBsplinkRefundQueryRFND').close();
                                me.view.close();

                            }


                        }});
                }
            });
        } else {
            global.Msg({
                msg: 'Insert Data?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id1 + '-PrincipalContenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/insertTracing/',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.result === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler(false);
                                            me.view.close();
                                            //Ext.getCmp('DetailBsplinkRefundQueryRFND').close();

                                        }


                                    }});
                            }
                        });
                    }

                }
            });

        }


    },
    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id1 + \'-PrincipalContenedor\').getController().onWinFileViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    
    /*onWinFileViewerClick: function (rowIndex) {
     var grid = Ext.getCmp(prototype.id1 + '-gridDispuRazon');
     var store = grid.getStore();
     var rec = store.getAt(rowIndex);
     
     var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DisputeFileViewer', {id: 'DisputeFileViewer'});
     var controller = DisputeFileViewer.getController();
     controller.getFilesDirectory(rec.data, Ext.getCmp(prototype.id1 + '-nmemo').getValue(''));
     DisputeFileViewer.show();
     }*/


    onWinFileViewerClick: function (rowIndex) {

        var grid = Ext.getCmp(prototype.id1 + '-gridDispuRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DisputeFileViewer({
            params: {
                rec: rec,
                nmemo: Ext.getCmp(prototype.id1 + '-nmemo').getValue('')
            }
        });
        win.show();
    }



});

