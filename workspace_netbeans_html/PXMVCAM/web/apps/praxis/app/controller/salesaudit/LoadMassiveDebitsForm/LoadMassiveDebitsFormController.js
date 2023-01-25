
Ext.define('Ext.Praxis.controller.salesaudit.LoadMassiveDebitsForm.LoadMassiveDebitsFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadMassiveDebitsFormController',

    /**
     * Constructor
     */
    stack: [],
    bean: {},
    beanupdate: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresFilters();
        this.setStoresGrids();

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
    OnBeforeShow: function () {
        prototype.id = 'LoadMassiveDebitsForm';
        prototype.id3 = 'LoadMassiveDebitsSubiArchivo';
        prototype.id2 = 'DataEntryLoadMassiveDebits';
        prototype.url = CONTEXTPATH + '/LoadMassiveDebitsForm';
        prototype.widthWindow = 1500;
        prototype.heightWindow = 768;

    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
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
        grid01.setStore(store01);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresFilters: function () {
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var CmbType = Ext.getCmp(prototype.id + '-CmbType');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');

        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "M", "name": "CURRENCY ERROR"},
                {"code": "P", "name": "PROCESSED"},
                {"code": "S", "name": "PENDING"},
                {"code": "D", "name": "IATA DISABLED"},
                {"code": "C", "name": "UNGREGISTERED CLIENT"},
                {"code": "E", "name": "REPEATED TICKET"},
                {"code": "R", "name": "WITH ACM"},
                {"code": "V", "name": "VOID"}

            ]
        }));

        CmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "CM", "name": "COMMISSION"},
                {"code": "CR", "name": "CREDIT AND COBRANZA"},
                {"code": "VI", "name": "SALE INDIRECTA"},
                {"code": "DI", "name": "SALE DIRECTA"}

            ]
        }));


        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "MP", "name": "BAD PRACTICE"},
                {"code": "BK", "name": "BACKEND"},
                {"code": "CA", "name": "CANCEL ADMS"},
                {"code": "FC", "name": "FACT. COMMISSION"},
                {"code": "FA", "name": "FACT. NOT SEND"},
                {"code": "GR", "name": "GENERAL"},
                {"code": "AP", "name": "SETTINGS UPFRONT"},
                {"code": "UP", "name": "UPFRONT"},
                {"code": "RT", "name": "RETENTION"}
                //{"code": "FR", "name": "FRANQUICIAS"},
            ]
        }));

        CmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"}
            ]
        }));

    },
    onRendererColumnBase: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A2548BASE'))) {
            case 'PR':
                value = 'Proceso Regular';
                break;
            case 'UP':
                value = 'UpFront';
                break;
            case 'BF':
                value = 'Backend Flown';
                break;
            case 'BS':
                value = 'Backend Sale';
                break;
            case 'MS':
                value = 'Massive';
                break;
            case 'QR':
                value = 'Querys';
                break;
            case 'PR':
                value = 'Automatic';
                break;
            case 'MA':
                value = 'Manual';
                break;
            case 'RT':
                value = 'Retention';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A2552PROC'))) {
            case 'P':
                color = '#F5A9F2';
                value = 'Processed';
                break;
            case 'S':
                color = '#EFE41B';
                value = 'Pending';
                break;
            case 'D':
                color = '#B791EF';
                value = 'IATA disabled';
                break;
            case 'C':
                color = '#DC7633';
                value = 'Unregistered client';
                break;
            case 'E':
                color = '#FF9FAA';
                value = 'Repeated Ticket';
                break;
            case 'R':
                color = '#E3DAED';
                value = 'With ACM';
                break;
            case 'V':
                color = '#FF0000';
                value = 'Void';
                break;
            case 'M':
                color = '#CD5C5C';
                value = 'currency error';
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
    img_clickHandler_save_List_grouped: function (action, rec) {

        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea').getValue();
        var CmbType = Ext.getCmp(prototype.id + '-CmbType').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-Audit').getValue();

        if (CmbArea === '') {
            Ext.MessageBox.alert('PRAXIS', 'Select  Area', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-CmbArea').focus();", 100);
            });
            return;
        }
        if (CmbType === '') {
            Ext.MessageBox.alert('PRAXIS', 'Select Type', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-CmbType').focus();", 100);
            });
            return;
        }

        var win = new Ext.Praxis.view.salesaudit.LoadMassiveDebitsForm.DataEntryLoadMassiveDebits({
            params: {
                url01: prototype.url,
                IN_AREA: CmbArea,
                IN_TYPE: CmbType,
                IN_FTE: CombSource,
                IN_USER: txtAudit
            }
        });
        win.show();
    },
    imgSearch_clickHandler: function (obj, e) {

        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea').getValue();
        var CmbType = Ext.getCmp(prototype.id + '-CmbType').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-Audit').getValue();

        if (txtFilterDateFrom === '') {
            global.Msg({msg: 'Enter Date From'});
            return;
        }
        if (txtFilterDateTo === '') {
            global.Msg({msg: 'Enter Date To'});
            return;
        }
        if (CmbArea === '') {
            global.Msg({msg: 'Select  Area'});
            return;
        }

        this.bean.IN_FCVTA = txtFilterDateFrom;
        this.bean.IN_FHASTA = txtFilterDateTo;
        this.bean.IN_AREA = CmbArea;
        this.bean.IN_TYPE = CmbType;
        this.bean.IN_IATA = txtIATA;
        this.bean.IN_ESTADO = CmbStatus;
        this.bean.A2552FUENT = CombSource;
        this.bean.IN_USER = txtAudit;
        this.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        this.SearchReport(this.bean, obj === true ? obj : false);
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgExcel_clickHandler: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    img_clickHandler_save_List: function () {
        var lstNew = new Array();
        var vlregist = '';
        var opflag;
        var grid = Ext.getCmp(prototype.id + '-gridData');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (i === 0) {
                    vlregist = Ext.String.trim(row.get('A2552REGIS'));
                    if (Ext.String.trim(row.get('A2552PROC')) === 'D' || Ext.String.trim(row.get('A2552PROC')) === 'C') {
                        lstNew.push(row.data);
                    }

                } else {
                    if (vlregist !== Ext.String.trim(row.get('A2552REGIS'))) {
                        Ext.Msg.alert('.: PRAXIS :.', 'You cant not select more than one User');
                        return;
                    } else {
                        if (Ext.String.trim(row.get('A2552PROC')) === 'D' || Ext.String.trim(row.get('A2552PROC')) === 'C') {
                            lstNew.push(row.data);
                        }
                    }
                }

            }
        } else {
            global.Msg({msg: 'You must select at least one record Ungregistered client / IATA disabled'});
            return;
        }

        if (lstNew.length > 0) {
            global.Msg({
                msg: 'Are you sure to Update Ungregistered client / IATA disabled?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/UpdateTKT/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanlst: JSON.stringify(lstNew)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();

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
    imgClear_clickHandler: function (obj, e) {

        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-CmbArea').setValue('');
        Ext.getCmp(prototype.id + '-CmbType').setValue('');
        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        Ext.getCmp(prototype.id + '-CmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-ComboSource').setValue('');
        Ext.getCmp(prototype.id + '-Audit').setValue('');
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
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        //win.setValue('txtTktTotal', Objtemp.A2548CANTIDAD);
                    } else {
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
    onAddClick: function () {
        var win = new Ext.Praxis.view.salesaudit.LoadMassiveDebitsForm.LoadMassiveDebitsSubiArchivo({
            params: {
                url01: prototype.url
            }
        });
        win.show();
    }


});


