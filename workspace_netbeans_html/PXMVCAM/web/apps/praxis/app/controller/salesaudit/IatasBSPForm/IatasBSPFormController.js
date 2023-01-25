
Ext.define('Ext.Praxis.controller.salesaudit.IatasBSPForm.IatasBSPFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IatasBSPFormController',

    bean: {},
    bean2: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
        this.setStoresFilters();

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStores();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A2844FLAG'))) {
            case '1':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    OnBeforeShow: function () {
        prototype.id = 'IatasBSPForm';
        prototype.url = CONTEXTPATH + '/IatasBSPForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var grid02 = Ext.getCmp(prototype.id + '-gridDetalle');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchBspIATAS',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store00);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);

        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchBspIATAS/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        grid02.setStore(store02);

    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "2", "name": "IATA"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "8", "name": "SYSTEM UPDATE"}

            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "8", "name": "ACCREDITED"},
                {"code": "5", "name": "DEFAULT/SUSPENSION NO COMM."},
                {"code": "1", "name": "NOT ACCREDITED"},
                {"code": "2", "name": "PENDING"},
                {"code": "0", "name": "TERMINATED"},
                {"code": "6", "name": "REVIEW/RISK/SUSPENSION WITH COMM."}

            ]
        }));
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbAfterRender: function (obj) {
        obj.setValue('');
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        switch (String(newValue)) {
            case '1':
            case '8':
                txtFilterDateTo.show();
                txtFilterDateFrom.show();
                txtIATA.hide();
                txtIATA.setValue("");
                break;
            case '2':
                txtFilterDateTo.hide();
                txtFilterDateFrom.hide();
                txtIATA.show();
                txtFilterDateTo.setValue("");
                txtFilterDateFrom.setValue("");
                break;
            case '':
                txtFilterDateTo.hide();
                txtFilterDateFrom.hide();
                txtIATA.hide();
                txtFilterDateTo.setValue("");
                txtFilterDateFrom.setValue("");
                txtIATA.setValue("");
                break;
        }
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onBackClick: function (obj, e) {
        var gridData = Ext.getCmp(prototype.id + '-gridData');
        var filter = Ext.getCmp(prototype.id + '-box-filter-01');
        var pagginator = Ext.getCmp(prototype.id + '-pagginator-legend');
        var pagination = Ext.getCmp(prototype.id + '-pagination');
        var search = Ext.getCmp(prototype.id + '-btn-search');

        var gridDetalle = Ext.getCmp(prototype.id + '-gridDetalle');
        var back = Ext.getCmp(prototype.id + '-btn-back');
        var excel = Ext.getCmp(prototype.id + '-btn-excel');
        var excel2 = Ext.getCmp(prototype.id + '-btn-excel2');

        gridData.setVisible(true);
        filter.setVisible(true);
        pagginator.setVisible(true);
        excel.setVisible(true);
        pagination.setVisible(true);
        search.setVisible(true);

        gridDetalle.setVisible(false);
        back.setVisible(false);
        excel2.setVisible(false);
    },
    imgSearch_clickHandler: function (obj, records, eOpts) {
        var cmbsearch = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var txtcountry = Ext.getCmp(prototype.id + '-txtcountry').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        if (cmbsearch === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-search-type').focus();", 100);
            });
            return;
        }
        /*if (txtFilterDateFrom === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtFilterDateTo === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }*/
        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

            if (global.existeFecha(txtFilterDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtFilterDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
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
        this.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        //datos capturados del texto
        this.bean.IN_OPTION = cmbsearch;
        this.bean.IN_DATEFROM = txtFilterDateFrom;
        this.bean.IN_DATETO = txtFilterDateTo;
        this.bean.IN_IATA = txtIATA;
        this.bean.IN_COUNTRY = txtcountry;
        this.bean.IN_STATUS = CmbStatus;
        this.bean.IN_FILENAMES = '';
        this.bean.IN_NUMBERWeekly = '';
        this.bean.IN_SELET_TYPE = '';
        this.SearchReport(this.bean, obj === true ? obj : false);

    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        //Ext.getCmp(prototype.id + '-lbl-total').setText(records[0].total);
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
        var gridData = Ext.getCmp(prototype.id + '-gridData');
        var filter = Ext.getCmp(prototype.id + '-box-filter-01');
        var pagginator = Ext.getCmp(prototype.id + '-pagginator-legend');
        var pagination = Ext.getCmp(prototype.id + '-pagination');
        var search = Ext.getCmp(prototype.id + '-btn-search');

        var gridDetalle = Ext.getCmp(prototype.id + '-gridDetalle');
        var back = Ext.getCmp(prototype.id + '-btn-back');
        var excel = Ext.getCmp(prototype.id + '-btn-excel');
        var excel2 = Ext.getCmp(prototype.id + '-btn-excel2');

        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();

        gridData.setVisible(true);
        filter.setVisible(true);
        pagginator.setVisible(true);
        excel.setVisible(true);
        pagination.setVisible(true);
        search.setVisible(true);

        gridDetalle.setVisible(false);
        back.setVisible(false);
        excel2.setVisible(false);
    },
    searchform_detalle_excel: function () {
        var me = this;
        me.exportExcel(prototype.url + '/getXLSX2?beanString=' + encodeURI(JSON.stringify(me.bean2)));
    },
    onRendererColumnOn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail01: function (rowIndex) {
        var gridData = Ext.getCmp(prototype.id + '-gridData');
        var filter = Ext.getCmp(prototype.id + '-box-filter-01');
        var pagginator = Ext.getCmp(prototype.id + '-pagginator-legend');
        var pagination = Ext.getCmp(prototype.id + '-pagination');
        var search = Ext.getCmp(prototype.id + '-btn-search');

        var gridDetalle = Ext.getCmp(prototype.id + '-gridDetalle');
        var back = Ext.getCmp(prototype.id + '-btn-back');
        var excel = Ext.getCmp(prototype.id + '-btn-excel');
        var excel2 = Ext.getCmp(prototype.id + '-btn-excel2');

        gridData.setVisible(false);
        filter.setVisible(false);
        pagginator.setVisible(false);
        pagination.setVisible(false);
        search.setVisible(false);
        excel.setVisible(false);


        gridDetalle.setVisible(true);
        back.setVisible(true);
        excel2.setVisible(true);

        ///CARGANDO EL DETALLE DE LA GRTILLA 
        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        this.bean2.pexcel = 0;
        //datos capturados del texto
        this.bean2.IN_OPTION = '9';
        this.bean2.IN_DATEFROM = '';
        this.bean2.IN_DATETO = '';
        this.bean2.IN_IATA = Ext.String.trim(rec.data.A2844AGENT);
        this.bean2.IN_COUNTRY = Ext.String.trim(rec.data.A2844PAIS);
        this.bean2.IN_STATUS = '';
        this.bean2.IN_FILENAMES = '';
        this.bean2.IN_NUMBERWeekly = '';
        this.bean2.IN_SELET_TYPE = '';
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
            params: this.bean2,
            callback: function (records, operation, success) {
                if (records.length !== 0) {
                    // Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3268TOTALPAG);
                } else {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }
                //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

            }
        });


    },

    onRendererColumnOnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3268FLAG'))) {
            case 'Sin data':
                value = 'silver';
                break;
            case 'Sent to BSPLINK':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
});


