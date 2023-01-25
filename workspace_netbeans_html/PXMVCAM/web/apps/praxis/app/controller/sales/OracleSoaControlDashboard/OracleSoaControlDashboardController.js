Ext.define('Ext.Praxis.controller.sales.OracleSoaControlDashboard.OracleSoaControlDashboardController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.OracleSoaControlDashboardController',
    searchParams: {},
    _path: '',

    /**
     * Constructor
     */

    init: function(view){
        var me = this;
        prototype.id = 'OracleSoaControlDashboardForm';
        prototype.url = CONTEXTPATH+'/OracleSoaControlDashboard';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#OracleSoaControlDashboardForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#OracleSoaControlDashboardForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#OracleSoaControlDashboardForm-btnClear': {
                click: this.btnClear_click
            },
            '#OracleSoaControlDashboardForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#OracleSoaControlDashboardForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#OracleSoaControlDashboardForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function(){
        this.btnSearch_click();
    },
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-gridData').isVisible()) {
            global.getFile(_path);
        }
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
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    setFormatParameter: function() {

       // <editor-fold defaultstate="collapsed" desc="asignación">
        _path = prototype.url+'/getXLSX';
        // </editor-fold>

    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.OracleSOAControl.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    //obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3701");
                    console.log(obj.data);
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
    lnkModule_clickHandler: function (obj, metaData, rowNum, column, obj2, rowData) {
        //alert(win.getValue('lblTicketNumber'));
        var bean = {};
        var params = {};
            bean.IN_MODUL = rowData.data.A3701MODUL.trim();

            params.bean = bean;
            Ext.create('Ext.Praxis.view.sales.OracleSoaControlDashboardForm.OracleSoaControlDashboardDetailForm', {
                id: 'OracleSoaControlDashboardDetailForm',
                params: params
            }).show();
    },
    lnkSwitch_clickHandler: function (obj, metaData, rowNum, column, obj2, rowData) {
        
        var nContinuar = 0;
	
	if(rowData.data.SCHEDULE === 1){
		nContinuar = 2;
	}else{
            var i=0;
            var n = Ext.getCmp(prototype.id+'-gridData').getStore().data.length;

            for(i=0;i<n;++i){
                var beanT = Ext.getCmp(prototype.id+'-gridData').getStore().data.items[i].data;
                if(beanT.SCHEDULE === 1){
                    nContinuar = beanT.A3701FLAG === 0 ? 2 : 1;
                    break;
                }
            }
	}     
        console.log('nContinuar:'+nContinuar);
        
        var params = {};
        console.log(rowData.data);
        if(nContinuar === 2){
            var bean = {};
            bean.A3701MODUL = rowData.data.A3701MODUL.trim();
            bean.A3701FLAG = rowData.data.A3701FLAG;
            bean.FLAG = rowData.data.FLAG.trim();
            bean.SCHEDULE = rowData.data.SCHEDULE;

            params.bean = bean;
            Ext.create('Ext.Praxis.view.sales.OracleSoaControlDashboardForm.DataEntry', {
                id: 'DataEntryOracleSoaControlDashboardForm',
                params: params
            }).show();
        }else{
            if(nContinuar === 0){
                global.Msg({
                            msg: 'Please add the scheduled maintenance control record'
                        });
            }
            if(nContinuar === 1){
                global.Msg({
                            msg: 'You have to deactivate scheduled maintenance'
                        });
            }
        }
    }
});

