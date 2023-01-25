
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkTicketControlRFND.BsplinkTicketControlRFNDController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.BsplinkTicketControlRFNDController',
    
    beanTMP: {},
    beanEXCEL: {},

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
        this.setStoresGrids();
    },
    
    OnBeforeShow: function(){
        prototype.id = 'BsplinkTicketControlRFND';
        prototype.url = CONTEXTPATH + '/BwrRefundTicketControl';
        prototype.url01 = CONTEXTPATH + '/BsplinkRefundQueryRFND';
        prototype.widthContenedor = 1000;
        prototype.heightContenedor = 768;
    },
    
    setStoresFilters: function(){
        var cmbSearch = Ext.getCmp(prototype.id+'-search-type');

        cmbSearch.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "1", "name": "SYSTEM DATE"},
                { "code": "2", "name": "TICKET"}
            ]
        }));

    },
    
    setStoresGrids: function(){
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store',{
            storeId: prototype.id + '-store-grid00',           
            pageSize: 20,
            proxy:{
                type: 'ajax',
                url: prototype.url + '/searchRefundTicketControl',
                timeout: 60000000,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);
    },
    
    onCmbSearchAfterRender: function(obj){
        obj.setValue('1');
    },
    
    onCmbSearchChange: function( obj , newValue , oldValue , eOpts ){
        var txtDateFrom = Ext.getCmp(prototype.id+'-txtFilterDateFrom');
        var txtDateTo = Ext.getCmp(prototype.id+'-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.id+'-txtCia');
        var txtForma = Ext.getCmp(prototype.id+'-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id+'-txtSeq');
        var txtCountry = Ext.getCmp(prototype.id+'-cmbCountry');
        
        switch(String(newValue)){
            case '1':
                txtDateFrom.show();
                txtDateTo.show();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                
                txtCountry.setValue('');
                txtForma.setValue('');
                break;
            case '2':
                txtCia.show();
                txtForma.show();
                txtSeq.show();
                txtDateFrom.hide();
                txtDateTo.hide();
                
                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtCountry.setValue('');
                break;
        }
    },
    
    onRendererColumnOnTime: function(value, metaData, record, rowIndex, colIndex, store, view){
        
        switch( String(record.get('A3389SEMAF')) ){
            case 'YES':
                value = 'green';
            break;
            case 'GRIS':
                value = 'orange';
            break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onExcelClick: function () {
        var me = this;
        var comboBy = String(Ext.getCmp(prototype.id+'-search-type').getValue());
        if ( comboBy === '1' ){
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) !== '' ){
                if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) === '' ){
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) !== '' ){
                if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) === '' ){
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }
        }        
        if ( comboBy === '2' ){
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue()) === '' ){
                Ext.Msg.alert('.: PRAXIS :.', 'Enter TKT');
                return;
            }
        }
        
        me.beanEXCEL.IN_OPTION = comboBy;
        me.beanEXCEL.IN_DATEFROM = Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue();
        me.beanEXCEL.IN_DATETO = Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue();
        me.beanEXCEL.IN_CIA = Ext.String.trim(Ext.getCmp(prototype.id+'-txtCia').getValue());
        me.beanEXCEL.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue().substr(0,4));
        me.beanEXCEL.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue().substr(4,10));
        me.beanEXCEL.IN_SEQ = Ext.String.trim(Ext.getCmp(prototype.id+'-txtSeq').getValue());
        me.beanEXCEL.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id+'-cmbCountry').getValue());
        
        

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

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();
        
        var comboBy = String(Ext.getCmp(prototype.id+'-search-type').getValue());

        if ( comboBy === '1' ){
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) !== '' ){
                if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) === '' ){
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) !== '' ){
                if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) === '' ){
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }

            /*if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue()) != '' &&
                 Ext.String.trim(Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue()) != '' ){
                  if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
                    Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                    return;
                }
            }*/
        }
        
        if ( comboBy === '2' ){
            if ( Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue()) === '' ){
                Ext.Msg.alert('.: PRAXIS :.', 'Enter TKT');
                return;
            }
        }
        
        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.id+'-txtFilterDateFrom').getRawValue();
        me.beanTMP.IN_DATETO = Ext.getCmp(prototype.id+'-txtFilterDateTo').getRawValue();
        me.beanTMP.IN_CIA = Ext.String.trim(Ext.getCmp(prototype.id+'-txtCia').getValue());
        me.beanTMP.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue().substr(0,4));
        me.beanTMP.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id+'-txtFrmaSerie').getValue().substr(4,10));
        me.beanTMP.IN_SEQ = Ext.String.trim(Ext.getCmp(prototype.id+'-txtSeq').getValue());
        me.beanTMP.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id+'-cmbCountry').getValue());
        
        me.beanTMP.pexcel = 0;
         var Sendtoaudit = 0;
         var Returntoaudit = 0;
         var Sendtosabre = 0;
        store.loadPage(1, {
            params: me.beanTMP,
            callback: function(records, operation, success) {
                 for (var i = 0; i < records.length; i++) {
                     var Objtemp = records[i].data;
                      if (Objtemp.A3389FLAG==='YES') {
                            Sendtoaudit = Sendtoaudit + 1;
                      }
                      if (Objtemp.A3389STATO==='YES') {
                            Returntoaudit = Returntoaudit + 1;
                      }
                      if (Objtemp.A3389STATU==='YES') {
                            Sendtosabre = Sendtosabre + 1;
                      }
                 }
                Ext.getCmp(prototype.id + '-lbl-sent').setText(Sendtoaudit);
                Ext.getCmp(prototype.id + '-lbl-return').setText(Returntoaudit);
                Ext.getCmp(prototype.id + '-lbl-sabre').setText(Sendtosabre);
            }
        });
        
    },
    
    OnAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.util.Format.number(value, '0,000.00');
    },
    onSerecRelatedFolios: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var txtSNumber = rec.get('A3389TKT').substring(3, 13);
        var txtCOUNTRY =  rec.get('A3389PAIS'); 
        var FormListRFND = Ext.create('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormListRFND', {id: 'FormListRFND'});
        var controller = FormListRFND.getController();
        controller.initial(txtSNumber, txtCOUNTRY,prototype.url01);
        FormListRFND.show();
    }

});

