
Ext.define('Ext.Praxis.controller.flown.ChangeOfStatusForm.ChangeOfStatusFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChangeOfStatusFormController',
    /**
     * Constructor
     */

    beanTMP: {},
    beanUpdate: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        // console.log('Antes de mostrar...');
        prototype.id = 'ChangeOfStatusForm';
        prototype.url = CONTEXTPATH + '/ChangeOfStatusForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // alert('Controlador cargado correctamente...')
        //this.setUser();
        this.setStoresFilters();
        this.setStoresGrids();

        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbStatusIni = Ext.getCmp(prototype.id + '-CmbStatusIni');
        var cmbStatusFin = Ext.getCmp(prototype.id + '-CmbStatusFin');
        var cmbOrigen = Ext.getCmp(prototype.id + '-CmbOrigen');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var CmbType = Ext.getCmp(prototype.id + '-CmbType');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "4", "name": "PROCESSING DATE"},
                {"code": "1", "name": "REFERENCE"},
                {"code": "2", "name": "SYSTEM DATE"},
                {"code": "3", "name": "TICKET"},
                {"code": "5", "name": "TICKET FATHER"}
            ]
        }));

        cmbStatusIni.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "CPNStat_EXCH", "name": "CPNStat_EXCH"},
                {"code": "CPNStat_CHECKIN", "name": "CPNStat_CHECKIN"},
                {"code": "CPNStat_HISTORICALTICKET", "name": "CPNStat_HISTORICALTICKET"},
                {"code": "CPNStat_NOGO", "name": "CPNStat_NOGO"},
                {"code": "CPNStat_OK", "name": "CPNStat_OK"},
                {"code": "CPNStat_RNFD", "name": "CPNStat_RNFD"},
                {"code": "CPNStat_UNDET", "name": "CPNStat_UNDET"},
                {"code": "CPNStat_USED", "name": "CPNStat_USED"},
                {"code": "CPNStat_VOID", "name": "CPNStat_VOID"}
            ]
        }));

        cmbStatusFin.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "CPNStat_CHECKIN", "name": "CPNStat_CHECKIN"},
                {"code": "CPNStat_EXCH", "name": "CPNStat_EXCH"},
                {"code": "CPNStat_HISTORICALTICKET", "name": "CPNStat_HISTORICALTICKET"},
                {"code": "CPNStat_NOGO", "name": "CPNStat_NOGO"},
                {"code": "CPNStat_OK", "name": "CPNStat_OK"},
                {"code": "CPNStat_RFND", "name": "CPNStat_RFND"},
                {"code": "CPNStat_UNDET", "name": "CPNStat_UNDET"},
                {"code": "CPNStat_USED", "name": "CPNStat_USED"},
                {"code": "CPNStat_VOID", "name": "CPNStat_VOID"}
            ]
        }));

        cmbOrigen.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "NO", "name": "CADUCO"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "N", "name": "NOT PROCESSED"},
                {"code": "Y", "name": "PENDING SENDING"},
                {"code": "P", "name": "PROCESSED BY THE ROBOT"},
                {"code": "I", "name": "REGISTERED BY THE ROBOT"},
                {"code": "E", "name": "SENT TO THE ROBOT"},
                {"code": "S", "name": "NOT ACTION SABRE"},
                {"code": "F", "name": "NOT APPLICABLE RULE"}

            ]
        }));

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "1", "name": "TKT"},
                {"code": "2", "name": "CPN"}

            ]
        }));


    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/Search',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {
        // console.log(String(newValue))
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtReference = Ext.getCmp(prototype.id + '-txtReference');

        switch (String(newValue)) {
            case '1':
                txtReference.show();
                txtCia.hide();
                txtFrmaSerie.hide();
                txtSeq.hide();
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();

                txtFrmaSerie.setValue('');
                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                break;
            case '2':
            case '4':
                txtReference.hide();
                txtCia.hide();
                txtFrmaSerie.hide();
                txtSeq.hide();
                txtFilterDateFrom.show();
                txtFilterDateTo.show();

                txtFrmaSerie.setValue('');
                txtReference.setValue('');
                break;
            case '3':
            case '5':
                txtReference.hide();
                txtCia.show();
                txtFrmaSerie.show();
                txtSeq.show();
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();

                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                txtReference.setValue('');
                break;
        }
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbStatusChange: function (obj, newValue, oldValue, eOpts) {
        obj.setValue('');
    },
    onCmbStatusOrigen: function (obj, newValue, oldValue, eOpts) {
        obj.setValue('NO');
    },
    onSearchClick: function (btn) {
        var me = this;

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());
        if (comboBy === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Of Type');
            return;
        }

        if (comboBy === '2' || comboBy === '4') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }

            /*if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '' &&
             Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
             if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
             Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
             return;
             }
             }*/
        }

        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_CIA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtCia').getValue());
        me.beanTMP.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(0, 4));
        me.beanTMP.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(4, 10));
        me.beanTMP.IN_SEQ = Ext.String.trim(Ext.getCmp(prototype.id + '-txtSeq').getValue());
        me.beanTMP.IN_REFERENCE = Ext.String.trim(Ext.getCmp(prototype.id + '-txtReference').getValue());
        me.beanTMP.IN_HORAINI = Ext.String.trim(Ext.getCmp(prototype.id + '-txthora1').getValue());
        me.beanTMP.IN_HORAFIN = Ext.String.trim(Ext.getCmp(prototype.id + '-txthora2').getValue());
        me.beanTMP.IN_STATUS = Ext.String.trim(Ext.getCmp(prototype.id + '-CmbStatus').getValue());
        me.beanTMP.IN_CURRENCY = Ext.String.trim(Ext.getCmp(prototype.id + '-txtCurrency').getValue());
        me.beanTMP.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id + '-txtCountry').getValue());
        me.beanTMP.IN_STATUSINI = Ext.String.trim(Ext.getCmp(prototype.id + '-CmbStatusIni').getValue());
        me.beanTMP.IN_STATUSFIN = Ext.String.trim(Ext.getCmp(prototype.id + '-CmbStatusFin').getValue());
        me.beanTMP.IN_ORIGEN = Ext.String.trim(Ext.getCmp(prototype.id + '-CmbOrigen').getValue());
        me.beanTMP.IN_LOTE = Ext.String.trim(Ext.getCmp(prototype.id + '-txtLote').getValue());
        me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        me.beanTMP.IN_DATETO = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        me.beanTMP.IN_TYPE = Ext.getCmp(prototype.id + '-CmbType').getValue();
        me.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        store.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {
                Ext.getCmp(prototype.id + '-pagination').enable();
            }
        });

    },
    onSearchkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            //   Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            // Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },
    onRendererToltip: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A3676STROB'))) {
            case 'PROCESSED BY THE ROBOT':
                color = '#99FFCC';
                value = 'PROCESSED BY THE ROBOT';
                break;
            case 'ERROR ROBOT':
                color = '#F61A07';
                value = 'ERROR ROBOT';
                break;
            case 'PENDING SENDING':
                color = '#CCFF00';
                value = 'PENDING SENDING';
                break;
            case 'SENT TO THE ROBOT':
                color = '#FD9C2E';
                value = 'SENT TO THE ROBOT';
                break;
            case 'NOT MATCH':
                color = '#FBBF48';
                value = 'NOT MATCH';
                break;
            case 'NOT PROCESSED':
                color = '#F5A9A9';
                value = 'NOT PROCESSED';
                break;
            case 'NOT ACTION SABRE':
                color = '#F3F781';
                value = 'NOT ACTION SABRE';
                break;
            case 'NOT APPLICABLE RULE':
                color = '#F5DA81';
                value = 'NOT APPLICABLE RULE';
                break;


        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3389SEMAF'))) {
            case 'ORANGE':
                value = 'orange';
                break;
            case 'GREEN':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    winDataEntry: function (action, rec) {
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFND({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url,
                url02: prototype.url01
            }
        });
        win.show();
    },
    onExcelClick: function (obj) {
        if (Ext.Object.getSize(this.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSXFLOWN?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    onTxtClick: function (obj) {
        if (Ext.Object.getSize(this.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download TXT ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getFileTxt?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    }
});



