/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.DisputemanagementMyarcForm.DetailDisputeGestionMyarcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailDisputeGestionMyarcController',
    beanINI: {},
    beanIniTem: {},
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/DisputemanagementMyarcForm',
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
        var grid01 = Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridTKT');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDisputeGestionMyarc + '-store-grid02'
        });

        grid01.setStore(store01);

    },
    cargaDatos: function () {
        var me = this;

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDisputeGestionMyarc + '-PrincipalContenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();

        /* cargar data*/
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchDataDetaill/',
            params: me.beanIniTem,
            //params: {beanString: JSON.stringify(me.beanIniTem)},
            success: function (response, options) {
                mask.hide();
                var res = Ext.decode(response.responseText);
                Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridDispuRazon').getStore().removeAll();
                Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridDispuRazon').setStore(res.lst_DispuRazon);
                Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridTKT').getStore().removeAll();
                Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridTKT').getStore().loadData(res.lst_dataIni);
                Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridRazon').getStore().removeAll();
                Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridRazon').setStore(res.lst_RazonEmision);
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
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-nmemo').setValue(rec.data.A4137NMEMO);
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Service').setValue(rec.data.A4137USER);
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-country').setValue(rec.data.A4137PAIS);
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-iata').setValue(rec.data.A4137IATA);
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-DisputeDate').setValue(rec.data.A4137DDATE);
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Area').setValue(rec.data.A4137AREA);
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Origin').setValue(rec.data.A4137ORIGE);
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Base').setValue(rec.data.A4137BASE);
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Days').setValue(rec.data.A4137DIAS);
        // 
        me.beanINI.IN_PREME = rec.data.A4137PREME;
        me.beanINI.IN_ANIO = rec.data.A4137ANIO;
        me.beanINI.IN_CNXPA = rec.data.A4137CNXPA;
        me.beanINI.IN_PAIS = rec.data.A2548PAIS;
        me.beanIniTem = me.beanINI;
        var File = Ext.getCmp(prototype.idDisputeGestionMyarc + '-File');
        var ComboStatus = Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus');
        var ComboStatus2 = Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus2');
        var BtnSave = Ext.getCmp(prototype.idDisputeGestionMyarc + '-BtnSave');
        var checkboxArchivo = Ext.getCmp(prototype.idDisputeGestionMyarc + '-checkboxArchivo');
        if (rec.data.A4137STATO === 'PENDING TO WORK' || rec.data.A4137STATO === 'ERROR SENDING TO MYARC') {
            File.show();
            ComboStatus.show();
            ComboStatus2.show();
            BtnSave.show();
            checkboxArchivo.show();
        } else {
            File.hide();
            ComboStatus.hide();
            ComboStatus2.hide();
            BtnSave.hide();
            checkboxArchivo.hide();
        }

    },
    setStoresFilters: function () {
        var cmbStatus = Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus2');

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
        var cmbStatus2 = Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus2');
        if (obj.getValue() === "WA") {
            //if (rec.data.A2548AREA === 'VI') {
            cmbStatus2.show();
            //}
        } else {
            cmbStatus2.hide();
        }
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    CleanFields: function () {
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridRazon').getStore().removeAll();
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridTKT').getStore().removeAll();
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridDispuRazon').getStore().removeAll();
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-nmemo').setValue('');
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus').setValue('');
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Service').setValue('');
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Disputa').setValue('');
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Argument').setValue('');
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-File').setValue('');
    },
    metadata_detalle: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Disputa').setValue(data.A4138DESCR);
    },
    metadata_detalle2: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.idDisputeGestionMyarc + '-Disputa').setValue(data.A2553DESCR);
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    onFileChange: function (obj, newValue, oldValue, eOpts) {
        if (!newValue) {
            Ext.getCmp(prototype.idDisputeGestionMyarc + '-BtnFile').hide();
        } else {
            Ext.getCmp(prototype.idDisputeGestionMyarc + '-BtnFile').show();
        }
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
        var Vl_archivo = Ext.getCmp(prototype.idDisputeGestionMyarc + '-File').getRawValue();
        if (Vl_archivo !== '') {
            var Vl_name = Vl_archivo.split('\\')[Vl_archivo.split('\\').length - 1];
            if (Vl_name.length > 25) {
                global.Msg({msg: "The file name must not be longer than 25 characters", icon: 2, fn: function () {
                    }});
                return;
            }
        }

        if (Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus').getValue() === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Status", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus').focus();", 100);
            });
            return;
        }
        if (Ext.getCmp(prototype.idDisputeGestionMyarc + '-Argument').getValue() === '') {
            Ext.MessageBox.alert('PRAXIS', "The Argument must not exceed 300 characters", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idDisputeGestionMyarc + '-Argument').focus();", 100);
            });
            return;
        }
        if (Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus').getValue() === 'WA') {
            if (Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus2').getValue() === '') {
                Ext.MessageBox.alert('PRAXIS', "You must select the debit status", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus2').focus();", 100);
                });
                return;
            } else {
                status = Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus2').getValue();
            }
        } else {
            status = '';
        }

        me.beanTMP.IN_PREME = rec.data.A4137PREME;
        me.beanTMP.IN_ANIO = rec.data.A4137ANIO;
        me.beanTMP.IN_NUMBERADM = rec.data.A4137NMEMO;
        me.beanTMP.IN_CNXPA = rec.data.A4137CNXPA;
        me.beanTMP.IN_DESCR = Ext.getCmp(prototype.idDisputeGestionMyarc + '-Argument').getValue();
        me.beanTMP.IN_PAIS = rec.data.A4137PAIS;
        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.idDisputeGestionMyarc + '-ComboStatus').getValue();
        me.beanTMP.IN_STATUS2 = status;
        me.beanTMP.IN_TRNCU = "ADM";
        var form = Ext.getCmp(prototype.idDisputeGestionMyarc + '-form-01').getForm();
        form.submit({
            url: me.urlWin01 + '/insertTracingFile/',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {beanString: JSON.stringify(me.beanTMP)},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.result + '" has been uploaded.');
                var vp_icon = 0;
                if (res.result === 'The record was saved successfully.' || res.result === 'Proceso Culminado' || res.result === 'RECORD INSERTED') {
                    vp_icon = 1;
                }
                global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                        if (vp_icon === 1) {
                            Ext.getCmp(prototype.idDisputemanageMyarc + '-Contenedor').getController().imgSearch_clickHandler(false);
                            me.view.close();

                        }


                    }});
            }
        });




    },
    onClickFile: function (btn) {
        var me = this;
        rec = me.view.params.rec;
        me.beanTMP.IN_PREME = rec.data.A4137PREME;
        me.beanTMP.IN_ANIO = rec.data.A4137ANIO;
        me.beanTMP.IN_NUMBERADM = rec.data.A4137NMEMO;
        me.beanTMP.IN_CNXPA = rec.data.A4137CNXPA;
        me.beanTMP.IN_PAIS = rec.data.A4137PAIS;
        global.Msg({
            msg: 'Insert File?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDisputeGestionMyarc + '-PrincipalContenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: me.urlWin01 + '/insertFile/',
                        params: {beanString: JSON.stringify(me.beanTMP)},
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.decode(response.responseText);
                            var vp_icon = 0;
                            if (res.result === 'Proceso Culminado') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.idDisputemanageMyarcDisputemanageMyarc + '-Contenedor').getController().imgSearch_clickHandler(false);
                                        me.view.close();

                                    }


                                }});
                        }
                    });
                }

            }
        });
    },
    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idDisputeGestionMyarc + \'-PrincipalContenedor\').getController().onWinFileViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileViewerClick: function (rowIndex) {
        var me = this;
        rec2 = me.view.params.rec;
        //
        var grid = Ext.getCmp(prototype.idDisputeGestionMyarc + '-gridDispuRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.DisputemanagementMyarcForm.DisputeFileViewerMyarc({
            params: {
                rec: rec,
                nmemo: Ext.getCmp(prototype.idDisputeGestionMyarc + '-nmemo').getValue(),
                preme: rec2.data.A4137PREME,
                anio: rec2.data.A4137ANIO
            }
        });
        win.show();
    }



});

