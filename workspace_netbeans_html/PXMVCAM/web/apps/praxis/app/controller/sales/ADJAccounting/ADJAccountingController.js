Ext.define('Ext.Praxis.controller.sales.ADJAccounting.ADJAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ADJAccountingController',
    stack: [],
    bean: {},
    init: function (view) {
        var me = this;
    },
    afterRender: function () {
        this.setStoresFilters();
        this.setStoresGridadjs();

        Ext.getCmp(prototype.idadj + '-pagginator-01').getCmpPaginator().on('beforechange', this.onPagingBeforeChange01, this);
    },
    OnBeforeShow: function () {
        prototype.idadj = 'ADJAccountingForm';
        prototype.idbrowser = '-browser-tkt';
        prototype.url = CONTEXTPATH + '/ADJAccounting';
        prototype.widthContenedor = 1395;
        prototype.heightContenedor = 605;
    },
    setStoresGridadjs: function () {
        var gridadj01 = Ext.getCmp(prototype.idadj + '-gridData');
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
        Ext.getCmp(prototype.idadj + '-pagginator-01').setStore(store01);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() !== 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.bean),
            totRow: totRow
        };
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idadj + '-search-by');
        var cmbProcess = Ext.getCmp(prototype.idadj + '-CmbProcess');
        var CmbTransaction = Ext.getCmp(prototype.idadj + '-CmbTransaction');
        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "ADJUSTMENT DATE"},
                {"code": "2", "name": "TICKET"}
            ]
        }));

        cmbProcess.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "IN", "name": "INITIAL"},
                {"code": "OK", "name": "OK"},
                {"code": "PP", "name": "PENDING"},
                {"code": "AN", "name": "VOID"}


            ]
        }));

        CmbTransaction.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "1", "name": "SALE"},
                {"code": "2", "name": "EXCH"},
                {"code": "3", "name": "RFND"},
                {"code": "5", "name": "FLOWN"},
                {"code": "6", "name": "EXCP"},
                {"code": "7", "name": "RFCP"},
                {"code": "8", "name": "IXP"},
                {"code": "9", "name": "DISC"},
                {"code": "10", "name": "IXC OAL"},
                {"code": "13", "name": "EMD-FLOWN"}

            ]
        }));

    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtIATA = Ext.getCmp(prototype.idadj + '-txtIATA');
        var txtFilterDateFrom = Ext.getCmp(prototype.idadj + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idadj + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.idadj + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.idadj + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.idadj + '-txtSeq');
        if (obj.getValue() === "1") {

            txtIATA.show();
            txtFilterDateFrom.show();
            txtFilterDateTo.show();

            txtCia.hide();
            txtFrmaSerie.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();

            Ext.getCmp(prototype.idadj + '-txtFrmaSerie').setValue('');
            Ext.getCmp(prototype.idadj + '-txtSeq').setValue('');

        } else if (obj.getValue() === "2") {
            txtIATA.hide();
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();

            txtCia.show();
            txtFrmaSerie.show();
            txtFrmaSerie.show();
            txtSeq.show();

            Ext.getCmp(prototype.idadj + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.idadj + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.idadj + '-txtIATA').setValue('');
        } else {
            txtIATA.hide();
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();

            txtCia.hide();
            txtFrmaSerie.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();

        }
    },
    onRendererColumnTransa: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch ((record.get('VP_TTRAX'))) {
            case 1:
                value = 'SALE';
                break;
            case 2:
                value = 'EXCH';
                break;
            case 3:
                value = 'RFND';
                break;
            case 5:
                value = 'FLOWN';
                break;
            case 6:
                value = 'EXCP';
                break;
            case 7:
                value = 'RFCP';
                break;
            case 8:
                value = 'IXP';
                break;
            case 9:
                value = 'DISC';
                break;
            case 10:
                value = 'IXC OAL';
                break;
            case 13:
                value = 'EMD-FLOWN';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(Ext.String.trim(record.get('A2024ESTADO')))) {
            case 'AN':
                color = '#FF0000';
                value = 'VOID';
                break;
            case 'OK':
                color = '#81F7BE';
                value = 'OK';
                break;
            case 'IN':
                color = '#EFE41B';
                value = 'INITIAL';
                break;
            case 'PP':
                color = '#4DEC8E';
                value = 'Processed';
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

    winDataNewEntry: function () {
        // MODO ES ESCRITURA
        var me = this;
        me.winDataEntry('ES');
    },
    onDetailClick: function (gridadj, rowIndex, colIndex) {
        // MODO ES ESCRITURA LE MODO LECTURA
        var me = this;
        var rec = gridadj.getStore().getAt(rowIndex);
        me.winDataEntry('LE', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'LE' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.sales.ADJAccountingForm.DataEntryNew({
            params: {
                action: action,
                rec: rec
            }
        });
        win.show();
    },

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var Combosearch = Ext.getCmp(prototype.idadj + '-search-by').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.idadj + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idadj + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.idadj + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.idadj + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.idadj + '-txtSeq').getValue();
        var txtIATA = Ext.getCmp(prototype.idadj + '-txtIATA').getValue();
        var CmbProcess = Ext.getCmp(prototype.idadj + '-CmbProcess').getValue();
        var CmbTransaction = Ext.getCmp(prototype.idadj + '-CmbTransaction').getValue();
        var txtAudit = Ext.getCmp(prototype.idadj + '-Audit').getValue();

        if (Combosearch === '') {
            global.Msg({msg: 'Select Of Search By'});
            return;
        }
        if (Combosearch === "1") {
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
                            setTimeout("Ext.getCmp(prototype.idadj + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idadj + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
                /*if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '' &&
                        Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
                    if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
                        Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                        return;
                    }
                }*/
            }
        }

        if (Combosearch === "2") {
            if (txtFrmaSerie === '') {
                global.Msg({msg: 'Enter Ticket'});
                return;
            }
        }

        me.bean.VP_FILTER = Combosearch;
        me.bean.VP_FROM_FILER = txtFilterDateFrom;
        me.bean.VP_TO_FILTER = txtFilterDateTo;

        me.bean.VP_CIA = txtCia;
        me.bean.VP_FORMA = txtFrmaSerie.substring(0, 4);
        me.bean.VP_SERIE = txtFrmaSerie.substring(4, 10);
        me.bean.VP_Seq = txtSeq;
        me.bean.VP_TypeVoid = CmbProcess;
        me.bean.VP_TypeUse = CmbTransaction;
        me.bean.VP_IATA = txtIATA;
        me.bean.VP_USER = txtAudit;
        me.bean.VP_TPCMBO = 2;
        /*
         * El valor obtenidadjo del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        //this.bean.pexcel = Ext.getCmp(prototype.idadj + '-pagination').getValue() ? 0 : 1;

        this.SearchReportADJ(me.bean, obj === true ? obj : false);
    },
    //<editor-fold defaultstate="collapsed" desc="SearchReportADJ">
    SearchReportADJ: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idadj + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idadj + '-gridData').getStore().loadPage(1, {
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
        var option = Ext.getCmp(prototype.idadj + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },

    img_clickHandler_save_List: function () {
        var lstNew = new Array();
        var gridadj = Ext.getCmp(prototype.idadj + '-gridData');
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idadj + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/maintenance/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanlst: JSON.stringify(lstNew)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'Proceso Culminado') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idadj + '-Contenedor').getController().imgSearch_clickHandler();

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
        var rec = gridadj.getStore().getAt(rowIndex);
        console.log(rec.data.A2024ESTADO);
        if (rec.data.A2024ESTADO === 'PP' || rec.data.A2024ESTADO === 'IN') {
            global.Msg({
                msg: 'Are you sure to change the status to Canceled?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idadj + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/deleteContabili/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {
                                A2024CODER: rec.data.A2024CODER,
                                A2024CUPON: rec.data.A2024CUPON,
                                A2024SEQ: rec.data.A2024SEQ,
                                A2024CORRL: rec.data.A2024CORRL
                            },
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.lst_delete === 'Proceso Culminado') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.lst_delete, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idadj + '-Contenedor').getController().imgSearch_clickHandler();

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

        Ext.getCmp(prototype.idadj + '-txtIATA').setValue('');
        Ext.getCmp(prototype.idadj + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.idadj + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.idadj + '-txtFrmaSerie').setValue('');
        Ext.getCmp(prototype.idadj + '-txtNumber').setValue('');
        Ext.getCmp(prototype.idadj + '-country').setValue('');
        Ext.getCmp(prototype.idadj + '-CmbProcess').setValue('');
        Ext.getCmp(prototype.idadj + '-CmbOrigin').setValue('');
        Ext.getCmp(prototype.idadj + '-CmbStatus').setValue('');
        Ext.getCmp(prototype.idadj + '-CmbArea').setValue('');
        Ext.getCmp(prototype.idadj + '-CmbType').setValue('');
        Ext.getCmp(prototype.idadj + '-ComboSource').setValue('');
        Ext.getCmp(prototype.idadj + '-ComboChannel').setValue('');
        Ext.getCmp(prototype.idadj + '-country2').setValue('');
        Ext.getCmp(prototype.idadj + '-Currency').setValue('');
        Ext.getCmp(prototype.idadj + '-TourCode').setValue('');
        Ext.getCmp(prototype.idadj + '-Audit').setValue('');
        var campo_cantidadjad = Ext.getCmp(prototype.idadj + '-campo_cantidadjad');
        var box_filter_02 = Ext.getCmp(prototype.idadj + '-box-filter-02');
        var country = Ext.getCmp(prototype.idadj + '-country');
        campo_cantidadjad.hidadje();
        box_filter_02.hidadje();
        country.hidadje();
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
    selectedChild: function (padre, child, add) {
        add = add === undefined ? true : add;
        if (add && this.peek() !== prototype.idadj + '-' + child)
            this.stack.push(prototype.idadj + '-' + child);
        win.selectedChild(padre, child);
        var paggin = this.getPaggin();
        if (paggin === null) {
            win.visible('boxPaginacion', false);
            win.visible('boxPagDetail', false);
        } else {
            var pagData = paggin.getPageData();
            win.setText('lblPagActual', win.formatLngNumber(pagData.currentPage));
            win.setText('lblPagTotal', win.formatLngNumber(pagData.pageCount));
            win.setText('lblRowsTotal', win.formatLngNumber(pagData.total));

            win.visible('boxPaginacion', true);
            win.visible('boxPagDetail', true);

//            var widadjth = 0, wt;
//            var boxChild = win.getCmp(child).items.items;
//            for (var i = 0; i < boxChild.length; i++) {
//                wt = boxChild[i].getWidadjth();
//                if (wt > widadjth) {
//                    widadjth = wt;
//                }
//            }
//            win.getCmp('boxPagDetail').setWidadjth(widadjth);
        }
    },
    peek: function () {
        if (this.stack.length > 0)
            return this.stack[this.stack.length - 1];
        else
            return "";
    },
    getPaggin: function () {
        switch (this.peek()) {
            case prototype.idadj + '-boxMainData':
                return win.getCmp('paggin');
            default:
                return null;
        }
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
//        if (_path !== '') {
//            this.exportExcel(_path);
//        }
    }

});
