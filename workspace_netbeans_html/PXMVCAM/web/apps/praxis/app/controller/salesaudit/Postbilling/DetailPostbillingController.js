/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.Postbilling.DetailPostbillingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailPostbillingController',
    beanINI: {},
    beanIniTem: {},
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/Postbilling',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var Argumentpripa = Ext.getCmp(prototype.id1 + '-Argumentpripa');
        var formfile1 = Ext.getCmp(prototype.id1 + '-ArgumenFile1');
        var formfile2 = Ext.getCmp(prototype.id1 + '-ArgumenFile2');
        var formfile3 = Ext.getCmp(prototype.id1 + '-ArgumenFile3');
        var CbtStatus = Ext.getCmp(prototype.id1 + '-contenedor-status');
        var save = Ext.getCmp(prototype.id1 + '-btn-save');
        switch (String(this.view.params.action)) {
            case 'FORMASQUERYPOSTBILLING':
                Argumentpripa.hide();
                formfile1.hide();
                formfile2.hide();
                formfile3.hide();
                CbtStatus.hide();
                save.hide();
                Ext.getCmp(prototype.id1 + '-win').setHeight(Ext.getCmp(prototype.id1 + '-win').getHeight() - 200);
                break;
            case 'FORMASPOSTBILLING':

                Argumentpripa.show();
                formfile1.show();
                formfile2.show();
                formfile3.show();
                CbtStatus.show();
                save.show();
                break;

        }

        this.CleanFields();
        this.setStores();
        this.setStoresFilters();
        this.onLoadData();

    },
    onLoadData: function () {
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.id1 + '-txtpreme').setValue(rec.get('A3537PREME'));
        Ext.getCmp(prototype.id1 + '-txtconxp').setValue(rec.get('A3537CNXPA'));

        Ext.getCmp(prototype.id1 + '-nmemo').setValue(rec.get('A3537NMEMO'));
        Ext.getCmp(prototype.id1 + '-trnc').setValue(rec.get('A3537TRNCU'));
        Ext.getCmp(prototype.id1 + '-disputable').setValue(Ext.util.Format.number(rec.get('A3537NMAX'), '0,000.00'));
        Ext.getCmp(prototype.id1 + '-country').setValue(rec.get('A3537PAIS'));
        Ext.getCmp(prototype.id1 + '-iata').setValue(rec.get('A3537IATA'));
        //Ext.getCmp(prototype.id1 + '-BillingPeriod').setValue(rec.get('A3537FPBD'));
        Ext.getCmp(prototype.id1 + '-dias').setValue(rec.get('A3537FDIAS'));
        Ext.getCmp(prototype.id1 + '-mda').setValue(rec.get('A3537MDA'));
        Ext.getCmp(prototype.id1 + '-pbda').setValue(Ext.util.Format.number(rec.get('A3537PBDNE'), '0,000.00')); //
        Ext.getCmp(prototype.id1 + '-pbdadif').setValue(Ext.util.Format.number(rec.get('A3537NETD'), '0,000.00')); // 
        Ext.getCmp(prototype.id1 + '-PBDate').setValue(rec.get('A3537FPBD'));
        Ext.getCmp(prototype.id1 + '-ResoDate').setValue(rec.get('A3537RDSTE'));
        Ext.getCmp(prototype.id1 + '-txtStatus').setValue(rec.get('A3537FLAG'));
        this.cargaDatos(rec);
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.id1 + '-gridTKT');
        var grid02 = Ext.getCmp(prototype.id1 + '-gridRazon');
        var grid03 = Ext.getCmp(prototype.id1 + '-gridDispuRazon');
        
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid01'
        });        
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid02'
        });
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid03'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);

    },
    cargaDatos: function (rec) {
        var me = this;
        me.beanINI.IN_OPTION='1';
        me.beanINI.IN_SEQ='';
        me.beanINI.IN_CNXPA = rec.get('A3537CNXPA');  
        if(Ext.String.trim(rec.get('A3537TRNCU')).substring(0,3)==='RFND'){
            me.beanINI.IN_OPTION='3';
            me.beanINI.IN_CNXPA =rec.get('A3537NMEMO');
        }
        if(Ext.String.trim(rec.get('A3537TRNCU')).substring(0,3)==='TKT' || Ext.String.trim(rec.get('A3537TRNCU')).substring(0,3)==='EXCH' || Ext.String.trim(rec.get('A3537TRNCU')).substring(0,3)==='EMD'){
            me.beanINI.IN_OPTION='2';
            me.beanINI.IN_SEQ='00';
            me.beanINI.IN_CNXPA =rec.get('A3537NMEMO');
        }
        me.beanINI.IN_CIA = rec.get('A3537CCUST');
        me.beanINI.IN_PREME = rec.get('A3537PREME');
            
        Ext.getCmp(prototype.id1 + '-win').mask('Please Wait....');


        /* cargar data*/
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchPostbillingDetail/',
            method: 'POST',
            timeout: '300000',
            params: me.beanINI,
            success: function (response, options) {
                Ext.getCmp(prototype.id1 + '-win').unmask();
                var res = Ext.decode(response.responseText);
                Ext.getCmp(prototype.id1 + '-gridRazon').getStore().removeAll();
                Ext.getCmp(prototype.id1 + '-gridRazon').getStore().loadData(res.lst_DispuHisto);
                
                Ext.getCmp(prototype.id1 + '-gridTKT').getStore().removeAll();
                Ext.getCmp(prototype.id1 + '-gridTKT').getStore().loadData(res.lst_Tkts);
                
                Ext.getCmp(prototype.id1 + '-gridDispuRazon').getStore().removeAll();
                Ext.getCmp(prototype.id1 + '-gridDispuRazon').getStore().loadData(res.lst_DispuPostbi);
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
    setStoresFilters: function () {
        var cmbStatus = Ext.getCmp(prototype.id1 + '-ComboStatus');

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "DAG", "name": "DISAGREE WITH AGENT"},
                //{"code": "DAA", "name": "DISAGREE WITH AIRLINE"},
                {"code": "AAG", "name": "AGREE WITH AGENT"},
                {"code": "PRS", "name": "PBD REASON SENT"}
                //{"code": "PRA", "name": "ASK TO THE AGENCY"}
                // {"code": "AAA", "name": "AGREE WITH AIRLINE"}
            ]
        }));


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
        Ext.getCmp(prototype.id1 + '-disputable').setValue('');
        Ext.getCmp(prototype.id1 + '-Argument').setValue('');
        Ext.getCmp(prototype.id1 + '-File').setValue('');
        Ext.getCmp(prototype.id1 + '-File2').setValue('');
        Ext.getCmp(prototype.id1 + '-File3').setValue('');
        Ext.getCmp(prototype.id1 + '-trnc').setValue('');
        //Ext.getCmp(prototype.id1 + '-BillingPeriod').setValue('');
        Ext.getCmp(prototype.id1 + '-disputable').setValue('0.00');
        Ext.getCmp(prototype.id1 + '-dias').setValue('');
        Ext.getCmp(prototype.id1 + '-mda').setValue('');
        Ext.getCmp(prototype.id1 + '-pbda').setValue('');
        Ext.getCmp(prototype.id1 + '-PBDate').setValue('');
        Ext.getCmp(prototype.id1 + '-ResoDate').setValue('');
        Ext.getCmp(prototype.id1 + '-txtStatus').setValue('');
        Ext.getCmp(prototype.id1 + '-pbdadif').setValue('0.00');


    },
    metadata_detalle: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.id1 + '-Disputa').setValue(data.A2553DESCR);
    },
    metadata_razon: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.id1 + '-Disputa').setValue(data.A3537NCONX);
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

        me.beanTMP.IN_CNXPA = Ext.String.trim(rec.get('A3537CNXPA'));
        me.beanTMP.IN_PREME = Ext.String.trim(rec.get('A3537PREME'));
        me.beanTMP.IN_DESCRI = Ext.String.trim(Ext.getCmp(prototype.id1 + '-Argument').getValue());
        me.beanTMP.IN_COUNTRY = Ext.String.trim(rec.get('A3537PAIS'));
        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.id1 + '-ComboStatus').getValue();
        me.beanTMP.IN_TRNCU = "ADM";
        console.log(me.beanTMP);
        var form = Ext.getCmp(prototype.id1 + '-form').getForm();
        form.submit({
            url: this.urlWin01 + '/insertTracingFile/',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {beanString: JSON.stringify(me.beanTMP)},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.result + '" has been uploaded.');
                var vp_icon = 0;
                if (res.result === 'The record was saved successfully.' || res.result === 'Process Successful') {
                    vp_icon = 1;
                }
                global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                        if (vp_icon === 1) {
                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick(false);
                            Ext.getCmp(prototype.id1 + '-win').close();

                        }


                    }});
            }
        });


    },
    OnColumnHistoRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id1 + \'-win\').getController().onWinFileHistoViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileHistoViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id1 + '-gridRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var nmemo = '';
        if (rec.data.A2553TYPO === 'AM') {
            nmemo = Ext.getCmp(prototype.id1 + '-txtconxp').getValue();
        } else {
            nmemo = Ext.getCmp(prototype.id1 + '-nmemo').getValue();
        }
        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer', {id: 'PostbillingFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory2(rec.data, nmemo, Ext.getCmp(prototype.id1 + '-country').getValue(''), this.urlWin01);
        DisputeFileViewer.show();
    },
    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id1 + \'-win\').getController().onWinFileViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id1 + '-gridDispuRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var nmemo = '';
        if (rec.data.A3537TYPE === 'AM') {
            if (Ext.getCmp(prototype.id1 + '-txtconxp').getValue() !== '') {
                nmemo = Ext.getCmp(prototype.id1 + '-txtconxp').getValue();
            } else {
                nmemo = Ext.getCmp(prototype.id1 + '-txtpreme').getValue();
            }
        } else {
            nmemo = Ext.getCmp(prototype.id1 + '-nmemo').getValue();
        }
        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer', {id: 'PostbillingFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory(rec.data, nmemo, Ext.getCmp(prototype.id1 + '-country').getValue(''), this.urlWin01);
        DisputeFileViewer.show();
    }



});

