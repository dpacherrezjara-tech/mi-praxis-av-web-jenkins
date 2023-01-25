
Ext.define('Ext.Praxis.controller.salesaudit.RFNDTicketcontrolForm.RFNDTicketcontrolFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDTicketcontrolFormController',

    beanTMP: {},
    beanExcel:{},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // alert('Controlador cargado correctamente')
        this.setStoresFilters();
        this.setStoresGrids();
    },

    OnBeforeShow: function () {
        prototype.id = 'RFNDTicketcontrolForm';
        prototype.url = CONTEXTPATH + '/RFNDTicketcontrolForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },

    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "4", "name": "APPLICATION DATE"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "2", "name": "TICKET"},
                {"code": "3", "name": "FOLIO"}
            ]
        }));

    },

    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid01',
            pageSize: 20,
            groupField: 'A3648TKT',
            fields: [
                {name: 'A3647CCUST', type: 'string'},
                {name: 'A3647FOLIO', type: 'string'},
                {name: 'A3647FAUTO', type: 'string'},
                {name: 'A3647FAPPI', type: 'string'},
                {name: 'A3647REGAS', type: 'string'},
                {name: 'A3648TKT', type: 'string'},
                {name: 'A3648FLAG', type: 'string'},
                {name: 'A3648STATO', type: 'string'},
                {name: 'A3658FLAG', type: 'string'},
                {name: 'A3658DESC', type: 'string'},
                {name: 'A3648MDA', type: 'string'},
                {name: 'A3648FREGI', type: 'string'},
                {name: 'A3648TOTAD', type: 'integer'}
            ],
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchRefundTicketControl',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store01);
    },

    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },

    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtForma = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');
        var txtCountry = Ext.getCmp(prototype.id + '-cmbCountry');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');

        switch (String(newValue)) {
            case '1':
            case '4':
                txtDateFrom.show();
                txtDateTo.show();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.hide();

                txtCountry.setValue('');
                txtForma.setValue('');
                txtNumber.setValue('');
                break;
            case '2':
                txtCia.show();
                txtForma.show();
                txtSeq.show();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtNumber.hide();

                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtCountry.setValue('');
                txtNumber.setValue('');
                break;
            case '3':
                txtNumber.show();

                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtDateFrom.hide();
                txtDateTo.hide();

                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtCountry.setValue('');
                txtCountry.setValue('');
                txtForma.setValue('');
                break;
        }
    },

    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {

        switch (String(record.get('A3389STATU'))) {
            case 'CAPTURED':
                value = 'green';
                break;
            case 'PENDING':
                value = 'orange';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },

    onSearchClick: function (btn) {
        var me = this;
        var form = Ext.getCmp(prototype.id + '-contenedor-filters-form').getForm();

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());

        if (comboBy === '1' || comboBy === '4') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }
            /*if(global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()),Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))){
                Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');   return;
            }*/
        }

        if (comboBy === '2') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue()) === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter TKT');
                return;
            }
        }

        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        me.beanTMP.IN_DATETO = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        me.beanTMP.IN_CIA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtCia').getValue());
        me.beanTMP.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(0, 4));
        me.beanTMP.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(4, 10));
        me.beanTMP.IN_SEQ = Ext.String.trim(Ext.getCmp(prototype.id + '-txtSeq').getValue());
        me.beanTMP.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id + '-cmbCountry').getValue());
        me.beanTMP.IN_PREME = Ext.String.trim(Ext.getCmp(prototype.id + '-txtNumber').getValue());

        me.beanTMP.pexcel = 0;
        var Sendtoaudit = 0;
        var Returntoaudit = 0;
        var Sendtosabre = 0;
        store.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {
                /*for (var i = 0; i < records.length; i++) {
                    var Objtemp = records[i].data;
                    if (Objtemp.A3389FLAG === 'YES') {
                        Sendtoaudit = Sendtoaudit + 1;
                    }
                    if (Objtemp.A3389STATO === 'YES') {
                        Returntoaudit = Returntoaudit + 1;
                    }
                    if (Objtemp.A3389STATU === 'YES') {
                        Sendtosabre = Sendtosabre + 1;
                    }
                }
                Ext.getCmp(prototype.id + '-lbl-sent').setText(Sendtoaudit);
                Ext.getCmp(prototype.id + '-lbl-return').setText(Returntoaudit);
                Ext.getCmp(prototype.id + '-lbl-sabre').setText(Sendtosabre);*/
            }
        });

    },

    OnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnOnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail01: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var win = new Ext.Praxis.view.salesaudit.RFNDTicketcontrolForm.DetailRFNDTicketcontrolTicket({
            params: {
                rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onExcelClick: function(obj) {
         var me = this;
        var form = Ext.getCmp(prototype.id + '-contenedor-filters-form').getForm();

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());

        if (comboBy === '1' || comboBy === '4') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }

            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '' &&
                    Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
                if (Ext.Date.getDayOfYear(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) >
                        Ext.Date.getDayOfYear(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                    Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                    return;
                }
            }
        }

        if (comboBy === '2') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue()) === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter TKT');
                return;
            }
        }

        me.beanExcel.IN_OPTION = comboBy;
        me.beanExcel.IN_DATEFROM = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        me.beanExcel.IN_DATETO = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        me.beanExcel.IN_CIA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtCia').getValue());
        me.beanExcel.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(0, 4));
        me.beanExcel.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(4, 10));
        me.beanExcel.IN_SEQ = Ext.String.trim(Ext.getCmp(prototype.id + '-txtSeq').getValue());
        me.beanExcel.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id + '-cmbCountry').getValue());
        me.beanExcel.IN_PREME = Ext.String.trim(Ext.getCmp(prototype.id + '-txtNumber').getValue());
        
        if (Ext.Object.getSize(me.beanExcel) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanExcel)));
                    }
                }
            });
        }
    }

});

