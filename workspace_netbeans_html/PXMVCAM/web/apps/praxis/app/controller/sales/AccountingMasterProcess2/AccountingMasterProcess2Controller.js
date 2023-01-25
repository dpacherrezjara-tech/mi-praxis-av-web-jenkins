Ext.define('Ext.Praxis.controller.sales.AccountingMasterProcess2.AccountingMasterProcess2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterProcess2Controller',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},    
    _path: '',
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'AccountingMasterProcess2Form';
        prototype.url = CONTEXTPATH+'/AccountingMasterProcess2';
        prototype.widthContenedor = 1300;
        prototype.widthGrid = 863;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
//        this.btnSearch_click();
    },
    onMostrarFiltrosChange: function(cmp, newValue, oldValue, eOpts) {
        this.limpiarFiltros();
        
        var strModulo = this.getValue('cboModulo');
        
        switch (strModulo) {
            case 'PSALES':
            case 'PADM':
            case 'PFOB':
            case 'PCONSORTIA':
            case 'PPSALES':
                Ext.getCmp(prototype.id+'-boxDateFilter').show();
                Ext.getCmp(prototype.id+'-boxPeriodFilter').hide();
                break;
            case 'PFLOWN':
                Ext.getCmp(prototype.id+'-boxDateFilter').show();
                Ext.getCmp(prototype.id+'-boxPeriodFilter').hide();
                break;
            case 'PAPINT':
                Ext.getCmp(prototype.id+'-boxDateFilter').hide();
                Ext.getCmp(prototype.id+'-boxPeriodFilter').show();
                break;
            case 'PARINT':
                Ext.getCmp(prototype.id+'-boxDateFilter').hide();
                Ext.getCmp(prototype.id+'-boxPeriodFilter').show();
                break;            
            case 'PCADUCOS':
                Ext.getCmp(prototype.id+'-boxDateFilter').hide();
                Ext.getCmp(prototype.id+'-boxPeriodFilter').show();
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id+'-cmbDateYearFrom').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateYearTo').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateMonthFrom').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateMonthTo').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        console.log(rec);
        if(rec.data.A1955MODUL!=='PADM')
            this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.AccountingMasterProcess2Form.DataEntry', {
            id: 'DataEntryAccountingMasterProcess2Form',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var strModulo = this.getValue('cboModulo');
        if (strModulo!=='') {
            this.setFormatParameter();
            this.setGridData();
        } else {
            global.Msg({
                msg: 'Please select module.'
            });
            this.focus('cboModulo');
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-boxSearchFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnExcel_click: function(obj, e) {
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
    },
    btnClear_click: function(obj, e) {
        this.limpiarFiltros();
        
        this.setValue("cboModulo", "");
        
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
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cboModulo = this.getValue('cboModulo');
        switch (cboModulo) {
            case 'PSALES': case 'PFLOWN': case 'PADJMA': case 'PCADUCOS': case 'PPSALES': case 'PADM': case 'PFOB': case 'PCONSORTIA':
                searchParams.IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtDateFrom').getValue(), 'Ymd');
                searchParams.IN_FECHA_ACUSE = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtDateTo').getValue(), 'Ymd');
                break;
            case 'PAPINT': case 'PARINT':
                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                var fyear = Ext.getCmp(prototype.id+'-cmbDateYearFrom').getValue();
                var fmonth = Ext.getCmp(prototype.id+'-cmbDateMonthFrom').getValue();
                var fperiod = Ext.getCmp(prototype.id+'-cmbDatePeriodFrom').getValue();

                var tyear = Ext.getCmp(prototype.id+'-cmbDateYearTo').getValue();
                var tmonth = Ext.getCmp(prototype.id+'-cmbDateMonthTo').getValue();
                var tperiod = Ext.getCmp(prototype.id+'-cmbDatePeriodTo').getValue();
                // </editor-fold>
                searchParams.IN_FECHA_PROCESO = fyear + fmonth + fperiod;
                searchParams.IN_FECHA_ACUSE = tyear + tmonth + tperiod;
                break;
        }
        searchParams.IN_MODULO = cboModulo;
        searchParams.A1955STATU = this.getValue('cboEstado');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        _path = prototype.url+'/getXLSX?' +
                'IN_MODULO='+searchParams.IN_MODULO+'&' +
                'IN_FECHA_PROCESO='+searchParams.IN_FECHA_PROCESO+'&' +
                'IN_FECHA_ACUSE='+searchParams.IN_FECHA_ACUSE+'&' +
                'A1955STATU='+searchParams.A1955STATU;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterProcess2.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1955");
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
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>    
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    limpiarFiltros: function() {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id+'-cmbDatePeriodFrom').setValue('');
        Ext.getCmp(prototype.id+'-cmbDatePeriodTo').setValue('');
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateMonthFrom').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateMonthTo').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateYearFrom').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-cmbDateYearTo').setValue(new Date().getFullYear());
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue("cboEstado", "");
        
        this.setValue("txtDateFrom", "");
        this.setValue("txtDateTo", "");
        // </editor-fold>
//      
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-boxDateFilter').hide();
        Ext.getCmp(prototype.id+'-boxPeriodFilter').hide();
        // </editor-fold>
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
