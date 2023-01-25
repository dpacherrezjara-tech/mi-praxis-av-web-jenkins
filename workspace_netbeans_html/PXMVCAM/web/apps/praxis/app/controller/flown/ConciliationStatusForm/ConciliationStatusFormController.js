
Ext.define('Ext.Praxis.controller.flown.ConciliationStatusForm.ConciliationStatusFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConciliationStatusFormController',
    bean: {},
    bean3: {},
    bean4: {},
    bean2: {},
    tipo: '1',
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
        this.setStoresFilters();

    },
    OnBeforeShow: function () {
        prototype.id = 'ConciliationStatusForm';
        prototype.url = CONTEXTPATH + '/ChangeOfStatusForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // alert('Controlador cargado correctamente')
        this.setStores();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3536FINA'))) {
            case 'D':
                value = 'silver';
                break;
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var grid02 = Ext.getCmp(prototype.id + '-gridDetalle');
        var grid03 = Ext.getCmp(prototype.id + '-gridDataControl');

        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchControl/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }//,
            //autoLoad: true,
            //pageSize: 25
        });

        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchControl/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 20
        });

        var store03 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchControlEjecu/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }//,
            //autoLoad: true,
            //pageSize: 25
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store02);
        //pager01.setStore(store01);

    },
    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var grid02 = Ext.getCmp(prototype.id + '-gridDetalle');
        var grid03 = Ext.getCmp(prototype.id + '-gridDataControl');

        switch (String(newValue)) {
            case '1':
                grid01.show();
                grid02.hide();
                grid03.hide();
                break;
            case '2':
                grid01.hide();
                grid02.hide();
                grid03.show();
                break;
        }
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbOrigen = Ext.getCmp(prototype.id + '-CmbOrigen');
        var cmbType = Ext.getCmp(prototype.id + '-Cmbtype');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "2", "name": "LOTE"},
                {"code": "1", "name": "SYSTEM DATE"}
            ]
        }));

        cmbOrigen.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "NO", "name": "CADUCO"}
            ]
        }));

        cmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "Conciliation Status"},
                {"code": "2", "name": "Robot control"}
            ]
        }));
    },
    onCmbStatusOrigen: function (obj, newValue, oldValue, eOpts) {
        obj.setValue('NO');
    },
    onCmbChange: function (obj, records, eOpts) {
        var txtLote = Ext.getCmp(prototype.id + '-txtLote');
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        //campo_cantidad.hide();
        if (obj.getValue() === "1") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            txtLote.hide();

            Ext.getCmp(prototype.id + '-txtLote').setValue('');

        } else if (obj.getValue() === "2") {

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtLote.show();

            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');

        } else {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtLote.hide();

            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.id + '-txtLote').setValue('');
        }
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
        return value;
    },
    onRendererColumnStatusContr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A3676STROB'))) {
            case 'Processed':
                color = '#CEF6CE';
                // value = 'PROCESSED BY THE ROBOT';
                break;
            case 'Error':
                color = '#F78181';
                // value = 'ERROR ROBOT';
                break;
            case 'Running':
                color = '#F5DA81';
                //value = 'PENDING SENDING';
                break;


        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererToltip: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnOnLote: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail01: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridData').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(false);
        Ext.getCmp(prototype.id + '-gridDataControl').setVisible(false);
        Ext.getCmp(prototype.id + '-pagginator-legend').setVisible(false);
        Ext.getCmp(prototype.id + '-pagginator-DET').setVisible(true);

        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(true);
        ///CARGANDO EL DETALLE DE LA GRTILLA
        this.tipo = '2';
        var origen = '';
        if (rec.data.A3676ORIG === 'RFND BSPLINK') {
            origen = 'RI';
        }
        if (rec.data.A3676ORIG === 'RFND ASR') {
            origen = 'RD';
        }
        if (rec.data.A3676ORIG === 'NOGO') {
            origen = 'NO';
        }
        if (rec.data.A3676ORIG === 'RFND CHARGEBACK') {
            origen = 'CB';
        }
        if (rec.data.A3676ORIG === 'EMD RFND') {
            origen = 'EM';
        }

        this.bean2.IN_OPTION = '4';
        this.bean2.IN_ORIGEN = origen;
        this.bean2.IN_LOTE = rec.data.A3676LOTE;
        this.bean2.IN_REFERENCE = rec.data.A3676NARCH;
        this.bean2.IN_DATEFROM = '';
        this.bean2.IN_DATETO = '';
        this.bean2.IN_CIA= '';
        this.bean2.IN_FORMA= '';
        this.bean2.IN_SERIE= '';
        this.bean2.IN_SEQ= '';
        this.bean2.IN_HORAINI= '';
        this.bean2.IN_HORAFIN= '';
        this.bean2.IN_STATUS= '';
        this.bean2.IN_CURRENCY= '';
        this.bean2.IN_COUNTRY= '';
        this.bean2.IN_STATUSINI= '';
        this.bean2.IN_STATUSFIN= '';
        /*PARA EXPORTA*/
        this.bean4.IN_OPTION = '6';
        this.bean4.IN_ORIGEN = origen;
        this.bean4.IN_LOTE = '';
        this.bean4.IN_REFERENCE = rec.data.A3676NARCH;
        this.bean4.IN_DATEFROM = '';
        this.bean4.IN_DATETO = rec.data.A3676LOTE;
        this.bean4.IN_CIA= '';
        this.bean4.IN_FORMA= '';
        this.bean4.IN_SERIE= '';
        this.bean4.IN_SEQ= '';
        this.bean4.IN_HORAINI= '';
        this.bean4.IN_HORAFIN= '';
        this.bean4.IN_STATUS= '';
        this.bean4.IN_CURRENCY= '';
        this.bean4.IN_COUNTRY= '';
        this.bean4.IN_STATUSINI= '';
        this.bean4.IN_STATUSFIN= '';
        
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(this.bean2)
                        //beanString: bean

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3676TOTPAGI);
                } else {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }
                //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

            }
        });

    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },
    onCmbRobotAfterRender: function (obj) {
        obj.setValue('1');
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onBackClick: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(true);
        Ext.getCmp(prototype.id + '-pagginator-legend').setVisible(true);
        this.tipo = '1';
        //Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-gridDataControl').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.id + '-pagginator-01').setVisible(false);
        Ext.getCmp(prototype.id + '-pagginator-legend').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-txt').setVisible(false);
        Ext.getCmp(prototype.id + '-pagginator-pri').setVisible(false);
        Ext.getCmp(prototype.id + '-pagginator-DET').setVisible(false);
    },
    imgSearch_clickHandler: function (obj, records, eOpts) {
        var cmbsearch = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var CmbOrigen = Ext.getCmp(prototype.id + '-CmbOrigen').getValue();
        var CmbType = Ext.getCmp(prototype.id + '-Cmbtype').getValue();
        var txtLote = Ext.getCmp(prototype.id + '-txtLote').getValue();

        if (cmbsearch === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-search-type').focus();", 100);
            });
            return;
        }
        if (cmbsearch === '1') {
            if (txtDateFrom === '') {
                Ext.MessageBox.alert('PRAXIS', "Enter Date From", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }
            if (txtDateTo === '') {
                Ext.MessageBox.alert('PRAXIS', "Enter Date To", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
            if (txtDateFrom !== '' && txtDateTo !== '') {

                if (global.existeFecha(txtDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
                if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                    Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
        } else {
            if (txtLote === '') {
                Ext.MessageBox.alert('PRAXIS', "Enter Lote", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtLote').focus();", 100);
                });
                return;
            }
        }


        if (CmbType === '1') {
            //datos capturados del texto
            this.bean.IN_OPTION = cmbsearch;
            this.bean.IN_DATEFROM = txtDateFrom;
            this.bean.IN_DATETO = txtDateTo;
            this.bean.IN_ORIGEN = CmbOrigen;
            this.bean.IN_LOTE = txtLote;
            this.bean.IN_REFERENCE = '';
            this.SearchReport(this.bean, obj === true ? obj : false);
        } else {

            if (obj !== true) {
                switch (CmbOrigen) {
                    case 'EM':
                        this.bean3.IN_TYPE = 'EMD RFND';
                        break;
                    case 'PB':
                        this.bean3.IN_TYPE = 'POST BILLING';
                        break;
                    case 'RI':
                        this.bean3.IN_TYPE = 'RFND BSPLINK';
                        break;
                    case 'RD':
                        this.bean3.IN_TYPE = 'RFND ASR';
                        break;
                    case 'CB':
                        this.bean3.IN_TYPE = 'RFND CHARGEBACK';
                        break;


                }

                this.bean3.IN_OPTION = cmbsearch;
                this.bean3.IN_DATEFROM = txtDateFrom;
                this.bean3.IN_DATETO = txtDateTo;
                this.bean3.IN_ORIGEN = '';//'MEXVN';//'CSCVI';
                this.bean3.IN_LOTE = '';
                this.bean3.IN_REFERENCE = txtLote;
                Ext.getCmp(prototype.id + '-gridDataControl').getStore().loadPage(1, {
                    params: {
                        beanString: JSON.stringify(this.bean3)
                                //beanString: bean

                    }, callback: function (records, operation, success) {
                        if (records.length !== 0) {
                            Ext.getCmp(prototype.id + '-lbl-total').setText(records[0].data.A3676TOTPAGI);
                        } else {
                            Ext.getCmp(prototype.id + '-lbl-total').setText('0');
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});

                        }

                    }
                });

            } else {
                this.SearchReport(this.bean3, obj === true ? obj : false);
            }


        }


    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            if (me.tipo === '1') {
                me.exportExcel(prototype.url + '/getXLSXCAB?beanString=' + encodeURI(JSON.stringify(bean)));
            } else {
                me.exportExcel(prototype.url + '/getFileTxt?beanString=' + encodeURI(JSON.stringify(this.bean4)));
            }

        } else {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.id + '-lbl-total').setText(records[0].data.A3676TOTPAGI);
                    } else {
                        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
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
    onExcelClick: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    onFilterClick: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();

        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.bean2;
    },

});


