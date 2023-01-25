Ext.define('Ext.Praxis.controller.sales.LoadCommissionADMACM.LoadCommissionADMACMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadCommissionADMACMController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'LoadCommissionADMACMForm';
        prototype.url = CONTEXTPATH+'/LoadCommissionADMACM';
        prototype.widthContenedor = 1290;
        prototype.widthGrid = 1280;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.btnClear_click();
//        this.btnSearch_click();
    },
    onCmbOpcionChange: function(cmp, newValue) {
        Ext.getCmp(prototype.id+'-boxFilter01').hide();
        Ext.getCmp(prototype.id+'-boxFilter02').hide();
        Ext.getCmp(prototype.id+'-boxFilter03').hide();
        Ext.getCmp(prototype.id+'-spacio').hide();
        switch (newValue) {
            case '1':
                Ext.getCmp(prototype.id+'-boxFilter01').show();
                this.focus("txtFilterDateFrom");
                break;
            case '3':
                Ext.getCmp(prototype.id+'-boxFilter03').show();
                this.focus("cmbType");
                break;
            case '2':
                Ext.getCmp(prototype.id+'-boxFilter02').show();
                this.focus("txtFilterDateFrom2");
                break;
            case '':
                Ext.getCmp(prototype.id+'-spacio').show();
                this.setValue('txtFilterDateFrom', '');
                this.setValue('txtFilterDateTo', '');
                this.setValue('txtFilterDateFrom2', '');
                this.setValue('txtFilterDateTo2', '');
        }
    },
    onLoadACM_ADMClick: function() {
        Ext.create('Ext.Praxis.view.sales.LoadCommissionADMACMForm.DataEntry', {
            id: 'DataEntryLoadCommissionADMACMForm'
        }).show();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var cmbOpcion = this.getValue('cmbOpcion');
        if (cmbOpcion!=='') {
            switch (cmbOpcion) {
                case '1':
                    if (this.getValue('txtFilterDateFrom')!==null && this.getValue('txtFilterDateTo')!==null) {
                        this.setFormatParameter();
                        this.setGridData();
                    } else {
                        if(this.getValue('txtFilterDateFrom')===null) {
                            global.Msg( {msg: 'Enter From'} );
                        } else if(this.getValue('txtFilterDateTo')===null) {
                            global.Msg( {msg: 'Enter To'} );
                        }
                    }
                    break;
                case '2':
                    if (this.getValue('txtFilterDateFrom2')!==null && this.getValue('txtFilterDateTo2')!==null) {
                        this.setFormatParameter();
                        this.setGridData();
                    } else {
                        if(this.getValue('txtFilterDateFrom2')===null) {
                            global.Msg( {msg: 'Enter From'} );
                        } else if(this.getValue('txtFilterDateTo2')===null) {
                            global.Msg( {msg: 'Enter To'} );
                        }
                    }
                    break;
            }
        } else global.Msg( {msg: 'SELECT SEARCH BY'} );
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
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue('cmbOpcion', '');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData02').getStore().removeAll();
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
    setFormatParameter: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var selectedValue = this.getValue("cmbOpcion");
        var cmbType = this.getValue("cmbType");
        var txtFilterDateFrom = Ext.util.Format.date(this.getValue('txtFilterDateFrom'), 'Ymd');
        var txtFilterDateTo = Ext.util.Format.date(this.getValue('txtFilterDateTo'), 'Ymd');
        var txtFilterDateFrom2 = Ext.util.Format.date(this.getValue('txtFilterDateFrom2'), 'Ymd');
        var txtFilterDateTo2 = Ext.util.Format.date(this.getValue('txtFilterDateTo2'), 'Ymd');
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_OPTION: selectedValue,
            IN_DATEFROM: txtFilterDateFrom.trim(),
            IN_DATETO: txtFilterDateTo.trim(),
            IN_SELET_TYPE: cmbType,
            IN_DATEPER1: txtFilterDateFrom2.trim(),
            IN_DATEPER2: txtFilterDateTo2.trim()
        };
        _path = prototype.url+'/getXLSX?' +
            'IN_OPTION='+searchParams.IN_OPTION+'&' +
            'IN_DATEFROM='+searchParams.IN_DATEFROM+'&' +
            'IN_DATETO='+searchParams.IN_DATETO+'&' +
            'IN_SELET_TYPE='+searchParams.IN_SELET_TYPE+'&' +
            'IN_DATEPER1='+searchParams.IN_DATEPER1+'&' +
            'IN_DATEPER2='+searchParams.IN_DATEPER2;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadCommissionADMACM.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2672");
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
        Ext.getCmp(prototype.id+'-gridData02').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
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
