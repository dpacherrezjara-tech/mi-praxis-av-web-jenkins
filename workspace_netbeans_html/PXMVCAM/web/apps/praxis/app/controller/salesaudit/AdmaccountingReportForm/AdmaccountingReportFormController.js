
Ext.define('Ext.Praxis.controller.salesaudit.AdmaccountingReportForm.AdmaccountingReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AdmaccountingReportFormController',

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
    },
    OnBeforeShow: function () {
        prototype.id = 'AdmaccountingReportForm';
        prototype.url = CONTEXTPATH + '/AdmaccountingReportForm';
        prototype.widthWindow = 1366;
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
            //pageSize: 25
        });
        grid01.setStore(store01);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var CmbChannel = Ext.getCmp(prototype.id + '-ComboChannel');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "ACCOUNTIG DATE"},
                {"code": "2", "name": "AGENCY"},
                {"code": "3", "name": "MEMO NUMBER"},
                {"code": "4", "name": "SYSTEM DATE"},
                {"code": "5", "name": "TICKET"}
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
                {"code": "CM", "name": "COMMISSION"}
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
                // boxFilter02.hide();
                // boxFilter02.setBorder(false)
        }

    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var filter2 = Ext.getCmp(prototype.id + '-box-filter-02');
        var txtcountry = Ext.getCmp(prototype.id + '-country');
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2');



        //campo_cantidad.hide();
        if (obj.getValue() === "1" || obj.getValue() === "4") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            CmbOrigin.show();
            CmbArea.show();
            filter2.show();

            txtIATA.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtNumber.hide();
            txtcountry.hide();

            Ext.getCmp(prototype.id + '-txtFrmaSerie').setValue('');
            Ext.getCmp(prototype.id + '-txtNumber').setValue('');
            Ext.getCmp(prototype.id + '-txtIATA').setValue('');

        } else if (obj.getValue() === "3") {


            Ext.getCmp(prototype.id + '-country').setValue('');
            txtcountry.show();
            txtNumber.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbOrigin.hide();
            CmbArea.hide();
            filter2.hide();
            txtIATA.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();

            Ext.getCmp(prototype.id + '-txtFrmaSerie').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        } else if (obj.getValue() === "5") {

            txtCia.show();
            txtFrmaSerie.show();
            txtSeq.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbOrigin.hide();
            CmbArea.hide();
            filter2.hide();
            txtIATA.hide();
            txtNumber.hide();
            txtcountry.hide();

            Ext.getCmp(prototype.id + '-txtNumber').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        } else if (obj.getValue() === "2") {

            txtIATA.show();

            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtcountry2.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbOrigin.show();
            CmbArea.show();
            filter2.hide();
            txtcountry.hide();

            txtNumber.hide();

            Ext.getCmp(prototype.id + '-txtNumber').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        } else {
            txtIATA.hide();

            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtcountry2.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbOrigin.hide();
            CmbArea.hide();
            filter2.hide();
            txtcountry.hide();

            txtNumber.hide();
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
    imgSearch_clickHandler: function (obj, e) {

        var search = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber').getValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin').getValue();
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.id + '-ComboChannel').getValue();
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2').getValue();


        if (search === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (search === "1" || search === "4") {
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
                if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                    Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
        }

        if (search === "3" || search === "5") {
            this.bean.CombOption = search;

            if (search === "3")
            {
                this.bean.NADM = txtNumber;
                this.bean.COUNTRY = txtcountry;
            } else {
                this.bean.NADM = '';
                this.bean.COUNTRY = '';
            }
            if (search === "5") {
                this.bean.CIA = txtCia;
                this.bean.FORMA = txtFrmaSerie.substring(0, 4);
                this.bean.SERIE = txtFrmaSerie.substring(4, 10);
            } else {
                this.bean.CIA = '';
                this.bean.FORMA = '';
                this.bean.SERIE = '';
            }
            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.SOURCE = '';
            this.bean.CHANNEL = '';
            this.bean.CombOrigen = '';
            this.bean.IATA = '';
        }
        if (search === "1" || search === "4") {
            this.bean.CombOption = search;
            this.bean.DATEFROM = txtFilterDateFrom;
            this.bean.DATETO = txtFilterDateTo;
            this.bean.CombOrigen = CmbOrigin;
            this.bean.SOURCE = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.COUNTRY = txtcountry2;

            this.bean.CIA = '';
            this.bean.NADM = '';
            this.bean.FORMA = '';
            this.bean.SERIE = '';
            this.bean.IATA = '';
        }
        if (search === "2") {
            this.bean.CombOption = search;
            this.bean.IATA = txtIATA;
            this.bean.CombOrigen = CmbOrigin;
            this.bean.SOURCE = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.COUNTRY = txtcountry2;

            this.bean.CIA = '';
            this.bean.FORMA = '';
            this.bean.SERIE = '';
            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.NADM = '';
        }

        this.bean.AREA = CmbArea;


        this.SearchReportADM(this.bean, obj === true ? obj : false);
    },
    SearchReportADM: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: {beanString: JSON.stringify(bean)},
                //params: bean,
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

    onRendererColumnBase: function (value, metaData, record, rowIndex, colIndex, store, view) {
        
        switch (String(Ext.String.trim(record.get('A1716COPE')))) {
            case 'CR':
                value = 'Credit and cobranza';
                break;
            case 'VI':
                value = 'Sale indirecta';
                break;
            case 'DI':
                value = 'Sale directa';
                break;
            case 'CM':
                value = 'Commission';
                break;
                value = String(Ext.String.trim(record.get('A1716COPE')));
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
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

        Ext.getCmp(prototype.id + '-search-type').setValue('');
        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFrmaSerie').setValue('');
        Ext.getCmp(prototype.id + '-txtNumber').setValue('');
        Ext.getCmp(prototype.id + '-country').setValue('');
        Ext.getCmp(prototype.id + '-CmbOrigin').setValue('');
        Ext.getCmp(prototype.id + '-CmbArea').setValue('');
        Ext.getCmp(prototype.id + '-ComboSource').setValue('');
        Ext.getCmp(prototype.id + '-ComboChannel').setValue('');
        Ext.getCmp(prototype.id + '-country2').setValue('');

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
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    }

});
