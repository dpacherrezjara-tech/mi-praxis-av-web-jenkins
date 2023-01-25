
Ext.define('Ext.Praxis.controller.salesaudit.ComparativeReportForm.ComparativeReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ComparativeReportFormController',

    bean: {},
    bean2: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.idcompara + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, me);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() !== 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.bean),
            totRow: totRow
        };
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idcompara + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idcompara + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idcompara + '-pagginator-01').enable();
        }
    },
    onChkChangeDetail: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idcompara + '-btn-search').fireEvent('click', {});
        var grid01 = Ext.getCmp(prototype.idcompara + '-gridData');
        var grid02 = Ext.getCmp(prototype.idcompara + '-gridDetalle');
        var grid03 = Ext.getCmp(prototype.idcompara + '-gridDetalle2');
        var total1 = Ext.getCmp(prototype.idcompara + '-lbl-total');
        var total2 = Ext.getCmp(prototype.idcompara + '-lbl-totalDeta');
        var total3 = Ext.getCmp(prototype.idcompara + '-lbl-totalDeta2');
        var excel2 = Ext.getCmp(prototype.idcompara + '-btn-excel2');
        var excel = Ext.getCmp(prototype.idcompara + '-btn-excel');
        if (!newValue) {
            grid01.show();
            total3.show();
            grid02.hide();
            grid03.hide();
            total1.hide();
            total2.hide();
            excel2.hide();
            excel.hide();

        } else {
            grid01.hide();
            grid02.hide();
            total3.hide();
            total2.hide();
            grid03.show();
            total1.show();
            excel2.show();
            excel.hide();
        }


    },
    OnBeforeShow: function () {
        prototype.idcompara = 'ComparativeReportForm';
        prototype.url = CONTEXTPATH + '/ComparativeReportForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idcompara + '-gridData');
        var grid02 = Ext.getCmp(prototype.idcompara + '-gridDetalle');
        var grid03 = Ext.getCmp(prototype.idcompara + '-gridDetalle2');

        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/Search/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/Search/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            pageSize: 25
        });
        var store03 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/Search/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            pageSize: 25
        });
        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        Ext.getCmp(prototype.idcompara + '-pagginator-01').setStore(store03);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbPeriAfterRender: function (obj) {
        obj.setValue('1');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idcompara + '-cmbSearch');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "2", "name": "PERIOD"}
            ]
        }));
        /*cmbPer1.bindStore(Ext.create('Ext.data.Store', {
         data: [
         {"code": "1", "name": "1"},
         {"code": "2", "name": "2"},
         {"code": "3", "name": "3"},
         {"code": "4", "name": "4"},
         {"code": "5", "name": "5"},
         {"code": "6", "name": "6"},
         {"code": "7", "name": "7"},
         {"code": "8", "name": "8"},
         {"code": "9", "name": "9"}
         ]
         }));
         cmbPer2.bindStore(Ext.create('Ext.data.Store', {
         data: [
         {"code": "1", "name": "1"},
         {"code": "2", "name": "2"},
         {"code": "3", "name": "3"},
         {"code": "4", "name": "4"},
         {"code": "5", "name": "5"},
         {"code": "6", "name": "6"},
         {"code": "7", "name": "7"},
         {"code": "8", "name": "8"},
         {"code": "9", "name": "9"}
         ]
         }));*/

    },
    onCmbTypeChange: function (obj, records, eOpts) {
        var cmbDateFromYear = Ext.getCmp(prototype.idcompara + '-cmbDateFromYear');
        var cmbDateFromMonth = Ext.getCmp(prototype.idcompara + '-cmbDateFromMonth');
        var cmbDateToYear = Ext.getCmp(prototype.idcompara + '-cmbDateToYear');
        var cmbDateToMonth = Ext.getCmp(prototype.idcompara + '-cmbDateToMonth');
        var txtFilterDateFrom = Ext.getCmp(prototype.idcompara + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idcompara + '-txtFilterDateTo');
        if (obj.getValue() === "2") {
            cmbDateFromYear.show();
            cmbDateFromMonth.show();
            cmbDateToYear.show();
            cmbDateToMonth.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
        } else if (obj.getValue() === "1") {
            cmbDateFromYear.hide();
            cmbDateFromMonth.hide();
            cmbDateToYear.hide();
            cmbDateToMonth.hide();

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
        } else {
            cmbDateFromYear.hide();
            cmbDateFromMonth.hide();
            cmbDateToYear.hide();
            cmbDateToMonth.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
        }
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCmbDateAfterRender: function (obj) {
        var fecha = new Date();
        obj.setValue(fecha.getFullYear());
    },
    onCmbMonthAfterRender: function (obj) {
        var fecha = new Date();
        fecha = fecha.getMonth() + 1;
        if (fecha <= 9) {
            fecha = 0 + '' + fecha.toString();
        } else {
            fecha = fecha.toString();
        }
        ;
        obj.setValue(win.getAbreviaturaMes(fecha));
    },
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var cmbSearch = Ext.getCmp(prototype.idcompara + '-cmbSearch').getValue();
        var cmbDateFromYear = Ext.getCmp(prototype.idcompara + '-cmbDateFromYear').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.idcompara + '-cmbDateFromMonth').getValue();
        var cmbDateToYear = Ext.getCmp(prototype.idcompara + '-cmbDateToYear').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.idcompara + '-cmbDateToMonth').getValue();

        var txtFilterDateFrom = Ext.getCmp(prototype.idcompara + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idcompara + '-txtFilterDateTo').getRawValue();
        var txtiata = Ext.getCmp(prototype.idcompara + '-txtiata').getValue();
        var txtcountry = Ext.getCmp(prototype.idcompara + '-txtcountry').getValue();

        if (cmbSearch === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (cmbSearch === '1') {
            if (txtFilterDateFrom !== '') {
                if (txtFilterDateTo === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (txtFilterDateTo !== '') {
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }

            if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

                if (global.existeFecha(txtFilterDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idcompara + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idcompara + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
            me.bean.IN_DATEFROM = txtFilterDateFrom;
            me.bean.IN_DATETO = txtFilterDateTo;
            me.bean.IN_OPTION = cmbSearch;
            me.bean.IN_IATA = txtiata;
            me.bean.IN_COUNTRY = txtcountry;
        } else if (cmbSearch === '2') {
            me.bean.IN_DATEFROM = cmbDateFromYear + "" + win.getMonthAbbreviation(cmbDateFromMonth);
            me.bean.IN_DATETO = cmbDateToYear + "" + win.getMonthAbbreviation(cmbDateToMonth);
            me.bean.IN_OPTION = cmbSearch;
            me.bean.IN_IATA = txtiata;
            me.bean.IN_COUNTRY = txtcountry;
        }
        if (Ext.getCmp(prototype.idcompara + '-checkDetail').getValue()) {
            me.bean.IN_TYPE = '1';
            me.bean.pexcel = Ext.getCmp(prototype.idcompara + '-pagination').getValue() ? 0 : 1;
        } else {
            me.bean.IN_TYPE = '0';
            me.bean.pexcel = 1;
        }
        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.idcompara + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgClear_clickHandler: function (obj, e) {
        Ext.getCmp(prototype.idcompara + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.idcompara + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.idcompara + '-txtiata').setValue('');
        Ext.getCmp(prototype.idcompara + '-txtcountry').setValue('');
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idcompara + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idcompara + '-gridDetalle2').getStore().removeAll();
            if (me.bean.IN_TYPE === '1') {
                Ext.getCmp(prototype.idcompara + '-gridDetalle2').getStore().loadPage(1, {
                    params: bean,
                    callback: function (records, operation, success) {
                        if (records.length !== 0) {
                        } else {
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});

                        }

                    }
                });
            } else {
                Ext.getCmp(prototype.idcompara + '-gridData').getStore().loadPage(1, {
                    params: bean,
                    callback: function (records, operation, success) {
                        if (records.length !== 0) {
                            Ext.getCmp(prototype.idcompara + '-lbl-totalDeta').setText(records[0].data.A3950TOTAL);
                        } else {
                            Ext.getCmp(prototype.idcompara + '-lbl-totalDeta').setText('0');
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});

                        }

                    }
                });
            }


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
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(false);
    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idcompara + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail01: function (rowIndex) {
        var me = this;
        var gridData = Ext.getCmp(prototype.idcompara + '-gridData');
        var total = Ext.getCmp(prototype.idcompara + '-lbl-total');
        var totalDeta = Ext.getCmp(prototype.idcompara + '-lbl-totalDeta');

        var gridDetalle = Ext.getCmp(prototype.idcompara + '-gridDetalle');
        var totalDeta2 = Ext.getCmp(prototype.idcompara + '-lbl-totalDeta2');
        var back = Ext.getCmp(prototype.idcompara + '-btn-back');
        var excel = Ext.getCmp(prototype.idcompara + '-btn-excel');
        var excel2 = Ext.getCmp(prototype.idcompara + '-btn-excel2');

        gridData.hide();
        totalDeta.hide();
        total.hide();
        excel2.hide();

        gridDetalle.show();
        totalDeta2.show();
        back.show();
        excel.show();

        ///CARGANDO EL DETALLE DE LA GRTILLA 
        var grid = Ext.getCmp(prototype.idcompara + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        me.bean2.IN_DATEFROM = rec.data.A3950FREGI;
        me.bean2.IN_DATETO = rec.data.A3950FREGI;
        me.bean2.IN_OPTION = '3';
        me.bean2.IN_TYPE = '0';
        me.bean2.IN_IATA = Ext.getCmp(prototype.idcompara + '-txtiata').getValue();
        me.bean2.IN_COUNTRY = rec.data.A3950PAIS;
        me.bean2.pexcel = 0;
        Ext.getCmp(prototype.idcompara + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idcompara + '-gridDetalle').getStore().loadPage(1, {
            params: me.bean2,
            callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idcompara + '-lbl-totalDeta2').setText(records[0].data.A3950TOTAL);
                } else {
                    Ext.getCmp(prototype.idcompara + '-lbl-totalDeta2').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });


    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(Ext.String.trim(record.get('A3950STATO')))) {
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
    onExcelClick: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    imgExcel_clickHandler: function (obj, e) {
        var me = this;
        if (me.bean2.IN_COUNTRY!=='') {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.bean2)));
        } else {
            global.Msg({msg: 'Select Of By'});
            return;
        }

    },
    onBackClick: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(true);

        //Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta2').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(false);
    },
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.idcompara + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.idcompara + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idcompara + '-gridDetalle2').getStore().removeAll();
    }

});

