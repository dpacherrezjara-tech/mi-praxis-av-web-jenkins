
Ext.define('Ext.Praxis.controller.sales.ADJMassiveaccountingForm.ADJMassiveaccountingFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ADJMassiveaccountingFormController',

    stack: [],
    bean: {},
    beanDelete: {},
    init: function (view) {
        var me = this;
    },
    afterRender: function () {
        var me = this;
        this.setStoresFilters();
        this.setStoresGridadjs();

        Ext.getCmp(prototype.idADJMassive + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    OnBeforeShow: function () {
        prototype.idADJMassive = 'ADJMassiveaccountingForm';
        prototype.url = CONTEXTPATH + '/ADJMassiveaccountingForm';
        prototype.idADJLoadADJMassive = 'LoadADJMassiveaccountingSubiArchivo';
        prototype.idDataEntryADJMassive = 'DataEntryADJMassive';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    setStoresGridadjs: function () {
        var gridadj01 = Ext.getCmp(prototype.idADJMassive + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/search/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 25
        });
        gridadj01.setStore(store01);
        Ext.getCmp(prototype.idADJMassive + '-pagginator-01').setStore(store01);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idADJMassive + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idADJMassive + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idADJMassive + '-pagginator-01').enable();
        }
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresFilters: function () {
        var CmbSource = Ext.getCmp(prototype.idADJMassive + '-ComboSource');
        var CmbStatus = Ext.getCmp(prototype.idADJMassive + '-CmbStatus');
        var CmbTransaction = Ext.getCmp(prototype.idADJMassive + '-CmbTransaction');
        CmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"},
                {"code": "MAN", "name": "MAN"}
            ]
        }));

        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "Y", "name": "INITIAL"},
                {"code": "A", "name": "APROVED"},
                {"code": "P", "name": "PROCESSED"},
                {"code": "E", "name": "ERROR"},
                {"code": "X", "name": "VOID"}


            ]
        }));

        CmbTransaction.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "SALE", "name": "SALE"},
                {"code": "EXCH", "name": "EXCH"},
                {"code": "RFND", "name": "RFND"},
                {"code": "FLWN", "name": "FLWN"},
                {"code": "EXCP", "name": "EXCP"},
                {"code": "RFCP", "name": "RFCP"},
                {"code": "IXP", "name": "IXP"},
                {"code": "DISC", "name": "DISC"},
                {"code": "IXC", "name": "IXC OAL"},
                {"code": "EMFN", "name": "EMD-FLOWN"}


            ]
        }));

    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(Ext.String.trim(record.get('A3344FLAG')))) {
            case 'VOID':
                color = '#FF0000';
                value = 'VOID';
                break;
            case 'APPROVED':
                color = '#81F7BE';
                value = 'APPROVED';
                break;
            case 'INITIAL':
                color = '#EFE41B';
                value = 'INITIAL';
                break;
            case 'PENDING':
                color = '#F5A9F2';
                value = 'PENDING';
                break;
            case 'ERROR':
                color = '#FF0000';
                value = 'ERROR';
                break;
            case 'D':
                color = '#F2F5A9';
                value = 'D';
                break;
            case 'C':
                color = '#E3DAED';
                value = 'C';
                break;
            case 'FVAL':
                color = '#FF9966';
                value = 'FVAL';
                break;

        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnNetoRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value !== 0) {
            metaData.style = "background:#81F7BE !important";
        } else {
            metaData.style = "background:#D5F4D5 !important";
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    onDetailClick: function (gridadj, rowIndex, colIndex) {
        // MODO ES ESCRITURA LE MODO LECTURA
        var me = this;
        var rec = gridadj.getStore().getAt(rowIndex);
        me.winDataEntry(rec);
    },
    winDataEntry: function (rec) {
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.sales.ADJMassiveaccountingForm.DataEntryADJMassive({
            params: {
                rec: rec
            }
        });
        win.show();
    },
    winDataNewEntry: function () {
        var win = new Ext.Praxis.view.sales.ADJMassiveaccountingForm.LoadADJMassiveaccountingSubiArchivo({
            params: {}
        });
        win.show();
    },

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var txtFilterDateFrom = Ext.getCmp(prototype.idADJMassive + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idADJMassive + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.idADJMassive + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.idADJMassive + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.idADJMassive + '-txtSeq').getValue();
        var txtAudit = Ext.getCmp(prototype.idADJMassive + '-Audit').getValue();
        var CmbTransaction = Ext.getCmp(prototype.idADJMassive + '-CmbTransaction').getValue();
        var CmbStatus = Ext.getCmp(prototype.idADJMassive + '-CmbStatus').getValue();
        var ComboSource = Ext.getCmp(prototype.idADJMassive + '-ComboSource').getValue();

        if (txtFilterDateFrom === '' && txtFilterDateTo === '' && txtFrmaSerie === '') {
            global.Msg({msg: 'Select Of Search By'});
            return;
        }

        me.bean.VL_DATEFROM = txtFilterDateFrom.replace(new RegExp('/', 'g'), '');
        me.bean.VL_DATETO = txtFilterDateTo.replace(new RegExp('/', 'g'), '');
        me.bean.VP_TKT = txtFrmaSerie;
        me.bean.VP_CIA = txtCia;
        me.bean.VP_USER = txtAudit;
        me.bean.VP_SEQ = txtSeq;
        me.bean.VP_FUENT = ComboSource;
        me.bean.VP_STAS = CmbStatus;
        me.bean.VP_TYPE = CmbTransaction;
        me.bean.pexcel = Ext.getCmp(prototype.idADJMassive + '-pagination').getValue() ? 0 : 1;

        me.SearchReportADJ(me.bean, obj === true ? obj : false);
    },
    //<editor-fold defaultstate="collapsed" desc="SearchReportADJ">
    SearchReportADJ: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idADJMassive + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idADJMassive + '-gridData').getStore().loadPage(1, {
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
    //</editor-fold>

    imgExcel_clickHandler: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },

    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.idADJMassive + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },

    img_clickHandler_save_List: function () {
        var lstNew = new Array();
        var gridadj = Ext.getCmp(prototype.idADJMassive + '-gridData');
        if (gridadj.getSelectionModel().hasSelection()) {
            var selection = gridadj.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = gridadj.getSelectionModel().getSelection()[i];
                //Ext.String.trim(row.get('A2548FTE')) !== 'ASR'
                lstNew.push(row.data);

            }
        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }

        if (lstNew.length > 0) {
            global.Msg({
                msg: 'Are you sure to change the status to pending processing?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idADJMassive + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/insertTKT/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanlst: JSON.stringify(lstNew)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD UPDATED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idADJMassive + '-Contenedor').getController().imgSearch_clickHandler();

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
    onDeleteClick: function (gridadj, rowIndex, colIndex) {
        var me = this;
        var rec = gridadj.getStore().getAt(rowIndex);
        me.beanDelete.A3344CIA = rec.data.A3344CIA;
        me.beanDelete.A3344FORMA = rec.data.A3344FORMA;
        me.beanDelete.A3344SERIE = rec.data.A3344SERIE;
        me.beanDelete.A3344SEQ = rec.data.A3344SEQ;
        me.beanDelete.A3344CPN = rec.data.A3344CPN;
        me.beanDelete.A3344TNC = rec.data.A3344TNC;
        me.beanDelete.A3344CRRL = rec.data.A3344CRRL;
        if (rec.data.A3344FLAG === 'INITIAL' || rec.data.A3344FLAG === 'PENDING') {
            global.Msg({
                msg: 'Are you sure to change the status to Canceled?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idADJMassive + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/DeleteContabili/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanDelete)},
                            /* params: {
                             A2024CODER: rec.data.A2024CODER,
                             A2024CUPON: rec.data.A2024CUPON,
                             A2024SEQ: rec.data.A2024SEQ,
                             A2024CORRL: rec.data.A2024CORRL
                             },*/
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data.dbException.MESSAGE === 'RECORD VOIDED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data.dbException.MESSAGE, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idADJMassive + '-Contenedor').getController().imgSearch_clickHandler();

                                        }


                                    }});
                            }
                        });
                    }

                }
            });

        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'In order to cancel the registration, it must be in the initial state or pending to process');
            return;
        }
    },
    imgClear_clickHandler: function (obj, e) {

        Ext.getCmp(prototype.idADJMassive + '-txtFrmaSerie').setValue('');
        Ext.getCmp(prototype.idADJMassive + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.idADJMassive + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.idADJMassive + '-Audit').setValue('');
    },
    // </editor-fold>
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
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
    }

});


