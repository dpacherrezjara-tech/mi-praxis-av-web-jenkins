
Ext.define('Ext.Praxis.controller.tnu.AtlDuplicateUsage.AtlDuplicateUsageController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.AtlDuplicateUsageController',
    beanTMP: {},
    /**
     * Constructor
     */
    init: function(){
        var me = this;        
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function()
    {              
        Ext.getCmp(prototype.id + '-pagginator-01').disable();                        
        this.set_LoadData_Cmbo1();
        this.set_LoadData_Cmbo2();
        this.setGridData();        
    },
    onSearchClick: function()
    {
        this.setGridData();
    },
    setGridData: function()
    {
       var me = this;
       var tkt_air = Ext.getCmp(prototype.id + '-tkt-air').getValue();        
       var tkt = Ext.getCmp(prototype.id + '-tkt').getValue();               
       if (!this.getParamsStore()) return;   
       
       me.beanTMP.VP_TICKET = tkt_air + tkt;       
       win.lblUser_toolTip("Estructura: A1547NEW");
       //console.log('x');
       var grid01 = Ext.getCmp(prototype.id + '-grid');                       
       var store01 = Ext.create('Ext.data.Store',{            
            proxy:{
               type: 'ajax',
               url: prototype.url + '/search',               
               extraParams: me.beanTMP,                                
               timeout: 60000000,
                reader:{
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            pageSize: 20
        });        
        grid01.setStore(store01);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);        
        grid01.getStore().loadPage(1,{
                params:  me.beanTMP,                
                callback: function(obj, e){
                    //console.log ( grid01.getStore().data );
                    if ( grid01.getStore().getTotalCount() > 0)
                    Ext.getCmp(prototype.id + '-pagginator-01').enable();
                    if ( grid01.getStore().getTotalCount() === 0) 
                    Ext.Msg.alert('.: PRAXIS :.', 'Data not found');                    
                }
        });
    },    
    onExcelClick: function(obj)
    {
        if (!this.getParamsStore()) return;                                  
        //console.log(this.beanTMP);
        if ( Ext.Object.getSize(this.beanTMP) > 0 ){
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        //global.getFile(prototype.url + '/export_XLS?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                        global.getFile(prototype.url + '/export_XLS?IN_OPCION='+me.beanTMP.IN_OPCION+
                                                              '&IN_TICKET='+me.beanTMP.IN_TICKET+
                                                              '&IN_TUSO='+me.beanTMP.IN_TUSO+
                                                              '&IN_DFLIGHT='+me.beanTMP.IN_DFLIGHT+
                                                              '&IN_DFLIGHT2='+me.beanTMP.IN_DFLIGHT2+
                                                              '&IN_NFLIGHT='+me.beanTMP.IN_NFLIGHT+'&limit=-1&start=0' );
                    }
                }
            });
        }
    },
    onTextoClick: function(){
        if (!this.getParamsStore()) return;        
        if ( Ext.Object.getSize(this.beanTMP) > 0 ){
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download texto ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {                        
                        global.getFile(prototype.url + '/downloadText?IN_OPCION='+me.beanTMP.IN_OPCION+
                                                              '&IN_TICKET='+me.beanTMP.IN_TICKET+
                                                              '&IN_TUSO='+me.beanTMP.IN_TUSO+
                                                              '&IN_DFLIGHT='+me.beanTMP.IN_DFLIGHT+
                                                              '&IN_DFLIGHT2='+me.beanTMP.IN_DFLIGHT2+
                                                              '&IN_NFLIGHT='+me.beanTMP.IN_NFLIGHT+'&limit=-1&start=0' );
                    }
                }
            });
        }
    },
    onFilterClick: function()
    {        
        var option = Ext.getCmp(prototype.id + '-contenedor-filters-form');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);        
    },
    onClearClick:function()
    {
        //no aplica
    },
    onPaginationChkChange: function(obj, newValue, oldValue, eOpts)
    {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click',{});
        if (!newValue){
            Ext.getCmp(prototype.id + '-pagginator-01').disable();         
        }else{
            Ext.getCmp(prototype.id + '-pagginator-01').enable();           
        }
    },
    setFilter:function(  precord ){            
        switch(precord.data.code){
            case '1': //por tkt
                Ext.getCmp(prototype.id+'-tkt-air').setHidden(false);                    
                Ext.getCmp(prototype.id+'-tkt').setHidden(false); 
                Ext.getCmp(prototype.id+'-nvlo').setHidden(true);
                Ext.getCmp(prototype.id+'-fecha1').setHidden(true);
                Ext.getCmp(prototype.id+'-fecha2').setHidden(true);
                Ext.getCmp(prototype.id+'-nvlo').setHidden(true);
                Ext.getCmp(prototype.id+'-tuse').setHidden(true);
            break;
            case '2'://por uso
                Ext.getCmp(prototype.id+'-tkt-air').setHidden(true);
                Ext.getCmp(prototype.id+'-tkt').setHidden(true);
                Ext.getCmp(prototype.id+'-nvlo').setHidden(false);
                Ext.getCmp(prototype.id+'-fecha1').setHidden(false);
                Ext.getCmp(prototype.id+'-fecha2').setHidden(false);
                Ext.getCmp(prototype.id+'-tuse').setHidden(false);
            break;
            case '3'://por fecha contable
                Ext.getCmp(prototype.id+'-tkt-air').setHidden(true);
                Ext.getCmp(prototype.id+'-tkt').setHidden(true);
                Ext.getCmp(prototype.id+'-nvlo').setHidden(true);
                Ext.getCmp(prototype.id+'-fecha1').setHidden(false);
                Ext.getCmp(prototype.id+'-fecha2').setHidden(false);
                Ext.getCmp(prototype.id+'-nvlo').setHidden(true);
                Ext.getCmp(prototype.id+'-tuse').setHidden(true);
            break;
            case '4'://por fecha contable of adjustment
                Ext.getCmp(prototype.id+'-tkt-air').setHidden(true);
                Ext.getCmp(prototype.id+'-tkt').setHidden(true);
                Ext.getCmp(prototype.id+'-nvlo').setHidden(true);
                Ext.getCmp(prototype.id+'-fecha1').setHidden(false);
                Ext.getCmp(prototype.id+'-fecha2').setHidden(false);
                Ext.getCmp(prototype.id+'-nvlo').setHidden(true);
                Ext.getCmp(prototype.id+'-tuse').setHidden(true);
            break;
        }
    },
    getParamsStore: function(){
            var bolean = true;
            var IN_OPCION   = Ext.getCmp(prototype.id + '-search-type').getValue();                        
            var strTktAir   = Ext.getCmp(prototype.id + '-tkt-air').getValue();            
            var strTkt      = Ext.getCmp(prototype.id + '-tkt').getValue();            
            var IN_TUSO     = Ext.getCmp(prototype.id + '-tuse').getValue();            
            var IN_DFLIGHT  = '';            
            var IN_DFLIGHT2 = '';            
            var IN_NFLIGHT  = Ext.getCmp(prototype.id + '-nvlo').getValue();                        
            var IN_TYPEADJ  = ''; //Ext.getCmp(prototype.id+'-filtr-adjustment').getValue();
            //console.log(IN_OPCION);            
            if (IN_OPCION === null ){
                IN_OPCION = '';
            };
            if ( IN_TUSO === null ){
                 IN_TUSO = '';
            };
            
            
            if (strTkt !=='' ) strTkt = strTktAir+strTkt;                
            switch(IN_OPCION){
                case '2': case '3': case '4':
                    IN_DFLIGHT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(),'Ymd').trim();            
                    IN_DFLIGHT2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(),'Ymd').trim();                     
                    if(IN_OPCION === '3'){
                         if (IN_DFLIGHT==='' || IN_DFLIGHT2 ==='' ){  
                             global.Msg({msg:'Enter accounting date!',icon:2,fn:function(){}}); 
                             bolean=false; 
                             return;
                         }
                    }
                    if( IN_DFLIGHT !=='' ){
                        if( IN_DFLIGHT2 ==='' ){
                            global.Msg({msg:'Enter To date!',icon:2,fn:function(){}}); 
                             bolean=false; 
                             return;
                        }
                    }
                    if( IN_DFLIGHT2 !=='' ){
                        if( IN_DFLIGHT ==='' ){
                            global.Msg({msg:'Enter From date!',icon:2,fn:function(){}}); 
                             bolean=false; 
                             return;
                        }
                    }
                break;
            }
            me.beanTMP={
                IN_OPCION:IN_OPCION,
                IN_TICKET: strTkt,
                IN_TUSO:IN_TUSO,
                IN_DFLIGHT:IN_DFLIGHT,
                IN_DFLIGHT2:IN_DFLIGHT2,
                IN_NFLIGHT:IN_NFLIGHT,
                IN_TYPEADJ:IN_TYPEADJ
            };
            return bolean;
     },
     set_LoadData_Cmbo1: function(){
         Data00 = Ext.create('Ext.data.ArrayStore', {
                storeId: 'theStore',                
                data: [                    
                    [ "1", "Ticket Number"],
                    [ "2", "Usage "],                    
                    [ "3", "Accounting Date"]
                   //[ "4", "Accounting Date Adjustment"] 
                ],
                fields:['code','name']
         });
         combo01 = Ext.getCmp(prototype.id+'-search-type');
         combo01.setStore(Data00);         
     },
     set_LoadData_Cmbo2: function(){
         Data00 = Ext.create('Ext.data.ArrayStore', {
                storeId: 'theStore',                
                data: [                    
                    [ "", "All"],
                    [ "V", "FLWN"],
                    [ "E", "EXCH"],
                    [ "R", "RFND"],
                    [ "I", "YPAY"]
                ],
                fields:['code','name']
         });
         combo02 = Ext.getCmp(prototype.id+'-tuse');
         combo02.setStore(Data00);         
     }                     
     
});




