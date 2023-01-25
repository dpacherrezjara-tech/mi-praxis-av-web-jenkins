
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkTaskAssignmentRFND.BsplinkTaskAssignmentRFNDController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.BsplinkTaskAssignmentRFNDController',
    
    beanTMP: {},
    beanTMP01: {},
    beanTMP02: {},
    beanGuardar: {},

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
        // alert('Controlador cargado correctamente')
        this.setStoresFilters();
        this.onLoadUsers();
        this.setStoresGrids();
    },
    
    OnBeforeShow: function(){
        /*
         * Solucion temporal para el reinicio de variables
         */
        // console.log('Antes de mostrar...');
        prototype.id = 'BsplinkTaskAssignmentRFND';
        prototype.url = CONTEXTPATH + '/BsplinkTaskAssignmentRFND';
        prototype.widthContenedor = 1100;
        prototype.heightContenedor = 768;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function(){
        // alert('Controlador cargado correctamente...')

        this.setStoresFilters();
        this.onLoadUsers();
        this.setStoresGrids();
        
        // Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },

    setStoresFilters: function(){
        var cmbSearch = Ext.getCmp(prototype.id+'-search-type');
        var cmbStatus = Ext.getCmp(prototype.id+'-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "SELECTED"},
                { "code": "1", "name": "APPLICATION DATE"},
                { "code": "2", "name": "DOCUMENT"},
                { "code": "3", "name": "TICKET" }
            ]
        }));
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },

    onLoadUsers: function(){
        var cmbUser = Ext.getCmp(prototype.id+'-txtUser');
        var txtUser2 = Ext.getCmp(prototype.id+'-txtUser2');
        var store = Ext.create('Ext.data.Store',{
            proxy:{
                type: 'ajax',
                url: prototype.url01 + '/loadDataInit',
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
        
        var store2 = Ext.create('Ext.data.Store',{
            proxy:{
                type: 'ajax',
                url: prototype.url01 + '/loadDataInit2',
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
                    cmbUser.setValue('');
                }
            }
        });
        cmbUser.setStore(store);
        txtUser2.setStore(store2);
    },
    
    OnLoadDataPendienteAfterrender: function(obj){
        
    },

    setStoresGrids: function(){
        var grid01 = Ext.getCmp(prototype.id + '-gridPediente');
        var grid02 = Ext.getCmp(prototype.id + '-gridcabiatas');
        var grid03 = Ext.getCmp(prototype.id + '-gridDETALLE');
        
        this.beanTMP = {
            IN_OPTION: '1',
            IN_COUNTRY: '',
            IN_USER: '',
            IN_DATEFROM: '',
            IN_DOCUMET: '',
            IN_FORMA: ''
        };

        var store01 = Ext.create('Ext.data.Store',{
            storeId: prototype.id + '-store-grid01',           
            pageSize: 20,
            fields:[
                {name: 'A3389FAPPI', type: 'string'},
                {name: 'A3389REGAS', type: 'string'},
                {name: 'A3389CANTPEDI', type: 'int'},
                {name: 'A3389CANTPROC', type: 'float'}
            ],
            proxy:{
                type: 'ajax',
                url: prototype.url + '/SearchGroupTaskAssignment',
                timeout: 60000000,
                extraParams: this.beanTMP,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true
        });
        
        var store02 = Ext.create('Ext.data.Store',{
            storeId: prototype.id + '-store-grid02',           
            pageSize: 20,
            fields:[
                {name: 'A3389REGAS', type: 'string'},
                {name: 'A3389FREAS', type: 'string'},
                {name: 'A3389PAIS', type: 'string'},
                {name: 'A3389CANTPEDI', type: 'int'},
                {name: 'A3389CANTPROC', type: 'float'}
            ],
            proxy:{
                type: 'ajax',
                url: prototype.url + '/SearchTaskAssignment',
                timeout: 60000000,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: false
        });
        
        var store03 = Ext.create('Ext.data.Store',{
            storeId: prototype.id + '-store-grid03',           
            pageSize: 20,
            fields:[
                {name: 'A3389REGAS', type: 'string'},
                {name: 'A3389NUMER', type: 'string'},
                {name: 'A3389PAIS', type: 'string'},
                {name: 'A3389FLAG', type: 'string'},
                {name: 'A3389FREAS', type: 'string'},
                {name: 'A3389PREME', type: 'string'},
                {name: 'CHK', type: 'bool'}
            ],
            proxy:{
                type: 'ajax',
                url: prototype.url + '/SearchTaskAssignmentDetail',
                timeout: 60000000,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: false
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        
//        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    
    onPagingBeforeChange01: function(obj, page, opts){
        obj.store.proxy.extraParams = this.beanTMP;
    },

    onCmbSearchAfterRender: function(obj){
        obj.setValue('');
    },

    onCmbSearchChange: function( obj , newValue , oldValue , eOpts ){
        // console.log(String(newValue))
        var txtIATA = Ext.getCmp(prototype.id+'-txtIATA');
        var txtDateFrom = Ext.getCmp(prototype.id+'-txtFilterDateFrom');
        var txtDateTo = Ext.getCmp(prototype.id+'-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.id+'-txtCia');
        var txtForma = Ext.getCmp(prototype.id+'-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id+'-txtSeq');
        var txtNumber = Ext.getCmp(prototype.id+'-txtNumber');
        
        switch(String(newValue)){
            case '1':
                txtDateFrom.show();
                txtDateTo.show();
                
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtIATA.hide();
                txtNumber.hide();

                txtForma.setValue('');
                txtSeq.setValue('');
                txtIATA.setValue('');
                txtNumber.setValue('');
            break;
            case '2':
                txtNumber.show();
                
                txtDateFrom.hide();
                txtDateTo.hide();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtIATA.hide();
                
                txtForma.setValue('');
                txtSeq.setValue('');
                txtIATA.setValue('');
                txtDateFrom.setValue('');
                txtDateTo.setValue('');
            break;
            case '3':
                txtCia.show();
                txtForma.show();
                txtSeq.show();
                
                txtNumber.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtIATA.hide();
                
                txtIATA.setValue('');
                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtNumber.setValue('');
            break;
            default:
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtIATA.hide();
                
                txtForma.setValue('');
                txtSeq.setValue('');
                txtIATA.setValue('');
                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtNumber.setValue('');
                
        }
    },

    onCmbStatusAfterRender: function(obj){
        obj.setValue('');
    },

    onCmbStatusChange: function( obj , newValue , oldValue , eOpts ){

    },

    onSearchClick: function(btn){
        var me = this;
        var form = Ext.getCmp(prototype.id + '-contenedor-filters-form').getForm();

        var grid01 = Ext.getCmp(prototype.id + '-gridPediente');
        var grid02 = Ext.getCmp(prototype.id + '-gridcabiatas');
        var grid03 = Ext.getCmp(prototype.id + '-gridDETALLE');
        
        var store01 = grid01.getStore();
        var store02 = grid02.getStore();
        var store03 = grid03.getStore();
        
        var comboBy = String(Ext.getCmp(prototype.id+'-search-type').getValue());
       /* if ( comboBy != '7' ){
            if ( comboBy == '' ){
                Ext.Msg.alert('.: PRAXIS :.', 'Select Search Type');
                return;
            }
        }*/
        
        if ( comboBy == '1' ){
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) != '' ){
                if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) == '' ){
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) != '' ){
                if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) == '' ){
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }

            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) != '' &&
                 Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) != '' ){
                if ( Ext.Date.getDayOfYear(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getValue()) > 
                     Ext.Date.getDayOfYear(Ext.getCmp(prototype.id+'-txtFilterDateTo').getValue()) ){
                    Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                    return;
                }
            }
        }
        
        if ( comboBy == '2' ){
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtNumber').getRawValue()) == '' ){
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Country');
                return;
            }
        }
        
        if ( comboBy == '3' ){
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getRawValue()) == '' ){
                Ext.Msg.alert('.: PRAXIS :.', 'Enter TKT');
                return;
            }
        }
        
        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue();
        me.beanTMP.IN_DATETO = Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue();
        me.beanTMP.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id+'-cmbCountry').getValue());
        me.beanTMP.IN_USER = Ext.getCmp(prototype.id+'-txtUser').getValue();
        me.beanTMP.IN_USER = me.beanTMP.IN_USER == 'ALL' ? '' : me.beanTMP.IN_USER;
        me.beanTMP.IN_DOCUMET = Ext.String.trim(Ext.getCmp(prototype.id+'-txtNumber').getValue());
        me.beanTMP.IN_CIA = Ext.String.trim(Ext.getCmp(prototype.id+'-txtCia').getValue());
        me.beanTMP.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue());
        //me.beanTMP.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue().substr(4,10));
        me.beanTMP.IN_SEQ = Ext.String.trim(Ext.getCmp(prototype.id+'-txtSeq').getValue());
        me.beanTMP.IN_IATA = Ext.String.trim(Ext.getCmp(prototype.id+'-txtIATA').getValue());
        
        if (grid01.isVisible()){
            store01.loadPage(1, {
                params: me.beanTMP,
                callback: function(records, operation, success) {

                }
            });
        }

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
        return value
    },

    onRendererColumnPassenger: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },

    onRendererColumnReason: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    },

    OnColumnAuditorRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    
    OnColumnCountryRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail02(' + rowIndex + ');">' + value + '</span>'
    },
    
    OnChkRenderer: function(val, meta, rec){
        /* Permission Check */
        //var me = this;

//        if(value){
//            metaData['tdCls'] = 'x-item-disabled';
//        }else{
//            metaData['tdCls'] = 'x-item-disabled';
//        }
        // return new Ext.grid.column.Check().renderer(true);
        
        // return val;
        console.log(val);
    },
    
    OnDetail01: function(rowIndex){
        var grid = Ext.getCmp(prototype.id + '-gridPediente');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        // console.log(rec);
        var vl_fechaini = '';
        var vl_fechafin = '';
        
        if ( rec.get('A3389REGAS') ){
            Ext.getCmp(prototype.id+'-txtUser').setValue(rec.get('A3389REGAS'));
            
            Ext.getCmp(prototype.id + '-gridPediente').hide();
            Ext.getCmp(prototype.id + '-gridcabiatas').show();
            Ext.getCmp(prototype.id + '-gridDETALLE').hide();
            Ext.getCmp(prototype.id + '-save').hide();
            Ext.getCmp(prototype.id+'-txtUser2').hide();
            
            Ext.getCmp(prototype.id + '-btn-back').show();
            
            Ext.getCmp(prototype.id+'-search-type').disable();
            Ext.getCmp(prototype.id+'-txtFrmaSerie').disable();
            Ext.getCmp(prototype.id+'-txtSeq').disable();
            Ext.getCmp(prototype.id+'-cmbCountry').disable();
            Ext.getCmp(prototype.id+'-txtNumber').disable();
            Ext.getCmp(prototype.id+'-txtFilterDateTo').disable();
            Ext.getCmp(prototype.id+'-txtFilterDateFrom').disable();
            
            if ( Ext.getCmp(prototype.id+'-search-type').getValue() == '' ){
                vl_fechaini = rec.get('A3389FAPPI').substring(0,4) + '' + this.getDataMes(rec.get('A3389FAPPI').substring(7,4)) + '01' ;
                vl_fechafin = rec.get('A3389FAPPI').substring(0,4) + '' + this.getDataMes(rec.get('A3389FAPPI').substring(7,4)) + '31' ;
            }else{
                vl_fechaini = Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue();
                vl_fechafin = Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue();
            }
            
            this.beanTMP01.IN_OPTION = '9';
            this.beanTMP01.IN_USER = rec.get('A3389REGAS');
            this.beanTMP01.IN_DATEFROM = vl_fechaini;
            this.beanTMP01.IN_DATETO = vl_fechafin;
            this.beanTMP01.IN_COUNTRY = Ext.getCmp(prototype.id+'-cmbCountry').getValue();
            this.beanTMP01.IN_DOCUMET = Ext.getCmp(prototype.id+'-txtNumber').getValue();
            this.beanTMP01.IN_CIA = Ext.getCmp(prototype.id+'-txtCia').getValue();
            this.beanTMP01.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue().substr(0,4));
            this.beanTMP01.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue().substr(4,10));
            this.beanTMP01.IN_SEQ = Ext.getCmp(prototype.id+'-txtSeq').getValue();
            this.beanTMP01.IN_IATA = Ext.getCmp(prototype.id+'-txtIATA').getValue();
            
            this.beanTMP01.pexcel = 1;
            this.beanTMP01.IN_STATUS = '';
            
            var grid = Ext.getCmp(prototype.id + '-gridcabiatas');
            var store = grid.getStore();
            store.removeAll();
            store.loadPage(1,{
                params: this.beanTMP01,
                callback: function(records, operation, success){
                    
                }
            });
        }
        
    },
    
    OnDetail02: function(rowIndex){
        var grid = Ext.getCmp(prototype.id + '-gridcabiatas');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        // console.log(rec);
        
        if (rec.get('A3389PAIS') != ''){
            Ext.getCmp(prototype.id + '-gridPediente').hide();
            Ext.getCmp(prototype.id + '-gridcabiatas').hide();
            Ext.getCmp(prototype.id + '-gridDETALLE').show();
            Ext.getCmp(prototype.id + '-save').show();
            Ext.getCmp(prototype.id+'-txtUser2').show();
            
            Ext.getCmp(prototype.id + '-btn-back').show();
            
            this.beanTMP02.IN_OPTION = '4';
            this.beanTMP02.IN_COUNTRY = rec.get('A3389PAIS');
            this.beanTMP02.IN_DOCUMET = Ext.getCmp(prototype.id+'-txtNumber').getValue();
            this.beanTMP02.IN_CIA = Ext.getCmp(prototype.id+'-txtCia').getValue();
            this.beanTMP02.IN_FORMA = Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue();
            this.beanTMP02.IN_SEQ = Ext.getCmp(prototype.id+'-txtSeq').getValue();
            this.beanTMP02.IN_IATA = Ext.getCmp(prototype.id+'-txtIATA').getValue();
            this.beanTMP02.IN_DATEFROM = rec.get('A3389FREAS');
            this.beanTMP02.IN_USER = rec.get('A3389REGAS');
            
            this.beanTMP02.pexcel = 1;
            this.beanTMP02.IN_STATUS = '';
            this.beanTMP02.IN_DATETO = '';
                        
            var grid = Ext.getCmp(prototype.id + '-gridDETALLE');
            var store = grid.getStore();
            store.removeAll();
            store.loadPage(1,{
                params: this.beanTMP02,
                callback: function(records, operation, success){
                    
                }
            });
            
        }
    },
    
    getDataMes: function(data){
        var index = "";
	if(data == "JAN"){index = '01'}
	if(data == "FEB"){index = '02'}
	if(data == "MAR"){index = '03'}
	if(data == "APR"){index = '04'}
	if(data == "MAY"){index = '05'}
	if(data == "JUN"){index = '06'}
	if(data == "JUL"){index = '07'}
	if(data == "AUG"){index = '08'}
	if(data == "SEP"){index = '09'}
	if(data == "OCT"){index = '10'}
	if(data == "NOV"){index = '11'}
	if(data == "DEC"){index = '12'}
	return index;
    },
    
    onBackClick: function(obj){
        var grid01 = Ext.getCmp(prototype.id + '-gridPediente');
        var grid02 = Ext.getCmp(prototype.id + '-gridcabiatas');
        var grid03 = Ext.getCmp(prototype.id + '-gridDETALLE');
        var save = Ext.getCmp(prototype.id + '-save');
        var User2 = Ext.getCmp(prototype.id+'-txtUser2');        
        
        if ( grid02.isVisible() ){
            grid01.show();
            grid02.hide();
            grid03.hide();
            save.hide();
            User2.hide();
            Ext.getCmp(prototype.id+'-txtUser').setValue('');
            Ext.getCmp(prototype.id + '-btn-back').hide();
            Ext.getCmp(prototype.id+'-search-type').enable();
            
            Ext.getCmp(prototype.id+'-search-type').enable();
            Ext.getCmp(prototype.id+'-txtFrmaSerie').enable();
            Ext.getCmp(prototype.id+'-txtSeq').enable();
            Ext.getCmp(prototype.id+'-cmbCountry').enable();
            Ext.getCmp(prototype.id+'-txtNumber').enable();
            Ext.getCmp(prototype.id+'-txtFilterDateTo').enable();
            Ext.getCmp(prototype.id+'-txtFilterDateFrom').enable();
            
        }else if( grid03.isVisible() ){
            grid01.hide();
            grid02.show();
            grid03.hide();
             save.hide();
             User2.hide();
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

    onDetailClick: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('FORMQUERYRFND', rec);
    },

    winDataEntry: function(action, rec){
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFND({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url,
                url02: prototype.url01
            }
        });
        win.show();
    },
    
    onExcelClick: function(obj){
        var grid01 = Ext.getCmp(prototype.id + '-gridPediente');
        var grid02 = Ext.getCmp(prototype.id + '-gridcabiatas');
        var grid03 = Ext.getCmp(prototype.id + '-gridDETALLE');
        var data = {}; var TIPORPT = null;
        if ( grid01.isVisible() ){
            //console.log(this.beanTMP);
            data = this.beanTMP;
            TIPORPT = 1;
        }else if ( grid02.isVisible() ){
            data = this.beanTMP01;
            TIPORPT = 2;
        }else if ( grid03.isVisible() ){
            data = this.beanTMP02;
            TIPORPT = 3;
        }
        
        //console.log(data);
        
        if ( Ext.Object.getSize(data) > 0 ){
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(data)) + '&TIPORPT='+encodeURI(TIPORPT));
                    }
                }
            });
        }
    },
    onChangeAuditorClick: function(obj){
        var me = this;
        var lstNewList = new Array();
        var grid = Ext.getCmp(prototype.id + '-gridDETALLE');
        var newAuditor = Ext.getCmp(prototype.id+'-txtUser2').getValue(); 
        if(newAuditor==='ALL' || newAuditor==='AUTOAM' || newAuditor==='AUTOPR' || newAuditor===null) {newAuditor=''};
        if(newAuditor===''){ Ext.Msg.alert('.: PRAXIS :.', 'Debes de ingresar el Auditor a Reasignar'); return;}
        if (grid.getSelectionModel().hasSelection()) {
             var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
               var row =grid.getSelectionModel().getSelection()[i];
               if(Ext.String.trim(row.get('A3389NUMER'))==='Reject' || Ext.String.trim(row.get('A3389NUMER'))==='Authorise'){
                    Ext.Msg.alert('.: PRAXIS :.', 'Debes selecionar una Solicitud'); return; 
               }else{
                   if(newAuditor===Ext.String.trim(row.get('A3389REGAS'))){
                       Ext.Msg.alert('.: PRAXIS :.', 'No puedes Reasignar la mismo Auditor'); return; 
                   }else{
                        lstNewList.push(row.data);
                   }
               }
               
            }
            
            if (lstNewList.length>0){
                global.Msg({
                msg: 'Are you sure to Save?',
                icon: 3,
                buttons: 3,
                fn: function(btn) {
                    if (btn === 'yes') {
                        me.beanGuardar.IN_A3389REGAS = newAuditor;
                        var mask = new Ext.LoadMask(Ext.getCmp( prototype.id + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/insertAuditor/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanGuardar),
                                     beanlstRFND: JSON.stringify(lstNewList)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                 console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function() {
                                        if (vp_icon === 1) {
                                            Ext.getCmp( prototype.id + '-Contenedor').getController().OnDetailuPDATE();

                                        }


                                    }});
                            }
                        });
                    }

                }
            });
                //fin
                
                
            }else{
                Ext.Msg.alert('.: PRAXIS :.', 'Debes selecionar una Solicitud'); return; 
            }
            
        }else{
              Ext.Msg.alert('.: PRAXIS :.', 'Debes selecionar una Solicitud'); return; 
        }
       
       
        
    },
      OnDetailuPDATE: function(){
          var grid = Ext.getCmp(prototype.id + '-gridDETALLE');
            var store = grid.getStore();
            store.removeAll();
            store.loadPage(1,{
                params: this.beanTMP02,
                callback: function(records, operation, success){
                    
                }
            });
      }

});

