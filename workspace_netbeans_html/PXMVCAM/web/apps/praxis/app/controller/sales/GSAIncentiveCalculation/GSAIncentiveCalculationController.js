Ext.define('Ext.Praxis.controller.sales.GSAIncentiveCalculation.GSAIncentiveCalculationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GSAIncentiveCalculationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'GSAIncentiveCalculationForm';
        prototype.url = CONTEXTPATH+'/GSAIncentiveCalculation';
        prototype.widthContenedor = 1800;
        prototype.widthGrid = 1785;
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
            case 'GSA':
                Ext.getCmp(prototype.id+'-boxFilter').show();
                this.focus('txtFilterGSA');
                break;
            default:
                Ext.getCmp(prototype.id+'-boxFilter').hide();
                break;
        }
    },
    onApplicationChange: function() {
        var selectedValue = this.getValue('cmbApplication');
        switch (selectedValue) {
            case 'Y':
            case 'M':
                Ext.getCmp(prototype.id+'-lblFrom').show();
                Ext.getCmp(prototype.id+'-txtFilterYearFrom').show();
                Ext.getCmp(prototype.id+'-lblTo').show();
                Ext.getCmp(prototype.id+'-txtFilterYearTo').show();
                this.focus('txtFilterYearFrom');
                break;
            default:
                Ext.getCmp(prototype.id+'-lblFrom').hide();
                Ext.getCmp(prototype.id+'-txtFilterYearFrom').hide();
                Ext.getCmp(prototype.id+'-lblTo').hide();
                Ext.getCmp(prototype.id+'-txtFilterYearTo').hide();
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
        this.setValue('cmbApplication', '');
        this.setValue('cmbOpcion', '');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridTourCode').getStore().removeAll();
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
            case 'GSA':
                // <editor-fold defaultstate="collapsed" desc="llenarData">
                var txtFilterGSA = this.getValue("txtFilterGSA");
                var txtFilterYearFrom = this.getValue("txtFilterYearFrom");
                var txtFilterYearTo = this.getValue("txtFilterYearTo");
                var cmbApplication = this.getValue("cmbApplication");
                // </editor-fold>

                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_TFILTER: '1',
                    IN_GSA: txtFilterGSA,
                    IN_YEAR_F: txtFilterYearFrom,
                    IN_YEAR_T: txtFilterYearTo,
                    IN_FLAG_YM: cmbApplication
                };

                _path = prototype.url+'/getXLSX?' +
                        'IN_TFILTER='+searchParams.IN_TFILTER+'&' +
                        'IN_GSA='+searchParams.IN_GSA+'&' +
                        'IN_YEAR_F='+searchParams.IN_YEAR_F+'&' +
                        'IN_YEAR_T='+searchParams.IN_YEAR_T+'&' +
                        'IN_FLAG_YM='+searchParams.IN_FLAG_YM;
                // </editor-fold>
                break;
            default:
                // <editor-fold defaultstate="collapsed" desc="llenarData">
                // </editor-fold>

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
    setGridData: function(data) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GSAIncentiveCalculation.GridData', {
            proxy: {
                url: prototype.url+'/loadSearch'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1778");
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
        Ext.getCmp(prototype.id+'-gridTourCode').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    clearFilter: function() {
        this.setValue('txtFilterGSA','');
        this.setValue('txtFilterYearFrom','');
        this.setValue('txtFilterYearTo','');
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
