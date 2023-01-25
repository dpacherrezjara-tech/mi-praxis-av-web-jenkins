Ext.define('Ext.Praxis.controller.sales.GSAIncentiveInterline.GSAIncentiveInterlineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GSAIncentiveInterlineController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'GSAIncentiveInterlineForm';
        prototype.url = CONTEXTPATH+'/GSAIncentiveInterline';
        prototype.widthContenedor = 1100;
        prototype.widthGrid = 1090;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
    },
    onOpcionChange: function() {
        var selectedValue = this.getValue('cmbOpcion');
        this.clearFilter();
        switch (selectedValue) {
            case 'DFLIGH':
            case 'DSALES':
                Ext.getCmp(prototype.id+'-boxFilter').show();
                this.focus('txtFilterFrom');
                break;
            default:
                Ext.getCmp(prototype.id+'-boxFilter').hide();
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var selectedValue = this.getValue("cmbOpcion");
        if (selectedValue.length > 0) {
            this.setFormatParameter(selectedValue);
            this.setGridData();
        }
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    btnExcel_click: function(obj, e) {
        if (this.getValue("cmbOpcion").length > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    btnClear_click: function(obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue('cmbOpcion', '');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-boxMainData').show();
        // </editor-fold>
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.showMenu();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function(selectedValue) {
        searchParams = {};
        
        switch (selectedValue) {
            case 'DFLIGH':
                // <editor-fold defaultstate="collapsed" desc="llenarData">
                var txtFilterFrom = this.getValue("txtFilterFrom");
                var txtFilterTo = this.getValue("txtFilterTo");
                var txtFilterCurrency = this.getValue("txtFilterCurrency");
                var txtFilterCountry = this.getValue("txtFilterCountry");
                // </editor-fold>

                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_AGRUP: '5',
                    IN_FFILTRO: selectedValue,
                    IN_DATE_FROM: txtFilterFrom,
                    IN_DATE_TO: txtFilterTo,
                    IN_CURRENCY: txtFilterCurrency,
                    IN_AREA: '',
                    IN_REGION: '',
                    IN_COUNTRY: txtFilterCountry,
                    IN_CITY: '',
                    IN_CCIA: '',
                    IN_GROUPA: '',
                    IN_CZONA: '',
                    IN_FACTUAL: '2014',
                    IN_COLUMNA: '6',
                    IN_BOOLASC: 'FALSE'
                };
                _path = prototype.url+'/getXLSX?' +
                        'IN_AGRUP='+searchParams.IN_AGRUP+'&' +
                        'IN_FFILTRO='+searchParams.IN_FFILTRO+'&' +
                        'IN_DATE_FROM='+searchParams.IN_DATE_FROM+'&' +
                        'IN_DATE_TO='+searchParams.IN_DATE_TO+'&' +
                        'IN_CURRENCY='+searchParams.IN_CURRENCY+'&' +
                        'IN_AREA='+searchParams.IN_AREA+'&' +
                        'IN_REGION='+searchParams.IN_REGION+'&' +
                        'IN_COUNTRY='+searchParams.IN_COUNTRY+'&' +
                        'IN_CITY='+searchParams.IN_CITY+'&' +
                        'IN_CCIA='+searchParams.IN_CCIA+'&' +
                        'IN_GROUPA='+searchParams.IN_GROUPA+'&' +
                        'IN_CZONA='+searchParams.IN_CZONA+'&' +
                        'IN_FACTUAL='+searchParams.IN_FACTUAL+'&' +
                        'IN_COLUMNA='+searchParams.IN_COLUMNA+'&' +
                        'IN_BOOLASC='+searchParams.IN_BOOLASC;
                // </editor-fold>
                break;
            case 'DSALES':
                // <editor-fold defaultstate="collapsed" desc="llenarData">
                var txtFilterFrom = this.getValue("txtFilterFrom");
                var txtFilterTo = this.getValue("txtFilterTo");
                var txtFilterCurrency = this.getValue("txtFilterCurrency");
                var txtFilterCountry = this.getValue("txtFilterCountry");
                // </editor-fold>

                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_AGRUP: '5',
                    IN_FFILTRO: selectedValue,
                    IN_DATE_FROM: txtFilterFrom,
                    IN_DATE_TO: txtFilterTo,
                    IN_CURRENCY: txtFilterCurrency,
                    IN_AREA: '',
                    IN_REGION: '',
                    IN_COUNTRY: txtFilterCountry,
                    IN_CITY: '',
                    IN_CCIA: '',
                    IN_GROUPA: '',
                    IN_CZONA: '',
                    IN_FACTUAL: '2014',
                    IN_COLUMNA: '6',
                    IN_BOOLASC: 'FALSE'
                };

                _path = prototype.url+'/getXLSX?' +
                        'IN_AGRUP='+searchParams.IN_AGRUP+'&' +
                        'IN_FFILTRO='+searchParams.IN_FFILTRO+'&' +
                        'IN_DATE_FROM='+searchParams.IN_DATE_FROM+'&' +
                        'IN_DATE_TO='+searchParams.IN_DATE_TO+'&' +
                        'IN_CURRENCY='+searchParams.IN_CURRENCY+'&' +
                        'IN_AREA='+searchParams.IN_AREA+'&' +
                        'IN_REGION='+searchParams.IN_REGION+'&' +
                        'IN_COUNTRY='+searchParams.IN_COUNTRY+'&' +
                        'IN_CITY='+searchParams.IN_CITY+'&' +
                        'IN_CCIA='+searchParams.IN_CCIA+'&' +
                        'IN_GROUPA='+searchParams.IN_GROUPA+'&' +
                        'IN_CZONA='+searchParams.IN_CZONA+'&' +
                        'IN_FACTUAL='+searchParams.IN_FACTUAL+'&' +
                        'IN_COLUMNA='+searchParams.IN_COLUMNA+'&' +
                        'IN_BOOLASC='+searchParams.IN_BOOLASC;
                // </editor-fold>
                break;
            default:
                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_TFILTER: '0'
                };

                _path = prototype.url+'/getXLSX?' +
                        'IN_TFILTER='+searchParams.IN_TFILTER;
                // </editor-fold>
                break;
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GSAIncentiveInterline.GridData', {
            proxy: {
                url: prototype.url+'/loadSearch'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: WRF070");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    clearFilter: function() {
        this.setValue('txtFilterFrom','');
        this.setValue('txtFilterTo','');
        this.setValue('txtFilterCurrency','');
        this.setValue('txtFilterCountry','');
    },
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
