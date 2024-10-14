Ext.define('Ext.Praxis.controller.panel.PerPro.PerProController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PerProController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    beanOption: '',
    searchParams: {},    
    _path: '',
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'PerProForm';
        prototype.url = CONTEXTPATH+'/PerPro';
        prototype.widthContenedor = 1300;
        prototype.widthGrid = 1200;
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
        
    },
    // <editor-fold defaultstate="collapsed" desc="Combos">
    setStoreData: function() {
        var cboGroup = Ext.getCmp(prototype.id + '-cboGroup');
        cboGroup.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "User"],
                ["2", "Program Id"]
            ]
        }));
        var cboModuleGroup = Ext.getCmp(prototype.id + '-cboModuleGroup');
        cboModuleGroup.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["10", "SALES"],
                ["11", "FLOWN"],
                ["12", "INTERLINE"],
                ["14", "TNU"],
                ["15", "PAYMENTS CONTROL"],
                ["16", "BI TOOLS"],
                ["17", "OTHERS"],
                ["19", "PANEL"],
                ["21", "SALES AUDIT"],
                ["23", "FOREIGN"]
            ]
        }));
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        console.log(rec);        
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.panel.PerProForm.DataEntry', {
            id: 'DataEntryPerProForm',
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
        var option = Ext.getCmp(prototype.id+'-codigo-option').getValue();
        if (option==='') {
            this.msjAlert='Enter data';
            global.Msg({
                msg: this.msjAlert
            });
            return false;
        }
        this.setFormatParameter();
        this.setGridData();
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
        var group = Ext.getCmp(prototype.id + '-cboGroup').getValue();
        var option = Ext.getCmp(prototype.id+'-codigo-option').getValue();
        
        searchParams = { 
                group: group,
                option: option
            };
             
        // <editor-fold defaultstate="collapsed" desc="asignación">
        _path = prototype.url+'/getXLSX?' +
                'group='+searchParams.group+'&' +
                'option='+searchParams.option;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.panel.PerPro.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: INF053");
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
            this.setFormatParameter();
            console.log("PATH XLS: "+_path);
            global.getFile(_path);
        }
    },
    onCopyUSR: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to copy ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.beanOption = {strOption : "CO"};
                    this.llenarData();
                    if (this.validaRequiredFields()) {
                        this.crud();
                    } else {
                        var msg = this.msjAlert;
                        if (msg==='') msg = 'You must enter all required fields.';
                        global.Msg({
                            msg: msg
                        });
                    }
                }
            }
        });                                     
    },
    onInsertModule: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.beanOption = {strOption : "IM"};
                    this.llenarData();
                    if (this.validaRequiredFields()) {
                        this.crud();
                    } else {
                        var msg = this.msjAlert;
                        if (msg==='') msg = 'You must enter all required fields.';
                        global.Msg({
                            msg: msg
                        });
                    }
                }
            }
        });                                     
    },
    onDeleteModule: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.beanOption = {strOption : "DM"};
                    this.llenarData();
                    if (this.validaRequiredFields()) {
                        this.crud();
                    } else {
                        var msg = this.msjAlert;
                        if (msg==='') msg = 'You must enter all required fields.';
                        global.Msg({
                            msg: msg
                        });
                    }
                }
            }
        });                                     
    },
    validaRequiredFields: function() {
        var option = this.beanOption.strOption;
        if(option === "CO"){
            var startUSR = Ext.getCmp(prototype.id+'-startUSR').getValue();
            var endUSR = Ext.getCmp(prototype.id+'-endUSR').getValue();
            if (startUSR ==='' || endUSR === '') {
                this.msjAlert='Enter correct data';
                return false;
            }
            return true;
        }
        else if(option === "IM" || option === "DM"){
            var moduleUSR = Ext.getCmp(prototype.id+'-moduleUSR').getValue();
            var MODULE = Ext.getCmp(prototype.id+'-cboModuleGroup').getValue();
            if (moduleUSR ==='') {
                this.msjAlert='Enter correct data';
                return false;
            }
            return true;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function() {
        var option = this.beanOption.strOption;
        this.beanOption = {};
        var USR = '';
        if(option === "IM" || option === "DM"){
            USR = Ext.getCmp(prototype.id+'-moduleUSR').getValue();
        }
        else if(option === "CO"){
            USR = Ext.getCmp(prototype.id+'-endUSR').getValue();
        }
        var startUSR = Ext.getCmp(prototype.id+'-startUSR').getValue();
        var MODULE = Ext.getCmp(prototype.id+'-cboModuleGroup').getValue();
        var PERMA =  Ext.getCmp(prototype.id+'-moduleChkAccess').getValue() ? 'Y' : 'N';
        var PERML =  Ext.getCmp(prototype.id+'-moduleChkRead').getValue() ? 'Y' : 'N';
        var PERMC =  Ext.getCmp(prototype.id+'-moduleChkInsert').getValue() ? 'Y' : 'N';
        var PERMM =  Ext.getCmp(prototype.id+'-moduleChkUpdate').getValue() ? 'Y' : 'N';
        var PERMX =  Ext.getCmp(prototype.id+'-moduleChkExport').getValue() ? 'Y' : 'N';
        var PERME =  Ext.getCmp(prototype.id+'-moduleChkDelete').getValue() ? 'Y' : 'N';
        this.beanOption = {
            USR: USR,
            USRCOPY: startUSR,
            MODULE: MODULE,
            PERMA: PERMA,
            PERML: PERML,
            PERMC: PERMC,
            PERMM: PERMM,
            PERMX: PERMX,
            PERME: PERME,
            STAT:"A",
            strOption: option
        };
        console.log('beanOption');
        console.log(this.beanOption);     
        
    },
    // </editor-fold>
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/crud',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.response;                    
                    var icon=1;
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            if (msg==='Operation was successful') {
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    
    limpiarFiltros: function() {
        // <editor-fold defaultstate="collapsed" desc="Clear Option">
        Ext.getCmp(prototype.id+'-cboGroup').setValue('1');
        Ext.getCmp(prototype.id+'-codigo-option').setValue('');        
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
