Ext.define('Ext.Praxis.controller.sales.CommissionBSPASR.CommissionBSPASRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CommissionBSPASRController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'CommissionBSPASRForm';
        prototype.url = CONTEXTPATH+'/CommissionBSPASR';
        prototype.widthContenedor = 1675;
        prototype.widthGrid = 1670;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
    },
    onCmbDateChange: function(cmp, newValue) {
        // <editor-fold defaultstate="collapsed" desc="hide">
        Ext.getCmp(prototype.id+'-HBox_Option01').hide();
        Ext.getCmp(prototype.id+'-HBox_Option02').hide();
        Ext.getCmp(prototype.id+'-HBox_Option03').hide();
        // </editor-fold>
        switch (newValue) {
            case '1':
                Ext.getCmp(prototype.id+'-HBox_Option01').show();
                this.focus("txtGSA");
                break;
            case '2':
                Ext.getCmp(prototype.id+'-HBox_Option02').show();
                this.focus("txtLote");
                break;
            case '3':
                Ext.getCmp(prototype.id+'-HBox_Option03').show();
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onYearChange: function(combo, newValue, oldValue, eOpts) {
        var cmbDateMonth = Ext.getCmp(prototype.id+'-cmbDateMonth');
        var cmbDateDay = Ext.getCmp(prototype.id+'-cmbDateDay');
        if (newValue!=='') {
            if (this.getValue("cmbDateMonth")==='02') {
                var cmbDateDay = Ext.getCmp(prototype.id+'-cmbDateDay');
                var store = win.getStoreDays2(true, newValue, 1);
                cmbDateDay.bindStore(store);
                cmbDateDay.setValue('');
            }
        } else {
            cmbDateMonth.setValue(newValue);
            cmbDateDay.setValue(newValue);
        }
    },
    onMonthChange: function(combo, newValue, oldValue, eOpts) {
        var cmbDateDay = Ext.getCmp(prototype.id+'-cmbDateDay');
        if (newValue!=='') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateYear"), Number(newValue) - 1);
            cmbDateDay.bindStore(store);
            cmbDateDay.setValue('');
        } else {
            cmbDateDay.setValue(newValue);
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id+'-cmbDateYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateMonth').bindStore(storeComboDataMonth);

        var days = new Array(); days.push(['', 'All']);
        Ext.getCmp(prototype.id+'-cmbDateDay').bindStore(
            Ext.create('Ext.data.ArrayStore', {
                autoLoad: true,
                data: days,
                fields: ['code', 'name']
            })
        );
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onGSA_act1Click: function(column, e, rowIndex, columnIndex, x, rowDat) {
        var store = Ext.getCmp(prototype.id+'-gridGSA').getStore();
        var data = store.getAt(rowIndex).data;
        this.winDataEntry(data);
    },
    winDataEntry: function(data) {
        data = data === null || data === undefined ? {} : data;
        Ext.create('Ext.Praxis.view.sales.CommissionBSPASRForm.DataEntry', {
            id: 'DataEntryCommissionBSPASRForm',
            params: {
                data: data
            }
        }).show();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter('S');
        this.setGridData();
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    btnExcel_click: function(obj, e) {
        this.setFormatParameter('E');
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
        Ext.getCmp(prototype.id+'-cmbDateDay').setValue("");
//        var mes = new Date().getMonth()+1;
//        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateMonth').setValue("");
        Ext.getCmp(prototype.id+'-cmbDateYear').setValue(new Date().getFullYear());
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue('txtGSA', '');
        this.setValue('txtLote', '');
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridGSA').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-boxMainData').show();
        Ext.getCmp(prototype.id+'-HBox_Option01').hide();
        Ext.getCmp(prototype.id+'-HBox_Option02').hide();
        Ext.getCmp(prototype.id+'-HBox_Option03').hide();
        // </editor-fold>
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.showMenu();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function(modo) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var selectedValue = this.getValue("cmbDate");
        var txtGSA = this.getValue("txtGSA");
        var txtLote = this.getValue("txtLote");
        var cbmStatus = this.getValue("cbmStatus");

        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var year = Ext.getCmp(prototype.id+'-cmbDateYear').getValue();
        var month = Ext.getCmp(prototype.id+'-cmbDateMonth').getValue();
        var day = Ext.getCmp(prototype.id+'-cmbDateDay').getValue();
        
        
        console.log(selectedValue);
        console.log(year);
        console.log(month);
        console.log(day);
        // </editor-fold>
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        switch (selectedValue) {
            case '1':
                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_A1775CCUST: '139',
                    IN_A1775GSA: txtGSA,
                    IN_A1775LOTE: '',
                    IN_A1775FINI: '',
                    A1775STAT: ''
                };
                // </editor-fold>
                break;
            case '2':
                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_A1775CCUST: '139',
                    IN_A1775GSA: '',
                    IN_A1775LOTE: txtLote,
                    IN_A1775FINI: '',
                    A1775STAT: cbmStatus
                };
                // </editor-fold>
                break;
            case '3':
                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_A1775CCUST: '139',
                    IN_A1775GSA: '',
                    IN_A1775LOTE: '',
                    IN_A1775FINI: year+month+day,
                    A1775STAT: ''
                };
                console.log(searchParams);
                // </editor-fold>
                break;
            default:
                // <editor-fold defaultstate="collapsed" desc="asignación">
                searchParams = {
                    IN_A1775CCUST: '139',
                    IN_A1775GSA: '',
                    IN_A1775LOTE: '',
                    IN_A1775FINI: '',
                    A1775STAT: ''
                };
                // </editor-fold>
        }
        _path = prototype.url+'/getXLSX/?' +
            'IN_A1775CCUST='+searchParams.IN_A1775CCUST+'&' +
            'IN_A1775GSA='+searchParams.IN_A1775GSA+'&' +
            'IN_A1775LOTE='+searchParams.IN_A1775LOTE+'&' +
            'IN_A1775FINI='+searchParams.IN_A1775FINI+'&' +
            'A1775STAT='+searchParams.A1775STAT+'&' +
            'MODO='+modo;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function(data) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CommissionBSPASR.GridData', {
            proxy: {
                url: prototype.url+'/loadGSA/'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1775");
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
        Ext.getCmp(prototype.id+'-gridGSA').bindStore(storeGridDatas);
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
