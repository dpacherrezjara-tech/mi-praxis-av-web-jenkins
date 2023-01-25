
Ext.define('Ext.Praxis.controller.tnu.MonthlyTNUBalance.MonthlyTNUBalanceController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.MonthlyTNUBalanceController',
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
        //paginador disable
        Ext.getCmp(prototype.id + '-pagginator-01').disable();        
        //load data default
        this.setGridData();        
    },
    onSearchClick: function()
    {
        this.setGridData();
    },
    setGridData: function()
    {
       var me = this;
       var periodo = Ext.getCmp(prototype.id + '-periodo').getValue();        
       if(periodo === ''){
           global.Msg({
                msg: 'Select period'
            });
           return;
       };
       me.beanTMP.VP_CCUST = ''; //No Used
       me.beanTMP.VP_PERIODO = periodo;
       //console.log( me.beanTMP);
       //alert( prototype.url );
       
       win.lblUser_toolTip("Estructura: A2581");
       var storeGridDatas = Ext.create('Ext.Praxis.store.tnu.GridData',{
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.beanTMP; 
                },
                load: function(obj) {                        
                    if (obj.data.length === 0) {
                        Ext.Msg.show({
                            title: '.:PRAXIS:.',
                            msg: 'Data not found!',
                            buttons: Ext.MessageBox.OK,
                            scope: this,
                            icon: Ext.MessageBox.INFO,
                            modal: true
                        });
                    }
                }
            }
        });            
        Ext.getCmp(prototype.id + '-grid').bindStore(storeGridDatas);
    },
    
    onExcelClick: function(obj)
    {
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
                        var _path = '/MonthlyAtlBalance_excel?beanString='+encodeURI(JSON.stringify(this.beanTMP)); // +"&fileName=PX063-ControlFiguresDet_Group";
                        global.getFile(prototype.url + _path);
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
    }

});

