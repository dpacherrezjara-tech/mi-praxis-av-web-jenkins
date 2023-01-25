
Ext.define('Ext.Praxis.controller.salesaudit.RFNDReasonMaintenance.RFNDReasonMaintenanceController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDReasonMaintenanceController',
    beanTMP: {},
    beanEXCEL:{},
    /**
     * Constructor
     */

    init: function(view){
        var me = this;
        
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
     afterRender: function(){
        //alert('Controlador cargado correctamente')
        this.setStoresFilters();
        this.setStoresGrids();
        
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    
    OnBeforeShow: function(){
        prototype.id = 'RFNDReasonMaintenance';
        prototype.id01 = 'DataEntryRFNDReasonMaintenanceController';
        prototype.url = CONTEXTPATH + '/RFNDReasonMaintenance';
        prototype.widthContenedor = 1200;
        prototype.heightContenedor = 768;
    },
    
    setStoresFilters: function(){
        var cmbSearch = Ext.getCmp(prototype.id+'-cbxFiltro');
        var cmbFamilia = Ext.getCmp(prototype.id+'-txtFamilia');
        var cmbStatus = Ext.getCmp(prototype.id+'-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "SELECT"},
                { "code": "C", "name": "COD. REASON"}
            ]
        }));
        
        cmbFamilia.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "ALL"},
                { "code": "Authorise", "name": "AUTHORISE"},
                { "code": "Rejected", "name": "REJECTED"}
                /*{ "code": "Comision", "name": "COMMISSION"},
                { "code": "Formas P", "name": "FORM OF PAYMENT"},
                { "code": "TKTEXPI", "name": "TKTEXPI"},
                { "code": "Fare", "name": "FARE"},
                { "code": "Taxes", "name": "TAXES"},
                { "code": "sale D", "name": "SALES D"}*/
            ]
        }));
        
        cmbStatus.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "ALL"},
                { "code": "AC", "name": "ENABLED"},
                { "code": "IN", "name": "DISABLED"}
            ]
        }));
        
        cmbSearch.setValue('');
        cmbFamilia.setValue('');
        cmbStatus.setValue('');
    },
    
    setStoresGrids: function(){
        var grid01 = Ext.getCmp(prototype.id + '-gridData');

        var store01 = Ext.create('Ext.data.Store',{
            storeId: prototype.id + '-store-grid01',           
            pageSize: 20,
            proxy:{
                type: 'ajax',
                url: prototype.url + '/SearchRFNDReasaons',
                timeout: 60000000,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
 
        grid01.setStore(store01);
        
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);
        
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
    },
    
    onPaginationChkChange: function(obj, newValue, oldValue, eOpts){
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click',{});
        if (!newValue){
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        }else{
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },
    
    onPagingBeforeChange01: function(obj, page, opts){
        obj.store.proxy.extraParams = this.beanTMP;
    },
    
    OnColumnStatusRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        if ( String(record.get('A3651FLAG')) == 'Enabled' ){
            value = 'green';
        }else{
            value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onExcelClick: function () {
        var me = this;
        var selectedValue = String(Ext.getCmp(prototype.id+'-cbxFiltro').getValue());
        
        me.beanEXCEL.IN_OPTION = selectedValue;
        me.beanEXCEL.IN_CODRAZ = '';
        me.beanEXCEL.IN_STATUS = Ext.getCmp(prototype.id+'-CmbStatus').getValue();
        me.beanEXCEL.A3651FAMIL = Ext.getCmp(prototype.id+'-txtFamilia').getValue();
        me.beanEXCEL.IN_COMENT = '';
        

        if (Ext.Object.getSize(me.beanEXCEL) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanEXCEL)));
                    }
                }
            });
        }
    },
    onSearchClick: function(btn){
        var me = this;
        var form = Ext.getCmp(prototype.id + '-contenedor-filters-form').getForm();

        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        
        var store01 = grid01.getStore();
        
        var selectedValue = String(Ext.getCmp(prototype.id+'-cbxFiltro').getValue());
        
        this.beanTMP.IN_OPTION = selectedValue;
        this.beanTMP.IN_CODRAZ = '';
        this.beanTMP.IN_STATUS = Ext.getCmp(prototype.id+'-CmbStatus').getValue();
        this.beanTMP.A3651FAMIL = Ext.getCmp(prototype.id+'-txtFamilia').getValue();
        this.beanTMP.IN_COMENT = '';
        
        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        this.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        
        // console.log(this.beanTMP);
        
        store01.loadPage(1, {
            params: this.beanTMP,
            callback: function(records, operation, success) {

            }
        });
        
    },
    
    onRendererColumDescription: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },
    
    onEditActionColumnClick: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    
    winDataEntry: function(action, rec){
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDReasonMaintenance.DataEntryRFNDReasonMaintenance({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url,
            }
        });
        //console.log(win);
      win.show();
    },
    
    onAddClick: function(obj){
        this.winDataEntry('I', {});
    },
    
    OnEditActionDisabled: function(view, rowIndex, colIndex, item, record){
        return false;
    },

});

