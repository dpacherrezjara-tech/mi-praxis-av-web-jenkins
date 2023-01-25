
Ext.define('Ext.Praxis.controller.sales.AccountingControlAudit.AccountingControlAuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingControlAuditController',

    /**
     * Constructor
     */
    beanTMP: {},
    init: function (view) {
        var me = this;

    },
    OnBeforeShow: function () {
        prototype.id = 'AccountingControlAudit';
        prototype.url = CONTEXTPATH + '/AccountingControlAudit';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();        
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
        me.onSearchClick();
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var CmbModulo = Ext.getCmp(prototype.id + '-CmbModule');
        var CmbTipom = Ext.getCmp(prototype.id + '-CmbType');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var cmbStatus1 = Ext.getCmp(prototype.id + '-CmbStatus1');
        var cmbStatus2 = Ext.getCmp(prototype.id + '-CmbStatus2');
        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "1", "name": "ACCOUNTING DATE"},
                {"code": "2", "name": "PROCESSING DATE"},
                {"code": "3", "name": "SYSTEM DATE"}
            ]
        }));
        CmbModulo.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "SA", "name": "SALE"},
                {"code": "AUD", "name": "SALE AUDIT"},
                {"code": "FL", "name": "FLOWN"},
                {"code": "IXC", "name": "IXC"},
                {"code": "IXP", "name": "IXP"},
                {"code": "RGS", "name": "SALE REG."}

            ]
        }));

        CmbTipom.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "REG", "name": "REGULAR"},
                {"code": "ADJ", "name": "ADJ ACCOUNTING"}                
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "ACTIVE"},
                {"code": "E", "name": "INACTIVE"}
            ]
        }));
        cmbStatus1.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "00", "name": "PENDIENTE"},
                {"code": "OK", "name": "ENVIADO POR CORREO"},
                {"code": "XX", "name": "PROCESANDO"},                
                {"code": "ER", "name": "ERROR"}                
            ]
        }));
        cmbStatus2.bindStore(Ext.create('Ext.data.Store', {
            data: [
               {"code": "", "name": "ALL"},
                {"code": "00", "name": "PENDIENTE"},
                {"code": "OK", "name": "CARGADO A BD"},
                {"code": "XX", "name": "PROCESANDO"},                
                {"code": "ER", "name": "ERROR"}                
            ]
        }));

    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');
        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
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
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },
    
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchAfterRender01: function (obj) {
        obj.setValue('A');
    },
    onCmbTypeSearchAfterRender: function (obj) {
        obj.setValue('2');
    },
    
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }
    },
    onExcelClick:function(){
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());
        var IN_DATEFROM = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var IN_DATETO = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var CmbModule = Ext.getCmp(prototype.id + '-CmbModule').getValue();
        var CmbType = Ext.getCmp(prototype.id + '-CmbType').getValue();        
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        var CmbStatus1 = Ext.getCmp(prototype.id + '-CmbStatus1').getValue();
        var CmbStatus2 = Ext.getCmp(prototype.id + '-CmbStatus2').getValue();
        
        if (comboBy === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select filter type');
            return;
        }
        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
            return;
        }
        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
            return;
        }
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
        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_DATEFROM = IN_DATEFROM;
        me.beanTMP.IN_DATETO = IN_DATETO;        
        me.beanTMP.IN_MODULO = CmbModule;
        me.beanTMP.IN_TIPOM = CmbType;        
        me.beanTMP.IN_STATO = CmbStatus;
        me.beanTMP.IN_STAT01 = CmbStatus1;
        me.beanTMP.IN_STAT02 = CmbStatus2;
        
        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel =0; //Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        me.SearchReport(me.beanTMP, obj === true ? obj : false);

    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.id + '-grid').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        //var Objtemp = records[0].data;                        
                    } else {                        
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {}});

                    }

                }
            });
        }
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A4022STAT'))) {            
            case 'ACTIVE':
                color = '#81F7BE';
                value = 'ACTIVE';                
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
    onRendererColumnOnPais: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>';
    },
    searchform_detalle: function(rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex); 
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
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(false);
    }

});

