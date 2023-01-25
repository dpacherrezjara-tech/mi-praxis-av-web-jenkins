
Ext.define('Ext.Praxis.controller.salesaudit.DebitBilledReportForm.DebitBilledReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DebitBilledReportFormController',

    /**
     * Constructor
     */
    stack: [],
    bean: {},
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
        prototype.id = 'DebitBilledReportForm';
        prototype.url = CONTEXTPATH + '/DebitBilledReportForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;

    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchDebitos/',
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
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbProcess = Ext.getCmp(prototype.id + '-CmbProcess');
        var cmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var CmbType = Ext.getCmp(prototype.id + '-CmbType');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var CmbChannel = Ext.getCmp(prototype.id + '-ComboChannel');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "4", "name": "ISSUE DATE"},
                {"code": "2", "name": "MEMO NUMBER"},
                {"code": "3", "name": "PROCESSING DATE"},
                {"code": "1", "name": "SYSTEM DATE"}
            ]
        }));

        cmbProcess.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ADM", "name": "ADM"},
                {"code": "ACM", "name": "ACM"},
                {"code": "NTD", "name": "DEBIT NOTE"},
                {"code": "NTC", "name": "CREDIT NOTE"},
                {"code": "FAD", "name": "DEBIT INVOICE"},
                {"code": "FAC", "name": "CREDIT INVOICE"}
            ]
        }));

        cmbOrigin.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "AUTOMATIC"},
                {"code": "MA", "name": "MANUAL"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "MS", "name": "MASSIVE"},
                {"code": "UP", "name": "UPFRONT"}
            ]
        }));

        
        CmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "AUTOMATIC"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "CR", "name": "CREDIT AND COBRANZA"},
                {"code": "VI", "name": "SALE INDIRECTA"},
                {"code": "DI", "name": "SALE DIRECTA"},
                {"code": "FR", "name": "FRANQUICIAS"},
                {"code": "CM", "name": "COMMISSION"},
                {"code": "RS", "name": "RESERVAS"}
            ]
        }));


        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "UP", "name": "UPFRONT"},
                {"code": "FC", "name": "FACT. COMMISSION"},
                {"code": "FA", "name": "FACT. NOT SEND"},
                {"code": "MP", "name": "MALAS PRACTICAS"},
                {"code": "FR", "name": "FRANQUICIAS"},
                {"code": "GR", "name": "GENERAL"},
                {"code": "BK", "name": "BACKEND"},
                {"code": "CA", "name": "CANCEL ADMS"}
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

        CmbChannel.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ATO", "name": "ATO"},
                {"code": "CCT", "name": "CCT"},
                {"code": "CTO", "name": "CTO"},
                {"code": "WEB", "name": "WEB"},
                {"code": "FRA", "name": "FRA"}
            ]
        }));

    },
    onCmbSourceSelect: function (obj, records, eOpts) {

        if (obj.getValue() === 'ASR' || obj.getValue() === 'BSP') {
            Ext.getCmp(prototype.id + '-country2').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-country2').setVisible(false);
        }
        switch (String(obj.getValue())) {
            case 'ASR':
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(true);
                break;
            case 'BSP':
            case 'ARC':
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(false);
                break;
        }

    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');
        var CmbProcess = Ext.getCmp(prototype.id + '-CmbProcess');
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var CmbType = Ext.getCmp(prototype.id + '-CmbType');
        var filter2 = Ext.getCmp(prototype.id + '-box-filter-02');
        var txtcountry = Ext.getCmp(prototype.id + '-country');
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2');
        
        
        if (obj.getValue() === "1" || obj.getValue() === "3" || obj.getValue() === "4") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            CmbProcess.show();
            CmbOrigin.show();
            CmbArea.show();
            CmbType.show();
            filter2.show();

            
            txtNumber.hide();
            txtcountry.hide();

            Ext.getCmp(prototype.id + '-txtNumber').setValue('');
             Ext.getCmp(prototype.id + '-country').setValue('');

        } else if (obj.getValue() === "2") {
            
            txtNumber.show();
            txtcountry.show();
            Ext.getCmp(prototype.id + '-country').setValue('');
            
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbProcess.hide();
            CmbOrigin.hide();
            CmbArea.hide();
            CmbType.hide();
            filter2.hide();

            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        } else {

         

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbProcess.hide();
            CmbOrigin.hide();
            CmbArea.hide();
            CmbType.hide();
            filter2.hide();
            txtcountry.hide();

            txtNumber.hide();
        }
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
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A2966STAT'))) {

            case 'MA':
                color = '#81F7BE';
                value = 'Match';
                break;
            case 'DF':
                color = '#FF9966';
                value = 'OVER';
                break;
            case 'DE':
                color = '#862d2d';
                value = 'UNDER';
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
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var win = new Ext.Praxis.view.salesaudit.DebitBilledReportForm.DataEntryDebitBilledForm({
            params: {
               rec: rec
            }
        });
        win.show();
    },
    imgSearch_clickHandler: function (obj, e) {

        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber').getValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CmbProcess = Ext.getCmp(prototype.id + '-CmbProcess').getValue();
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin').getValue();
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea').getValue();
        var CmbType = Ext.getCmp(prototype.id + '-CmbType').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.id + '-ComboChannel').getValue();
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();

        if (ComboBy === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
         if (ComboBy === "1" || ComboBy === "3" || ComboBy === "4") {
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
                /*if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
                    Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }*/
            }
        }

        if (ComboBy === "2") {
            this.bean.COMBOBY = CmbProcess;
            this.bean.OPCIONTYPE = ComboBy;
            this.bean.NUMBERADM = txtNumber;
            this.bean.COUNTRY = txtcountry;
            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.CURRENCY = '';
            this.bean.COMBOCHANNEL = '';
            this.bean.CHANNEL = '';
            this.bean.AUTMAN = '';
            this.bean.STATUS = '';
            this.bean.VP_TUORCODE = '';
            this.bean.VP_USER = '';
        }
        if (ComboBy === "1" || ComboBy === "3" || ComboBy === "4") {
            this.bean.OPCIONTYPE = ComboBy;
            this.bean.DATEFROM = txtFilterDateFrom;
            this.bean.DATETO = txtFilterDateTo;
            this.bean.COMBOBY = CmbProcess;
            this.bean.AUTMAN = CmbOrigin;
            this.bean.COMBOCHANNEL = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.COUNTRY = txtcountry2;
            this.bean.CURRENCY = txtCurrency;

            this.bean.CIA = '';
            this.bean.NUMBERADM = '';
            this.bean.FORMA = '';
            this.bean.SERIE = '';
        }

        this.bean.VP_PREME = '';
        this.bean.VP_CNXPA = '';
        this.bean.VP_TYPE = CmbType;
        this.bean.VP_AREA = CmbArea;
        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        this.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        this.SearchReportADM(this.bean, obj === true ? obj : false);
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

    imgClear_clickHandler: function (obj, e) {

        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtNumber').setValue('');
        Ext.getCmp(prototype.id + '-country').setValue('');
        Ext.getCmp(prototype.id + '-CmbProcess').setValue('');
        Ext.getCmp(prototype.id + '-CmbOrigin').setValue('');
        Ext.getCmp(prototype.id + '-CmbArea').setValue('');
        Ext.getCmp(prototype.id + '-CmbType').setValue('');
        Ext.getCmp(prototype.id + '-ComboSource').setValue('');
        Ext.getCmp(prototype.id + '-ComboChannel').setValue('');
        Ext.getCmp(prototype.id + '-country2').setValue('');
        Ext.getCmp(prototype.id + '-Currency').setValue('');
        var box_filter_02 = Ext.getCmp(prototype.id + '-box-filter-02');
        var country = Ext.getCmp(prototype.id + '-country');
        box_filter_02.hide();
        country.hide();
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    SearchReportADM: function (bean, bExcel) {
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        var Objtemp = records[0].data;

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
    }

});
