Ext.define('Ext.Praxis.controller.sales.ClosePeriod.ClosePeriodController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ClosePeriodController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'ClosePeriodForm';
        prototype.url = CONTEXTPATH+'/ClosePeriod';
        prototype.widthContenedor = 1000;
        prototype.widthGrid = 480;
        // </editor-fold>
        
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        if (newValue!=='') {
            if (newValue > this.getValue('cmbDateToYear')) {
                this.setValue('cmbDateToYear', newValue);
            }
        } else {
            this.setValue('cmbDateFromYear', newValue);
            this.setValue('cmbDateToYear', newValue);
            this.setValue('cmbDateToMonth', newValue);
        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        if (newValue!=='') {
            if (this.getValue('cmbDateFromYear')!=='') {
                if (newValue < this.getValue('cmbDateFromYear')) {
                    this.setValue('cmbDateFromYear', newValue);
                }
            } else this.setValue('cmbDateFromYear', newValue);
        } else {
            this.setValue('cmbDateFromYear', newValue);
            this.setValue('cmbDateFromMonth', newValue);
            this.setValue('cmbDateToMonth', newValue);
        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        if (newValue!=='') {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (newValue > this.getValue('cmbDateToMonth')) {
                    this.setValue('cmbDateToMonth', newValue);
                }
            }
        } else this.setValue('cmbDateToMonth', newValue);
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        if (newValue!=='') {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (this.getValue('cmbDateFromMonth')!=='') {
                    if (newValue < this.getValue('cmbDateFromMonth')) {
                        this.setValue('cmbDateFromMonth', newValue);
                    }
                } else this.setValue('cmbDateFromMonth', newValue);
            }
        } else this.setValue('cmbDateFromMonth', newValue);
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);
        
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function(grid, rowIndex, colIndex) {
        grid.getSelectionModel().setCurrentPosition({row: rowIndex, column: 2});
    },
    onSaveClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        var modified = store.getModifiedRecords();
        if(!Ext.isEmpty(modified)) {
            var strDescripcion = modified[0].modified.strDescripcion===undefined?data.strDescripcion:modified[0].modified.strDescripcion;
            var STVAL = modified[0].modified.STVAL===undefined?data.STVAL:modified[0].modified.STVAL;
            if(strDescripcion!==data.strDescripcion || STVAL!==data.STVAL) {//data.XXX (Nuevo valor)
                this.Save(data.DFLIGHT, data.STVAL, data.strDescripcion);
            }
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
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
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
//        var mes = new Date().getMonth()+1;
//        if(mes < 10) mes = "0"+mes;
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData').getStore().removeAll();
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
    setFormatParameter: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id+'-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth').getValue();
        
        var tyear = Ext.getCmp(prototype.id+'-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id+'-cmbDateToMonth').getValue();
        // </editor-fold>
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: fyear+fmonth,
            IN_FECHA_TO: tyear+tmonth
        };
        _path = prototype.url+'/getXLSX?' +
            'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
            'IN_FECHA_TO='+searchParams.IN_FECHA_TO;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ClosePeriod.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1456");
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
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Save">
    Save: function(DFLIGHT, STVAL, strDescripcion) {
        Ext.Ajax.request({
            url: prototype.url+'/Save',
            method: 'POST',
            timeout: 60000000,
            params: {
                DFLIGHT: DFLIGHT,
                STVAL: STVAL,
                strDescripcion: strDescripcion
            },
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) global.Msg({ msg: res.Mensaje });
                else global.Msg({ msg: res.sesion });
                me.btnSearch_click();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    
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
