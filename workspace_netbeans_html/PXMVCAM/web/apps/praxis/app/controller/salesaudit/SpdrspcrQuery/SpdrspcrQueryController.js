
Ext.define('Ext.Praxis.controller.salesaudit.SpdrspcrQuery.SpdrspcrQueryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SpdrspcrQueryController',

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
        prototype.id = 'SpdrspcrQuery';
        prototype.id01 = 'DetailSpdrspcrQuery';
        prototype.url = CONTEXTPATH + '/SpdrspcrQuery';
        prototype.widthWindow = 1200;
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
        // Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
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
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var cmbTRNCU = Ext.getCmp(prototype.id + '-CmbTRNCU');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "IATA"},
                {"code": "5", "name": "AGENCY"},
                {"code": "2", "name": "DOCUMENT"},
                {"code": "3", "name": "SYSTEM DATE"},
                {"code": "4", "name": "RELATED DOCUMENT"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "SPCR", "name": "SPCR"},
                {"code": "SPDR", "name": "SPDR"}
            ]
        }));

        cmbTRNCU.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ADMA", "name": "ADMA"},
                {"code": "EMDA", "name": "EMDA"},
                {"code": "EMDS", "name": "EMDS"},
                {"code": "TKTT", "name": "TKTT"},
                {"code": "SHOR", "name": "SHORT"},
                {"code": "CCCF", "name": "CCCFs"},
                {"code": "AUDI", "name": "AUDIT"},
                {"code": "INVO", "name": "INVOICE"},
                {"code": "EXCE", "name": "TKTT"},
                {"code": "CCIA", "name": "CCIAA"},
                {"code": "LEGA", "name": "LEGAL"},
                {"code": "DRS", "name": "DRS"},
                {"code": "ADJU", "name": "ADJUS"}


            ]
        }));


    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchQuery',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('3');
    },
    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {
        // console.log(String(newValue))
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var txtCountry = Ext.getCmp(prototype.id + '-cmbCountry');



        switch (String(newValue)) {
            case '3':
                txtDateFrom.show();
                txtDateTo.show();

                txtNumber.hide();
                txtIATA.hide();

                txtNumber.setValue('');
                txtIATA.setValue('');
                txtCountry.setValue('');
                break;
            case '2':
            case '4':
                txtNumber.show();

                txtDateFrom.hide();
                txtDateTo.hide();
                txtIATA.hide();

                txtIATA.setValue('');
                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtCountry.setValue('');
                break;
            case '1':
            case '5':
                txtIATA.show();

                txtDateFrom.hide();
                txtDateTo.hide();
                txtNumber.hide();

                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtNumber.setValue('');
                txtCountry.setValue('');
                break;
            default:
                txtIATA.hide();
                cmbStatus.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtNumber.hide();


                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtNumber.setValue('');
                txtCountry.setValue('');
                txtIATA.setValue('');
        }
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbStatusChange: function (obj, newValue, oldValue, eOpts) {

    },
    onSearchClick: function (btn) {
        var me = this;
        var form = Ext.getCmp(prototype.id + '-contenedor-filters-form').getForm();

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());
        if (comboBy === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'SELECT Of By');
            return;
        }

        if (comboBy === '3') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) != '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) == '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }

            /*if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '' &&
             Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
             if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
             Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
             return;
             }
             }*/
        }

        if (comboBy === '2' || comboBy === '4') {
            me.beanTMP.IN_DOCUMET = Ext.String.trim(Ext.getCmp(prototype.id + '-txtNumber').getValue());
            me.beanTMP.IN_DATEFROM = '';
            me.beanTMP.IN_DATETO = '';
            me.beanTMP.IN_IATA = '';
        }

        if (comboBy === '3') {
            me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
            me.beanTMP.IN_DATETO = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();

            me.beanTMP.IN_DOCUMET = '';
            me.beanTMP.IN_IATA = '';
        }
        if (comboBy === '1' || comboBy === '5') {
            me.beanTMP.IN_IATA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtIATA').getValue());
            me.beanTMP.IN_DATEFROM = '';
            me.beanTMP.IN_DATETO = '';
            me.beanTMP.IN_DOCUMET = '';
        }
        me.beanTMP.IN_ROBOT = '';
        me.beanTMP.IN_AREA = '';
        me.beanTMP.IN_USER = '';
        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        me.beanTMP.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id + '-cmbCountry').getValue());
        me.beanTMP.IN_TRNCU = Ext.String.trim(Ext.getCmp(prototype.id + '-CmbTRNCU').getValue());

        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        store.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {
                Ext.getCmp(prototype.id + '-pagination').enable();
            }
        });

    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            //Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            // Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },
    onRendererColumnAgency: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },
    onRendererColumnPassenger: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },
    onRendererColumnReason: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A3537FLAG'))) {
            case 'Agree with Airline':
                color = '#99FFCC';
                break;
            case 'Agree with Agent':
                color = '#0099FF';
                break;
            case 'Disagree with Airline':
                color = '#D329E8';
                break;
            case '':
                color = '#FF0000';
                value = 'PENDING DOWNLOAD';
                break;
            case 'Disagree with Agent':
                color = '#F2A60D';
                break;
            case 'PBD Issued':
                color = '#CC9966';
                break;
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
        /*
         
         case 'B':
         color = '#CC9966';
         value = 'CHANGE FOR ANOTHER';
         break;
         case 'Disagree with Agent':
         color = '#E8400C';
         break;
         case 'F':
         color = '#A50C88';
         value = 'AUTHORISED';
         break;
         
         case 'X':
         color = '#FF0000';
         value = 'VOID';
         break;
         case 'D':
         color = '#FF9966';
         value = 'REEMBOLSABLE';
         break;
         case 'J':
         color = '#69D3F8';
         value = '';
         break;*/
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
    winDataEntry: function (rec) {
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.SpdrspcrQuery.DetailSpdrspcrQuery({
            params: {
                rec: rec,
                option: '1'
            }
        });
        win.show();
    },
    onExcelClick: function (obj) {
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
    onClearClick:function(){
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();
    }

});


