
Ext.define('Ext.Praxis.controller.salesaudit.RFNDQuery.RFNDQueryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDQueryController',

    /**
     * Constructor
     */

    beanTMP: {},
    beanUpdate: {},
    bean: {},
    bean2: {},

    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
    },

    OnBeforeShow: function () {
        prototype.idRFNDQuery = 'RFNDQuery';
        prototype.idDetailTicket = 'DetailTicket';
        prototype.idRFNDFormRazones = 'FNDFormRazones';
        prototype.idRFNDDIRFileViewer = 'RFNDDIRFileViewer';
        prototype.idDetailTicketHistory = 'DetailTicketHistory';
        prototype.url02 = CONTEXTPATH + '/RFNDPending';
        prototype.url01 = CONTEXTPATH + '/RFNDQuery';
        prototype.url3 = CONTEXTPATH + '/RFNDUserMaintenance';
        prototype.widthWindow = 1400;
        prototype.heightWindow = 768;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.onLoadUsers();
        me.setStoresGrids();
        Ext.getCmp(prototype.idRFNDQuery + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, me);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('2');
    },
    OnAmountInteger: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    },
    onColumnIntegerRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value !== 0) {
            metaData.style = "background-color: #86C8BC !important";
            //Ext.util.Format.number(value, '0,000.00');
        }
        return value;

        //return Ext.util.Format.number(value, '0,000');
    },
    onColumnNotIntegerRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value !== 0) {
            metaData.style = "background-color: #f1c97d !important";
            //Ext.util.Format.number(value, '0,000.00');
        }
        return value;

        //return Ext.util.Format.number(value, '0,000');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.idRFNDQuery + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie');
        var txtfolio = Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaFolio');
        if (obj.getValue() === "2" || obj.getValue() === "4") {
            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtfolio.hide();
            Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie').setValue("");
            Ext.getCmp(prototype.idRFNDQuery + '-txtCia').setValue("");
            Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaFolio').setValue("");
        } else if (obj.getValue() === "1") {
            txtfolio.show();
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            Ext.getCmp(prototype.idRFNDQuery + '-txtCia').setValue("");
            Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateFrom').setValue("");
            Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateTo').setValue("");
        } else if (obj.getValue() === "3") {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.show();
            txtFrmaSerie.show();
            txtfolio.hide();
            Ext.getCmp(prototype.idRFNDQuery + '-txtCia').setValue("139");
            Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateFrom').setValue("");
            Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateTo').setValue("");
            Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaFolio').setValue("");
        } else {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtfolio.hide();
            Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie').setValue("");
            Ext.getCmp(prototype.idRFNDQuery + '-txtCia').setValue("");
            Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaFolio').setValue("");
        }
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idRFNDQuery + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.idRFNDQuery + '-CmbStatus');
        var CmbStatusBPO = Ext.getCmp(prototype.idRFNDQuery + '-CmbStatusBPO');
        //var CmbType = Ext.getCmp(prototype.idRFNDQuery + '-CmbType');
        var cmbOptionTKT = Ext.getCmp(prototype.idRFNDQuery + '-de-cmbOptionTKT');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "FOLIO"},
                {"code": "2", "name": "SYSTEM DATE"},
                {"code": "3", "name": "TICKET"},
                {"code": "4", "name": "AUTHORISED - REJECTED / DATE"}
            ]
        }));


        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "IN PROCESS"},
                {"code": "E", "name": "ERROR PROCESS"},
                {"code": "F", "name": "AUTHORISED"},
                {"code": "Y", "name": "PENDING"},
                {"code": "R", "name": "REJECT"},
                {"code": "B", "name": "GIVE USE IN PRAXIS"},
                {"code": "C", "name": "REACTIVATION"}

            ]
        }));

        CmbStatusBPO.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "Y", "name": "PENDING"},
                {"code": "A", "name": "ASSIGNED TO AUDITOR"},
                {"code": "C", "name": "USES CPN"},
                {"code": "E", "name": "SENT TO SABRE"},
                {"code": "D", "name": "RETURNED FROM SABRE"},
                {"code": "L", "name": "CAPTURED BPO"},
                {"code": "R", "name": "SENT TO BPO"},
                {"code": "F", "name": "SENT TO TO THE PORTAL"},
                {"code": "G", "name": "PENDING TO THE PORTAL"}

            ]
        }));

        /*CmbType.bindStore(Ext.create('Ext.data.Store', {
         data: [
         {"code": "", "name": "ALL"},
         {"code": "MA", "name": "LAYOUT DETAIL"},
         {"code": "GP", "name": "LAYOUT TOTAL"}
         
         
         ]
         }));*/
        cmbOptionTKT.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "TICKET"},
                {"code": "2", "name": "IATA RFND"}
            ]
        }));

    },
    onLoadUsers: function () {
        var cmbUser = Ext.getCmp(prototype.idRFNDQuery + '-CmbAudit');
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url3 + '/loadDataInit',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    cmbUser.setValue('ALL');
                }
            }
        });
        cmbUser.setStore(store);
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbStatusAfterRender2: function (obj) {
        obj.setValue('1');
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3648ESTADO'))) {
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    setStoresGrids: function () {
        var gridData = Ext.getCmp(prototype.idRFNDQuery + '-grid');
        var gridCabe = Ext.getCmp(prototype.idRFNDQuery + '-gridCabe');
        //
        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRFNDQuery + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url01 + '/SearchQueryRefund',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        //
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRFNDQuery + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url01 + '/searchDetail',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        gridCabe.setStore(store00);
        gridData.setStore(store01);

        Ext.getCmp(prototype.idRFNDQuery + '-pagginator-01').setStore(store00);
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onExcelClick2: function (obj, e) {
        var me = this;
        //if (me.bean2.length > 0) {
        me.exportExcel(prototype.url01 + '/getXLSX2?beanString=' + encodeURI(JSON.stringify(me.bean2)));
        //}
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.IN_OPTION = Ext.getCmp(prototype.idRFNDQuery + '-search-type').getValue();
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateFrom').getRawValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateTo').getRawValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.idRFNDQuery + '-txtCia').getValue() + '' + Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie').getValue();
        me.bean.IN_COUNTRY = '';//Ext.getCmp(prototype.idRFNDQuery + '-CmbType').getValue();
        me.bean.IN_IATA = Ext.getCmp(prototype.idRFNDQuery + '-txtIATA').getValue();
        me.bean.IN_FLAG = Ext.getCmp(prototype.idRFNDQuery + '-CmbStatus').getValue();
        me.bean.IN_STATUSBPO = Ext.getCmp(prototype.idRFNDQuery + '-CmbStatusBPO').getValue();
        me.bean.IN_USER = Ext.getCmp(prototype.idRFNDQuery + '-CmbAudit').getValue();
        me.bean.IN_FOLIO = Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaFolio').getValue();
        if (me.bean.IN_USER === 'ALL') {
            me.bean.IN_USER = '';
        }
        me.bean.pexcel = 0;
        if (me.bean.IN_OPTION === '') {
            Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-search-type').focus();", 100);
            });
            return;

        }
        if (me.bean.IN_OPTION === '') {
            Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-search-type').focus();", 100);
            });
            return;

        }
        if (me.bean.IN_OPTION === "1") {
            if (me.bean.IN_FOLIO === '') {
                Ext.MessageBox.alert('PRAXIS', "Insert Folio", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaFolio').focus();", 100);
                });
                return;
            }
        }
        if (me.bean.IN_OPTION === "3") {
            if (Ext.getCmp(prototype.idRFNDQuery + '-txtCia').getValue() === '') {
                Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-txtCia').focus();", 100);
                });
                return;
            }
            if (Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie').getValue() === '') {
                Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie').focus();", 100);
                });
                return;
            }
        }

        if (me.bean.IN_OPTION === "2" || me.bean.IN_OPTION === "4") {
            if (me.bean.IN_DATEFROM !== '') {
                if (me.bean.IN_DATETO === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (me.bean.IN_DATETO !== '') {
                if (me.bean.IN_DATEFROM === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }
            if (me.bean.IN_DATEFROM !== '' && me.bean.IN_DATETO !== '') {

                if (global.existeFecha(me.bean.IN_DATEFROM) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(me.bean.IN_DATEFROM), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(me.bean.IN_DATETO) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(me.bean.IN_DATETO), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
        }

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url01 + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText('0');
            Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idRFNDQuery + '-gridCabe').getStore().removeAll();
            Ext.getCmp(prototype.idRFNDQuery + '-gridCabe').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length === 0) {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }
    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicket({
            params: {
                rec: rec,
                action: 'FORMQUERYRFND'
            }
        });
        win.show();
    },
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idRFNDQuery + '-search-type').setValue('1');
        Ext.getCmp(prototype.idRFNDQuery + '-txtCia').setValue('139');
        Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie').setValue('');
        //Ext.getCmp(prototype.idRFNDQuery + '-CmbType').setValue('');
        Ext.getCmp(prototype.idRFNDQuery + '-txtIATA').setValue('');
        Ext.getCmp(prototype.idRFNDQuery + '-CmbStatus').setValue('');
        Ext.getCmp(prototype.idRFNDQuery + '-CmbStatusBPO').setValue('');
    },

    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A3648FLAG'))) {
            case 'E':
                color = '#F78181';
                value = 'ERROR PROCESS';
                break;
            case 'A':
                color = '#81BEF7';
                value = 'IN PROCESS';
                break;
            case 'R':
                color = '#F78181';
                value = 'REJECTED';
                break;
            case 'F':
                color = '#81F781';
                value = 'AUTHORISED';
                break;
            case 'Y':
                color = '#CCFF00';
                value = 'PENDING';
                break;
            case 'B':
                color = '#FF9966';
                value = 'GIVE USE IN PRAXIS';
                break;
            case 'C':
                color = '#F781D8';
                value = 'REACTIVATION';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnTYPE: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A4076TYPE'))) {
            case 'MA':
                value = 'LAYOUT DETAIL';
                break;
            case 'GP':
                value = 'LAYOUT TOTAL';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnBase: function (value, metaData, record, rowIndex, colIndex, store, view) {

        switch (String(record.get('A4076BASE'))) {
            case 'UAT':
                value = 'UATP';
                break;
            case 'CON':
                value = 'CONTRACARGO';
                break;
            case 'CAM':
                value = 'CAMEPA';
                break;
            case 'ATC':
                value = 'CUSTOMER SERVICE';
                break;
            case 'VDI':
                value = 'DIRECT SALE';
                break;
            case 'MAN':
                value = 'MAN';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        //metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnStatuscab: function (value, metaData, record, rowIndex, colIndex, store, view) {

        switch (String(record.get('A4076FLAG'))) {
            case 'E':
                value = 'KO';
                break;
            case 'A':
                value = 'OK';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnOnCab: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (record.get('A3647DIAS') <= 3) {
            value = 'green';
        } else {
            value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onRendererColumnOnPreme: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:#244066 !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idRFNDQuery + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle_actualiza: function () {
        var me = this;
        Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText(records.length);
                } else {
                    Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });

    },
    searchform_detalle2: function () {
        var me = this;
        //
        Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText(records.length);
                } else {
                    Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });

    },
    searchform_detalle: function (rowIndex) {
        var me = this;
        var grid = Ext.getCmp(prototype.idRFNDQuery + '-gridCabe');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        me.bean2.IN_PREME = rec.data.A3647PREME;
        me.bean2.IN_ANIO = rec.data.A3647ANIO;
        me.bean2.IN_DATEFROM = rec.data.A3647FREGI;
        me.bean2.IN_USER = rec.data.A3647REGAS;
        if (Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie').getValue() !== '') {
            me.bean2.IN_TICKET = Ext.getCmp(prototype.idRFNDQuery + '-txtCia').getValue() + "" + Ext.getCmp(prototype.idRFNDQuery + '-txtFrmaSerie').getValue();
        } else {
            me.bean2.IN_TICKET = '';
        }

        me.bean2.IN_IATA = Ext.getCmp(prototype.idRFNDQuery + '-txtIATA').getValue();
        //
        Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText(records.length);
                } else {
                    Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });

    },
    img_clickHandler_save: function () {
        var lstNew = new Array();
        var grid = Ext.getCmp(prototype.idRFNDQuery + '-gridCabe');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (row.get('CANTPEN') > 0) {
                    lstNew.push(row.data);
                }
            }
        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }

        if (lstNew.length > 0) {
            global.Msg({
                msg: 'Are you sure to Save?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRFNDQuery + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/ProcesaMantenimientoStatus/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanlst: JSON.stringify(lstNew)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                //console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idRFNDQuery + '-Contenedor').getController().onSearchClick();
                                            me.searchform_detalle_actualiza();
                                        }


                                    }});
                            }
                        });
                    }

                }
            });

        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
            return;
        }
    },
    onClickBtnFilter: function () {
        var option = Ext.getCmp(prototype.idRFNDQuery + '-panelFilter1');
        if (option.isVisible()) {
            option.setVisible(false);
            Ext.getCmp(prototype.idRFNDQuery + '-tbspacer2').show();
            Ext.getCmp(prototype.idRFNDQuery + '-tbspacer1').hide();
        } else {
            option.setVisible(true);
            Ext.getCmp(prototype.idRFNDQuery + '-tbspacer1').show();
            Ext.getCmp(prototype.idRFNDQuery + '-tbspacer2').hide();
        }
    },
    onClickBtnSearch: function () {
        var me = this;
        var txtTKT = Ext.getCmp(prototype.idRFNDQuery + '-de-txtTKT').getValue();
        var txtIata = Ext.getCmp(prototype.idRFNDQuery + '-de-txtIata').getValue();
        if (txtTKT !== '') {
            if (txtTKT.length !== 13) {
                Ext.MessageBox.alert('PRAXIS', 'The ticket has to be 13 characters', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-de-txtTKT').focus();", 100);
                });
                return;
            }
        }
        if (txtIata !== '') {
            if (txtIata.length !== 8) {
                Ext.MessageBox.alert('PRAXIS', 'The IATA has to be 8 characters', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-de-txtIata').focus();", 100);
                });
                return;
            }
        }//data.TICKET !== undefined
        if (me.bean2.IN_PREME !== undefined) {

            me.bean3.IN_PREME = me.bean2.IN_PREME;
            me.bean3.IN_DATEFROM = me.bean2.IN_DATEFROM;
            me.bean3.IN_USER = me.bean2.IN_USER;
            me.bean3.IN_TICKET = txtTKT;
            me.bean3.IN_IATA = txtIata;

            Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idRFNDQuery + '-grid').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(me.bean3)

                }, callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText(records.length);
                    } else {
                        Ext.getCmp(prototype.idRFNDQuery + '-lbl-total2').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        } else {
            global.Msg({msg: "You must first select the header.", icon: 2, fn: function () {
                }});
        }


    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onChangeComboTkt: function (obj, val) {
        switch (val) {
            case '1':
                Ext.getCmp(prototype.idRFNDQuery + '-de-txtTKT').show();
                Ext.getCmp(prototype.idRFNDQuery + '-de-txtIata').hide();
                Ext.getCmp(prototype.idRFNDQuery + '-de-txtIata').setValue("");
                setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-de-txtTKT').focus();", 100);
                //this.onFocus(prototype.idRFNDQuery + '-de-txtTKT');
                break;
            case '2':
                Ext.getCmp(prototype.idRFNDQuery + '-de-txtIata').show();
                Ext.getCmp(prototype.idRFNDQuery + '-de-txtTKT').hide();
                Ext.getCmp(prototype.idRFNDQuery + '-de-txtTKT').setValue("");
                setTimeout("Ext.getCmp(prototype.idRFNDQuery + '-de-txtIata').focus();", 100);
                //this.onFocus(prototype.idRFNDQuery + '-de-txtIata');
                break;
        }
    }

});
