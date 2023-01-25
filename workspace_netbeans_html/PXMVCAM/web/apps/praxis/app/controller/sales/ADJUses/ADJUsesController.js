
Ext.define('Ext.Praxis.controller.sales.ADJUses.ADJUsesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ADJUsesController',

    /**
     * Constructor
     */

    /**
     * Constructor
     */
    beanTMP: {},
    init: function (view) {
        var me = this;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.idADJUsesForm = 'ADJUsesForm';
        prototype.idDetailADJUsesForm = 'DetailADJUsesForm';
        prototype.url = CONTEXTPATH + '/ADJUses';
        prototype.widthWindow = 1300;
        prototype.heightWindow = 800;

        // console.log(prototype);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // alert('Controlador cargado correctamente...')
        this.setStoresFilters();
        // this.onLoadUsers();
        this.setStoresGrids();
        // Ext.getCmp(prototype.idADJUsesForm + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    setStoresFilters: function () {

        var cmbSearch = Ext.getCmp(prototype.idADJUsesForm + '-cmbSearch');
        var CmbProcessed = Ext.getCmp(prototype.idADJUsesForm + '-CmbProcessed');
        var CmbTransaction = Ext.getCmp(prototype.idADJUsesForm + '-CmbTransaction');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "ADJUSTMENT DATE"},
                {"code": "2", "name": "TICKET"}
            ]
        }));

        CmbProcessed.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "AN", "name": "VOID"},
                {"code": "OK", "name": "OK"},
                {"code": "IN", "name": "INITIAL"},
                {"code": "PP", "name": "PENDING"}
            ]
        }));
        CmbTransaction.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "1", "name": "Sale"},
                {"code": "2", "name": "Exch"},
                {"code": "3", "name": "Rfnd"},
                {"code": "4", "name": "Adm/Acm"},
                {"code": "5", "name": "Flown"},
                {"code": "6", "name": "Excp"},
                {"code": "7", "name": "Rfcp"},
                {"code": "8", "name": "IXP"},
                {"code": "9", "name": "DISC"},
                {"code": "10", "name": "IXC OAL"},
                {"code": "13", "name": "EMD-Flown"}
            ]
        }));


    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idADJUsesForm + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idADJUsesForm + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchADJUses',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.idADJUsesForm + '-pagginator-01').setStore(store00);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },
    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {

        var txtFilterDateFrom = Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');

        switch (String(newValue)) {
            case '1':
                txtFilterDateFrom.show();
                txtFilterDateTo.show();

                txtCia.hide();
                txtFrmaSerie.hide();
                txtSeq.hide();

                txtFrmaSerie.setValue('');
                txtSeq.setValue('');
                break;
            case '2':
                txtCia.show();
                txtFrmaSerie.show();
                txtSeq.show();

                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();

                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                break;
            default:
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();

                txtCia.hide();
                txtFrmaSerie.hide();
                txtSeq.hide();

                txtFrmaSerie.setValue('');
                txtSeq.setValue('');
                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
        }
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onSearchClick: function (obj, e) {
        var me = this;

        var comboBy = String(Ext.getCmp(prototype.idADJUsesForm + '-cmbSearch').getValue());

        var txtFilterDateFrom = Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtIATA = Ext.getCmp(prototype.idADJUsesForm + '-txtIATA').getValue();
        var CmbProcessed = Ext.getCmp(prototype.idADJUsesForm + '-CmbProcessed').getValue();
        var CmbTransaction = Ext.getCmp(prototype.idADJUsesForm + '-CmbTransaction').getValue();

        if (comboBy === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'SELECT Of By');
            return;
        }

        if (comboBy === '1') {
            if (Ext.String.trim(Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateFrom').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateTo').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if (Ext.String.trim(Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateTo').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateFrom').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }
            /*if (Ext.String.trim(Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateFrom').getRawValue()) !== '' &&
                    Ext.String.trim(Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateTo').getRawValue()) !== '') {
                if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.idADJUsesForm + '-txtFilterDateTo').getRawValue()))) {
                    Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                    return;
                }
            }*/
        }

        me.beanTMP.VP_FILTER = comboBy;
        me.beanTMP.VP_FROM_FILER = txtFilterDateFrom;
        me.beanTMP.VP_TO_FILTER = txtFilterDateTo;
        me.beanTMP.IN_BOLETO = txtCia + "" + txtFrmaSerie + "" + txtSeq;
        me.beanTMP.IN_IATA = txtIATA;
        me.beanTMP.VP_GRUPO = '';
        me.beanTMP.VP_TypeVoid = CmbProcessed;
        me.beanTMP.VP_TypeUse = CmbTransaction;
        me.beanTMP.VP_TPCMBO = '3';

        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.idADJUsesForm + '-pagination').getValue() ? 0 : 1;

        this.SearchReport(me.beanTMP, obj === true ? obj : false);

    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.idADJUsesForm + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idADJUsesForm + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idADJUsesForm + '-grid').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {

                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idADJUsesForm + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idADJUsesForm + '-pagginator-01').disable();
            //Ext.getCmp(prototype.idADJUsesForm + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.idADJUsesForm + '-pagginator-01').enable();
            // Ext.getCmp(prototype.idADJUsesForm + '-pagginator-legend').show();
        }
    },
    onRendererColumnAgency: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnTransaction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('VP_TTRAX'))) {
            case '2':
                value = 'EXCH';
                break;
            case '13':
                value = 'EMD-Flown';
                break;
            case '11':
                value = 'IXC Rejections';
                break;
            case '10':
                value = 'IXC Prime';
                break;
            case '8':
                value = 'IXC';
                break;
            case '7':
                value = 'RFCP';
                break;
            case '4':
                value = 'ADM/ACM';
                break;
            case '3':
                value = 'RFND';
                break;
            case '6':
                value = 'EXCP';
                break;
            case '9':
                value = 'DISC';
                break;
            case '5':
                value = 'FLWN';
                break;
            case '1':
                value = 'SALE';
                break;
            default :
                value = 'Interlineal';
                break;
        }
        return value;
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A2024ESTADO'))) {
            case 'AN':
                color = '#FF0000';
                value = 'VOID';
                break;
            case 'OK':
                color = '#99FFCC';
                value = 'OK';
                break;
            case 'IN':
                color = '#0099FF';
                value = 'INITIAL';
                break;
            default :
                color = '#CCCC00';
                value = 'PENDING';
                break;
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;

    },
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);

    },
    winDataEntry: function (action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.sales.ADJUsesForm.DataEntry', {
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

    },
    onRenderercheckcolumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        if (!record.data.VP_FlagDisabled) {
            metaData['tdCls'] = 'x-item-disabled';
        } else {
            metaData['tdCls'] = '';
        }
        return new Ext.ux.CheckColumn().renderer(value);
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3537SEMAF'))) {
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
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry(rec);
    },
    onExcelClick: function (obj) {
        console.log(this.beanTMP);
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
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    img_clickHandler_save_List: function () {
        var lstNew = new Array();
        var grid = Ext.getCmp(prototype.idADJUsesForm + '-grid');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (! row.get('VP_FlagDisabled')) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The state must be in initial');
                }else{
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/insertAprobList/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanlst: JSON.stringify(lstNew)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD UPDATED' || res.data === 'RECORD VOIDED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idADJUsesForm + '-Contenedor').getController().onSearchClick();

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
    img_clickHandler_delete_List: function () {
        var lstNew = new Array();
        var grid = Ext.getCmp(prototype.idADJUsesForm + '-grid');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (! row.get('VP_FlagDisabled')) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The state must be in initial');
                }else{
                       lstNew.push(row.data);
                }

            }
        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }
        if (lstNew.length > 0) {
            global.Msg({
                msg: 'Are you sure to Delete?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/deleteAprobList/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanlst: JSON.stringify(lstNew)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD UPDATED' || res.data === 'RECORD VOIDED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idADJUsesForm + '-Contenedor').getController().onSearchClick();

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


