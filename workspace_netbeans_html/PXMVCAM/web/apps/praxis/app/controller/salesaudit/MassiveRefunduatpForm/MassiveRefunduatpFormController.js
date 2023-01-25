Ext.define('Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MassiveRefunduatpFormController',

    /**
     * Constructor
     */
    bean: {},
    bean2: {},
    bean3: {},
    init: function (view) {
        var me = this;

    },
    afterRender: function () {
        var me = this;
        me.setUser();
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    setUser: function () {
        var me = this;
        Ext.Ajax.request({
            url: prototype.url01 + '/getUser',
            timeout: 60000000,
            method: 'POST',
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtUser').setValue(Ext.String.trim(res.user.USR));

            }
        });
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('2');
    },
    OnAmountInteger: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    },
    onColumnIntegerRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie');
        if (obj.getValue() === "1" || obj.getValue() === "2") {
            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            txtCia.hide();
            txtFrmaSerie.hide();
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie').setValue("");
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia').setValue("");
        } else if (obj.getValue() === "3") {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.show();
            txtFrmaSerie.show();
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia').setValue("139");
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFilterDateFrom').setValue("");
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFilterDateTo').setValue("");
        } else {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie').setValue("");
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia').setValue("");
        }
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.idMassiveRefunduatpForm = 'MassiveRefunduatpForm';
        prototype.idMassiveRefunduatpFormSubiArchivo = 'MassiveRefunduatpFormSubiArchivo';
        prototype.idMassiveRefunduatpFormTicket = 'MassiveRefunduatpFormTicket';
        prototype.idMassiveRefunduatpFormErrorBPO = 'MassiveRefunduatpFormErrorBPO';
        prototype.url = CONTEXTPATH + '/MassiveRefunduatpForm';
        prototype.url01 = CONTEXTPATH + '/BwrBSPLINKRFND';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbStatus');
        var CmbStatusBPO = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbStatusBPO');
        var CmbType = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbType');
        var cmbOptionTKT = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-cmbOptionTKT');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "ISSUE DATE"},
                {"code": "2", "name": "SYSTEM DATE"},
                {"code": "3", "name": "TICKET"}
            ]
        }));


        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "APPROVED"},
                {"code": "D", "name": "DUPLICATE TICKET"},
                {"code": "Y", "name": "PENDING"},
                {"code": "E", "name": "SALES DATE ERROR"},
                {"code": "U", "name": "WITH USES"},
                {"code": "T", "name": "ATO ERROR"},
                {"code": "B", "name": "TAX ERROR"},
                {"code": "J", "name": "TICKET EXCH"},
                {"code": "C", "name": "TICKET DOES NOT EXIST"},
                {"code": "H", "name": "HIGHER AMOUNT FOR SALE"},
                {"code": "M", "name": "MODIFIED"},
                {"code": "I", "name": "INVALID CURRENCY"},
                {"code": "G", "name": "INVALID IATA"},
                {"code": "K", "name": "INVALID CPN"},
                {"code": "R", "name": "REJECT"}

            ]
        }));

        CmbStatusBPO.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "Y", "name": "PENDING"},
                {"code": "E", "name": "ERROR BPO"},
                {"code": "F", "name": "CAPTURED BPO"},
                {"code": "C", "name": "CANC"}


            ]
        }));

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "MA", "name": "LAYOUT DETAIL"},
                {"code": "GP", "name": "LAYOUT TOTAL"}


            ]
        }));
        cmbOptionTKT.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "TICKET"},
                {"code": "2", "name": "IATA RFND"}
            ]
        }));

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
        switch (String(record.get('A4076ESTADO'))) {
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    setStoresGrids: function () {
        var gridData = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid');
        var gridCabe = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-gridCabe');
        //
        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpForm + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/search',
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
            storeId: prototype.idMassiveRefunduatpForm + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchDetail',
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

        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-pagginator-01').setStore(store00);
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onExcelClick2: function (obj, e) {
        var me = this;
        //if (me.bean2.length > 0) {
        me.exportExcel(prototype.url + '/getXLSX2?beanString=' + encodeURI(JSON.stringify(me.bean2)));
        //}
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.IN_OPTION = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-search-type').getValue();
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFilterDateFrom').getRawValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFilterDateTo').getRawValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia').getValue() + '' + Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbType').getValue();
        me.bean.IN_IATA = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtIATA').getValue();
        me.bean.IN_STATUS = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbStatus').getValue();
        me.bean.IN_STATUSBPO = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbStatusBPO').getValue();
        me.bean.IN_USER = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-Audit').getValue();
        me.bean.pexcel = 0;
        if (me.bean.IN_OPTION === '') {
            Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-search-type').focus();", 100);
            });
            return;

        }
        if (me.bean.IN_OPTION === '') {
            Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-search-type').focus();", 100);
            });
            return;

        }
        if (me.bean.IN_OPTION === "3") {
            if (Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia').getValue() === '') {
                Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia').focus();", 100);
                });
                return;
            }
            if (Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie').getValue() === '') {
                Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie').focus();", 100);
                });
                return;
            }
        }

        if (me.bean.IN_OPTION === "1" || me.bean.IN_OPTION === "2") {
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
                            setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(me.bean.IN_DATETO) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(me.bean.IN_DATETO), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFilterDateTo').focus();", 100);
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
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-lbl-total2').setText('0');
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-gridCabe').getStore().removeAll();
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-gridCabe').getStore().loadPage(1, {
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
    onAddClick: function () {
        var win = new Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormSubiArchivo({
            params: {
                url01: prototype.url
            }
        });
        win.show();
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicket({
            params: {
                rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    },
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-search-type').setValue('1');
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia').setValue('139');
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie').setValue('');
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbType').setValue('');
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtIATA').setValue('');
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbStatus').setValue('');
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-CmbStatusBPO').setValue('');
    },

    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {

        var color = '#FFFFFF';
        switch (String(record.get('A4076FLAG'))) {
            case 'Y':
                color = '#f8ffb8';
                value = 'PENDING';
                break;
            case 'A':
                color = '#81F781';
                value = 'APPROVED';
                break;
            case 'E':
                color = '#F78181';
                value = 'SALES DATE ERROR';
                break;
            case 'U':
                color = '#F781D8';
                value = 'WITH USES';
                break;
            case 'D':
                color = '#ffb8ec';
                value = 'DUPLICATE TICKET';
                break;
            case 'T':
                color = '#81BEF7';
                value = 'ATO ERROR';
                break;
            case 'B':
                color = '#F3EFB6';
                value = 'TAX ERROR';
                break;
            case 'H':
                color = '#D6B1B0';
                value = 'HIGHER AMOUNT FOR SALE';
                break;
            case 'M':
                color = '#CFC2D8';
                value = 'MODIFIED';
                break;
            case 'R':
                color = '#E5B2B2';
                value = 'REJECT';
                break;
            case 'C':
                color = '#FAC8D5';
                value = 'TICKET DOES NOT EXIST';
                break;
            case 'I':
                color = '#D99B25';
                value = 'INVALID CURRENCY';
                break;
            case 'G':
                color = '#e4fff9';
                value = 'INVALID IATA';
                break;
            case 'K':
                color = '#e4fff9';
                value = 'INVALID CPN';
                break;
            case 'J':
                color = '#D99B25';
                value = 'TICKET EXCH';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnStatBPO: function (value, metaData, record, rowIndex, colIndex, store, view) {

        var color = '#FFFFFF';
        switch (String(record.get('A4076STAT'))) {
            case 'Y':
                color = '#F3EFB6';
                value = 'PENDING';
                break;
            case 'E':
                color = '#EB984E';
                value = 'ERROR BPO';
                break;
            case 'F':
                color = '#F3F781';
                value = 'CAPTURED BPO';
                break;
            case 'C':
                color = '#FAB9A4';
                value = 'CANC';
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
        /*switch (String(record.get('A4076FLAG'))) {
         case 'A':
         value = 'green';
         break;
         default:
         value = 'red';
         }*/
        if (record.get('SUMAOK') > 0) {
            value = 'green';
        } else {
            value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onRendererColumnOnPreme: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:#244066 !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idMassiveRefunduatpForm + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle_actualiza: function () {
        var me = this;
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idMassiveRefunduatpForm + '-lbl-total2').setText(records.length);
                } else {
                    Ext.getCmp(prototype.idMassiveRefunduatpForm + '-lbl-total2').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });

    },
    searchform_detalle: function (rowIndex) {
        var me = this;
        var grid = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-gridCabe');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        me.bean2.IN_PREME = rec.data.A4076PREME;
        me.bean2.IN_DATEFROM = rec.data.A4076FREGI;
        me.bean2.IN_USER = rec.data.A4076REGIS;
        if (Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie').getValue() !== '') {
            me.bean2.IN_TICKET = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtCia').getValue() + "" + Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtFrmaSerie').getValue();
        } else {
            me.bean2.IN_TICKET = '';
        }

        me.bean2.IN_IATA = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtIATA').getValue();
        //
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idMassiveRefunduatpForm + '-lbl-total2').setText(records.length);
                } else {
                    Ext.getCmp(prototype.idMassiveRefunduatpForm + '-lbl-total2').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });

    },
    img_clickHandler_save_List: function () {
        var me = this;
        var lstNew = new Array();
        var grid = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (Ext.String.trim(row.get('A4076FLAG')) === 'U') {
                    if (Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtUser').getValue() === 'XFMALAGON' || Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtUser').getValue() === 'XEILIANA' || Ext.getCmp(prototype.idMassiveRefunduatpForm + '-txtUser').getValue() === 'SAP26') {
                        lstNew.push(row.data);
                    } else {
                        global.Msg({msg: 'The user is not authorized to carry out the process'});
                        return;
                    }
                } else {
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idMassiveRefunduatpForm + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/ProcesaMantenimiento/',
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
                                            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-Contenedor').getController().onSearchClick();
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
    img_clickHandler_save: function () {
        var lstNew = new Array();
        var grid = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-gridCabe');
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idMassiveRefunduatpForm + '-Contenedor'), {
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
                                            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-Contenedor').getController().onSearchClick();
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
        var option = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-panelFilter1');
        if (option.isVisible()) {
            option.setVisible(false);
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-tbspacer2').show();
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-tbspacer1').hide();
        } else {
            option.setVisible(true);
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-tbspacer1').show();
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-tbspacer2').hide();
        }
    },
    onClickBtnSearch: function () {
        var me = this;
        var txtTKT = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtTKT').getValue();
        var txtIata = Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtIata').getValue();
        if (txtTKT !== '') {
            if (txtTKT.length !== 13) {
                Ext.MessageBox.alert('PRAXIS', 'The ticket has to be 13 characters', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtTKT').focus();", 100);
                });
                return;
            }
        }
        if (txtIata !== '') {
            if (txtIata.length !== 8) {
                Ext.MessageBox.alert('PRAXIS', 'The IATA has to be 8 characters', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtIata').focus();", 100);
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

            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-grid').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(me.bean3)

                }, callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-lbl-total2').setText(records.length);
                    } else {
                        Ext.getCmp(prototype.idMassiveRefunduatpForm + '-lbl-total2').setText('0');
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
                Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtTKT').show();
                Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtIata').hide();
                Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtIata').setValue("");
                setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtTKT').focus();", 100);
                //this.onFocus(prototype.idMassiveRefunduatpForm + '-de-txtTKT');
                break;
            case '2':
                Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtIata').show();
                Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtTKT').hide();
                Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtTKT').setValue("");
                setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpForm + '-de-txtIata').focus();", 100);
                //this.onFocus(prototype.idMassiveRefunduatpForm + '-de-txtIata');
                break;
        }
    }
});


