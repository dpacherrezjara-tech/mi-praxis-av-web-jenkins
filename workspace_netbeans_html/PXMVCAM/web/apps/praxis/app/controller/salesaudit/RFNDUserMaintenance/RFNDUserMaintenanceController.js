
Ext.define('Ext.Praxis.controller.salesaudit.RFNDUserMaintenance.RFNDUserMaintenanceController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDUserMaintenanceController',

    /**
     * Constructor
     */
    beanTMP: {},
    beanEXCEL:{},
    init: function(view){
        var me = this;
        
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
     /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function(){
        
        this.setStoresFilters();
        this.onLoadUsers();
        this.setStoresFilters();
        this.onLoadUsers();
        this.setStoresGrids();
        //this.setStoresGrids();
    },
    
    OnBeforeShow: function(){
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.id = 'RFNDUserMaintenance';
        prototype.id01 = 'DataEntryRFNDUserMaintenanceController';
        prototype.url = CONTEXTPATH + '/RFNDUserMaintenance';
        prototype.widthContenedor = 1000;
        prototype.heightContenedor = 768;
    },


    setStoresFilters: function(){
        var cmbSearch = Ext.getCmp(prototype.id+'-search-type');
        var cmbStatus = Ext.getCmp(prototype.id+'-CmbStatus');
        var cmbArea = Ext.getCmp(prototype.id+'-search-Area');
         

        cmbSearch.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "SELECT"},
                { "code": "3", "name": "DISCONTINUITY DATE" },
                { "code": "2", "name": "EFECTIVE DATE"},
                { "code": "1", "name": "SYSTEM DATE"}
                
            ]
        }));
        
        cmbStatus.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "ALL"},
                { "code": "IN", "name": "DISABLED"},
                { "code": "DE", "name": "DELETE"},
                { "code": "AC", "name": "ENABLED"}
            ]
        }));
        
        cmbArea.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "ALL"},
                { "code": "0002", "name": "CENTRE AND SOUTH AMERICA"},
                { "code": "0003", "name": "EUROPE AND ASIA"},
                { "code": "0001", "name": "MEXICO"},
                { "code": "0004", "name": "USA AND CANADA"}
            ]
        }));
        
    },

    onLoadUsers: function(){
        var cmbUser = Ext.getCmp(prototype.id+'-txtUser');
        
        var store = Ext.create('Ext.data.Store',{
            proxy:{
                type: 'ajax',
                url: prototype.url + '/loadDataInit2',
                timeout: 60000000,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners:{
                load: function(obj, records, successful, operation, eOpts){
                    cmbUser.setValue('ALL');
                }
            }
        });
        
        cmbUser.setStore(store);
    },
    
    OnLoadDataPendienteAfterrender: function(obj){
        
    },

    setStoresGrids: function(){
        var grid01 = Ext.getCmp(prototype.id + '-gridCalendarBSP');

        var store01 = Ext.create('Ext.data.Store',{
            storeId: prototype.id + '-store-grid01',           
            pageSize: 20,
            fields:[
                {name: 'A3406USER', type: 'string'},
                {name: 'A3406PAIS', type: 'string'},
                {name: 'A3406FREGI', type: 'string'},
                {name: 'A3406FALTA', type: 'string'},
                {name: 'A3406FBAJA', type: 'string'}
            ],
            proxy:{
                type: 'ajax',
                url: prototype.url + '/SearchQueryRefund',
                timeout: 60000000,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
 
        grid01.setStore(store01);
        
//        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    
    onPagingBeforeChange01: function(obj, page, opts){
        obj.store.proxy.extraParams = this.beanTMP;
    },

    onCmbSearchAfterRender: function(obj){
        obj.setValue('');
    },

    onCmbSearchChange: function( obj , newValue , oldValue , eOpts ){
        
    },

    onCmbStatusAfterRender: function(obj){
        obj.setValue('');
    },

    onCmbStatusChange: function( obj , newValue , oldValue , eOpts ){

    },
    
    compareDate: function(dateFrom, dateTo){
        dateFrom = parseInt(String(dateFrom.split('/')[0]) + String(dateFrom.split('/')[1]) + String(dateFrom.split('/')[2]));
        dateTo = parseInt(String(dateTo.split('/')[0]) + String(dateTo.split('/')[1]) + String(dateTo.split('/')[2]));
        return dateFrom > dateTo ? true : false;
    },
    onExcelClick: function () {
        var me = this;
        
        var comboBy = String(Ext.getCmp(prototype.id+'-search-type').getValue());
        
        if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) !== '' &&
             Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) !== '' ){
            if ( this.compareDate(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue(), Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) ){
                Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                return;
            }
        }
        me.beanEXCEL.IN_OPTION = comboBy;
        me.beanEXCEL.IN_DATEFROM = Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue();
        me.beanEXCEL.IN_DATETO = Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue();
        me.beanEXCEL.IN_COUNTRY = Ext.getCmp(prototype.id+'-search-Area').getValue();
        me.beanEXCEL.IN_STATUS = Ext.getCmp(prototype.id+'-CmbStatus').getValue();
        me.beanEXCEL.IN_USER = Ext.getCmp(prototype.id+'-txtUser').getValue();
        me.beanEXCEL.IN_USER = me.beanTMP.IN_USER === 'ALL' ? '' : me.beanTMP.IN_USER;

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

        var grid01 = Ext.getCmp(prototype.id + '-gridCalendarBSP');
        
        var store01 = grid01.getStore();
        
        var comboBy = String(Ext.getCmp(prototype.id+'-search-type').getValue());
        
        if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) != '' &&
             Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) != '' ){
            if ( this.compareDate(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue(), Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) ){
                Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                return;
            }
        }
        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue();
        me.beanTMP.IN_DATETO = Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue();
        me.beanTMP.IN_COUNTRY = Ext.getCmp(prototype.id+'-search-Area').getValue();
        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.id+'-CmbStatus').getValue();
        me.beanTMP.IN_USER = Ext.getCmp(prototype.id+'-txtUser').getValue();
        me.beanTMP.IN_USER = me.beanTMP.IN_USER == 'ALL' ? '' : me.beanTMP.IN_USER;
        
        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        
        store01.loadPage(1, {
            params: me.beanTMP,
            callback: function(records, operation, success) {

            }
        });

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

    onRendererColumnAgency: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    onRendererColumnPassenger: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    onRendererColumnReason: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    
    onBackClick: function(obj){
        var grid01 = Ext.getCmp(prototype.id + '-gridPediente');
        var grid02 = Ext.getCmp(prototype.id + '-gridcabiatas');
        var grid03 = Ext.getCmp(prototype.id + '-gridDETALLE');
        
        if ( grid02.isVisible() ){
            grid01.show();
            grid02.hide();
            grid03.hide();
            Ext.getCmp(prototype.id+'-txtUser').setValue('');
            Ext.getCmp(prototype.id + '-btn-back').hide();
        }else if( grid03.isVisible() ){
            grid01.hide();
            grid02.show();
            grid03.hide();
        }
    },
    
    OnPendingColumnSummary: function(value, summaryData, dataIndex){
        return Ext.util.Format.number(value, '0,000');
    },
    
    OnProcessedColumnSummary: function(value, summaryData, dataIndex){
        return Ext.util.Format.number(value, '0,000.00');
    },

    onRendererColumnOnTime: function(value, metaData, record, rowIndex, colIndex, store, view){
        switch( String(record.get('A3389SEMAF')) ){
            case 'ORANGE':
                value = 'Circle_Orange.png';
            break;
            case 'GREEN':
                value = 'Circle_Green.png';
            break;
            default:
                value = 'Circle_Red.png';
        }
        return '<img src="resources/img/semaforo/' + value + '" width="12px"/>';
    },
    
    onAddClick: function(obj){
        this.winDataEntry('I', {});
    },

    winDataEntry: function(action, rec){
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDUserMaintenance.DataEntryRFNDUserMaintenance({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    },
    
    onEditActionColumnClick: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    
    OnColumnStatusRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        
        if ( String(record.get('A3650FLAG')) == 'Enabled' ){
            value = 'green';
        }else{
            value = 'red';
        }
        
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    
    OnEditActionDisabled: function(view, rowIndex, colIndex, item, record){
        return String(record.get('A3650FLAG')) != 'Enabled' ? true : false;
    },
    

});


