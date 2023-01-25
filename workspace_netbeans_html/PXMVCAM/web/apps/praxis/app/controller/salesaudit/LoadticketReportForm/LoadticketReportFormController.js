
Ext.define('Ext.Praxis.controller.salesaudit.LoadticketReportForm.LoadticketReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadticketReportFormController',

    /**
     * Constructor
     */
    bean: {},
    init: function (view) {
        var me = this;

    },

    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.idLoadticket + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.idLoadticket + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idLoadticket + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.idLoadticket + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.idLoadticket + '-txtFrmaSerie');
        if (obj.getValue() === "1") {
            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            txtCia.hide();
            txtFrmaSerie.hide();

        } else if (obj.getValue() === "2") {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.show();
            txtFrmaSerie.show();
        } else {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
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
        prototype.idLoadticket = 'LoadticketReportForm';
        prototype.url = CONTEXTPATH + '/LoadticketReportForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idLoadticket + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idLoadticket + '-pagginator-01').disable();
            Ext.getCmp(prototype.idLoadticket + '-lbl-currentPage').hide();
            Ext.getCmp(prototype.idLoadticket + '-lbl-pageCount').hide();
        } else {
            Ext.getCmp(prototype.idLoadticket + '-pagginator-01').enable();
            Ext.getCmp(prototype.idLoadticket + '-lbl-currentPage').show();
            Ext.getCmp(prototype.idLoadticket + '-lbl-pageCount').show();
        }
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idLoadticket + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.idLoadticket + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "2", "name": "TICKET"}
            ]
        }));


        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "F", "name": "AUTHORISED"},
                {"code": "A", "name": "ASSIGNED TO THE AUDITOR"},
                {"code": "J", "name": "ASSIGNED FOR THE EXECUTION OF THE ROBOT"},
                {"code": "B", "name": "DOES NOT EXIST IN DB"},
                {"code": "D", "name": "OTHER REJECTION CODE"},
                {"code": "C", "name": "NO REJECT CODE"},
                {"code": "Y", "name": "PENDING"},
                {"code": "G", "name": "PREVIOUS AUTHORISED"},
                {"code": "R", "name": "REJECTED"},
                {"code": "V", "name": "VOID"},
                {"code": "H", "name": "PBD DISPUTE"}

            ]
        }));


    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onRendererColumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3903FLAG'))) {
            case 'E':
                value = 'red';
                break;
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idLoadticket + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idLoadticket + '-store-grid00',
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

        grid00.setStore(store00);

        Ext.getCmp(prototype.idLoadticket + '-pagginator-01').setStore(store00);
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.IN_OPTION = Ext.getCmp(prototype.idLoadticket + '-search-type').getValue();
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.idLoadticket + '-txtFilterDateFrom').getRawValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.idLoadticket + '-txtFilterDateTo').getRawValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.idLoadticket + '-txtCia').getValue() + '' + Ext.getCmp(prototype.idLoadticket + '-txtFrmaSerie').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.idLoadticket + '-txtCountry').getValue();
        me.bean.IN_IATA = Ext.getCmp(prototype.idLoadticket + '-txtIATA').getValue();
        me.bean.IN_STATUS = Ext.getCmp(prototype.idLoadticket + '-CmbStatus').getValue();
        me.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idLoadticket + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idLoadticket + '-grid').getStore().loadPage(1, {
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
        var win = new Ext.Praxis.view.salesaudit.LoadticketReportForm.LoadticketReportFormSubiArchivo({
            params: {
                url01: prototype.url
            }
        });
        win.show();
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {

        var color = '#FFFFFF';
        switch (String(record.get('A3907FLAG'))) {
            case 'A':
                color = '#FF9966';
                value = 'ASSIGNED TO THE AUDITOR';
                break;
            case 'Y':
                color = '#CCFF00';
                value = 'PENDING';
                break;
            case 'F':
                color = '#81F781';
                value = 'AUTHORISED';
                break;
            case 'R':
                color = '#F78181';
                value = 'REJECTED';
                break;
            case 'V':
                color = '#FF0000';
                value = 'VOID';
                break;
            case 'B':
                color = '#B791EF';
                value = 'DOES NOT EXIST IN DB';
                break;
            case 'C':
                color = '#81BEF7';
                value = 'NO REJECT CODE';
                break;
            case 'D':
                color = '#F781D8';
                value = 'OTHER REJECTION CODE';
                break;
            case 'J':
                color = '#F3EFB6';
                value = 'ASSIGNED FOR THE EXECUTION OF THE ROBOT';
                break;
            case 'G':
                color = '#81F781';
                value = 'PREVIOUS AUTHORISED';
                break;
             case 'H':
                color = '#F3F781';
                value = 'PBD DISPUTE';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    img_clickHandler_RFND_validations: function () {
        global.Msg({
            msg: 'Are you sure to Process REFUND validations ?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idLoadticket + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: prototype.url + '/procedimiento/',
                        timeout: 60000000,
                        method: 'POST',
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            //console.log(res.data);
                            var vp_icon = 0;
                            if (res.data === 'OPERATION WAS SUCCESSFUL') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.idLoadticket + '-Contenedor').getController().onSearchClick();

                                    }


                                }});
                        }
                    });
                }

            }
        });
    },
    img_clickHandler_save_List: function () {
        var lstNew = new Array();
        var vlfte = '';
        var opflag;
        var grid = Ext.getCmp(prototype.idLoadticket + '-grid');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (Ext.String.trim(row.get('A3907FLAG')) === 'Y') {
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idLoadticket + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/mantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanlst: JSON.stringify(lstNew)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                //console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD VOID') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idLoadticket + '-Contenedor').getController().onSearchClick();

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
    }
});

